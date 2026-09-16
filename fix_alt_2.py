import os
import re

def add_alt(match):
    img = match.group(0)
    if 'alt=' not in img:
        return img.replace('<img ', '<img alt="Portfolio Design Work" ')
    return img

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith(('.tsx', '.ts')) and file != 'App.tsx':
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = re.sub(r'<img\s+[^>]*>', add_alt, content)
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Fixed alt tags in {filepath}")
