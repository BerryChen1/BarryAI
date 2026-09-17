import os

replacements = {
    # 王者荣耀合作曲《墨染·天下》
    '/images/20260917011456973.webp': 'https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260918002937353.webp',
    # 《The Last》
    '/images/20260917011519795.webp': 'https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260918002956161.webp',
    # 《超时空决战！英灵殿》
    '/images/20260917011541513.webp': 'https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260918003015260.webp',
    # 《重返地球：42号远航队》
    '/images/20260917011556621.webp': 'https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260918003027318.webp',
    # 《明天的前夜》
    '/images/20260917011636449.webp': 'https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260918003043807.webp',
    # 《MVLAND 致命节奏》
    '/images/20260917011342760.webp': 'https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260918003057078.webp',
    # 《聊斋·罗刹梦回》
    '/images/20260917011811080.webp': 'https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260918003111117.webp',
    # 《信》
    '/images/20260912020349612.webp': 'https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260918003136030.webp',
    # 《迷城》
    '/images/20260912020441476.webp': 'https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260918003152866.webp',
}

for root, _, files in os.walk('src/components'):
    for file in files:
        if file.endswith('.tsx'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content
            for old, new in replacements.items():
                new_content = new_content.replace(old, new)
                
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {filepath}")
