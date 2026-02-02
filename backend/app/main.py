from __future__ import annotations

import json
import os
import time
import urllib.request

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, Response
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from app.detector import ResultDetector

app = FastAPI(title="OBS Stream Dashboard")

templates = Jinja2Templates(directory="app/templates")
# Cache-bust static assets on each container start.
templates.env.globals["static_version"] = int(time.time())

app.mount("/static", StaticFiles(directory="app/static"), name="static")

RTSP_URL = os.environ.get("RTSP_URL", "rtsp://127.0.0.1:8554/live/stream")
DETECTOR_FPS = float(os.environ.get("DETECTOR_FPS", "10"))
DETECTOR_CONFIG_PATH = os.environ.get("DETECTOR_CONFIG_PATH", "/data/detector_config.json")

detector = ResultDetector(rtsp_url=RTSP_URL, fps=DETECTOR_FPS, config_path=DETECTOR_CONFIG_PATH)


@app.get("/health")
def health():
    return {"ok": True}


@app.get("/", response_class=HTMLResponse)
def dashboard(request: Request):
    host = (request.headers.get("host") or "").split(",")[0].strip()
    hostname = host.split(":")[0] if host else "VM_IP"

    # Keep defaults aligned with the OBS "Server + Stream key" format most users expect.
    stream_path = "live/stream"
    rtmp_server = f"rtmp://{hostname}:1935/live"
    rtmp_stream_key = "stream"
    # Recommended for near-live browser playback: publish via WHIP (WebRTC) instead of RTMP.
    whip_url = f"http://{hostname}:8889/{stream_path}/whip"
    webrtc_player_url = f"http://{hostname}:8889/{stream_path}"

    return templates.TemplateResponse(
        request,
        "dashboard.html",
        {
            "rtmp_server": rtmp_server,
            "rtmp_stream_key": rtmp_stream_key,
            "whip_url": whip_url,
            "webrtc_player_url": webrtc_player_url,
            "stream_path": stream_path,
            "rtsp_url": RTSP_URL,
        },
    )


@app.get("/api/stream/status")
def stream_status():
    """
    Report whether OBS is publishing to MediaMTX and basic stream metadata.

    We query the MediaMTX control API (host network) to avoid scraping HTML pages
    and to provide a reliable 'connected/disconnected' signal.
    """
    try:
        # Prefer listing and filtering by name since some path names contain slashes.
        with urllib.request.urlopen("http://127.0.0.1:9997/v3/paths/list", timeout=1.5) as resp:
            body = resp.read().decode("utf-8", errors="replace")
            data = json.loads(body)

        target = None
        for item in (data.get("items") or []):
            if item.get("name") == "live/stream":
                target = item
                break
        if target is None:
            for item in (data.get("items") or []):
                if item.get("name") == "obs":
                    target = item
                    break

        if target is None:
            return {"ok": True, "publishing": False, "path": "live/stream", "ready": False, "tracks": []}

        # If a publisher exists, "source" is typically present and "ready" becomes true.
        publishing = bool(target.get("ready")) or target.get("source") is not None
        return {
            "ok": True,
            "publishing": publishing,
            "path": target.get("name") or "live/stream",
            "ready": bool(target.get("ready")),
            "tracks": target.get("tracks") or [],
            "bytesReceived": target.get("bytesReceived", 0),
            "readers": target.get("readers") or [],
            "source": target.get("source"),
        }
    except Exception as e:
        # When not publishing yet, MediaMTX can return 404; keep it simple for the UI.
        return {"ok": False, "error": str(e), "publishing": False, "path": "live/stream"}


@app.get("/api/webrtc/sessions")
def webrtc_sessions():
    """
    Expose active WebRTC sessions so the dashboard can show if clients are actually connected,
    and whether they're using UDP or TCP candidates (which impacts latency).
    """
    try:
        with urllib.request.urlopen("http://127.0.0.1:9997/v3/webrtcsessions/list", timeout=1.5) as resp:
            body = resp.read().decode("utf-8", errors="replace")
            return json.loads(body)
    except Exception as e:
        return {"ok": False, "error": str(e), "items": []}


@app.get("/api/detector/config")
def detector_get_config():
    return detector.get_config()


@app.put("/api/detector/config")
async def detector_set_config(request: Request):
    payload = await request.json()
    return detector.set_config(payload)


@app.post("/api/detector/start")
def detector_start():
    detector.start()
    return {"ok": True}


@app.post("/api/detector/stop")
def detector_stop():
    detector.stop()
    return {"ok": True}


@app.get("/api/detector/status")
def detector_status():
    return detector.status()


@app.get("/api/detector/results")
def detector_results():
    return {"items": detector.list_results()}


@app.get("/api/detector/snapshot.jpg")
def detector_snapshot():
    try:
        jpg = detector.snapshot_jpeg()
        return Response(content=jpg, media_type="image/jpeg")
    except Exception as e:
        return Response(content=f"snapshot error: {e}\n".encode("utf-8"), media_type="text/plain", status_code=500)
