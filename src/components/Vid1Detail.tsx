import React from 'react';

export function Vid1Detail({ selectedProject, language, t, setLightboxState }: any) {
  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center gap-2.5 border-b border-white/5 pb-2.5">
          <span className="w-2 h-2 rounded-full bg-sky-300" />
          <h2 className="text-sm md:text-base uppercase tracking-[0.2em] font-bold text-zinc-200">
            {t("自媒体收获 / MEDIA ACHIEVEMENTS", "MEDIA ACHIEVEMENTS")}
          </h2>
        </div>
        
        {/* Card 1: Xiaohongshu */}
        <div className="space-y-3">
          <div className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-xl border border-white/5" onClick={() => setLightboxState({ images: ["/images/20260623003203649.webp"], index: 0 })}>
              <img src="/images/20260623003203649.webp" alt="Media Achievements" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
              <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
                {t("点击查看大图", "Click to Zoom")}
              </div>
          </div>
          <div className="text-center text-zinc-400 text-sm tracking-widest font-light">
            {t("入选小红书精选", "Featured on Xiaohongshu")}
          </div>
        </div>

        {/* Card 2: Xinpianchang */}
        <div className="space-y-3 pt-4 border-t border-white/5">
          <div className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-xl border border-white/5" onClick={() => setLightboxState({ images: ["/images/20260626222446052.webp"], index: 0 })}>
              <img src="/images/20260626222446052.webp" alt="Xinpianchang Achievements" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
              <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
                {t("点击查看大图", "Click to Zoom")}
              </div>
          </div>
          <div className="text-center text-zinc-400 text-sm tracking-widest font-light">
            {t("入选新片场·精选周榜 2026年第25期 TOP10", "Selected for Xinpianchang Weekly Best Chart (2026, Issue 25) TOP 10")}
          </div>
          <div className="flex justify-center pt-1">
            <a 
              href="https://www.xinpianchang.com/a13719369?from=rankWeekList" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 font-sans tracking-wider transition-colors hover:underline decoration-sky-400/30 underline-offset-4"
            >
              <span>{t("在新片场查看作品", "View on Xinpianchang")}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="space-y-6 pt-6">
        <div className="flex items-center gap-2.5 border-b border-white/5 pb-2.5">
          <span className="w-2 h-2 rounded-full bg-sky-300" />
          <h2 className="text-sm md:text-base uppercase tracking-[0.2em] font-bold text-zinc-200">
            {t("美术资产 / ART ASSETS", "ART ASSETS")}
          </h2>
        </div>

        {/* Row of 2 images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {[
            "/images/20260623003245431.webp",
            "/images/20260623003258200.webp"
          ].map((imgUrl, idx) => {
            const arr = [
              "/images/20260623003245431.webp",
              "/images/20260623003258200.webp",
              "/images/20260623003324908.webp",
              "/images/20260623003337365.webp",
              "/images/20260623003348195.webp"
            ];
            return (
              <div key={`vid-1-art-r1-${idx}`} className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full aspect-video rounded-2xl border border-white/5" onClick={() => setLightboxState({images: arr, index: idx})}>
                <img src={imgUrl} alt="Art Asset" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
                  {t("点击查看大图", "Click to Zoom")}
                </div>
              </div>
            );
          })}
        </div>

        {/* Row of 3 images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
          {[
            "/images/20260623003324908.webp",
            "/images/20260623003337365.webp",
            "/images/20260623003348195.webp"
          ].map((imgUrl, idx) => {
            const arr = [
              "/images/20260623003245431.webp",
              "/images/20260623003258200.webp",
              "/images/20260623003324908.webp",
              "/images/20260623003337365.webp",
              "/images/20260623003348195.webp"
            ];
            return (
              <div key={`vid-1-art-r2-${idx}`} className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full aspect-video rounded-2xl border border-white/5" onClick={() => setLightboxState({images: arr, index: 2 + idx})}>
                <img src={imgUrl} alt="Art Asset" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
                  {t("点击查看大图", "Click to Zoom")}
                </div>
              </div>
            );
          })}
        </div>

        {/* Text description under Art Assets */}
        <div className="p-5 md:p-6 rounded-xl bg-zinc-900/70 border border-white/10 space-y-3 text-left">
          <h3 className="text-base sm:text-lg font-bold text-zinc-100 tracking-wide">
            AIGC 视觉开发：从概念到资产的标准化输出
          </h3>
          <div className="space-y-2 text-xs sm:text-sm md:text-base text-zinc-300 font-light leading-relaxed">
            <p>
              <span className="font-semibold text-zinc-100">角色一致性控制 (Character Consistency)：</span>
              突破 AIGC 随机性痛点。通过提示词与场景画风多通道约束，实现高精度的角色三视图输出。确保角色在不同视角、服饰下的面部特征与体型比例达到工业级资产标准。
            </p>
            <p>
              <span className="font-semibold text-zinc-100">世界观视觉构建 (World-building Design)：</span>
              高效确立项目的美术基调。利用 Midjourney 配合Nano banana后期重绘，快速产出废土/赛博朋克等复杂场景的概念氛围图。将传统需数周的概念探索期压缩，为后续的分镜与 3D 资产化提供准确的视觉蓝图。
            </p>
            <p>
              <span className="font-semibold text-zinc-100">商业化应用价值：</span>
              适用于游戏前期开发、动画 PV 视觉定调以及品牌虚拟 IP 的快速孵化，大幅降低前制阶段的时间与人力试错成本。
            </p>
          </div>
        </div>

        {/* Prompt Assets Section */}
        <div className="space-y-6 pt-6">
          <div className="flex items-center gap-2.5 border-b border-white/5 pb-2.5">
            <span className="w-2 h-2 rounded-full bg-sky-300" />
            <h2 className="text-sm md:text-base uppercase tracking-[0.2em] font-bold text-zinc-200">
              {t("PROMPT 资产 / PROMPT ASSETS", "PROMPT ASSETS")}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {[
              "/images/20260623003038385.webp",
              "/images/20260623003057911.webp",
              "/images/20260623003111222.webp",
              "/images/20260623003122761.webp"
            ].map((imgUrl, idx) => {
              const arr = [
                "/images/20260623003038385.webp",
                "/images/20260623003057911.webp",
                "/images/20260623003111222.webp",
                "/images/20260623003122761.webp"
              ];
              return (
                <div key={`vid-1-prompt-${idx}`} className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full aspect-video rounded-xl border border-white/5" onClick={() => setLightboxState({images: arr, index: idx})}>
                  <img src={imgUrl} alt="Prompt Asset" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                  <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-black/60 border border-white/10 text-[8px] sm:text-[10px] text-zinc-400 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
                    {t("查看", "Zoom")}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Text description under Prompt Assets */}
          <div className="p-5 md:p-6 rounded-xl bg-zinc-900/70 border border-white/10 space-y-3 text-left">
            <h3 className="text-base sm:text-lg font-bold text-zinc-100 tracking-wide">
              提示词工程 (Prompt Engineering)：风格锁定的底层逻辑
            </h3>
            <div className="space-y-2 text-xs sm:text-sm md:text-base text-zinc-300 font-light leading-relaxed">
              <p>
                <span className="font-semibold text-zinc-100">模块化参数矩阵：</span>
                摒弃碎片化的提示词书写，建立包含“镜头语言、光影逻辑、材质细节、渲染引擎”的结构化提示词库。
              </p>
              <p>
                <span className="font-semibold text-zinc-100">跨平台参数迁移：</span>
                建立可跨工具复用的底层语法逻辑。确保无论是前期在 Midjourney中的风格探索，还是视频的精准生成，都能保持视觉风格（如 3D to 2D 赛璐璐风、电影级冷暖对比光影）的高度统一。
              </p>
              <p>
                <span className="font-semibold text-zinc-100">商业化应用价值：</span>
                形成可沉淀的团队数字资产。通过标准化的 Prompt SOP，即使是多账号矩阵或多人协作，也能保证最终视觉产出质量的标准与统一。
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 md:p-6 rounded-xl bg-zinc-900/70 border border-white/10 space-y-3 mt-6 text-left">
          <h3 className="text-base sm:text-lg font-bold text-zinc-100 tracking-wide">
            概念分镜预演 (Conceptual Storyboarding)：文本到画面的降维打击
          </h3>
          <div className="space-y-2 text-xs sm:text-sm md:text-base text-zinc-300 font-light leading-relaxed">
            <p>
              <span className="font-semibold text-zinc-100">电影级视听转译：</span>
              将剧本文字转化为具象的视觉语言。严格控制画面景别（特写、广角）、机位（俯拍仰拍）与环境光影，确保每一帧都能准确传递角色的情绪张力与剧情冲突。
            </p>
            <p>
              <span className="font-semibold text-zinc-100">动态化前置准备：</span>
              在静态生成阶段即代入后期剪辑思维。画面的构图留白、焦外景深以及特效元素的图层剥离，也可为后续导入 After Effects 或 Premiere 进行动态化（Motion Graphic）或视频生成做好底层准备。
            </p>
            <p>
              <span className="font-semibold text-zinc-100">商业化应用价值：</span>
              为影视级 CG 短片、商业广告提案提供高质量的视觉预演（Previz）。让客户或投资人在项目立项初期，就能以直观、高品质的画面确认最终的叙事节奏与成片效果。
            </p>
          </div>
        </div>

      </div>
    </>
  );
}
