from __future__ import annotations

import json
import os
import threading
import time
import uuid
from dataclasses import dataclass
from typing import Any, Dict, List, Optional, Tuple


def _now_ts() -> float:
    return time.time()


def _atomic_write_json(path: str, payload: Any) -> None:
    os.makedirs(os.path.dirname(path) or ".", exist_ok=True)
    tmp = path + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2)
    os.replace(tmp, path)


@dataclass(frozen=True)
class Draw:
    id: str
    name: str
    width: int
    height: int
    stable_frames: int
    min_confidence: float
    # ROI that contains all 3 result boxes; can be null until calibrated
    result_roi: Optional[Dict[str, int]]
    created_at: float
    updated_at: float


class DrawStore:
    """
    Minimal persistence for multiple draw configs.
    Stored as JSON on disk under /data so it survives container restarts.
    """

    def __init__(self, path: str) -> None:
        self.path = path
        self._lock = threading.Lock()
        self._state: Dict[str, Any] = {"active_id": None, "draws": []}
        self._load_or_init()

    def _load_or_init(self) -> None:
        with self._lock:
            if not os.path.exists(self.path):
                # create a default draw so the UI isn't empty
                now = _now_ts()
                default = {
                    "id": "default",
                    "name": "Default",
                    "width": 1920,
                    "height": 1080,
                    "stable_frames": 8,
                    "min_confidence": 0.35,
                    "result_roi": None,
                    "created_at": now,
                    "updated_at": now,
                }
                self._state = {"active_id": "default", "draws": [default]}
                _atomic_write_json(self.path, self._state)
                return

            try:
                with open(self.path, "r", encoding="utf-8") as f:
                    self._state = json.load(f)
            except Exception:
                # If corrupted, don't nuke it; start fresh.
                now = _now_ts()
                self._state = {"active_id": None, "draws": [], "error_at": now}

            # Ensure schema keys exist
            self._state.setdefault("active_id", None)
            self._state.setdefault("draws", [])

            if not self._state["draws"]:
                now = _now_ts()
                default = {
                    "id": "default",
                    "name": "Default",
                    "width": 1920,
                    "height": 1080,
                    "stable_frames": 8,
                    "min_confidence": 0.35,
                    "result_roi": None,
                    "created_at": now,
                    "updated_at": now,
                }
                self._state["draws"] = [default]
                self._state["active_id"] = "default"
                _atomic_write_json(self.path, self._state)

    def _save(self) -> None:
        _atomic_write_json(self.path, self._state)

    def list(self) -> List[Dict[str, Any]]:
        with self._lock:
            return list(self._state.get("draws") or [])

    def get(self, draw_id: str) -> Optional[Dict[str, Any]]:
        with self._lock:
            for d in (self._state.get("draws") or []):
                if d.get("id") == draw_id:
                    return dict(d)
        return None

    def active(self) -> Optional[Dict[str, Any]]:
        with self._lock:
            active_id = self._state.get("active_id")
        if not active_id:
            return None
        return self.get(active_id)

    def set_active(self, draw_id: str) -> Dict[str, Any]:
        with self._lock:
            found = None
            for d in (self._state.get("draws") or []):
                if d.get("id") == draw_id:
                    found = d
                    break
            if found is None:
                raise KeyError("draw not found")
            self._state["active_id"] = draw_id
            self._save()
            return dict(found)

    def create(self, name: str) -> Dict[str, Any]:
        now = _now_ts()
        draw_id = uuid.uuid4().hex
        rec = {
            "id": draw_id,
            "name": name.strip() or "Untitled",
            "width": 1920,
            "height": 1080,
            "stable_frames": 8,
            "min_confidence": 0.35,
            "result_roi": None,
            "created_at": now,
            "updated_at": now,
        }
        with self._lock:
            self._state.setdefault("draws", []).append(rec)
            if not self._state.get("active_id"):
                self._state["active_id"] = draw_id
            self._save()
        return dict(rec)

    def update(self, draw_id: str, patch: Dict[str, Any]) -> Dict[str, Any]:
        with self._lock:
            draws = self._state.get("draws") or []
            for d in draws:
                if d.get("id") != draw_id:
                    continue
                if "name" in patch:
                    d["name"] = str(patch["name"]).strip() or d.get("name") or "Untitled"
                if "width" in patch:
                    d["width"] = int(patch["width"])
                if "height" in patch:
                    d["height"] = int(patch["height"])
                if "stable_frames" in patch:
                    d["stable_frames"] = max(1, int(patch["stable_frames"]))
                if "min_confidence" in patch:
                    d["min_confidence"] = float(patch["min_confidence"])
                if "result_roi" in patch:
                    rr = patch["result_roi"]
                    if rr is None:
                        d["result_roi"] = None
                    else:
                        d["result_roi"] = {
                            "x": int(rr["x"]),
                            "y": int(rr["y"]),
                            "w": int(rr["w"]),
                            "h": int(rr["h"]),
                        }
                d["updated_at"] = _now_ts()
                self._save()
                return dict(d)
        raise KeyError("draw not found")

    def delete(self, draw_id: str) -> None:
        with self._lock:
            draws = self._state.get("draws") or []
            new_draws = [d for d in draws if d.get("id") != draw_id]
            if len(new_draws) == len(draws):
                raise KeyError("draw not found")
            self._state["draws"] = new_draws
            if self._state.get("active_id") == draw_id:
                self._state["active_id"] = new_draws[0]["id"] if new_draws else None
            self._save()

