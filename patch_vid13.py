with open('src/components/Vid13Detail.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

target = """        {/* Two Videos */}
        <div className="flex flex-col gap-6 w-full">
          <CustomVideoPlayer src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/yinglindian%201.mp4" language={language} aspectRatio="aspect-[21/9]" />
          <CustomVideoPlayer src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/yinglindian%202.mp4" language={language} aspectRatio="aspect-[21/9]" />
        </div>"""

replacement = """        {/* Three Videos */}
        <div className="flex flex-col gap-6 w-full">
          <CustomVideoPlayer src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/yinglindian%201.mp4" language={language} aspectRatio="aspect-[21/9]" />
          <CustomVideoPlayer src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/yinglindian%202.mp4" language={language} aspectRatio="aspect-[21/9]" />
          <CustomVideoPlayer src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/yld-jiewei.mp4" language={language} aspectRatio="aspect-[21/9]" />
        </div>"""

if target in content:
    content = content.replace(target, replacement)
    with open('src/components/Vid13Detail.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Vid13Detail.tsx patched successfully.")
else:
    print("Could not find target in Vid13Detail.tsx")
