from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Any

import cv2

from face_detect.detect_imgs import get_face_boundingbox  # type: ignore


@dataclass(frozen=True)
class FaceBox:
    x: int
    y: int
    w: int
    h: int
    score: float | None = None


def detect_faces_at_time(
    *,
    video_path: Path,
    t_sec: float,
    max_faces: int = 2,
    min_score: float = 0.5,
    min_face_px: int = 80,
    ignore_bottom_ratio: float = 0.20,
) -> list[FaceBox]:
    cap = cv2.VideoCapture(str(video_path))
    if not cap.isOpened():
        return []
    try:
        # Seek (best-effort).
        cap.set(cv2.CAP_PROP_POS_MSEC, max(0.0, float(t_sec)) * 1000.0)
        ok, frame = cap.read()
        if not ok or frame is None:
            return []

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
    finally:
        cap.release()
