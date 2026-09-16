import re

with open('src/components/Vid4Detail.tsx', 'r', encoding='utf-8') as f:
    vid4 = f.read()

# Extract inner content of vid4
inner_vid4 = re.search(r'<div className="space-y-6">(.*)</div>\s*\);\s*}', vid4, re.DOTALL)
vid4_content = ""
if inner_vid4:
    vid4_content = inner_vid4.group(1)

with open('src/components/Vid1Detail.tsx', 'r', encoding='utf-8') as f:
    vid1 = f.read()

poster_code = """
      {/* CyberpunkGO Content */}
      <div className="space-y-8 pt-12 border-t border-white/10 mt-12">
        <div className="flex items-center justify-center mb-8">
            <h2 className="text-xl md:text-2xl uppercase tracking-widest font-bold text-white">
              《CyberpunkGO》
            </h2>
        </div>
%s
      </div>

      {/* Poster Design Showcase */}
      <div className="space-y-8 pt-6">
          <div className="flex items-center gap-2.5 border-b border-white/5 pb-2.5">
            <span className="w-2 h-2 rounded-full bg-sky-300" />
            <h2 className="text-sm md:text-base uppercase tracking-[0.2em] font-bold text-zinc-200">
              {t("海报设计展示 / POSTER DESIGN SHOWCASE", "POSTER DESIGN SHOWCASE")}
            </h2>
          </div>
          <div className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-none border border-white/5" onClick={() => setLightboxState({images: ["/images/20260917011519795.webp"], index: 0})}>
            <img src="/images/20260917011519795.webp" alt="Poster Design" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
            <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
              {t("点击查看大图", "Click to Zoom")}
            </div>
          </div>
      </div>
""" % (vid4_content)

# Insert before the last </div>
vid1 = re.sub(r'(.*)(    </div>\s*</>\s*\);\s*})', r'\1' + poster_code + r'\2', vid1, flags=re.DOTALL)
vid1 = re.sub(r'(.*)(    </div>\s*\);\s*})', r'\1' + poster_code + r'\2', vid1, flags=re.DOTALL)


with open('src/components/Vid1Detail.tsx', 'w', encoding='utf-8') as f:
    f.write(vid1)

