import cv2
import os

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

input_dir = 'uploads/drivers'
output_dir = 'uploads/drivers'

results = []

for i in range(1, 20):
    img_path = os.path.join(input_dir, f'driver_{i:02d}.jpeg')
    if not os.path.exists(img_path):
        print(f"Missing: driver_{i:02d}.jpeg")
        continue

    img = cv2.imread(img_path)
    if img is None:
        print(f"Could not read: driver_{i:02d}.jpeg")
        continue

    h, w = img.shape[:2]
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    face = None

    # Pass 1: strict — catches clear front-facing faces
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=8, minSize=(80, 80))
    if len(faces) > 0:
        face = max(faces, key=lambda x: x[2] * x[3])

    # Pass 2: looser — for slightly angled/smaller faces
    if face is None:
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(60, 60))
        if len(faces) > 0:
            face = max(faces, key=lambda x: x[2] * x[3])

    if face is not None:
        x, y, fw, fh = face
        pad_x = int(fw * 0.45)
        pad_y = int(fh * 0.55)
        x1 = max(0, x - pad_x)
        y1 = max(0, y - pad_y)
        x2 = min(w, x + fw + pad_x)
        y2 = min(h, y + fh + pad_y)
        crop = img[y1:y2, x1:x2]
        method = 'face-detect'
    else:
        # Fallback: top 38% of image — face is always in upper half for these standing shots
        crop = img[0:int(h * 0.38), 0:w]
        method = 'top-crop'

    # Make square from centre of crop
    ch, cw = crop.shape[:2]
    size = min(ch, cw)
    cy, cx = ch // 2, cw // 2
    half = size // 2
    square = crop[max(0, cy - half):cy + half, max(0, cx - half):cx + half]

    out_name = f'face_{(i - 1):02d}.jpg'
    out_path = os.path.join(output_dir, out_name)
    cv2.imwrite(out_path, cv2.resize(square, (400, 400)))
    results.append((i, out_name, method))
    print(f"driver_{i:02d}.jpeg -> {out_name}  [{method}]")

print(f"\nDone. {len(results)} faces written.")
