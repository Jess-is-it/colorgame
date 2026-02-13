from __future__ import annotations

import cv2
import numpy as np


def ahash64_bgr(face_bgr: np.ndarray) -> int:
    """
    Lightweight perceptual signature for "same person" grouping.
    Not a true face embedding, but works offline with zero extra models.
    """
    if face_bgr.size == 0:
        return 0
    gray = cv2.cvtColor(face_bgr, cv2.COLOR_BGR2GRAY)
    small = cv2.resize(gray, (8, 8), interpolation=cv2.INTER_AREA)
    mean = float(np.mean(small))
    bits = (small > mean).astype(np.uint8).flatten()
    sig = 0
    for b in bits:
        sig = (sig << 1) | int(b)
    return sig


def hamming_distance(a: int, b: int) -> int:
    return int((a ^ b).bit_count())

