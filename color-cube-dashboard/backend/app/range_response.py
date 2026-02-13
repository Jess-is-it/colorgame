from __future__ import annotations

import re
from pathlib import Path
from typing import Iterator, Optional, Tuple

from fastapi import Request
from fastapi.responses import Response, StreamingResponse

from .videos import guess_mime


_RANGE_RE = re.compile(r"bytes=(\d+)-(\d+)?")


def _parse_range(range_header: str, file_size: int) -> Optional[Tuple[int, int]]:
    m = _RANGE_RE.match(range_header.strip())
    if not m:
        return None
    start = int(m.group(1))
    end = int(m.group(2)) if m.group(2) else file_size - 1
    if start >= file_size:
        return None
    end = min(end, file_size - 1)
    if end < start:
        return None
    return start, end


def range_file_response(path: Path, request: Request) -> Response:
    """
    Minimal HTTP Range support for HTML5 <video>.
    """
    file_size = path.stat().st_size
    content_type = guess_mime(path)
    range_header = request.headers.get("range")

    if not range_header:
        return StreamingResponse(
            _iter_file(path, 0, file_size - 1),
            media_type=content_type,
            headers={"Accept-Ranges": "bytes", "Content-Length": str(file_size)},
        )

    parsed = _parse_range(range_header, file_size)
    if not parsed:
        return Response(status_code=416, headers={"Content-Range": f"bytes */{file_size}"})

    start, end = parsed
    length = end - start + 1
    headers = {
        "Content-Range": f"bytes {start}-{end}/{file_size}",
        "Accept-Ranges": "bytes",
        "Content-Length": str(length),
    }
    return StreamingResponse(
        _iter_file(path, start, end),
        status_code=206,
        media_type=content_type,
        headers=headers,
    )


def _iter_file(path: Path, start: int, end: int, chunk_size: int = 1024 * 1024) -> Iterator[bytes]:
    with path.open("rb") as f:
        f.seek(start)
        remaining = end - start + 1
        while remaining > 0:
            to_read = min(chunk_size, remaining)
            data = f.read(to_read)
            if not data:
                break
            remaining -= len(data)
            yield data

