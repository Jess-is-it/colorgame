#!/usr/bin/env bash
set -euo pipefail

SERVICE_PATH=/etc/systemd/system/grr.service

sudo tee "$SERVICE_PATH" >/dev/null <<'UNIT'
[Unit]
Description=OBS Stream Dashboard (docker compose)
After=network-online.target docker.service
Wants=network-online.target docker.service

[Service]
Type=oneshot
WorkingDirectory=/home/colorgame
RemainAfterExit=yes

ExecStart=/usr/bin/docker compose up -d --remove-orphans
ExecStop=/usr/bin/docker compose down

TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
UNIT

sudo systemctl daemon-reload
sudo systemctl enable --now grr.service
sudo systemctl status grr.service --no-pager -l
