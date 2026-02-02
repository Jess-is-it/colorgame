from __future__ import annotations

import json
import os
import threading
import time
from collections import deque
from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Deque, Dict, List, Optional, Tuple

import cv2
import numpy as np


@dataclass(frozen=True)
class ROI:
    # pixel coordinates in the *input frame resolution*
    x: int
    y: int
    w: int
    h: int


@dataclass
class DetectorConfig:
    # expected incoming frame size; we resize frames to this before ROI sampling
    width: int = 1920
    height: int = 1080

    # 3 result boxes (left -> right)
    boxes: Tuple[ROI, ROI, ROI] = (
        ROI(1250, 35, 105, 85),
        ROI(1370, 35, 105, 85),
        ROI(1490, 35, 105, 85),
    )

    # how many consecutive frames must match before we emit a result
    stable_frames: int = 8

    # minimum confidence (per-box). If any box is below this, we consider the frame invalid.
    min_confidence: float = 0.35


def _utc_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


class ColorClassifier:
    """
    Very pragmatic HSV classifier for the game colors.
    Assumptions:
    - Lighting is fairly consistent
    - Colors are saturated (except white)
    """

    COLORS = ("yellow", "white", "pink", "blue", "red", "green")

    @staticmethod
    def classify_bgr(bgr_mean: np.ndarray) -> Tuple[str, float, Dict[str, float]]:
        bgr = bgr_mean.astype(np.uint8).reshape(1, 1, 3)
        hsv = cv2.cvtColor(bgr, cv2.COLOR_BGR2HSV).reshape(3)
        h, s, v = float(hsv[0]), float(hsv[1]), float(hsv[2])

        # too dark or too gray -> unknown
        if v < 35:
            return "unknown", 0.0, {"h": h, "s": s, "v": v}
        if s < 12 and v < 180:
            return "unknown", 0.0, {"h": h, "s": s, "v": v}

        # white: low saturation, high value
        if s < 35 and v > 160:
            # confidence increases as saturation decreases and value increases
            conf = min(1.0, (max(0.0, 60.0 - s) / 60.0) * (min(255.0, v) / 255.0))
            return "white", conf, {"h": h, "s": s, "v": v}

        # OpenCV hue: [0..179]
        # We'll use broad bands and a simple distance-to-center score.
        # These centers are typical for vivid colors.
        centers = {
            "red": (0.0, 10.0),  # red wraps around; handle separately
            "yellow": (27.0, 20.0),
            "green": (70.0, 25.0),
            "blue": (110.0, 25.0),
            "pink": (165.0, 25.0),
        }

        def hue_dist(a: float, b: float) -> float:
            d = abs(a - b)
            return min(d, 180.0 - d)

        best = None
        best_score = -1.0
        for name, (center_h, tol) in centers.items():
            d = hue_dist(h, center_h)
            score = max(0.0, 1.0 - (d / max(1.0, tol)))
            # penalize low saturation / low value
            score *= min(1.0, s / 100.0) * min(1.0, v / 120.0)
            if score > best_score:
                best_score = score
                best = name

        if best is None:
            return "unknown", 0.0, {"h": h, "s": s, "v": v}

        return best, float(best_score), {"h": h, "s": s, "v": v}


