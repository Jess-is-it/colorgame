from __future__ import annotations

import datetime as dt
from typing import Any

from pydantic import BaseModel, Field


class ROI(BaseModel):
    x: int = Field(ge=0)
    y: int = Field(ge=0)
    w: int = Field(gt=0)
    h: int = Field(gt=0)
    name: str | None = None


class PresetBase(BaseModel):
    name: str
    input_width: int = Field(gt=0)
    input_height: int = Field(gt=0)
    rois: list[ROI] = Field(default_factory=list)
    detection_mode: str = "ocr_keywords"
    keywords: list[str] = Field(default_factory=list)
    confidence_threshold: float = Field(default=0.7, ge=0.0, le=1.0)
    score_regex: str | None = None


class PresetCreate(PresetBase):
    pass


class PresetUpdate(BaseModel):
    name: str | None = None
    input_width: int | None = Field(default=None, gt=0)
    input_height: int | None = Field(default=None, gt=0)
    rois: list[ROI] | None = None
    detection_mode: str | None = None
    keywords: list[str] | None = None
    confidence_threshold: float | None = Field(default=None, ge=0.0, le=1.0)
    score_regex: str | None = None


class PresetOut(PresetBase):
    id: int
    created_at: dt.datetime
    updated_at: dt.datetime

    class Config:
        from_attributes = True


class ResultOut(BaseModel):
    id: int
    created_at: dt.datetime
    preset_id: int
    raw_text: str
    parsed_result_json: dict[str, Any]
    confidence: float

    class Config:
        from_attributes = True


class ProcessorStatus(BaseModel):
    running: bool
    preset_id: int | None
    sample_fps: float | None
    connected: bool
    last_frame_time: dt.datetime | None
    frames_processed: int
    last_error: str | None
