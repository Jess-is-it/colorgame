from __future__ import annotations

import threading
import time
from dataclasses import asdict
from typing import Optional, Tuple

import cv2
import numpy as np

from .config import AppConfig


def _placeholder_frame(text: str, w: int = 1280, h: int = 720) -> np.ndarray:
    img = np.zeros((h, w, 3), dtype=np.uint8)
    cv2.putText(
        img,
        text,
        (30, int(h * 0.5)),
        cv2.FONT_HERSHEY_SIMPLEX,
        1.1,
        (255, 255, 255),
        2,
        cv2.LINE_AA,
    )
    cv2.putText(
        img,
        time.strftime("%Y-%m-%d %H:%M:%S"),
        (30, int(h * 0.5) + 50),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.8,
        (180, 180, 180),
        2,
        cv2.LINE_AA,
    )
    return img


class CameraManager:
    """
    Background camera capture with automatic reconnect.

    - Continuously attempts to open the configured source
    - Reads frames on a thread and stores the latest frame
    - Marks offline on failure and retries every few seconds
    """

    def __init__(self, cfg: AppConfig) -> None:
        self.cfg = cfg
        self._lock = threading.Lock()

        self._cap: Optional[cv2.VideoCapture] = None
        self._thread: Optional[threading.Thread] = None
        self._stop = threading.Event()

        self._online: bool = False
        self._last_frame: Optional[np.ndarray] = None
        self._last_frame_ts: Optional[float] = None
        self._last_error: Optional[str] = None

    def start(self) -> None:
        if self._thread and self._thread.is_alive():
            return
        self._stop.clear()
        self._thread = threading.Thread(target=self._run, name="camera-capture", daemon=True)
        self._thread.start()

    def stop(self) -> None:
        self._stop.set()
        t = self._thread
        if t:
            t.join(timeout=2.0)
        with self._lock:
            if self._cap is not None:
                try:
                    self._cap.release()
                except Exception:
                    pass
            self._cap = None
            self._online = False

    def _source_str(self) -> str:
        if self.cfg.camera.type == "device":
            return f"device:{self.cfg.camera.device_index}"
        return self.cfg.camera.rtsp_url

    def status(self) -> dict:
        with self._lock:
            return {
                "online": self._online,
                "source": self._source_str(),
                "error": self._last_error,
                "last_frame_time": self._last_frame_ts,
            }

    def _open(self) -> Tuple[Optional[cv2.VideoCapture], Optional[str]]:
        try:
            if self.cfg.camera.type == "device":
                cap = cv2.VideoCapture(int(self.cfg.camera.device_index))
            else:
                cap = cv2.VideoCapture(str(self.cfg.camera.rtsp_url), cv2.CAP_FFMPEG)

            if not cap.isOpened():
                try:
                    cap.release()
                except Exception:
                    pass
                return None, f"cannot open source: {self._source_str()}"

            # Reduce latency where supported (mainly for RTSP).
            try:
                cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)
            except Exception:
                pass

            return cap, None
        except Exception as e:
            return None, str(e)

    def _run(self) -> None:
        retry_s = 3.0
        while not self._stop.is_set():
            cap, err = self._open()
            if cap is None:
                with self._lock:
                    self._cap = None
                    self._online = False
                    self._last_error = err
                time.sleep(retry_s)
                continue

            with self._lock:
                self._cap = cap
                self._online = True
                self._last_error = None

            try:
                while not self._stop.is_set():
                    ok, frame = cap.read()
                    if not ok or frame is None:
                        raise RuntimeError("read failed")

                    with self._lock:
                        self._last_frame = frame
                        self._last_frame_ts = time.time()
                        self._online = True
                        self._last_error = None
            except Exception as e:
                with self._lock:
                    self._online = False
                    self._last_error = str(e)
                try:
                    cap.release()
                except Exception:
                    pass
                time.sleep(0.5)
            finally:
                try:
                    cap.release()
                except Exception:
                    pass

    def get_jpeg(self) -> bytes:
        """
        Returns latest frame as JPEG. If offline, returns a placeholder JPEG.
        """
        with self._lock:
            frame = None if self._last_frame is None else self._last_frame.copy()
            online = self._online
            err = self._last_error

        if frame is None or not online:
            frame = _placeholder_frame(f"Camera Offline: {err or 'no frame'}")

        ok, buf = cv2.imencode(".jpg", frame, [int(cv2.IMWRITE_JPEG_QUALITY), int(self.cfg.stream.jpeg_quality)])
        if not ok:
            # worst-case fallback
            frame = _placeholder_frame("JPEG encode failed")
            ok, buf = cv2.imencode(".jpg", frame, [int(cv2.IMWRITE_JPEG_QUALITY), 70])
            if not ok:
                return b""
        return buf.tobytes()

    def mjpeg_generator(self):
        """
        Generator that yields MJPEG multipart frames.
        """
        boundary = b"--frame\r\n"
        interval = 1.0 / float(self.cfg.stream.max_fps)
        while True:
            start = time.time()
            jpg = self.get_jpeg()
            if not jpg:
                time.sleep(0.2)
                continue
            yield boundary
            yield b"Content-Type: image/jpeg\r\n"
            yield f"Content-Length: {len(jpg)}\r\n\r\n".encode("ascii")
            yield jpg
            yield b"\r\n"

            elapsed = time.time() - start
            time.sleep(max(0.0, interval - elapsed))


