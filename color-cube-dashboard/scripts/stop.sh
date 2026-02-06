#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
RUN_DIR="$ROOT_DIR/.run"

stop_one() {
  local name="$1"
  local pidfile="$RUN_DIR/$name.pid"
  if [[ ! -f "$pidfile" ]]; then
    echo "[stop] $name not running (no pidfile)"
    return 0
  fi
  local pid
  pid="$(cat "$pidfile" || true)"
  if [[ -z "$pid" ]]; then
    rm -f "$pidfile"
    echo "[stop] $name pidfile empty"
    return 0
  fi
  if kill -0 "$pid" 2>/dev/null; then
    echo "[stop] stopping $name (pid $pid)"
    # Stop children first (npm spawns a child node process).
    pkill -TERM -P "$pid" 2>/dev/null || true
    kill -TERM "$pid" 2>/dev/null || true
    # give it a moment
    for _ in {1..20}; do
      if kill -0 "$pid" 2>/dev/null; then
        sleep 0.1
      else
        break
      fi
    done
    pkill -KILL -P "$pid" 2>/dev/null || true
    kill -KILL "$pid" 2>/dev/null || true
  else
    echo "[stop] $name not running (stale pid $pid)"
  fi
  rm -f "$pidfile"
}

stop_one frontend
stop_one backend

kill_listeners() {
  local port="$1"
  local pids
  pids="$(ss -lntp 2>/dev/null | awk -v p=":$port" '$4 ~ p {print $NF}' | sed -nE 's/.*pid=([0-9]+).*/\\1/p' | sort -u | tr '\n' ' ')"
  if [[ -z "$pids" ]]; then
    return 0
  fi
  echo "[stop] killing listeners on :$port (pids: $pids)"
  for pid in $pids; do
    kill -TERM "$pid" 2>/dev/null || true
  done
}

# As a safety net, kill any lingering processes still bound to the dev ports.
kill_listeners "${FRONTEND_PORT:-5173}"
kill_listeners "${BACKEND_PORT:-8000}"
