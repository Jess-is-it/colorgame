from __future__ import annotations

import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, StreamingResponse

from .camera import CameraManager
from .config import load_config


cfg = load_config()
camera = CameraManager(cfg)

app = FastAPI(title="Color Cube Dashboard API")

# Step 1: keep CORS simple; this is a local network dashboard.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def _startup() -> None:
    camera.start()


@app.on_event("shutdown")
def _shutdown() -> None:
    camera.stop()


@app.get("/health")
def health():
    return {"ok": True}


@app.get("/api/camera/status")
def camera_status():
    return camera.status()


@app.get("/stream")
def stream():
    # MJPEG streaming endpoint.
    return StreamingResponse(
        camera.mjpeg_generator(),
        media_type="multipart/x-mixed-replace; boundary=frame",
        headers={"Cache-Control": "no-store"},
    )

