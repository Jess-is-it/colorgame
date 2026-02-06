from __future__ import annotations

import json
import os
from dataclasses import dataclass
from typing import Any, Dict, Literal, Optional


CameraType = Literal["device", "rtsp"]


@dataclass(frozen=True)
class CameraConfig:
    type: CameraType
    device_index: int
    rtsp_url: str


@dataclass(frozen=True)
class StreamConfig:
    jpeg_quality: int
    max_fps: float


@dataclass(frozen=True)
class AppConfig:
    camera: CameraConfig
    stream: StreamConfig


def _read_json(path: str) -> Dict[str, Any]:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def load_config(path: Optional[str] = None) -> AppConfig:
    """
    Loads config from JSON.

    Path resolution order:
      1) explicit path param
      2) env CONFIG_PATH
      3) ../config.json relative to this file (project default)
    """
    if path is None:
        path = os.environ.get("CONFIG_PATH")
    if not path:
        path = os.path.join(os.path.dirname(__file__), "..", "config.json")
    path = os.path.abspath(path)

    raw = _read_json(path)
    cam = raw.get("camera") or {}
    stream = raw.get("stream") or {}

    cam_type = str(cam.get("type", "device")).strip().lower()
    if cam_type not in ("device", "rtsp"):
        cam_type = "device"

    device_index = int(cam.get("device_index", 0))
    rtsp_url = str(cam.get("rtsp_url", "") or "")

    jpeg_quality = int(stream.get("jpeg_quality", 80))
    jpeg_quality = max(30, min(95, jpeg_quality))

    max_fps = float(stream.get("max_fps", 15))
    max_fps = max(1.0, min(60.0, max_fps))

    return AppConfig(
        camera=CameraConfig(type=cam_type, device_index=device_index, rtsp_url=rtsp_url),
        stream=StreamConfig(jpeg_quality=jpeg_quality, max_fps=max_fps),
    )


