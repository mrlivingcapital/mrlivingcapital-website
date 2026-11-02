#!/usr/bin/env python3
# MRLC MARK v1 | invisible authorship layer for MRLC packs (INTERNAL ONLY - aces rule)
# Layer 1: DCT spread-spectrum watermark (invisible, survives JPEG recompression reasonably)
# Layer 2: PNG metadata chunk
# Usage: from mrlc_mark import mark_image, verify_image
import numpy as np
from PIL import Image
from scipy.fftpack import dct, idct

ALPHA = 64.0          # corridor-copy tuning; source archive remains unchanged
B = 16                # block size
POS = ((2, 5), (5, 2))  # low-mid frequency pair (compression-survival tuned)

def _dct2(b):  return dct(dct(b.T, norm="ortho").T, norm="ortho")
def _idct2(b): return idct(idct(b.T, norm="ortho").T, norm="ortho")

def _bits(payload: str):
    data = bytes([len(payload)]) + payload.encode("utf-8")
    return [(byte >> i) & 1 for byte in data for i in range(7, -1, -1)]

def mark_image(im: Image.Image, payload: str) -> Image.Image:
    im = im.convert("YCbCr")
    Y = np.asarray(im).astype(np.float64)[:, :, 0]
    h, w = Y.shape
    bh, bw = h // B, w // B
    bits = _bits(payload)
    n = len(bits)
    Yc = Y.copy()
    for idx in range(bh * bw):
        r, c = divmod(idx, bw)
        bit = bits[idx % n]
        blk = Yc[r*B:(r+1)*B, c*B:(c+1)*B]
        d = _dct2(blk)
        (u1, v1), (u2, v2) = POS
        diff = d[u1, v1] - d[u2, v2]
        if bit == 1 and diff < ALPHA:
            d[u1, v1] += (ALPHA - diff) / 2; d[u2, v2] -= (ALPHA - diff) / 2
        elif bit == 0 and diff > -ALPHA:
            d[u1, v1] -= (ALPHA + diff) / 2; d[u2, v2] += (ALPHA + diff) / 2
        Yc[r*B:(r+1)*B, c*B:(c+1)*B] = _idct2(d)
    out = np.asarray(im).astype(np.float64)
    out[:, :, 0] = np.clip(Yc, 0, 255)
    res = Image.fromarray(out.astype(np.uint8), "YCbCr").convert("RGB")
    res.info["mark"] = payload
    return res

def verify_image(im: Image.Image) -> str:
    im = im.convert("YCbCr")
    Y = np.asarray(im).astype(np.float64)[:, :, 0]
    h, w = Y.shape
    bh, bw = h // B, w // B
    raw = []
    for idx in range(bh * bw):
        r, c = divmod(idx, bw)
        d = _dct2(Y[r*B:(r+1)*B, c*B:(c+1)*B])
        (u1, v1), (u2, v2) = POS
        raw.append(1 if d[u1, v1] - d[u2, v2] > 0 else 0)
    raw = np.array(raw)
    # read length byte from majority of first 8 positions across repeats
    L = None
    # find repetition: try decode with candidate n from 8..400
    best = ("", 0.0)
    for nbytes in range(2, 64):
        n = nbytes * 8
        if n > len(raw): break
        reps = len(raw) // n
        if reps < 3: continue
        votes = raw[:reps*n].reshape(reps, n).mean(axis=0) > 0.5
        data = bytes(int("".join(str(int(b)) for b in votes[i:i+8]), 2) for i in range(0, n, 8))
        ln = data[0]
        if 1 <= ln <= nbytes - 1:
            try:
                s = data[1:1+ln].decode("utf-8")
            except Exception:
                continue
            if s.startswith("MRLC"):
                conf = float(np.mean(np.abs(raw[:reps*n].reshape(reps, n).mean(axis=0) - 0.5) * 2))
                if conf > best[1]:
                    best = (s, conf)
    return best
