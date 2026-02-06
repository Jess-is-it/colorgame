#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
RUN_DIR="$ROOT_DIR/.run"

show_one() {
  local name="$1"
  local pidfile="$RUN_DIR/$name.pid"
  if [[ ! -f "$pidfile" ]]; then
    echo "$name: stopped"
    return 0
  fi
  local pid
  pid="$(cat "$pidfile" || true)"
  if [[ -n "$pid" ]] && kill -0 "$pid" 2>/dev/null; then
    echo "$name: running (pid $pid)"
  else
    echo "$name: stopped (stale pidfile)"
  fi
}

show_one backend
show_one frontend

