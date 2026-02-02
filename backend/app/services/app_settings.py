from __future__ import annotations

from app.db import SessionLocal
from app import crud


def get_settings_dict() -> dict:
    db = SessionLocal()
    try:
        s = crud.get_app_settings(db)
        return {
            "backend_stream_url": s.backend_stream_url,
            "public_rtmp_server_url": s.public_rtmp_server_url,
            "public_stream_key": s.public_stream_key,
            "obs_ws_enabled": bool(s.obs_ws_enabled),
            "obs_ws_host": s.obs_ws_host,
            "obs_ws_port": int(s.obs_ws_port),
            "obs_ws_password": s.obs_ws_password,
            "obs_auto_configure_stream": bool(s.obs_auto_configure_stream),
            "obs_auto_start_stream": bool(s.obs_auto_start_stream),
            "obs_auto_stop_stream": bool(s.obs_auto_stop_stream),
        }
    finally:
        db.close()
