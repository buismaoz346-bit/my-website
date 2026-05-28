from PIL import Image
path = r"C:\Users\SYED MAOZ ARIF\Downloads\Portfolio\Picture\Best project.jpeg"
try:
    img = Image.open(path)
    img_rotated = img.rotate(180, expand=True)
    img_rotated.save(path)
    print("Success 180")
except Exception as e:
    print(f"Error: {e}")
