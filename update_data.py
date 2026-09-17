import re

with open('src/data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update covers
replacements = {
    # 王者荣耀合作曲《墨染·天下》
    '"/images/20260917011456973.webp"': '"https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260918002937353.webp"',
    # 《The Last》
    '"/images/20260917011519795.webp"': '"https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260918002956161.webp"',
    # 《超时空决战！英灵殿》
    '"/images/20260917011541513.webp"': '"https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260918003015260.webp"',
    # 《重返地球：42号远航队》
    '"/images/20260917011556621.webp"': '"https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260918003027318.webp"',
    # 《明天的前夜》
    '"/images/20260917011636449.webp"': '"https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260918003043807.webp"',
    # 《MVLAND 致命节奏》
    '"/images/20260917011342760.webp"': '"https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260918003057078.webp"',
    # 《聊斋·罗刹梦回》
    '"/images/20260917011811080.webp"': '"https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260918003111117.webp"',
    # 《信》
    '"/images/20260912020349612.webp"': '"https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260918003136030.webp"',
    # 《迷城》
    '"/images/20260912020441476.webp"': '"https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260918003152866.webp"',
}

for old, new in replacements.items():
    content = content.replace(old, new)

# 2. Extract vid-12
vid12_pattern = re.compile(r'\s*\{\s*id:\s*"vid-12".*?videoUrl:[^\}]+\}', re.DOTALL)
vid12_match = vid12_pattern.search(content)
if vid12_match:
    vid12_str = vid12_match.group(0)
    content = content.replace(vid12_str, '')

# 3. Remove vid-8 and vid-9
vid89_pattern = re.compile(r'\s*\{\s*id:\s*"vid-[89]".*?videoUrl:[^\}]+\}', re.DOTALL)
content = vid89_pattern.sub('', content)

# 4. Remove comma after the last item before vid-12 was extracted if any issues? Wait, vid-12 was the last item.
# It might leave a trailing comma or miss one. The list ends with `\n    ]\n  },\n  {`
# Let's clean up empty items or double commas.
content = re.sub(r',\s*,', ',', content)
content = re.sub(r'\{\s*id:\s*"vid-12"[^\}]+\}\s*,?\s*', '', content) # Just in case

# Insert vid12 before vid-7
if vid12_match:
    vid7_pattern = re.compile(r'(\s*\{\s*id:\s*"vid-7")')
    content = vid7_pattern.sub(vid12_str + ',' + r'\1', content)

# Clean up trailing comma before closing bracket
content = re.sub(r',\s*\]', '\n    ]', content)

with open('src/data.ts', 'w', encoding='utf-8') as f:
    f.write(content)

