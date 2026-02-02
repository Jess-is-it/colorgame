from __future__ import annotations

import datetime as dt
import json
import re
import subprocess
import threading
import time
from dataclasses import dataclass

import numpy as np
from PIL import Image
import pytesseract
from pytesseract import Output

from app.config import settings
from app.db import SessionLocal
from app import crud
from app.schemas import ProcessorStatus


@dataclass(frozen=True)
class PresetSnapshot:
    id: int
    name: str
    input_width: int
    input_height: int
    rois: list[dict]
    keywords: list[str]
    confidence_threshold: float
    score_regex: str | None


def _now_utc() -> dt.datetime:
    return dt.datetime.now(dt.timezone.utc)


def _normalize_text(s: str) -> str:
    return re.sub(r"\s+", " ", s).strip().lower()


def _ocr_text_and_conf(bgr_img: np.ndarray) -> tuple[str, float]:
    # Tesseract is happier with RGB.
    rgb = bgr_img[:, :, ::-1]
    pil = Image.fromarray(rgb)

    data = pytesseract.image_to_data(pil, output_type=Output.DICT, config="--psm 6")
    words = []
    confs = []

    for txt, conf in zip(data.get("text", []), data.get("conf", [])):
        txt = (txt or "").strip()
        try:
            c = float(conf)
        except Exception:
            c = -1

        if txt:
            words.append(txt)
        if txt and c >= 0:
            confs.append(c)

    text = " ".join(words).strip()
    avg_conf = float(sum(confs) / len(confs)) if confs else 0.0
    return text, avg_conf


def _keyword_score(text: str, keywords: list[str]) -> float:
    if not keywords:
        return 0.0
    t = text.lower()
    found = 0
    for kw in keywords:
        if not kw:
            continue
        if kw.lower() in t:
            found += 1
    return found / max(1, len([k for k in keywords if k]))


def _compute_confidence(ocr_conf_0_100: float, keyword_score_0_1: float, has_keywords: bool) -> float:
    ocr = max(0.0, min(1.0, ocr_conf_0_100 / 100.0))
    if has_keywords:
        # Keywords matter most for MVP; OCR confidence is a weak signal.
        return (0.75 * keyword_score_0_1) + (0.25 * ocr)
    return ocr


