from __future__ import annotations

import mimetypes
import os
from pathlib import Path
from typing import Any
from uuid import uuid4

import cv2

from .timeutil import now_utc_iso


def safe_ext(original_name: str) -> str:
    _, ext = os.path.splitext(original_name)
    ext = (ext or "").lower()
    if ext and len(ext) <= 10:
        return ext
    return ".mp4"


def probe_video(path: Path) -> dict[str, Any]:
    cap = cv2.VideoCapture(str(path))
    try:
        fps = float(cap.get(cv2.CAP_PROP_FPS) or 0.0) or None
        frame_count = float(cap.get(cv2.CAP_PROP_FRAME_COUNT) or 0.0) or None
        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH) or 0) or None
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT) or 0) or None
        duration_sec = None
        if fps and frame_count and fps > 0:
            duration_sec = float(frame_count / fps)
        return {
            "fps": fps,
            "frame_count": frame_count,
            "width": width,
            "height": height,
            "duration_sec": duration_sec,
        }
    finally:
        cap.release()


def store_upload(videos_dir: Path, original_name: str, content: bytes) -> tuple[str, Path]:
    ext = safe_ext(original_name)
    stored_name = f"{uuid4().hex}{ext}"
    out_path = videos_dir / stored_name
    out_path.write_bytes(content)
    return stored_name, out_path


def guess_mime(path: Path) -> str:
    mime, _ = mimetypes.guess_type(str(path))
    return mime or "application/octet-stream"


def new_video_row(original_name: str, stored_name: str, meta: dict[str, Any]) -> dict[str, Any]:
    return {
        "original_name": original_name,
        "stored_name": stored_name,
        "uploaded_at": now_utc_iso(),
        "duration_sec": meta.get("duration_sec"),
        "width": meta.get("width"),
        "height": meta.get("height"),
        "fps": meta.get("fps"),
    }

