from __future__ import annotations

import json
import time
from pathlib import Path

from fastapi import Depends, FastAPI, Form, HTTPException, Request
from fastapi.responses import HTMLResponse, RedirectResponse, Response, StreamingResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session

from app import crud, schemas
from app.db import SessionLocal
from app.services import obs_integration
from app.services import mjpeg as mjpeg_service
from app.services import preview as preview_service
from app.services import rtmp_status as rtmp_status_service
from app.services.processor import processor_manager


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


BASE_DIR = Path(__file__).resolve().parent

templates = Jinja2Templates(directory=str(BASE_DIR / "templates"))
templates.env.globals["static_version"] = int(time.time())

app = FastAPI(title="Game Result Recorder")

app.mount("/static", StaticFiles(directory=str(BASE_DIR / "static")), name="static")


@app.get("/", response_class=HTMLResponse)
def dashboard(request: Request, db: Session = Depends(get_db)):
    presets = crud.list_presets(db)
    status = processor_manager.status()
    s = crud.get_app_settings(db)

    host = (request.headers.get("host") or "").split(",")[0].strip()
    hostname = host.split(":")[0] if host else "VM_IP"
    public_server_url = s.public_rtmp_server_url or f"rtmp://{hostname}:1935/live"
    return templates.TemplateResponse(
        request,
        "dashboard.html",
        {
            "presets": presets,
            "status": status.model_dump(),
            "public_server_url": public_server_url,
            "public_stream_key": s.public_stream_key,
        },
    )


@app.get("/presets", response_class=HTMLResponse)
def presets_page(request: Request, db: Session = Depends(get_db)):
    presets = crud.list_presets(db)
    return templates.TemplateResponse(request, "presets.html", {"presets": presets})


@app.get("/presets/new", response_class=HTMLResponse)
def preset_new_page(request: Request):
    return templates.TemplateResponse(request, "preset_edit.html", {"preset": None})


@app.get("/presets/{preset_id}", response_class=HTMLResponse)
def preset_edit_page(preset_id: int, request: Request, db: Session = Depends(get_db)):
    preset = crud.get_preset(db, preset_id)
    if not preset:
        raise HTTPException(status_code=404, detail="Preset not found")
    return templates.TemplateResponse(request, "preset_edit.html", {"preset": preset})


@app.post("/presets/save")
def preset_save(
    request: Request,
    preset_id: int | None = Form(default=None),
    name: str = Form(...),
    input_width: int = Form(...),
    input_height: int = Form(...),
    rois_json: str = Form(default="[]"),
    keywords_csv: str = Form(default=""),
    confidence_threshold: float = Form(default=0.7),
    score_regex: str | None = Form(default=None),
    db: Session = Depends(get_db),
):
    try:
        rois = json.loads(rois_json or "[]")
        if not isinstance(rois, list):
            raise ValueError("rois_json must be a JSON array")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid ROIs JSON: {e}")

    keywords = [k.strip() for k in (keywords_csv or "").split(",") if k.strip()]

    data = {
        "name": name,
        "input_width": int(input_width),
        "input_height": int(input_height),
        "rois": rois,
        "keywords": keywords,
        "confidence_threshold": float(confidence_threshold),
        "score_regex": score_regex or None,
        "detection_mode": "ocr_keywords",
    }

    if preset_id:
        preset = crud.get_preset(db, int(preset_id))
        if not preset:
            raise HTTPException(status_code=404, detail="Preset not found")
        crud.update_preset(db, preset, data=data)
    else:
        existing = crud.get_preset_by_name(db, name)
        if existing:
            raise HTTPException(status_code=400, detail="Preset name already exists")
        crud.create_preset(db, data=data)

    return RedirectResponse(url="/presets", status_code=303)


@app.post("/presets/{preset_id}/delete")
def preset_delete(preset_id: int, db: Session = Depends(get_db)):
    preset = crud.get_preset(db, preset_id)
    if not preset:
        raise HTTPException(status_code=404, detail="Preset not found")

    # Stop processing if it's running for this preset.
    status = processor_manager.status()
    if status.running and status.preset_id == preset_id:
        processor_manager.stop()

    crud.delete_preset(db, preset)
    return RedirectResponse(url="/presets", status_code=303)


