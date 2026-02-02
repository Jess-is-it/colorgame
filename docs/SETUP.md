# Setup Notes (Ubuntu Server)

## Recommended (Docker Compose)
- Install Docker + Compose plugin
- Run `docker compose up --build`

## Without Docker (Ubuntu VM)
- Run `./scripts/install_system_deps_ubuntu.sh`
- Run `./scripts/run_mvp.sh`

## OBS configuration
- Stream type: Custom
- Server: `rtmp://<VM_IP>:1935/live`
- Stream key: `stream`

## OBS automation (optional)
If you install/enable obs-websocket v5 on the OBS host, the app can (optionally) test connectivity and start/stop streaming from the web UI.

## Ports
- 1935/tcp: RTMP ingest
- 8000/tcp: Web UI + API
