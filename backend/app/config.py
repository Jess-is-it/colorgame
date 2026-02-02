from __future__ import annotations

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # SQLAlchemy URL
    db_url: str = "sqlite:////data/grr.db"

    # OBS -> RTMP ingest URL the processor reads from.
    stream_url: str = "rtmp://rtmp:1935/live/stream"

    # Default sampling FPS for new processing sessions.
    sample_fps_default: float = 2.0

    # Emit at most one result per N seconds per processor.
    emit_cooldown_seconds: float = 5.0

    model_config = SettingsConfigDict(env_prefix="GRR_", case_sensitive=False)


settings = Settings()
