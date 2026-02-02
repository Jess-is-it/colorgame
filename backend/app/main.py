from __future__ import annotations

import json
from pathlib import Path

from fastapi import Depends, FastAPI, Form, HTTPException, Request
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session

from app import crud, schemas
from app.db import SessionLocal
from app.services.processor import processor_manager


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


BASE_DIR = Path(__file__).resolve().parent

templates = Jinja2Templates(directory=str(BASE_DIR / "templates"))

app = FastAPI(title="Game Result Recorder")

app.mount("/static", StaticFiles(directory=str(BASE_DIR / "static")), name="static")


@app.get("/", response_class=HTMLResponse)
def dashboard(request: Request, db: Session = Depends(get_db)):
    presets = crud.list_presets(db)
    status = processor_manager.status()
    return templates.TemplateResponse(
        request,
        "dashboard.html",
        {"presets": presets, "status": status.model_dump()},
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


@app.post("/api/processing/start")
def api_start_processing(preset_id: int, sample_fps: float | None = None, db: Session = Depends(get_db)):
    preset = crud.get_preset(db, preset_id)
    if not preset:
        raise HTTPException(status_code=404, detail="Preset not found")
    processor_manager.start(preset_id=preset.id, sample_fps=sample_fps)
    return {"ok": True}


@app.post("/api/processing/stop")
def api_stop_processing():
    processor_manager.stop()
    return {"ok": True}
