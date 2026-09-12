import React from 'react';
import { CustomVideoPlayer } from './CustomVideoPlayer';

export function Vid5Detail({ selectedProject, language, t, setLightboxState }: any) {
  return (
    <div className="space-y-6">
      <CustomVideoPlayer src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/five%EF%BC%882%EF%BC%89.mp4" language={language} />
      <div className="space-y-4">
        <div className="pl-5 border-l-3 border-sky-400/80 italic text-zinc-250 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed py-2.5 bg-sky-400/[0.02]">
          “谁又会为太阳的西坠而感到哀伤呢？”
        </div>
        <div className="space-y-4 text-zinc-350 text-sm sm:text-base md:text-lg lg:text-lg leading-[1.85] font-sans font-light text-justify">
          <p className="tracking-wide">《重返地球：42 号远航队》第二集来到“北京”，将探索步履延伸向山野深处。瀑布垂落、荒草漫生，远航队穿行于被自然包裹的古建与旧城遗迹，在山川与人文的交融里触摸人类情感的底色，让消散的文明以记忆的方式温柔延续。</p>
          <p className="tracking-wide">本片属于散文式 AI 影片集篇目，由个人全流程独立创作完成，选用 Seedance 2.0、Kling、Midjourney 与 NanoBanana Pro 模型制作，以灵动的自然光影与氛围感镜头延展诗意叙事，在极简表达中完成对文明重生的诗意思考。</p>
        </div>
      </div>

      {/* Workflow Breakdown for vid-5 */}
      <div className="space-y-8 pt-6">
          <div className="flex items-center gap-2.5 border-b border-white/5 pb-2.5">
            <span className="w-2 h-2 rounded-full bg-sky-300" />
            <h2 className="text-sm md:text-base uppercase tracking-[0.2em] font-bold text-zinc-200">
              {t("工作流拆解 / WORKFLOW BREAKDOWN", "WORKFLOW BREAKDOWN")}
            </h2>
          </div>
          <div className="flex flex-col gap-6 w-full">
            {[
              "/images/20260623004154038.webp",
              "/images/20260623004204584.webp",
              "/images/20260623004217131.webp",
              "/images/20260623004230317.webp",
              "/images/20260623004306129.webp"
            ].map((imgUrl, gIdx, arr) => (
              <div key={gIdx} className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-xl border border-white/5" onClick={() => setLightboxState({images: arr, index: gIdx})}>
                <img src={imgUrl} alt="Workflow Breakdown" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
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
