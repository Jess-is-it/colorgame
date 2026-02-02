#!/usr/bin/env bash
set -euo pipefail

# Ubuntu 24.04 pragmatic install via Ubuntu packages.
# For production/hardening, consider Docker's official repo + daemon.json tuning.

sudo apt-get update -y
sudo apt-get install -y docker.io docker-compose-v2

sudo systemctl enable --now docker

# Allow current user to run docker without sudo (takes effect on next login).
if [ -n "${SUDO_USER:-}" ]; then
  sudo usermod -aG docker "$SUDO_USER" || true
  echo "Added $SUDO_USER to docker group (log out/in required)."
else
  echo "Tip: add your user to the docker group: sudo usermod -aG docker <user>"
fi

sudo docker version
sudo docker compose version