class StreamProcessor:
    def __init__(self, preset: PresetSnapshot, *, sample_fps: float):
        self.preset = preset
        self.sample_fps = float(sample_fps)

        self._stop = threading.Event()
        self._thread: threading.Thread | None = None

        self._lock = threading.Lock()
        self._connected = False
        self._last_frame_time: dt.datetime | None = None
        self._frames_processed = 0
        self._last_error: str | None = None

        self._last_emit_time = 0.0
        self._last_emit_text_norm: str | None = None

    def start(self) -> None:
        if self._thread and self._thread.is_alive():
            return
        self._thread = threading.Thread(target=self._run, name=f"processor-{self.preset.id}", daemon=True)
        self._thread.start()

    def stop(self) -> None:
        self._stop.set()
        t = self._thread
        if t:
            t.join(timeout=3.0)

    def status(self) -> ProcessorStatus:
        with self._lock:
            return ProcessorStatus(
                running=bool(self._thread and self._thread.is_alive()),
                preset_id=self.preset.id,
                sample_fps=self.sample_fps,
                connected=self._connected,
                last_frame_time=self._last_frame_time,
                frames_processed=self._frames_processed,
                last_error=self._last_error,
            )

    def _set_error(self, msg: str | None) -> None:
        with self._lock:
            self._last_error = msg

    def _set_connected(self, connected: bool) -> None:
        with self._lock:
            self._connected = connected

    def _tick_frame(self) -> None:
        with self._lock:
            self._frames_processed += 1
            self._last_frame_time = _now_utc()
            self._connected = True

    def _ffmpeg_cmd(self) -> list[str]:
        w = int(self.preset.input_width)
        h = int(self.preset.input_height)
        fps = max(0.2, float(self.sample_fps))

        vf = f"scale={w}:{h},fps={fps}"

        return [
            "ffmpeg",
            "-hide_banner",
            "-loglevel",
            "error",
            "-i",
            settings.stream_url,
            "-vf",
            vf,
            "-f",
            "rawvideo",
            "-pix_fmt",
            "bgr24",
            "-",
        ]

    def _run(self) -> None:
        backoff = 1.0
        while not self._stop.is_set():
            try:
                self._set_connected(False)
                self._set_error(None)

                cmd = self._ffmpeg_cmd()
                proc = subprocess.Popen(
                    cmd,
                    stdout=subprocess.PIPE,
                    stderr=subprocess.PIPE,
                    bufsize=10**7,
                )

                try:
                    self._read_loop(proc)
                finally:
                    try:
                        proc.terminate()
                    except Exception:
                        pass
                    try:
                        proc.wait(timeout=2.0)
                    except Exception:
                        try:
                            proc.kill()
                        except Exception:
                            pass

            except Exception as e:
                self._set_error(str(e))

            # Reconnect loop
            if self._stop.is_set():
                break
            self._set_connected(False)
            time.sleep(backoff)
            backoff = min(10.0, backoff * 1.5)

    def _read_loop(self, proc: subprocess.Popen) -> None:
        w = int(self.preset.input_width)
        h = int(self.preset.input_height)
        frame_size = w * h * 3

        assert proc.stdout is not None

        while not self._stop.is_set():
            buf = proc.stdout.read(frame_size)
            if not buf or len(buf) < frame_size:
                # Try to provide a useful error message.
                err = None
                if proc.stderr is not None:
                    try:
                        err = proc.stderr.read().decode("utf-8", errors="ignore").strip()
                    except Exception:
                        err = None
                if err:
                    self._set_error(err[-800:])
                break

            self._tick_frame()

            frame = np.frombuffer(buf, dtype=np.uint8).reshape((h, w, 3))
            self._process_frame(frame)

    def _process_frame(self, frame_bgr: np.ndarray) -> None:
        text_chunks = []
        ocr_confs = []

        for roi in self.preset.rois:
            try:
                x = int(roi.get("x", 0))
                y = int(roi.get("y", 0))
                w = int(roi.get("w", 0))
                h = int(roi.get("h", 0))
            except Exception:
                continue

            if w <= 0 or h <= 0:
                continue

            # Clamp ROI to frame bounds
            x2 = max(0, min(frame_bgr.shape[1], x + w))
            y2 = max(0, min(frame_bgr.shape[0], y + h))
            x1 = max(0, min(frame_bgr.shape[1] - 1, x))
            y1 = max(0, min(frame_bgr.shape[0] - 1, y))
            if x2 <= x1 or y2 <= y1:
                continue

            crop = frame_bgr[y1:y2, x1:x2]
            roi_text, roi_conf = _ocr_text_and_conf(crop)
            if roi_text:
                label = roi.get("name")
                if label:
                    text_chunks.append(f"[{label}] {roi_text}")
                else:
                    text_chunks.append(roi_text)
            ocr_confs.append(roi_conf)

        raw_text = "\n".join(text_chunks).strip()
        if not raw_text:
            return

        kw_score = _keyword_score(raw_text, self.preset.keywords)
        has_keywords = bool([k for k in self.preset.keywords if k])
        if has_keywords and kw_score <= 0.0:
            return

        avg_ocr_conf = float(sum(ocr_confs) / len(ocr_confs)) if ocr_confs else 0.0
        confidence = _compute_confidence(avg_ocr_conf, kw_score, has_keywords)

        if confidence < float(self.preset.confidence_threshold):
            return

        # Debounce identical results.
        now = time.time()
        raw_norm = _normalize_text(raw_text)
        if self._last_emit_text_norm == raw_norm and (now - self._last_emit_time) < float(settings.emit_cooldown_seconds):
            return

        parsed = {"keyword_score": kw_score, "avg_ocr_conf": avg_ocr_conf}
        if self.preset.score_regex:
            try:
                m = re.search(self.preset.score_regex, raw_text, flags=re.IGNORECASE | re.MULTILINE)
                if m:
                    parsed["regex_match"] = m.group(0)
                    if m.groupdict():
                        parsed.update(m.groupdict())
            except re.error as e:
                parsed["regex_error"] = str(e)

        # Persist result.
        db = SessionLocal()
        try:
            crud.create_result(
                db,
                preset_id=self.preset.id,
                raw_text=raw_text,
                parsed_result_json=json.loads(json.dumps(parsed)),
                confidence=float(confidence),
            )
        finally:
            db.close()

        self._last_emit_time = now
        self._last_emit_text_norm = raw_norm


class ProcessorManager:
    def __init__(self):
        self._lock = threading.Lock()
        self._processor: StreamProcessor | None = None

    def start(self, *, preset_id: int, sample_fps: float | None) -> None:
        # Snapshot the preset at start time.
        db = SessionLocal()
        try:
            preset = crud.get_preset(db, preset_id)
            if not preset:
                raise ValueError("Preset not found")
            snap = PresetSnapshot(
                id=preset.id,
                name=preset.name,
                input_width=preset.input_width,
                input_height=preset.input_height,
                rois=preset.rois or [],
                keywords=preset.keywords or [],
                confidence_threshold=float(preset.confidence_threshold),
                score_regex=preset.score_regex,
            )
        finally:
            db.close()

        fps = float(sample_fps) if sample_fps is not None else float(settings.sample_fps_default)

        with self._lock:
            if self._processor:
                self._processor.stop()
                self._processor = None

            self._processor = StreamProcessor(snap, sample_fps=fps)
            self._processor.start()

    def stop(self) -> None:
        with self._lock:
            if self._processor:
                self._processor.stop()
                self._processor = None

    def status(self) -> ProcessorStatus:
        with self._lock:
            if not self._processor:
                return ProcessorStatus(
                    running=False,
                    preset_id=None,
                    sample_fps=None,
                    connected=False,
                    last_frame_time=None,
                    frames_processed=0,
                    last_error=None,
                )

            st = self._processor.status()
            # Treat "connected" as "we saw a frame recently".
            if st.last_frame_time:
                age = (_now_utc() - st.last_frame_time).total_seconds()
                connected = age <= 5.0
            else:
                connected = False
            return st.model_copy(update={"connected": connected})


processor_manager = ProcessorManager()
