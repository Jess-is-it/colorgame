from __future__ import annotations

import threading
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Optional
from uuid import uuid4

import cv2
import numpy as np

# Faceplugin OSS: face detection (PyTorch SSD).
from face_detect.detect_imgs import get_face_boundingbox  # type: ignore

from .codenames import pick_codename
from .db import tx
from .similarity import phash64_bgr, hamming_distance
from .timeutil import now_utc_iso


@dataclass
class JobStatus:
    job_id: str
    video_id: int
    state: str  # queued|running|done|error
    progress: float
    message: str
    started_at: Optional[str] = None
    finished_at: Optional[str] = None


class JobRegistry:
    def __init__(self) -> None:
        self._lock = threading.Lock()
        self._jobs: dict[str, JobStatus] = {}

    def create(self, video_id: int) -> JobStatus:
        job_id = uuid4().hex
        js = JobStatus(job_id=job_id, video_id=video_id, state="queued", progress=0.0, message="queued")
        with self._lock:
            self._jobs[job_id] = js
        return js

    def get(self, job_id: str) -> Optional[JobStatus]:
        with self._lock:
            return self._jobs.get(job_id)

    def update(self, job_id: str, **kwargs: Any) -> None:
        with self._lock:
            js = self._jobs.get(job_id)
            if not js:
                return
            for k, v in kwargs.items():
                setattr(js, k, v)

    def as_dict(self, job_id: str) -> Optional[dict[str, Any]]:
        js = self.get(job_id)
        if not js:
            return None
        return {
            "job_id": js.job_id,
            "video_id": js.video_id,
            "state": js.state,
            "progress": js.progress,
            "message": js.message,
            "started_at": js.started_at,
            "finished_at": js.finished_at,
        }


def _clamp_box(x1: int, y1: int, x2: int, y2: int, w: int, h: int) -> tuple[int, int, int, int]:
    x1 = max(0, min(x1, w - 1))
    y1 = max(0, min(y1, h - 1))
    x2 = max(0, min(x2, w - 1))
    y2 = max(0, min(y2, h - 1))
    if x2 <= x1:
        x2 = min(w - 1, x1 + 1)
    if y2 <= y1:
        y2 = min(h - 1, y1 + 1)
    return x1, y1, x2, y2


def _iou(a: tuple[int, int, int, int], b: tuple[int, int, int, int]) -> float:
    ax1, ay1, ax2, ay2 = a
    bx1, by1, bx2, by2 = b
    ix1 = max(ax1, bx1)
    iy1 = max(ay1, by1)
    ix2 = min(ax2, bx2)
    iy2 = min(ay2, by2)
    iw = max(0, ix2 - ix1)
    ih = max(0, iy2 - iy1)
    inter = iw * ih
    if inter <= 0:
        return 0.0
    a_area = max(1, (ax2 - ax1) * (ay2 - ay1))
    b_area = max(1, (bx2 - bx1) * (by2 - by1))
    return float(inter) / float(a_area + b_area - inter)


def start_detection_job(
    *,
    conn,
    registry: JobRegistry,
    video_id: int,
    video_path: Path,
    faces_dir: Path,
) -> str:
    js = registry.create(video_id)

    t = threading.Thread(
        target=_run_detection,
        kwargs={
            "conn": conn,
            "registry": registry,
            "job_id": js.job_id,
            "video_id": video_id,
            "video_path": video_path,
            "faces_dir": faces_dir,
        },
        daemon=True,
    )
    t.start()
    return js.job_id


