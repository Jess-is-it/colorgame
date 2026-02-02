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
from app.draw_store import DrawStore
from app.sample_store import SampleStore

app = FastAPI(title="OBS Stream Dashboard")

templates = Jinja2Templates(directory="app/templates")
# Cache-bust static assets on each container start.
templates.env.globals["static_version"] = int(time.time())

app.mount("/static", StaticFiles(directory="app/static"), name="static")

RTSP_URL = os.environ.get("RTSP_URL", "rtsp://127.0.0.1:8554/live/stream")
DETECTOR_FPS = float(os.environ.get("DETECTOR_FPS", "10"))
DRAWS_PATH = os.environ.get("DRAWS_PATH", "/data/draws.json")
SAMPLES_ROOT = os.environ.get("SAMPLES_ROOT", "/data/draw_samples")

draws = DrawStore(path=DRAWS_PATH)
samples = SampleStore(root=SAMPLES_ROOT)
detector = ResultDetector(rtsp_url=RTSP_URL, fps=DETECTOR_FPS, config_path="/tmp/detector_config.json")

def _sync_detector_with_active_draw() -> None:
    active = draws.active()
    if active is None:
        detector.stop()
        return
    detector.apply_draw_record(active)
    if bool(active.get("enabled", True)):
        detector.start()
    else:
        detector.stop()


# Apply active draw into the detector on startup and auto-start if enabled.
try:
    _sync_detector_with_active_draw()
except Exception:
    pass


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


