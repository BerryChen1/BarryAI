import React, { useState } from 'react';
import { 
  Sparkles, TrendingUp, Users, Eye, Layers, Film, Hammer, 
  CheckCircle, Zap, ShieldAlert, Workflow, Video, Image as ImageIcon, 
  Tv, Compass, Award, Star, Cpu, ArrowRight, BookOpen, Clock, 
  ChevronRight, Play, Terminal, HelpCircle, MonitorPlay
} from 'lucide-react';
import { CustomVideoPlayer } from './CustomVideoPlayer';

interface TikTokDetailProps {
  language: 'zh' | 'en';
  t: (zh: any, en: any) => any;
  setLightboxUrl: (url: string | null) => void;
}

// Reusable Image Slot Component ensuring every placeholder is reserved and interactive
interface ImageSlotProps {
  src?: string;
  alt: string;
  label: string;
  subLabel?: string;
  aspectRatio?: string;
  className?: string;
  fitMode?: 'cover' | 'contain' | 'auto';
  onClickImage?: () => void;
  setLightboxUrl: (url: string | null) => void;
}

const ImageSlot: React.FC<ImageSlotProps> = ({
  src,
  alt,
  label,
  subLabel,
  aspectRatio = 'aspect-auto',
  className = '',
  fitMode = 'auto',
  setLightboxUrl
}) => {
  const hasValidSrc = src && src.trim().length > 0 && !src.includes('placeholder-reserved');

  return (
    <div 
      onClick={() => {
        if (hasValidSrc) {
          setLightboxUrl(src);
        }
      }}
      className={`group relative rounded-xl overflow-hidden border border-white/10 bg-black/40 hover:border-sky-500/40 transition-all duration-300 ${hasValidSrc ? 'cursor-pointer' : 'cursor-default'} ${className}`}
    >
      <div className={`w-full ${aspectRatio !== 'aspect-auto' ? aspectRatio : ''} flex flex-col items-center justify-center relative overflow-hidden`}>
        {hasValidSrc ? (
          <>
            <img 
              src={src} 
              alt={alt} 
              className={`w-full h-auto max-h-[85vh] ${fitMode === 'cover' ? 'h-full object-cover' : 'object-contain'} group-hover:scale-[1.01] transition-transform duration-500`}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3 pointer-events-none">
              <span className="text-xs text-white/90 font-medium truncate drop-shadow">{label}</span>
              <span className="text-[10px] bg-sky-500/90 text-white px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                <Eye className="w-3 h-3" /> 查看原图
              </span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center gap-2 relative z-10 w-full min-h-[140px] p-4 bg-black/40 hover:bg-sky-950/10 hover:border-sky-400/30 transition-colors">
            <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sky-400 group-hover:scale-110 group-hover:bg-sky-500/10 transition-all">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-semibold text-zinc-200 tracking-wide">{label}</span>
              {subLabel && <span className="text-[11px] text-zinc-400 font-mono">{subLabel}</span>}
            </div>
            <div className="mt-1 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-zinc-400 font-mono tracking-tight">
              留图槽位 · 待置入图片
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export function TikTokDetail({ language, t, setLightboxUrl }: TikTokDetailProps) {
  // Configurable Image Slots Map (Users can later populate exact CDN URLs here)
  const [imageMap] = useState<Record<string, string>>({
    // Part 1: AI Short Drama
    sevenStepsFlowchart: "/images/20260823000614377.webp",
    sevenStepsOperationStep: "/images/20260823000723178.webp",
    posterBefore: "/images/20260823000749724.webp",
    posterAfter: "/images/20260823000809612.webp",
    encapsulatedWorkflow1: "/images/20260823001152779.webp",
    encapsulatedWorkflow2: "/images/20260823001325012.webp",
    encapsulatedWorkflow3: "/images/20260823001335882.webp",
    encapsulatedWorkflow4: "/images/20260823001350298.webp",
    encapsulatedWorkflow5: "/images/20260823001401307.webp",
    tikTokDramaAccount1: "/images/20260823001418561.webp",
    tikTokDramaAccount2: "/images/20260823001431959.webp",
    step1Flowchart1: "/images/20260823001446451.webp",
    step1Flowchart2: "/images/20260823001507538.webp",
    step2Flowchart1: "/images/20260823001518936.webp",
    step2Flowchart2: "/images/20260823001531193.webp",
    step3Workflow: "/images/20260823001549163.webp",
    step3AssetChar1: "/images/20260823001653241.webp",
    step3AssetChar2: "/images/20260823001704016.webp",
    step3AssetChar3: "/images/20260823001714194.webp",
    step3AssetSceneProp1: "/images/20260823001856907.webp",
    step3AssetSceneProp2: "/images/20260823001907318.webp",
    step4Workflow: "/images/20260823001957652.webp",
    step4EmotionCurve: "/images/20260823002030902.webp",
    step5Workflow: "/images/20260823002101029.webp",
    step5Storyboards: "/images/20260823002116107.webp",
    step6PromptSample: "/images/20260823002153746.webp",
    step7Workflow: "/images/20260823002455683.webp",
    step7PosterResult: "/images/20260823002523720.webp",

    // Part 2: AI Visual
    caseUSWinter: "/images/20260823004513076.webp",
    caseUSRanking: "/images/20260823004534552.webp",
    caseUSHalloween: "/images/20260823004543750.webp",
    caseBRStar: "/images/20260823004554431.webp",
    caseJPInvite: "/images/20260823004603275.webp",
    caseIPExtend: "/images/20260823004611443.webp",
    workflowOpsFourSteps: "/images/20260823004722116.webp",
    workflowHalloweenCase: "/images/20260823004740729.webp",
    workflowIPFourSteps: "/images/20260823004803580.webp",
    workflowTitleThreeSteps: "/images/20260823004814650.webp",
    modelSeedream3D: "/images/20260823004827027.webp",
    modelSeedreamIllust: "/images/20260823004836994.webp",
    modelSeedream4Style: "/images/20260823004903227.webp",
    modelSeedream4Lineart: "/images/20260823004911977.webp",
    modelTipFastGen: "/images/20260823004922930.webp",
    modelTipFaceChange: "/images/20260823004932069.webp",
    modelTipSceneChange: "/images/20260823004941682.webp",
    promptI2TInvert: "/images/20260823004955434.webp",
    promptI2TCompare: "/images/20260823005006558.webp",
    promptStructure3D: "/images/20260823005015538.webp",
    promptCrateFlow: "/images/20260823005030277.webp",
    promptCrateNodeFireplace: "/images/20260823005038132.webp",
    promptCrateToucan: "/images/20260823005046371.webp",

    // Part 3: Community Ops
    communityPlacement1: "/images/20260823005642828.webp",
    communityPlacement2: "/images/20260823005650942.webp",
    communityPlacement3: "/images/20260823005700451.webp",
  });

  return (
    <div className="flex flex-col gap-10 text-zinc-350 font-sans">
      
      {/* Title & Metadata Panel */}
      <div className="p-5 sm:p-8 rounded-2xl md:rounded-3xl border border-white/5 bg-white/[0.01] flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-sky-400 tracking-wider font-mono font-semibold uppercase">
            {t("字节跳动抖音集团 · 业务履历", "ByteDance Douyin Group • Business Track Record")}
          </span>
          <div className="flex flex-col gap-1">
            <h4 className="text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-wide">
              {t("AIGC工作流设计 / AI短剧内容迭代优化 / SOP沉淀", "AIGC Workflow Design / AI Drama Iteration / SOP Formalization")}
            </h4>
            <div className="text-sm md:text-base lg:text-lg font-medium text-zinc-300 tracking-wide">
              {t("/ 视觉项目支持 / TikTok Crate社区运营支持", "/ Visual Support / TikTok Crate Community Ops Support")}
            </div>
          </div>
        </div>
        
        {/* Metadata Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4 text-sm sm:text-base border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-zinc-500 text-xs uppercase tracking-wider">{t("公司", "Company")}</span>
            <span className="text-zinc-200 font-light mt-0.5">{t("字节跳动 TikTok-Design-Creative", "ByteDance TikTok-Design-Creative")}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-zinc-500 text-xs uppercase tracking-wider">{t("实习时间", "Internship Period")}</span>
            <span className="text-zinc-200 font-light mt-0.5">{t("2026.07 — 至今", "July 2026 — Present")}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-zinc-500 text-xs uppercase tracking-wider">{t("地点", "Location")}</span>
            <span className="text-zinc-200 font-light mt-0.5">{t("北京", "Beijing, China")}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-zinc-500 text-xs uppercase tracking-wider">{t("职位", "Position")}</span>
            <span className="text-zinc-200 font-light mt-0.5">
              {t("多媒体设计（AIGC短剧方向）", "Multimedia Design (AIGC Short Drama Focus)")}
            </span>
          </div>
          <div className="flex flex-col sm:col-span-2">
            <span className="text-zinc-500 text-xs uppercase tracking-wider">{t("团队", "Team")}</span>
            <span className="text-zinc-200 font-light mt-0.5">
              {t("TikTok-Design-Creative", "TikTok-Design-Creative")}
            </span>
          </div>
        </div>
      </div>

      {/* 项目背景与我的角色 */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2.5 border-b border-white/5 pb-3">
          <span className="w-2 h-2 rounded-full bg-sky-300" />
          <h4 className="text-base md:text-lg lg:text-xl uppercase tracking-[0.1em] font-bold text-white/95">
            {t("项目背景与我的角色", "Project Background & Role")}
          </h4>
        </div>
        <div className="space-y-4 text-sm sm:text-base md:text-lg leading-[1.8] font-light text-justify text-zinc-200">
          <p>
            {t(
              "TikTok Crate 是字节内部的一站式 AI 创作平台（涵盖文生图 / 图生图 / 视频 / 工作流编排）。我的工作主要集中在AI短剧，贯穿「工作流设计 → SOP 沉淀 → TikTok Crate 社区运营支持」三个核心环节：不仅要跑通单点视觉与视频效果，更要把零散的 AIGC 技巧提炼为团队可复用的生产标准，并推动其在业务侧真正落地。",
              "TikTok Crate is ByteDance's internal all-in-one AI creation platform (Text-to-Image / Image-to-Image / Video / Workflow Orchestration). My work focused on AI Short Dramas, spanning 'Workflow Design → SOP Formalization → TikTok Crate Community Operations Support': aiming not merely to unlock individual visual highlights, but to refine fragmented AIGC techniques into reusable team production standards and drive real-world business adoption."
            )}
          </p>
        </div>

        {/* 架构组成 Bento Cards: Part 1 左侧占一半最大，Part 2 & Part 3 右侧上下分两层，三者皆具蓝色描边 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Part 1 (Left 50% - Largest) */}
          <div className="p-6 rounded-2xl border border-sky-500/30 bg-gradient-to-br from-sky-500/[0.08] via-sky-500/[0.03] to-transparent flex flex-col justify-between gap-5 transition-all duration-300 hover:border-sky-400/50">
            <div className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  Part 1 · 核心
                </span>
                <Film className="w-5 h-5 text-sky-400" />
              </div>
              <h5 className="text-lg sm:text-xl font-bold text-white tracking-wide">AI 短剧生产体系</h5>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                <strong className="text-sky-300 font-semibold">解决：</strong>如何用 AI 稳定、批量地生产电影级竖屏短剧，而不是一次性 demo。<br/>
                <strong className="text-sky-300 font-semibold">产出：</strong>七步协同工作流 + 五条硬约束 SOP（深度优化迭代）。
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-sky-500/20 text-[11px] text-sky-200 font-mono">
              <span className="px-2.5 py-0.5 rounded-full bg-sky-500/15 border border-sky-400/30">30+ 集电影级</span>
              <span className="px-2.5 py-0.5 rounded-full bg-sky-500/15 border border-sky-400/30">适配 seedance2.5</span>
              <span className="px-2.5 py-0.5 rounded-full bg-sky-500/15 border border-sky-400/30">全链路 7 步协同</span>
            </div>
          </div>

          {/* Right Column: Part 2 & Part 3 stacked vertically in 2 layers */}
          <div className="flex flex-col gap-4">
            {/* Part 2 */}
            <div className="p-5 rounded-2xl border border-sky-500/30 bg-sky-500/[0.03] flex flex-col gap-2.5 flex-1 transition-all duration-300 hover:border-sky-400/50">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  Part 2 · 支持
                </span>
                <Layers className="w-4 h-4 text-sky-400" />
              </div>
              <h5 className="text-base font-bold text-white">AI 视觉设计赋能</h5>
              <p className="text-xs text-zinc-400 leading-relaxed">
                <strong className="text-zinc-200">解决：</strong>如何让运营视觉设计提效数倍，同时保证高品质与资产一致性。<br/>
                <strong className="text-zinc-200">产出：</strong>三条生产工作流 + 模型选型方法论 + Prompt 结构化方法论。
              </p>
            </div>

            {/* Part 3 */}
            <div className="p-5 rounded-2xl border border-sky-500/30 bg-sky-500/[0.03] flex flex-col gap-2.5 flex-1 transition-all duration-300 hover:border-sky-400/50">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  Part 3 · 支持
                </span>
                <Users className="w-4 h-4 text-sky-400" />
              </div>
              <h5 className="text-base font-bold text-white">TikTok Crate 社区运营支持</h5>
              <p className="text-xs text-zinc-400 leading-relaxed">
                <strong className="text-zinc-200">解决：</strong>如何让工作流从「我会用」变成「团队都在用」。<br/>
                <strong className="text-zinc-200">产出：</strong>日常运营 + 活动运营的内容分发与资产沉淀体系。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PART 1 · AI 短剧：从一份剧本到电影级短剧 */}
      {/* ========================================================================= */}
      <div className="flex flex-col gap-8 pt-4 border-t border-white/10">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
              CORE SYSTEM
            </span>
            <span className="text-xs font-mono text-zinc-400">PART 01</span>
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-wide">
            {t("Part 1 · AI 短剧：从一份剧本到电影级短剧", "Part 1 • AI Short Drama: From a Single Script to Cinematic Episodes")}
          </h3>
          
          {/* USER SPECIFIED HIGHLIGHT: 适配 seedance2.5 模型新版本 */}
          <div className="mt-2 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-sky-950/60 via-sky-900/30 to-transparent border border-sky-400/30 text-sky-200 text-xs sm:text-sm font-medium">
            <Sparkles className="w-4 h-4 text-sky-400 animate-pulse" />
            <span>全面适配 <strong className="text-white font-semibold">seedance2.5</strong> 模型新版本，大幅优化复杂运动轨迹与镜头时间一致性</span>
          </div>
        </div>

        {/* ▍ 一、总览：七步协同工作流 */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2 border-b border-white/5 pb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-300" />
            <h4 className="text-base sm:text-lg uppercase tracking-[0.1em] font-bold text-white/95">
              {t("一、总览：七步协同工作流", "I. Overview: Seven-Step Collaborative Workflow")}
            </h4>
          </div>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
            主链路自左向右推进：从剧本出发，Step1 拆解后分成资产图库线（Step2 → Step3）与分镜细纲线（Step4），两线在 Step5 分镜汇合，再到 Step6 视频提示词；Step7 海报可在资产就绪后单独产出。
          </p>

          {/* 流程图 Flowchart */}
          <ImageSlot 
            src={imageMap.sevenStepsFlowchart}
            alt="七步协同工作流全景图 (Flowchart)"
            label="七步协同工作流全景图 (Flowchart)"
            subLabel="Step 1 拆解 → 资产线 / 细纲线 → Step 5 汇合 → Step 6 提示词 → Step 7 海报"
            aspectRatio="aspect-auto"
            fitMode="contain"
            setLightboxUrl={setLightboxUrl}
          />

          {/* 操作步骤插图 */}
          <div className="flex flex-col gap-2 pt-1">
            <span className="text-xs text-sky-300 font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" /> 操作步骤：最左侧填入剧本信息，按顺序依次点击标注框中的内容（Step 7 海报也可在 Step 3 之后生成）
            </span>
            <ImageSlot 
              src={imageMap.sevenStepsOperationStep}
              alt="操作步骤图" 
              label="操作步骤说明与界面推进标注" 
              subLabel="填入剧本信息并依次点击标注框"
              aspectRatio="aspect-auto"
              fitMode="contain"
              setLightboxUrl={setLightboxUrl}
            />
          </div>

          {/* 一句话理解每一步 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-lg border border-white/5 bg-white/[0.02] flex flex-col gap-1">
              <span className="font-mono text-sky-400 font-bold">Step 1 · 剧本适配拆解</span>
              <p className="text-zinc-400">把原始剧本改写成可开拍的演绎剧底稿。</p>
            </div>
            <div className="p-3 rounded-lg border border-white/5 bg-white/[0.02] flex flex-col gap-1">
              <span className="font-mono text-sky-400 font-bold">Step 2 · 资产信息提取</span>
              <p className="text-zinc-400">从底稿中抽取人物、场景、道具结构化信息。</p>
            </div>
            <div className="p-3 rounded-lg border border-white/5 bg-white/[0.02] flex flex-col gap-1">
              <span className="font-mono text-sky-400 font-bold">Step 3 · 资产图库搭建</span>
              <p className="text-zinc-400">把资产生成为统一风格、可反复调用的图库。</p>
            </div>
            <div className="p-3 rounded-lg border border-white/5 bg-white/[0.02] flex flex-col gap-1">
              <span className="font-mono text-sky-400 font-bold">Step 4 · 剧本细纲</span>
              <p className="text-zinc-400">把底稿拆成逐集、逐 Beat 的叙事细纲。</p>
            </div>
            <div className="p-3 rounded-lg border border-white/5 bg-white/[0.02] flex flex-col gap-1">
              <span className="font-mono text-sky-400 font-bold">Step 5 · 剧本分镜</span>
              <p className="text-zinc-400">把细纲落成逐镜分镜（含 i2v 首帧锚定）。</p>
            </div>
            <div className="p-3 rounded-lg border border-white/5 bg-white/[0.02] flex flex-col gap-1">
              <span className="font-mono text-sky-400 font-bold">Step 6 · 视频提示词</span>
              <p className="text-zinc-400">把分镜翻译成可直接生成视频的镜头提示词。</p>
            </div>
            <div className="p-3 rounded-lg border border-white/5 bg-white/[0.02] flex flex-col gap-1">
              <span className="font-mono text-sky-400 font-bold">Step 7 · 剧集海报</span>
              <p className="text-zinc-400">把关键信息与角色资产凝练成剧集封面词。</p>
            </div>
            <div className="p-3 rounded-lg border border-sky-500/20 bg-sky-500/[0.03] flex flex-col justify-center">
              <span className="text-[11px] text-sky-300 font-mono">⚡ 操作规则：最左侧填入剧本信息，依次点击标注框推进</span>
            </div>
          </div>
        </div>

        {/* ▍ 成片效果: 优化前后的直观对比 */}
        <div className="p-5 sm:p-7 rounded-2xl border border-white/10 bg-white/[0.015] flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Tv className="w-4 h-4 text-sky-400" />
              {t("成片效果：优化前后的直观对比", "Film Outcomes: Direct Comparison Before & After Optimization")}
            </h4>
            <span className="text-xs text-zinc-400 font-mono">质量地基全面升级</span>
          </div>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
            {t(
              "先看结果——同一套工作流迭代前后，海报质感与成片观感被系统性抬高。优化后 = 原 Step1–Step7 骨架 + 五条贯穿全流程的硬约束。产能不变（仍自动产出 60+ 集），但质量地基被系统性抬高：从“能跑通” → “电影级 + 强一致 + 活人感”。",
              "Looking at the results—before and after workflow iteration, poster texture and video aesthetics were systematically elevated. After optimization maintains the Step 1-7 skeleton with five hard constraints throughout. Production capacity remains constant (60+ auto-generated episodes), but quality foundation is transformed from 'functional' to 'cinematic + highly consistent + alive'."
            )}
          </p>

          {/* Poster Comparison Grid (2 Slots) */}
          <div className="flex flex-col gap-2">
            <span className="text-xs text-zinc-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-sky-400" /> 海报对比（左：优化前 · 右：优化后）
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ImageSlot 
                src={imageMap.posterBefore}
                alt="海报优化前" 
                label="海报 (优化前)" 
                subLabel="质感偏塑料 / 平面化"
                aspectRatio="aspect-auto"
                fitMode="contain"
                setLightboxUrl={setLightboxUrl}
              />
              <ImageSlot 
                src={imageMap.posterAfter}
                alt="海报优化后" 
                label="海报 (优化后)" 
                subLabel="高级剧集写实质感 / 风格锚点锁定"
                aspectRatio="aspect-auto"
                fitMode="contain"
                setLightboxUrl={setLightboxUrl}
              />
            </div>
          </div>

          {/* Episode Video Comparison Slots */}
          <div className="flex flex-col gap-2 pt-2">
            <span className="text-xs text-zinc-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5 text-sky-400" /> 剧集成片对比（左：优化前 · 右：优化后）
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2 rounded-xl p-3 border border-white/10 bg-black/40">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span>优化前成片 demo</span>
                  <span className="font-mono text-[10px] text-zinc-400">3.mp4</span>
                </div>
                <CustomVideoPlayer 
                  src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/douyin%20shortdrama/3.mp4" 
                  language={language}
                  aspectRatio="aspect-[9/16]" 
                />
              </div>
              <div className="flex flex-col gap-2 rounded-xl p-3 border border-sky-500/30 bg-sky-950/10">
                <div className="flex items-center justify-between text-xs text-sky-300">
                  <span className="font-semibold">优化后成片 (适配 seedance2.5)</span>
                  <span className="font-mono text-[10px] text-sky-400">4.mp4</span>
                </div>
                <CustomVideoPlayer 
                  src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/douyin%20shortdrama/4.mp4" 
                  language={language}
                  aspectRatio="aspect-[9/16]" 
                />
              </div>
            </div>
          </div>

          {/* 五条硬约束 SOP 详解 */}
          <div className="flex flex-col gap-3 pt-4 border-t border-white/5">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              {t("五条硬约束 SOP 核心支撑（篇幅从 3 万字扩充至 5.8 万字）", "5 Core Hard Constraint SOPs (Expanded from 30K to 58K Words)")}
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-lg border border-white/5 bg-white/[0.02] flex flex-col gap-1.5">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  1. 去油腻 · 直出电影感
                </div>
                <p className="text-zinc-400 leading-relaxed">
                  确立全片唯一「风格锚点 / 美术圣经」，在 Step3/6/7 强制追加为固定风格后缀，配置防塑料、防油腻正负向词。
                </p>
              </div>

              <div className="p-3.5 rounded-lg border border-white/5 bg-white/[0.02] flex flex-col gap-1.5">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  2. 一致性锁定五大机制
                </div>
                <p className="text-zinc-400 leading-relaxed">
                  新增空间坐标锁、色光锁、首镜复用、180° 轴线、连续性台账，锁死脸型、空间布局、机位与核心道具。
                </p>
              </div>

              <div className="p-3.5 rounded-lg border border-white/5 bg-white/[0.02] flex flex-col gap-1.5">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  3. 分镜节奏重构
                </div>
                <p className="text-zinc-400 leading-relaxed">
                  从 4 Beat×15s 改为 2 Beat×30s；总词量不变，单 Beat 密度翻倍（80–100 词、10–20 镜、≥6 次切镜、3–4 轮对白）。
                </p>
              </div>

              <div className="p-3.5 rounded-lg border border-white/5 bg-white/[0.02] flex flex-col gap-1.5">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  4. 表演“活人感”
                </div>
                <p className="text-zinc-400 leading-relaxed">
                  逐时刻描写不规律眨眼、微表情、呼吸喉结瞳孔微动、无意识小动作；情绪写成过程曲线而非单一标签。
                </p>
              </div>

              <div className="p-3.5 rounded-lg border border-white/5 bg-white/[0.02] flex flex-col gap-1.5 md:col-span-2">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  5. 物理逻辑 + 本土化 + 台词不重叠
                </div>
                <p className="text-zinc-400 leading-relaxed">
                  锁死踹门/受力/进出方向物理可信；台词母语地道无翻译腔；对白一次仅一人说不抢话；立下“物理逻辑 &gt; 风格”铁律。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 封装后的平台工作流程与操作界面（五张：上两张下三张） */}
        <div className="flex flex-col gap-3">
          <span className="text-xs text-zinc-400 font-mono uppercase tracking-wider">
            封装后的平台工作流程与操作界面
          </span>
          <div className="flex flex-col gap-3">
            {/* 上两张 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <ImageSlot 
                src={imageMap.encapsulatedWorkflow1}
                alt="Crate 平台封装工作流截图 1" 
                label="Crate 工作流主看板" 
                subLabel="多节点全景概览"
                aspectRatio="aspect-auto"
                fitMode="contain"
                setLightboxUrl={setLightboxUrl}
              />
              <ImageSlot 
                src={imageMap.encapsulatedWorkflow2}
                alt="Crate 平台封装工作流截图 2" 
                label="剧本自动化解析与提示词派发" 
                subLabel="批量多节点自动流转"
                aspectRatio="aspect-auto"
                fitMode="contain"
                setLightboxUrl={setLightboxUrl}
              />
            </div>
            {/* 下三张 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <ImageSlot 
                src={imageMap.encapsulatedWorkflow3}
                alt="Crate 平台封装工作流截图 3" 
                label="资产库一键关联" 
                subLabel="多维度质量控制"
                aspectRatio="aspect-auto"
                fitMode="contain"
                setLightboxUrl={setLightboxUrl}
              />
              <ImageSlot 
                src={imageMap.encapsulatedWorkflow4}
                alt="Crate 平台封装工作流截图 4" 
                label="分镜节点编排" 
                subLabel="链式提示词自动化组织"
                aspectRatio="aspect-auto"
                fitMode="contain"
                setLightboxUrl={setLightboxUrl}
              />
              <ImageSlot 
                src={imageMap.encapsulatedWorkflow5}
                alt="Crate 平台封装工作流截图 5" 
                label="生视频监视与质检" 
                subLabel="多版本批量快速迭代"
                aspectRatio="aspect-auto"
                fitMode="contain"
                setLightboxUrl={setLightboxUrl}
              />
            </div>
          </div>

          {/* TikTok 短剧账号展示 Slots (两张) */}
          <div className="flex flex-col gap-2 pt-2">
            <span className="text-xs text-zinc-400 font-mono uppercase tracking-wider">
              TikTok 短剧账号及发布矩阵
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <ImageSlot 
                src={imageMap.tikTokDramaAccount1}
                alt="TikTok 短剧账号矩阵 1" 
                label="TikTok 短剧账号主页 01" 
                subLabel="海外短剧矩阵发布与数据转化"
                aspectRatio="aspect-auto"
                fitMode="contain"
                setLightboxUrl={setLightboxUrl}
              />
              <ImageSlot 
                src={imageMap.tikTokDramaAccount2}
                alt="TikTok 短剧账号矩阵 2" 
                label="TikTok 短剧账号主页 02" 
                subLabel="剧集单集播放与评论互动表现"
                aspectRatio="aspect-auto"
                fitMode="contain"
                setLightboxUrl={setLightboxUrl}
              />
            </div>
          </div>
        </div>

        {/* ▍ 二、逐步 SOP (Step 1 to Step 7) */}
        <div className="flex flex-col gap-8 pt-4">
          <div className="flex items-center gap-2 border-b border-white/5 pb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-300" />
            <h4 className="text-base sm:text-lg uppercase tracking-[0.1em] font-bold text-white/95">
              {t("二、逐步 SOP 深度解析", "II. Step-by-Step SOP Deep Dive")}
            </h4>
          </div>

          {/* Step 1 */}
          <div className="p-5 sm:p-7 rounded-2xl border border-white/10 bg-white/[0.015] flex flex-col gap-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-mono text-xs font-bold">Step 1</span>
                <h5 className="text-base sm:text-lg font-bold text-white">剧本适配拆解</h5>
              </div>
              <span className="text-xs text-zinc-400 font-mono">输入：原始剧本 → 产出：可开拍底稿</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="space-y-2">
                <div className="font-semibold text-zinc-200">关键动作：</div>
                <ul className="list-disc list-inside space-y-1 text-zinc-400 font-light leading-relaxed">
                  <li>通读原始剧本，识别主线冲突、核心人物关系与情绪钩子。</li>
                  <li>按短剧节奏重组：强开场、密集反转、每集留悬念。</li>
                  <li>统一人物称谓、场景命名、时间线，消除歧义与前后矛盾。</li>
                  <li>产出“可开拍的演绎剧底稿”——后续所有步骤的唯一事实来源。</li>
                </ul>
              </div>
              <div className="space-y-2">
                <div className="font-semibold text-zinc-200">质量红线 & 关联关系：</div>
                <p className="text-zinc-400 font-light leading-relaxed">
                  <strong className="text-rose-300">红线：</strong>底稿必须自洽（人物、时间、空间无矛盾）；不得偏离原作核心设定；称谓与场景命名全篇统一。<br/>
                  <strong className="text-sky-300">关联：</strong>向 Step2 资产提取与 Step4 细纲提供底稿。底稿一旦定稿，后续步骤不得私自新增设定。
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <span className="text-xs text-zinc-400 font-mono">工作流示例（长篇叙事压成可开拍底稿 · 两图展示）：</span>
              <div className="flex flex-col gap-4">
                <ImageSlot 
                  src={imageMap.step1Flowchart1}
                  alt="Step 1 剧本拆解流程图 1" 
                  label="Step 1 剧本拆解与情绪曲线重组图 01" 
                  subLabel="长篇剧本结构化提取"
                  aspectRatio="aspect-auto"
                  fitMode="contain"
                  setLightboxUrl={setLightboxUrl}
                />
                <ImageSlot 
                  src={imageMap.step1Flowchart2}
                  alt="Step 1 剧本拆解流程图 2" 
                  label="Step 1 剧本拆解与情绪曲线重组图 02" 
                  subLabel="单场景 25 镜底稿输出"
                  aspectRatio="aspect-auto"
                  fitMode="contain"
                  setLightboxUrl={setLightboxUrl}
                />
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-5 sm:p-7 rounded-2xl border border-white/10 bg-white/[0.015] flex flex-col gap-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-mono text-xs font-bold">Step 2</span>
                <h5 className="text-base sm:text-lg font-bold text-white">资产信息提取</h5>
              </div>
              <span className="text-xs text-zinc-400 font-mono">输入：底稿 → 产出：人物 / 场景 / 道具结构化清单</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="space-y-2">
                <div className="font-semibold text-zinc-200">关键动作：</div>
                <ul className="list-disc list-inside space-y-1 text-zinc-400 font-light leading-relaxed">
                  <li>逐场扫描底稿，提取全部出场人物及其外貌、年龄感、气质与专属记忆点。</li>
                  <li>提取关键场景（空间结构、光线氛围）与关键道具细节。</li>
                  <li>为每个资产建立稳定描述条目，供 Step3 生图与后续步骤反复引用。</li>
                </ul>
              </div>
              <div className="space-y-2">
                <div className="font-semibold text-zinc-200">质量红线 & 关联关系：</div>
                <p className="text-zinc-400 font-light leading-relaxed">
                  <strong className="text-rose-300">红线：</strong>每个角色必须有独有“一眼记忆点”；资产描述与底稿一致；角色名严禁翻译、全流程绝对一致。<br/>
                  <strong className="text-sky-300">关联：</strong>产出的角色资产既喂给 Step3 生成图库，又被 Step7 海报调用，保证同一张脸全程不漂移。
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <span className="text-xs text-zinc-400 font-mono">工作流示例（EP1 底稿结构化信息抽取 · 两图展示）：</span>
              <div className="flex flex-col gap-4">
                <ImageSlot 
                  src={imageMap.step2Flowchart1}
                  alt="Step 2 资产信息抽取流程图 1" 
                  label="Step 2 资产信息结构化抽取工作流 01" 
                  subLabel="角色特征与记忆点抽取"
                  aspectRatio="aspect-auto"
                  fitMode="contain"
                  setLightboxUrl={setLightboxUrl}
                />
                <ImageSlot 
                  src={imageMap.step2Flowchart2}
                  alt="Step 2 资产信息抽取流程图 2" 
                  label="Step 2 资产信息结构化抽取工作流 02" 
                  subLabel="场景空间与核心道具清单"
                  aspectRatio="aspect-auto"
                  fitMode="contain"
                  setLightboxUrl={setLightboxUrl}
                />
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-5 sm:p-7 rounded-2xl border border-white/10 bg-white/[0.015] flex flex-col gap-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-mono text-xs font-bold">Step 3</span>
                <h5 className="text-base sm:text-lg font-bold text-white">资产图库搭建</h5>
              </div>
              <span className="text-xs text-zinc-400 font-mono">输入：资产信息 + 风格锚点 → 产出：统一风格资产图库</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="space-y-2">
                <div className="font-semibold text-zinc-200">关键动作：</div>
                <ul className="list-disc list-inside space-y-1 text-zinc-400 font-light leading-relaxed">
                  <li>确立全片唯一风格锚点（prestige/editorial realism 克制高级剧集写实质感）。</li>
                  <li>按 Step2 资产逐一生成角色定妆图、场景概念图，锁定脸型/发型/妆造/服装。</li>
                  <li>执行“去油腻四层锁”（光线 / 肤质 / 反差调色 / 锐度颗粒），拒绝塑料感 AI 脸。</li>
                  <li>成对写入真实质感正向词与防塑料防油腻负向词。</li>
                </ul>
              </div>
              <div className="space-y-2">
                <div className="font-semibold text-zinc-200">质量红线 & 关联关系：</div>
                <p className="text-zinc-400 font-light leading-relaxed">
                  <strong className="text-rose-300">红线：</strong>全库风格锚点统一；角色形象跨图不漂移；严禁塑料蜡质皮肤与过度磨皮。<br/>
                  <strong className="text-sky-300">关联：</strong>产出的风格锚点作为固定后缀，统一约束 Step5、Step6、Step7 的生成，一经确立不得更改。
                </p>
              </div>
            </div>

            {/* Step 3 资产工作流全景 */}
            <div className="flex flex-col gap-1.5 pt-2">
              <span className="text-xs text-zinc-400 font-mono">Step 3 资产工作流全景图：</span>
              <ImageSlot 
                src={imageMap.step3Workflow}
                alt="Step 3 资产工作流" 
                label="Step 3 资产图库搭建工作流" 
                subLabel="风格锚点与多维度一致性锁定"
                aspectRatio="aspect-auto"
                fitMode="contain"
                setLightboxUrl={setLightboxUrl}
              />
            </div>

            {/* 角色定妆图资产（三张并排） */}
            <div className="flex flex-col gap-2 pt-2">
              <span className="text-xs text-zinc-400 font-mono">Step 3 资产示例 · 角色定妆图资产（三张并排）：</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <ImageSlot 
                  src={imageMap.step3AssetChar1}
                  alt="角色定妆资产 1" 
                  label="角色定妆图资产 01" 
                  subLabel="核心主角正面与神态"
                  aspectRatio="aspect-auto"
                  fitMode="contain"
                  setLightboxUrl={setLightboxUrl}
                />
                <ImageSlot 
                  src={imageMap.step3AssetChar2}
                  alt="角色定妆资产 2" 
                  label="角色定妆图资产 02" 
                  subLabel="多角度神态与妆造锁定"
                  aspectRatio="aspect-auto"
                  fitMode="contain"
                  setLightboxUrl={setLightboxUrl}
                />
                <ImageSlot 
                  src={imageMap.step3AssetChar3}
                  alt="角色定妆资产 3" 
                  label="角色定妆图资产 03" 
                  subLabel="服装材质与光影统一"
                  aspectRatio="aspect-auto"
                  fitMode="contain"
                  setLightboxUrl={setLightboxUrl}
                />
              </div>
            </div>

            {/* 场景 / 道具资产图（两张并排） */}
            <div className="flex flex-col gap-2 pt-2">
              <span className="text-xs text-zinc-400 font-mono">Step 3 资产示例 · 场景 / 道具资产图（两张并排）：</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <ImageSlot 
                  src={imageMap.step3AssetSceneProp1}
                  alt="场景/道具资产 1" 
                  label="场景空间概念图" 
                  subLabel="空间结构与色光氛围锁定"
                  aspectRatio="aspect-auto"
                  fitMode="contain"
                  setLightboxUrl={setLightboxUrl}
                />
                <ImageSlot 
                  src={imageMap.step3AssetSceneProp2}
                  alt="场景/道具资产 2" 
                  label="核心道具资产图" 
                  subLabel="质感与三等分构图特写"
                  aspectRatio="aspect-auto"
                  fitMode="contain"
                  setLightboxUrl={setLightboxUrl}
                />
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-5 sm:p-7 rounded-2xl border border-white/10 bg-white/[0.015] flex flex-col gap-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-mono text-xs font-bold">Step 4</span>
                <h5 className="text-base sm:text-lg font-bold text-white">剧本细纲</h5>
              </div>
              <span className="text-xs text-zinc-400 font-mono">输入：可开拍底稿 → 产出：逐集、逐 Beat 细纲</span>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-zinc-300">
              <div className="p-3.5 rounded-lg border border-white/5 bg-black/40 space-y-2">
                <div className="font-semibold text-sky-300">EP1 单集 60 秒 5 个 Beat 节奏细化：</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs text-zinc-400">
                  <div className="p-2 rounded bg-white/[0.02]">
                    <strong className="text-zinc-200">Beat 1 (0–10s) 冷开场：</strong>戴名表的手把百万支票怼进镜头，咖啡涟漪，Emma猛抬头。0.5秒抓人。
                  </div>
                  <div className="p-2 rounded bg-white/[0.02]">
                    <strong className="text-zinc-200">Beat 2 (10–25s) 公开点名：</strong>Marcus当众确认「Emma Carter?」，全场安静，制造公开社死压力。
                  </div>
                  <div className="p-2 rounded bg-white/[0.02]">
                    <strong className="text-zinc-200">Beat 3 (25–40s) 金额揭晓：</strong>支票特写 USD 1,000,000.00 + 签名，核心悬念爆点。
                  </div>
                  <div className="p-2 rounded bg-white/[0.02]">
                    <strong className="text-zinc-200">Beat 4 (40–52s) 围观发酵：</strong>顾客举手机录像，同事交头接耳，冲突升级、群像发酵。
                  </div>
                  <div className="p-2 rounded bg-white/[0.02] sm:col-span-2">
                    <strong className="text-zinc-200">Beat 5 (52–60s) 集尾悬念：</strong>Emma攥着支票眼神空茫，终局特写被镜头包围。锁死集尾悬念逼追更。
                  </div>
                </div>
              </div>

              {/* Step 4 剧本细纲工作流 */}
              <div className="flex flex-col gap-1.5 pt-2">
                <span className="text-xs text-zinc-400 font-mono">Step 4 剧本细纲工作流：</span>
                <ImageSlot 
                  src={imageMap.step4Workflow}
                  alt="Step 4 剧本细纲工作流" 
                  label="Step 4 剧本细纲工作流" 
                  subLabel="多节点逐 Beat 叙事细化"
                  aspectRatio="aspect-auto"
                  fitMode="contain"
                  setLightboxUrl={setLightboxUrl}
                />
              </div>

              {/* 情绪曲线图 */}
              <div className="flex flex-col gap-1.5 pt-2">
                <span className="text-xs text-zinc-400 font-mono">Step 4 戏剧张力与情绪曲线分布图：</span>
                <ImageSlot 
                  src={imageMap.step4EmotionCurve}
                  alt="Step 4 戏剧张力与情绪曲线分布图" 
                  label="Step 4 戏剧张力与情绪曲线分布图" 
                  subLabel="逐 Beat 节奏把控与悬念锚定"
                  aspectRatio="aspect-auto"
                  fitMode="contain"
                  setLightboxUrl={setLightboxUrl}
                />
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="p-5 sm:p-7 rounded-2xl border border-white/10 bg-white/[0.015] flex flex-col gap-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-mono text-xs font-bold">Step 5</span>
                <h5 className="text-base sm:text-lg font-bold text-white">剧本分镜</h5>
              </div>
              <span className="text-xs text-zinc-400 font-mono">输入：细纲 + 资产图库 → 产出：逐镜分镜（i2v 首帧锚定）</span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
              锁定风格锚点与角色一致性，向同场景后续镜头链式复用；EP1 单场景内按「建立镜 → 特写组 → 反应镜 → 终局特写」组织景别，守 180° 轴线与空间坐标锁。
            </p>

            {/* Step 5 分镜工作流 */}
            <div className="flex flex-col gap-1.5 pt-1">
              <span className="text-xs text-zinc-400 font-mono">Step 5 分镜工作流：</span>
              <ImageSlot 
                src={imageMap.step5Workflow}
                alt="Step 5 分镜工作流" 
                label="Step 5 分镜工作流" 
                subLabel="首帧锚定与链式分镜组织"
                aspectRatio="aspect-auto"
                fitMode="contain"
                setLightboxUrl={setLightboxUrl}
              />
            </div>

            {/* Step 5 逐镜分镜组织图 */}
            <div className="flex flex-col gap-1.5 pt-1">
              <span className="text-xs text-zinc-400 font-mono">Step 5 逐镜分镜组织图：</span>
              <ImageSlot 
                src={imageMap.step5Storyboards}
                alt="Step 5 逐镜分镜组织图" 
                label="Step 5 逐镜分镜组织图 (i2v 首帧锚定)" 
                subLabel="建立镜 → 特写组 → 反应镜 → 终局特写"
                aspectRatio="aspect-auto"
                fitMode="contain"
                setLightboxUrl={setLightboxUrl}
              />
            </div>
          </div>

          {/* Step 6 */}
          <div className="p-5 sm:p-7 rounded-2xl border border-white/10 bg-white/[0.015] flex flex-col gap-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-mono text-xs font-bold">Step 6</span>
                <h5 className="text-base sm:text-lg font-bold text-white">视频提示词</h5>
              </div>
              <span className="text-xs text-zinc-400 font-mono">输入：分镜 + 风格锚点 → 产出：逐镜视频生成提示词</span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
              点击生成后，产出 beat1 和 beat2 两段 prompt，参考 prompt 下方引用的资产图片进行生成。每镜写全机位/景别/运镜/焦距、人物空间关系、连续动作、口型同步对白与声音层。
            </p>

            <div className="flex flex-col gap-1.5 pt-1">
              <span className="text-xs text-zinc-400 font-mono">Step 6 结构化视频提示词面板与引用资产：</span>
              <ImageSlot 
                src={imageMap.step6PromptSample}
                alt="Step 6 结构化视频提示词面板与引用资产" 
                label="Step 6 结构化视频提示词面板与引用资产" 
                subLabel="包含镜头语言、口型同步与声音层"
                aspectRatio="aspect-auto"
                fitMode="contain"
                setLightboxUrl={setLightboxUrl}
              />
            </div>

            {/* Video preview 01, 02, 03 */}
            <div className="flex flex-col gap-2 pt-2">
              <span className="text-xs text-zinc-400 font-mono">视频预览（Beat 1 | Beat 2 | 成片）：</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex flex-col gap-1.5 rounded-lg p-2.5 border border-white/10 bg-black/40">
                  <span className="text-[11px] text-zinc-400 font-mono">Step 6 视频预览 01 (Beat 1)</span>
                  <CustomVideoPlayer 
                    src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/douyin%20shortdrama/29.mp4" 
                    language={language}
                    aspectRatio="aspect-[9/16]" 
                  />
                </div>
                <div className="flex flex-col gap-1.5 rounded-lg p-2.5 border border-white/10 bg-black/40">
                  <span className="text-[11px] text-zinc-400 font-mono">Step 6 视频预览 02 (Beat 2)</span>
                  <CustomVideoPlayer 
                    src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/douyin%20shortdrama/30.mp4" 
                    language={language}
                    aspectRatio="aspect-[9/16]" 
                  />
                </div>
                <div className="flex flex-col gap-1.5 rounded-lg p-2.5 border border-white/10 bg-black/40">
                  <span className="text-[11px] text-zinc-400 font-mono">Step 6 视频预览 03 (成片)</span>
                  <CustomVideoPlayer 
                    src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/douyin%20shortdrama/31.mp4" 
                    language={language}
                    aspectRatio="aspect-[9/16]" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step 7 */}
          <div className="p-5 sm:p-7 rounded-2xl border border-white/10 bg-white/[0.015] flex flex-col gap-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-mono text-xs font-bold">Step 7</span>
                <h5 className="text-base sm:text-lg font-bold text-white">剧集海报设计</h5>
              </div>
              <span className="text-xs text-zinc-400 font-mono">输入：剧本 + 角色资产 + 风格锚点 → 产出：海报生图词（9:16）</span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
              从剧本提炼四个推导锚点（剧名、核心矛盾、主角关系基调、全剧情绪色调），推导构图、光影、色调与视觉钩子，坚持“氛围感第一、画质高级感第二”，执行去油腻四层锁。
            </p>

            {/* Step 7 海报设计工作流 */}
            <div className="flex flex-col gap-1.5 pt-1">
              <span className="text-xs text-zinc-400 font-mono">Step 7 海报设计工作流：</span>
              <ImageSlot 
                src={imageMap.step7Workflow}
                alt="Step 7 海报设计工作流" 
                label="Step 7 海报设计工作流" 
                subLabel="剧本锚点提炼与视觉钩子推导"
                aspectRatio="aspect-auto"
                fitMode="contain"
                setLightboxUrl={setLightboxUrl}
              />
            </div>

            {/* Step 7 剧集海报最终设计成图（精致尺寸 9:16） */}
            <div className="flex flex-col gap-1.5 pt-2 items-center">
              <span className="text-xs text-zinc-400 font-mono self-start">Step 7 剧集海报最终设计成图 (9:16)：</span>
              <div className="w-full max-w-sm">
                <ImageSlot 
                  src={imageMap.step7PosterResult}
                  alt="Step 7 剧集海报最终设计成图" 
                  label="Step 7 剧集海报最终设计成图 (9:16)" 
                  subLabel="主视觉男女主构图与氛围光影"
                  aspectRatio="aspect-auto"
                  fitMode="contain"
                  setLightboxUrl={setLightboxUrl}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ▍ 三、生产落地与合规要点 */}
        <div className="p-5 sm:p-7 rounded-2xl border border-white/10 bg-white/[0.015] flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-white/5 pb-2">
            <ShieldAlert className="w-4 h-4 text-sky-400" />
            <h4 className="text-base sm:text-lg font-bold text-white">三、生产落地与合规要点</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-zinc-300">
            <div className="p-3 rounded-xl border border-white/5 bg-white/[0.02] space-y-1.5">
              <div className="font-semibold text-sky-300">后期与配乐：</div>
              <p className="text-zinc-400 leading-relaxed">
                片段用剪映拼接，统一输出竖屏 1080×1920 / 30fps，转场防跳帧；BGM 走 AI 抽卡选最优，转折点补音效并压低音量让位对白。
              </p>
            </div>
            <div className="p-3 rounded-xl border border-white/5 bg-white/[0.02] space-y-1.5">
              <div className="font-semibold text-rose-300">画面合规红线：</div>
              <p className="text-zinc-400 leading-relaxed">
                越轴时做镜像修正；避免角色冲屏破第四面墙；亲密镜头保持克制；严禁违规、血腥暴力与色情。
              </p>
            </div>
            <div className="p-3 rounded-xl border border-white/5 bg-white/[0.02] space-y-1.5">
              <div className="font-semibold text-emerald-300">资产提示词迭代法：</div>
              <p className="text-zinc-400 leading-relaxed">
                角色出四视图、场景出四宫格、道具用三等分构图，配 YAML 结构化提示词逐版迭代，保证同一资产跨角度不漂移。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PART 2 · AI 视觉：让运营视觉设计提效 150%–300% */}
      {/* ========================================================================= */}
      <div className="flex flex-col gap-8 pt-8 border-t border-white/10">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              OPERATIONAL DESIGN
            </span>
            <span className="text-xs font-mono text-zinc-400">PART 02</span>
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-wide">
            {t("Part 2 · AI 视觉：让运营视觉设计提效 150%–300%", "Part 2 • AI Visual: Boosting Operational Design Efficiency by 150%–300%")}
          </h3>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
            这是一个团队协作的 AIGC 视觉能力搭建项目，我主要负责 AIGC 视觉资产的设计与生产，以及生产工作流的梳理与优化。沉淀出<strong>三条可复用工作流 + 一套模型选型方法论 + 一套 Prompt 方法论</strong>。
          </p>
        </div>

        {/* ▍ 2.1 真实业务落地案例 (6 Slots · 上三张下三张) */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-white/5 pb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <h4 className="text-base sm:text-lg uppercase tracking-[0.1em] font-bold text-white/95">
              2.1 真实业务落地案例（覆盖海外主视觉、弹窗与分享全链路）
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <ImageSlot 
              src={imageMap.caseUSWinter}
              alt="US Star Collection · Winter" 
              label="US Star Collection · Winter" 
              subLabel="冬日主题星光收集主视觉"
              aspectRatio="aspect-auto"
              fitMode="contain"
              setLightboxUrl={setLightboxUrl}
            />
            <ImageSlot 
              src={imageMap.caseUSRanking}
              alt="US Limited-time Ranking" 
              label="US Limited-time Ranking" 
              subLabel="美区限时榜单运营视觉"
              aspectRatio="aspect-auto"
              fitMode="contain"
              setLightboxUrl={setLightboxUrl}
            />
            <ImageSlot 
              src={imageMap.caseUSHalloween}
              alt="US Star Collection · Halloween" 
              label="US Star Collection · Halloween" 
              subLabel="万圣节主题活动视觉"
              aspectRatio="aspect-auto"
              fitMode="contain"
              setLightboxUrl={setLightboxUrl}
            />
            <ImageSlot 
              src={imageMap.caseBRStar}
              alt="BR Star Collection General" 
              label="BR Star Collection General" 
              subLabel="巴西星光收集通案"
              aspectRatio="aspect-auto"
              fitMode="contain"
              setLightboxUrl={setLightboxUrl}
            />
            <ImageSlot 
              src={imageMap.caseJPInvite}
              alt="JP Invite friends & win rewards" 
              label="JP Invite friends & win rewards" 
              subLabel="日本好友邀请有礼"
              aspectRatio="aspect-auto"
              fitMode="contain"
              setLightboxUrl={setLightboxUrl}
            />
            <ImageSlot 
              src={imageMap.caseIPExtend}
              alt="IP 形象延展" 
              label="IP 形象延展与资产库" 
              subLabel="多维度动作与换装"
              aspectRatio="aspect-auto"
              fitMode="contain"
              setLightboxUrl={setLightboxUrl}
            />
          </div>
        </div>

        {/* ▍ 2.2 三条生产工作流 */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 border-b border-white/5 pb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <h4 className="text-base sm:text-lg uppercase tracking-[0.1em] font-bold text-white/95">
              2.2 三条生产工作流
            </h4>
          </div>

          {/* Workflow 1 */}
          <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.015] flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h5 className="font-bold text-white text-sm sm:text-base">1. 高质量运营图生成工作流（提效 150%–200%）</h5>
              <span className="text-xs text-purple-300 font-mono">适用高细节需求（UG 换肤、营销头图、PGC 专题）</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400">
              链路：多模型生图 → 细节调整 → 静帧输出 + 抠图 → 动效输出。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <ImageSlot 
                src={imageMap.workflowOpsFourSteps}
                alt="高质量运营图四步总览" 
                label="高质量运营图生成 · 四步总览" 
                subLabel="生图 → 细节 → 静帧抠图 → 动效"
                aspectRatio="aspect-auto"
                fitMode="contain"
                setLightboxUrl={setLightboxUrl}
              />
              <ImageSlot 
                src={imageMap.workflowHalloweenCase}
                alt="万圣节南瓜灯全流程案例" 
                label="万圣节南瓜灯全流程落地案例" 
                subLabel="真实业务物料全周期交付"
                aspectRatio="aspect-auto"
                fitMode="contain"
                setLightboxUrl={setLightboxUrl}
              />
            </div>
          </div>

          {/* Workflow 2 */}
          <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.015] flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h5 className="font-bold text-white text-sm sm:text-base">2. IP 全案生产工作流（提效 200%–300%）</h5>
              <span className="text-xs text-purple-300 font-mono">0 到 1 IP 创制与已有 IP 全案延展</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400">
              链路：Banana 生成角色 + 三视图 → 换装/动作 → Seedream4.0/Banana 丰富场景 → SeedancePro1.0 出动效。
            </p>
            <ImageSlot 
              src={imageMap.workflowIPFourSteps}
              alt="IP 全案生产四步总览" 
              label="IP 全案生产工作流 · 四步总览" 
              subLabel="三视图 → 动作换装 → 场景丰富 → 动效输出"
              aspectRatio="aspect-auto"
              fitMode="contain"
              setLightboxUrl={setLightboxUrl}
            />
          </div>

          {/* Workflow 3 */}
          <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.015] flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h5 className="font-bold text-white text-sm sm:text-base">3. 标题生成工作流（提效 200%–300%）</h5>
              <span className="text-xs text-purple-300 font-mono">日常快速产出活动标题</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400">
              链路：GPT4 / Seedream4.0 / Banana 生成标题 → 抠图 → recraft.ai 转矢量后进 Figma 使用。
            </p>
            <ImageSlot 
              src={imageMap.workflowTitleThreeSteps}
              alt="标题生成工作流三步总览" 
              label="标题生成工作流 · 三步总览" 
              subLabel="标题生成 → 智能抠图 → 矢量化转入 Figma"
              aspectRatio="aspect-auto"
              fitMode="contain"
              setLightboxUrl={setLightboxUrl}
            />
          </div>
        </div>

        {/* ▍ 2.3 模型选型方法论：海量模型，到底选哪个？ */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2 border-b border-white/5 pb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <h4 className="text-base sm:text-lg uppercase tracking-[0.1em] font-bold text-white/95">
              2.3 模型选型方法论：按任务选模型
            </h4>
          </div>

          {/* 选型推荐展示 Slots */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <ImageSlot 
              src={imageMap.modelSeedream3D}
              alt="文生图首推 Seedream3.0 3D风格" 
              label="文生图 · Seedream 3D 风格" 
              subLabel="Prompt 控制精度极高"
              aspectRatio="aspect-auto"
              fitMode="contain"
              setLightboxUrl={setLightboxUrl}
            />
            <ImageSlot 
              src={imageMap.modelSeedreamIllust}
              alt="文生图首推 Seedream3.0 插画风格" 
              label="文生图 · Seedream 插画风格" 
              subLabel="色彩与光影层次丰富"
              aspectRatio="aspect-auto"
              fitMode="contain"
              setLightboxUrl={setLightboxUrl}
            />
            <ImageSlot 
              src={imageMap.modelSeedream4Style}
              alt="图生图首推 Seedream4.0 根据风格生成" 
              label="图生图 · Seedream4.0 风格还原" 
              subLabel="识别参考风格强"
              aspectRatio="aspect-auto"
              fitMode="contain"
              setLightboxUrl={setLightboxUrl}
            />
            <ImageSlot 
              src={imageMap.modelSeedream4Lineart}
              alt="图生图首推 Seedream4.0 根据线稿生成" 
              label="图生图 · Seedream4.0 线稿还原" 
              subLabel="对话式快速精准微调"
              aspectRatio="aspect-auto"
              fitMode="contain"
              setLightboxUrl={setLightboxUrl}
            />
          </div>

          {/* 模型综合评价 Table/Grid */}
          <div className="p-4 rounded-xl border border-white/10 bg-black/40 overflow-x-auto">
            <table className="w-full text-xs text-left text-zinc-300">
              <thead className="text-[11px] uppercase bg-white/5 text-zinc-400">
                <tr>
                  <th className="px-3 py-2">模型名称</th>
                  <th className="px-3 py-2">定位与强项</th>
                  <th className="px-3 py-2">综合评级</th>
                  <th className="px-3 py-2">最佳应用场景</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="px-3 py-2 font-bold text-white">Seedream 4.0</td>
                  <td className="px-3 py-2 text-zinc-300">视觉品质 ★★★★★ · 图生图还原 ★★★★★ · 对话调整 ★★★★★</td>
                  <td className="px-3 py-2 text-amber-300 font-semibold">全能首选</td>
                  <td className="px-3 py-2 text-zinc-400">图生图、高清化、高保真商业静帧</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-bold text-white">Nano Banana</td>
                  <td className="px-3 py-2 text-zinc-300">图生图还原 ★★★★★ · 主体一致性 ★★★★★ · 对话调整 ★★★★★</td>
                  <td className="px-3 py-2 text-sky-300 font-semibold">角色一致性王</td>
                  <td className="px-3 py-2 text-zinc-400">IP 角色延展、多角度三视图与表情换装</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-bold text-white">Seedream 3.0</td>
                  <td className="px-3 py-2 text-zinc-300">文生图创意度 ★★★★★ · 概念发散能力强</td>
                  <td className="px-3 py-2 text-purple-300 font-semibold">创意出图首选</td>
                  <td className="px-3 py-2 text-zinc-400">初期概念提案、头脑风暴发散</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-bold text-zinc-300">GPT-4 / Qwen</td>
                  <td className="px-3 py-2 text-zinc-400">对话式理解好，创意度高，但视觉一致性需配合控图</td>
                  <td className="px-3 py-2 text-zinc-400">辅助支撑</td>
                  <td className="px-3 py-2 text-zinc-400">标题生成、Prompt 拓展与结构化拆解</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 选型 tips 组合拳 (3 Slots) */}
          <div className="flex flex-col gap-2 pt-2">
            <span className="text-xs text-zinc-400 font-mono">选型组合拳实战展示：</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <ImageSlot 
                src={imageMap.modelTipFastGen}
                alt="快速生成组合拳" 
                label="文生图组合拳：快速出图 → 高清化" 
                subLabel="Seedream3.0 快速发散 + 4.0 细化"
                aspectRatio="aspect-auto"
                fitMode="contain"
                setLightboxUrl={setLightboxUrl}
              />
              <ImageSlot 
                src={imageMap.modelTipFaceChange}
                alt="角色表情变化微调" 
                label="细节调整：角色变化优先 Nano" 
                subLabel="锁定面部特征与五官一致性"
                aspectRatio="aspect-auto"
                fitMode="contain"
                setLightboxUrl={setLightboxUrl}
              />
              <ImageSlot 
                src={imageMap.modelTipSceneChange}
                alt="场景变化微调" 
                label="细节调整：场景变化优先 Seedream4.0" 
                subLabel="保持色调与环境光影自洽"
                aspectRatio="aspect-auto"
                fitMode="contain"
                setLightboxUrl={setLightboxUrl}
              />
            </div>
          </div>
        </div>

        {/* ▍ 2.4 Prompt 方法论：从“大脑空白”到结构化描述 (6 Slots) */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2 border-b border-white/5 pb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <h4 className="text-base sm:text-lg uppercase tracking-[0.1em] font-bold text-white/95">
              2.4 Prompt 方法论：结构化描述与 Crate 节点工作流
            </h4>
          </div>

          <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] text-xs sm:text-sm text-zinc-300 space-y-1.5">
            <p className="font-semibold text-white">通用结构公式：<span className="text-purple-300 font-mono">主体 & 风格 + 细节 + 环境</span></p>
            <p className="text-zinc-400 leading-relaxed">
              先用图生文工具由参考图反推结构化描述找灵感，再在此基础上改写；创意阶段可给基础描述让文本生成自动丰富，但最终 Prompt 一定要写得详细，避免模糊词语。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            <ImageSlot 
              src={imageMap.promptI2TInvert}
              alt="图生文 · 由图反推描述词" 
              label="图生文 · 由图反推描述词" 
              subLabel="逆向抽取主体、风格与环境关键词"
              aspectRatio="aspect-auto"
              fitMode="contain"
              setLightboxUrl={setLightboxUrl}
            />
            <ImageSlot 
              src={imageMap.promptI2TCompare}
              alt="图生文 · 多模型对比得到描述" 
              label="图生文 · 多模型对比描述" 
              subLabel="综合多视角提示词精炼"
              aspectRatio="aspect-auto"
              fitMode="contain"
              setLightboxUrl={setLightboxUrl}
            />
            <ImageSlot 
              src={imageMap.promptStructure3D}
              alt="结构化描述 · 3D 卡通渲染示例" 
              label="结构化描述 · 3D 卡通渲染" 
              subLabel="精确控制材质、高光与体积感"
              aspectRatio="aspect-auto"
              fitMode="contain"
              setLightboxUrl={setLightboxUrl}
            />
            <ImageSlot 
              src={imageMap.promptCrateFlow}
              alt="TikTok Crate · Prompt 生成流程" 
              label="TikTok Crate · Prompt 生成流程" 
              subLabel="节点式自动化组装与派发"
              aspectRatio="aspect-auto"
              fitMode="contain"
              setLightboxUrl={setLightboxUrl}
            />
            <ImageSlot 
              src={imageMap.promptCrateNodeFireplace}
              alt="TikTok Crate · 节点类型（迪士尼风格壁炉）" 
              label="TikTok Crate · 迪士尼风格壁炉节点" 
              subLabel="特定风格节点的模块化调用"
              aspectRatio="aspect-auto"
              fitMode="contain"
              setLightboxUrl={setLightboxUrl}
            />
            <ImageSlot 
              src={imageMap.promptCrateToucan}
              alt="TikTok Crate · 卡通小巨嘴鸟生成示例" 
              label="TikTok Crate · 卡通小巨嘴鸟生成示例" 
              subLabel="高完成度运营 IP 实操案例"
              aspectRatio="aspect-auto"
              fitMode="contain"
              setLightboxUrl={setLightboxUrl}
            />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PART 3 · TikTok Crate 社区运营支持：让工作流从“我会用”到“团队都在用” */}
      {/* ========================================================================= */}
      <div className="flex flex-col gap-8 pt-8 border-t border-white/10">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              COMMUNITY & GROWTH
            </span>
            <span className="text-xs font-mono text-zinc-400">PART 03</span>
          </div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white leading-snug whitespace-normal sm:whitespace-nowrap overflow-hidden text-ellipsis">
            {t("Part 3 · TikTok Crate 社区运营支持：让工作流从“我会用”到“团队都在用”", "Part 3 • TikTok Crate Community Ops Support: Scaling from Individual Proficiency to Team-Wide Adoption")}
          </h3>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
            核心命题：再好的工作流，若只停在文档里就没有价值。通过 TikTok Crate 社区运营支持，把这套 SOP 在字节内部规模化推广——目标是落地功能迭代、维持社区常态化活跃、沉淀内部资产。
          </p>
        </div>

        {/* 日常运营 vs 活动运营 Bento */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.015] flex flex-col gap-3">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <Users className="w-4 h-4 text-emerald-400" />
              日常运营（基础活跃度 & 资产沉淀）
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-400 font-light">
              <li className="flex items-start gap-2">
                <strong className="text-zinc-200 shrink-0">工作流：</strong>直观展示应用 showcase，一键复用性强。
              </li>
              <li className="flex items-start gap-2">
                <strong className="text-zinc-200 shrink-0">文档：</strong>沉淀重点案例，利于开展更多跨业务合作。
              </li>
              <li className="flex items-start gap-2">
                <strong className="text-zinc-200 shrink-0">视频：</strong>面向专业用户展开复杂节点与参数案例解析。
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.015] flex flex-col gap-3">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <Zap className="w-4 h-4 text-emerald-400" />
              活动运营（专项拉高 & 创作者孵化）
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-400 font-light">
              <li className="flex items-start gap-2">
                <strong className="text-zinc-200 shrink-0">新功能体验征集：</strong>承接每次重要模型与平台升级。
              </li>
              <li className="flex items-start gap-2">
                <strong className="text-zinc-200 shrink-0">月度主题创意活动：</strong>平稳期持续拉高整体社区创作氛围。
              </li>
              <li className="flex items-start gap-2">
                <strong className="text-zinc-200 shrink-0">核心创作者孵化：</strong>沉淀种子用户，打造社区核心生产力。
              </li>
            </ul>
          </div>
        </div>

        {/* ▍ 3.1 核心投放资源位 (3 Slots 并排展示) */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-white/5 pb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <h4 className="text-base sm:text-lg uppercase tracking-[0.1em] font-bold text-white/95">
              3.1 核心投放资源位（日常运营 + 活动运营承载）
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400">
            从主页入口开始做轻量化运营，随活动运营类 Agent 上线同步推进：日常运营覆盖主页、图像创作、视频创作三个核心资源位；活动运营以活动专题页作为承载位。
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ImageSlot 
              src={imageMap.communityPlacement1}
              alt="TikTok Crate 社区核心投放资源位 01" 
              label="TikTok Crate 社区核心投放位 01" 
              subLabel="主页与核心入口承载"
              aspectRatio="aspect-auto"
              fitMode="contain"
              setLightboxUrl={setLightboxUrl}
            />
            <ImageSlot 
              src={imageMap.communityPlacement2}
              alt="TikTok Crate 社区核心投放资源位 02" 
              label="TikTok Crate 社区核心投放位 02" 
              subLabel="创作模块与指南承载"
              aspectRatio="aspect-auto"
              fitMode="contain"
              setLightboxUrl={setLightboxUrl}
            />
            <ImageSlot 
              src={imageMap.communityPlacement3}
              alt="TikTok Crate 社区核心投放资源位 03" 
              label="TikTok Crate 社区核心投放位 03" 
              subLabel="活动专题与案例承载"
              aspectRatio="aspect-auto"
              fitMode="contain"
              setLightboxUrl={setLightboxUrl}
            />
          </div>
        </div>

        {/* ▍ 3.2 运营内容持续投放示例 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 border-b border-white/5 pb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <h4 className="text-base sm:text-lg uppercase tracking-[0.1em] font-bold text-white/95">
              3.2 运营内容持续投放示例
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            按<strong>“能力更新 / 优秀案例 / 业务落地 / 种子用户 / 教程沉淀 / 创作交流”</strong>打标，围绕两大工作流持续投放，打造内外部良性互动的 AIGC 创作者社区生态。
          </p>
        </div>

        {/* 项目闭环小结 */}
        <div className="p-6 sm:p-8 rounded-2xl border border-sky-500/20 bg-gradient-to-br from-sky-500/[0.04] via-purple-500/[0.02] to-transparent flex flex-col gap-4">
          <div className="flex items-center gap-2 text-white font-bold text-base sm:text-lg">
            <Award className="w-5 h-5 text-sky-400" />
            项目闭环小结
          </div>
          <p className="text-sm sm:text-base leading-relaxed text-zinc-200 font-light text-justify">
            从「工作流设计」→「SOP 沉淀」→「TikTok Crate 社区运营支持」，我完成了 AIGC 内容生产从<strong>单点效果到团队标准再到业务规模化落地</strong>的完整闭环。这不仅是会用 AI 工具，更是把不可控的创作过程，做成了<strong>可复用、可交付、可推广</strong>的工业化生产体系。
          </p>
        </div>
      </div>

    </div>
  );
}
