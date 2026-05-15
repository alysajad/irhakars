import cv2

img = cv2.imread('uploads/drivers/driver_15.jpeg')
h, w = img.shape[:2]
print(f"Image: {w}x{h}")

# Person visible at x=192-576px (20-60%), y=320-704px (25-55%)
# Face is in the upper part of that region
# Tighter crop around face:
x1 = int(w * 0.22)   # 211px
y1 = int(h * 0.24)   # 307px
x2 = int(w * 0.56)   # 537px
y2 = int(h * 0.46)   # 589px

crop = img[y1:y2, x1:x2]
ch, cw = crop.shape[:2]
size = min(ch, cw)
cy, cx = ch // 2, cw // 2
half = size // 2
sq = crop[max(0, cy - half):cy + half, max(0, cx - half):cx + half]
out = cv2.resize(sq, (400, 400))
cv2.imwrite('uploads/drivers/face_14.jpg', out)
print(f"face_14.jpg written: crop x={x1}-{x2}, y={y1}-{y2}")
