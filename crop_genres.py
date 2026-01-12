from PIL import Image
import os

# Path to the uploaded image
input_path = r"C:/Users/81906/.gemini/antigravity/brain/cd9b5029-d73c-4c84-9bf6-053473dad056/uploaded_image_1768229192244.png"
output_dir = r"c:/Users/81906/ネットミーム図鑑/general-election-mvp/public/polls"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Open the image
img = Image.open(input_path)
width, height = img.size

# The image has 4 columns and 2 rows
# There are margins and paddings. Let's estimate them.
# Total width: 1024 (likely), height: 680 (likely)
# Actually, let's just use the image size and divide.

cols = 4
rows = 2

# Based on the image structure:
# Boxes are roughly 220x220 with margins.
# Let's try more precise cropping.
# The white background is prominent.

# For now, let's just divide the image into 8 chunks and see.
# A better way is to define exact boxes if possible.
# By looking at the image:
# Row 1 start: ~30px, Col 1 start: ~30px
# Box size: ~220px
# Horizontal gap: ~20px
# Vertical gap: ~40px

box_w = width // 4
box_h = height // 2

genres = [
    "genre-food", "genre-daily", "genre-values", "genre-ent",
    "genre-work", "genre-tech", "genre-rel", "genre-ultimate"
]

# Manual adjustment based on visual inspection:
# The grid is roughly:
# Top: 30px to 310px (h=280)
# Bottom: 350px to 630px (h=280)
# Col 1: 30px to 250px (w=220)
# Col 2: 270px to 490px (w=220) ...

# Let's just use 4x2 grid with some inner padding.
for r in range(rows):
    for c in range(cols):
        left = c * box_w
        top = r * box_h
        right = (c + 1) * box_w
        bottom = (r + 1) * box_h
        
        # Crop each box
        box = img.crop((left, top, right, bottom))
        
        # Trim white borders if we could, but let's just save for now.
        name = genres[r * cols + c]
        box.save(os.path.join(output_dir, f"{name}.png"))
        print(f"Saved {name}.png")
