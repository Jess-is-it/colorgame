# Color Cube Research Dashboard (Step 1)

Step 1 delivers:
- React dashboard UI
- FastAPI backend
- Live camera preview in browser using MJPEG (`/stream`)
- Camera online/offline status (`/api/camera/status`)

## Folder structure

```
color-cube-dashboard/
  frontend/
  backend/
    app/
      main.py
      camera.py
      config.py
    config.json
    requirements.txt
  README.md
```

## Backend setup/run

From `color-cube-dashboard/backend`:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

Endpoints:
- `GET /health`
- `GET /api/camera/status`
- `GET /stream` (MJPEG)

### Camera config

Edit: `color-cube-dashboard/backend/config.json`

Device (webcam passthrough required in a VM):
```json
{
  "camera": { "type": "device", "device_index": 0, "rtsp_url": "" }
}
```

RTSP:
```json
{
  "camera": { "type": "rtsp", "device_index": 0, "rtsp_url": "rtsp://..." }
}
```

## Frontend setup/run

From `color-cube-dashboard/frontend`:

```bash
npm install
VITE_API_BASE_URL=http://YOUR_SERVER_IP:8000 npm run dev -- --host 0.0.0.0 --port 5173
```

Open in your client browser:
- `http://YOUR_SERVER_IP:5173`

### Frontend config

- Env var: `VITE_API_BASE_URL`
- Default: `http://localhost:8000`

Notes for VMs:
- If your VM cannot see a physical webcam, use an RTSP source in `backend/config.json`.

## VM / camera note

If you are running in a VM, a physical USB webcam will only work if you enable webcam passthrough.
Otherwise, set `"camera.type": "rtsp"` and provide `"camera.rtsp_url"` in:

- `color-cube-dashboard/backend/config.json`
