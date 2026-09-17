with open('src/App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

target = """                        {selectedProject.id === "vid-11" || selectedProject.id === "vid-12" || selectedProject.id === "vid-13" ? (
                          <div className="flex flex-col gap-6 w-full mb-16">
                            <CustomVideoPlayer src={
                              selectedProject.id === "vid-11" 
                                ? "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/liaozhai%EF%BC%881%EF%BC%89.mp4" 
                                : selectedProject.id === "vid-13"
                                ? "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/sanguo%EF%BC%881%EF%BC%89.mp4"
                                : "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/wuxia%EF%BC%881%EF%BC%89.mp4"
                            } language={language} />
                            <CustomVideoPlayer src={
                              selectedProject.id === "vid-11" 
                                ? "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/liaozhai%EF%BC%882%EF%BC%89.mp4" 
                                : selectedProject.id === "vid-13"
                                ? "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/sanguo%EF%BC%882%EF%BC%89.mp4"
                                : "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/wuxia%EF%BC%882%EF%BC%89.mp4"
                            } language={language} />
                          </div>
                        ) : ("""

replacement = """                        {selectedProject.id === "vid-11" ? (
                          <div className="flex flex-col gap-6 w-full mb-16">
                            <CustomVideoPlayer src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/hainan.mp4" language={language} />
                            <CustomVideoPlayer src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/liaozhai%EF%BC%881%EF%BC%89.mp4" language={language} />
                            <CustomVideoPlayer src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/liaozhai%EF%BC%882%EF%BC%89.mp4" language={language} />
                          </div>
                        ) : selectedProject.id === "vid-12" ? (
                          <div className="flex flex-col gap-6 w-full mb-16">
                            <CustomVideoPlayer src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/wuxia%EF%BC%881%EF%BC%89.mp4" language={language} />
                            <CustomVideoPlayer src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/wuxia%EF%BC%882%EF%BC%89.mp4" language={language} />
                          </div>
                        ) : ("""

if target in content:
    content = content.replace(target, replacement)
    with open('src/App.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("App.tsx patched successfully.")
else:
    print("Could not find target in App.tsx")

