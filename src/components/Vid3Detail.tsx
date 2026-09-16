import React from 'react';
import { CustomVideoPlayer } from './CustomVideoPlayer';

export function Vid3Detail({ selectedProject, language, t, setLightboxState }: any) {
  return (
    <div className="space-y-6">
      <CustomVideoPlayer src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/three.mp4" language={language} />

      <div className="space-y-4">
        <div className="pl-5 border-l-3 border-sky-400/80 italic text-zinc-250 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed py-2.5 bg-sky-400/[0.02]">
          “你会温和的走入那一夜吗?”
        </div>
        <div className="space-y-4 text-zinc-350 text-sm sm:text-base md:text-lg lg:text-lg leading-[1.85] font-sans font-light text-justify">
          <p className="tracking-wide">冷调压抑的房间中，女孩的平静被录音机传来的诡异声响击碎。她循声踏入幽暗无尽的长廊，一件件残破旧物接连浮现，录音里双胞胎的情感纠葛之下，暗涌着一场关于自我分裂与拉扯的精神迷局，长廊尽头的门后，藏着自我认同的终极真相。</p>
          <p className="tracking-wide">本片为个人独立全流程创作的AI动画短片，以黑塞的文字开启叙事，通过镜面构图、极速倒放蒙太奇等视听手法营造压抑诡谲的超现实质感。影片选用Seedance 2.0、Kling与 NanoBanana Pro 模型制作，借悬疑化的影像叙事，深入探讨自我认同的深层精神内核。</p>
        </div>
      </div>

      <div className="space-y-8 pt-6">
          <div className="flex items-center gap-2.5 border-b border-white/5 pb-2.5">
            <span className="w-2 h-2 rounded-full bg-sky-300" />
            <h2 className="text-sm md:text-base uppercase tracking-[0.2em] font-bold text-zinc-200">
              {t("工作流拆解 / WORKFLOW BREAKDOWN", "WORKFLOW BREAKDOWN")}
            </h2>
          </div>

          <div className="flex flex-col gap-6 w-full">
            {[
              "/images/20260623003924128.webp",
              "/images/20260623003934322.webp",
              "/images/20260623003945977.webp"
            ].map((imgUrl, gIdx, arr) => (
              <div key={gIdx} className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-none border border-white/5" onClick={() => setLightboxState({images: arr, index: gIdx})}>
                <img loading="lazy" decoding="async" src={imgUrl} alt="Workflow Breakdown" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
                  {t("点击查看大图", "Click to Zoom")}
                </div>
              </div>
            ))}
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
          <div className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-none border border-white/5" onClick={() => setLightboxState({images: ["/images/20260917011636449.webp"], index: 0})}>
            <img loading="lazy" decoding="async" src="/images/20260917011636449.webp" alt="Poster Design" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
            <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
              {t("点击查看大图", "Click to Zoom")}
            </div>
          </div>
      </div>
    </div>
  );
}
