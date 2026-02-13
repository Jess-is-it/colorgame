from __future__ import annotations

import cv2
import numpy as np


_U64_MASK = (1 << 64) - 1


def _to_signed_i64(u: int) -> int:
    """
    SQLite INTEGER is signed 64-bit; store hashes as signed int64 to avoid:
      "Python int too large to convert to SQLite INTEGER"
    """
    arr = np.array([u & _U64_MASK], dtype=np.uint64).view(np.int64)
    return int(arr[0].item())


def _to_u64(x: int) -> int:
    return int(x) & _U64_MASK


def phash64_bgr(face_bgr: np.ndarray) -> int:
    """
    Perceptual hash (pHash) signature for grouping "same person" faces.
    More stable than aHash under lighting changes.
    Returns a signed int64 (safe for SQLite).
    """
    if face_bgr is None or face_bgr.size == 0:
        return 0
    h, w = face_bgr.shape[:2]
    # Reduce background influence by hashing the central region.
    cx1 = int(w * 0.10)
    cy1 = int(h * 0.10)
    cx2 = int(w * 0.90)
    cy2 = int(h * 0.90)
    if cx2 <= cx1 + 2 or cy2 <= cy1 + 2:
        crop = face_bgr
    else:
        crop = face_bgr[cy1:cy2, cx1:cx2]

    gray = cv2.cvtColor(crop, cv2.COLOR_BGR2GRAY)
    img = cv2.resize(gray, (32, 32), interpolation=cv2.INTER_AREA)
    img_f = np.float32(img)
    dct = cv2.dct(img_f)
    dct_low = dct[:8, :8]
    med = float(np.median(dct_low[1:, 1:]))  # exclude DC
    bits = (dct_low > med).astype(np.uint8).flatten()
    sig_u = 0
    for b in bits[:64]:
        sig_u = (sig_u << 1) | int(b)
    return _to_signed_i64(sig_u)


def hamming_distance(a: int, b: int) -> int:
    # Compare in unsigned space to treat signed int64 as bit-patterns.
    ua = _to_u64(a)
    ub = _to_u64(b)
    return int((ua ^ ub).bit_count())
