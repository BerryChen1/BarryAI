import React from 'react';
import { CustomVideoPlayer } from './CustomVideoPlayer';

export function Vid11Detail({ selectedProject, language, t, setLightboxState }: any) {
  return (
    <div className="space-y-8 -mt-4 md:-mt-6">
      <div className="space-y-6">
        <div className="flex items-center gap-2.5 border-b border-white/5 pb-2.5">
          <span className="w-2 h-2 rounded-full bg-sky-300" />
          <h2 className="text-sm md:text-base uppercase tracking-[0.2em] font-bold text-zinc-200">
            {t("美术资产 / ART ASSETS", "ART ASSETS")}
          </h2>
        </div>

        {/* Row 1: 2 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {[
            "/images/20260623005816069.webp",
            "/images/20260623005827860.webp"
          ].map((imgUrl, idx) => {
            const arr = [
              "/images/20260623005816069.webp",
              "/images/20260623005827860.webp",
              "/images/20260623005841087.webp",
              "/images/20260623005852169.webp",
              "/images/20260623005906818.webp"
            ];
            return (
              <div key={`vid-11-r1-${idx}`} className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full aspect-video rounded-none border border-white/5" onClick={() => setLightboxState({images: arr, index: idx})}>
                <img loading="lazy" decoding="async" src={imgUrl} alt="Character & Scene Asset" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
                  {t("点击查看大图", "Click to Zoom")}
                </div>
              </div>
            );
          })}
        </div>

        {/* Row 2: 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
          {[
            "/images/20260623005841087.webp",
            "/images/20260623005852169.webp",
            "/images/20260623005906818.webp"
          ].map((imgUrl, idx) => {
            const arr = [
              "/images/20260623005816069.webp",
              "/images/20260623005827860.webp",
              "/images/20260623005841087.webp",
              "/images/20260623005852169.webp",
              "/images/20260623005906818.webp"
            ];
            return (
              <div key={`vid-11-r2-${idx}`} className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full aspect-video rounded-none border border-white/5" onClick={() => setLightboxState({images: arr, index: 2 + idx})}>
                <img loading="lazy" decoding="async" src={imgUrl} alt="Character & Scene Asset" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
                  {t("点击查看大图", "Click to Zoom")}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    
      {/* Poster Design Showcase */}
      <div className="space-y-8 pt-6">
          <div className="flex items-center gap-2.5 border-b border-white/5 pb-2.5">
            <span className="w-2 h-2 rounded-full bg-sky-300" />
            <h2 className="text-sm md:text-base uppercase tracking-[0.2em] font-bold text-zinc-200">
              {t("海报设计展示 / POSTER DESIGN SHOWCASE", "POSTER DESIGN SHOWCASE")}
            </h2>
          </div>
          <div className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-none border border-white/5" onClick={() => setLightboxState({images: ["/images/20260917011811080.webp"], index: 0})}>
            <img loading="lazy" decoding="async" src="/images/20260917011811080.webp" alt="Poster Design" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
            <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
              {t("点击查看大图", "Click to Zoom")}
            </div>
          </div>
      </div>
    </div>
  );
}
