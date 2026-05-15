import os
import glob
import re
import shutil

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

for i, img_path in enumerate(images):
    # Just copy and rename
    out_path = os.path.join(output_dir, f'driver_{i+1:02d}.jpeg')
    shutil.copy(img_path, out_path)
    print(f"Copied {img_path} to {out_path}")
