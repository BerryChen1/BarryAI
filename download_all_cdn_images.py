import re
import os
import urllib.request

# Find all cdn.jsdelivr.net images in src
cdn_urls = set()

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith(('.ts', '.tsx')):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                matches = re.findall(r'https://cdn\.jsdelivr\.net/gh/BerryChen1/img-bed/images/[a-zA-Z0-9_\-]+\.webp', content)
                for match in matches:
                    cdn_urls.add(match)

print(f"Found {len(cdn_urls)} unique CDN URLs to download.")

os.makedirs('public/images', exist_ok=True)

# Download and replace
for url in cdn_urls:
    filename = url.split('/')[-1]
    local_path = f"public/images/{filename}"
    
    if not os.path.exists(local_path):
        print(f"Downloading {url}...")
        try:
            urllib.request.urlretrieve(url, local_path)
            print(f"Successfully downloaded {filename}")
        except Exception as e:
            print(f"Failed to download {url}: {e}")

# Now replace in files
for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith(('.ts', '.tsx')):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = re.sub(r'https://cdn\.jsdelivr\.net/gh/BerryChen1/img-bed/images/', '/images/', content)
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {filepath}")

