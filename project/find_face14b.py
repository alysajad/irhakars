import cv2

img = cv2.imread('uploads/drivers/driver_15.jpeg')
h, w = img.shape[:2]
print(f"Image size: {w}x{h}")

candidates = [
    ('r1', 0.55, 0.20, 0.95, 0.55),
    ('r2', 0.50, 0.28, 0.90, 0.58),
    ('r3', 0.40, 0.30, 0.80, 0.60),
    ('r4', 0.30, 0.35, 0.70, 0.65),
    ('r5', 0.20, 0.25, 0.60, 0.55),
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
    print(f"  {name}: x={x1}-{x2}px, y={y1}-{y2}px")
