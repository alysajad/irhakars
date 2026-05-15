import cv2
import os

img = cv2.imread('uploads/drivers/driver_15.jpeg')
h, w = img.shape[:2]
print(f"Image size: {w}x{h}")

# Save multiple crop candidates to identify correct face position
candidates = [
    ('c1', 0.00, 0.20, 0.42, 0.50),
    ('c2', 0.00, 0.28, 0.42, 0.58),
    ('c3', 0.00, 0.35, 0.42, 0.65),
    ('c4', 0.05, 0.22, 0.38, 0.52),
    ('c5', 0.05, 0.30, 0.38, 0.55),
]

for name, x1p, y1p, x2p, y2p in candidates:
    x1, y1, x2, y2 = int(w*x1p), int(h*y1p), int(w*x2p), int(h*y2p)
    crop = img[y1:y2, x1:x2]
    ch, cw = crop.shape[:2]
    size = min(ch, cw)
    cy, cx = ch//2, cw//2
    half = size//2
    sq = crop[max(0,cy-half):cy+half, max(0,cx-half):cx+half]
    cv2.imwrite(f'uploads/drivers/debug_{name}.jpg', cv2.resize(sq, (400,400)))
    print(f"  {name}: y={y1}-{y2}px, x={x1}-{x2}px")
