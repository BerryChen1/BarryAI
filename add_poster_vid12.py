with open('src/components/Vid12Detail.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

poster_code = """
      {/* Poster Design Showcase */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center gap-2.5 border-b border-white/5 pb-2.5">
          <span className="w-2 h-2 rounded-full bg-sky-300" />
          <h2 className="text-sm md:text-base uppercase tracking-[0.2em] font-bold text-zinc-200">
            {t("海报设计 / POSTER DESIGN", "POSTER DESIGN")}
          </h2>
        </div>
        <div className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-none border border-white/5" onClick={() => setLightboxState({images: ["https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260918003152866.webp"], index: 0})}>
          <img loading="lazy" decoding="async" src="https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260918003152866.webp" alt="Poster Design" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
          <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
            {t("点击查看大图", "Click to Zoom")}
          </div>
        </div>
      </div>
"""

content = content.replace('      </div>\n    </div>', '      </div>\n' + poster_code + '    </div>')

with open('src/components/Vid12Detail.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