@app.get("/results", response_class=HTMLResponse)
def results_page(request: Request, db: Session = Depends(get_db)):
    presets = crud.list_presets(db)
    results = crud.list_results(db, limit=100)
    return templates.TemplateResponse(request, "results.html", {"presets": presets, "results": results})


@app.get("/settings", response_class=HTMLResponse)
def settings_page(request: Request, db: Session = Depends(get_db)):
    s = crud.get_app_settings(db)

    # Derive public RTMP endpoint from Host header unless explicitly set.
    host = (request.headers.get("host") or "").split(",")[0].strip()
    hostname = host.split(":")[0] if host else "VM_IP"
    public_server_url = s.public_rtmp_server_url or f"rtmp://{hostname}:1935/live"

    return templates.TemplateResponse(
        request,
        "settings.html",
        {
            "s": {
                "backend_stream_url": s.backend_stream_url,
                "public_rtmp_server_url": s.public_rtmp_server_url,
                "public_stream_key": s.public_stream_key,
                "obs_ws_enabled": bool(s.obs_ws_enabled),
                "obs_ws_host": s.obs_ws_host,
                "obs_ws_port": int(s.obs_ws_port),
                "obs_ws_password": s.obs_ws_password,
                "obs_auto_configure_stream": bool(s.obs_auto_configure_stream),
                "obs_auto_start_stream": bool(s.obs_auto_start_stream),
                "obs_auto_stop_stream": bool(s.obs_auto_stop_stream),
            },
            "public_server_url": public_server_url,
            "public_stream_key": s.public_stream_key,
            "backend_stream_url": s.backend_stream_url,
        },
    )


@app.post("/settings/save")
def settings_save(
    request: Request,
    backend_stream_url: str = Form(default="rtmp://rtmp:1935/live/stream"),
    public_rtmp_server_url: str | None = Form(default=None),
    public_stream_key: str = Form(default="stream"),
    obs_ws_enabled: str | None = Form(default=None),
    obs_ws_host: str = Form(default="127.0.0.1"),
    obs_ws_port: int = Form(default=4455),
    obs_ws_password: str | None = Form(default=None),
    obs_auto_configure_stream: str | None = Form(default=None),
    obs_auto_start_stream: str | None = Form(default=None),
    obs_auto_stop_stream: str | None = Form(default=None),
    db: Session = Depends(get_db),
):
    data = {
        "backend_stream_url": backend_stream_url.strip() or "rtmp://rtmp:1935/live/stream",
        "public_rtmp_server_url": (public_rtmp_server_url or "").strip() or None,
        "public_stream_key": public_stream_key.strip() or "stream",
        "obs_ws_enabled": 1 if obs_ws_enabled else 0,
        "obs_ws_host": obs_ws_host.strip() or "127.0.0.1",
        "obs_ws_port": int(obs_ws_port),
        "obs_ws_password": (obs_ws_password or "").strip() or None,
        "obs_auto_configure_stream": 1 if obs_auto_configure_stream else 0,
        "obs_auto_start_stream": 1 if obs_auto_start_stream else 0,
        "obs_auto_stop_stream": 1 if obs_auto_stop_stream else 0,
    }
    crud.update_app_settings(db, data=data)
    return RedirectResponse(url="/settings", status_code=303)


# --- JSON API ---


@app.get("/api/presets", response_model=list[schemas.PresetOut])
def api_list_presets(db: Session = Depends(get_db)):
    return crud.list_presets(db)


@app.get("/api/presets/{preset_id}", response_model=schemas.PresetOut)
def api_get_preset(preset_id: int, db: Session = Depends(get_db)):
    preset = crud.get_preset(db, preset_id)
    if not preset:
        raise HTTPException(status_code=404, detail="Preset not found")
    return preset


