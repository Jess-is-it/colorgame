from __future__ import annotations

import sqlite3
from contextlib import contextmanager
from pathlib import Path
from typing import Iterator


def connect(db_path: Path) -> sqlite3.Connection:
    conn = sqlite3.connect(str(db_path), check_same_thread=False)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL;")
    conn.execute("PRAGMA foreign_keys=ON;")
    return conn


def init_db(conn: sqlite3.Connection) -> None:
    # Keep migrations minimal for MVP: create tables if missing.
    conn.executescript(
        """
        CREATE TABLE IF NOT EXISTS videos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          original_name TEXT NOT NULL,
          stored_name TEXT NOT NULL,
          uploaded_at TEXT NOT NULL,
          duration_sec REAL,
          width INTEGER,
          height INTEGER,
          fps REAL
        );

        CREATE TABLE IF NOT EXISTS settings (
          id INTEGER PRIMARY KEY CHECK (id = 1),
          capture_new_person INTEGER NOT NULL DEFAULT 1,
          existing_capture_interval_minutes INTEGER NOT NULL DEFAULT 10,
          max_images_per_person INTEGER NOT NULL DEFAULT 40,
          sample_fps REAL NOT NULL DEFAULT 2.0
        );

        INSERT OR IGNORE INTO settings (id) VALUES (1);

        CREATE TABLE IF NOT EXISTS persons (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          codename TEXT NOT NULL UNIQUE,
          signature INTEGER,
          created_at TEXT NOT NULL,
          last_seen TEXT,
          last_capture_at TEXT
        );

        CREATE TABLE IF NOT EXISTS face_images (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          person_id INTEGER NOT NULL,
          video_id INTEGER NOT NULL,
          captured_at TEXT NOT NULL,
          path TEXT NOT NULL,
          signature INTEGER,
          FOREIGN KEY(person_id) REFERENCES persons(id) ON DELETE CASCADE,
          FOREIGN KEY(video_id) REFERENCES videos(id) ON DELETE CASCADE
        );

        CREATE INDEX IF NOT EXISTS idx_face_images_person_id ON face_images(person_id);
        CREATE INDEX IF NOT EXISTS idx_face_images_video_id ON face_images(video_id);

        CREATE TABLE IF NOT EXISTS detections (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          video_id INTEGER NOT NULL,
          t_sec REAL NOT NULL,
          x INTEGER NOT NULL,
          y INTEGER NOT NULL,
          w INTEGER NOT NULL,
          h INTEGER NOT NULL,
          person_id INTEGER,
          score REAL,
          FOREIGN KEY(video_id) REFERENCES videos(id) ON DELETE CASCADE,
          FOREIGN KEY(person_id) REFERENCES persons(id) ON DELETE SET NULL
        );

        CREATE INDEX IF NOT EXISTS idx_detections_video_time ON detections(video_id, t_sec);
        """
    )
    conn.commit()


@contextmanager
def tx(conn: sqlite3.Connection) -> Iterator[sqlite3.Cursor]:
    cur = conn.cursor()
    try:
        yield cur
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        cur.close()

