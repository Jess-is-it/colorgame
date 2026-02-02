from __future__ import annotations

import time

import urllib.request

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, Response, StreamingResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from app.services import rtmp_status as rtmp_status_service

app = FastAPI(title="OBS Stream Dashboard")

templates = Jinja2Templates(directory="app/templates")
# Cache-bust static assets on each container start.
templates.env.globals["static_version"] = int(time.time())

app.mount("/static", StaticFiles(directory="app/static"), name="static")


@app.get("/health")
def health():
    return {"ok": True}


@app.get("/", response_class=HTMLResponse)
def dashboard(request: Request):
    host = (request.headers.get("host") or "").split(",")[0].strip()
    hostname = host.split(":")[0] if host else "VM_IP"

    # Serve HLS via the backend so users only need port 8000 open.
    hls_url = f"http://{hostname}:8000/hls/stream.m3u8"
    stat_url = f"http://{hostname}:8000/rtmp/stat"

    return templates.TemplateResponse(
        request,
        "dashboard.html",
        {"hls_url": hls_url, "stat_url": stat_url},
    )


@app.get("/api/rtmp/status")
def rtmp_status():
    # rtmp container is reachable inside docker network as http://rtmp/stat
    try:
        return rtmp_status_service.get_publish_status(stat_url="http://rtmp/stat", expected_app="live")
    except Exception as e:
        return {"ok": False, "error": str(e), "publishing": False, "streams": []}


@app.get("/rtmp/stat")
def rtmp_stat_proxy():
    # Proxy the RTMP stats XML for convenience.
    try:
        with urllib.request.urlopen("http://rtmp/stat", timeout=2.0) as resp:
            body = resp.read()
            return Response(content=body, media_type="application/xml")
    except Exception as e:
        return Response(content=f"error: {e}\n".encode("utf-8"), status_code=502, media_type="text/plain")


@app.get("/hls/{path:path}")
def hls_proxy(path: str):
    # Proxy HLS files (m3u8/ts) from the rtmp container to avoid cross-origin + extra port.
    # NOTE: This keeps the MVP simple; for heavy traffic you'd put nginx in front.
    url = f"http://rtmp/hls/{path}"

    def gen():
        with urllib.request.urlopen(url, timeout=5.0) as resp:
            while True:
                chunk = resp.read(64 * 1024)
                if not chunk:
                    break
                yield chunk

    # Light content-type mapping (fallback to octet-stream).
    if path.endswith(".m3u8"):
        media_type = "application/vnd.apple.mpegurl"
    elif path.endswith(".ts"):
        media_type = "video/mp2t"
    else:
        media_type = "application/octet-stream"

    return StreamingResponse(gen(), media_type=media_type)
