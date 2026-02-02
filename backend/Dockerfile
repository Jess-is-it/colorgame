FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# System deps:
# - ffmpeg: read RTMP stream, sample frames
# - tesseract-ocr (+ eng): OCR engine
# - libgl1/libglib2.0-0: OpenCV runtime deps
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      ffmpeg \
      tesseract-ocr \
      tesseract-ocr-eng \
      libgl1 \
      libglib2.0-0 \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

COPY alembic.ini /app/alembic.ini
COPY alembic /app/alembic
COPY app /app/app
COPY scripts /app/scripts

EXPOSE 8000

CMD ["bash", "/app/scripts/start.sh"]
