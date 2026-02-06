#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
RUN_DIR="$ROOT_DIR/.run"
mkdir -p "$RUN_DIR"

BACKEND_PORT="${BACKEND_PORT:-8000}"
FRONTEND_PORT="${FRONTEND_PORT:-5173}"
API_BASE_URL="${VITE_API_BASE_URL:-http://localhost:${BACKEND_PORT}}"

if [[ ! -x "$ROOT_DIR/backend/.venv/bin/uvicorn" ]]; then
  echo "[run] backend venv not found. Run: $ROOT_DIR/scripts/bootstrap.sh"
  exit 1
fi

if [[ ! -d "$ROOT_DIR/frontend/node_modules" ]]; then
  echo "[run] frontend node_modules not found. Run: $ROOT_DIR/scripts/bootstrap.sh"
  exit 1
fi

if [[ -f "$RUN_DIR/backend.pid" ]] && kill -0 "$(cat "$RUN_DIR/backend.pid")" 2>/dev/null; then
  echo "[run] backend already running (pid $(cat "$RUN_DIR/backend.pid"))"
else
  echo "[run] starting backend on :$BACKEND_PORT"
  (
    cd "$ROOT_DIR/backend"
    source .venv/bin/activate
    exec uvicorn app.main:app --host 0.0.0.0 --port "$BACKEND_PORT"
  ) >"$RUN_DIR/backend.log" 2>&1 &
  echo $! >"$RUN_DIR/backend.pid"
fi

if [[ -f "$RUN_DIR/frontend.pid" ]] && kill -0 "$(cat "$RUN_DIR/frontend.pid")" 2>/dev/null; then
  echo "[run] frontend already running (pid $(cat "$RUN_DIR/frontend.pid"))"
else
  echo "[run] starting frontend on :$FRONTEND_PORT (VITE_API_BASE_URL=$API_BASE_URL)"
  (
    cd "$ROOT_DIR/frontend"
    export VITE_API_BASE_URL="$API_BASE_URL"
    # Run Vite directly so we can reliably manage the process by PID.
    exec ./node_modules/.bin/vite --host 0.0.0.0 --port "$FRONTEND_PORT"
  ) >"$RUN_DIR/frontend.log" 2>&1 &
  echo $! >"$RUN_DIR/frontend.pid"
fi

echo "[run] logs:"
echo "  $RUN_DIR/backend.log"
echo "  $RUN_DIR/frontend.log"

echo "[run] waiting for services..."
for _ in {1..40}; do
  if curl -fsS "http://127.0.0.1:${BACKEND_PORT}/health" >/dev/null 2>&1; then
    break
  fi
  sleep 0.1
done

echo "[run] backend:  http://0.0.0.0:${BACKEND_PORT} (health: /health)"
echo "[run] frontend: http://0.0.0.0:${FRONTEND_PORT}"
