# Setup Notes (Ubuntu Server)

## Recommended (Docker Compose)
- Install Docker + Compose plugin
- Run `docker compose up --build`

## OBS configuration
- Stream type: Custom
- Server: `rtmp://<VM_IP>:1935/live`
- Stream key: `stream`

## Ports
- 1935/tcp: RTMP ingest
- 8000/tcp: Web UI + API
