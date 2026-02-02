from __future__ import annotations

import subprocess


def _ffmpeg_mjpeg_cmd(*, stream_url: str, width: int, height: int, fps: int, jpeg_quality: int) -> list[str]:
    # Use -r for output pacing (fps filter has been unreliable for some RTMP streams).
    vf = f"scale={width}:{height}:force_original_aspect_ratio=decrease,pad={width}:{height}:(ow-iw)/2:(oh-ih)/2"

    # q:v: 2 (best) .. 31 (worst)
    qv = max(2, min(31, int(jpeg_quality)))

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
        "-r",
        str(int(fps)),
        "-f",
        "image2pipe",
        "-vcodec",
        "mjpeg",
        "-q:v",
        str(qv),
        "pipe:1",
    ]


def iter_mjpeg_multipart(*, stream_url: str, fps: int = 30, width: int = 640, height: int = 360, jpeg_quality: int = 6):
    """Yield multipart MJPEG frames from an RTMP stream.

    NOTE: This starts an ffmpeg process per client connection.
    """
    cmd = _ffmpeg_mjpeg_cmd(
        stream_url=stream_url,
        width=width,
        height=height,
        fps=fps,
        jpeg_quality=jpeg_quality,
    )

    proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, bufsize=10**6)
    try:
        assert proc.stdout is not None

        boundary = b"frame"
        buf = bytearray()

        # JPEG markers
        SOI = b"\xff\xd8"
        EOI = b"\xff\xd9"

        while True:
            chunk = proc.stdout.read(4096)
            if not chunk:
                break
            buf.extend(chunk)

            # Extract as many complete JPEGs as available.
            while True:
                soi = buf.find(SOI)
                if soi == -1:
                    # Drop unbounded preamble.
                    if len(buf) > 1024 * 1024:
                        del buf[:-2]
                    break

                eoi = buf.find(EOI, soi + 2)
                if eoi == -1:
                    # Need more bytes
                    if soi > 0:
                        del buf[:soi]
                    break

                jpeg = bytes(buf[soi : eoi + 2])
                del buf[: eoi + 2]

                header = (
                    b"--" + boundary + b"\r\n"
                    b"Content-Type: image/jpeg\r\n"
                    + f"Content-Length: {len(jpeg)}\r\n\r\n".encode("ascii")
                )

                yield header
                yield jpeg
                yield b"\r\n"

    finally:
        try:
            proc.terminate()
        except Exception:
            pass
        try:
            proc.wait(timeout=1.0)
        except Exception:
            try:
                proc.kill()
            except Exception:
                pass
