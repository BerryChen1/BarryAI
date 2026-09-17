import os
import re

old_image = "/images/20260918003111117.webp"
new_image = "/images/20260917011811080.webp"

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith(('.tsx', '.ts')):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if old_image in content:
                new_content = content.replace(old_image, new_image)
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {filepath}")
