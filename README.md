# Game Result Recorder (MVP)

Headless Ubuntu MVP to ingest an OBS live stream (RTMP), sample frames, OCR regions-of-interest (ROIs), match keywords, and persist end-of-game results. All interaction is via a web UI from a separate client machine.

## Quick start (VM)

### Docker Compose (recommended)

1) Install Docker (Ubuntu):

```bash
./scripts/install_docker_ubuntu.sh
```

2) Start services:

```bash
docker compose up --build
```

3) Open the UI from your client machine:

- `http://<VM_IP>:8000`

3b) (Optional) Install a systemd service so the stack starts on boot:

```bash
./scripts/install_systemd_service.sh
```

4) Configure OBS (on the host machine):

- Stream type: **Custom**
- Server: `rtmp://<VM_IP>:1935/live`
- Stream key: `stream`

5) In the UI:

- Create a preset with the same resolution as your OBS output.
- Add one or more ROI(s) and a keyword list (comma-separated).
- Start processing.

When keywords appear in OCR text within any ROI, a result record is stored and shown in the dashboard/results pages.

Tip: The UI has a `Settings` page that shows the RTMP values and (optionally) lets you connect to OBS via obs-websocket to automate starting/stopping streaming.

### Without Docker (fallback)

```bash
./scripts/install_system_deps_ubuntu.sh
./scripts/run_mvp.sh
```

## Preset format (MVP)

- Resolution: `input_width` / `input_height` (frames are scaled to this before ROI cropping)
- ROIs JSON: array of objects

Example:

```json
[
  {"x": 120, "y": 80, "w": 900, "h": 220, "name": "end_screen"}
]
```

- Keywords: comma-separated, e.g. `victory, defeat, game over`
- Optional score regex: any Python regex; named groups are included in `parsed_result_json`

Example:

```text
Score:\s*(?P<score>\d+)
```

## Status semantics

- **Connected**: the backend has received at least one decoded frame in the last ~5 seconds.

## System dependencies (inside Docker image)

- `ffmpeg` (decode RTMP, sample frames)
- `tesseract-ocr` + `tesseract-ocr-eng` (OCR)

Without Docker, `./scripts/install_system_deps_ubuntu.sh` installs the needed system packages and `./scripts/run_mvp.sh` creates a local Python venv in `backend/.venv`.

## Repo layout

- `backend/` FastAPI app, stream processor, migrations
- `docs/` setup + architecture notes
- `docker-compose.yml` RTMP ingest + backend

## Troubleshooting

- If OBS cannot connect: ensure VM firewall allows TCP/1935.
- If UI shows disconnected: make sure OBS is actively streaming and the server/key match.
- If OCR is noisy: enlarge ROI(s), increase UI font size in-game, and tune keywords/threshold.
