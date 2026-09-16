import re

with open('src/data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract vid-11
pattern_vid11 = r'(\{\s*id:\s*"vid-11"[\s\S]*?videoUrl:[^\n]*\n\s*\},?\n?)'
match_vid11 = re.search(pattern_vid11, content)
if match_vid11:
    vid11_str = match_vid11.group(1)
    content = content.replace(vid11_str, '')
    # Find vid-6 and insert vid11 before it
    pattern_vid6 = r'(\{\s*id:\s*"vid-6")'
    content = re.sub(pattern_vid6, vid11_str + r'\1', content)

with open('src/data.ts', 'w', encoding='utf-8') as f:
    f.write(content)

