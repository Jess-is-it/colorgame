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

    # One ROI that contains all 3 result color boxes (left -> right).
    # The detector splits this ROI into 3 equal-width sub-ROIs internally.
    # Can be None until the user calibrates.
    result_roi: Optional[ROI] = ROI(1240, 25, 380, 110)

    # how many consecutive frames must match before we emit a result
    stable_frames: int = 8

    # minimum confidence (per-box). If any box is below this, we consider the frame invalid.
    min_confidence: float = 0.35

    # If ROI is invalid (RESULT screen not visible) for this many frames, allow emitting the
    # same colors again when RESULT appears again (consecutive games can repeat).
    gap_reset_frames: int = 15

    # Optional trained model from user-labeled samples.
    model: Optional[dict] = None


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
    def classify_patch(patch_bgr: np.ndarray) -> Tuple[str, float, Dict[str, float]]:
        """
        Classify a patch that is mostly a flat UI color (one of the square result boxes).

        Uses pixel proportions in HSV ranges rather than a single mean, which is more robust
        to gradients/borders/compression.
        """
        if patch_bgr.size == 0:
            return "unknown", 0.0, {"error": "empty"}

        hsv = cv2.cvtColor(patch_bgr, cv2.COLOR_BGR2HSV)
        h = hsv[:, :, 0].astype(np.int16)
        s = hsv[:, :, 1].astype(np.int16)
        v = hsv[:, :, 2].astype(np.int16)

        # Valid colored pixels (ignore very dark/gray noise)
        valid = (v > 60) & (s > 35)
        total = int(h.size)
        valid_count = int(valid.sum())

        # White detection: lots of bright, low-s pixels.
        white_mask = (v > 185) & (s < 35)
        white_ratio = float(white_mask.sum()) / float(max(1, total))
        if white_ratio > 0.35:
            # increase confidence when it's very white and not much saturated color
            conf = min(1.0, white_ratio + (0.2 if valid_count < (total * 0.2) else 0.0))
            return "white", conf, {"white_ratio": white_ratio, "valid_ratio": float(valid_count) / float(max(1, total))}

        if valid_count < max(50, int(total * 0.08)):
            return "unknown", 0.0, {"valid_ratio": float(valid_count) / float(max(1, total))}

        hh = h[valid]

        def ratio_in(lo: int, hi: int) -> float:
            if lo <= hi:
                return float(((hh >= lo) & (hh <= hi)).sum()) / float(max(1, hh.size))
            # wrap-around range
            return float(((hh >= lo) | (hh <= hi)).sum()) / float(max(1, hh.size))

        # OpenCV hue ranges (0..179). Tuned for bright UI colors.
        ratios = {
            # red often looks orange under UI glow; include 0..16 and wrap-around.
            "red": ratio_in(0, 16) + ratio_in(165, 179),
            "yellow": ratio_in(17, 40),
            "green": ratio_in(45, 85),
            "blue": ratio_in(90, 130),
            # magenta/pink
            "pink": ratio_in(135, 164),
        }

        color = max(ratios, key=lambda k: ratios[k])
        conf = float(ratios[color])

        if conf < 0.25:
            return "unknown", 0.0, {"ratios": ratios, "valid_ratio": float(valid_count) / float(max(1, total))}

        # Normalize to [0..1] with a slight boost for very dominant colors.
        conf = min(1.0, conf * 1.25)
        return color, conf, {"ratios": ratios, "valid_ratio": float(valid_count) / float(max(1, total))}

    @staticmethod
    def classify_patch_with_model(patch_bgr: np.ndarray, model: dict) -> Tuple[str, float, Dict[str, float]]:
        """
        Model-based classifier trained from user-labeled samples.
        Model format:
          { "version": 1, "centroids": { color: { "h": float, "s": float, "v": float, "n": int } } }
        """
        if patch_bgr.size == 0:
            return "unknown", 0.0, {"error": "empty"}

        centroids = (model or {}).get("centroids") or {}
        if not centroids:
            return ColorClassifier.classify_patch(patch_bgr)

        hsv = cv2.cvtColor(patch_bgr, cv2.COLOR_BGR2HSV)
        h = hsv[:, :, 0].astype(np.float32)
        s = hsv[:, :, 1].astype(np.float32)
        v = hsv[:, :, 2].astype(np.float32)

        valid = (v > 60) & ((s > 25) | (v > 185))
        if int(valid.sum()) < max(50, int(h.size * 0.08)):
            return "unknown", 0.0, {"valid_ratio": float(valid.sum()) / float(max(1, h.size))}

        mh = float(np.mean(h[valid]))
        ms = float(np.mean(s[valid]))
        mv = float(np.mean(v[valid]))

        def hue_dist(a: float, b: float) -> float:
            d = abs(a - b)
            return min(d, 180.0 - d)

        best_name = "unknown"
        best_d = 1e9
        for name, c in centroids.items():
            try:
                ch = float(c["h"])
                cs = float(c["s"])
                cv = float(c["v"])
            except Exception:
                continue
            d = hue_dist(mh, ch) * 2.0 + abs(ms - cs) * 0.02 + abs(mv - cv) * 0.01
            if d < best_d:
                best_d = d
                best_name = str(name)

        if best_name == "unknown" or best_d >= 40.0:
            return "unknown", 0.0, {"mh": mh, "ms": ms, "mv": mv, "dist": best_d}

        conf = float(max(0.0, 1.0 - (best_d / 40.0)))
        return best_name, conf, {"mh": mh, "ms": ms, "mv": mv, "dist": best_d}


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
        self._gap_count: int = 0
        self._last_detected_ts: Optional[float] = None

    def _load_or_init_config(self) -> DetectorConfig:
        os.makedirs(os.path.dirname(self.config_path) or ".", exist_ok=True)
        if not os.path.exists(self.config_path):
            cfg = DetectorConfig()
            self._save_config(cfg)
            return cfg
        try:
            with open(self.config_path, "r", encoding="utf-8") as f:
                raw = json.load(f)

            # Backward compat: older configs used explicit 3 boxes. Convert to a single bounding ROI.
            # NOTE: config can explicitly set result_roi to null.
            if "result_roi" in raw:
                result_roi_raw = raw.get("result_roi")
                if result_roi_raw is None:
                    result_roi = None
                else:
                    result_roi = ROI(
                        int(result_roi_raw["x"]),
                        int(result_roi_raw["y"]),
                        int(result_roi_raw["w"]),
                        int(result_roi_raw["h"]),
                    )
            else:
                boxes = raw.get("boxes") or []
                if len(boxes) != 3:
                    # fall back to defaults without overwriting file
                    return DetectorConfig()
                rois = [ROI(int(b["x"]), int(b["y"]), int(b["w"]), int(b["h"])) for b in boxes]
                x0 = min(r.x for r in rois)
                y0 = min(r.y for r in rois)
                x1 = max(r.x + r.w for r in rois)
                y1 = max(r.y + r.h for r in rois)
                result_roi = ROI(x0, y0, x1 - x0, y1 - y0)

            return DetectorConfig(
                width=int(raw.get("width", 1920)),
                height=int(raw.get("height", 1080)),
                result_roi=result_roi,
                stable_frames=int(raw.get("stable_frames", 8)),
                min_confidence=float(raw.get("min_confidence", 0.35)),
                gap_reset_frames=int(raw.get("gap_reset_frames", 15)),
                model=raw.get("model"),
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
            "gap_reset_frames": cfg.gap_reset_frames,
            "model": cfg.model,
            "result_roi": (
                None
                if cfg.result_roi is None
                else {"x": cfg.result_roi.x, "y": cfg.result_roi.y, "w": cfg.result_roi.w, "h": cfg.result_roi.h}
            ),
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
            "gap_reset_frames": cfg.gap_reset_frames,
            "model": cfg.model,
            "result_roi": (
                None
                if cfg.result_roi is None
                else {"x": cfg.result_roi.x, "y": cfg.result_roi.y, "w": cfg.result_roi.w, "h": cfg.result_roi.h}
            ),
        }

    def set_config(self, payload: dict) -> dict:
        rr = payload.get("result_roi", "MISSING")
        if rr == "MISSING":
            raise ValueError("result_roi is required (can be null to clear)")
        result_roi = None
        if rr is not None:
            result_roi = ROI(int(rr["x"]), int(rr["y"]), int(rr["w"]), int(rr["h"]))
        cfg = DetectorConfig(
            width=int(payload.get("width", 1920)),
            height=int(payload.get("height", 1080)),
            result_roi=result_roi,
            stable_frames=max(1, int(payload.get("stable_frames", 8))),
            min_confidence=float(payload.get("min_confidence", 0.35)),
            gap_reset_frames=max(1, int(payload.get("gap_reset_frames", 15))),
            model=payload.get("model"),
        )
        with self._lock:
            self._config = cfg
            # reset stability to avoid emitting mismatched old state
            self._last_tuple = None
            self._stable_count = 0
        self._save_config(cfg)
        return self.get_config()

    def apply_draw_record(self, draw: dict) -> None:
        """
        Apply a draw record from DrawStore as the active detector config.
        This does not persist anything itself.
        """
        rr = draw.get("result_roi")
        payload = {
            "width": int(draw.get("width", 1920)),
            "height": int(draw.get("height", 1080)),
            "stable_frames": int(draw.get("stable_frames", 8)),
            "min_confidence": float(draw.get("min_confidence", 0.35)),
            "result_roi": rr,
            "model": draw.get("model"),
        }
        # reuse validation and reset logic
        self.set_config(payload)

    def status(self) -> dict:
        with self._lock:
            last = self._results[-1] if self._results else None
            cfg = self._config
            return {
                "running": self._thread is not None and self._thread.is_alive(),
                "connected": self._connected,
                "fps": self.fps,
                "last_frame_time": self._last_frame_ts,
                "last_error": self._last_error,
                "last_result": last,
                "last_detected_time": self._last_detected_ts,
                "config": {
                    "width": cfg.width,
                    "height": cfg.height,
                    "result_roi": (
                        None
                        if cfg.result_roi is None
                        else {"x": cfg.result_roi.x, "y": cfg.result_roi.y, "w": cfg.result_roi.w, "h": cfg.result_roi.h}
                    ),
                },
            }

    def list_results(self) -> List[dict]:
        with self._lock:
            return list(self._results)

    def clear_results(self) -> None:
        with self._lock:
            self._results.clear()
            self._last_emitted = None
            self._last_tuple = None
            self._stable_count = 0

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
                        self._gap_count += 1
                        if self._gap_count >= cfg.gap_reset_frames:
                            self._last_emitted = None
                        # still sleep to respect fps
                        elapsed = time.time() - start
                        time.sleep(max(0.0, interval - elapsed))
                        continue
                    else:
                        self._gap_count = 0
                        self._last_detected_ts = time.time()

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

        if cfg.result_roi is None:
            return ["unknown", "unknown", "unknown"], [0.0, 0.0, 0.0], [{"error": "result_roi not set"}]

        rr = cfg.result_roi

        # Find the 3 square result boxes inside the ROI.
        boxes = self._find_three_boxes(frame, cfg, rr)
        if boxes is None:
            # Fallback: assume ROI is only the 3 boxes and split evenly.
            thirds: List[ROI] = []
            w3 = max(1, rr.w // 3)
            for i in range(3):
                x = rr.x + i * w3
                w = w3 if i < 2 else rr.w - 2 * w3
                thirds.append(ROI(x, rr.y, w, rr.h))
            boxes = thirds

        for roi in boxes:
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
            ph, pw = patch.shape[:2]
            cx0, cy0 = int(pw * 0.18), int(ph * 0.18)
            cx1, cy1 = int(pw * 0.82), int(ph * 0.82)
            inner = patch[cy0:cy1, cx0:cx1]

            if cfg.model:
                name, conf, extra = ColorClassifier.classify_patch_with_model(inner, cfg.model)
            else:
                name, conf, extra = ColorClassifier.classify_patch(inner)
            colors.append(name)
            confs.append(conf)
            debug.append(
                {
                    "roi": {"x": roi.x, "y": roi.y, "w": roi.w, "h": roi.h},
                    "patch_shape": [int(inner.shape[1]), int(inner.shape[0])],
                    "confidence": conf,
                    "color": name,
                    "extra": extra,
                }
            )

        return colors, confs, debug

    def _find_three_boxes(self, frame: np.ndarray, cfg: DetectorConfig, rr: ROI) -> Optional[List[ROI]]:
        """
        Try to locate the 3 square UI boxes inside the configured ROI.
        This allows users to draw a larger ROI that includes the "RESULT" text.
        """
        x0 = max(0, rr.x)
        y0 = max(0, rr.y)
        x1 = min(cfg.width, rr.x + rr.w)
        y1 = min(cfg.height, rr.y + rr.h)
        region = frame[y0:y1, x0:x1]
        if region.size == 0:
            return None

        gray = cv2.cvtColor(region, cv2.COLOR_BGR2GRAY)
        gray = cv2.GaussianBlur(gray, (5, 5), 0)
        edges = cv2.Canny(gray, 50, 150)

        contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        if not contours:
            return None

        rr_h, rr_w = region.shape[:2]
        rr_area = float(rr_h * rr_w)
        cands: List[Tuple[float, ROI]] = []

        for c in contours:
            x, y, w, h = cv2.boundingRect(c)
            if w < 12 or h < 12:
                continue
            area = float(w * h)
            if area < max(800.0, rr_area * 0.01) or area > rr_area * 0.6:
                continue
            ar = float(w) / float(h)
            if ar < 0.75 or ar > 1.35:
                continue
            # In the sample UI, boxes are on the right side.
            if x < int(rr_w * 0.35):
                continue
            cands.append((area, ROI(rr.x + x, rr.y + y, w, h)))

        if len(cands) < 3:
            return None

        # Prefer larger boxes.
        cands.sort(key=lambda t: t[0], reverse=True)
        rois = [r for _, r in cands[:20]]

        # Find best triplet that is aligned on a row and has similar sizes.
        best: Optional[Tuple[float, List[ROI]]] = None
        for i in range(len(rois)):
            for j in range(i + 1, len(rois)):
                for k in range(j + 1, len(rois)):
                    trio = [rois[i], rois[j], rois[k]]
                    trio.sort(key=lambda r: r.x)

                    ys = [r.y for r in trio]
                    hs = [r.h for r in trio]
                    ws = [r.w for r in trio]

                    y_span = max(ys) - min(ys)
                    h_med = sorted(hs)[1]
                    if y_span > max(10, int(h_med * 0.25)):
                        continue

                    # size similarity
                    if max(ws) - min(ws) > max(12, int(sorted(ws)[1] * 0.25)):
                        continue
                    if max(hs) - min(hs) > max(12, int(h_med * 0.25)):
                        continue

                    # spacing should be reasonable and increasing
                    gaps = [trio[1].x - (trio[0].x + trio[0].w), trio[2].x - (trio[1].x + trio[1].w)]
                    if gaps[0] < -5 or gaps[1] < -5:
                        continue
                    if gaps[0] > rr.w or gaps[1] > rr.w:
                        continue

                    score = float(sum(ws) + sum(hs)) - float(y_span) * 2.0 - float(abs(gaps[0] - gaps[1])) * 0.5
                    if best is None or score > best[0]:
                        best = (score, trio)

        if best is None:
            return None

        # Normalize to exactly 3, left->right.
        trio = best[1]
        trio.sort(key=lambda r: r.x)
        return trio