@app.get("/draw", response_class=HTMLResponse)
def draw_page(request: Request):
    host = (request.headers.get("host") or "").split(",")[0].strip()
    hostname = host.split(":")[0] if host else "VM_IP"
    stream_path = "live/stream"
    webrtc_player_url = f"http://{hostname}:8889/{stream_path}"

    return templates.TemplateResponse(
        request,
        "draw.html",
        {"webrtc_player_url": webrtc_player_url},
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


@app.get("/api/draws")
def draws_list():
    return {"active_id": (draws.active() or {}).get("id"), "items": draws.list()}


@app.get("/api/draws/active")
def draws_active():
    return {"item": draws.active()}


@app.post("/api/draws")
async def draws_create(request: Request):
    payload = await request.json()
    name = str(payload.get("name", "")).strip() or "Untitled"
    d = draws.create(name=name)
    return {"item": d}


@app.get("/api/draws/{draw_id}")
def draws_get(draw_id: str):
    d = draws.get(draw_id)
    if d is None:
        return Response(content=b"not found\n", status_code=404, media_type="text/plain")
    return {"item": d}


@app.get("/api/draws/{draw_id}/samples")
def samples_list(draw_id: str):
    d = draws.get(draw_id)
    if d is None:
        return Response(content=b"not found\n", status_code=404, media_type="text/plain")
    return {"items": samples.list(draw_id)}


@app.post("/api/draws/{draw_id}/samples")
async def samples_upload(draw_id: str, request: Request):
    d = draws.get(draw_id)
    if d is None:
        return Response(content=b"not found\n", status_code=404, media_type="text/plain")

    form = await request.form()
    files = form.getlist("files")
    out = []
    for f in files:
        # Starlette UploadFile
        filename = getattr(f, "filename", "") or "upload"
        content = await f.read()
        # basic ext validation
        ext = (filename.rsplit(".", 1)[-1] or "").lower()
        if ext not in ("jpg", "jpeg", "png"):
            ext = "jpg"
        if ext == "jpeg":
            ext = "jpg"
        out.append(samples.add(draw_id, orig_name=filename, content=content, ext=ext))
    return {"items": out}


@app.get("/api/draws/{draw_id}/samples/{sample_id}")
def samples_get_file(draw_id: str, sample_id: str):
    path = samples.get_path(draw_id, sample_id)
    if not path:
        return Response(content=b"not found\n", status_code=404, media_type="text/plain")
    # naive content type
    media_type = "image/jpeg"
    if path.lower().endswith(".png"):
        media_type = "image/png"
    try:
        with open(path, "rb") as f:
            return Response(content=f.read(), media_type=media_type)
    except Exception as e:
        return Response(content=f"error: {e}\n".encode("utf-8"), status_code=500, media_type="text/plain")

@app.delete("/api/draws/{draw_id}/samples/{sample_id}")
def samples_delete(draw_id: str, sample_id: str):
    try:
        samples.delete(draw_id, sample_id)
        return {"ok": True}
    except KeyError:
        return Response(content=b"not found\n", status_code=404, media_type="text/plain")


@app.post("/api/draws/{draw_id}/train")
def train_draw(draw_id: str):
    """
    Train a small per-draw *layout* model from unlabeled sample images.

    The model learns the relative positions of the 3 color boxes inside result_roi,
    based on contour-detected squares across multiple screenshots. This improves
    robustness without "learning colors".
    """
    import cv2
    from app.detector import DetectorConfig, ROI

    d = draws.get(draw_id)
    if d is None:
        return Response(content=b"not found\n", status_code=404, media_type="text/plain")
    rr = d.get("result_roi")
    if rr is None:
        return Response(content=b"draw has no result_roi\n", status_code=400, media_type="text/plain")

    # collect screenshots
    items = samples.list(draw_id)
    if not items:
        return Response(content=b"no samples\n", status_code=400, media_type="text/plain")

    # per-box list of relative (x,y,w,h) coordinates within ROI
    rels: list[list[tuple[float, float, float, float]]] = [[], [], []]
    used = 0
    skipped = 0
    for it in items:
        path = samples.get_path(draw_id, it.get("id"))
        if not path or not os.path.exists(path):
            skipped += 1
            continue

        img = cv2.imread(path)
        if img is None:
            skipped += 1
            continue

        # Training images might be full-frame screenshots (same aspect, different resolution)
        # or crops of the RESULT strip. We try:
        #   1) mapped draw ROI -> sample resolution
        #   2) whole-image scan (works well for cropped RESULT strips)
        sh, sw = img.shape[:2]
        dw = int(d.get("width", 1920))
        dh = int(d.get("height", 1080))
        sx = float(sw) / float(max(1, dw))
        sy = float(sh) / float(max(1, dh))

        roi = ROI(
            int(float(rr["x"]) * sx),
            int(float(rr["y"]) * sy),
            int(float(rr["w"]) * sx),
            int(float(rr["h"]) * sy),
        )
        # clamp mapped ROI to the sample image bounds
        rx = max(0, min(sw - 1, roi.x))
        ry = max(0, min(sh - 1, roi.y))
        rw = max(1, min(sw - rx, roi.w))
        rh = max(1, min(sh - ry, roi.h))
        roi = ROI(rx, ry, rw, rh)
        cfg = DetectorConfig(width=sw, height=sh, result_roi=roi)
        boxes = detector._find_three_boxes(img, cfg, roi)
        if boxes is None:
            full = ROI(0, 0, sw, sh)
            boxes = detector._find_three_boxes(img, DetectorConfig(width=sw, height=sh, result_roi=full), full)
        if boxes is None:
            skipped += 1
            continue

        used += 1
        for idx, b in enumerate(boxes[:3]):
            if roi.w <= 1 or roi.h <= 1:
                continue
            rels[idx].append(
                (
                    float(b.x - roi.x) / float(roi.w),
                    float(b.y - roi.y) / float(roi.h),
                    float(b.w) / float(roi.w),
                    float(b.h) / float(roi.h),
                )
            )

    if min(len(rels[0]), len(rels[1]), len(rels[2])) < 3:
        return Response(content=b"not enough usable samples (need >= 3)\n", status_code=400, media_type="text/plain")

    def median(vals: list[float]) -> float:
        arr = sorted(vals)
        mid = len(arr) // 2
        if len(arr) % 2 == 1:
            return float(arr[mid])
        return float((arr[mid - 1] + arr[mid]) / 2.0)

    boxes_rel = []
    for idx in range(3):
        xs = [v[0] for v in rels[idx]]
        ys = [v[1] for v in rels[idx]]
        ws = [v[2] for v in rels[idx]]
        hs = [v[3] for v in rels[idx]]
        boxes_rel.append(
            {
                "x": median(xs),
                "y": median(ys),
                "w": median(ws),
                "h": median(hs),
                "n": len(rels[idx]),
            }
        )

    model = {
        "version": 2,
        "trained_at": time.time(),
        "layout": {"boxes_rel": boxes_rel, "used_samples": used, "skipped": skipped},
    }
    d2 = draws.update(draw_id, {"model": model})
    try:
        _sync_detector_with_active_draw()
    except Exception:
        pass
    return {"item": d2, "model": model}


@app.put("/api/draws/{draw_id}")
async def draws_update(draw_id: str, request: Request):
    payload = await request.json()
    try:
        d = draws.update(draw_id, payload)
    except KeyError:
        return Response(content=b"not found\n", status_code=404, media_type="text/plain")

    # If this draw is active, reflect changes into the detector immediately.
    try:
        _sync_detector_with_active_draw()
    except Exception:
        pass
    return {"item": d}


@app.delete("/api/draws/{draw_id}")
def draws_delete(draw_id: str):
    try:
        draws.delete(draw_id)
    except KeyError:
        return Response(content=b"not found\n", status_code=404, media_type="text/plain")
    try:
        _sync_detector_with_active_draw()
    except Exception:
        pass
    return {"ok": True}


@app.post("/api/draws/{draw_id}/activate")
def draws_activate(draw_id: str):
    try:
        d = draws.set_active(draw_id)
    except KeyError:
        return Response(content=b"not found\n", status_code=404, media_type="text/plain")
    try:
        _sync_detector_with_active_draw()
    except Exception:
        detector.apply_draw_record(d)
    return {"item": d}


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
    st = detector.status()
    active = draws.active()
    st["active_draw"] = (
        None
        if active is None
        else {"id": active.get("id"), "name": active.get("name"), "enabled": bool(active.get("enabled", True))}
    )
    return st


@app.get("/api/detector/results")
def detector_results():
    return {"items": detector.list_results()}


@app.post("/api/detector/results/clear")
def detector_clear_results():
    detector.clear_results()
    return {"ok": True}


@app.get("/api/detector/snapshot.jpg")
def detector_snapshot():
    try:
        jpg = detector.snapshot_jpeg()
        return Response(content=jpg, media_type="image/jpeg")
    except Exception as e:
        return Response(content=f"snapshot error: {e}\n".encode("utf-8"), media_type="text/plain", status_code=500)
