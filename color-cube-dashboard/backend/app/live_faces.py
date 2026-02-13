from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Any, Optional
import threading
import time

import cv2

from face_detect.detect_imgs import get_face_boundingbox  # type: ignore


@dataclass(frozen=True)
class FaceBox:
    x: int
    y: int
    w: int
    h: int
    score: float | None = None


class _CachedVideoReader:
    """
    Keeps a VideoCapture open and advances forward efficiently as time increases.
    If the caller seeks backwards (time decreases), we re-open the capture.
    """

    def __init__(self, video_path: Path):
        self.video_path = video_path
        self.lock = threading.Lock()
        self.cap = cv2.VideoCapture(str(video_path))
        self.opened = bool(self.cap.isOpened())
        self.fps = float(self.cap.get(cv2.CAP_PROP_FPS) or 0.0) or 30.0
        self.frame_count = int(self.cap.get(cv2.CAP_PROP_FRAME_COUNT) or 0) or 0
        self.cur_frame_idx = int(self.cap.get(cv2.CAP_PROP_POS_FRAMES) or 0) or 0
        self.last_t_sec: float = 0.0
        self.last_used = time.time()

    def _reopen(self) -> None:
        try:
            self.cap.release()
        except Exception:
            pass
        self.cap = cv2.VideoCapture(str(self.video_path))
        self.opened = bool(self.cap.isOpened())
        self.fps = float(self.cap.get(cv2.CAP_PROP_FPS) or 0.0) or self.fps or 30.0
        self.frame_count = int(self.cap.get(cv2.CAP_PROP_FRAME_COUNT) or 0) or self.frame_count
        self.cur_frame_idx = int(self.cap.get(cv2.CAP_PROP_POS_FRAMES) or 0) or 0

    def get_frame_at(self, t_sec: float) -> Optional[tuple[Any, float]]:
        """
        Returns (frame_bgr, actual_t_sec) or None.
        """
        with self.lock:
            self.last_used = time.time()
            if not self.opened:
                return None

            # Target frame index.
            target = int(max(0.0, float(t_sec)) * float(self.fps))

            # If time moves backwards or we jump far, seek directly.
            if target < self.cur_frame_idx or (target - self.cur_frame_idx) > int(self.fps * 2):
                self.cap.set(cv2.CAP_PROP_POS_FRAMES, max(0, target))
                self.cur_frame_idx = int(self.cap.get(cv2.CAP_PROP_POS_FRAMES) or target) or target

            # Advance until we reach the target.
            while self.cur_frame_idx < target:
                ok, _ = self.cap.read()
                if not ok:
                    return None
                self.cur_frame_idx += 1

            ok, frame = self.cap.read()
            if not ok or frame is None:
                return None
            self.cur_frame_idx += 1
            actual_t = float(self.cur_frame_idx / float(self.fps)) if self.fps else float(t_sec)
            self.last_t_sec = float(t_sec)
            return frame, actual_t


_READERS: dict[str, _CachedVideoReader] = {}
_READERS_LOCK = threading.Lock()
_READER_TTL_SEC = 60.0


def _get_reader(video_path: Path) -> _CachedVideoReader:
    key = str(video_path.resolve())
    now = time.time()
    with _READERS_LOCK:
        # Cleanup old readers.
        stale = [k for k, r in _READERS.items() if (now - r.last_used) > _READER_TTL_SEC]
        for k in stale:
            try:
                _READERS[k].cap.release()
            except Exception:
                pass
            _READERS.pop(k, None)

        r = _READERS.get(key)
        if r is None:
            r = _CachedVideoReader(video_path)
            _READERS[key] = r
        return r


def detect_faces_at_time(
    *,
    video_path: Path,
    t_sec: float,
    max_faces: int = 2,
    min_score: float = 0.5,
    min_face_px: int = 80,
    ignore_bottom_ratio: float = 0.20,
) -> list[FaceBox]:
    reader = _get_reader(video_path)
    got = reader.get_frame_at(float(t_sec))
    if not got:
        return []
    frame, _actual_t = got

    h, w = frame.shape[:2]
    boxes, scores = get_face_boundingbox(frame)

    dets: list[dict[str, Any]] = []
    for i in range(int(len(boxes))):
        b = boxes[i].data.cpu().numpy().tolist()
        sc = float(scores[i].data.cpu().numpy().item()) if len(scores) > i else None
        if sc is not None and sc < float(min_score):
            continue
        x1, y1, x2, y2 = map(int, b)
        # Clamp.
        x1 = max(0, min(x1, w - 1))
        y1 = max(0, min(y1, h - 1))
        x2 = max(0, min(x2, w - 1))
        y2 = max(0, min(y2, h - 1))
        if x2 <= x1 or y2 <= y1:
            continue
        if (x2 - x1) < min_face_px or (y2 - y1) < min_face_px:
            continue
        if y2 > int(h * (1.0 - ignore_bottom_ratio)):
            # Bottom HUD often contains tiny avatars/icons that look like faces.
            continue
        area = (x2 - x1) * (y2 - y1)
        dets.append({"x1": x1, "y1": y1, "x2": x2, "y2": y2, "score": sc, "area": area})

    dets.sort(key=lambda d: d["area"], reverse=True)
    dets = dets[: int(max_faces)]

    out: list[FaceBox] = []
    for d in dets:
        out.append(
            FaceBox(
                x=int(d["x1"]),
                y=int(d["y1"]),
                w=int(d["x2"] - d["x1"]),
                h=int(d["y2"] - d["y1"]),
                score=float(d["score"]) if d.get("score") is not None else None,
            )
        )
    return out
