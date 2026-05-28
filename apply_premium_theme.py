import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Replace :root
old_root = """
:root {
    --primary: #2563eb;
    --primary-light: #3b82f6;
    --primary-glow: rgba(37, 99, 235, 0.4);
    --secondary: #0f172a;
    --bg-color: #f8fafc;
    --bg-glass: rgba(255, 255, 255, 0.65);
    --text-main: #334155;
    --text-muted: #64748b;
    --border-color: rgba(226, 232, 240, 0.8);
    --border-glow: rgba(37, 99, 235, 0.3);
"""

new_root = """
:root {
    --primary: #64ffda;
    --primary-light: #80ffe1;
    --primary-glow: rgba(100, 255, 218, 0.4);
    --secondary: #0a192f;
    --secondary-light: #112240;
    --secondary-lightest: #233554;
    --accent: #ffd700;
    --bg-color: #0a192f;
    --bg-glass: rgba(17, 34, 64, 0.7);
    --text-main: #ccd6f6;
    --text-muted: #8892b0;
    --border-color: rgba(100, 255, 218, 0.15);
    --border-glow: rgba(100, 255, 218, 0.3);
"""
css = css.replace(old_root.strip(), new_root.strip())

# Replace body background and gradient
old_body = """
body {
    font-family: 'Inter', sans-serif;
    color: var(--text-main);
    background: linear-gradient(-45deg, #f8fafc, #e2e8f0, #f1f5f9, #f8fafc);background-size: 400% 400%;
    animation: gradientBG 15s ease infinite;
    line-height: 1.6;
    overflow-x: hidden;
}
"""

new_body = """
body {
    font-family: 'Inter', sans-serif;
    color: var(--text-main);
    background-color: var(--bg-color);
    background-image: 
        linear-gradient(rgba(100, 255, 218, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(100, 255, 218, 0.03) 1px, transparent 1px);
    background-size: 30px 30px;
    background-position: center center;
    line-height: 1.6;
    overflow-x: hidden;
}
"""
css = css.replace(old_body.strip(), new_body.strip())

# Replace headings color
css = css.replace("color: var(--secondary);", "color: var(--text-main);")

# Update glass panel shadow and borders
css = css.replace("background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%);",
                  "background: linear-gradient(to right, rgba(100, 255, 218, 0) 0%, rgba(100, 255, 218, 0.1) 50%, rgba(100, 255, 218, 0) 100%);")

# Increase padding for sections to 120px
css = re.sub(r'padding: 5rem 0;', 'padding: 120px 0;', css)

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("CSS updated successfully.")
