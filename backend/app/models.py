from __future__ import annotations

import datetime as dt

from sqlalchemy import DateTime, Float, ForeignKey, Integer, String, Text
from sqlalchemy.dialects.sqlite import JSON
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(DeclarativeBase):
    pass


class Preset(Base):
    __tablename__ = "presets"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)

    name: Mapped[str] = mapped_column(String(200), unique=True, nullable=False)

    input_width: Mapped[int] = mapped_column(Integer, nullable=False)
    input_height: Mapped[int] = mapped_column(Integer, nullable=False)

    # [{"x": int, "y": int, "w": int, "h": int, "name": "optional"}, ...]
    rois: Mapped[list] = mapped_column(JSON, nullable=False, default=list)

    detection_mode: Mapped[str] = mapped_column(String(50), nullable=False, default="ocr_keywords")

    # ["VICTORY", "DEFEAT", ...]
    keywords: Mapped[list] = mapped_column(JSON, nullable=False, default=list)

    # 0..1 (see services/processor.py for how confidence is computed)
    confidence_threshold: Mapped[float] = mapped_column(Float, nullable=False, default=0.7)

    # Optional regex to extract structured values from raw_text.
    # If it contains named groups, they are emitted into parsed_result_json.
    score_regex: Mapped[str | None] = mapped_column(String(500), nullable=True)

    created_at: Mapped[dt.datetime] = mapped_column(DateTime(timezone=True), default=lambda: dt.datetime.now(dt.timezone.utc))
    updated_at: Mapped[dt.datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: dt.datetime.now(dt.timezone.utc),
        onupdate=lambda: dt.datetime.now(dt.timezone.utc),
    )

    results: Mapped[list["Result"]] = relationship(back_populates="preset", cascade="all, delete-orphan")


class Result(Base):
    __tablename__ = "results"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)

    created_at: Mapped[dt.datetime] = mapped_column(DateTime(timezone=True), default=lambda: dt.datetime.now(dt.timezone.utc))

    preset_id: Mapped[int] = mapped_column(ForeignKey("presets.id", ondelete="CASCADE"), index=True, nullable=False)
    preset: Mapped[Preset] = relationship(back_populates="results")

    raw_text: Mapped[str] = mapped_column(Text, nullable=False)
    parsed_result_json: Mapped[dict] = mapped_column(JSON, nullable=False, default=dict)

    confidence: Mapped[float] = mapped_column(Float, nullable=False)


class AppSetting(Base):
    """
    Single-row table for MVP. Stores non-secret config (and for MVP, the OBS
    websocket password too; in production this should move to a secret store).
    """

    __tablename__ = "app_settings"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)

    # For Docker: backend typically reads from rtmp://rtmp:1935/live/stream
    backend_stream_url: Mapped[str] = mapped_column(String(500), nullable=False, default="rtmp://rtmp:1935/live/stream")

    # What we show to the user for OBS config (public VM endpoint).
    # If null, we derive it from the browser's host header.
    public_rtmp_server_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    public_stream_key: Mapped[str] = mapped_column(String(200), nullable=False, default="stream")

    # Optional OBS websocket automation (requires obs-websocket plugin on host).
    obs_ws_enabled: Mapped[bool] = mapped_column(Integer, nullable=False, default=0)  # sqlite bool
    obs_ws_host: Mapped[str] = mapped_column(String(200), nullable=False, default="127.0.0.1")
    obs_ws_port: Mapped[int] = mapped_column(Integer, nullable=False, default=4455)
    obs_ws_password: Mapped[str | None] = mapped_column(String(200), nullable=True)

    # Behavior toggles
    obs_auto_configure_stream: Mapped[bool] = mapped_column(Integer, nullable=False, default=0)
    obs_auto_start_stream: Mapped[bool] = mapped_column(Integer, nullable=False, default=0)
    obs_auto_stop_stream: Mapped[bool] = mapped_column(Integer, nullable=False, default=0)

    created_at: Mapped[dt.datetime] = mapped_column(DateTime(timezone=True), default=lambda: dt.datetime.now(dt.timezone.utc))
    updated_at: Mapped[dt.datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: dt.datetime.now(dt.timezone.utc),
        onupdate=lambda: dt.datetime.now(dt.timezone.utc),
    )
