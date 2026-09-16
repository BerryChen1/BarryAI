import React from 'react';
import { CustomVideoPlayer } from './CustomVideoPlayer';

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
          <div className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-none border border-white/5" onClick={() => setLightboxState({ images: ["/images/20260623003203649.webp"], index: 0 })}>
              <img loading="lazy" decoding="async" src="/images/20260623003203649.webp" alt="Media Achievements" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
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
          <div className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-none border border-white/5" onClick={() => setLightboxState({ images: ["/images/20260626222446052.webp"], index: 0 })}>
              <img loading="lazy" decoding="async" src="/images/20260626222446052.webp" alt="Xinpianchang Achievements" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
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
              <div key={`vid-1-art-r1-${idx}`} className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full aspect-video rounded-none border border-white/5" onClick={() => setLightboxState({images: arr, index: idx})}>
                <img loading="lazy" decoding="async" src={imgUrl} alt="Art Asset" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
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
              <div key={`vid-1-art-r2-${idx}`} className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full aspect-video rounded-none border border-white/5" onClick={() => setLightboxState({images: arr, index: 2 + idx})}>
                <img loading="lazy" decoding="async" src={imgUrl} alt="Art Asset" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
                  {t("点击查看大图", "Click to Zoom")}
                </div>
              </div>
            );
          })}
        </div>

        {/* Text description under Art Assets */}
        <div className="p-5 md:p-6 rounded-none bg-zinc-900/70 border border-white/10 space-y-3 text-left">
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
                <div key={`vid-1-prompt-${idx}`} className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full aspect-video rounded-none border border-white/5" onClick={() => setLightboxState({images: arr, index: idx})}>
                  <img loading="lazy" decoding="async" src={imgUrl} alt="Prompt Asset" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                  <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-black/60 border border-white/10 text-[8px] sm:text-[10px] text-zinc-400 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
                    {t("查看", "Zoom")}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Text description under Prompt Assets */}
          <div className="p-5 md:p-6 rounded-none bg-zinc-900/70 border border-white/10 space-y-3 text-left">
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

        {/* Storyboard Assets Section */}
        <div className="space-y-6 pt-6">
          <div className="flex items-center gap-2.5 border-b border-white/5 pb-2.5">
            <span className="w-2 h-2 rounded-full bg-sky-300" />
            <h2 className="text-sm md:text-base uppercase tracking-[0.2em] font-bold text-zinc-200">
              {t("概念分镜 / CONCEPTUAL STORYBOARD", "CONCEPTUAL STORYBOARD")}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {[
              "/images/20260623002835096.webp",
              "/images/20260623002909540.webp",
              "/images/20260623002923337.webp",
              "/images/20260623002936574.webp",
              "/images/20260623002947032.webp",
              "/images/20260623003000623.webp"
            ].map((imgUrl, idx) => {
              const arr = [
                "/images/20260623002835096.webp",
                "/images/20260623002909540.webp",
                "/images/20260623002923337.webp",
                "/images/20260623002936574.webp",
                "/images/20260623002947032.webp",
                "/images/20260623003000623.webp"
              ];
              return (
                <div key={`vid-1-storyboard-${idx}`} className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full aspect-video rounded-none border border-white/5" onClick={() => setLightboxState({images: arr, index: idx})}>
                  <img loading="lazy" decoding="async" src={imgUrl} alt="Storyboard Asset" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                  <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-black/60 border border-white/10 text-[8px] sm:text-[10px] text-zinc-400 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
                    {t("查看", "Zoom")}
                  </div>
            
      {/* CyberpunkGO Content */}
      <div className="space-y-8 pt-12 border-t border-white/10 mt-12">
        <div className="flex items-center justify-center mb-8">
            <h2 className="text-xl md:text-2xl uppercase tracking-widest font-bold text-white">
              《CyberpunkGO》
            </h2>
        </div>

      <CustomVideoPlayer src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/four%EF%BC%881%EF%BC%89.mp4" language={language} />
      <div className="space-y-4">
        <div className="pl-5 border-l-3 border-sky-400/80 italic text-zinc-250 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed py-2.5 bg-sky-400/[0.02]">
          “嘿，你会想念夜之城吗？”
        </div>
        <div className="space-y-4 text-zinc-350 text-sm sm:text-base md:text-lg lg:text-lg leading-[1.85] font-sans font-light text-justify">
          <p className="tracking-wide">雨幕裹着霓虹漫过整座钢铁丛林，从高空俯瞰下去，摩天楼的灯海在水汽里沉浮，在楼宇夹缝与架空廊道间穿梭俯冲，在这机械与人性撕扯的霓虹都市里，守着夜之城最后一点摇摇欲坠的底线。</p>
        </div>
      </div>

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
              <div key={gIdx} className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full aspect-video rounded-none border border-white/5" onClick={() => setLightboxState({images: arr, index: gIdx})}>
                <img loading="lazy" decoding="async" src={imgUrl} alt="Visual Scene Asset" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
                  {t("点击查看大图", "Click to Zoom")}
                </div>
              </div>
            ))}
          </div>
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
          <div className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-none border border-white/5" onClick={() => setLightboxState({images: ["/images/20260917011519795.webp"], index: 0})}>
            <img loading="lazy" decoding="async" src="/images/20260917011519795.webp" alt="Poster Design" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
            <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
              {t("点击查看大图", "Click to Zoom")}
            </div>
          </div>
      </div>
    </div>
              );
            })}
          </div>

          <div className="p-5 md:p-6 rounded-none bg-zinc-900/70 border border-white/10 space-y-3 text-left">
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

  
      {/* CyberpunkGO Content */}
      <div className="space-y-8 pt-12 border-t border-white/10 mt-12">
        <div className="flex items-center justify-center mb-8">
            <h2 className="text-xl md:text-2xl uppercase tracking-widest font-bold text-white">
              《CyberpunkGO》
            </h2>
        </div>

      <CustomVideoPlayer src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/four%EF%BC%881%EF%BC%89.mp4" language={language} />
      <div className="space-y-4">
        <div className="pl-5 border-l-3 border-sky-400/80 italic text-zinc-250 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed py-2.5 bg-sky-400/[0.02]">
          “嘿，你会想念夜之城吗？”
        </div>
        <div className="space-y-4 text-zinc-350 text-sm sm:text-base md:text-lg lg:text-lg leading-[1.85] font-sans font-light text-justify">
          <p className="tracking-wide">雨幕裹着霓虹漫过整座钢铁丛林，从高空俯瞰下去，摩天楼的灯海在水汽里沉浮，在楼宇夹缝与架空廊道间穿梭俯冲，在这机械与人性撕扯的霓虹都市里，守着夜之城最后一点摇摇欲坠的底线。</p>
        </div>
      </div>

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
              <div key={gIdx} className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full aspect-video rounded-none border border-white/5" onClick={() => setLightboxState({images: arr, index: gIdx})}>
                <img loading="lazy" decoding="async" src={imgUrl} alt="Visual Scene Asset" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
                  {t("点击查看大图", "Click to Zoom")}
                </div>
              </div>
            ))}
          </div>
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
          <div className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-none border border-white/5" onClick={() => setLightboxState({images: ["/images/20260917011519795.webp"], index: 0})}>
            <img loading="lazy" decoding="async" src="/images/20260917011519795.webp" alt="Poster Design" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
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
