import React from 'react';

export function Vid2Detail({ selectedProject, language, t, setLightboxState }: any) {
  return (
    <>
      <div className="space-y-6 -mt-4 md:-mt-6">
          <div className="flex items-center gap-2.5 border-b border-white/5 pb-2.5">
            <span className="w-2 h-2 rounded-full bg-sky-300" />
            <h2 className="text-sm md:text-base uppercase tracking-[0.2em] font-bold text-zinc-200">
              {t("美术资产 / ART ASSETS", "ART ASSETS")}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              "/images/20260623003528472.webp",
              "/images/20260623003541296.webp",
              "/images/20260623003553176.webp",
              "/images/20260623003608886.webp",
              "/images/20260623003620460.webp",
              "/images/20260623003632706.webp"
            ].map((imgUrl, gIdx, arr) => (
              <div key={gIdx} className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full aspect-video rounded-none border border-white/5" onClick={() => setLightboxState({images: arr, index: gIdx})}>
                <img loading="lazy" decoding="async" src={imgUrl} alt="Character & Scene Asset" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
                  {t("点击查看大图", "Click to Zoom")}
                </div>
              </div>
            ))}
          </div>

          {/* Text description under Art Assets */}
          <div className="p-5 md:p-6 rounded-none bg-zinc-900/70 border border-white/10 space-y-3 mt-6 text-left">
            <h3 className="text-base sm:text-lg font-bold text-zinc-100 tracking-wide">
              AIGC 资产开发：特定 IP 风格的深度复刻与工业化输出
            </h3>
            <div className="space-y-2 text-xs sm:text-sm md:text-base text-zinc-300 font-light leading-relaxed">
              <p>
                <span className="font-semibold text-zinc-100">目标风格深度锁定：</span>
                针对项目需求，对标《无畏契约》（VALORANT）或《双生之战》（Arcane）等业界顶尖风格。深度还原其标志性的硬边缘阴影（Cel-shading with Hard Edges）、平面色块（Flat Colors）与丰富手绘纹理（Painted Textures）的 3D-to-2D 混合质感。
              </p>
              <p>
                <span className="font-semibold text-zinc-100">角色资产量产标准：</span>
                确保多角色、多皮肤在严格的 3D-to-2D 风格约束下达到可复用的资产标准。通过 ControlNet 精确控制视角与 Pose，输出符合工业流程的完整三视图。
              </p>
              <p>
                <span className="font-semibold text-zinc-100">场景概念风格化整合：</span>
                不仅复刻人物，更将特定的美术风格应用到复杂环境概念中。快速探索不同功能的室内空间（如公寓室内细节）与宏大室外场景，确保世界观视觉风格的高度统一。
              </p>
              <p>
                <span className="font-semibold text-zinc-100">商业化应用价值：</span>
                极速提升项目前期美术风格探索与定型效率。为需要特定高品质美术风格的游戏、动画 PV 或品牌虚拟形象提供可量产、可沉淀的风格资产库，极大地降低前制研发成本。
              </p>
            </div>
          </div>
      </div>

      <div className="space-y-8 pt-6">
          <div className="flex items-center gap-2.5 border-b border-white/5 pb-2.5">
            <span className="w-2 h-2 rounded-full bg-sky-300" />
            <h2 className="text-sm md:text-base uppercase tracking-[0.2em] font-bold text-zinc-200">
              {t("视觉分镜资产 / CONCEPTUAL STORYBOARDS", "CONCEPTUAL STORYBOARDS")}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              "/images/20260623003649063.webp",
              "/images/20260623003702549.webp",
              "/images/20260623003730234.webp",
              "/images/20260623003740707.webp",
              "/images/20260623003752421.webp",
              "/images/20260623003802637.webp"
            ].map((imgUrl, gIdx, arr) => (
              <div key={gIdx} className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full aspect-video rounded-none border border-white/5" onClick={() => setLightboxState({images: arr, index: gIdx})}>
                <img loading="lazy" decoding="async" src={imgUrl} alt="Conceptual Storyboards" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
                  {t("点击查看大图", "Click to Zoom")}
                </div>
              </div>
            ))}
          </div>

          {/* Text description under Storyboard Assets */}
          <div className="p-5 md:p-6 rounded-none bg-zinc-900/70 border border-white/10 space-y-3 mt-6 text-left">
            <h3 className="text-base sm:text-lg font-bold text-zinc-100 tracking-wide">
              AIGC 概念分镜：高保真风格叙事与视觉一致性预演
            </h3>
            <div className="space-y-2 text-xs sm:text-sm md:text-base text-zinc-300 font-light leading-relaxed">
              <p>
                <span className="font-semibold text-zinc-100">跨镜头风格稳定性：</span>
                在复杂的六帧叙事流程中，确保角色形象、服装细节以及环境光影在特写、中景、远景、静止与动态战斗镜头下始终保持高度统一的品牌风格。
              </p>
              <p>
                <span className="font-semibold text-zinc-100">情感表达的风格化：</span>
                将角色的复杂情感（如睡眼惺忪、惊讶、严肃、愤怒、战斗时的张力）融入到特定的美术风格中。利用 AIGC 快速尝试不同的视听语言方案，同时确保每一帧都是“完成品”级的高保真概念。
              </p>
              <p>
                <span className="font-semibold text-zinc-100">战斗演绎预演：</span>
                针对《无畏契约》这类战斗题材，快速产出符合该风格的战斗概念分镜（如最后一帧的双人对决），为动作设计、特效层级分离与后期合成提供直观的视觉参考。
              </p>
              <p>
                <span className="font-semibold text-zinc-100">商业化应用价值：</span>
                为需要高度定制化美术风格的影视级 PV、游戏预告片提案提供最具说服力的视觉样片。通过高保真的概念预演，让客户在项目初期就能确认最终的视听效果，大幅提升提案成功率。
              </p>
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
          <div className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-none border border-white/5" onClick={() => setLightboxState({images: ["/images/20260917011342760.webp"], index: 0})}>
            <img loading="lazy" decoding="async" src="/images/20260917011342760.webp" alt="Poster Design" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
            <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
              {t("点击查看大图", "Click to Zoom")}
            </div>
          </div>
      </div>
    </div>
    </>
  );
}
