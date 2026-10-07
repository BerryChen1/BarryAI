import React from 'react';
import { Sparkles, TrendingUp, BookOpen, Layers, Film, Hammer, CheckCircle, Eye, MousePointerClick, ShieldCheck, Zap } from 'lucide-react';
import { CustomVideoPlayer } from './CustomVideoPlayer';

interface TencentIEGDetailProps {
  language: 'zh' | 'en';
  t: (zh: any, en: any) => any;
  setLightboxUrl: (url: string | null) => void;
}

export function TencentIEGDetail({ language, t, setLightboxUrl }: TencentIEGDetailProps) {
  // Beautiful high-quality Unsplash image presets representing the game visuals & design workflows
  const images = {
    kvAnton: "/images/20260623213232521.webp", // Epic volcano lava, dark red & black atmosphere
    antonAIGCStatic: "/images/20260623213302775.webp", // Dark rocky volcano cracks
    comfyUIWorkflow: "/images/20260623213611261.webp", // Node-based computing screen mockup
    antonOtherStatic: "/images/tencent_anton.jpg", // Abstract premium render
    lavaVolcanoTheme: "/images/tencent_volcano.jpg", // Threatening volcano glowing
    qqDanceCards: "/images/20260623214008126.webp", // Cute anime card-styled illusts
    internCollage: "/images/20260623214026601.webp" // Interactive UX boards collage
  };

  const springFestivalHero = {
    src: "/projects/dnf-spring-2026/01-main-visual.webp",
    title: t("主视觉｜祈愿新春 · 有锋芒的好运", "Key Visual · New Year Wishes")
  };

  const springFestivalGroups = [
    {
      title: t("01｜视觉基因与动作构图", "01 · Visual DNA & Action"),
      description: t(
        "提取金发、白羽、红黑金甲与福牌信物，并以破阵、腾跃、狂喜、落定四组动作建立具有游戏力量感的新春叙事。",
        "Blonde hair, white feathers, red-black-gold armor and fortune talismans establish the visual DNA, while four action beats shape the New Year narrative."
      ),
      items: [
        { src: "/projects/dnf-spring-2026/02-visual-dna.webp", title: t("主题视觉基因", "Theme Visual DNA") },
        { src: "/projects/dnf-spring-2026/03-breakthrough-perspective.webp", title: t("破阵｜超近透视", "Breakthrough · Extreme Perspective") },
        { src: "/projects/dnf-spring-2026/04-airborne-motion.webp", title: t("天马行空｜腾空回旋", "Airborne · Spiraling Motion") },
        { src: "/projects/dnf-spring-2026/05-joy-halftone.webp", title: t("狂喜｜双色网点", "Joy · Duotone Halftone") },
        { src: "/projects/dnf-spring-2026/06-wish-fulfilled.webp", title: t("所愿皆成｜巨物留白", "Wish Fulfilled · Monumental Space") },
        { src: "/projects/dnf-spring-2026/07-motion-atlas.webp", title: t("角色动作谱", "Character Pose Atlas") }
      ]
    },
    {
      title: t("02｜材质实验与品牌衍生", "02 · Material & Brand Extensions"),
      description: t(
        "通过金属过曝与漆夜裂金两种材质方向统一红、黑、金视觉语言，并延展至限定潮玩、摆件和数码桌搭。",
        "Overexposed metal and fractured lacquered gold unify the red-black-gold language before it expands into collectibles and digital desk objects."
      ),
      items: [
        { src: "/projects/dnf-spring-2026/08-metal-overexposure.webp", title: t("金属过曝｜扫描切片", "Metal Overexposure · Scan Slices") },
        { src: "/projects/dnf-spring-2026/09-hidden-edge.webp", title: t("漆夜藏锋｜裂金悬浮", "Hidden Edge · Fractured Gold") },
        { src: "/projects/dnf-spring-2026/10-limited-collectible.webp", title: t("限定潮玩与摆件", "Limited Collectibles") },
        { src: "/projects/dnf-spring-2026/11-digital-desk-set.webp", title: t("数码桌搭周边", "Digital Desk Objects") }
      ]
    },
    {
      title: t("03｜动态节奏与全案收束", "03 · Motion Rhythm & Summary"),
      description: t(
        "最后以动态节奏、声音框架与全案收束页补齐体验链路，让静态主视觉继续延展为完整的传播系统。",
        "Motion rhythm, a sound framework and the closing system page complete the experience and extend the key visual into a full communication system."
      ),
      items: [
        { src: "/projects/dnf-spring-2026/12-motion-system.webp", title: t("动态视觉节奏｜30 SEC", "Motion System · 30 SEC") },
        { src: "/projects/dnf-spring-2026/13-sound-edit-rhythm.webp", title: t("音乐与剪辑节奏｜132 BPM", "Sound & Edit Rhythm · 132 BPM") },
        { src: "/projects/dnf-spring-2026/14-case-summary.webp", title: t("全案收束", "Case Summary") }
      ]
    }
  ];

  return (
    <div className="flex flex-col gap-10 text-zinc-350 font-sans">
      
      {/* Title & Metadata Panel */}
      <div className="p-5 sm:p-8 rounded-none md:rounded-none border border-white/5 bg-white/[0.01] flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-sky-400 tracking-wider font-mono font-semibold uppercase">
            {t("腾讯互动娱乐事业群 · 实习履历", "Tencent IEG • Internship Experience")}
          </span>
          <h4 className="text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-wide">
            {t("腾讯 IEG 国内发行线 AIGC美术视觉设计", "Tencent IEG Domestic Publishing AIGC Art & Visual Design")}
          </h4>
        </div>
        
        {/* Metadata Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4 text-sm sm:text-base border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-zinc-500 text-xs uppercase tracking-wider">{t("地点", "Location")}</span>
            <span className="text-zinc-200 font-light mt-0.5">{t("深圳", "Shenzhen, China")}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-zinc-500 text-xs uppercase tracking-wider">{t("实习时间", "Internship Period")}</span>
            <span className="text-zinc-200 font-light mt-0.5">2025.07 — 2026.02</span>
          </div>
          <div className="flex flex-col">
            <span className="text-zinc-500 text-xs uppercase tracking-wider">{t("团队", "Team")}</span>
            <span className="text-zinc-200 font-light mt-0.5">
              {t("腾讯 IEG 国内发行线视觉设计组", "Tencent IEG Domestic Publishing Visual Design Team")}
            </span>
          </div>
        </div>
      </div>

      {/* 一、工作概述 */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2.5 border-b border-white/5 pb-3">
          <span className="w-2 h-2 rounded-full bg-sky-300" />
          <h4 className="text-base md:text-lg lg:text-xl uppercase tracking-[0.1em] font-bold text-white/95">
            {t("一、工作概述", "I. Overview of Responsibilities")}
          </h4>
        </div>
        <div className="space-y-5 text-sm sm:text-base md:text-lg leading-[1.8] font-light text-justify text-zinc-200">
          <p>
            {t(
              "作为腾讯 IEG 国内发行线视觉设计实习生，参与《地下城与勇士：起源》的品牌视觉体系搭建，同时支撑 QQ 炫舞、员工大会等多项目设计需求。",
              "As a Visual Design Intern under the Tencent IEG Domestic Publishing team, I contributed to the brand visual system for 'Dungeon & Fighter: Origins' while also supporting QQ Dance, internal staff conventions, and other project design needs."
            )}
          </p>
          <p>
            {t(
              "我以 AIGC 技术为核心抓手，探索其在游戏美术、运营物料及动态内容中的全流程应用，构建了从文化符号提炼、视觉规范落地到动态内容生产的标准化提效工作流，实现了创意质量与交付效率的双重突破。",
              "I utilized AIGC workflows as my core accelerator, exploring full-cycle pipelines in high-level game art assets, live-ops campaign creative, and algorithmic motion animations. Through this, I established a standardized efficiency engine covering cultural design research, asset criteria systems, and rapid motion output."
            )}
          </p>
        </div>
      </div>

      {/* 二、参与项目：《地下城与勇士:起源》祈愿新春主题设计 */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-white/5 pb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e7442d]" />
          <h4 className="text-sm md:text-base uppercase tracking-[0.1em] font-bold text-white/95">
            {t("二、参与项目：《地下城与勇士:起源》祈愿新春主题设计", "II. Participating Project: New Year Theme Design (DNF: Origins)")}
          </h4>
        </div>

        <p className="text-sm sm:text-base leading-[1.75] font-light text-justify text-zinc-300">
          {t(
            "以「有锋芒的好运」为核心，将角色战斗感与新春祈愿结合，围绕主视觉、角色动作、红黑金材质语言及品牌衍生，构建一套兼具节日氛围与游戏力量感的马年春节主题视觉。",
            "Built around the idea of 'fortune with an edge,' this Year of the Horse visual system combines combat energy with Lunar New Year symbolism across the key visual, character poses, red-black-gold materials and branded extensions."
          )}
        </p>

        <button
          type="button"
          onClick={() => setLightboxUrl(springFestivalHero.src)}
          className="group flex w-full flex-col gap-1.5 text-left"
          aria-label={t(`放大查看：${springFestivalHero.title}`, `Enlarge: ${springFestivalHero.title}`)}
        >
          <span className="relative aspect-video overflow-hidden border border-white/10 bg-[#111]">
            <img
              loading="lazy"
              decoding="async"
              src={springFestivalHero.src}
              alt={springFestivalHero.title}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.01] group-hover:brightness-105"
              referrerPolicy="no-referrer"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="flex items-center gap-1.5 border border-white/15 bg-black/65 px-3 py-1.5 text-[11px] text-white backdrop-blur-sm">
                <Eye className="h-3.5 w-3.5" />
                {t("查看主视觉大图", "View key visual")}
              </span>
            </span>
          </span>
          <span className="text-[10px] tracking-wide text-zinc-500 md:text-[11px]">{springFestivalHero.title}</span>
        </button>

        <div className="space-y-4">
          {springFestivalGroups.map((group) => (
            <div key={group.title} className="space-y-3 border border-white/5 bg-white/[0.01] p-3 md:p-4">
              <div className="space-y-1.5">
                <h5 className="text-xs font-semibold tracking-[0.08em] text-zinc-100 md:text-sm">{group.title}</h5>
                <p className="max-w-5xl text-[11px] font-light leading-relaxed text-zinc-400 md:text-xs">{group.description}</p>
              </div>

              <div className={`grid grid-cols-2 gap-2.5 md:gap-3 ${group.items.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
                {group.items.map((item) => (
                  <button
                    key={item.src}
                    type="button"
                    onClick={() => setLightboxUrl(item.src)}
                    className="group flex min-w-0 flex-col gap-1.5 text-left"
                    aria-label={t(`放大查看：${item.title}`, `Enlarge: ${item.title}`)}
                  >
                    <span className="relative aspect-video overflow-hidden border border-white/10 bg-[#111]">
                      <img
                        loading="lazy"
                        decoding="async"
                        src={item.src}
                        alt={item.title}
                        className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.015] group-hover:brightness-110"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                        <Eye className="h-4 w-4 text-white" />
                      </span>
                    </span>
                    <span className="truncate text-[9px] tracking-wide text-zinc-500 md:text-[10px]">{item.title}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 三、参与项目：《地下城与勇士：起源》安徒恩版本视觉设计 */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-white/5 pb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-300" />
          <h4 className="text-sm md:text-base uppercase tracking-[0.1em] font-bold text-white/95">
            {t("三、参与项目：《地下城与勇士：起源》安徒恩版本视觉设计", "III. Participating Project: Anton Raid Expansion Visual Designs (DNF: Origins)")}
          </h4>
        </div>

        <p className="text-sm sm:text-base md:text-lg leading-[1.8] font-light text-justify text-zinc-200">
          {t(
            "本项目为《地下城与勇士・起源》安徒恩团本版本全套视觉设计视觉探索",
            "This project presents a complete visual-design exploration for the Anton Raid expansion of Dungeon & Fighter: Origins."
          )}
        </p>

        {/* Anton Main KV Display */}
        <div className="flex flex-col gap-1.5">
          <div 
            onClick={() => setLightboxUrl(images.kvAnton)}
            className="relative aspect-video rounded-none overflow-hidden border border-white/5 bg-zinc-950 group cursor-pointer"
          >
            <img loading="lazy" decoding="async" 
              src={images.kvAnton} 
              alt="Anton Raid KV" 
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 brightness-90 group-hover:brightness-100"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="bg-black/60 text-white text-[11px] px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-sky-400" />
                {t("预览大图（展示 “集合！决战安徒恩” 主题 KV）", "Enlarge (Displaying 'Assemble! Fight Anton' Main KV)")}
              </span>
            </div>
          </div>
          <span className="text-[10px] text-zinc-500 text-center uppercase tracking-widest mt-1">{t("【图 10：安徒恩版本主视觉 KV】", "Key Visual 10: Epic Anton Fight Release Main KV")}</span>
        </div>

        {/* 1. 静态视觉与 AIGC 素材库搭建 */}
        <div className="p-4 rounded-none bg-white/[0.01] border border-white/5 flex flex-col gap-3.5">
          <h5 className="text-xs md:text-sm font-semibold text-zinc-100 flex items-center gap-1.5">
            <span className="text-sky-405 font-mono">1.</span> {t("静态视觉与 AIGC 素材库搭建", "Static Layouts & AIGC Asset Library Generation")}
          </h5>

          <div className="flex flex-col md:flex-row-reverse gap-4 items-center">
            <div className="w-full md:w-1/2 flex flex-col gap-1 shrink-0">
              <div 
                onClick={() => setLightboxUrl(images.antonAIGCStatic)}
                className="relative aspect-video rounded-none overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer"
              >
                <img loading="lazy" decoding="async" src={images.antonAIGCStatic} className="w-full h-full object-cover" alt="anton static model" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-transparent group-hover:bg-black/20 transition-colors" />
              </div>
              <span className="text-[10px] text-zinc-500 text-center uppercase tracking-wider mt-0.5">{t("【图 11：静像创作与 AIGC 前期整合】", "Img 11: Creative Canvas & AIGC Materials")}</span>
            </div>
            
            <div className="flex-1 flex flex-col gap-3 text-xs md:text-sm text-zinc-300 font-light text-justify">
              <p>
                <strong className="text-white font-medium">{t("风格定位与素材储备：", "Aesthetic Direction & Asset Reserves: ")}</strong>
                {t("围绕安徒恩 Raid 的“红黑末世、故障 UI、粗粝力量感”三大核心风格，构建关键词矩阵，通过 Midjourney 批量生成废土角色、岩浆场景、火山裂纹等基础素材，筛选并统一调色，形成了高利用率的原生设计图库备件。", "Oriented around 'red-black apocalyptic, glitch UI system, and industrial heavy-metals' styles. Generated assets including glowing lava splits, craggy stone borders, and apocalyptic clouds via Midjourney Prompt matrices.")}
              </p>
              <p>
                <strong className="text-white font-medium">{t("AIGC 辅助视觉设计：", "AIGC-Enhanced Visual Composite: ")}</strong>
                {t("将 AI 生成素材深度融入手绘创作（Procreate等），通过精细笔刷加强光影过渡与实体质感，消解“AI 塑料生硬感”，保证最终呈现效果完全融合游戏原有美术画风。", "Imported generations into design tools, painting custom highlights to match game assets art styles, eliminating artificial artifacts.")}
              </p>
            </div>
          </div>
        </div>

        {/* 2. 分层批量输出成套静态版式，完成 AIGC 动态效果前置素材储备 */}
        <div className="p-4 rounded-none bg-white/[0.01] border border-white/5 flex flex-col gap-4">
          <h5 className="text-xs md:text-sm font-semibold text-zinc-100 flex items-center gap-1.5">
            <span className="text-sky-405 font-mono">2.</span> {t("分层批量输出成套静态版式，完成 AIGC 动态效果前置素材储备", "Layered Static Layout Batch Outputs for AIGC Pre-Motion Reserve")}
          </h5>
          <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed">
            {t("基于定型的安徒恩 RAID 红黑工业故障视觉规范与 AIGC 标准化素材库，批量产出多场景、多角色、多版式静态 KV，统一锁定色值体系、网格版式、装饰元件、字体层级，同时对画面分层精细化拆分，预先规划镜头运镜、元素动效走向，为后续 AIGC 动态分镜拆解、关键帧插值、分层动效渲染完整前置素材，保障动静态视觉风格完全统一。", "Based on the finalized Anton RAID red-black industrial glitch visual guidelines and AIGC standardized asset library, batch-produced multi-scene, multi-character, and multi-layout static key visuals. Unified the color matching system, layout grid, decorative components, and typography hierarchy. Simultaneously, we performed precise layer separation on the visuals to pre-plan camera movements and element animations, providing complete pre-materials for subsequent AIGC dynamic storyboard breakdown, keyframe interpolation, and layered motion rendering, ensuring complete unity between static and dynamic visual styles.")}
          </p>

          <div className="flex flex-col gap-2 mt-2">
            <h6 className="text-xs font-medium text-zinc-400 capitalize">{t("第一组：版本主视觉 + 使徒核心单人 KV + 场景 UI 版式稿", "Group 1: Final Key Visual + Apostle Core Solo KV + Scene UI Layout")}</h6>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div className="flex flex-col gap-1.5">
                <div 
                  onClick={() => setLightboxUrl("/images/20260623213321460.webp")}
                  className="relative aspect-[3/4] md:aspect-auto rounded-none overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer"
                >
                  <img loading="lazy" decoding="async" src="/images/20260623213321460.webp" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="安徒恩 BOSS 正面压迫感主 KV" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-transparent group-hover:bg-black/20 transition-colors" />
                </div>
                <span className="text-[10px] text-zinc-500 text-center uppercase tracking-wider mt-0.5">{t("【图 12：安徒恩 BOSS 主 KV】", "Img 12: Anton BOSS KV")}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div 
                  onClick={() => setLightboxUrl("/images/20260623213337408.webp")}
                  className="relative aspect-[3/4] md:aspect-auto rounded-none overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer"
                >
                  <img loading="lazy" decoding="async" src="/images/20260623213337408.webp" className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500" alt="玛特伽使徒降临单人主题 KV" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-transparent group-hover:bg-black/20 transition-colors" />
                </div>
                <span className="text-[10px] text-zinc-500 text-center uppercase tracking-wider mt-0.5">{t("【图 13：玛特伽使徒主题 KV】", "Img 13: Mateka Apostle KV")}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div 
                  onClick={() => setLightboxUrl("/images/20260623213359001.webp")}
                  className="relative aspect-[3/4] md:aspect-auto rounded-none overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer"
                >
                  <img loading="lazy" decoding="async" src="/images/20260623213359001.webp" className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500" alt="危机火山分区模块化故障 UI 版式稿" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-transparent group-hover:bg-black/20 transition-colors" />
                </div>
                <span className="text-[10px] text-zinc-500 text-center uppercase tracking-wider mt-0.5">{t("【图 14：危机火山故障 UI 版式】", "Img 14: Crisis Volcano Glitch UI")}</span>
              </div>
            </div>
            <p className="text-xs text-zinc-400 font-light leading-relaxed mt-1">
              {t("三张画面统一复用裂纹肌理、故障扫描边框、工业进度刻度、巨型竖排标题四大核心视觉组件。BOSS 主 KV 采用黑白高对比度特写，定格副本开篇惊悚氛围，直接用作动态开篇定格帧；玛特伽使徒 KV 将人物本体、魔法纹路、侧边报错文本独立分层，预留光效流动、轮廓闪烁动画通道；危机火山 UI 稿模拟服务器入侵报错界面，分栏模块独立拆分，可直接做弹窗依次滑入、扫描线滚动动效，无需二次重绘画面元素。", "The three images unify and reuse four core visual components: crack textures, glitch scanning borders, industrial progress scales, and giant vertical titles. The BOSS main KV uses a high-contrast black-and-white close-up to set the thrilling intro atmosphere; the Mateka Apostle KV separates the main character, magic patterns, and side error texts into independent layers, reserving channels for light flow and outline flicker animations; the Crisis Volcano UI layout simulates a server invasion error interface, with column modules split independently, returning a canvas ready for sequential popup and scanning line scroll animations.")}
            </p>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <h6 className="text-xs font-medium text-zinc-400 capitalize">{t("第二组：单职业角色 KV + 双人组队拼贴海报", "Group 2: Solo Class KV + Duo Squad Collage Poster")}</h6>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="flex flex-col gap-1.5">
                <div 
                  onClick={() => setLightboxUrl("/images/20260623213419345.webp")}
                  className="relative aspect-[3/4] md:aspect-auto rounded-none overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer"
                >
                  <img loading="lazy" decoding="async" src="/images/20260623213419345.webp" className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500" alt="男枪手单人角色宣传 KV" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-transparent group-hover:bg-black/20 transition-colors" />
                </div>
                <span className="text-[10px] text-zinc-500 text-center uppercase tracking-wider mt-0.5">{t("【图 15：男枪手单人宣传 KV】", "Img 15: Male Gunner Solo KV")}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div 
                  onClick={() => setLightboxUrl("/images/20260623213435866.webp")}
                  className="relative aspect-[3/4] md:aspect-auto rounded-none overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer"
                >
                  <img loading="lazy" decoding="async" src="/images/20260623213435866.webp" className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500" alt="双枪手组队攻坚拼贴版式海报" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-transparent group-hover:bg-black/20 transition-colors" />
                </div>
                <span className="text-[10px] text-zinc-500 text-center uppercase tracking-wider mt-0.5">{t("【图 16：双枪手组队拼贴海报】", "Img 16: Duo Squad Collage Poster")}</span>
              </div>
            </div>
            <p className="text-xs text-zinc-400 font-light leading-relaxed mt-1">
              {t("两张职业向物料面向社群组队招募、短视频封面投放场景做分层预留。单人版拆分人物形象、侧边剧情文案、外框装饰三层，可做人物缓慢浮现、文字逐行弹出动效；双人倾斜胶带拼贴版式拆分胶带、人物、底层背景，适配胶带飘动、镜头轻微旋转的潮流动态效果，完整补齐全渠道动态物料所需全部静态素材。", "These two class-oriented assets are prepared in layers for community team recruitment and short video cover placements. The solo version splits the character, side story copy, and outer frame decorations into three layers, suitable for gradual character emergence and line-by-line text pop-up animations. The duo stitched layout separates the tape, characters, and background, adapting to trendy dynamic effects like tape fluttering and slight camera rotation, fully completing the static assets required for all-channel dynamics.")}
            </p>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <h6 className="text-xs font-medium text-zinc-400 capitalize">{t("第三组：职业分镜海报 + BOSS 独立宣传稿 + 世界观场景氛围稿", "Group 3: Class Storyboard Poster + BOSS Promo KV + Worldview Mood Layout")}</h6>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div className="flex flex-col gap-1.5">
                <div 
                  onClick={() => setLightboxUrl("/images/20260623213457522.webp")}
                  className="relative aspect-[3/4] md:aspect-auto rounded-none overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer"
                >
                  <img loading="lazy" decoding="async" src="/images/20260623213457522.webp" className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500" alt="分镜连续动作海报" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-transparent group-hover:bg-black/20 transition-colors" />
                </div>
                <span className="text-[10px] text-zinc-500 text-center uppercase tracking-wider mt-0.5">{t("【图 17：分镜连续动作海报】", "Img 17: Class Storyboard Poster")}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div 
                  onClick={() => setLightboxUrl("/images/20260623213514005.webp")}
                  className="relative aspect-[3/4] md:aspect-auto rounded-none overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer"
                >
                  <img loading="lazy" decoding="async" src="/images/20260623213514005.webp" className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500" alt="克罗战斧 BOSS 独立宣传 KV" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-transparent group-hover:bg-black/20 transition-colors" />
                </div>
                <span className="text-[10px] text-zinc-500 text-center uppercase tracking-wider mt-0.5">{t("【图 18：克罗 BOSS 独立宣传稿】", "Img 18: Kuro BOSS Promo KV")}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div 
                  onClick={() => setLightboxUrl("/images/20260623213533022.webp")}
                  className="relative aspect-[3/4] md:aspect-auto rounded-none overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer"
                >
                  <img loading="lazy" decoding="async" src="/images/20260623213533022.webp" className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500" alt="舰船失事剧情场景氛围版式图" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-transparent group-hover:bg-black/20 transition-colors" />
                </div>
                <span className="text-[10px] text-zinc-500 text-center uppercase tracking-wider mt-0.5">{t("【图 19：舰船失事场景氛围稿】", "Img 19: Shipwreck Scene Mood Layout")}</span>
              </div>
            </div>
            <p className="text-xs text-zinc-400 font-light leading-relaxed mt-1">
              {t("本组三张稿件贴合 RAID 攻坚叙事逻辑，天然适配分段动态节奏。鬼剑三格分镜拆分蓄力、出击、突进三帧画面，可直接导入 AIGC 工作流做镜头依次推入、画面渐显过渡；克罗 BOSS 海报武器、魔焰特效单独分层，可叠加火焰喷涌、武器流光动画；舰船失事场景预先拆分前景舰船、中景火山、背景岩浆三层景深，能够快速制作镜头缓缓推进、火山喷发震颤的氛围感动态，大幅缩减动态分层工作量。", "This set of three layouts fits the RAID assault narrative logic, naturally adapting to rhythmic dynamic segments. The Soulbringer three-panel storyboard separates the charge, strike, and dash frames, directly importable into the AIGC workflow for sequential camera push-ins. The Kuro BOSS poster separates weapon and flame effects for fire burst animations; the shipwreck scene splits the foreground ship, midground volcano, and background magma depth-of-field, substantially reducing the workload of dynamic layering and camera-shake atmospheric effects.")}
            </p>
          </div>
        </div>

        {/* 3. 动态视觉全流程设计（AIGC 驱动） */}
        <div className="p-4 rounded-none bg-white/[0.01] border border-white/5 flex flex-col gap-3.5">
          <h5 className="text-xs md:text-sm font-semibold text-zinc-100 flex items-center gap-1.5">
            <span className="text-sky-405 font-mono">3.</span> {t("动态视觉全流程设计（AIGC 驱动）", "Motion Content Production Pipeline (AIGC Driven)")}
          </h5>

          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="w-full md:w-1/2 flex flex-col gap-1 shrink-0">
              <div 
                onClick={() => setLightboxUrl(images.comfyUIWorkflow)}
                className="relative aspect-video rounded-none overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer"
              >
                <img loading="lazy" decoding="async" src={images.comfyUIWorkflow} className="w-full h-full object-cover" alt="comfyui screen" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-transparent group-hover:bg-black/20 transition-colors" />
              </div>
              <span className="text-[10px] text-zinc-500 text-center uppercase tracking-wider mt-0.5">{t("【图 20：ComfyUI 动态流程工作节点】", "Img 20: ComfyUI Frame Generation Nodes")}</span>
            </div>
            
            <div className="flex-1 flex flex-col gap-3 text-xs md:text-sm text-zinc-300 font-light text-justify">
              <p>
                <strong className="text-white font-medium">{t("动态视觉工作流搭建：", "Developing Frame-Interp Algorithms: ")}</strong>
                {t("以静态主视觉为基础，搭建全流程 AIGC 动态创作体系，针对“火山静谧→能量爆发”等核心动作帧，通过 ComfyUI 首尾帧生成工作流，实现高度逼真的火焰流体及板块张裂变化过程。", "Built a production queue on top of master static graphics. Programmed a workflow with ComfyUI frame-interpolation nodes to achieve transition morphing such as latent molten-rock ruptures and volcanic emissions.")}
              </p>
              <p>
                <strong className="text-white font-medium">{t("动态视觉效果强化：", "High-Fidelity Animations: ")}</strong>
                {t("合理融入动态文字闪烁、微光故障抖动、高温热蒸汽粒子等环境效果，极致强化安徒恩 Raid 的末日生存危机与史诗对决感，产出极受核心玩家好评的高质量品宣动画物料。", "Supercharged atmospheric tension with glitch text flares, ambient steam, and smoke particles. Retained high design consistency between active videos and key banners.")}
              </p>
            </div>
          </div>
        </div>

        {/* 4. 依托 ComfyUI 搭建 AIGC 完整动态工作流，落地全套动态视觉效果呈现 */}
        <div className="p-4 rounded-none bg-white/[0.01] border border-white/5 flex flex-col gap-4">
          <h5 className="text-xs md:text-sm font-semibold text-zinc-100 flex items-center gap-1.5 leading-snug">
            <span className="text-sky-405 font-mono shrink-0">4.</span> {t("依托 ComfyUI 搭建 AIGC 完整动态工作流，落地全套动态视觉效果呈现", "Build Complete AIGC Dynamic Workflow via ComfyUI for Full Motion Visual Execution")}
          </h5>

          <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed">
            {t("以全部分层静态前置素材为基底，搭建全链路 AIGC 自动化动态创作体系，通过 ComfyUI 自定义节点、风格锁定参数，一站式完成关键帧插值、镜头运镜、特效生成、成片渲染全流程自动化输出，完整落地安徒恩版本成套动态运营视觉。", "Based on all layered static pre-materials, build a full-link AIGC automated dynamic creation system. Through ComfyUI custom nodes and style locking parameters, we achieved one-stop automated output spanning keyframe interpolation, camera movement, effect generation, and final rendering, completely executing the Anton Raid dynamic visual suite.")}
          </p>

          <div className="grid grid-cols-2 gap-3.5 mt-2">
            <div className="flex flex-col gap-1.5">
              <CustomVideoPlayer 
                src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/dnf1.mp4" 
                language={language} 
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <CustomVideoPlayer 
                src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/dnf2.mp4" 
                language={language} 
              />
            </div>
          </div>

          <div className="space-y-3 mt-1 text-xs md:text-sm leading-relaxed text-zinc-300 font-light">
            <p>
              <strong className="text-white font-medium">{t("专属动态工作流定制搭建：", "Custom Dynamic Workflow Setup: ")}</strong>
              {t("在 ComfyUI 内搭建首尾帧专属工作链路，将分层静态稿分别接入起始帧、结束帧节点，锁定整套红黑工业故障风格参数，规避动态画面画风偏移、色彩割裂问题；围绕「火山苏醒→能量迸发→角色出战」三段叙事节奏，分别配置三组独立关键帧插值节点，精准匹配版本故事节奏。", "Set up dedicated start-and-end frame links within ComfyUI, connecting layered static layouts to the start and end nodes respectively. We locked the complete red-and-black industrial glitch style parameters to prevent dynamic visual drift or color fragmentation; around the triple narrative rhythm of \"Volcano Awakening -> Energy Burst -> Character Deployment\", we configured three independent sets of keyframe interpolation nodes to precisely match the story pacing.")}
            </p>
            <p>
              <strong className="text-white font-medium">{t("多层级定制动效批量生成：", "Multi-layered Motion Effect Generation: ")}</strong>
              {t("依托定型工作流，批量生成文字故障闪烁、岩浆流光扩散、裂纹逐步蔓延、UI 弹窗滑入、镜头推拉缩放等贴合副本调性的动态特效；给人物图层添加细微位移抖动、武器光效循环流动动画，强化 RAID 攻坚紧张史诗感，同时严格保留原版静态版式结构、排版比例，实现动静态物料品牌视觉高度统一。", "Relying on the finalized workflow, we batch-generated dynamic effects matching the dungeon's tone, including glitching text, magma scattering, spreading cracks, sliding UI pop-ups, and camera zooms; added subtle displacement jitters and cycling weapon light effects to character layers to amplify the epic tension of the RAID, while strictly preserving original static layout structures and typography proportions, achieving highly unified brand visuals across static and dynamic assets.")}
            </p>
            <p>
              <strong className="text-white font-medium">{t("多渠道尺寸动态物料批量导出：", "Cross-Channel Dynamic Asset Export: ")}</strong>
              {t("同一套 AIGC 工作流可批量输出竖版短视频动态片、横版信息流宣传片、开服倒计时动图、社群动态海报等多规格成品内容；无需逐帧手动剪辑合成，自动化渲染交付，动态内容整体生产周期压缩 70%，全覆盖版本线上全渠道投放需求。", "The same AIGC workflow can batch-export multi-format final contents such as vertical short videos, horizontal feed promos, launch countdown GIFs, and community dynamic posters. Bypassing manual frame-by-frame editing, the automated rendering completely compressed the dynamic content production cycle by 70%, fully covering omnichannel online marketing needs.")}
            </p>
            <p>
              <strong className="text-white font-medium">{t("可复用动态资产完整沉淀：", "Reusable Dynamic Asset Consolidation: ")}</strong>
              {t("定型后的 ComfyUI 节点模板、风格参数包完整归档留存，后续同类型团本版本迭代时，仅替换分层静态素材即可快速生成成套动态视觉，持续为团队动态内容量产长效提效。", "The finalized ComfyUI node templates and style parameter packs were completely archived. For future similar Raid iterations, fully rigged dynamic visuals can be swiftly generated simply by replacing the layered static materials, continuously yielding long-term efficiency for mass dynamic content production.")}
            </p>
          </div>
        </div>
      </div>

      {/* 四、其他项目支撑工作 */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-white/5 pb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-300" />
          <h4 className="text-sm md:text-base uppercase tracking-[0.1em] font-bold text-white/95">
            {t("四、其他项目支撑工作", "IV. Multi-IP Cross-functional Design Contributions")}
          </h4>
        </div>

        {/* Support Grid of Image 15 and 16 - Stacked vertically as requested */}
        <div className="flex flex-col gap-6 w-full">
          
          {/* QQ 炫舞 Card AI */}
          <div className="p-5 rounded-none bg-white/[0.01] border border-white/5 flex flex-col gap-4">
            <div className="space-y-2">
              <h5 className="text-[14px] md:text-base font-semibold text-zinc-200">{t("QQ 炫舞社区 AI 集卡活动支持", "QQ Dance AI集卡 Campaign Prompt Optimization")}</h5>
              <p className="text-xs md:text-sm text-zinc-400 mt-1 font-light leading-relaxed">
                {t("负责卡片设计与 SD/MJ Prompt 精调调试，构建了十余套高色彩一致度、高萌属性 of Q 版角色生成框架与底图版式标准，指导团队快速流转产出海量集卡图案，显著降低运营卡组设计时长。", "Supported card art style templates and deep Prompt engineering tuning under Midjourney. Set up uniform color styles for chibi avatars, cutting creative creation periods.")}
              </p>
            </div>
            <div 
              onClick={() => setLightboxUrl(images.qqDanceCards)}
              className="relative aspect-video rounded-none overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer"
            >
              <img loading="lazy" decoding="async" src={images.qqDanceCards} className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500" alt="qqdance cards" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="bg-black/60 text-white text-[11px] px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-sky-400" />
                  {t("点按查看清晰大图", "Click to zoom")}
                </span>
              </div>
            </div>
            <span className="text-[10px] text-zinc-500 text-center uppercase tracking-wider mt-0.5">{t("【图 23：QQ 炫舞集卡活动卡面设计与自研产出】", "Img 23: QQ Dance In-App AI Card Graphic Schemes")}</span>
          </div>

          {/* Internship Collage / Other designs */}
          <div className="p-5 rounded-none bg-white/[0.01] border border-white/5 flex flex-col gap-4">
            <div className="space-y-2">
              <h5 className="text-[14px] md:text-base font-semibold text-zinc-200">{t("腾讯内部员工大会与KV创作", "Tencent Internal Employee Events & KV Creation")}</h5>
              <p className="text-xs md:text-sm text-zinc-400 mt-1 font-light leading-relaxed">
                {t("主导参与了腾讯 IEG K3&V3 员工大会彩蛋趣味徽章及礼品图形输出，并在业余阶段积极输出高质量 DNF 角色衍生视觉海报、创意 KV 练习等，不断拓展风格多元广度。", "Created customized easter-egg badges for the IEG K3 & V3 conferences. Delivered quality promotional sketches for conceptual KV exercises, expanding visual style horizons.")}
              </p>
            </div>
            <div 
              onClick={() => setLightboxUrl(images.internCollage)}
              className="relative aspect-video rounded-none overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer"
            >
              <img loading="lazy" decoding="async" src={images.internCollage} className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500" alt="co-create items" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="bg-black/60 text-white text-[11px] px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-sky-400" />
                  {t("点按查看清晰大图", "Click to zoom")}
                </span>
              </div>
            </div>
            <span className="text-[10px] text-zinc-500 text-center uppercase tracking-wider mt-0.5">{t("【图 24：其他项目与合集（视觉练习/员工大会）】", "Img 24: Other Projects & Collage (Visual Practice / Team Events)")}</span>
          </div>

          <div className="flex flex-col gap-2 mt-4 px-2">
            <h6 className="text-xs font-medium text-zinc-400 capitalize">{t("第一组：DNF 新职业女神枪手转职成套运营 KV 设计", "Group 1: DNF Female Gunner Awakening Promo KV")}</h6>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="flex flex-col gap-1.5">
                <div 
                  onClick={() => setLightboxUrl("/images/20260623214323111.webp")}
                  className="relative aspect-[3/4] md:aspect-auto rounded-none overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer"
                >
                  <img loading="lazy" decoding="async" src="/images/20260623214323111.webp" className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500" alt="重火器转职・大枪炮手 KV" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-transparent group-hover:bg-black/20 transition-colors" />
                </div>
                <span className="text-[10px] text-zinc-500 text-center uppercase tracking-wider mt-0.5">{t("【图 25：重火器转职・大枪炮手 KV】", "Img 25: Heavy Firearm Gunner KV")}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div 
                  onClick={() => setLightboxUrl("/images/20260623214342995.webp")}
                  className="relative aspect-[3/4] md:aspect-auto rounded-none overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer"
                >
                  <img loading="lazy" decoding="async" src="/images/20260623214342995.webp" className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500" alt="左轮转职・沾血蔷薇 KV" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-transparent group-hover:bg-black/20 transition-colors" />
                </div>
                <span className="text-[10px] text-zinc-500 text-center uppercase tracking-wider mt-0.5">{t("【图 26：左轮转职・沾血蔷薇 KV】", "Img 26: Blood Rose Revolver KV")}</span>
              </div>
            </div>
            <p className="text-xs text-zinc-400 font-light leading-relaxed mt-1">
              {t("承接 DNF 新职业上线发行视觉需求，完成双转职分支专属宣传 KV 落地。两套版式统一沿用项目既定红黑科技工装视觉体系，针对不同转职武器特征差异化构图；重火器版本以多管加特林作为视觉重心，强化火力压制的职业特质，添加枪口火花、弹壳飘落动态预留图层；左轮枪手版本采用西部牛仔构图，通过倾斜版式与枪焰细节塑造灵动利落的射手人设，两张 KV 同步规范字体层级、信息排布规则，可直接用于开服预热海报、APP 启动页、社群投放物料，完整适配新职业全渠道上线宣发。", "Taking on DNF's new class release visual needs, successfully executed dedicated promo KVs for dual class specializations. Both layouts inherit the established red-and-black tech-wear visual system, employing differentiated compositions based on unique weapon traits. The heavy firearm version emphasizes the multi-barrel Gatling as the visual center, reinforcing the suppressive fire characteristic, while reserving dynamic layers for muzzle flashes and falling shell casings. The revolver version uses a western cowboy composition, crafting an agile and sharp marksman persona through an angular layout and muzzle flare details. Both KVs concurrently standardise typography hierarchy and information arrangement rules, ready for server-launch hype posters, APP splash screens, and community drops, fully supporting omnichannel launch campaigns.")}
            </p>
          </div>

          <div className="flex flex-col gap-2 mt-4 px-2">
            <h6 className="text-xs font-medium text-zinc-400 capitalize">{t("第二组：方舟角色主题商业 KV 实战练习（战斗风格组）", "Group 2: Arknights Character Theme Promo KV Practice (Combat Style)")}</h6>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div className="flex flex-col gap-1.5">
                <div 
                  onClick={() => setLightboxUrl("/images/20260623214400307.webp")}
                  className="relative aspect-[3/4] md:aspect-auto rounded-none overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer"
                >
                  <img loading="lazy" decoding="async" src="/images/20260623214400307.webp" className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500" alt="维什戴尔干员战斗 KV" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-transparent group-hover:bg-black/20 transition-colors" />
                </div>
                <span className="text-[10px] text-zinc-500 text-center uppercase tracking-wider mt-0.5">{t("【图 27：维什戴尔干员战斗 KV】", "Img 27: Wis'adel Operator Combat KV")}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div 
                  onClick={() => setLightboxUrl("/images/20260623214418138.webp")}
                  className="relative aspect-[3/4] md:aspect-auto rounded-none overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer"
                >
                  <img loading="lazy" decoding="async" src="/images/20260623214418138.webp" className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500" alt="限定「余」国风KV" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-transparent group-hover:bg-black/20 transition-colors" />
                </div>
                <span className="text-[10px] text-zinc-500 text-center uppercase tracking-wider mt-0.5">{t("【图 28：限定「余」国风KV】", "Img 28: Shu Sino-Style Layout KV")}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div 
                  onClick={() => setLightboxUrl("/images/20260623214434057.webp")}
                  className="relative aspect-[3/4] md:aspect-auto rounded-none overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer"
                >
                  <img loading="lazy" decoding="async" src="/images/20260623214434057.webp" className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500" alt="MON3TR 近战干员 KV" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-transparent group-hover:bg-black/20 transition-colors" />
                </div>
                <span className="text-[10px] text-zinc-500 text-center uppercase tracking-wider mt-0.5">{t("【图 29：MON3TR 近战干员 KV】", "Img 29: Mon3tr Melee Operator KV")}</span>
              </div>
            </div>
            <p className="text-xs text-zinc-400 font-light leading-relaxed mt-1">
              {t("本组三张练习稿主打硬核战斗叙事风格，统一采用大尺寸切割英文标题、撕裂边框、破碎肌理包装版式，贴合手游高燃宣发调性。分别围绕空降突击、近战利刃、狼群伏击三种人设构思构图，把角色武器、特效、背景场景分层独立绘制，完整复刻商业游戏上线 KV 的信息层级排版逻辑，熟练掌握二次元头部游戏宣发物料的版式规范、氛围渲染与视觉冲击力塑造手法。", "This set of three practice layouts highlights a hardcore combat narrative style, commonly adopting large-scale sliced English titles, torn borders, and fractured texture packaging to match the high-octane marketing tone of mobile games. The compositions are designed around airborne assault, melee blade, and wolf pack ambush personas. By painting the character's weapon, effects, and backgrounds in isolated layers, the information hierarchy logic of commercial launch KVs is fully replicated, demonstrating mastery over layout standards, mood rendering, and visual impact techniques for top-tier Anime game promotion assets.")}
            </p>
          </div>

          <div className="flex flex-col gap-2 mt-4 px-2">
            <h6 className="text-xs font-medium text-zinc-400 capitalize">{t("第三组：方舟多风格 KV 拓展练习（国风 / 氛围感组）", "Group 3: Arknights Multi-style Promo KV Practice (Aesthetic / Mood)")}</h6>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div className="flex flex-col gap-1.5">
                <div 
                  onClick={() => setLightboxUrl("/images/20260623214452177.webp")}
                  className="relative aspect-[3/4] md:aspect-auto rounded-none overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer"
                >
                  <img loading="lazy" decoding="async" src="/images/20260623214452177.webp" className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500" alt="狼魂独奏主题角色 KV" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-transparent group-hover:bg-black/20 transition-colors" />
                </div>
                <span className="text-[10px] text-zinc-500 text-center uppercase tracking-wider mt-0.5">{t("【图 30：狼魂独奏主题角色 KV】", "Img 30: Wolf Spirit Solo Theme KV")}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div 
                  onClick={() => setLightboxUrl("/images/20260623214507440.webp")}
                  className="relative aspect-[3/4] md:aspect-auto rounded-none overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer"
                >
                  <img loading="lazy" decoding="async" src="/images/20260623214507440.webp" className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500" alt="花火古风氛围感 KV" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-transparent group-hover:bg-black/20 transition-colors" />
                </div>
                <span className="text-[10px] text-zinc-500 text-center uppercase tracking-wider mt-0.5">{t("【图 31：花火古风氛围感 KV】", "Img 31: Fireworks Classical Mood KV")}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div 
                  onClick={() => setLightboxUrl("/images/20260623214522000.webp")}
                  className="relative aspect-[3/4] md:aspect-auto rounded-none overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer"
                >
                  <img loading="lazy" decoding="async" src="/images/20260623214522000.webp" className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500" alt="流明水环境诗意 KV" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-transparent group-hover:bg-black/20 transition-colors" />
                </div>
                <span className="text-[10px] text-zinc-500 text-center uppercase tracking-wider mt-0.5">{t("【图 32：流明水环境诗意 KV】", "Img 32: Lumen Aquatic Poetic KV")}</span>
              </div>
            </div>
            <p className="text-xs text-zinc-400 font-light leading-relaxed mt-1">
              {t("拓展多风格视觉表达能力，覆盖国潮新春、暗调悬疑、诗意水景三类差异化画风。国风版融入传统巨龙、孔明灯、山水建筑中式元素，适配节日限定角色上线场景；后两张分别以暗紫雷电、深海云雾做环境烘托，依靠色调区分角色人设气质；全部练习稿严格遵循商用 KV 的角色主体占比、文案分区、星级标注、CV 信息栏标准化布局，实现不同题材、不同画风下版式规范统一，完整沉淀二次元游戏角色 KV 全风格设计方法论。", "Expanding multi-style visual expression capabilities, covering national-trend Lunar New Year, dark suspense, and poetic waterscapes. The aesthetic version incorporates traditional dragons, Kongming lanterns, and landscape architecture to suit limited festive character drops; the latter two rely on dark purple lightning and deep-sea nebulae to contrast character temperaments using distinct color palettes. All practice KVs strictly adhere to standard commercial layout proportions for character coverage, copy zones, rarity star markers, and CV info blocks. This achieves uniform layout standards across diverse subjects and art styles, fully solidifying the design methodology for Anime game character KVs.")}
            </p>
          </div>


        </div>
      </div>

      {/* 五、AIGC 辅助设计能力沉淀 */}
      <div className="p-4 rounded-none border border-white/5 bg-white/[0.01] flex flex-col gap-3.5">
        <h5 className="text-xs md:text-sm font-semibold text-zinc-100 flex items-center gap-2 border-b border-white/5 pb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-300 shrink-0" />
          {t("五、AIGC 辅助设计能力沉淀", "V. Standardized AIGC Game Design Pipelines")}
        </h5>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs md:text-sm leading-relaxed text-zinc-300 font-light">
          <div className="p-3 rounded-none bg-white/[0.005] border border-white/5">
            <strong className="text-white block mb-0.5">{t("前期灵感与场景草图敏捷生成", "1. Creative Drafting & Scene Exploration")}</strong>
            <p className="text-[11px] text-zinc-400">
              {t("通过 Midjourney+ComfyUI 构建关键词与构图控制矩阵，快速产出不同视角的场景概念和版式草图，显著压缩前期创意构思周期。", "Build precise prompt and composition controls to generate scene concepts and layout drafts quickly, shortening early ideation cycles.")}
            </p>
          </div>
          <div className="p-3 rounded-none bg-white/[0.005] border border-white/5">
            <strong className="text-white block mb-0.5">{t("元素优化与风格体系统一", "2. Vector Extraction & Uniform Style")}</strong>
            <p className="text-[11px] text-zinc-400">
              {t("利用矢量工具与本地端修型工作，剔除 AI 生成物中的杂乱噪点，统一角色、场景的材质、色彩和光影，使视觉风格满足商业落地规范。", "Refine generated assets locally, removing artifacts and unifying material, color, and lighting for production-ready visual consistency.")}
            </p>
          </div>
          <div className="p-3 rounded-none bg-white/[0.005] border border-white/5">
            <strong className="text-white block mb-0.5">{t("高精密手绘修图与商业化", "3. Manual Refinement & Compliance")}</strong>
            <p className="text-[11px] text-zinc-400">
              {t("在 AI 高能底稿的基础之上进行手绘精修，强化人物骨骼肌理及材质光影物理映射，完美规避生成式算法的不确定缺陷。", "Incorporate professional human-painter touchups over latent iterations, adjusting local shading to meet strict user interface standards.")}
            </p>
          </div>
          <div className="p-3 rounded-none bg-white/[0.005] border border-white/5">
            <strong className="text-white block mb-0.5">{t("动态内容低成本高产出", "4. Advanced Morphing & Video Flow")}</strong>
            <p className="text-[11px] text-zinc-455">
              {t("搭建全套 AI 生成帧过度算法工作流，利用关键帧自适应融合完成爆流动态图库，突破了传统序列帧绘制的成本壁垒。", "Create a standardized motion generator queue based on source images, reducing active studio time while maximizing loop-friendly assets.")}
            </p>
          </div>
        </div>
      </div>

      {/* 六、主要工作内容 */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 border-b border-white/5 pb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-300" />
          <h4 className="text-sm md:text-base uppercase tracking-[0.1em] font-bold text-white/95">
            {t("六、主要工作内容", "VI. Summary of Core Contributions")}
          </h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs md:text-sm font-light">
          <div className="flex gap-2 p-3 bg-white/[0.01] border border-white/5 rounded-none">
            <span className="text-sky-400 font-mono text-xs font-semibold">01</span>
            <div className="flex flex-col">
              <span className="text-zinc-100 font-medium">{t("游戏品牌视觉体系搭建", "Branding Design Systems")}</span>
              <p className="text-xs text-zinc-400 mt-0.5">{t("负责安徒恩版本核心底图、关键概念主视觉设计与规范整理。", "Developed the Anton expansion's core visual assets, key concepts, and design guidelines.")}</p>
            </div>
          </div>
          <div className="flex gap-2 p-3 bg-white/[0.01] border border-white/5 rounded-none">
            <span className="text-sky-400 font-mono text-xs font-semibold">02</span>
            <div className="flex flex-col">
              <span className="text-zinc-100 font-medium">{t("AIGC 新兴流程赋能提效", "Generative Workflow Integration")}</span>
              <p className="text-xs text-zinc-400 mt-0.5">{t("熟练融入生图/AI动效算法，搭建高鲁棒性模板，使平均场景草图和后期生成周期缩短60%以上。", "Applied stable AI algorithms and ComfyUI workflow queues, delivering a 60% compression in general production iterations.")}</p>
            </div>
          </div>
          <div className="flex gap-2 p-3 bg-white/[0.01] border border-white/5 rounded-none">
            <span className="text-sky-400 font-mono text-xs font-semibold">03</span>
            <div className="flex flex-col">
              <span className="text-zinc-100 font-medium">{t("多线、多IP跨界协同", "Cross-IP Joint Contributions")}</span>
              <p className="text-xs text-zinc-400 mt-0.5">{t("支持 QQ 炫舞社区卡牌生图、明日方舟及集团员工大会趣味周边探索，沉淀可复用品牌美学档案。", "Supported high-impact projects including QQ Dance mobile cards, Arknights promos, and IEG badges.")}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