def _run_detection(*, conn, registry: JobRegistry, job_id: str, video_id: int, video_path: Path, faces_dir: Path) -> None:
    registry.update(job_id, state="running", progress=0.0, message="starting", started_at=now_utc_iso())

    # Load capture settings once per job.
    with tx(conn) as cur:
        s = cur.execute(
            "SELECT capture_new_person, existing_capture_interval_minutes, max_images_per_person, sample_fps FROM settings WHERE id=1"
        ).fetchone()
    capture_new_person = bool(s["capture_new_person"])
    existing_interval_min = int(s["existing_capture_interval_minutes"])
    max_images_per_person = int(s["max_images_per_person"])
    sample_fps = float(s["sample_fps"])

    cap = cv2.VideoCapture(str(video_path))
    if not cap.isOpened():
        registry.update(job_id, state="error", message="cannot open video", finished_at=now_utc_iso())
        return

    try:
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT) or 0) or None
        fps = float(cap.get(cv2.CAP_PROP_FPS) or 0.0) or 0.0
        if fps <= 0:
            fps = 30.0
        step = max(1, int(round(fps / max(sample_fps, 0.25))))

        # Heuristics: prioritize "main" faces and ignore UI/avatar faces.
        max_faces_per_frame = 2
        min_face_px = 120
        min_score = 0.75
        ignore_bottom_ratio = 0.25  # ignore faces in bottom HUD area
        min_area_ratio = 0.004  # ignore small faces relative to the frame
        max_persons = 2  # your typical video has 2 hosts; avoid creating endless persons

        match_dist_thresh = 24  # higher = more aggressive merging
        create_score_thresh = 0.85
        min_crop_std = 12.0  # ignore very flat/solid crops (often false positives)

        # Clear previous detections for this video (keep people + images).
        with tx(conn) as cur:
            cur.execute("DELETE FROM detections WHERE video_id = ?", (video_id,))

        # Cache people once per job; update in memory when new persons are created.
        with tx(conn) as cur:
            people_rows = cur.execute("SELECT id, codename FROM persons").fetchall()
            # Keep a few recent signatures per person for more robust matching.
            sig_rows = cur.execute(
                """
                SELECT person_id, signature
                FROM face_images
                WHERE signature IS NOT NULL
                ORDER BY captured_at DESC
                """
            ).fetchall()

        people = [{"id": int(r["id"]), "codename": r["codename"]} for r in people_rows]
        used_names = {p["codename"] for p in people}
        person_sigs: dict[int, list[int]] = {}
        for r in sig_rows:
            pid = int(r["person_id"])
            sig = r["signature"]
            if sig is None:
                continue
            lst = person_sigs.setdefault(pid, [])
            if len(lst) < 8:
                lst.append(int(sig))

        # Keep last capture by *video time* so interval makes sense for offline videos.
        last_capture_t: dict[int, float] = {}

        # Simple per-job tracking to keep the same person across frames.
        tracks: dict[int, dict[str, Any]] = {}  # person_id -> {box,last_frame,last_t}

        frame_idx = 0
        processed = 0
        last_progress_update = 0.0

        while True:
            ok, frame = cap.read()
            if not ok or frame is None:
                break

            if frame_idx % step != 0:
                frame_idx += 1
                continue

            t_sec = float(frame_idx / fps)
            processed += 1

            # Faceplugin returns torch tensors.
            boxes, scores = get_face_boundingbox(frame)

            h, w = frame.shape[:2]
            now_iso = now_utc_iso()

            # Convert detections into sortable list; keep biggest faces only.
            dets: list[dict[str, Any]] = []
            for i in range(int(len(boxes))):
                b = boxes[i].data.cpu().numpy().tolist()
                sc = float(scores[i].data.cpu().numpy().item()) if len(scores) > i else None
                x1, y1, x2, y2 = map(int, b)
                x1, y1, x2, y2 = _clamp_box(x1, y1, x2, y2, w, h)
                bw = x2 - x1
                bh = y2 - y1
                if sc is not None and sc < min_score:
                    continue
                if bw < min_face_px or bh < min_face_px:
                    continue
                if y2 > int(h * (1.0 - ignore_bottom_ratio)):
                    continue
                area = bw * bh
                if area < int((w * h) * min_area_ratio):
                    continue
                dets.append({"x1": x1, "y1": y1, "x2": x2, "y2": y2, "score": sc, "area": bw * bh})
            dets.sort(key=lambda d: d["area"], reverse=True)
            dets = dets[:max_faces_per_frame]

            # Try to match detections to existing tracks first (keeps stable IDs across frames).
            unmatched: list[dict[str, Any]] = []
            used_track_ids: set[int] = set()
            for d in dets:
                dbox = (d["x1"], d["y1"], d["x2"], d["y2"])
                best_pid: Optional[int] = None
                best_iou = 0.0
                for pid, tr in tracks.items():
                    if pid in used_track_ids:
                        continue
                    iou = _iou(dbox, tr["box"])
                    if iou > best_iou:
                        best_iou = iou
                        best_pid = pid
                if best_pid is not None and best_iou >= 0.20:
                    d["person_id"] = best_pid
                    used_track_ids.add(best_pid)
                else:
                    unmatched.append(d)

            for d in unmatched:
                x1, y1, x2, y2 = d["x1"], d["y1"], d["x2"], d["y2"]
                crop = frame[y1:y2, x1:x2].copy()
                if crop.size == 0:
                    continue
                # Ignore near-uniform crops (common on false positives).
                if float(np.std(crop)) < min_crop_std:
                    continue

                sig = phash64_bgr(crop)

                # Match to existing person by signature (fallback).
                best_id: Optional[int] = None
                best_dist = 999
                for p in people:
                    pid = int(p["id"])
                    sigs = person_sigs.get(pid) or []
                    if not sigs:
                        continue
                    dist = min(hamming_distance(sig, s) for s in sigs)
                    if dist < best_dist:
                        best_dist = dist
                        best_id = pid

                person_id: Optional[int] = None
                is_new = False
                if best_id is not None and best_dist <= match_dist_thresh:
                    person_id = best_id
                else:
                    # Create a new person only if we haven't hit the limit and detection is confident.
                    if len(people) < max_persons and (d.get("score") or 0.0) >= create_score_thresh:
                        codename = pick_codename(used_names)
                        used_names.add(codename)
                        is_new = True
                        with tx(conn) as cur:
                            cur.execute(
                                "INSERT INTO persons (codename, signature, created_at, last_seen) VALUES (?, ?, ?, ?)",
                                (codename, int(sig), now_iso, now_iso),
                            )
                            person_id = int(cur.lastrowid)
                        people.append({"id": person_id, "codename": codename})
                        person_sigs.setdefault(person_id, []).append(int(sig))
                    else:
                        # Not confident enough to create a new person. If we have existing persons,
                        # snap to the closest one to avoid creating junk "persons".
                        if best_id is not None:
                            person_id = best_id
                        else:
                            continue

                d["person_id"] = person_id
                d["sig"] = int(sig)
                d["is_new"] = is_new

                # Record detection (for overlay).
                person_id = int(d["person_id"])
                sc = d.get("score")
                with tx(conn) as cur:
                    cur.execute(
                        "INSERT INTO detections (video_id, t_sec, x, y, w, h, person_id, score) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                        (video_id, t_sec, x1, y1, (x2 - x1), (y2 - y1), person_id, sc),
                    )
                    cur.execute("UPDATE persons SET last_seen = ? WHERE id = ?", (now_iso, person_id))

                # Update/refresh track for this person_id.
                tracks[person_id] = {"box": (x1, y1, x2, y2), "last_frame": frame_idx, "last_t": t_sec}

                # Decide whether to capture an image.
                should_capture = False
                is_new = bool(d.get("is_new", False))
                if is_new:
                    should_capture = capture_new_person
                else:
                    last_t = last_capture_t.get(person_id)
                    if last_t is None:
                        should_capture = True
                    else:
                        if (t_sec - float(last_t)) >= (existing_interval_min * 60.0):
                            should_capture = True

                if should_capture:
                    out_dir = faces_dir / str(person_id)
                    out_dir.mkdir(parents=True, exist_ok=True)
                    out_path = out_dir / f"{int(time.time() * 1000)}.jpg"
                    cv2.imwrite(str(out_path), crop)

                    sig = int(d.get("sig") or phash64_bgr(crop))
                    with tx(conn) as cur:
                        cur.execute(
                            "INSERT INTO face_images (person_id, video_id, captured_at, path, signature) VALUES (?, ?, ?, ?, ?)",
                            (person_id, video_id, now_iso, str(out_path), int(sig)),
                        )
                        cur.execute(
                            "UPDATE persons SET last_capture_at = ?, signature = ? WHERE id = ?",
                            (now_iso, int(sig), person_id),
                        )

                        # Enforce max images per person: delete oldest beyond limit.
                        rows = cur.execute(
                            "SELECT id, path FROM face_images WHERE person_id = ? ORDER BY captured_at ASC",
                            (person_id,),
                        ).fetchall()
                        if len(rows) > max_images_per_person:
                            to_delete = rows[: len(rows) - max_images_per_person]
                            for r in to_delete:
                                try:
                                    Path(r["path"]).unlink(missing_ok=True)
                                except Exception:
                                    pass
                                cur.execute("DELETE FROM face_images WHERE id = ?", (int(r["id"]),))
                    last_capture_t[person_id] = t_sec
                    # Keep recent signatures for matching.
                    sigs = person_sigs.setdefault(person_id, [])
                    sigs.insert(0, int(sig))
                    if len(sigs) > 8:
                        del sigs[8:]

            # Drop stale tracks.
            stale = [pid for pid, tr in tracks.items() if (frame_idx - int(tr["last_frame"])) > (step * 10)]
            for pid in stale:
                tracks.pop(pid, None)

            frame_idx += 1

            if total_frames:
                progress = min(1.0, frame_idx / float(total_frames))
            else:
                progress = min(0.99, processed / 1000.0)

            # Avoid too-frequent updates.
            if progress - last_progress_update >= 0.01:
                last_progress_update = progress
                registry.update(job_id, progress=progress, message=f"processing (t={t_sec:.1f}s)")

        registry.update(job_id, state="done", progress=1.0, message="done", finished_at=now_utc_iso())
    except Exception as e:
        registry.update(job_id, state="error", message=str(e), finished_at=now_utc_iso())
    finally:
        cap.release()


def _iso_to_epoch(iso_str: str) -> float:
    # Deprecated: interval logic now uses video time. Kept for backward compatibility.
    from datetime import datetime

    dt = datetime.fromisoformat(iso_str)
    return dt.timestamp()
