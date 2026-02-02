# OBS Stream Dashboard (Minimal)

Headless Ubuntu setup to ingest an OBS stream via RTMP and show a live feed in a web dashboard.

## Quick start (VM)

1) Install Docker (Ubuntu):

```bash
./scripts/install_docker_ubuntu.sh
```

2) Start services:

```bash
docker compose up --build -d
```

3) Open the dashboard from your client machine:

- `http://<VM_IP>:8000`

4) Configure OBS (on the host machine):

- Stream type: **Custom**
- Server: `rtmp://<VM_IP>:1935/live`
- Stream key: `stream`

The dashboard plays HLS from:

- `http://<VM_IP>:8080/hls/stream.m3u8`

## Optional: start on boot

```bash
./scripts/install_systemd_service.sh
```
