from __future__ import annotations

import time

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
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

    # rtmp container exposes HLS on host port 8080 (see docker-compose.yml)
    hls_url = f"http://{hostname}:8080/hls/stream.m3u8"
    stat_url = f"http://{hostname}:8080/stat"

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
