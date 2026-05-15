import cv2
import os
import glob
import re

# Haarcascade for face detection
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# Directory with images
image_dir = 'drivers'
output_dir = 'uploads/drivers'

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Find all WhatsApp images
images = glob.glob(os.path.join(image_dir, 'WhatsApp*.jpeg'))

def sort_key(filepath):
    filename = os.path.basename(filepath)
    # Extract "30" or "31" for seconds, and the "(num)" if it exists
    m = re.search(r'(\d+)\sPM\s*(?:\((\d+)\))?', filename)
    if m:
        sec = int(m.group(1))
        num = int(m.group(2)) if m.group(2) else 0
        return (sec, num)
    return (0, 0)

images.sort(key=sort_key)

face_count = 0

for img_path in images:
    img = cv2.imread(img_path)
    if img is None:
        continue
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.1, 4)
    
    # If faces found, pick the largest one
    if len(faces) > 0:
        faces = sorted(faces, key=lambda x: x[2]*x[3], reverse=True)
        # We might have multiple faces, the user list has 25 names, and we have 19 images.
        # Let's save all detected faces from left to right? Or just the largest?
        # Let's see if the total faces across 19 images is exactly 25.
        # For now, let's just sort faces left to right to be safe.
        faces_left_to_right = sorted(faces, key=lambda x: x[0])
        for (x, y, w, h) in faces_left_to_right:
            # Add padding
            padding = int(w * 0.3)
            x1 = max(0, x - padding)
            y1 = max(0, y - int(padding * 1.5))
            x2 = min(img.shape[1], x + w + padding)
            y2 = min(img.shape[0], y + h + padding)
            
            face_img = img[y1:y2, x1:x2]
            
            # Make it square
            fh, fw = face_img.shape[:2]
            size = min(fh, fw)
            cy, cx = fh // 2, fw // 2
            square_face = face_img[cy - size//2 : cy + size//2, cx - size//2 : cx + size//2]
            
            resized = cv2.resize(square_face, (400, 400))
            out_path = os.path.join(output_dir, f'face_{face_count:02d}.jpg')
            cv2.imwrite(out_path, resized)
            face_count += 1
            print(f"Detected face {face_count} in {img_path}")
    else:
        # Fallback to center square crop
        h, w = img.shape[:2]
        size = min(h, w)
        cy, cx = h // 2, w // 2
        square = img[cy - size//2 : cy + size//2, cx - size//2 : cx + size//2]
        resized = cv2.resize(square, (400, 400))
        out_path = os.path.join(output_dir, f'face_{face_count:02d}.jpg')
        cv2.imwrite(out_path, resized)
        face_count += 1
        print(f"No face detected in {img_path}, using center crop as face {face_count}")

print(f"Total faces processed: {face_count}")
