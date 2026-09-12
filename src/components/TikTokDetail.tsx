import React, { useState } from 'react';
import { 
  Sparkles, TrendingUp, Users, Eye, Layers, Film, Hammer, 
  CheckCircle, Zap, ShieldAlert, Workflow, Video, Image as ImageIcon, 
  Tv, Compass, Award, Star, Cpu, ArrowRight, BookOpen, Clock, 
  ChevronRight, Play, Terminal, HelpCircle, MonitorPlay, MousePointerClick,
  ShoppingBag
} from 'lucide-react';
import { CustomVideoPlayer } from './CustomVideoPlayer';

interface TikTokDetailProps {
  language: 'zh' | 'en';
  t: (zh: any, en: any) => any;
  setLightboxUrl: (url: string | null) => void;
}

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
  const [activeTab, setActiveTab] = useState('overview');
  const [activeStep, setActiveStep] = useState(1);
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

  const tabs = [
    { id: 'overview', label: t('项目概述', 'Overview'), icon: Compass },
    { id: 'workflow', label: t('AI短剧工作流', 'AI Drama Workflow'), icon: Film },
    { id: 'visual', label: t('AI视觉设计', 'AI Visual Design'), icon: Layers },
    { id: 'community', label: t('资产与社区沉淀', 'Community & Assets'), icon: Users }
  ];

  return (
    <div className="flex flex-col gap-6 text-zinc-350 font-sans">
      {/* Header Info */}
      <div className="p-6 sm:p-8 rounded-3xl border border-white/5 bg-white/[0.02] flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-xs text-sky-400 font-mono font-semibold uppercase tracking-wider">
            {t("字节跳动抖音集团 · 北京", "ByteDance Douyin Group • Beijing")}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
            {t("AIGC 工作流设计与体系搭建", "AIGC Workflow Design & System Building")}
          </h2>
          <p className="text-sm md:text-base text-zinc-300">
            {t("参与共建 AI 短剧生产标准、视觉自动化工作流与 Crate 社区运营库", "Co-building AI Drama production standards, visual automation workflows, and Crate community operations.")}
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/5 text-sm">
          <div className="flex flex-col gap-1">
            <span className="text-zinc-500 text-xs uppercase">职位</span>
            <span className="text-zinc-200">多媒体设计 (AIGC方向)</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-zinc-500 text-xs uppercase">时间</span>
            <span className="text-zinc-200">2026.07 — 至今</span>
          </div>
          <div className="flex flex-col gap-1 md:col-span-2">
            <span className="text-zinc-500 text-xs uppercase">团队</span>
            <span className="text-zinc-200">TikTok-Design-Creative</span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 p-1 bg-white/[0.02] rounded-xl border border-white/5">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === tab.id 
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' 
                : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200 border border-transparent'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content: 项目概述 */}
      {activeTab === 'overview' && (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.015] flex flex-col gap-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-sky-400" /> 协作视角下的业务挑战
            </h3>
            <p className="text-zinc-300 leading-relaxed font-light text-sm sm:text-base">
              TikTok Crate 是字节内部的一站式 AI 创作平台。我的核心工作是协助团队解决“如何把零散的 AIGC 技巧变成稳定、可复用的高效团队工作流”的问题。通过与各业务方的紧密配合，推动工作流在实际业务中跑通。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-xl border border-sky-500/20 bg-sky-500/[0.03] flex flex-col gap-2">
                <span className="text-sky-300 font-bold">1. AI 短剧标准共建</span>
                <p className="text-xs text-zinc-400">帮助团队梳理出七步协同工作流与五条核心画质约束，实现从单集 Demo 到 30+ 集批量矩阵的高品质交付。</p>
              </div>
              <div className="p-4 rounded-xl border border-purple-500/20 bg-purple-500/[0.03] flex flex-col gap-2">
                <span className="text-purple-300 font-bold">2. 视觉流提效落地</span>
                <p className="text-xs text-zinc-400">总结出三条业务高频适用的生产链路，配合选型与提示词规范，使运营设计的交付效率大幅攀升。</p>
              </div>
              <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.03] flex flex-col gap-2">
                <span className="text-emerald-300 font-bold">3. 沉淀社区资产库</span>
                <p className="text-xs text-zinc-400">参与平台社区建设，将沉淀好的 SOP 与模块化组件分发给全团队，推动创作工具的普及与常态化活跃。</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: AI短剧工作流 */}
      {activeTab === 'workflow' && (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
          
          {/* Section: 怎么做 - 全景流程 */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Workflow className="w-5 h-5 text-sky-400" /> 打造可控的视频生产工作流
            </h3>
            <p className="text-zinc-300 text-sm">
              为了实现稳定、批量的电影级短剧生产，我们梳理出了贯穿前中后期的<strong className="text-sky-300 font-medium">「七步协同工作流」</strong>，并全面适配了 seedance2.5 模型新版本，大幅优化复杂运动轨迹与镜头时间一致性。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ImageSlot 
                src={imageMap.sevenStepsFlowchart}
                alt="七步协同工作流全景图" 
                label="七步协同工作流全景图" 
                subLabel="主链路推演"
                aspectRatio="aspect-auto" setLightboxUrl={setLightboxUrl} 
              />
              <ImageSlot 
                src={imageMap.sevenStepsOperationStep}
                alt="操作步骤说明" 
                label="操作步骤说明与界面" 
                subLabel="按步骤自动化协同"
                aspectRatio="aspect-auto" setLightboxUrl={setLightboxUrl} 
              />
            </div>
          </div>

          {/* Section: 七步拆解 (Stepper) */}
          <div className="flex flex-col gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.015]">
            <h4 className="text-base font-bold text-white">深入拆解：七步工作流的每环细节</h4>
            <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2">
              {[1,2,3,4,5,6,7].map(step => (
                <button
                  key={step}
                  onClick={() => setActiveStep(step)}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                    activeStep === step 
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' 
                      : 'bg-black/40 text-zinc-500 border border-white/10 hover:bg-white/5 hover:text-zinc-300'
                  }`}
                >
                  Step {step}
                </button>
              ))}
            </div>

            <div className="pt-2 animate-in fade-in duration-300">
              {activeStep === 1 && (
                <div className="flex flex-col gap-6">
                  <div className="space-y-3">
                    <h5 className="text-lg font-bold text-white">Step 1: 剧本适配拆解</h5>
                    <p className="text-sm text-zinc-300">把原始长篇剧本改写成可开拍的演绎剧底稿。提取主线冲突，梳理人物情绪钩子，按短剧节奏重组为强开场、密集反转的结构。</p>
                    <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                      <span className="text-xs text-rose-300 font-semibold">底线要求：</span>
                      <p className="text-xs text-rose-200/70 mt-1">底稿必须自洽（人物、空间无矛盾），全篇称谓统一，作为后续所有步骤的唯一事实来源。</p>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-4">
                    <ImageSlot src={imageMap.step1Flowchart1} alt="拆解1" label="情绪曲线重组" setLightboxUrl={setLightboxUrl} />
                    <ImageSlot src={imageMap.step1Flowchart2} alt="拆解2" label="单场景底稿" setLightboxUrl={setLightboxUrl} />
                  </div>
                </div>
              )}
              {activeStep === 2 && (
                <div className="flex flex-col gap-6">
                  <div className="space-y-3">
                    <h5 className="text-lg font-bold text-white">Step 2: 资产信息提取</h5>
                    <p className="text-sm text-zinc-300">从底稿中结构化抽取关键元素：包含所有出场人物的外貌与独有记忆点，以及场景结构与核心道具，为后续生图提供统一变量。</p>
                  </div>
                  <div className="flex-1 flex flex-col gap-4">
                    <ImageSlot src={imageMap.step2Flowchart1} alt="特征抽取" label="角色特征提取" setLightboxUrl={setLightboxUrl} />
                    <ImageSlot src={imageMap.step2Flowchart2} alt="场景清单" label="核心场景清单" setLightboxUrl={setLightboxUrl} />
                  </div>
                </div>
              )}
              {activeStep === 3 && (
                <div className="flex flex-col gap-6">
                  <div className="space-y-3">
                    <h5 className="text-lg font-bold text-white">Step 3: 资产图库搭建</h5>
                    <p className="text-sm text-zinc-300">确立全片唯一风格锚点，生成统一风格的定妆图、场景图。通过“去油腻四层锁”确保角色形象跨图不漂移，拒绝塑料感。</p>
                  </div>
                  <div className="flex-1 flex flex-col gap-4">
                    <ImageSlot src={imageMap.step3Workflow} alt="图库流程" label="资产搭建链路" setLightboxUrl={setLightboxUrl} />
                    <ImageSlot src={imageMap.step3AssetChar1} alt="定妆1" label="角色资产 01" setLightboxUrl={setLightboxUrl} />
                    <ImageSlot src={imageMap.step3AssetChar2} alt="定妆2" label="角色资产 02" setLightboxUrl={setLightboxUrl} />
                    <ImageSlot src={imageMap.step3AssetChar3} alt="定妆3" label="角色资产 03" setLightboxUrl={setLightboxUrl} />
                    <ImageSlot src={imageMap.step3AssetSceneProp1} alt="场景" label="场景资产" setLightboxUrl={setLightboxUrl} />
                    <ImageSlot src={imageMap.step3AssetSceneProp2} alt="道具" label="道具资产" setLightboxUrl={setLightboxUrl} />
                  </div>
                </div>
              )}
              {activeStep === 4 && (
                <div className="flex flex-col gap-6">
                  <div className="space-y-3">
                    <h5 className="text-lg font-bold text-white">Step 4: 剧本细纲设计</h5>
                    <p className="text-sm text-zinc-300">把底稿拆成逐集、逐 Beat 的叙事细纲。合理分布情绪曲线，确保单 Beat 密度足量，集尾锚定悬念逼迫追更。</p>
                  </div>
                  <div className="flex-1 flex flex-col gap-4">
                    <ImageSlot src={imageMap.step4Workflow} alt="细纲" label="逐 Beat 叙事细化" setLightboxUrl={setLightboxUrl} />
                    <ImageSlot src={imageMap.step4EmotionCurve} alt="曲线" label="情绪张力分布" setLightboxUrl={setLightboxUrl} />
                  </div>
                </div>
              )}
              {activeStep === 5 && (
                <div className="flex flex-col gap-6">
                  <div className="space-y-3">
                    <h5 className="text-lg font-bold text-white">Step 5: 逐镜分镜统筹</h5>
                    <p className="text-sm text-zinc-300">把细纲落成逐镜分镜。运用建立镜、特写组、反应镜、终局特写的组合规律，同时强制锁定 180° 轴线和空间坐标。</p>
                  </div>
                  <div className="flex-1 flex flex-col gap-4">
                    <ImageSlot src={imageMap.step5Workflow} alt="分镜链" label="分镜节点编排" setLightboxUrl={setLightboxUrl} />
                    <ImageSlot src={imageMap.step5Storyboards} alt="i2v锚定" label="首帧锚定规范" setLightboxUrl={setLightboxUrl} />
                  </div>
                </div>
              )}
              {activeStep === 6 && (
                <div className="flex flex-col gap-6">
                  <div className="space-y-3">
                    <h5 className="text-lg font-bold text-white">Step 6: 视频提示词翻译与产出</h5>
                    <p className="text-sm text-zinc-300">将分镜转化为生成模型可理解的提示词，包含机位、景别、运镜和口型同步细节。点击生成后直接串接资产出片。</p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="w-full max-w-3xl mx-auto">
                      <ImageSlot src={imageMap.step6PromptSample} alt="面板" label="提示词结构化" setLightboxUrl={setLightboxUrl} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-zinc-500 text-center">Beat 1 视频</span>
                        <CustomVideoPlayer src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/douyin%20shortdrama/29.mp4" language={language} aspectRatio="aspect-[9/16]" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-zinc-500 text-center">Beat 2 视频</span>
                        <CustomVideoPlayer src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/douyin%20shortdrama/30.mp4" language={language} aspectRatio="aspect-[9/16]" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-zinc-500 text-center">合成短片</span>
                        <CustomVideoPlayer src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/douyin%20shortdrama/31.mp4" language={language} aspectRatio="aspect-[9/16]" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeStep === 7 && (
                <div className="flex flex-col gap-6">
                  <div className="space-y-3">
                    <h5 className="text-lg font-bold text-white">Step 7: 剧集海报设计</h5>
                    <p className="text-sm text-zinc-300">提炼核心矛盾与人物关系基调，推导出能抓人眼球的视觉钩子，最终产出统一质感的 9:16 宣发海报。</p>
                  </div>
                  <div className="flex-1 flex flex-col gap-4">
                    <ImageSlot src={imageMap.step7Workflow} alt="海报推导" label="视觉钩子推导" setLightboxUrl={setLightboxUrl} />
                    <ImageSlot src={imageMap.step7PosterResult} alt="成图" label="最终海报成图" setLightboxUrl={setLightboxUrl} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Section: 成果对比与规模落地 */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-sky-400" /> 质感升级与规模落地
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 对比：海报与视频 */}
              <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.015] flex flex-col gap-4">
                <h4 className="text-sm font-semibold text-sky-300">品质跨越：直观对比与去油腻策略</h4>
                <p className="text-xs text-zinc-400">通过五条硬约束（统一风格后缀、空间坐标锁、活人感微表情描写等），让画面摆脱塑料感，实现电影级质感。</p>
                <div className="grid grid-cols-2 gap-2">
                  <ImageSlot src={imageMap.posterBefore} alt="前" label="优化前：较塑料" setLightboxUrl={setLightboxUrl} />
                  <ImageSlot src={imageMap.posterAfter} alt="后" label="优化后：电影级" setLightboxUrl={setLightboxUrl} />
                  <div className="flex flex-col gap-1">
                    <CustomVideoPlayer src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/douyin%20shortdrama/3.mp4" language={language} aspectRatio="aspect-[9/16]" />
                    <span className="text-[10px] text-zinc-500 text-center">优化前成片</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <CustomVideoPlayer src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/douyin%20shortdrama/4.mp4" language={language} aspectRatio="aspect-[9/16]" />
                    <span className="text-[10px] text-sky-400 text-center">优化后成片</span>
                  </div>
                </div>
              </div>

              {/* 落地：账号矩阵图集 */}
              <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.015] flex flex-col gap-4">
                <h4 className="text-sm font-semibold text-sky-300">规模落地：跑通矩阵账号与 30+ 爆款剧</h4>
                <p className="text-xs text-zinc-400">我们将全流程封装入 Crate 平台看板，打通批量出图出片通道，成功推送到实际业务端的 TikTok 短剧账号矩阵中。</p>
                {/* 网格对齐展示 */}
                <div className="grid grid-cols-2 gap-2">
                  <ImageSlot src={imageMap.encapsulatedWorkflow1} alt="看" label="多节点全景看板" setLightboxUrl={setLightboxUrl} />
                  <ImageSlot src={imageMap.encapsulatedWorkflow2} alt="流" label="脚本自动派发流" setLightboxUrl={setLightboxUrl} />
                  <ImageSlot src={imageMap.encapsulatedWorkflow3} alt="资" label="资产关联节点" setLightboxUrl={setLightboxUrl} />
                  <ImageSlot src={imageMap.encapsulatedWorkflow4} alt="镜" label="分镜链式编排" setLightboxUrl={setLightboxUrl} />
                  <ImageSlot src={imageMap.tikTokDramaAccount1} alt="账" label="TikTok 矩阵主页 01" setLightboxUrl={setLightboxUrl} />
                  <ImageSlot src={imageMap.tikTokDramaAccount2} alt="据" label="单集数据转化验证" setLightboxUrl={setLightboxUrl} />
                </div>
                {/* One remaining from the 5 encapsulated screenshots */}
                <div className="w-full mt-1">
                  <ImageSlot src={imageMap.encapsulatedWorkflow5} alt="测" label="生成监视与质检" setLightboxUrl={setLightboxUrl} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: AI视觉设计 */}
      {activeTab === 'visual' && (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-400" /> 沉淀视觉工作流，让设计交付提效提质
            </h3>
            <p className="text-sm text-zinc-300">
              在日常运营设计中，协助团队沉淀了三条高复用性的生产流与一整套模型选型思路，帮助业务端快速响应海量物料需求。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-semibold text-purple-300">多场景业务真实落地成果</h4>
              <div className="grid grid-cols-2 gap-2">
                <ImageSlot src={imageMap.caseUSWinter} alt="1" label="美区冬日主题" setLightboxUrl={setLightboxUrl} />
                <ImageSlot src={imageMap.caseUSRanking} alt="2" label="限时榜单" setLightboxUrl={setLightboxUrl} />
                <ImageSlot src={imageMap.caseUSHalloween} alt="3" label="万圣节视觉" setLightboxUrl={setLightboxUrl} />
                <ImageSlot src={imageMap.caseBRStar} alt="4" label="巴西通案" setLightboxUrl={setLightboxUrl} />
                <ImageSlot src={imageMap.caseJPInvite} alt="5" label="日本拉新活动" setLightboxUrl={setLightboxUrl} />
                <ImageSlot src={imageMap.caseIPExtend} alt="6" label="IP 角色延展" setLightboxUrl={setLightboxUrl} />
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <h4 className="text-sm font-semibold text-purple-300">三条高优自动化工作流</h4>
                <div className="space-y-2">
                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg flex gap-3">
                    <span className="text-purple-400 font-bold">1</span>
                    <div>
                      <p className="text-sm font-medium text-zinc-200">高质量运营图工作流 (提效 150%)</p>
                      <p className="text-xs text-zinc-400 mt-1">多模型生图 → 细节精修 → 静帧输出及抠图 → 动效转化。</p>
                    </div>
                  </div>
                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg flex gap-3">
                    <span className="text-purple-400 font-bold">2</span>
                    <div>
                      <p className="text-sm font-medium text-zinc-200">IP 全案延展工作流 (提效 200%)</p>
                      <p className="text-xs text-zinc-400 mt-1">三视图定角 → 换装与姿势泛化 → 场景适配 → 动态赋予。</p>
                    </div>
                  </div>
                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg flex gap-3">
                    <span className="text-purple-400 font-bold">3</span>
                    <div>
                      <p className="text-sm font-medium text-zinc-200">标题物料生成工作流 (提效 200%)</p>
                      <p className="text-xs text-zinc-400 mt-1">文本指令发散 → 智能抠出 → 矢量化进入 Figma 编排。</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <div className="flex-1"><ImageSlot src={imageMap.workflowOpsFourSteps} alt="wf1" label="运营图流" setLightboxUrl={setLightboxUrl} /></div>
                  <div className="flex-1"><ImageSlot src={imageMap.workflowHalloweenCase} alt="wfcase" label="万圣节全案" setLightboxUrl={setLightboxUrl} /></div>
                  <div className="flex-1"><ImageSlot src={imageMap.workflowIPFourSteps} alt="wf2" label="IP 全案流" setLightboxUrl={setLightboxUrl} /></div>
                  <div className="flex-1"><ImageSlot src={imageMap.workflowTitleThreeSteps} alt="wf3" label="标题生成流" setLightboxUrl={setLightboxUrl} /></div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.015]">
            <h4 className="text-sm font-semibold text-purple-300">实战中的“选型与提示词”方法论</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <ImageSlot src={imageMap.modelSeedream3D} alt="m1" label="Seedream 3D" setLightboxUrl={setLightboxUrl} />
              <ImageSlot src={imageMap.modelSeedreamIllust} alt="m2" label="Seedream 插画" setLightboxUrl={setLightboxUrl} />
              <ImageSlot src={imageMap.modelSeedream4Style} alt="m3" label="风格还原" setLightboxUrl={setLightboxUrl} />
              <ImageSlot src={imageMap.modelSeedream4Lineart} alt="m4" label="线稿还原" setLightboxUrl={setLightboxUrl} />
              
              <ImageSlot src={imageMap.modelTipFastGen} alt="t1" label="速涂转高精组合拳" setLightboxUrl={setLightboxUrl} />
              <ImageSlot src={imageMap.modelTipFaceChange} alt="t2" label="表情与五官微调" setLightboxUrl={setLightboxUrl} />
              <ImageSlot src={imageMap.modelTipSceneChange} alt="t3" label="环境光影适配" setLightboxUrl={setLightboxUrl} />
              <ImageSlot src={imageMap.promptI2TInvert} alt="t4" label="图生文反推提示词" setLightboxUrl={setLightboxUrl} />
              
              <ImageSlot src={imageMap.promptI2TCompare} alt="t5" label="多模型测比提纯" setLightboxUrl={setLightboxUrl} />
              <ImageSlot src={imageMap.promptStructure3D} alt="t6" label="3D结构化提示词" setLightboxUrl={setLightboxUrl} />
              <ImageSlot src={imageMap.promptCrateFlow} alt="t7" label="Crate节点组装" setLightboxUrl={setLightboxUrl} />
              <ImageSlot src={imageMap.promptCrateNodeFireplace} alt="t8" label="模块化风格调用" setLightboxUrl={setLightboxUrl} />
              
              <div className="col-span-2 md:col-span-4 max-w-sm mx-auto w-full">
                <ImageSlot src={imageMap.promptCrateToucan} alt="t9" label="高完成度实操案例" setLightboxUrl={setLightboxUrl} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: 社区与资产沉淀 */}
      {activeTab === 'community' && (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-400" /> 将能力赋能团队：Crate 社区运营
            </h3>
            <p className="text-sm text-zinc-300">
              再好的工作流，若只停在个人文档里也没有价值。我参与了 TikTok Crate 内部社区的日常与活动运营，确保大家都能“一键套用”优质资产，实现能力在团队里的规模化扩散。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ImageSlot src={imageMap.communityPlacement1} alt="com1" label="主页与入口推送" setLightboxUrl={setLightboxUrl} />
            <ImageSlot src={imageMap.communityPlacement2} alt="com2" label="创作板块指南" setLightboxUrl={setLightboxUrl} />
            <ImageSlot src={imageMap.communityPlacement3} alt="com3" label="专题与案例库" setLightboxUrl={setLightboxUrl} />
          </div>
        </div>
      )}

    </div>
  );
}
