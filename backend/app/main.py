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

ALLOWED_COLORS = {"yellow", "white", "pink", "blue", "red", "green"}

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


@app.put("/api/draws/{draw_id}/samples/{sample_id}")
async def samples_set_labels(draw_id: str, sample_id: str, request: Request):
    payload = await request.json()
    labels = payload.get("labels")
    if labels is not None:
        if not isinstance(labels, list) or len(labels) != 3:
            return Response(content=b"labels must be a list of 3 items\n", status_code=400, media_type="text/plain")
        out = []
        for v in labels:
            if v is None:
                out.append(None)
                continue
            s = str(v).strip().lower()
            if not s:
                out.append(None)
                continue
            if s not in ALLOWED_COLORS:
                return Response(
                    content=f"invalid label: {s}\n".encode("utf-8"),
                    status_code=400,
                    media_type="text/plain",
                )
            out.append(s)
        labels = out
    try:
        it = samples.update_labels(draw_id, sample_id, labels)
        return {"item": it}
    except KeyError:
        return Response(content=b"not found\n", status_code=404, media_type="text/plain")


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
    Train a very small per-draw color model from labeled sample images.
    """
    import math

    import cv2
    import numpy as np
    from app.detector import DetectorConfig, ROI

    d = draws.get(draw_id)
    if d is None:
        return Response(content=b"not found\n", status_code=404, media_type="text/plain")
    rr = d.get("result_roi")
    if rr is None:
        return Response(content=b"draw has no result_roi\n", status_code=400, media_type="text/plain")

    # collect labeled patches
    items = samples.list(draw_id)
    if not items:
        return Response(content=b"no samples\n", status_code=400, media_type="text/plain")

    buckets = {}  # color -> list[(h,s,v)]
    used = 0
    skipped = 0
    for it in items:
        labels = it.get("labels")
        if not labels or not isinstance(labels, list) or len(labels) != 3:
            skipped += 1
            continue
        if any((v is None) or (str(v).strip() == "") for v in labels):
            skipped += 1
            continue
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
            # fallback: split equally
            w3 = max(1, roi.w // 3)
            boxes = [
                ROI(roi.x + 0 * w3, roi.y, w3, roi.h),
                ROI(roi.x + 1 * w3, roi.y, w3, roi.h),
                ROI(roi.x + 2 * w3, roi.y, roi.w - 2 * w3, roi.h),
            ]

        for idx, b in enumerate(boxes[:3]):
            color = str(labels[idx]).lower().strip()
            if not color or color not in ALLOWED_COLORS:
                skipped += 1
                continue
            patch = img[b.y : b.y + b.h, b.x : b.x + b.w]
            if patch.size == 0:
                continue
            ph, pw = patch.shape[:2]
            cx0, cy0 = int(pw * 0.18), int(ph * 0.18)
            cx1, cy1 = int(pw * 0.82), int(ph * 0.82)
            inner = patch[cy0:cy1, cx0:cx1]

            hsv = cv2.cvtColor(inner, cv2.COLOR_BGR2HSV)
            hh = hsv[:, :, 0].astype(np.float32)
            ss = hsv[:, :, 1].astype(np.float32)
            vv = hsv[:, :, 2].astype(np.float32)
            valid = (vv > 60) & ((ss > 25) | (vv > 185))
            if int(valid.sum()) < max(50, int(hh.size * 0.08)):
                continue
            mh = float(np.mean(hh[valid]))
            ms = float(np.mean(ss[valid]))
            mv = float(np.mean(vv[valid]))
            buckets.setdefault(color, []).append((mh, ms, mv))

        used += 1

    if not buckets:
        return Response(content=b"no labeled pixels found\n", status_code=400, media_type="text/plain")

    # circular mean for hue
    centroids = {}
    for color, vals in buckets.items():
        hs = [v[0] for v in vals]
        ss = [v[1] for v in vals]
        vv = [v[2] for v in vals]
        # hue in radians (0..2pi)
        ang = [float(h) * (2.0 * math.pi / 180.0) for h in hs]
        sinm = sum(math.sin(a) for a in ang) / float(len(ang))
        cosm = sum(math.cos(a) for a in ang) / float(len(ang))
        mean_ang = math.atan2(sinm, cosm)
        if mean_ang < 0:
            mean_ang += 2.0 * math.pi
        mean_h = mean_ang * (180.0 / (2.0 * math.pi))
        centroids[color] = {"h": float(mean_h), "s": float(sum(ss) / len(ss)), "v": float(sum(vv) / len(vv)), "n": len(vals)}

    model = {"version": 1, "trained_at": time.time(), "centroids": centroids, "used_samples": used, "skipped": skipped}
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
