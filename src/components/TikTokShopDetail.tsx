import React, { useState } from 'react';
import { Sparkles, TrendingUp, Users, ShoppingBag, Eye, MousePointerClick, ShieldCheck, Zap, Compass, Video, LayoutGrid } from 'lucide-react';
import { CustomVideoPlayer } from './CustomVideoPlayer';

interface TikTokShopDetailProps {
  language: 'zh' | 'en';
  t: (zh: any, en: any) => any;
  setLightboxUrl: (url: string | null) => void;
}

export function TikTokShopDetail({ language, t, setLightboxUrl }: TikTokShopDetailProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const momImages = [
    "/images/20260623203034220.webp",
    "/images/20260623203043385.webp",
    "/images/20260626234018615.webp",
    "/images/20260626234030573.webp"
  ];

  const sarahImages = [
    "/images/20260626235441857.webp",
    "/images/20260626235516551.webp",
    "/images/20260626235532913.webp",
    "/images/20260626235543533.webp"
  ];

  const screenshotImages = [
    "/images/20260913033041780.webp",
    "/images/20260913033052549.webp",
    "/images/20260913033104592.webp",
    "/images/20260913033120676.webp"
  ];

  const otherImages = [
    "/images/20260623204651953.webp",
    "/images/20260623204703048.webp",
    "/images/20260623204714606.webp",
    "/images/20260623204724294.webp"
  ];

  const deliverableImages = [
    "/images/20260623201724869.webp",
    "/images/20260627001319249.webp",
    "/images/20260623201745242.webp",
    "/images/20260623201804509.webp"
  ];

  const viralVideos = [
    "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/tiktok1.mp4",
    "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/tiktok2.mp4",
    "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/tiktok3.mp4",
    "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/tiktok4.mp4"
  ];

  const tabs = [
    { id: 'overview', label: t('项目概述', 'Overview'), icon: Compass },
    { id: 'matrix', label: t('矩阵与爆款展示', 'Account Matrix & Viral Videos'), icon: Video },
    { id: 'data', label: t('数据成果与精细运营', 'Data & Operations'), icon: TrendingUp }
  ];

  return (
    <div className="flex flex-col gap-6 text-zinc-300 font-sans">
      
      {/* Title & Metadata Panel */}
      <div className="p-6 sm:p-8 rounded-3xl border border-white/5 bg-white/[0.02] flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-xs text-sky-400 tracking-wider font-mono font-semibold uppercase">
            {t("字节跳动抖音集团 · 上海", "ByteDance Douyin Group • Shanghai")}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
            {t("TikTok Shop AIGC 内容创作与运营", "TikTok Shop AIGC Content Creation & Operations")}
          </h2>
          <p className="text-sm md:text-base text-zinc-300">
            {t("参与构建美区服饰电商内容生态，推动矩阵账号从0到1商业化跑通。", "Co-building the US apparel e-commerce content ecosystem and driving matrix account monetization from 0 to 1.")}
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/5 text-sm">
          <div className="flex flex-col gap-1">
            <span className="text-zinc-500 text-xs uppercase">职位</span>
            <span className="text-zinc-200">AIGC内容与运营 (美区服饰)</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-zinc-500 text-xs uppercase">时间</span>
            <span className="text-zinc-200">2026.04 — 2026.07</span>
          </div>
          <div className="flex flex-col gap-1 md:col-span-2">
            <span className="text-zinc-500 text-xs uppercase">团队</span>
            <span className="text-zinc-200">TikTok Shop 自运营团队</span>
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
              <Compass className="w-5 h-5 text-sky-400" /> 协作破局：打造 AIGC 电商内容生态
            </h3>
            <p className="text-zinc-300 leading-relaxed font-light text-sm sm:text-base">
              在 TikTok Shop 团队中，我深度参与了美区服饰品类 AIGC 自运营内容的 0 到 1 建设。主要职责是从以往纯手工作坊式的短视频制作模式，升级为“核心创意指导 + AI 自动化辅助”的工作流。通过跨部门协同合作，我们跑通了多个垂直受众群的矩阵账号，内容产能和点击转化率获得了实质性提升。
            </p>
            
            <div 
              onClick={() => setLightboxUrl("/images/20260627001230912.webp")}
              className="relative mt-2 rounded-xl overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer w-full max-w-2xl mx-auto"
              title={t("点按查看大图", "Click to zoom")}
            >
              <img 
                src="/images/20260627001230912.webp" 
                alt="内容升级链路" 
                className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-transparent group-hover:bg-black/25 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                <span className="bg-black/60 text-white text-[11px] px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-sky-400" /> 看清完整升级链路
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 rounded-xl border border-sky-500/20 bg-sky-500/[0.03] flex flex-col gap-2">
                <span className="text-sky-300 font-bold">产能升级：全流程制作</span>
                <p className="text-xs text-zinc-400">将海内外主流 AI 工具组合应用，完成从商品卖点提炼、自动化脚本到成片剪辑的全流程，累计参与产出带货短视频 500+ 条。</p>
              </div>
              <div className="p-4 rounded-xl border border-sky-500/20 bg-sky-500/[0.03] flex flex-col gap-2">
                <span className="text-sky-300 font-bold">精细运营：账号矩阵化</span>
                <p className="text-xs text-zinc-400">结合受众画像，制定了覆盖全年龄段与全身材类型的矩阵号策略，打透垂直领域推荐算法。</p>
              </div>
              <div className="p-4 rounded-xl border border-sky-500/20 bg-sky-500/[0.03] flex flex-col gap-2">
                <span className="text-sky-300 font-bold">策略迭代：数据驱动</span>
                <p className="text-xs text-zinc-400">每天复盘后台数据，提炼高转化率爆款视频共性，反哺为可复制的结构化脚本模板。</p>
              </div>
              <div className="p-4 rounded-xl border border-sky-500/20 bg-sky-500/[0.03] flex flex-col gap-2">
                <span className="text-sky-300 font-bold">团队配合：跨部门协同</span>
                <p className="text-xs text-zinc-400">向上承接行业招买团队的货品特性，向下联调工具研发侧优化反馈，确保内容调性贴合商品特征。</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: 矩阵与爆款展示 */}
      {activeTab === 'matrix' && (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
          
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Video className="w-5 h-5 text-sky-400" /> 真正落地：矩阵账号与爆款集锦
            </h3>
            <p className="text-sm text-zinc-300">
              根据不同的受众年龄和身材，我们跑通了多个账号的从0到1孵化。下面展示的是我们孵化的四个代表性爆款视频，以及整体视觉资产输出成效。
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-black/20 p-4 rounded-2xl border border-white/5">
              {viralVideos.map((url, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <div className="rounded-xl overflow-hidden border border-white/10 bg-zinc-900">
                    <CustomVideoPlayer src={url} language={language} aspectRatio="aspect-[9/16]" />
                  </div>
                  <span className="text-xs text-zinc-400 text-center font-mono">爆款实测 0{idx + 1}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <LayoutGrid className="w-4 h-4 text-sky-400" /> 整体视觉与排版资产沉淀
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {deliverableImages.map((url, index) => (
                <div 
                  key={index} 
                  onClick={() => setLightboxUrl(url)}
                  className="relative aspect-[9/16] rounded-xl overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer"
                >
                  <img src={url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Eye className="w-4 h-4 text-white" />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-center text-zinc-500">In-house 服饰自运营渠道日常排版与物料输出预览</p>
          </div>

        </div>
      )}

      {/* Tab Content: 数据成果与精细运营 */}
      {activeTab === 'data' && (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
          
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-sky-400" /> 数据成果：用精细化运营撬动高倍转化
            </h3>
            <div className="p-4 rounded-xl bg-sky-500/[0.04] border border-sky-500/10 flex flex-col gap-4">
              <h5 className="text-sm font-semibold text-sky-300 tracking-wide">
                账号矩阵整体大盘表现
              </h5>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl flex flex-col">
                  <span className="text-xs text-zinc-500 uppercase tracking-wider">成交规模 (GMV)</span>
                  <span className="text-xl font-bold text-white mt-1">$40,000+</span>
                  <span className="text-xs text-zinc-400 shrink-0 mt-1">服饰品类整体归因</span>
                </div>
                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl flex flex-col">
                  <span className="text-xs text-zinc-500 uppercase tracking-wider">单日GMV峰值</span>
                  <span className="text-xl font-bold text-white mt-1">突破 $2000+</span>
                  <span className="text-xs text-zinc-400 shrink-0 mt-1">爆款期最高值</span>
                </div>
                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl col-span-2 md:col-span-1 flex flex-col">
                  <span className="text-xs text-zinc-500 uppercase tracking-wider">多维总数据表现</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xl font-bold text-white">341.1K</span>
                    <span className="text-xs text-zinc-400">播放量</span>
                  </div>
                  <div className="text-xs text-zinc-400 flex items-center justify-between mt-1 pt-1 border-t border-white/5">
                    <span>曝光 383.3K</span>
                    <span>点击 24.0K</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-2">
              <div onClick={() => setLightboxUrl("/images/20260629214145260.webp")} className="cursor-pointer max-w-xl group relative rounded-xl overflow-hidden border border-white/5">
                <img src="/images/20260629214145260.webp" className="w-full" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                  <Eye className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 pt-4 border-t border-white/5">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-sky-400" /> 垂类精细运营案例拆解
            </h4>

            {/* Case 1: CurvySarah */}
            <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.015] flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <h5 className="font-semibold text-white">案例一：成熟大码女装 (CurvySarah)</h5>
                <span className="text-xs text-sky-300 font-mono">度假长裙与通勤套装</span>
              </div>
              <p className="text-sm text-zinc-300 font-light">
                聚焦 2XL/3XL 丰满女性，人设贴合中年女性度假、户外市集场景。仅凭 35 条挂车短视频，撬动了海量公域自然流量，单条黄色长裙爆款独立带来 109 件成交。
              </p>
              
              <div className="flex flex-col gap-4 mt-2">
                <div className="flex flex-col gap-2">
                  <span className="text-xs text-zinc-400 font-mono tracking-wider uppercase">账号主页</span>
                  <div 
                    onClick={() => setLightboxUrl("/images/20260629214547440.webp")}
                    className="relative w-full max-w-sm rounded-xl overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer"
                  >
                    <img src="/images/20260629214547440.webp" className="w-full h-auto object-contain group-hover:scale-[1.01] transition-all" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                       <span className="text-[11px] bg-black/60 px-3 py-1.5 rounded-full border border-white/10 text-white flex items-center gap-1.5"><Eye className="w-3.5 h-3.5 text-sky-400" /> 点击查看</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <span className="text-xs text-zinc-400 font-mono tracking-wider uppercase">人物资产库与图文素材</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {sarahImages.map((url, idx) => (
                      <div key={idx} onClick={() => setLightboxUrl(url)} className="relative aspect-auto rounded-lg overflow-hidden border border-white/5 cursor-pointer group">
                        <img src={url} className="w-full h-full object-cover group-hover:scale-[1.02] transition-all" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center"><Eye className="w-4 h-4 text-white"/></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Case 2: TheBossMomFits */}
            <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.015] flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <h5 className="font-semibold text-white">案例二：时尚职场宝妈 (TheBossMomFits)</h5>
                <span className="text-xs text-sky-300 font-mono">美式辣妹与极简职场</span>
              </div>
              <p className="text-sm text-zinc-300 font-light">
                锚定热爱穿搭的都市职场宝妈，通过强视觉冲击力的紧身打底单品跑赢流量。单条粉色高腰裤爆款视频创下 61.3K 播放、单日成单 54 件的亮眼数据，并有效拉高了整体复购率。
              </p>
              
              <div className="flex flex-col gap-4 mt-2">
                <div className="flex flex-col gap-2">
                  <span className="text-xs text-zinc-400 font-mono tracking-wider uppercase">账号主页</span>
                  <div 
                    onClick={() => setLightboxUrl("/images/20260913032958431.webp")}
                    className="relative w-full max-w-sm rounded-xl overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer"
                  >
                    <img src="/images/20260913032958431.webp" className="w-full h-auto object-contain group-hover:scale-[1.01] transition-all" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                       <span className="text-[11px] bg-black/60 px-3 py-1.5 rounded-full border border-white/10 text-white flex items-center gap-1.5"><Eye className="w-3.5 h-3.5 text-sky-400" /> 点击查看</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <span className="text-xs text-zinc-400 font-mono tracking-wider uppercase">人物资产库与图文素材</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {momImages.map((url, idx) => (
                      <div key={idx} onClick={() => setLightboxUrl(url)} className="relative aspect-auto rounded-lg overflow-hidden border border-white/5 cursor-pointer group">
                        <img src={url} className="w-full h-full object-cover group-hover:scale-[1.02] transition-all" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center"><Eye className="w-4 h-4 text-white"/></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Case 3: 更多垂类 */}
            <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.015] flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <h5 className="font-semibold text-white">案例三：其他矩阵号数据截图</h5>
                <span className="text-xs text-sky-300 font-mono">矩阵协同效应</span>
              </div>
              <p className="text-sm text-zinc-300 font-light">
                针对其他垂类细分市场的矩阵账号，持续贡献着长尾 GMV，验证了由我们梳理的 AIGC 内容框架具有跨品类复用的高度兼容性。
              </p>
              
              <div className="flex flex-col gap-4 mt-2">
                <div className="flex flex-col gap-2">
                  <span className="text-xs text-zinc-400 font-mono tracking-wider uppercase">矩阵账号数据截图</span>
                  <div className="grid grid-cols-2 gap-4">
                    {screenshotImages.map((url, idx) => (
                      <div key={idx} onClick={() => setLightboxUrl(url)} className="relative aspect-auto rounded-lg overflow-hidden border border-white/5 cursor-pointer group">
                        <img src={url} className="w-full h-full object-cover group-hover:scale-[1.02] transition-all" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center"><Eye className="w-4 h-4 text-white"/></div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs text-zinc-400 font-mono tracking-wider uppercase">人物资产库与图文素材</span>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {otherImages.map((url, idx) => (
                      <div key={idx} onClick={() => setLightboxUrl(url)} className="relative aspect-auto rounded-lg overflow-hidden border border-white/5 cursor-pointer group">
                        <img src={url} className="w-full h-full object-cover group-hover:scale-[1.02] transition-all" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center"><Eye className="w-4 h-4 text-white"/></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
