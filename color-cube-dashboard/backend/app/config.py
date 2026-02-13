from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class AppPaths:
    root: Path
    data_dir: Path
    videos_dir: Path
    faces_dir: Path
    db_path: Path


def get_paths() -> AppPaths:
    # backend/ is the working directory in systemd + README commands.
    root = Path(__file__).resolve().parents[1]
    # Allow storage to be placed on a larger disk/mount (e.g. VirtualBox shared folder).
    data_root = os.environ.get("COLOR_CUBE_DATA_DIR", "").strip()
    data_dir = Path(data_root).expanduser().resolve() if data_root else (root / "data")
    videos_dir = data_dir / "videos"
    faces_dir = data_dir / "faces"
    db_path = data_dir / "app.sqlite3"

    return AppPaths(
        root=root,
        data_dir=data_dir,
        videos_dir=videos_dir,
        faces_dir=faces_dir,
        db_path=db_path,
    )


def ensure_dirs() -> None:
    p = get_paths()
    p.data_dir.mkdir(parents=True, exist_ok=True)
    p.videos_dir.mkdir(parents=True, exist_ok=True)
    p.faces_dir.mkdir(parents=True, exist_ok=True)
