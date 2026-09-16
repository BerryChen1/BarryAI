import re

files_and_images = {
    'src/components/Vid14Detail.tsx': '/images/20260917011456973.webp',
    'src/components/Vid13Detail.tsx': '/images/20260917011541513.webp',
    'src/components/Vid5Detail.tsx': '/images/20260917011556621.webp',
    'src/components/Vid2Detail.tsx': '/images/20260917011342760.webp',
    'src/components/Vid11Detail.tsx': '/images/20260917011811080.webp'
}

for filepath, image_url in files_and_images.items():
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    poster_code = """
      {/* Poster Design Showcase */}
      <div className="space-y-8 pt-6">
          <div className="flex items-center gap-2.5 border-b border-white/5 pb-2.5">
            <span className="w-2 h-2 rounded-full bg-sky-300" />
            <h2 className="text-sm md:text-base uppercase tracking-[0.2em] font-bold text-zinc-200">
              {t("海报设计展示 / POSTER DESIGN SHOWCASE", "POSTER DESIGN SHOWCASE")}
            </h2>
          </div>
          <div className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-none border border-white/5" onClick={() => setLightboxState({images: ["%s"], index: 0})}>
            <img src="%s" alt="Poster Design" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
            <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
              {t("点击查看大图", "Click to Zoom")}
            </div>
          </div>
      </div>
""" % (image_url, image_url)

    # Insert before the last </div>
    # Using regex to find the last </div> that precedes </>, or just </div> at the end.
    
    parts = content.rsplit('</div>', 1)
    if len(parts) == 2:
        # Check if there is a closing tag for fragment or something else
        new_content = parts[0] + poster_code + '    </div>' + parts[1]
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
    else:
        print(f"Failed to find </div> in {filepath}")

