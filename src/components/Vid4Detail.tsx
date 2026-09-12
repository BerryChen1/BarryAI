import React from 'react';
import { CustomVideoPlayer } from './CustomVideoPlayer';

export function Vid4Detail({ selectedProject, language, t, setLightboxState }: any) {
  return (
    <div className="space-y-6">
      <CustomVideoPlayer src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/four%EF%BC%882%EF%BC%89.mp4" language={language} />
      <div className="space-y-4">
        <div className="pl-5 border-l-3 border-sky-400/80 italic text-zinc-250 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed py-2.5 bg-sky-400/[0.02]">
          “报告！发现赛博精神病！”
        </div>
        <div className="space-y-4 text-zinc-350 text-sm sm:text-base md:text-lg lg:text-lg leading-[1.85] font-sans font-light text-justify">
          <p className="tracking-wide">雨幕笼罩的街巷暗流涌动，过度义体改造催生的赛博精神病潜藏在城市暗角。猎手穿行于霓虹路口与潮湿巷道，在人性与机械的边界展开追缉，每一次生死交锋，都是对夜之城秩序与底线的叩问。</p>
          <p className="tracking-wide">短片选用 Seedance 2.0、Midjourney 与 NanoBanana Pro 模型制作，以浓烈的色彩笔触渲染追缉行动的紧张氛围，通过独处沉思与街巷穿行的画面切换，刻画出赛博世界里猎手的生存状态与使命。</p>
        </div>
      </div>

      {/* Visual Scene Assets */}
      <div className="space-y-8 pt-6">
          <div className="flex items-center gap-2.5 border-b border-white/5 pb-2.5">
            <span className="w-2 h-2 rounded-full bg-sky-300" />
            <h2 className="text-sm md:text-base uppercase tracking-[0.2em] font-bold text-zinc-200">
              {t("视觉场景资产 / VISUAL SCENE ASSETS", "VISUAL SCENE ASSETS")}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              "/images/20260623004032798.webp",
              "/images/20260623004044178.webp",
              "/images/20260623004055288.webp"
            ].map((imgUrl, gIdx, arr) => (
              <div key={gIdx} className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full aspect-video rounded-2xl border border-white/5" onClick={() => setLightboxState({images: arr, index: gIdx})}>
                <img src={imgUrl} alt="Visual Scene Asset" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
                  {t("点击查看大图", "Click to Zoom")}
                </div>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
}