@app.post("/api/presets", response_model=schemas.PresetOut)
def api_create_preset(payload: schemas.PresetCreate, db: Session = Depends(get_db)):
    if crud.get_preset_by_name(db, payload.name):
        raise HTTPException(status_code=400, detail="Preset name already exists")
    return crud.create_preset(db, data=payload.model_dump())


@app.patch("/api/presets/{preset_id}", response_model=schemas.PresetOut)
def api_update_preset(preset_id: int, payload: schemas.PresetUpdate, db: Session = Depends(get_db)):
    preset = crud.get_preset(db, preset_id)
    if not preset:
        raise HTTPException(status_code=404, detail="Preset not found")
    data = {k: v for k, v in payload.model_dump().items() if v is not None}
    return crud.update_preset(db, preset, data=data)


@app.delete("/api/presets/{preset_id}")
def api_delete_preset(preset_id: int, db: Session = Depends(get_db)):
    preset = crud.get_preset(db, preset_id)
    if not preset:
        raise HTTPException(status_code=404, detail="Preset not found")
    crud.delete_preset(db, preset)
    return {"ok": True}


@app.get("/api/results", response_model=list[schemas.ResultOut])
def api_list_results(preset_id: int | None = None, limit: int = 100, db: Session = Depends(get_db)):
    return crud.list_results(db, preset_id=preset_id, limit=limit)


@app.get("/api/status", response_model=schemas.ProcessorStatus)
def api_status():
    return processor_manager.status()


@app.get("/api/rtmp/status")
def api_rtmp_status():
    # rtmp container exposes /stat on port 80 inside the compose network.
    try:
        return rtmp_status_service.get_publish_status(stat_url="http://rtmp/stat", expected_app="live")
    except Exception as e:
        return {"ok": False, "error": str(e), "publishing": False, "streams": []}


@app.get("/api/preview.jpg")
def api_preview_jpg(db: Session = Depends(get_db)):
    s = crud.get_app_settings(db)
    preview_service.preview_worker.ensure_running(s.backend_stream_url)
    jpeg, meta = preview_service.preview_worker.get_latest_jpeg(max_age_s=5.0)
    if jpeg is None:
        raise HTTPException(status_code=503, detail=meta.get("last_error") or "No preview frame yet")
    return Response(content=jpeg, media_type="image/jpeg")


@app.get("/api/preview.mjpeg")
def api_preview_mjpeg(db: Session = Depends(get_db)):
    # Always stream at 30 FPS for the dashboard. This is CPU/bandwidth heavy.
    s = crud.get_app_settings(db)
    gen = mjpeg_service.iter_mjpeg_multipart(stream_url=s.backend_stream_url, fps=30, width=640, height=360, jpeg_quality=6)
    return StreamingResponse(gen, media_type="multipart/x-mixed-replace; boundary=frame")


@app.get("/api/settings", response_model=schemas.AppSettingsOut)
def api_get_settings(db: Session = Depends(get_db)):
    s = crud.get_app_settings(db)
    return schemas.AppSettingsOut(
        backend_stream_url=s.backend_stream_url,
        public_rtmp_server_url=s.public_rtmp_server_url,
        public_stream_key=s.public_stream_key,
        obs_ws_enabled=bool(s.obs_ws_enabled),
        obs_ws_host=s.obs_ws_host,
        obs_ws_port=int(s.obs_ws_port),
        obs_ws_password=s.obs_ws_password,
        obs_auto_configure_stream=bool(s.obs_auto_configure_stream),
        obs_auto_start_stream=bool(s.obs_auto_start_stream),
        obs_auto_stop_stream=bool(s.obs_auto_stop_stream),
    )


@app.patch("/api/settings", response_model=schemas.AppSettingsOut)
def api_update_settings(payload: schemas.AppSettingsUpdate, db: Session = Depends(get_db)):
    data = {k: v for k, v in payload.model_dump().items() if v is not None}
    # Normalize bools to ints for sqlite.
    for k in ["obs_ws_enabled", "obs_auto_configure_stream", "obs_auto_start_stream", "obs_auto_stop_stream"]:
        if k in data:
            data[k] = 1 if data[k] else 0
    s = crud.update_app_settings(db, data=data)
    return api_get_settings(db)


