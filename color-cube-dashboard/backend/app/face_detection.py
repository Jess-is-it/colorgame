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
from .similarity import ahash64_bgr, hamming_distance
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

        # Clear previous detections for this video (keep people + images).
        with tx(conn) as cur:
            cur.execute("DELETE FROM detections WHERE video_id = ?", (video_id,))

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

            # Preload existing persons once per sampled frame to match quickly.
            with tx(conn) as cur:
                people = cur.execute("SELECT id, codename, signature, last_capture_at FROM persons").fetchall()
            used_names = {p["codename"] for p in people}

            for i in range(int(len(boxes))):
                b = boxes[i].data.cpu().numpy().tolist()
                sc = float(scores[i].data.cpu().numpy().item()) if len(scores) > i else None
                x1, y1, x2, y2 = map(int, b)
                x1, y1, x2, y2 = _clamp_box(x1, y1, x2, y2, w, h)
                crop = frame[y1:y2, x1:x2].copy()
                sig = ahash64_bgr(crop)

                # Match to existing person by signature.
                best = None
                best_dist = 999
                for p in people:
                    psig = p["signature"]
                    if psig is None:
                        continue
                    dist = hamming_distance(sig, int(psig))
                    if dist < best_dist:
                        best = p
                        best_dist = dist

                person_id: Optional[int] = None
                is_new = False
                if best is not None and best_dist <= 10:
                    person_id = int(best["id"])
                else:
                    # Create a new person for this new face.
                    codename = pick_codename(used_names)
                    used_names.add(codename)
                    is_new = True
                    with tx(conn) as cur:
                        cur.execute(
                            "INSERT INTO persons (codename, signature, created_at, last_seen) VALUES (?, ?, ?, ?)",
                            (codename, int(sig), now_iso, now_iso),
                        )
                        person_id = int(cur.lastrowid)

                # Record detection (for overlay).
                with tx(conn) as cur:
                    cur.execute(
                        "INSERT INTO detections (video_id, t_sec, x, y, w, h, person_id, score) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                        (video_id, t_sec, x1, y1, (x2 - x1), (y2 - y1), person_id, sc),
                    )
                    cur.execute("UPDATE persons SET last_seen = ? WHERE id = ?", (now_iso, person_id))

                # Decide whether to capture an image.
                should_capture = False
                if is_new:
                    should_capture = capture_new_person
                else:
                    # Capture every N minutes for existing.
                    with tx(conn) as cur:
                        row = cur.execute("SELECT last_capture_at FROM persons WHERE id = ?", (person_id,)).fetchone()
                    last_cap = row["last_capture_at"] if row else None
                    if not last_cap:
                        should_capture = True
                    else:
                        # ISO string; compare in epoch seconds by parsing.
                        try:
                            last_ts = _iso_to_epoch(last_cap)
                        except Exception:
                            last_ts = 0.0
                        if (time.time() - last_ts) >= (existing_interval_min * 60):
                            should_capture = True

                if should_capture:
                    out_dir = faces_dir / str(person_id)
                    out_dir.mkdir(parents=True, exist_ok=True)
                    out_path = out_dir / f"{int(time.time() * 1000)}.jpg"
                    cv2.imwrite(str(out_path), crop)

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
    # Lazy import to keep module load fast.
    from datetime import datetime

    # datetime.fromisoformat supports timezone offsets.
    dt = datetime.fromisoformat(iso_str)
    return dt.timestamp()

