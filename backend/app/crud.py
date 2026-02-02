from __future__ import annotations

import datetime as dt

from sqlalchemy import select
from sqlalchemy.orm import Session

from app import models


def get_app_settings(db: Session) -> models.AppSetting:
    s = db.get(models.AppSetting, 1)
    if s:
        return s
    s = models.AppSetting(id=1)
    db.add(s)
    db.commit()
    db.refresh(s)
    return s


def update_app_settings(db: Session, *, data: dict) -> models.AppSetting:
    s = get_app_settings(db)
    for k, v in data.items():
        setattr(s, k, v)
    db.add(s)
    db.commit()
    db.refresh(s)
    return s


def list_presets(db: Session) -> list[models.Preset]:
    return list(db.execute(select(models.Preset).order_by(models.Preset.name.asc())).scalars())


def get_preset(db: Session, preset_id: int) -> models.Preset | None:
    return db.get(models.Preset, preset_id)


def get_preset_by_name(db: Session, name: str) -> models.Preset | None:
    return db.execute(select(models.Preset).where(models.Preset.name == name)).scalar_one_or_none()


def create_preset(db: Session, *, data: dict) -> models.Preset:
    preset = models.Preset(**data)
    db.add(preset)
    db.commit()
    db.refresh(preset)
    return preset


def update_preset(db: Session, preset: models.Preset, *, data: dict) -> models.Preset:
    for k, v in data.items():
        setattr(preset, k, v)
    preset.updated_at = dt.datetime.now(dt.timezone.utc)
    db.add(preset)
    db.commit()
    db.refresh(preset)
    return preset


def delete_preset(db: Session, preset: models.Preset) -> None:
    db.delete(preset)
    db.commit()


def create_result(
    db: Session,
    *,
    preset_id: int,
    raw_text: str,
    parsed_result_json: dict,
    confidence: float,
) -> models.Result:
    r = models.Result(
        preset_id=preset_id,
        raw_text=raw_text,
        parsed_result_json=parsed_result_json,
        confidence=confidence,
    )
    db.add(r)
    db.commit()
    db.refresh(r)
    return r


def list_results(db: Session, *, preset_id: int | None = None, limit: int = 100) -> list[models.Result]:
    q = select(models.Result).order_by(models.Result.created_at.desc()).limit(limit)
    if preset_id is not None:
        q = q.where(models.Result.preset_id == preset_id)
    return list(db.execute(q).scalars())
