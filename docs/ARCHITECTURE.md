# Game Result Recorder - Architecture (MVP)

## Overview
This MVP ingests a live OBS stream via RTMP, samples frames at a low FPS, runs OCR on user-defined regions-of-interest (ROIs), matches keywords, and persists "result" records to SQLite. A web UI provides preset CRUD, start/stop processing, live status, and results history.

## Components
- RTMP ingest: `nginx-rtmp` container exposes TCP/1935
- Backend: FastAPI app
  - Web UI (server-rendered HTML)
  - JSON API
  - Stream processing thread (ffmpeg -> raw frames -> OCR -> keyword match)
  - Optional OBS automation via obs-websocket (start/stop/configure RTMP)
  - SQLite persistence + Alembic migrations

## Data flow
OBS (host) -> RTMP push -> VM:1935 -> ffmpeg reads RTMP -> frames (rawvideo) -> ROI crops -> Tesseract OCR -> keyword match -> results table -> UI polls results/status

## Key design choices
- RTMP is used for ingest because OBS supports it well and it is easy to self-host.
- ffmpeg is used to decode video and downsample FPS server-side.
- ROIs are defined in the coordinate space of the preset resolution; frames are scaled to that resolution before OCR.
- The processor is single-active-session for MVP (one preset at a time) to keep state and resources simple.
