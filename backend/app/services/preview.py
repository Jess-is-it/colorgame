from __future__ import annotations

import datetime as dt
import subprocess
import threading
import time

from PIL import Image


def _now_utc() -> dt.datetime:
    return dt.datetime.now(dt.timezone.utc)


class PreviewWorker:
    """Continuously decodes the RTMP stream and keeps the latest JPEG in memory.

    This avoids spawning ffmpeg for every dashboard refresh.
    """

    def __init__(self):
        self._lock = threading.Lock()
        self._thread: threading.Thread | None = None
        self._stop = threading.Event()

        self._stream_url: str | None = None

        self._last_jpeg: bytes | None = None
        self._last_frame_time: dt.datetime | None = None
        self._last_error: str | None = None

        self._connected = False

        # Fixed preview output dimensions (constant frame size simplifies reads)
        self._w = 640
        self._h = 360
        self._fps = 1.0

    def ensure_running(self, stream_url: str) -> None:
        stream_url = stream_url.strip()
        with self._lock:
            url_changed = self._stream_url != stream_url
            self._stream_url = stream_url

        if url_changed:
            self.stop()

        if self._thread and self._thread.is_alive():
            return

        self._stop.clear()
        self._thread = threading.Thread(target=self._run, name="preview-worker", daemon=True)
        self._thread.start()

    def stop(self) -> None:
        self._stop.set()
        t = self._thread
        if t:
            t.join(timeout=2.0)

    def get_latest_jpeg(self, *, max_age_s: float = 5.0) -> tuple[bytes | None, dict]:
        now = _now_utc()
        with self._lock:
            jpeg = self._last_jpeg
            last_frame_time = self._last_frame_time
            last_error = self._last_error
            connected = self._connected

        if last_frame_time:
            age_s = (now - last_frame_time).total_seconds()
        else:
            age_s = 999999.0

        meta = {
            "connected": bool(connected and age_s <= max_age_s),
            "last_frame_time": last_frame_time,
            "age_seconds": age_s,
            "last_error": last_error,
        }

        if jpeg is None or age_s > max_age_s:
            return None, meta
        return jpeg, meta

    def _set_state(self, *, jpeg: bytes | None = None, err: str | None = None, frame: bool = False) -> None:
        with self._lock:
            if jpeg is not None:
                self._last_jpeg = jpeg
            if frame:
                self._last_frame_time = _now_utc()
                self._connected = True
            if err is not None:
                self._last_error = err

    def _ffmpeg_cmd(self, stream_url: str) -> list[str]:
        # force_original_aspect_ratio + pad keeps the image undistorted.
        vf = f"scale={self._w}:{self._h}:force_original_aspect_ratio=decrease,pad={self._w}:{self._h}:(ow-iw)/2:(oh-ih)/2"

        return [
            "ffmpeg",
            "-hide_banner",
            "-loglevel",
            "error",
            "-i",
            stream_url,
            "-an",
            "-vf",
            vf,
            # Downsample preview to ~1 FPS without using the fps filter (more reliable for RTMP).
            "-r",
            str(self._fps),
            "-f",
            "rawvideo",
            "-pix_fmt",
            "rgb24",
            "-",
        ]

    def _run(self) -> None:
        backoff = 1.0
        frame_size = self._w * self._h * 3

        while not self._stop.is_set():
            with self._lock:
                stream_url = self._stream_url

            if not stream_url:
                self._set_state(err="No stream URL configured")
                time.sleep(1.0)
                continue

            cmd = self._ffmpeg_cmd(stream_url)
            try:
                proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, bufsize=10**7)
            except Exception as e:
                self._set_state(err=str(e))
                time.sleep(backoff)
                backoff = min(10.0, backoff * 1.5)
                continue

            try:
                assert proc.stdout is not None
                while not self._stop.is_set():
                    buf = proc.stdout.read(frame_size)
                    if not buf or len(buf) < frame_size:
                        err = None
                        if proc.stderr is not None:
                            try:
                                err = proc.stderr.read().decode("utf-8", errors="ignore").strip()
                            except Exception:
                                err = None
                        self._set_state(err=err or "ffmpeg ended")
                        break

                    # Convert to JPEG
                    img = Image.frombytes("RGB", (self._w, self._h), buf)
                    out = _encode_jpeg(img)
                    self._set_state(jpeg=out, frame=True, err=None)

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

            finally:
                backoff = 1.0

            # reconnect
            time.sleep(backoff)
            backoff = min(10.0, backoff * 1.5)


def _encode_jpeg(img: Image.Image) -> bytes:
    # Pillow JPEG encoding to bytes
    import io

    buf = io.BytesIO()
    img.save(buf, format="JPEG", quality=80, optimize=True)
    return buf.getvalue()


preview_worker = PreviewWorker()
