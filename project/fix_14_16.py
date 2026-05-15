import cv2
import os

output_dir = 'uploads/drivers'


def region_crop_square(img, x1p, y1p, x2p, y2p):
    """Crop a % region, take center square, resize to 400x400."""
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


# face_14: driver_15.jpeg — person on LEFT wearing purple jacket, face upper-left
img15 = cv2.imread(os.path.join(output_dir, 'driver_15.jpeg'))
print(f"driver_15.jpeg size: {img15.shape[1]}x{img15.shape[0]}")
# Face is in left 45%, top 30% of image
sq = region_crop_square(img15, 0.02, 0.01, 0.47, 0.32)
cv2.imwrite(os.path.join(output_dir, 'face_14.jpg'), sq)
print("face_14.jpg written [manual crop left 45%, top 32%]")


# face_16: driver_17.jpeg — person on RIGHT wearing dark jacket, face upper-right
img17 = cv2.imread(os.path.join(output_dir, 'driver_17.jpeg'))
print(f"driver_17.jpeg size: {img17.shape[1]}x{img17.shape[0]}")
# Face is in right 50%, top 32% of image
sq = region_crop_square(img17, 0.44, 0.05, 0.92, 0.34)
cv2.imwrite(os.path.join(output_dir, 'face_16.jpg'), sq)
print("face_16.jpg written [manual crop right 50%, top 32%]")

print("Done.")
