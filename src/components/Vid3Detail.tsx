import React from 'react';

export function Vid3Detail({ selectedProject, language, t, setLightboxState }: any) {
  return (
    <div className="space-y-6">
        <div className="flex items-center gap-2.5 border-b border-white/5 pb-2.5">
          <span className="w-2 h-2 rounded-full bg-sky-300" />
          <h2 className="text-sm md:text-base uppercase tracking-[0.2em] font-bold text-zinc-200">
            {t("自媒体收获 / MEDIA ACHIEVEMENTS", "MEDIA ACHIEVEMENTS")}
          </h2>
        </div>
        <div className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-xl border border-white/5" onClick={() => setLightboxState({ images: ["/images/20260623003847949.webp"], index: 0 })}>
            <img src="/images/20260623003847949.webp" alt="Media Achievements" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
            <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
              {t("点击查看大图", "Click to Zoom")}
            </div>
        </div>
        <div className="text-center text-zinc-400 text-sm mt-3 tracking-widest font-light">
          {t("B站10w+播放", "100k+ Views on Bilibili")}
        </div>
    </div>
  );
}
