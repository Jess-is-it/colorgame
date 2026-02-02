from __future__ import annotations

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.config import settings


def make_engine():
    connect_args = {}
    if settings.db_url.startswith("sqlite:"):
        # Required for SQLite access across threads (stream processor runs in a thread).
        connect_args = {"check_same_thread": False}

    return create_engine(settings.db_url, connect_args=connect_args, future=True)


engine = make_engine()
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, future=True)
