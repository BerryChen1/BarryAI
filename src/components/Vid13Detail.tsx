import React, { Fragment } from 'react';
import { CustomVideoPlayer } from './CustomVideoPlayer';

export function Vid13Detail({ selectedProject, language, t, setLightboxState }: any) {
  return (
    <div className="space-y-12">

      {/* 第一部分：片段展示 */}
      <div className="space-y-6">
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-sky-300 tracking-wide flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          片段展示
        </h3>

        {/* Two Videos */}
        <div className="flex flex-col gap-6 w-full">
          <CustomVideoPlayer src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/yinglindian%201.mp4" language={language} aspectRatio="aspect-[21/9]" />
          <CustomVideoPlayer src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/yinglindian%202.mp4" language={language} aspectRatio="aspect-[21/9]" />
        </div>

        {/* Descriptive Bullet List */}
        <div className="p-5 md:p-6 rounded-none bg-zinc-900/70 border border-white/10 space-y-2.5 text-left text-xs sm:text-sm md:text-base text-zinc-300 font-light leading-relaxed">
          <p>
            <span className="font-semibold text-zinc-100">镜头与运镜：</span>
            采用极速推轨结合手持摄影机震动效果，实现无剪辑点的一镜到底连续动态视觉。
          </p>
          <p>
            <span className="font-semibold text-zinc-100">环境与特效：</span>
            设定宏大的废墟城市与天空裂痕背景，辅以暗红色天火、陨石坠落及剧烈爆炸的粒子特效。
          </p>
          <p>
            <span className="font-semibold text-zinc-100">主体动作：</span>
            角色在极度昏暗的废墟中高速穿梭，执行跃起与机械手臂重击地面的物理破坏动作，激起巨大冲击波震碎周遭悬浮物。
          </p>
          <p>
            <span className="font-semibold text-zinc-100">视觉基调：</span>
            锁定高对比度的暗黑写实CG风格，以强烈的爆点白光与低音轰鸣感完成场景的视觉收尾。
          </p>
        </div>
      </div>

      {/* 自媒体收获 / MEDIA ACHIEVEMENTS */}
      <div className="space-y-4">
        <div className="flex items-center gap-2.5 border-b border-white/5 pb-2.5">
          <span className="w-2 h-2 rounded-full bg-sky-300" />
          <h2 className="text-sm md:text-base uppercase tracking-[0.2em] font-bold text-zinc-200">
            {t("自媒体收获 / MEDIA ACHIEVEMENTS", "MEDIA ACHIEVEMENTS")}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-full">
          {[
            {
              url: "/images/20260823021808148.webp",
              pos: "object-top"
            },
            {
              url: "/images/20260823021829914.webp",
              pos: "object-[center_65%]"
            }
          ].map((item, idx, arr) => (
            <div
              key={`valhalla-achieve-${idx}`}
              className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full aspect-[4/3] sm:aspect-[16/10] rounded-none border border-white/5"
              onClick={() => setLightboxState({ images: arr.map(i => i.url), index: idx })}
            >
              <img
                src={item.url}
                alt={`Media Achievement ${idx + 1}`}
                className={`w-full h-full object-cover ${item.pos} group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100`}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
              <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
                {t("点击查看大图", "Click to Zoom")}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 第二部分：角色资产升维与场景锚定 */}
      <div className="space-y-6 pt-4 border-t border-white/5">
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-sky-300 tracking-wide flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          角色资产升维与场景锚定
        </h3>

        {/* 角色 2D 转 3D */}
        <div className="space-y-4">
          <div className="p-4 rounded-none bg-zinc-900/50 border border-white/5 text-xs sm:text-sm md:text-base text-zinc-300 font-light leading-relaxed">
            <span className="font-semibold text-zinc-100">角色 2D 转 3D：</span>
            以前期2D人物设定图为视觉锚点，提取核心特征（如特定材质长袍、机械义肢）。通过图像生成模型与风格转化，赋予角色“真实皮肤纹理”、“UE5引擎渲染”及“超高清”的3D立体光影与物理材质表现。
          </div>

          {/* 9宫格 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
            {[
              "/images/20260623010226522.webp",
              "/images/20260623010302570.webp",
              "/images/20260623010317896.webp",
              "/images/20260812001803954.webp",
              "/images/20260812001817685.webp",
              "/images/20260812001829062.webp",
              "/images/20260812001844238.webp",
              "/images/20260812001908765.webp",
              "/images/20260812001930770.webp"
            ].map((imgUrl, idx, arr) => (
              <div key={`vid13-grid9-${idx}`} className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full aspect-video rounded-none border border-white/5" onClick={() => setLightboxState({images: arr, index: idx})}>
                <img loading="lazy" decoding="async" src={imgUrl} alt={`Asset ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
                  {t("点击查看大图", "Click to Zoom")}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 场景环境构建 */}
        <div className="space-y-4 pt-4">
          <div className="p-4 rounded-none bg-zinc-900/50 border border-white/5 text-xs sm:text-sm md:text-base text-zinc-300 font-light leading-relaxed">
            <span className="font-semibold text-zinc-100">场景环境构建：</span>
            使用高精度提示词架构锁定画面参数。通过固定“极暗宫殿废墟”、“冷调工业暗光”以及“21:9电影画幅”等限制词，生成具有真实景深、低饱和度且带轻微胶片颗粒感的电影级场景，确保人物与场景的光影逻辑高度自洽。
          </div>

          {/* 3张场景图 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
            {[
              "/images/20260812001957119.webp",
              "/images/20260812002010944.webp",
              "/images/20260812002028317.webp"
            ].map((imgUrl, idx, arr) => (
              <div key={`vid13-scene3-${idx}`} className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full aspect-video rounded-none border border-white/5" onClick={() => setLightboxState({images: arr, index: idx})}>
                <img loading="lazy" decoding="async" src={imgUrl} alt={`Scene ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
                  {t("点击查看大图", "Click to Zoom")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 第三部分：音频驱动与复杂场景提示词控制 */}
      <div className="space-y-6 pt-4 border-t border-white/5">
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-sky-300 tracking-wide flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          音频驱动与复杂场景提示词控制
        </h3>

        {/* Seed 1.0 音频制作 */}
        <div className="space-y-4">
          <div className="p-4 rounded-none bg-zinc-900/50 border border-white/5 text-xs sm:text-sm md:text-base text-zinc-300 font-light leading-relaxed">
            <span className="font-semibold text-zinc-100">Seed 1.0 音频制作：</span>
            为3D化角色注入音频表现。接入 Seed 1.0 音频大模型，通过输入台词并配置对应的人物性格参数，生成具备情绪起伏与呼吸感的拟真旁白。结合视频生成技术，驱动角色生成自然的口型与面部微表情。
          </div>

          {/* 一排3张 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
            {[
              "/images/20260812004202017.webp",
              "/images/20260812002052189.webp",
              "/images/20260812002105760.webp"
            ].map((imgUrl, idx, arr) => (
              <div key={`vid13-audio3-${idx}`} className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full aspect-video rounded-none border border-white/5" onClick={() => setLightboxState({images: arr, index: idx})}>
                <img loading="lazy" decoding="async" src={imgUrl} alt={`Audio Control ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
                  {t("点击查看大图", "Click to Zoom")}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 多人场景工作流控制 */}
        <div className="p-4 rounded-none bg-zinc-900/50 border border-white/5 text-xs sm:text-sm md:text-base text-zinc-300 font-light leading-relaxed">
          <span className="font-semibold text-zinc-100">多人场景工作流控制：</span>
          针对多人同框场景，采用高度模块化的节点连线工作流与区域控制（Region Control）技术。通过划分精确的画面坐标区块，将特定的角色参考图与提示词独立定向到指定区域。此流程可有效避免多角色特征混淆、色彩溢出及画风崩塌，在实现复杂调度的同时维持全局统一的写实CG画风。
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
          <div className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-none border border-white/5" onClick={() => setLightboxState({images: ["/images/20260917011541513.webp"], index: 0})}>
            <img loading="lazy" decoding="async" src="/images/20260917011541513.webp" alt="Poster Design" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
            <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
              {t("点击查看大图", "Click to Zoom")}
            </div>
          </div>
      </div>
    </div>
  );
}
