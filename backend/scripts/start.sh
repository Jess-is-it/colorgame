#!/usr/bin/env bash
set -euo pipefail

cd /app

exec uvicorn app.main:app --host 0.0.0.0 --port 8000