def _obs_cfg_from_db(db: Session) -> obs_integration.ObsConfig:
    s = crud.get_app_settings(db)
    return obs_integration.ObsConfig(host=s.obs_ws_host, port=int(s.obs_ws_port), password=s.obs_ws_password)


@app.post("/api/obs/test")
def api_obs_test(db: Session = Depends(get_db)):
    s = crud.get_app_settings(db)
    if not bool(s.obs_ws_enabled):
        raise HTTPException(status_code=400, detail="OBS websocket integration is disabled in Settings")
    try:
        return obs_integration.test_connection(_obs_cfg_from_db(db))
    except obs_integration.ObsIntegrationError as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/api/obs/apply_rtmp")
def api_obs_apply_rtmp(server_url: str, stream_key: str, db: Session = Depends(get_db)):
    s = crud.get_app_settings(db)
    if not bool(s.obs_ws_enabled):
        raise HTTPException(status_code=400, detail="OBS websocket integration is disabled in Settings")
    try:
        return obs_integration.apply_rtmp_settings(_obs_cfg_from_db(db), server_url=server_url, stream_key=stream_key)
    except obs_integration.ObsIntegrationError as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/api/obs/start_stream")
def api_obs_start_stream(db: Session = Depends(get_db)):
    s = crud.get_app_settings(db)
    if not bool(s.obs_ws_enabled):
        raise HTTPException(status_code=400, detail="OBS websocket integration is disabled in Settings")
    try:
        return obs_integration.start_stream(_obs_cfg_from_db(db))
    except obs_integration.ObsIntegrationError as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/api/obs/stop_stream")
def api_obs_stop_stream(db: Session = Depends(get_db)):
    s = crud.get_app_settings(db)
    if not bool(s.obs_ws_enabled):
        raise HTTPException(status_code=400, detail="OBS websocket integration is disabled in Settings")
    try:
        return obs_integration.stop_stream(_obs_cfg_from_db(db))
    except obs_integration.ObsIntegrationError as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/api/processing/start")
def api_start_processing(request: Request, preset_id: int, sample_fps: float | None = None, db: Session = Depends(get_db)):
    preset = crud.get_preset(db, preset_id)
    if not preset:
        raise HTTPException(status_code=404, detail="Preset not found")

    # Optional OBS automation: configure & start streaming before processing.
    s = crud.get_app_settings(db)
    if bool(s.obs_ws_enabled) and bool(s.obs_auto_configure_stream):
        host = (request.headers.get("host") or "").split(",")[0].strip()
        hostname = host.split(":")[0] if host else "VM_IP"
        public_server_url = s.public_rtmp_server_url or f"rtmp://{hostname}:1935/live"
        try:
            obs_integration.apply_rtmp_settings(_obs_cfg_from_db(db), server_url=public_server_url, stream_key=s.public_stream_key)
        except obs_integration.ObsIntegrationError:
            # Don't hard-fail processing; stream might already be configured.
            pass

    if bool(s.obs_ws_enabled) and bool(s.obs_auto_start_stream):
        try:
            obs_integration.start_stream(_obs_cfg_from_db(db))
        except obs_integration.ObsIntegrationError:
            pass

    processor_manager.start(preset_id=preset.id, sample_fps=sample_fps)
    return {"ok": True}


@app.post("/api/processing/stop")
def api_stop_processing():
    # Optional OBS automation on stop.
    db = SessionLocal()
    try:
        s = crud.get_app_settings(db)
        if bool(s.obs_ws_enabled) and bool(s.obs_auto_stop_stream):
            try:
                obs_integration.stop_stream(_obs_cfg_from_db(db))
            except obs_integration.ObsIntegrationError:
                pass
    finally:
        db.close()

    processor_manager.stop()
    return {"ok": True}
