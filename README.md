# OBS Stream Dashboard (Minimal)

Headless Ubuntu setup to ingest an OBS stream via RTMP and show a near-live feed in a web dashboard.

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

4) Configure OBS (on the host machine).

Recommended (lowest latency, works best with browser WebRTC):

- Service: **WHIP**
- Server: `http://<VM_IP>:8889/live/stream/whip`
- Stream key: *(empty)*

Alternate (RTMP ingest):

- Service: **Custom...**
- Server: `rtmp://<VM_IP>:1935/live`
- Stream key: `stream`

The dashboard embeds the MediaMTX WebRTC player (low latency):

- `http://<VM_IP>:8889/live/stream`

## Ports

- `8000/tcp` Dashboard (FastAPI)
- `1935/tcp` RTMP ingest (OBS -> VM)
- `8889/tcp` WebRTC HTTP (player + WHEP)
- `8189/udp` WebRTC ICE/media
- `8189/tcp` WebRTC ICE/media (TCP fallback)

If you have a firewall on the VM, make sure these ports are allowed.

## Optional: start on boot

```bash
./scripts/install_systemd_service.sh
```
