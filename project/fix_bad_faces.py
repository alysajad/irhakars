import cv2
import os
import numpy as np

output_dir = 'uploads/drivers'

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')


def try_detect_face(img):
    """Try progressively looser detection; return (x,y,w,h) or None."""
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    gray = cv2.equalizeHist(gray)
    for neighbors in [5, 4, 3, 2]:
        for min_sz in [50, 40, 30]:
            faces = face_cascade.detectMultiScale(
                gray, scaleFactor=1.05, minNeighbors=neighbors, minSize=(min_sz, min_sz)
            )
            if len(faces) > 0:
                return max(faces, key=lambda f: f[2] * f[3])
    return None


def face_crop_to_square(img, face, pad_x=0.50, pad_y=0.65):
    """Expand face box by padding, take center square, resize to 400."""
    h, w = img.shape[:2]
    x, y, fw, fh = face
    px, py = int(fw * pad_x), int(fh * pad_y)
    x1, y1 = max(0, x - px), max(0, y - py)
    x2, y2 = min(w, x + fw + px), min(h, y + fh + py)
    crop = img[y1:y2, x1:x2]
    ch, cw = crop.shape[:2]
    size = min(ch, cw)
    cy, cx = ch // 2, cw // 2
    half = size // 2
    sq = crop[max(0, cy - half):cy + half, max(0, cx - half):cx + half]
    return cv2.resize(sq, (400, 400))


def region_crop_to_square(img, x1p, y1p, x2p, y2p):
    """Crop a % region, take center square, resize to 400."""
    h, w = img.shape[:2]
    x1 = int(w * x1p); y1 = int(h * y1p)
    x2 = int(w * x2p); y2 = int(h * y2p)
    crop = img[y1:y2, x1:x2]
    ch, cw = crop.shape[:2]
    size = min(ch, cw)
    cy, cx = ch // 2, cw // 2
    half = size // 2
    sq = crop[max(0, cy - half):cy + half, max(0, cx - half):cx + half]
    return cv2.resize(sq, (400, 400))


# ── face_14: driver_15.jpeg (person on LEFT in purple jacket) ───────────────
img = cv2.imread(os.path.join(output_dir, 'driver_15.jpeg'))
h, w = img.shape[:2]
# Try detection on the left half (where the person stands)
left_half = img[:, :w // 2]
face = try_detect_face(left_half)
if face is not None:
    sq = face_crop_to_square(left_half, face)
    method = 'face-detect'
else:
    # Fallback: manual crop — face is in upper-left of image
    sq = region_crop_to_square(img, 0.02, 0.01, 0.45, 0.30)
    method = 'manual-region'
cv2.imwrite(os.path.join(output_dir, 'face_14.jpg'), sq)
print(f"face_14.jpg written [{method}]")


# ── face_16: driver_17.jpeg (person on RIGHT in dark jacket) ────────────────
img = cv2.imread(os.path.join(output_dir, 'driver_17.jpeg'))
h, w = img.shape[:2]
# Try detection on the right half (where the person stands)
right_half = img[:, w // 2:]
face = try_detect_face(right_half)
if face is not None:
    sq = face_crop_to_square(right_half, face)
    method = 'face-detect'
else:
    # Fallback: manual crop — face is in upper-right of image
    sq = region_crop_to_square(img, 0.45, 0.05, 0.92, 0.35)
    method = 'manual-region'
cv2.imwrite(os.path.join(output_dir, 'face_16.jpg'), sq)
print(f"face_16.jpg written [{method}]")


# ── face_20, face_21, face_23: use portrait PNG photos ──────────────────────
# These 3 drivers have no real WhatsApp photos; use proper portrait PNGs.
png_fixes = [
    ('face_20.jpg', 'drivers/imtiyaz.png'),   # Zulfkar ali bhat
    ('face_21.jpg', 'drivers/tariq.png'),      # Sajaad ali bhat
    ('face_23.jpg', 'drivers/bilal.png'),      # Ali abass
]

for out_name, src in png_fixes:
    img = cv2.imread(src)
    if img is None:
        print(f"  Could not read {src}, skipping {out_name}")
        continue
    # These PNGs are already portrait-style; use face detection first
    face = try_detect_face(img)
    if face is not None:
        sq = face_crop_to_square(img, face, pad_x=0.45, pad_y=0.55)
        method = 'face-detect'
    else:
        # Center crop the upper portion where face always is
        sq = region_crop_to_square(img, 0.15, 0.02, 0.85, 0.70)
        method = 'center-crop'
    cv2.imwrite(os.path.join(output_dir, out_name), sq)
    print(f"{out_name} written from {src} [{method}]")

print("\nAll fixes applied.")
