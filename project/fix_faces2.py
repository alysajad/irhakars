import cv2
import os

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
profile_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_profileface.xml')

input_dir = 'uploads/drivers'
output_dir = 'uploads/drivers'

def detect_best_face(img):
    """Try multiple strategies to find a face, return (x,y,w,h) or None."""
    h, w = img.shape[:2]
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    for neighbors in [8, 5, 3]:
        for min_sz in [80, 60, 40]:
            faces = face_cascade.detectMultiScale(gray, 1.1, neighbors, minSize=(min_sz, min_sz))
            if len(faces) > 0:
                return max(faces, key=lambda f: f[2]*f[3])

    # Try profile cascade
    for neighbors in [5, 3]:
        faces = profile_cascade.detectMultiScale(gray, 1.1, neighbors, minSize=(60, 60))
        if len(faces) > 0:
            return max(faces, key=lambda f: f[2]*f[3])

    return None

def crop_face_region(img, face, padding_scale=(0.45, 0.55)):
    h, w = img.shape[:2]
    x, y, fw, fh = face
    px = int(fw * padding_scale[0])
    py = int(fh * padding_scale[1])
    x1, y1 = max(0, x - px), max(0, y - py)
    x2, y2 = min(w, x + fw + px), min(h, y + fh + py)
    crop = img[y1:y2, x1:x2]
    ch, cw = crop.shape[:2]
    size = min(ch, cw)
    cy, cx = ch // 2, cw // 2
    half = size // 2
    return crop[max(0, cy-half):cy+half, max(0, cx-half):cx+half]

def smart_person_crop(img, side='right'):
    """Crop the half where the person is standing, then take upper face region."""
    h, w = img.shape[:2]
    if side == 'right':
        region = img[int(h*0.25):int(h*0.65), int(w*0.55):w]
    else:  # left
        region = img[int(h*0.20):int(h*0.60), 0:int(w*0.40)]
    rh, rw = region.shape[:2]
    size = min(rh, rw)
    return region[0:size, 0:size]

# driver_18 -> face_17: person on RIGHT side of frame
img18 = cv2.imread(os.path.join(input_dir, 'driver_18.jpeg'))
face = detect_best_face(img18)
if face is not None:
    square = crop_face_region(img18, face)
    method = 'face-detect'
else:
    square = smart_person_crop(img18, side='right')
    method = 'smart-right-crop'
cv2.imwrite(os.path.join(output_dir, 'face_17.jpg'), cv2.resize(square, (400, 400)))
print(f"driver_18 -> face_17.jpg [{method}]")

# driver_19 -> face_18: person on LEFT side of frame
img19 = cv2.imread(os.path.join(input_dir, 'driver_19.jpeg'))
face = detect_best_face(img19)
if face is not None:
    square = crop_face_region(img19, face)
    method = 'face-detect'
else:
    square = smart_person_crop(img19, side='left')
    method = 'smart-left-crop'
cv2.imwrite(os.path.join(output_dir, 'face_18.jpg'), cv2.resize(square, (400, 400)))
print(f"driver_19 -> face_18.jpg [{method}]")

print("Done.")
