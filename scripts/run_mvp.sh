#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
PREFIX="/tmp/grr-nginx"
CONF="$ROOT_DIR/scripts/nginx/nginx.conf"

DB_PATH="$ROOT_DIR/data/grr.db"
STREAM_URL="rtmp://127.0.0.1:1935/live/stream"

mkdir -p "$ROOT_DIR/data"

# Start RTMP ingest (nginx-rtmp) using an isolated prefix, so we don't touch /etc/nginx.
# Requires sudo because we bind to a privileged-ish port and write to /tmp.
sudo mkdir -p "$PREFIX/logs"

# Stop any existing instance using our prefix.
if sudo test -f "$PREFIX/nginx.pid"; then
  sudo nginx -s stop -c "$CONF" -p "$PREFIX" || true
fi

sudo nginx -c "$CONF" -p "$PREFIX"

cleanup() {
  sudo nginx -s stop -c "$CONF" -p "$PREFIX" || true
}
trap cleanup EXIT

# Python backend (venv lives in backend/.venv)
cd "$ROOT_DIR/backend"
if [ ! -d .venv ]; then
  python3 -m venv .venv
fi

. .venv/bin/activate
python -m pip install --upgrade pip
pip install -r requirements.txt

export GRR_DB_URL="sqlite:///$DB_PATH"
export GRR_STREAM_URL="$STREAM_URL"
export GRR_SAMPLE_FPS_DEFAULT="2"

alembic upgrade head

exec uvicorn app.main:app --host 0.0.0.0 --port 8000
