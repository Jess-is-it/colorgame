#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "[bootstrap] backend venv + deps"
cd "$ROOT_DIR/backend"
python3 -m venv .venv
source .venv/bin/activate
pip install --no-cache-dir -r requirements.txt

echo "[bootstrap] frontend deps"
cd "$ROOT_DIR/frontend"
npm install --no-fund --no-audit

echo "[bootstrap] done"

