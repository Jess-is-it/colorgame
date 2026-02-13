# Face Detection (MVP)

This project keeps the Tailwind-Admin UI shell and adds a single feature page:

- Upload and manage videos
- Play a selected video in the browser
- Run face detection (server-side) and draw bounding-box overlays while the video plays
- Auto-save detected faces into a "people" table (SQLite metadata + images on disk)
- Configure capture presets (new vs existing, capture interval, max photos per person)

## Quick start (dev)

From `color-cube-dashboard/`:

```bash
./scripts/bootstrap.sh
./scripts/run.sh
```

Open in your client browser:
- `http://YOUR_SERVER_IP:5173/`

Backend is on:
- `http://YOUR_SERVER_IP:8000/health`

## Backend notes

### Offline vs cloud

The Faceplugin open-source repo we use for face detection is on-premise (runs locally). We do not use any API keys
and do not call any cloud endpoints.

Cloud face recognition APIs typically upload images/frames to a vendor server for processing; on-premise runs
the models locally on your machine/VM.

### PyTorch dependency

Faceplugin detection uses PyTorch (torch + torchvision). The bootstrap script installs CPU-only wheels via:
`https://download.pytorch.org/whl/cpu` to avoid downloading CUDA/GPU packages.

### Data storage

- SQLite DB: `color-cube-dashboard/backend/data/app.sqlite3`
- Uploaded videos: `color-cube-dashboard/backend/data/videos/`
- Captured face images: `color-cube-dashboard/backend/data/faces/<person_id>/`

### Settings

Edit via the web UI (Settings panel), stored in SQLite:
- `capture_new_person` (true/false)
- `existing_capture_interval_minutes` (e.g. 10)
- `max_images_per_person` (e.g. 40)
- `sample_fps` (sampling FPS while scanning the video)

## Auto-start on reboot (systemd)

Unit files are in:
- `color-cube-dashboard/deploy/systemd/color-cube-backend.service`
- `color-cube-dashboard/deploy/systemd/color-cube-frontend.service`

Install + enable:

```bash
sudo cp color-cube-dashboard/deploy/systemd/color-cube-backend.service /etc/systemd/system/color-cube-backend.service
sudo cp color-cube-dashboard/deploy/systemd/color-cube-frontend.service /etc/systemd/system/color-cube-frontend.service
sudo systemctl daemon-reload
sudo systemctl enable --now color-cube-backend.service
sudo systemctl enable --now color-cube-frontend.service
```

Check status/logs:

```bash
systemctl status color-cube-backend.service color-cube-frontend.service --no-pager -l
sudo journalctl -u color-cube-backend.service -n 200 --no-pager
sudo journalctl -u color-cube-frontend.service -n 200 --no-pager
```

## API endpoints (backend)

- `GET /health`
- `GET /api/settings`
- `PUT /api/settings`
- `GET /api/videos`
- `POST /api/videos` (upload)
- `PUT /api/videos/{video_id}` (replace)
- `DELETE /api/videos/{video_id}`
- `GET /api/videos/{video_id}/file` (HTML5 video with Range support)
- `POST /api/videos/{video_id}/detect` (start detection job)
- `GET /api/jobs/{job_id}`
- `GET /api/videos/{video_id}/detections` (for overlay)
- `GET /api/persons`
- `GET /api/persons/{person_id}/thumbnail`
- `GET /api/persons/{person_id}/images`
- `GET /api/face-images/{image_id}/file`

## Frontend env var

- `VITE_API_BASE_URL`
- Default: `http://<frontend-host>:8000` (uses `window.location.hostname`)
