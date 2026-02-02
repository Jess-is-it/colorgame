from __future__ import annotations

import json
import os
import time
import uuid
from dataclasses import dataclass
from typing import Any, Dict, List, Optional


def _now_ts() -> float:
    return time.time()


def _atomic_write_json(path: str, payload: Any) -> None:
    os.makedirs(os.path.dirname(path) or ".", exist_ok=True)
    tmp = path + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2)
    os.replace(tmp, path)


@dataclass(frozen=True)
class Sample:
    id: str
    filename: str
    orig_name: str
    # labels are [left, mid, right], values are color strings or None; the whole field can be None
    # until the user labels the sample.
    labels: Optional[List[Optional[str]]]
    uploaded_at: float


class SampleStore:
    """
    Stores uploaded training samples per draw on disk.

    Layout:
      {root}/{draw_id}/
        samples/
          {sample_id}.jpg|png
        samples.json
    """

    def __init__(self, root: str) -> None:
        self.root = root

    def _draw_dir(self, draw_id: str) -> str:
        return os.path.join(self.root, draw_id)

    def _samples_dir(self, draw_id: str) -> str:
        return os.path.join(self._draw_dir(draw_id), "samples")

    def _meta_path(self, draw_id: str) -> str:
        return os.path.join(self._draw_dir(draw_id), "samples.json")

    def _load_meta(self, draw_id: str) -> Dict[str, Any]:
        path = self._meta_path(draw_id)
        if not os.path.exists(path):
            return {"items": []}
        try:
            with open(path, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return {"items": []}

    def _save_meta(self, draw_id: str, meta: Dict[str, Any]) -> None:
        _atomic_write_json(self._meta_path(draw_id), meta)

    def list(self, draw_id: str) -> List[Dict[str, Any]]:
        meta = self._load_meta(draw_id)
        return list(meta.get("items") or [])

    def add(self, draw_id: str, orig_name: str, content: bytes, ext: str) -> Dict[str, Any]:
        os.makedirs(self._samples_dir(draw_id), exist_ok=True)
        sample_id = uuid.uuid4().hex
        filename = f"{sample_id}.{ext}"
        fpath = os.path.join(self._samples_dir(draw_id), filename)
        with open(fpath, "wb") as f:
            f.write(content)

        rec = {
            "id": sample_id,
            "filename": filename,
            "orig_name": orig_name,
            "labels": None,
            "uploaded_at": _now_ts(),
        }
        meta = self._load_meta(draw_id)
        meta.setdefault("items", []).append(rec)
        self._save_meta(draw_id, meta)
        return rec

    def get_path(self, draw_id: str, sample_id: str) -> Optional[str]:
        for it in self.list(draw_id):
            if it.get("id") == sample_id:
                return os.path.join(self._samples_dir(draw_id), it.get("filename") or "")
        return None

    def update_labels(self, draw_id: str, sample_id: str, labels: Optional[List[Optional[str]]]) -> Dict[str, Any]:
        meta = self._load_meta(draw_id)
        items = meta.get("items") or []
        for it in items:
            if it.get("id") != sample_id:
                continue
            it["labels"] = labels
            self._save_meta(draw_id, meta)
            return dict(it)
        raise KeyError("sample not found")

    def delete(self, draw_id: str, sample_id: str) -> None:
        meta = self._load_meta(draw_id)
        items = meta.get("items") or []
        keep = []
        target = None
        for it in items:
            if it.get("id") == sample_id:
                target = it
            else:
                keep.append(it)
        if target is None:
            raise KeyError("sample not found")
        meta["items"] = keep
        self._save_meta(draw_id, meta)
        # best-effort delete file
        try:
            fpath = os.path.join(self._samples_dir(draw_id), target.get("filename") or "")
            if os.path.exists(fpath):
                os.remove(fpath)
        except Exception:
            pass
