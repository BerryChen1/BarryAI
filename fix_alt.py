import re

with open('src/App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace <img without alt in App.tsx
def add_alt(match):
    img = match.group(0)
    if 'alt=' not in img:
        return img.replace('<img ', '<img alt="Portfolio Work" ')
    return img

content = re.sub(r'<img\s+[^>]*>', add_alt, content)

with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