class ResultDetector:
    def __init__(
        self,
        rtsp_url: str,
        fps: float,
        config_path: str,
        max_results: int = 200,
    ) -> None:
        self.rtsp_url = rtsp_url
        self.fps = max(1.0, float(fps))
        self.config_path = config_path

        self._lock = threading.Lock()
        self._thread: Optional[threading.Thread] = None
        self._stop = threading.Event()

        self._connected: bool = False
        self._last_frame_ts: Optional[float] = None
        self._last_error: Optional[str] = None

        self._results: Deque[dict] = deque(maxlen=max_results)
        self._config: DetectorConfig = self._load_or_init_config()

        # stability state
        self._last_tuple: Optional[Tuple[str, str, str]] = None
        self._stable_count: int = 0
        self._last_emitted: Optional[Tuple[str, str, str]] = None

    def _load_or_init_config(self) -> DetectorConfig:
        os.makedirs(os.path.dirname(self.config_path) or ".", exist_ok=True)
        if not os.path.exists(self.config_path):
            cfg = DetectorConfig()
            self._save_config(cfg)
            return cfg
        try:
            with open(self.config_path, "r", encoding="utf-8") as f:
                raw = json.load(f)
            boxes = raw.get("boxes") or []
            if len(boxes) != 3:
                raise ValueError("config boxes must have length 3")
            roi_boxes = tuple(ROI(int(b["x"]), int(b["y"]), int(b["w"]), int(b["h"])) for b in boxes)  # type: ignore
            return DetectorConfig(
                width=int(raw.get("width", 1920)),
                height=int(raw.get("height", 1080)),
                boxes=roi_boxes,  # type: ignore[arg-type]
                stable_frames=int(raw.get("stable_frames", 8)),
                min_confidence=float(raw.get("min_confidence", 0.35)),
            )
        except Exception:
            # fall back to defaults, but don't overwrite user's file automatically
            return DetectorConfig()

    def _save_config(self, cfg: DetectorConfig) -> None:
        payload = {
            "width": cfg.width,
            "height": cfg.height,
            "stable_frames": cfg.stable_frames,
            "min_confidence": cfg.min_confidence,
            "boxes": [{"x": b.x, "y": b.y, "w": b.w, "h": b.h} for b in cfg.boxes],
        }
        tmp = self.config_path + ".tmp"
        with open(tmp, "w", encoding="utf-8") as f:
            json.dump(payload, f, indent=2)
        os.replace(tmp, self.config_path)

    def get_config(self) -> dict:
        with self._lock:
            cfg = self._config
        return {
            "width": cfg.width,
            "height": cfg.height,
            "stable_frames": cfg.stable_frames,
            "min_confidence": cfg.min_confidence,
            "boxes": [{"x": b.x, "y": b.y, "w": b.w, "h": b.h} for b in cfg.boxes],
        }

    def set_config(self, payload: dict) -> dict:
        boxes = payload.get("boxes") or []
        if len(boxes) != 3:
            raise ValueError("boxes must have length 3")
        cfg = DetectorConfig(
            width=int(payload.get("width", 1920)),
            height=int(payload.get("height", 1080)),
            boxes=(
                ROI(int(boxes[0]["x"]), int(boxes[0]["y"]), int(boxes[0]["w"]), int(boxes[0]["h"])),
                ROI(int(boxes[1]["x"]), int(boxes[1]["y"]), int(boxes[1]["w"]), int(boxes[1]["h"])),
                ROI(int(boxes[2]["x"]), int(boxes[2]["y"]), int(boxes[2]["w"]), int(boxes[2]["h"])),
            ),
            stable_frames=max(1, int(payload.get("stable_frames", 8))),
            min_confidence=float(payload.get("min_confidence", 0.35)),
        )
        with self._lock:
            self._config = cfg
            # reset stability to avoid emitting mismatched old state
            self._last_tuple = None
            self._stable_count = 0
        self._save_config(cfg)
        return self.get_config()

    def status(self) -> dict:
        with self._lock:
            last = self._results[-1] if self._results else None
            return {
                "running": self._thread is not None and self._thread.is_alive(),
                "connected": self._connected,
                "fps": self.fps,
                "last_frame_time": self._last_frame_ts,
                "last_error": self._last_error,
                "last_result": last,
            }

    def list_results(self) -> List[dict]:
        with self._lock:
            return list(self._results)

    def start(self) -> None:
        with self._lock:
            if self._thread is not None and self._thread.is_alive():
                return
            self._stop.clear()
            self._thread = threading.Thread(target=self._run, name="result-detector", daemon=True)
            self._thread.start()

    def stop(self) -> None:
        self._stop.set()
        t = None
        with self._lock:
            t = self._thread
        if t is not None:
            t.join(timeout=2.0)

    def snapshot_jpeg(self) -> bytes:
        cap = cv2.VideoCapture(self.rtsp_url, cv2.CAP_FFMPEG)
        try:
            ok, frame = cap.read()
            if not ok or frame is None:
                raise RuntimeError("could not read frame")
            with self._lock:
                cfg = self._config
            frame = cv2.resize(frame, (cfg.width, cfg.height))
            ok, buf = cv2.imencode(".jpg", frame, [int(cv2.IMWRITE_JPEG_QUALITY), 85])
            if not ok:
                raise RuntimeError("encode failed")
            return buf.tobytes()
        finally:
            cap.release()

    def _run(self) -> None:
        interval = 1.0 / self.fps
        while not self._stop.is_set():
            cap = cv2.VideoCapture(self.rtsp_url, cv2.CAP_FFMPEG)
            if not cap.isOpened():
                with self._lock:
                    self._connected = False
                    self._last_error = f"cannot open RTSP: {self.rtsp_url}"
                time.sleep(1.0)
                continue

            with self._lock:
                self._connected = True
                self._last_error = None

            try:
                while not self._stop.is_set():
                    start = time.time()
                    ok, frame = cap.read()
                    if not ok or frame is None:
                        raise RuntimeError("RTSP read failed")

                    with self._lock:
                        cfg = self._config
                        self._last_frame_ts = time.time()

                    frame = cv2.resize(frame, (cfg.width, cfg.height))
                    colors, confs, debug = self._detect_colors(frame, cfg)
                    tuple_colors = tuple(colors)  # type: ignore[arg-type]
                    min_conf = float(min(confs)) if confs else 0.0

                    # Guard against misconfigured ROI / non-result screens.
                    if any(c == "unknown" for c in tuple_colors) or min_conf < cfg.min_confidence:
                        self._last_tuple = None
                        self._stable_count = 0
                        # still sleep to respect fps
                        elapsed = time.time() - start
                        time.sleep(max(0.0, interval - elapsed))
                        continue

                    # stability gate
                    emit = False
                    if self._last_tuple == tuple_colors:
                        self._stable_count += 1
                    else:
                        self._last_tuple = tuple_colors
                        self._stable_count = 1

                    if self._stable_count >= cfg.stable_frames and tuple_colors != self._last_emitted:
                        emit = True
                        self._last_emitted = tuple_colors

                    if emit:
                        rec = {
                            "timestamp": _utc_iso(),
                            "colors": list(tuple_colors),
                            "confidence": min_conf,
                            "debug": debug,
                        }
                        with self._lock:
                            self._results.append(rec)

                    elapsed = time.time() - start
                    time.sleep(max(0.0, interval - elapsed))
            except Exception as e:
                with self._lock:
                    self._connected = False
                    self._last_error = str(e)
                time.sleep(0.5)
            finally:
                cap.release()

    def _detect_colors(self, frame: np.ndarray, cfg: DetectorConfig) -> Tuple[List[str], List[float], List[dict]]:
        colors: List[str] = []
        confs: List[float] = []
        debug: List[dict] = []

        for roi in cfg.boxes:
            x0 = max(0, roi.x)
            y0 = max(0, roi.y)
            x1 = min(cfg.width, roi.x + roi.w)
            y1 = min(cfg.height, roi.y + roi.h)

            patch = frame[y0:y1, x0:x1]
            if patch.size == 0:
                colors.append("unknown")
                confs.append(0.0)
                debug.append({"roi": {"x": roi.x, "y": roi.y, "w": roi.w, "h": roi.h}, "error": "empty"})
                continue

            # sample the center region to avoid rounded borders/shadows
            h, w = patch.shape[:2]
            cx0, cy0 = int(w * 0.2), int(h * 0.2)
            cx1, cy1 = int(w * 0.8), int(h * 0.8)
            inner = patch[cy0:cy1, cx0:cx1]
            mean_bgr = inner.reshape(-1, 3).mean(axis=0)

            name, conf, hsv = ColorClassifier.classify_bgr(mean_bgr)
            colors.append(name)
            confs.append(conf)
            debug.append(
                {
                    "roi": {"x": roi.x, "y": roi.y, "w": roi.w, "h": roi.h},
                    "mean_bgr": [float(mean_bgr[0]), float(mean_bgr[1]), float(mean_bgr[2])],
                    "hsv": hsv,
                    "confidence": conf,
                    "color": name,
                }
            )

        return colors, confs, debug
