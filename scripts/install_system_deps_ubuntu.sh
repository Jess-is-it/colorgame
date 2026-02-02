#!/usr/bin/env bash
set -euo pipefail

# System dependencies for the MVP:
# - nginx + rtmp module: RTMP ingest from OBS
# - ffmpeg: decode stream + sample frames
# - tesseract: OCR engine
# - python venv tooling

sudo apt-get update -y
sudo apt-get install -y \
  python3-venv python3-pip \
  ffmpeg \
  tesseract-ocr tesseract-ocr-eng \
  nginx libnginx-mod-rtmp \
  libgl1 libglib2.0-0
