import React from 'react';
import { Sparkles, TrendingUp, Users, ShoppingBag, Eye, MousePointerClick, ShieldCheck, Zap } from 'lucide-react';
import { CustomVideoPlayer } from './CustomVideoPlayer';

interface TikTokShopDetailProps {
  language: 'zh' | 'en';
  t: (zh: any, en: any) => any;
  setLightboxUrl: (url: string | null) => void;
}

export function TikTokShopDetail({ language, t, setLightboxUrl }: TikTokShopDetailProps) {
  // Image links for Account 1: CurvyChicHub
  const curvyImages = [
    "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623202858799.webp",
    "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623202910810.webp",
    "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623202923521.webp",
    "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623202934022.webp"
  ];

  // Image links for Account 2: TheBossMomFits
  const momImages = [
    "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623203034220.webp",
    "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623203043385.webp",
    "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260626234018615.webp",
    "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260626234030573.webp"
  ];

  // Image links for Account: CurvySarah
  const sarahImages = [
    "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260626235441857.webp",
    "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260626235516551.webp",
    "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260626235532913.webp",
    "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260626235543533.webp"
  ];

  // Image links for Other niche/vertical accounts
  const otherImages = [
    "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623204651953.webp",
    "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623204703048.webp",
    "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623204714606.webp",
    "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623204724294.webp"
  ];

  return (
    <div className="flex flex-col gap-10 text-zinc-300 font-sans">
      
      {/* Title & Metadata Panel */}
      <div className="p-5 sm:p-8 rounded-2xl md:rounded-3xl border border-white/5 bg-white/[0.01] flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-sky-400 tracking-wider font-mono font-semibold uppercase">
            {t("字节跳动抖音集团 · 实习履历", "ByteDance Douyin Group • Internship Experience")}
          </span>
          <h4 className="text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-wide">
            {t("抖音TikTok Shop AIGC内容运营与设计", "Douyin TikTok Shop AIGC Content Operations & Design")}
          </h4>
        </div>
        
        {/* Metadata Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4 text-sm sm:text-base border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-zinc-500 text-xs uppercase tracking-wider">{t("公司", "Company")}</span>
            <span className="text-zinc-200 font-light mt-0.5">{t("字节跳动", "ByteDance")}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-zinc-500 text-xs uppercase tracking-wider">{t("实习时间", "Internship Period")}</span>
            <span className="text-zinc-200 font-light mt-0.5">{t("2026.04 — 至今", "April 2026 — Present")}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-zinc-500 text-xs uppercase tracking-wider">{t("地点", "Location")}</span>
            <span className="text-zinc-200 font-light mt-0.5">{t("上海", "Shanghai, China")}</span>
          </div>
          <div className="col-span-1 sm:col-span-3 flex flex-col">
            <span className="text-zinc-500 text-xs uppercase tracking-wider">{t("职位", "Position")}</span>
            <span className="text-zinc-200 font-light mt-0.5">
              {t("AIGC内容运营与设计（TikTok Shop 美国站服饰品类）", "AIGC Content Operations & Design (TikTok Shop US Apparel)")}
            </span>
          </div>
          <div className="col-span-1 sm:col-span-3 flex flex-col">
            <span className="text-zinc-500 text-xs uppercase tracking-wider">{t("团队", "Team")}</span>
            <span className="text-zinc-200 font-light mt-0.5">
              {t("TikTok Shop 美区国家线Inhouse 自运营渠道团队", "TikTok Shop US In-house Self-operated Channel Team")}
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
              "作为 TikTok Shop 美国站服饰品类 AIGC内容运营与设计，我深度参与国际电商 AIGC 自运营内容生态建设，独立负责双账号矩阵的全流程运营工作，覆盖从创意策划、AI 视频生成 to 数据复盘的完整链路。",
              "As a TikTok Shop US Apparel AIGC Content Operations & Design lead, I was deeply involved in establishing the self-operated AIGC content ecosystem for cross-border e-commerce, taking sole responsibility for double-account matrix operations covering creative design, AI video generation, and analytics."
            )}
          </p>
          <p>
            {t(
              "入职第一个月完成矩阵账号单日 1000+ 美元 GMV，内容产能与商品转化效率同步显著提升。参与 0 到 1 的内容生产体系搭建，工作模式全面升级：从手动制作单条视频转向创意类指导 BPO 团队 + 搭配 AI Agent 自动化生产，个人核心聚焦于爆款内容Prompt模板研发、持续迭代优化视频脚本、账号差异化策略规划与跨部门协同，实现了内容产能与转化效率的双重突破。",
              "In the first month, I achieved a single-day GMV of $1,000+ across matrix accounts, with content capacity and product conversion rates rising significantly. Participating in setting up the content production ecosystem from ground zero, my workflow evolved completely: shifting from manual individual video design to directing BPO teams and using AI Agent automation. My core focus was elevated to viral Prompt templates, video script iterations, matrix demographic strategies, and cross-team collaborations, achieving breakthroughs in both output and conversion efficiency."
            )}
          </p>
        </div>
        
        <div 
          onClick={() => setLightboxUrl("https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260627001230912.webp")}
          className="relative rounded-xl overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer w-full"
          title={t("点按查看大图", "Click to zoom")}
        >
          <img 
            src="https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260627001230912.webp" 
            alt="Content Production Workflow Upgrade" 
            className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-transparent group-hover:bg-black/25 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
            <span className="bg-black/60 text-white text-[11px] px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-sky-400" />
              {t("点按查看清晰大图", "Click to zoom")}
            </span>
          </div>
        </div>
      </div>

      {/* 核心工作职能 (01 - 04) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
        {[
          {
            title: "AIGC 内容全流程制作",
            enTitle: "All-Round AIGC Content Production",
            desc: "熟练运用 Sora、Gemini、ChatGPT、Veo、即梦、可灵等国内外主流 AI 工具，独立完成从商品卖点提炼、脚本模板设计到 AI 视频生成、后期剪辑的全流程工作，累计产出电商短视频 500 + 条",
            enDesc: "Mastered global AIGC tools (Sora, Gemini, ChatGPT, Veo, Dreamina, Kling), managing the full scope from feature extraction and script structure to final render and edits, generating 500+ videos."
          },
          {
            title: "多账号差异化运营",
            enTitle: "Multi-Account Tailored Operations",
            desc: "针对多个账号不同的用户群体，制定差异化的内容策略和选品方向，形成覆盖全年龄段、全身材类型的内容矩阵",
            enDesc: "Created discrete visual and merchandising directions for different targets, building a matrix covering diverse body types and age segments."
          },
          {
            title: "数据驱动内容优化",
            enTitle: "Data-Informed Creative Upgrades",
            desc: "每日复盘 TikTok Shop 后台数据，分析爆款视频的共性特征，提炼可复制的内容模板，应用于后续内容生产，显著提升了整体转化率",
            enDesc: "Analyzed TikTok Shop back-end metrics daily to trace viral video commonalities, formulating repeatable templates to increase conversion rates."
          },
          {
            title: "跨部门协同合作",
            enTitle: "Cross-Functional Collaboration",
            desc: "与行业招买团队对接，深入理解不同服饰品类的商品特性与用户需求；与产品研发团队沟通 AI 工具使用痛点，提出功能优化建议，提升整体内容生产效率",
            enDesc: "Synced with merchants/buyers to grasp SKU styles, while relaying user pain points and feature suggestions directly to internal AI tool developers."
          }
        ].map((item, idx) => (
          <div key={idx} className="group flex gap-3.5 p-4 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10 transition-all duration-300 items-start">
            <span className="text-sm font-mono text-sky-400 font-bold shrink-0 mt-0.5">0{idx + 1}</span>
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-zinc-100 group-hover:text-sky-300 transition-colors duration-300">
                {t(item.title, item.enTitle)}
              </span>
              <p className="text-xs md:text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors duration-350 leading-relaxed font-light text-justify">
                {t(item.desc, item.enDesc)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 爆款视频展示 (一行四个视频) */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-white/5 pb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-300" />
          <h4 className="text-sm md:text-base uppercase tracking-[0.1em] font-bold text-white/95">
            {t("爆款视频展示", "Viral Video Showcases")}
          </h4>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/tiktok1.mp4",
            "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/tiktok2.mp4",
            "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/tiktok3.mp4",
            "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/tiktok4.mp4"
          ].map((src, index) => (
            <div key={index} className="flex flex-col gap-2">
              <CustomVideoPlayer 
                src={src} 
                language={language}
                aspectRatio="aspect-[9/16]"
              />
              <span className="text-[10px] text-zinc-500 font-mono tracking-wider text-center">
                {t(`爆款视频 #${index + 1}`, `Viral Video #${index + 1}`)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 二、核心数据成果 */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-white/5 pb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-300" />
          <h4 className="text-sm md:text-base uppercase tracking-[0.1em] font-bold text-white/95">
            {t("二、核心数据成果", "II. Performance Accomplishments")}
          </h4>
        </div>

        {/* 整体业绩 */}
        <div className="p-4 rounded-xl bg-sky-400/[0.01] border border-sky-500/10 flex flex-col gap-3">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-sky-400" />
            <h5 className="text-xs md:text-sm font-semibold text-sky-300 tracking-wide">
              {t("账号矩阵整体业绩", "Matrix Overall Outflow Achievements")}
            </h5>
          </div>
          
          {/* Performance Highlight Metrics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl flex flex-col">
              <span className="text-[9px] text-zinc-500 uppercase tracking-wider">{t("成交规模 (GMV)", "GMV Outflow")}</span>
              <span className="text-base font-bold text-white mt-1">$15,000+</span>
              <span className="text-[9px] text-zinc-400 shrink-0 font-light mt-1">{t("服饰品类归因", "Apparel Attributed")}</span>
            </div>
            
            <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl flex flex-col">
              <span className="text-[9px] text-zinc-500 uppercase tracking-wider">{t("总销量", "Units Sold")}</span>
              <span className="text-base font-bold text-white mt-1">1100+ 件</span>
              <span className="text-[9px] text-zinc-400 shrink-0 font-light mt-1">{t("订单量累计", "Attributed Sale Orders")}</span>
            </div>

            <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl col-span-2 md:col-span-1 flex flex-col">
              <span className="text-[9px] text-zinc-500 uppercase tracking-wider">{t("多维总数据表现", "Aggregate Traffic")}</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-xs font-semibold text-white">341.1K</span>
                <span className="text-[9px] text-zinc-500">{t("播放", "Views")}</span>
              </div>
              <div className="text-[9px] text-zinc-400 font-light flex items-center justify-between mt-1">
                <span>{t("曝光 383.3K", "Imp 383.3K")}</span>
                <span>{t("点击 24.0K", "Clicks 24.0K")}</span>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-zinc-400 leading-normal font-light">
            {t("※ 账号矩阵精准覆盖美国大码女性两大核心细分人群，差异化垂直拉新转化效果拔群。", "※ Strategically targeted two core segments of plus-size US women, generating high conversion outcomes.")}
          </p>
        </div>

        {/* 四个排成一排的缩略图 */}
        <div className="flex flex-col gap-4.5 pt-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
            {[
              "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623201724869.webp",
              "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260627001319249.webp",
              "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623201745242.webp",
              "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623201804509.webp"
            ].map((url, index) => (
              <div 
                key={index} 
                onClick={() => setLightboxUrl(url)}
                className="relative aspect-[9/16] rounded-xl overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer"
                title={t("点按查看大图", "Click to zoom")}
              >
                <img 
                  src={url} 
                  alt={`Deliverable Showcase ${index + 1}`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-black/60 text-white text-[10px] px-2 py-1 rounded-full border border-white/10 flex items-center gap-1">
                    <Eye className="w-3 h-3 text-sky-400" />
                    {t("查看", "View")}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-zinc-400 font-sans tracking-wide text-center font-light">
            {t("inhouse整体数据展示", "In-house overall data display")}
          </p>
        </div>

        {/* 账号：CurvySarah */}
        <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 flex flex-col gap-4">
          <div className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4 text-sky-400" />
              <h5 className="text-xs md:text-sm font-semibold text-zinc-100">
                {t("账号：CurvySarah 白人中年大码女装", "Account: CurvySarah (Mature White Plus-size Apparel)")}
              </h5>
            </div>
          </div>

          {/* Images Display */}
          <div className="flex flex-col gap-3 mt-1.5">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1 text-[10px] text-zinc-500 uppercase tracking-widest leading-none pt-1">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span>{t("账号主页", "Account Homepage")}</span>
              </div>
              <div 
                onClick={() => setLightboxUrl("https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260626235423987.webp")}
                className="relative rounded-xl overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer"
                title={t("点按查看大图", "Click to zoom")}
              >
                <img src="https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260626235423987.webp" className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-transparent group-hover:bg-black/25 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                  <span className="bg-black/60 text-white text-[11px] px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-sky-400" />
                    {t("点按查看清晰大图", "Click to zoom")}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1 text-[10px] text-zinc-500 uppercase tracking-widest leading-none pt-1">
                <TrendingUp className="w-3.5 h-3.5 text-sky-400" />
                <span>{t("账号日常数据与销售分析", "Account Sales & Conversion Analytics")}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {sarahImages.map((url, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setLightboxUrl(url)}
                    className="relative aspect-auto rounded-xl overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer"
                    title={t("点按查看大图", "Click to zoom")}
                  >
                    <img src={url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-transparent group-hover:bg-black/25 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                      <MousePointerClick className="w-5 h-5 text-white/80 drop-shadow" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* 一、账号基础定位 */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-sky-300 uppercase tracking-wider">{t("1. 账号基础定位", "1. Account Positioning & Niche")}</span>
              <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-light text-justify">
                {t(
                  "本土 40 + 白人成熟大码女装垂类账号，聚焦 2XL/3XL 丰满身材女性，主打度假长裙、休闲通勤套装，人设温柔优雅，贴合中年女性日常 brunch、市集、户外出行场景；账号粉丝 82、总点赞 3665，依托真人户外实景实拍内容撬动海量自然公域流量，精准覆盖追求舒适大气版型的熟龄白人女性。",
                  "US local 40+ mature white plus-size women's wear vertical account, focusing on 2XL/3XL curvy body shapes. Features resort maxi dresses and casual commuter sets. The persona is warm and elegant, perfectly matching daily brunch, local markets, and outdoor activities of middle-aged women. 82 followers and 3,665 total likes. Leverages real-person outdoor on-site try-on footage to capture massive organic recommendation traffic, precisely covering mature white women seeking comfortable and elegant silhouettes."
                )}
              </p>
            </div>

            {/* 二、整体销售增长数据（6.1-6.24 周期） */}
            <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
              <span className="text-xs font-semibold text-sky-300 uppercase tracking-wider">{t("2. 整体销售增长数据（6.1-6.24 周期）", "2. Overall Sales Growth Data (6.1-6.24 Period)")}</span>
              <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-light text-justify">
                {t(
                  "总归因 GMV $4.1K，累计成交 249 件商品，全账号选品评分 4.4 分，版型适配度、用户接受度表现优异；\n流量增速爆发：商品曝光环比 + 848K%、商品点击环比 + 975K%，短视频总观看 183.1K，播放量环比涨幅 916K%，少量短视频即可撬动巨大增量流量，内容算法适配度拉满；\n单日短期数据佐证增长潜力：单日期内 GMV $1.2K、成交 69 件，GMV 环比 + 104%、成交环比 + 130%，短期转化持续走高，增长趋势稳定。",
                  "Total attributed GMV reached $4.1K with 249 completed product sales and a solid merchandise review rating of 4.4. Outstanding performance in silhouette fit and consumer acceptance.\nExplosive traffic growth: Product impressions MoM +848K%, product clicks MoM +975K%, and short-form video views reaching 183.1K (MoM increase of 916K%). A few targeted videos were able to pull in massive incremental organic traffic, proving high compatibility with the platform's algorithm.\nShort-term performance records: Peak daily GMV hit $1.2K with 69 units sold (daily GMV MoM +104%, unit sales MoM +130%), confirming stable long-term growth and rising conversion potential."
                ).split('\n').map((line, i) => (
                  <span key={i} className="block mt-1.5 first:mt-0">{line}</span>
                ))}
              </p>
            </div>

            {/* 三、爆款单品 & 头部视频转化拆解 */}
            <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
              <span className="text-xs font-semibold text-sky-300 uppercase tracking-wider">{t("3. 爆款单品 & 头部视频转化拆解", "3. Bestselling Products & Pinned Video Breakdown")}</span>
              <p className="text-xs text-zinc-450 font-light">
                {t(
                  "账号仅 35 条挂车短视频就完成高额 GMV 产出，头部单条视频贡献过半营收，爆款承载力极强：",
                  "With only 35 shoppable videos, the account yielded high-margin GMV, with top-performing single videos accounting for over half of total revenue:"
                )}
              </p>
              <div className="space-y-2 mt-1">
                <div className="group flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0 transition-colors duration-350 group-hover:bg-sky-300" />
                  <p className="text-xs md:text-sm text-zinc-300 leading-normal group-hover:text-sky-300 transition-colors duration-300 font-light">
                    <strong className="text-zinc-100 font-medium group-hover:text-sky-200">{t("黄色挂脖度假长裙视频：", "Yellow Halterneck Resort Maxi Dress: ")}</strong>
                    {t(
                      "播放 111.4K，单条归因 GMV $2.0K，独立成交 109 件，是账号核心爆款，户外市集场景 + 高饱和亮色完美击中度假穿搭需求；",
                      "111.4K views, attributed GMV $2.0K, 109 orders. Pinned core bestseller, pairing outdoor market backgrounds with bright colors to hit resort wear demand."
                    )}
                  </p>
                </div>
                <div className="group flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0 transition-colors duration-350 group-hover:bg-sky-300" />
                  <p className="text-xs md:text-sm text-zinc-300 leading-normal group-hover:text-sky-300 transition-colors duration-300 font-light">
                    <strong className="text-zinc-100 font-medium group-hover:text-sky-200">{t("镂空两件套休闲套装视频：", "Cutout Two-Piece Casual Set: ")}</strong>
                    {t(
                      "播放 41.0K，单条归因 GMV $1.1K，成交 79 件，兼顾日常休闲、户外聚会双重场景，复购潜力高；",
                      "41.0K views, attributed GMV $1.1K, 79 orders. Versatile for daily leisure and garden parties, carrying high repeat purchase rates."
                    )}
                  </p>
                </div>
                <div className="group flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0 transition-colors duration-350 group-hover:bg-sky-300" />
                  <p className="text-xs md:text-sm text-zinc-300 leading-normal group-hover:text-sky-300 transition-colors duration-300 font-light">
                    <strong className="text-zinc-100 font-medium group-hover:text-sky-200">{t("印花针织连衣裙视频：", "Floral Knit Dress: ")}</strong>
                    {t(
                      "归因 GMV $650.02，成交 43 件，通勤居家两用，承接日常刚需穿搭流量。",
                      "Attributed GMV $650.02, 43 orders. Dual-purpose commute/lounge dress, capturing daily wardrobe replacement traffic."
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* 四、流量与转化逻辑优势 */}
            <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
              <span className="text-xs font-semibold text-sky-300 uppercase tracking-wider">{t("4. 流量与转化逻辑优势", "4. Traffic & Conversion Logic Advantages")}</span>
              <div className="space-y-2 mt-1">
                <div className="group flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0 transition-colors duration-350 group-hover:bg-sky-300" />
                  <p className="text-xs md:text-sm text-zinc-300 leading-normal group-hover:text-sky-300 transition-colors duration-300 font-light">
                    <strong className="text-zinc-100 font-medium group-hover:text-sky-200">{t("爆款爆发力极强：", "Exceptional Virality: ")}</strong>
                    {t(
                      "单条视频最高播放 251.5K，多条视频稳定十几万曝光，极低粉丝体量下持续收割公域推荐流量，不依赖私域粉丝变现；",
                      "Peak single video reached 251.5K views, with others consistently drawing 100K+ impressions. Converts organic recommendations on extremely low follower counts."
                    )}
                  </p>
                </div>
                <div className="group flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0 transition-colors duration-350 group-hover:bg-sky-300" />
                  <p className="text-xs md:text-sm text-zinc-300 leading-normal group-hover:text-sky-300 transition-colors duration-300 font-light">
                    <strong className="text-zinc-100 font-medium group-hover:text-sky-200">{t("商品点击转化链路通畅：", "Frictionless Store Funnel: ")}</strong>
                    {t(
                      "总商品曝光 211.9K、总点击 9.8K，长款度假裙、休闲套装封面视觉吸引力突出，用户点击进店意愿强；",
                      "Total impressions 211.9K and 9.8K clicks. Long resort dresses and casual coordinates offer strong cover appeal to drive clicks."
                    )}
                  </p>
                </div>
                <div className="group flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0 transition-colors duration-350 group-hover:bg-sky-300" />
                  <p className="text-xs md:text-sm text-zinc-300 leading-normal group-hover:text-sky-300 transition-colors duration-300 font-light">
                    <strong className="text-zinc-100 font-medium group-hover:text-sky-200">{t("内容标准化高效产出：", "Standardized Content Loop: ")}</strong>
                    {t(
                      "统一 15 秒竖屏实拍，户外生活化场景 + 真人沉浸式上身试穿，弱化硬广推销感，种草说服力更强。",
                      "Standardized 15s vertical trials in natural outdoor settings, softening sales hooks for higher organic engagement and organic persuasion."
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 账号：Chloe's Try-Ons */}
        <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 flex flex-col gap-4">
          <div className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4 text-sky-400" />
              <h5 className="text-xs md:text-sm font-semibold text-zinc-100">
                {t("账号：Chloe's Try-Ons 轻熟气质女装账号", "Account: Chloe's Try-Ons (Elegant Chic Apparel)")}
              </h5>
            </div>
          </div>

          {/* Images Display */}
          <div className="flex flex-col gap-3 mt-1.5">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1 text-[10px] text-zinc-500 uppercase tracking-widest leading-none pt-1">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span>{t("账号主页", "Account Homepage")}</span>
              </div>
              <div 
                onClick={() => setLightboxUrl("https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623202221958.webp")}
                className="relative rounded-xl overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer"
                title={t("点按查看大图", "Click to zoom")}
              >
                <img src="https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623202221958.webp" className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-transparent group-hover:bg-black/25 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                  <span className="bg-black/60 text-white text-[11px] px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-sky-400" />
                    {t("点按查看清晰大图", "Click to zoom")}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1 text-[10px] text-zinc-500 uppercase tracking-widest leading-none pt-1">
                <TrendingUp className="w-3.5 h-3.5 text-sky-400" />
                <span>{t("账号日常数据", "Account Sales & Engagement Data")}</span>
              </div>
              <div 
                onClick={() => setLightboxUrl("https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623202245179.webp")}
                className="relative rounded-xl overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer"
                title={t("点按查看大图", "Click to zoom")}
              >
                <img src="https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623202245179.webp" className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-transparent group-hover:bg-black/25 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                  <span className="bg-black/60 text-white text-[11px] px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-sky-400" />
                    {t("点按查看清晰大图", "Click to zoom")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* 一、账号基础定位 */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-sky-300 uppercase tracking-wider">{t("1. 账号基础定位", "1. Account Positioning & Niche")}</span>
              <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-light text-justify text-justify">
                {t(
                  "本土白人气质轻熟女装垂类账号，人设温柔精致，面向 20-35 岁追求通勤、度假优雅长裙的女性群体；账号粉丝 2082、总点赞 93.2K，粉丝基数更高，私域沉淀基础扎实。内容统一采用衣帽间全身试穿实拍，主打长款碎花连衣裙、波西米亚套装、纯色垂感吊带，视频节奏舒缓，重点突出面料质感与修身版型。",
                  "US local white elegant chic apparel niche account with a gentle and refined persona, targeting women aged 20-35 seeking elegant dresses for commuting or vacationing; 2,082 followers and 93.2K total likes, showing a stronger follower base and solid private domain foundation. Content consistently uses cloakroom full-body try-on footage, featuring long floral maxi dresses, Bohemian sets, and solid drape camisoles, with relaxed video pacing that emphasizes fabric texture and body-contouring fits."
                )}
              </p>
            </div>

            {/* 二、流量 & 转化数据表现 */}
            <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
              <span className="text-xs font-semibold text-sky-300 uppercase tracking-wider">{t("2. 流量 & 转化数据表现", "2. Traffic & Conversion Performance")}</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-2.5 bg-white/[0.01] border border-white/5 rounded-lg flex flex-col">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider">{t("流量端", "Traffic Side")}</span>
                  <p className="text-xs text-zinc-300 font-light mt-1">
                    {t(
                      "置顶爆款视频单条播放 1.1M，多条内容稳定 10W + 自然公域曝光，受众覆盖广、算法适配度高；",
                      "Top pinned viral video reached 1.1M views, with multiple pieces stably drawing 100K+ organic impressions (broad coverage & algorithm-friendly)."
                    )}
                  </p>
                </div>
                <div className="p-2.5 bg-white/[0.01] border border-white/5 rounded-lg flex flex-col">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider">{t("成交端", "Conversion Side")}</span>
                  <p className="text-xs text-zinc-300 font-light mt-1">
                    {t(
                      "7 天店铺全品类女装持续出单，TOP 波西米亚长裙单品单周 GMV 达 $1.7K，全店 7 天累计成交超百件；",
                      "Continuous store-wide apparel sales over 7 days, with top Bohemian maxi dress generating $1.7K weekly GMV, and 100+ units sold in 7 days."
                    )}
                  </p>
                </div>
                <div className="p-2.5 bg-white/[0.01] border border-white/5 rounded-lg flex flex-col">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider">{t("营收规模", "Revenue Scale")}</span>
                  <p className="text-xs font-semibold text-emerald-400 mt-1">
                    {t(
                      "成熟稳定转化链路，单日 GMV 稳定 2000 美元以上，月度 GMV 突破 3 万美元。",
                      "Mature and stable conversion loops yielding stable daily GMV above $2,000 and monthly GMV exceeding $30,000."
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* 三、账号核心价值 */}
            <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
              <span className="text-xs font-semibold text-sky-300 uppercase tracking-wider">{t("3. 账号核心价值", "3. Strategic Account Value")}</span>
              <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-light text-justify text-justify">
                {t(
                  "优雅长款女装赛道差异化明显，客单价更高，广告合作溢价空间大；可承接度假、通勤类中高端女装，与少女辣妹女装形成年龄、风格互补，拓宽女性消费圈层。",
                  "Highly differentiated niche in elegant long dress market with higher average order value (AOV) and high premium space for brand deals; perfectly hosts mid-to-high-end resort and office apparel, complementing young hot-girl styles in age/styling to broaden female buyer demographic circles."
                )}
              </p>
            </div>
          </div>
        </div>

        {/* 账号：GoldieFits */}
        <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 flex flex-col gap-4">
          <div className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-sky-400" />
              <h5 className="text-xs md:text-sm font-semibold text-zinc-100">
                {t("账号：GoldieFits 美式少女辣妹女装账号", "Account: GoldieFits American Hot-Girl Wear Account")}
              </h5>
            </div>
          </div>

          {/* Images Display */}
          <div className="flex flex-col gap-3 mt-1.5">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1 text-[10px] text-zinc-500 uppercase tracking-widest leading-none pt-1">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span>{t("账号主页", "Account Homepage")}</span>
              </div>
              <div 
                onClick={() => setLightboxUrl("https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623202312570.webp")}
                className="relative rounded-xl overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer"
                title={t("点按查看大图", "Click to zoom")}
              >
                <img src="https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623202312570.webp" className="w-full h-auto object-contain group-hover:scale-[1.01] transition-transform duration-500" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-transparent group-hover:bg-black/25 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                  <span className="bg-black/60 text-white text-[11px] px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-sky-400" />
                    {t("点按查看清晰大图", "Click to zoom")}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1 text-[10px] text-zinc-500 uppercase tracking-widest leading-none pt-1">
                <TrendingUp className="w-3.5 h-3.5 text-sky-400" />
                <span>{t("成交数据与多维销售分析", "Store Conversion Analytics")}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623202344624.webp",
                  "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623202404022.webp",
                  "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623202414943.webp",
                  "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623202426331.webp"
                ].map((url, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setLightboxUrl(url)}
                    className="relative aspect-auto rounded-xl overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer"
                    title={t("点按查看大图", "Click to zoom")}
                  >
                    <img src={url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-transparent group-hover:bg-black/25 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                      <MousePointerClick className="w-5 h-5 text-white/80 drop-shadow" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* 1. 账号基础定位 */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-sky-300 uppercase tracking-wider">{t("1. 账号基础定位", "1. Positioning & Target")}</span>
              <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-light text-justify text-justify">
                {t(
                  "本土 Z 世代少女辣妹女装垂类账号，白人女生居家无滤镜真实测评，面向 16-24 岁年轻白人女性；主打辣妹吊带、碎花短裙、格纹两件套、度假短款连衣裙。账号粉丝 719、总点赞 47.9K，粉丝体量小，但公域流量爆发力极强。内容标准化 15 秒短视频，卧室实景全身实拍，直观展示短裙、短上衣版型；累计更新 85 条高频作品，搭配垂类英文标签锁定女装精准流量池。",
                  "Niche account for local US Gen-Z hot-girl style apparel, featuring real-life bedroom filter-free testing by white model, targeting young women aged 16-24; highlights hot-girl camisoles, floral mini skirts, plaid co-ord sets, and short holiday sun-dresses. 719 followers and 47.9K total likes (lean follower count but impressive organic feed virality). Standardized 15s quick clips shot as bedroom full-body trials, showcasing skirts and cropped tops directly; 85 high-frequency videos published under specialized fashion tags to lock in target shopper interest."
                )}
              </p>
            </div>

            {/* 2. 核心流量数据 */}
            <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
              <span className="text-xs font-semibold text-sky-300 uppercase tracking-wider">{t("2. 核心流量数据", "2. Core Traffic Performance")}</span>
              <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-light text-justify text-justify">
                {t(
                  "多条爆款视频 50W + 播放，最高单条 806.3K 超大曝光；仅 719 粉丝可持续撬动几十万自然推荐流量，不靠私域粉丝起量，流量结构健康稳定，不存在单次偶然爆量。单品点击率稳定维持 1.48%-4.74%，属于女装品类优质区间；爆款视频最高点赞 12.4K，评论、转发数据优异，用户自发转发带来二次传播裂变，种草说服力强。",
                  "Multiple viral videos generated 500K+ views with peak exposure hitting 806.3K; starting with only 719 followers yet repeatedly drawing hundreds of thousands of organic recommendations, indicating a healthy traffic structure independent of fan bases. Direct product CTR sits steadily at 1.48%-4.74%, leading the category. Peak likes reached 12.4K with robust comment/reshare records; user-initiated sharing triggers organic propagation, proving high conversion and trust."
                )}
              </p>
            </div>

            {/* 3. 7 天成交 GMV 深度拆解 */}
            <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
              <span className="text-xs font-semibold text-sky-300 uppercase tracking-wider">{t("3. 7 天成交 GMV 深度拆解", "3. 7-Day GMV Breakdown")}</span>
              <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-light text-justify text-justify">
                {t(
                  "7 天店铺多款波西米亚碎花长裙、度假连衣裙稳定成交，头部印花长裙单品单周 GMV 233.37 欧元，多款连衣裙、吊带套装持续稳定出单；短视频种草跳转下单链路成熟，单日 GMV 可达 2000 美元以上，月度 GMV 稳定突破 3 万美元。受众为年轻少女群体，穿搭款式更新需求旺盛，复购与冲动消费意愿强，转化效率突出。",
                  "Continuous store conversions over 7 days for various bohemian floral midi/maxi dresses, with top-selling print dresses delivering EUR 233.37 weekly GMV, alongside regular sales across dresses and camisole sets. Structured path from video seeds to direct store purchases, with peak single-day GMV over $2,000 and monthly GMV securely above $30,000. Real audiences represent young girls with frequent clothing update demands, showing high repeat purchases and impulse conversions."
                )}
              </p>
            </div>

            {/* 4. 账号商业价值 */}
            <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
              <span className="text-xs font-semibold text-sky-300 uppercase tracking-wider">{t("4. 账号商业价值", "4. Commercial Value & Matrix Power")}</span>
              <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-light text-justify text-justify">
                {t(
                  "100% 本土化真人出镜，无跨境运营违和感，付费投放、达人置换合作适配度高；小粉丝体量即可撬动海量自然流量，后续涨粉、营收增长空间充足。作为少女辣妹细分账号，搭配气质女装、男装账号组成完整带货矩阵，覆盖全年龄段男女消费者，分散单一赛道流量风险，整体矩阵营收抗波动能力更强。",
                  "100% localized on-camera model without cross-border cognitive friction, highly compatible with paid ads and affiliate exchanges. Small fan baseline leveraging vast feeds points to unlimited growth space. As a vertical hot-girl profile, it pairs with elegant women's wear and casual menswear profiles to compose a complete content grid, hedging risks in individual genres and building premium resistance against traffic fluctuations."
                )}
              </p>
            </div>
          </div>
        </div>



        {/* 账号一：TheBossMomFits */}
        <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 flex flex-col gap-4">
          <div className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-sky-400" />
              <h5 className="text-xs md:text-sm font-semibold text-zinc-100">
                {t("账号：TheBossMomFits（45 + 职场妈妈实用穿搭）", "Account: TheBossMomFits (45+ Smart Career Mums Outfits)")}
              </h5>
            </div>
          </div>

          {/* 账号一主效果大图/汇总概览图 */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-[10px] text-zinc-500 uppercase tracking-widest leading-none pt-1">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>{t("账号首页展示", "Account Homepage Display")}</span>
            </div>
            <div 
              onClick={() => setLightboxUrl("https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260626233903558.webp")}
              className="relative rounded-xl overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer"
              title={t("点按查看大图", "Click to zoom")}
            >
              <img 
                src="https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260626233903558.webp" 
                alt="Account 1 overview graph" 
                className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="bg-black/60 text-white text-[11px] px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-sky-400" />
                  {t("点按查看清晰大图", "Click to zoom")}
                </span>
              </div>
            </div>
          </div>

          {/* 四图并排竖图展示区 */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-[10px] text-zinc-500 uppercase tracking-widest leading-none pt-1">
              <Eye className="w-3.5 h-3.5 text-sky-400" />
              <span>{t("成果精选（点击任意图片可放大查看）", "Curated Outfits Display (Click to zoom)")}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {momImages.map((url, index) => (
                <div 
                  key={index} 
                  onClick={() => setLightboxUrl(url)}
                  className="relative aspect-[3/4] rounded-xl overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer"
                  title={t("点按查看大图", "Click to zoom")}
                >
                  <img 
                    src={url} 
                    alt={`TheBossMomFits sample ${index + 1}`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <MousePointerClick className="w-5 h-5 text-white/80 drop-shadow" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 账号一核心流量与销售指标 */}
          <div className="p-3 bg-sky-400/[0.01] border border-sky-500/10 rounded-xl flex flex-col gap-2.5">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-xs font-semibold text-sky-300 tracking-wide">
                {t("账号一核心流量与销售指标", "Account I Core Metrics")}
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-2.5 bg-white/[0.01] border border-white/5 rounded-lg flex flex-col">
                <span className="text-[9px] text-zinc-500 uppercase tracking-wider">Attr. GMV</span>
                <span className="text-xs md:text-sm font-bold text-white mt-1">$6.6K</span>
              </div>
              <div className="p-2.5 bg-white/[0.01] border border-white/5 rounded-lg flex flex-col">
                <span className="text-[9px] text-zinc-500 uppercase tracking-wider">{t("总销量", "Total Sold")}</span>
                <span className="text-xs md:text-sm font-bold text-white mt-1">820+ {t("件", "pcs")}</span>
              </div>
              <div className="p-2.5 bg-white/[0.01] border border-white/5 rounded-lg flex flex-col">
                <span className="text-[9px] text-zinc-500 uppercase tracking-wider">{t("环比增长数据", "MoM Growth")}</span>
                <span className="text-xs md:text-sm font-bold text-emerald-400 mt-1">{t("688% / 633% 爆发式增长", "688% / 633% Explosive Growth")}</span>
              </div>
              <div className="p-2.5 bg-white/[0.01] border border-white/5 rounded-lg flex flex-col">
                <span className="text-[9px] text-zinc-500 uppercase tracking-wider">{t("核心流量指标", "Core Traffic Metrics")}</span>
                <span className="text-xs md:text-sm font-bold text-sky-300 mt-1">{t("曝光 180.4K / 点击 166.4K", "Imp 180.4K / Clicks 166.4K")}</span>
              </div>
            </div>
            <div className="text-[10px] text-zinc-400 font-light flex flex-wrap gap-x-3 gap-y-1 border-t border-white/5 pt-2">
              <span>{t("产品总曝光：180.4K", "Product Total Impressions: 180.4K")}</span>
              <span className="text-zinc-650">•</span>
              <span>{t("产品总点击：166.4K", "Product Total Clicks: 166.4K")}</span>
            </div>
          </div>

          {/* 爆款内容与用户洞察 */}
          <div className="flex flex-col gap-2 pt-1">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest">{t("爆款内容与用户洞察", "Viral Performance & Insights")}</span>
            <div className="space-y-2">
              <div className="group flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0 transition-colors duration-350 group-hover:bg-sky-300" />
                <p className="text-xs md:text-sm text-zinc-300 leading-normal group-hover:text-sky-300 transition-colors duration-300 font-light">
                  <strong className="text-zinc-100 font-medium group-hover:text-sky-200">{t("妈妈日常印花连衣裙视频：", "Mom's Floral Prints Daily Dress: ")}</strong>
                  {t("单条视频归因 GMV $2.6k，播放量 5.7K，获得 102 件订单好成绩。", "Attributed GMV $2.6k, views 5.7K, driving 102 orders.")}
                </p>
              </div>
              <div className="group flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0 transition-colors duration-350 group-hover:bg-sky-300" />
                <p className="text-xs md:text-sm text-zinc-300 leading-normal group-hover:text-sky-300 transition-colors duration-300 font-light">
                  <strong className="text-zinc-100 font-medium group-hover:text-sky-200">{t("斑马纹修身连体裤视频：", "Zebra-stripe Slim Fit Jumpsuits: ")}</strong>
                  {t("单条视频归因 GMV $1.3k，播放量 4.6K，获得 55 件销量转化。", "Attributed GMV $1.3k, views 4.6K, converting 55 product orders.")}
                </p>
              </div>
              <div className="group flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0 transition-colors duration-350 group-hover:bg-sky-300" />
                <p className="text-xs md:text-sm text-zinc-300 leading-normal group-hover:text-sky-300 transition-colors duration-300 font-light">
                  <strong className="text-zinc-100 font-medium group-hover:text-sky-200">{t("绿色职场套装视频：", "Green Office Uniform Sets: ")}</strong>
                  {t("单条视频归因 GMV $830.89，播放量 10.7K，售出 23 件定制单品。", "Attributed GMV $830.89, views 10.7K, selling 23 custom units.")}
                </p>
              </div>
            </div>
          </div>

          {/* 精准用户画像 */}
          <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest">{t("精准用户画像与购买特征", "Target Mums Demographics & Prefs")}</span>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 bg-white/[0.01] border border-white/5 rounded-lg">
                <div className="text-zinc-500 text-[10px] uppercase">{t("粉丝性别", "Gender Bias")}</div>
                <div className="text-zinc-100 font-light mt-0.5">{t("女性占比 83%", "Female Bias (83%)")}</div>
              </div>
              <div className="p-2.5 bg-white/[0.01] border border-white/5 rounded-lg">
                <div className="text-zinc-500 text-[10px] uppercase">{t("重点年龄分布", "Core Age Group")}</div>
                <div className="text-zinc-100 font-light mt-0.5">{t("45-54 岁职场妈妈占比 30%", "45-54 Aged Moms (30%)")}</div>
              </div>
              <div className="p-2.5 bg-white/[0.01] border border-white/5 rounded-lg col-span-2 md:col-span-1">
                <div className="text-zinc-500 text-[10px] uppercase">{t("细分选品偏好", "Category Prefs")}</div>
                <div className="text-zinc-100 font-light mt-0.5 flex flex-col gap-0.5">
                  <span>👗 {t("休闲连衣裙(5.98%)", "Casual Dresses (5.98%)")}</span>
                  <span>💼 {t("女装套装(3.89%)", "Uniform Sets (3.89%)")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 账号：MicDropFits */}
        <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 flex flex-col gap-4">
          <div className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4 text-sky-400" />
              <h5 className="text-xs md:text-sm font-semibold text-zinc-100">
                {t("账号：MicDropFits 美式休闲男装账号", "Account: MicDropFits (American Casual Menswear)")}
              </h5>
            </div>
          </div>

          {/* Images Display */}
          <div className="flex flex-col gap-3 mt-1.5">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1 text-[10px] text-zinc-500 uppercase tracking-widest leading-none pt-1">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span>{t("账号主页", "Account Homepage")}</span>
              </div>
              <div 
                onClick={() => setLightboxUrl("https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623202955745.webp")}
                className="relative rounded-xl overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer"
                title={t("点按查看大图", "Click to zoom")}
              >
                <img src="https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623202955745.webp" className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-transparent group-hover:bg-black/25 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                  <span className="bg-black/60 text-white text-[11px] px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-sky-400" />
                    {t("点按查看清晰大图", "Click to zoom")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* 一、账号基础定位 */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-sky-300 uppercase tracking-wider">{t("1. 账号基础定位", "1. Account Positioning & Target")}</span>
              <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-light text-justify text-justify">
                {t(
                  "美国本土年轻男生休闲穿搭账号，白人男生真人出镜，主打夏日亚麻衬衫、宽松牛仔、街头基础短袖，面向 Z 世代男性消费人群；粉丝 510、总点赞 5894，男装赛道竞争小，细分蓝海赛道。内容统一 15 秒短信息流，居家 / 户外实景上身，聚焦基础百搭款男装，画面清爽极简。",
                  "US native young casual menswear creator featuring white male talent, focusing on summer linen shirts, baggy denim, and streetwear basic tees for Gen-Z boys; 510 followers and 5,894 total likes, securing a high-potential blue ocean segment. Structured as standardized 15-second visual feeds shot in real-world indoor/outdoor settings, highlighting clean styling and minimal versatility."
                )}
              </p>
            </div>

            {/* 二、流量 & 转化数据表现 */}
            <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
              <span className="text-xs font-semibold text-sky-300 uppercase tracking-wider">{t("2. 流量 & 转化数据表现", "2. Traffic & Conversion Performance")}</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-2.5 bg-white/[0.01] border border-white/5 rounded-lg flex flex-col">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider">{t("流量端", "Traffic Side")}</span>
                  <p className="text-xs text-zinc-300 font-light mt-1">
                    {t(
                      "爆款视频单条播放 739K，单品点击率区间 0.27%-0.91%；男装受众更精准，泛流量体量小于女装，但目标用户转化意愿强；",
                      "Top viral piece earned 739K views with product CTR bounds of 0.27%-0.91%. Menswear focuses on precise, high-intent purchasing rather than broad female window-shopping."
                    )}
                  </p>
                </div>
                <div className="p-2.5 bg-white/[0.01] border border-white/5 rounded-lg flex flex-col">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider">{t("成交端", "Conversion Side")}</span>
                  <p className="text-xs text-zinc-300 font-light mt-1">
                    {t(
                      "7 天整体归因 GMV 1.8K 欧元，累计成交 104 件商品，商品总曝光 120.8K、点击 3.3K；",
                      "Total EUR 1.8K attributed GMV over 7 days, successfully capturing 104 completed orders from 120.8K product impressions and 3.3K clicks."
                    )}
                  </p>
                </div>
                <div className="p-2.5 bg-white/[0.01] border border-white/5 rounded-lg flex flex-col">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider">{t("矩阵作用", "Matrix Synergy")}</span>
                  <p className="text-xs text-zinc-300 font-light mt-1">
                    {t(
                      "填补矩阵男性消费赛道空白，平衡男女品类结构，覆盖情侣、家庭连带消费，降低仅做女装带来的赛道流量波动风险。",
                      "Safely fills the menswear gap in our e-commerce matrix to hedge gender biases, unlocking couple and household co-purchases to minimize single-genre volatility."
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* 三、账号优化方向 */}
            <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
              <span className="text-xs font-semibold text-sky-300 uppercase tracking-wider">{t("3. 账号优化方向", "3. Optimization Direction")}</span>
              <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-light text-justify text-justify">
                {t(
                  "现有爆款模板可批量复制，拉高男装账号稳定曝光，进一步提升男装板块 GMV 占比。",
                  "Existing viral frameworks can be easily cloned and scaled, stabilizing menswear channel exposure to drive up GMV composition."
                )}
              </p>
            </div>
          </div>
        </div>

        {/* 账号二：CurvyChicHub */}
        <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 flex flex-col gap-4">
          <div className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4 text-sky-400" />
              <h5 className="text-xs md:text-sm font-semibold text-zinc-100">
                {t("账号：CurvyChicHub（年轻大码女性自信穿搭）", "Account: CurvyChicHub (Confident Plus-size Clothing)")}
              </h5>
            </div>
          </div>

          {/* 账号二主效果大图/汇总概览图 */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-[10px] text-zinc-500 uppercase tracking-widest leading-none pt-1">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>{t("账号首页展示", "Account Homepage Display")}</span>
            </div>
            <div 
              onClick={() => setLightboxUrl("https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623202833802.webp")}
              className="relative rounded-xl overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer"
              title={t("点按查看大图", "Click to zoom")}
            >
              <img 
                src="https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623202833802.webp" 
                alt="Account 2 overview graph" 
                className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="bg-black/60 text-white text-[11px] px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-sky-400" />
                  {t("点按查看清晰大图", "Click to zoom")}
                </span>
              </div>
            </div>
          </div>

          {/* 四图并排竖图展示区 */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-[10px] text-zinc-500 uppercase tracking-widest leading-none pt-1">
              <Eye className="w-3.5 h-3.5 text-sky-400" />
              <span>{t("成果精选（点击任意图片可放大查看）", "Curated Outfits Display (Click to zoom)")}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {curvyImages.map((url, index) => (
                <div 
                  key={index} 
                  onClick={() => setLightboxUrl(url)}
                  className="relative aspect-[3/4] rounded-xl overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer"
                  title={t("点按查看大图", "Click to zoom")}
                >
                  <img 
                    src={url} 
                    alt={`CurvyChicHub sample ${index + 1}`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <MousePointerClick className="w-5 h-5 text-white/80 drop-shadow" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 账号二核心流量与销售指标 */}
          <div className="p-3 bg-sky-400/[0.01] border border-sky-500/10 rounded-xl flex flex-col gap-2.5">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-xs font-semibold text-sky-300 tracking-wide">
                {t("账号二核心流量与销售指标", "Account II Core Metrics")}
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-2.5 bg-white/[0.01] border border-white/5 rounded-lg flex flex-col">
                <span className="text-[9px] text-zinc-500 uppercase tracking-wider">Attr. GMV</span>
                <span className="text-xs md:text-sm font-bold text-white mt-1">$11.8K</span>
              </div>
              <div className="p-2.5 bg-white/[0.01] border border-white/5 rounded-lg flex flex-col">
                <span className="text-[9px] text-zinc-500 uppercase tracking-wider">{t("总播放 / 总销量", "Views & Sold")}</span>
                <span className="text-xs md:text-sm font-bold text-white mt-1">269.7K / 642 {t("件", "pcs")}</span>
              </div>
              <div className="p-2.5 bg-white/[0.01] border border-white/5 rounded-lg flex flex-col">
                <span className="text-[9px] text-zinc-500 uppercase tracking-wider">{t("环比增长数据", "MoM Growth")}</span>
                <span className="text-xs md:text-sm font-bold text-emerald-400 mt-1">{t("持续环比爆发式增长", "MoM Explosive Growth")}</span>
              </div>
              <div className="p-2.5 bg-white/[0.01] border border-white/5 rounded-lg flex flex-col">
                <span className="text-[9px] text-zinc-500 uppercase tracking-wider">{t("核心流量指标", "Core Traffic Metrics")}</span>
                <span className="text-xs md:text-sm font-bold text-sky-300 mt-1">{t("曝光 296.0K / 点击 19.2K", "Imp 296.0K / Clicks 19.2K")}</span>
              </div>
            </div>
            <div className="text-[10px] text-zinc-400 font-light flex flex-wrap gap-x-3 gap-y-1 border-t border-white/5 pt-2">
              <span>{t("产品总曝光：296.0K", "Product Total Impressions: 296.0K")}</span>
              <span className="text-zinc-650">•</span>
              <span>{t("产品总点击：19.2K", "Product Total Clicks: 19.2K")}</span>
            </div>
          </div>

          {/* 选品与曝光成果 */}
          <div className="flex flex-col gap-2 pt-1">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest">{t("爆款内容与选品表现", "Viral Performance & Products")}</span>
            <div className="space-y-2">
              <div className="group flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0 transition-colors duration-350 group-hover:bg-sky-300" />
                <p className="text-xs md:text-sm text-zinc-300 leading-normal group-hover:text-sky-300 transition-colors duration-300 font-light">
                  <strong className="text-zinc-100 font-medium group-hover:text-sky-200">{t("100% 真人发非洲式短卷发假发视频：", "100% Human Hair Wig Video: ")}</strong>
                  {t("单条视频归因 GMV $8,400（占该账号总 GMV 71%），播放量 179.7K，售出 451 件，成为 5 月美国站假发类目 TOP3 爆款内容。", "Generated attributed GMV $8,400 (71% of account GMV), viewers 179.7K, sold 451 orders. Reached Top-3 Video for US Wig apparel categorizations in May.")}
                </p>
              </div>
              <div className="group flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0 transition-colors duration-350 group-hover:bg-sky-300" />
                <p className="text-xs md:text-sm text-zinc-300 leading-normal group-hover:text-sky-300 transition-colors duration-300 font-light">
                  <strong className="text-zinc-100 font-medium group-hover:text-sky-200">{t("大码宽松度假裤视频：", "Loose Plus-size Linen Beach Pants: ")}</strong>
                  {t("单条视频归因 GMV $788.66，播放量 9.7K，成功售出 43 件商品。", "Attributed GMV $788.66, viewers 9.7K, generating 43 product orders.")}
                </p>
              </div>
              <div className="group flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0 transition-colors duration-350 group-hover:bg-sky-300" />
                <p className="text-xs md:text-sm text-zinc-300 leading-normal group-hover:text-sky-300 transition-colors duration-300 font-light">
                  <strong className="text-zinc-100 font-medium group-hover:text-sky-200">{t("大码纯色挂脖连衣裙视频：", "Solid Color Plus-size Halter Dress: ")}</strong>
                  {t("单条视频归因 GMV $524.43，播放量 13.4K，成功售出 31 件商品。", "Attributed GMV $524.43, viewers 13.4K, generating 31 product orders.")}
                </p>
              </div>
            </div>
          </div>

          {/* 精准用户画像 */}
          <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest">{t("精准用户画像", "Target Demographics")}</span>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 bg-white/[0.01] border border-white/5 rounded-lg">
                <div className="text-zinc-500 text-[10px] uppercase">{t("粉丝性别", "Gender Bias")}</div>
                <div className="text-zinc-100 font-light mt-0.5">{t("女性占比 74%", "Female Bias (74%)")}</div>
              </div>
              <div className="p-2.5 bg-white/[0.01] border border-white/5 rounded-lg">
                <div className="text-zinc-500 text-[10px] uppercase">{t("年龄段分布", "Age Bracket")}</div>
                <div className="text-zinc-100 font-light mt-0.5">{t("55 岁以上成熟女性占比 42%", "Aged 55+ Mature Women (42%)")}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 其它账号 */}
        <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 flex flex-col gap-4">
          <div className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sky-400" />
              <h5 className="text-sm md:text-lg font-bold text-zinc-100">
                {t("其它账号及矩阵布局", "Other Matrix Accounts")}
              </h5>
            </div>
          </div>



          {/* 穆斯林长袍头巾女装与水果拟人短剧账号 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 border-b border-white/5 pb-3">
            
            {/* 穆斯林长袍头巾女装账号 */}
            <div className="flex flex-col gap-3.5 p-3.5 rounded-2xl bg-white/[0.01] border border-white/10">
              <div className="flex items-center gap-1.5 text-zinc-100">
                <ShoppingBag className="w-4 h-4 text-sky-400" />
                <span className="text-xs md:text-sm font-semibold">{t("穆斯林长袍头巾女装账号", "Muslim Abaya & Hijab Fashion Account")}</span>
              </div>
              <div 
                onClick={() => setLightboxUrl("https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623204411362.webp")}
                className="relative rounded-xl overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer aspect-video"
                title={t("点按查看大图", "Click to zoom")}
              >
                <img src="https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623204411362.webp" className="w-full h-full object-cover object-center group-hover:scale-[1.01] transition-transform duration-500" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-transparent group-hover:bg-black/25 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                  <span className="bg-black/60 text-white text-[10px] px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1">
                    <Eye className="w-3 h-3 text-sky-400" />
                    {t("点按查看清晰大图", "Click to zoom")}
                  </span>
                </div>
              </div>
              <div className="space-y-3.5">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-semibold text-sky-300 uppercase tracking-wider">{t("1. 账号定位与内容风格", "1. Positioning & Content Style")}</span>
                  <p className="text-xs text-zinc-300 leading-relaxed font-light text-justify text-justify">
                    {t(
                      "主打中东、欧美穆斯林女性保守女装，真人实拍长款卡夫坦长袍、蕾丝头巾、渐变礼服套装，面向海外穆斯林女性受众；内容 15-17 秒穿搭种草短视频，覆盖婚礼礼服、日常通勤、居家休闲三大场景，完整展示头巾 + 长裙成套搭配。",
                      "Focuses on conservative women's wear for Middle Eastern and Western Muslim women, with real-life trials of long Kaftan abayas, lace hijabs, and gradient evening gowns, targeting international Muslim females. Short 15-17s try-on clips cover bridal/wedding wear, daily commute, and home leisure, displaying matching hijab+dress sets."
                    )}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-semibold text-sky-300 uppercase tracking-wider">{t("2. 流量核心数据", "2. Core Traffic Performance")}</span>
                  <p className="text-xs text-zinc-300 leading-relaxed font-light text-justify text-justify">
                    {t(
                      "爆款爆发力强：置顶两条爆款分别 170K、94.9K 播放，多条视频稳定 90K + 自然流量，垂类赛道受众精准，平台推荐匹配度高；点击率表现优秀：单品点击率区间 0.63%-5.49%，高转化款点击率突破 5%，礼服、蕾丝套装封面视觉吸引力突出；互动数据：头部爆款单条点赞 17 万、转发 202，自带穿搭分享裂变属性，用户主动传播意愿高，种草转化说服力强。",
                      "Explosive virality: Top pinned videos achieved 170K and 94.9K plays, with other uploads steadily pulling 90K+ organic views (narrow high-intent targeting & high feed matching). Exceptional CTR: Product conversion entry CTR spans 0.63%-5.49%, with peak conversion rows breaking 5%, driven by high cover appeals of lace gowns and abayas. Strong engagement: Top viral clips garnered up to 170K likes and 202 shares, enjoying secondary organic sharing from active audiences."
                    )}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-semibold text-sky-300 uppercase tracking-wider">{t("3. 商业价值与矩阵作用", "3. Business Value & Matrix Role")}</span>
                  <p className="text-xs text-zinc-300 leading-relaxed font-light text-justify text-justify">
                    {t(
                      "细分蓝海赛道，穆斯林服饰竞争小、需求稳定，礼服款客单价高；与少女辣妹女装、气质女装、男装账号形成地域、宗教、风格互补，覆盖中东 + 欧美多元女性消费群体，完善全品类穿搭矩阵；流量逻辑健康，爆款稳定产出，可承接长袍、头巾礼盒、蕾丝套装全品类带货，具备稳定 GMV 产出能力。",
                      "A blue ocean vertical with very low competition, steady demand, and high margins (premium evening gown prices). Operates as a geographic, religious, and stylistic complement to hot-girl wear, casual menswear, and elegant women's wear, securing strong presence in Middle Eastern & Western cultures. Solid traffic delivery with consistent conversions makes it ideal for hosting abayas, boxed hijab sets, and lace sets with highly stable GMV."
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* 二、Clawdia 水果拟人短剧账号 */}
            <div className="flex flex-col gap-3.5 p-3.5 rounded-2xl bg-white/[0.01] border border-white/10">
              <div className="flex items-center gap-1.5 text-zinc-100">
                <Sparkles className="w-4 h-4 text-sky-400" />
                <span className="text-xs md:text-sm font-semibold">{t("Clawdia 水果拟人短剧账号", "Clawdia Fruit Anthropomorphic Mini-Drama Account")}</span>
              </div>
              <div 
                onClick={() => setLightboxUrl("https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623204426481.webp")}
                className="relative rounded-xl overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer aspect-video"
                title={t("点按查看大图", "Click to zoom")}
              >
                <img src="https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623204426481.webp" className="w-full h-full object-cover object-center group-hover:scale-[1.01] transition-transform duration-500" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-transparent group-hover:bg-black/25 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                  <span className="bg-black/60 text-white text-[10px] px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1">
                    <Eye className="w-3 h-3 text-sky-400" />
                    {t("点按查看清晰大图", "Click to zoom")}
                  </span>
                </div>
              </div>
              <div className="space-y-3.5">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-semibold text-sky-300 uppercase tracking-wider">{t("1. 账号定位与内容风格", "1. Positioning & Content Style")}</span>
                  <p className="text-xs text-zinc-300 leading-relaxed font-light text-justify text-justify">
                    {t(
                      "美国本土 AI 拟人动画短剧账号，原创水果人、金发拟人猫咪 IP，主打情感狗血短剧剧情；视频时长 10-34 秒，单集连续叙事，靠冲突剧情留住用户，纯娱乐内容，作为矩阵流量补充账号。账号基础数据：粉丝 56，总点赞 499，起步阶段体量小。",
                      "US native AI anthropomorphic cartoon narrative account featuring original fruit characters and blonde cat avatars, telling hyper-dramatic relational stories; video durations of 10-34 seconds tell serialized chapters, utilizing suspenseful hooks for viewer retention. Served purely as entertainment traffic acquisition. Basic metrics: 56 followers and 499 total views/likes (currently in early launch stage)."
                    )}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-semibold text-sky-300 uppercase tracking-wider">{t("2. 流量核心数据", "2. Core Traffic Analysis")}</span>
                  <p className="text-xs text-zinc-300 leading-relaxed font-light text-justify text-justify">
                    {t(
                      "爆款流量表现：最高单条播放 903，多条视频 500-900 区间曝光；爆款单品点击率高达 23.39%，短剧封面冲突感强，点击拉新能力极强；内容特性：剧情向内容完播指标优秀，适合做账号矩阵公域引流，将短剧粉丝导流至穿搭带货账号，实现流量复用；短板：当前粉丝基数极低，仅 13 条作品，账号处于冷启动阶段，内容产出量不足，流量规模远低于穿搭类带货账号。",
                      "Viral performance: Top clip hit 903 views, with other parts stabilizing between 500-900 impressions. Associated link CTR reached 23.39% owing to intriguing conflict covers. Exceptional watch-completion rate makes it ideal for public feed client acquisition, pooling traffic to cross-refer to garment sales accounts. Bottleneck: Very low current follower base with only 13 videos, currently in early cold start, showing lean content density and volume compared to direct shopping models."
                    )}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-semibold text-sky-300 uppercase tracking-wider">{t("3. 矩阵协同价值", "3. Synergistic Matrix Value")}</span>
                  <p className="text-xs text-zinc-300 leading-relaxed font-light text-justify text-justify">
                    {t(
                      "娱乐短剧内容不受穿搭赛道限制，可抓取泛娱乐公域流量，通过主页导流、视频片尾引导，为 4 个穿搭带货账号输送潜在女性用户；差异化内容形式，平衡矩阵全部为穿搭号的单一性，降低算法限流风险；后续可批量更新剧集、复制高点击率剧情模板，放大引流规模，间接提升整体矩阵 GMV。矩阵覆盖男女、全年龄段、欧美 / 中东多元人群，搭配娱乐流量辅助引流，多赛道分散运营风险，全域承接女装、男装、特色宗教服饰带货，稳定实现单账号单日 GMV 2000+，月度总 GMV 突破 3 万美金。",
                      "Entertainment shorts bypass fashion constraints to capture broad traffic, channeling users via page redirection and end-screen cues to feed the 4 apparel commerce accounts. Divergent content formats break up the monotony of pure e-commerce to safeguard against platform distribution blocks. Scaling drama uploads and scaling high-performing templates will elevate referral traffic, boosting matrix-wide GMV. The ultimate matrix covers cross-demographics spanning men & women of all ages across Western and Middle Eastern regions, fortified by entertainment feeds to manage risks organically. Full-scope fulfillment across apparel, menswear, and religious attire establishes robust $2,000+ daily GMV per account, pushing monthly totals above $30,000."
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 其他账号首页展示 - 移至此处 */}
          <div className="flex flex-col gap-2.5 pt-1 pb-5 border-b border-white/5">
            <div className="flex items-center gap-1.5 text-sm md:text-base font-semibold text-sky-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-sky-400 animate-pulse" />
              <span>{t("其他账号首页展示", "Other Accounts Homepage Display")}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div 
                onClick={() => setLightboxUrl("https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260627000605226.webp")}
                className="relative rounded-xl overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer flex items-center justify-center"
                title={t("点按查看大图", "Click to zoom")}
              >
                <img 
                  src="https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260627000605226.webp" 
                  alt="Other account 1 homepage" 
                  className="w-full h-auto object-cover scale-[1.065] group-hover:scale-[1.09] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-black/60 text-white text-[10px] px-2.5 py-1.5 rounded-full border border-white/10 flex items-center gap-1">
                    <Eye className="w-3 h-3 text-sky-400" />
                    {t("点按查看清晰大图", "Click to zoom")}
                  </span>
                </div>
              </div>
              <div 
                onClick={() => setLightboxUrl("https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623204540218.webp")}
                className="relative rounded-xl overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer flex items-center justify-center"
                title={t("点按查看大图", "Click to zoom")}
              >
                <img 
                  src="https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623204540218.webp" 
                  alt="Other account 2 homepage" 
                  className="w-full h-auto object-cover scale-[1.065] group-hover:scale-[1.09] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-black/60 text-white text-[10px] px-2.5 py-1.5 rounded-full border border-white/10 flex items-center gap-1">
                    <Eye className="w-3 h-3 text-sky-400" />
                    {t("点按查看清晰大图", "Click to zoom")}
                  </span>
                </div>
              </div>
              <div 
                onClick={() => setLightboxUrl("https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260627000718003.webp")}
                className="relative rounded-xl overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer flex items-center justify-center"
                title={t("点按查看大图", "Click to zoom")}
              >
                <img 
                  src="https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260627000718003.webp" 
                  alt="Other account 3 homepage" 
                  className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-black/60 text-white text-[10px] px-2.5 py-1.5 rounded-full border border-white/10 flex items-center gap-1">
                    <Eye className="w-3 h-3 text-sky-400" />
                    {t("点按查看清晰大图", "Click to zoom")}
                  </span>
                </div>
              </div>
              <div 
                onClick={() => setLightboxUrl("https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623204634340.webp")}
                className="relative rounded-xl overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer flex items-center justify-center"
                title={t("点按查看大图", "Click to zoom")}
              >
                <img 
                  src="https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623204634340.webp" 
                  alt="Other account 4 homepage" 
                  className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-black/60 text-white text-[10px] px-2.5 py-1.5 rounded-full border border-white/10 flex items-center gap-1">
                    <Eye className="w-3 h-3 text-sky-400" />
                    {t("点按查看清晰大图", "Click to zoom")}
                  </span>
                </div>
              </div>
              <div 
                onClick={() => setLightboxUrl("https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260627000743804.webp")}
                className="relative rounded-xl overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer flex items-center justify-center"
                title={t("点按查看大图", "Click to zoom")}
              >
                <img 
                  src="https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260627000743804.webp" 
                  alt="Other account 5 homepage" 
                  className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-black/60 text-white text-[10px] px-2.5 py-1.5 rounded-full border border-white/10 flex items-center gap-1">
                    <Eye className="w-3 h-3 text-sky-400" />
                    {t("点按查看清晰大图", "Click to zoom")}
                  </span>
                </div>
              </div>
              <div 
                onClick={() => setLightboxUrl("https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260627000754778.webp")}
                className="relative rounded-xl overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer flex items-center justify-center"
                title={t("点按查看大图", "Click to zoom")}
              >
                <img 
                  src="https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260627000754778.webp" 
                  alt="Other account 6 homepage" 
                  className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-black/60 text-white text-[10px] px-2.5 py-1.5 rounded-full border border-white/10 flex items-center gap-1">
                    <Eye className="w-3 h-3 text-sky-400" />
                    {t("点按查看清晰大图", "Click to zoom")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 四图并排竖图展示区 */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-[10px] text-zinc-500 uppercase tracking-widest leading-none pt-1">
              <Eye className="w-3.5 h-3.5 text-sky-400" />
              <span>{t("成果精选（点击任意图片可放大查看）", "Curated Outfits Display (Click to zoom)")}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {otherImages.map((url, index) => (
                <div 
                  key={index} 
                  onClick={() => setLightboxUrl(url)}
                  className="relative aspect-[3/4] rounded-xl overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer"
                  title={t("点按查看大图", "Click to zoom")}
                >
                  <img 
                    src={url} 
                    alt={`Other niche account sample ${index + 1}`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <MousePointerClick className="w-5 h-5 text-white/80 drop-shadow" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 细节数据与文字介绍 */}
          <div className="p-3.5 bg-sky-400/[0.01] border border-sky-500/10 rounded-xl flex flex-col gap-3">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-sky-400" />
              <span className="text-xs font-semibold text-sky-300 tracking-wide">
                {t("垂直细分账号核心数据成果", "Niche Accounts Performance Profiles")}
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
              <div className="p-2.5 bg-white/[0.01] border border-white/5 rounded-lg flex flex-col">
                <span className="text-[9px] text-zinc-500 uppercase tracking-wider">{t("CurvySarah 熟龄大码", "CurvySarah Mature plus-size")}</span>
                <span className="text-xs md:text-sm font-bold text-white mt-1">GMV $3108.65</span>
                <span className="text-[9px] text-emerald-400 mt-0.5">+534% MoM</span>
              </div>
              <div className="p-2.5 bg-white/[0.01] border border-white/5 rounded-lg flex flex-col">
                <span className="text-[9px] text-zinc-500 uppercase tracking-wider">{t("remi 亚文化 Cos", "remi Subculture Cosplay")}</span>
                <span className="text-xs md:text-sm font-bold text-white mt-1">GMV $517.42</span>
                <span className="text-[9px] text-emerald-400 mt-0.5">+621% MoM</span>
              </div>
              <div className="p-2.5 bg-white/[0.01] border border-white/5 rounded-lg flex flex-col">
                <span className="text-[9px] text-zinc-500 uppercase tracking-wider">{t("KaiSpicyFits 中性前卫", "KaiSpicyFits Unisex Trend")}</span>
                <span className="text-xs md:text-sm font-bold text-white mt-1">GMV $324.96</span>
                <span className="text-[9px] text-emerald-400 mt-0.5">+679% MoM / 4.5 pt</span>
              </div>
              <div className="p-2.5 bg-white/[0.01] border border-white/5 rounded-lg flex flex-col">
                <span className="text-[9px] text-zinc-500 uppercase tracking-wider">{t("chloestyleedit 中码通勤", "chloestyleedit Midsize Commuter")}</span>
                <span className="text-xs md:text-sm font-bold text-white mt-1">GMV $246.28</span>
                <span className="text-[9px] text-emerald-400 mt-0.5">+208% MoM</span>
              </div>
            </div>

            <div className="text-xs md:text-sm text-zinc-350 leading-relaxed font-light text-justify pt-2.5 border-t border-white/5 flex flex-col gap-3">
              <p>
                {t(
                  "多个差异化垂类穿搭账号自主运营，覆盖成熟大码、亚文化 cos、中性先锋、中码通勤四大赛道，分层触达不同身材、年龄、风格偏好的美国女性消费群体，完整拓宽矩阵受众圈层，分散单一赛道流量风险，各账号均实现大幅环比增长：",
                  "Covering four key tracks—mature plus-size, subculture cosplay, unisex avant-garde, and midsize commuter wear—multiple differentiated niche apparel accounts were operated independently. This set of channels achieved precise tiered reaches targeting US female customers of varying sizes, ages, and style preferences, expanding the matrix's audience coverage, dispersing vertical distribution risks, and realizing enormous MoM growth rates:"
                )}
              </p>
              <ul className="list-none flex flex-col gap-3.5 pl-1">
                <li className="flex flex-col gap-1">
                  <strong className="text-zinc-200 font-medium text-xs md:text-sm flex items-center gap-1.5 select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-300" />
                    CurvySarah {t("成熟白人大妈女装账号", "Mature White Women Fashion Account")}
                  </strong>
                  <span className="text-[11px] md:text-xs text-zinc-400 pl-3 leading-relaxed">
                    {t(
                      "聚焦 40 + 大码白人成熟女性，主打简约通勤、复古日常宽松长裙，单月归因 GMV $3108.65，环比涨幅 534%；受众消费理性、偏好耐穿经典款，客单价稳定，完善矩阵熟龄女性消费覆盖。",
                      "Targeted 40+ mature plus-size white women, highlighting simple daily commuter styles and retro loose-fit dresses. Achieved an attributed monthly GMV of $3,108.65, a MoM increase of 534%. Rational consumer group with high preference for durable classics and stable order values, expanding coverage for mature-aged female consumer segments."
                    )}
                  </span>
                </li>
                <li className="flex flex-col gap-1">
                  <strong className="text-zinc-200 font-medium text-xs md:text-sm flex items-center gap-1.5 select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-300" />
                    remi Cosplay {t("前卫亚文化账号", "Avant-Garde Subculture Account")}
                  </strong>
                  <span className="text-[11px] md:text-xs text-zinc-400 pl-3 leading-relaxed">
                    {t(
                      "暗黑女仆、哥特 cos 小众风格赛道，单月归因 GMV $517.42，环比涨幅 621%；视频点击率表现突出，亚文化爱好者付费意愿强，填补矩阵小众特色服饰品类缺口。",
                      "Navigated dark maids, goth, and dress-up subcultures. Attributed single-month GMV reached $517.42, showing a MoM spike of 621%. Subculture enthusiasts demonstrate remarkable video CTR metrics and high willingness to purchase, nicely filling niche design and specialty wardrobe segments."
                    )}
                  </span>
                </li>
                <li className="flex flex-col gap-1">
                  <strong className="text-zinc-200 font-medium text-xs md:text-sm flex items-center gap-1.5 select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-300" />
                    KaiSpicyFits {t("中性大胆个性穿搭账号", "Androgynous Premium Streetwear Account")}
                  </strong>
                  <span className="text-[11px] md:text-xs text-zinc-400 pl-3 leading-relaxed">
                    {t(
                      "主打无性别前卫、街头先锋穿搭，单月归因 GMV $324.96，环比增速 679%，全店选品综合评分 4.5 分，小众赛道竞争小，目标用户粘性极强，特色中性款持续稳定出单。",
                      "Highlighted unisex avant-garde and progressive streetwear aesthetics. Realized a single-month GMV of $324.96, with MoM speed of 679% and a consolidated product rating score of 4.5. Low competitor density within specialized style segments yields excellent brand affinity and stable conversion rates."
                    )}
                  </span>
                </li>
                <li className="flex flex-col gap-1">
                  <strong className="text-zinc-200 font-medium text-xs md:text-sm flex items-center gap-1.5 select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-300" />
                    chloestyleedit {t("中码精致日常穿搭账号", "Midsize Elegant Everyday Apparel")}
                  </strong>
                  <span className="text-[11px] md:text-xs text-zinc-400 pl-3 leading-relaxed">
                    {t(
                      "面向 165cm + 中码女性，主打温柔通勤、度假优雅长裙套装，单月归因 GMV $246.28，环比增长 208%，成熟女性客群复购意愿高，长款垂感女装转化表现稳定。",
                      "Addressed 165cm+ midsize women, focusing on gentle business casual, elegant maxi resort gowns, and matching suits. GMV reached $246.28 showing a 208% MoM uptick. Exceptional repeat purchase customer profiles, displaying superb conversions for fluid, draped silhouettes."
                    )}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 三、自运营渠道设计成效 */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-white/5 pb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-300" />
          <h4 className="text-sm md:text-base uppercase tracking-[0.1em] font-bold text-white/95">
            {t("三、自运营渠道设计成效", "III. Self-operated Channel Design Output")}
          </h4>
        </div>
        
        {/* 上下排列的成果图 */}
        <div className="flex flex-col gap-6">
          {/* 接手前的成果 */}
          <div className="flex flex-col gap-4">
            <div 
              onClick={() => setLightboxUrl("https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623205221309.webp")}
              className="relative rounded-xl overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer"
              title={t("点按查看大图", "Click to zoom")}
            >
              <img 
                src="https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623205221309.webp" 
                alt="Workflow Deliverable 2" 
                className="w-full h-auto object-contain max-h-[400px] mx-auto group-hover:scale-[1.01] transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="bg-black/60 text-white text-[11px] px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-sky-400" />
                  {t("点按查看清晰大图", "Click to zoom")}
                </span>
              </div>
            </div>

            <div 
              onClick={() => setLightboxUrl("https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623205313213.webp")}
              className="relative rounded-xl overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer"
              title={t("点按查看大图", "Click to zoom")}
            >
              <img 
                src="https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623205313213.webp" 
                alt="Results before taking over 2" 
                className="w-full h-auto object-contain max-h-[400px] mx-auto group-hover:scale-[1.01] transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="bg-black/60 text-white text-[11px] px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-sky-400" />
                  {t("点按查看清晰大图", "Click to zoom")}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-zinc-400 font-sans tracking-wide mt-1 text-center font-light">
              {t("接手前的成果", "Results before taking over")}
            </p>
          </div>

          {/* 接手后设计运营的成果 */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-4">
              {[
                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623224844780.webp",
                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623205352467.webp",
                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623205402719.webp",
                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623205412541.webp"
              ].map((url, idx) => (
                <div 
                  key={idx}
                  onClick={() => setLightboxUrl(url)}
                  className="relative rounded-xl overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer flex items-center justify-center w-full"
                  title={t("点按查看大图", "Click to zoom")}
                >
                  <img 
                    src={url} 
                    alt={`接手后成果图 ${idx + 1}`} 
                    className="w-full h-auto object-contain max-h-[600px] m-auto group-hover:scale-[1.008] transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-black/60 text-white text-[11px] px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-sky-400" />
                      {t("点按查看清晰大图", "Click to zoom")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-zinc-400 font-sans tracking-wide mt-1 text-center font-light">
              {t("接手后设计运营的成果", "Results of design and operation after taking over")}
            </p>
          </div>

          <p className="mt-3 text-xs text-zinc-300 leading-relaxed font-light text-justify px-2">
            {t(
              "对比接手初期与优化运营后的美国区自运营渠道整体数据，业务结构得到显著优化，非穿搭泛娱乐类内容基本完成清量关停，渠道全部内容产能与营收均由穿搭垂类账号承接；从环比增速维度来看，运营后日均投稿投放规模相较接手阶段适度收缩，内容发布节奏更加精简高效，淘汰低效泛流量短剧内容后，整体 GMV 实现大幅环比上涨，内容投产转化效率显著提升，形成少发文、高营收的优质增长模型，印证聚焦垂类穿搭、精简引流短剧账号的矩阵调整策略有效拉高渠道整体变现增速，渠道营收增长质量同步大幅改善。",
              "Comparing the overall data of self-operated channels in the US region between the early stage of taking over and after operational optimization, the business structure has been significantly optimized. Non-apparel general entertainment content has been basically shut down, and all content productivity and revenue of the channels are now supported by apparel vertical accounts. From the perspective of MoM growth rates, the average daily postings and advertisements scale-down after operations holds a more refined and efficient cadence than before. After phasing out inefficient general-traffic mini-drama content, the overall GMV achieved a substantial MoM increase, remarkably boosting content ROI and conversion efficiency. This forms a high-quality growth model of low post frequency yet high revenue, validating that the matrix adjustment strategy—focusing on vertical apparel and streamlining traffic-attraction drama channels—has effectively accelerated the channel's overall monetization growth and significantly enhanced the quality of revenue expansion."
            )}
          </p>
        </div>
      </div>

      {/* 四、自有标准化视觉资产库搭建工作说明 */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2 border-b border-white/5 pb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-300 animate-pulse" />
          <h4 className="text-sm md:text-base uppercase tracking-[0.1em] font-bold text-white/95">
            {t("四、自有标准化视觉资产库搭建工作说明", "IV. Setup Reference for Self-Operated Standardized Visual Asset Library")}
          </h4>
        </div>
        
        <div className="text-xs md:text-sm text-zinc-300 leading-relaxed font-light text-justify px-1">
          {t(
            "自主搭建完整分层资产库体系，划分为四大核心库：细分人群用户人设库、AIGC 生成标准化 Prompt 库、人物形象参考资产库、实景场景素材库，为全矩阵 TikTok 女装短视频内容生产提供统一底层支撑。",
            "Established a comprehensive tiered asset library architecture comprising four core repositories: demographic persona profiles, AIGC prompt templates, reference character portraits, and lifestyle background materials, providing unified baseline support for all TikTok apparel reels across the entire matrix."
          )}
        </div>

        <div className="flex flex-col gap-6">
          {/* 1. 分层用户人设库搭建 */}
          <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.01] flex flex-col gap-3">
            <span className="text-xs font-semibold text-sky-300 uppercase tracking-wider font-mono">
              {t("1. 分层用户人设库搭建", "1. Tiered Demographic Persona Profiling")}
            </span>
            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-light text-justify">
              {t(
                "基于美国大码女装赛道细分人群需求，完成四类核心目标客群完整人设沉淀，覆盖不同种族、年龄、穿搭审美、消费习惯的女性用户，统一规范人群定位、货盘适配、消费决策逻辑、视觉形象标准，实现账号内容、选品、拍摄风格精准匹配对应受众，从源头规避内容与目标客群错位问题，保障各垂类账号差异化清晰、赛道互不内耗。",
                "Segmenting by tailored requirements in the US plus-size fashion domain, structured 4 core user profiles bridging diverse ethnicities, age brackets, styles, and spending behaviors. Standardized target focus, merchandise alignment, purchasing decision-making paths, and look standards, matching contents, products, and visual styles to correct targets, eliminating audience mismatch at the root while avoiding overlap of sibling accounts."
              )}
            </p>
            
            <div className="flex flex-col gap-4 mt-1.5">
              {[
                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623205449351.webp",
                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623205459655.webp",
                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623205509107.webp",
                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623205519012.webp"
              ].map((url, idx) => (
                <div 
                  key={idx}
                  onClick={() => setLightboxUrl(url)}
                  className="relative rounded-xl overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer flex items-center justify-center w-full"
                  title={t("点按查看大图", "Click to zoom")}
                >
                  <img src={url} className="w-full h-auto object-contain group-hover:scale-[1.01] transition-transform duration-500" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-transparent group-hover:bg-black/25 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                    <span className="bg-black/60 text-white text-[11px] px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-sky-400" />
                      {t("点按查看清晰大图", "Click to zoom")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. 标准化 AIGC Prompt 模板库搭建 */}
          <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.01] flex flex-col gap-3">
            <span className="text-xs font-semibold text-sky-300 uppercase tracking-wider font-mono">
              {t("2. 标准化 AIGC Prompt 模板库搭建", "2. Standardized AIGC Prompt Equations Template Library")}
            </span>
            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-light text-justify">
              {t(
                "针对短视频 AI 生成工具搭建合规、可复用的成套提示词模板库，划定安全审核红线、拍摄镜头规范、人物身材约束、叙事脚本固定结构，统一分镜叙事框架、画面描述规范、本土化英文口播话术逻辑。库内模板按人群、服饰品类、使用场景分类归档，标准化输出 15 秒竖屏带货短视频生成指令，大幅降低单条视频创作试错成本，稳定产出符合 TikTok 平台审核规则、贴合本土审美调性的种草内容。",
                "Engineered standardized and compliance-friendly prompt blocks for AI rendering, defining safety filter boundaries, camera angles, plus-size body control guidelines, and structured storyboards to synchronize split-screen pacing, visual framing, and local English narration styles. Categorized templates by audience demographic and apparel niches to yield consistent 15s product-showcase outputs, cutting production trial/error costs and ensuring adherence to TikTok policies and US cultural design tones."
              )}
            </p>
            
            <div className="grid grid-cols-2 gap-3 mt-1.5 items-stretch">
              {[
                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623205539591.webp",
                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623205549097.webp"
              ].map((url, idx) => (
                <div 
                  key={idx}
                  onClick={() => setLightboxUrl(url)}
                  className="relative rounded-xl overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer flex items-center justify-center w-full aspect-[4/3] sm:aspect-[16/10]"
                  title={t("点按查看大图", "Click to zoom")}
                >
                  <img src={url} className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-transparent group-hover:bg-black/25 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                    <span className="bg-black/60 text-white text-[10px] px-2.5 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                      <Eye className="w-3 h-3 text-sky-400" />
                      {t("点按查看大图", "Click to zoom")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. 人物 & 场景参考素材资产库 */}
          <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.01] flex flex-col gap-3">
            <span className="text-xs font-semibold text-sky-300 uppercase tracking-wider font-mono">
              {t("3. 人物 & 场景参考素材资产库", "3. Character Portrait & Background Reference Assets")}
            </span>
            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-light text-justify">
              {t(
                "批量归集合规人物形象实拍图、居家 / 户外美式生活实景素材，统一收纳不同体型、种族、年龄的大码女性参考人像与居家、街区、社区原生场景参考图，给 AI 生成提供固定视觉基准，严格把控模特身材、画面光影、布景风格一致性，避免生成画面风格、人物体型出现偏差，统一全矩阵视频视觉质感。",
                "Aggregated compliant on-camera photos and real US household/outdoor scenery graphics, assembling reference templates of varied body forms, age spans, and ethnicities of plus-size characters alongside local suburb, flat, and community settings. This established a uniform visual baseline for AI tools, shielding the outputs from lighting, scenery, or weight distortions to enforce matrix-wide design continuity."
              )}
            </p>
            
            <div className="flex flex-col gap-1.5 mt-1.5">
              <div 
                onClick={() => setLightboxUrl("https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623205608101.webp")}
                className="relative rounded-xl overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer w-full"
                title={t("点按查看大图", "Click to zoom")}
              >
                <img 
                  src="https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623205608101.webp" 
                  alt="Character and Scene Reference assets" 
                  className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-black/60 text-white text-[11px] px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-sky-400" />
                    {t("点按查看清晰大图", "Click to zoom")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. 资产库协同生产价值 */}
          <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.01] flex flex-col gap-3">
            <span className="text-xs font-semibold text-sky-300 uppercase tracking-wider font-mono">
              {t("4. 资产库协同生产价值", "4. Synergetic Collaboration & Production Value")}
            </span>
            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-light text-justify">
              {t(
                "四大资产库形成联动生产闭环，运营可根据账号对应客群调取匹配人设，直接复用对应分类 Prompt 模板 + 配套参考素材，实现标准化、批量化短视频产出；同时资产库持续迭代更新，同步吸纳平台爆款画面、最新流行穿搭风格，不断优化人物画像与生成提示逻辑，持续提升短视频起量效率、商品点击率与整体 GMV 转化效率。",
                "The four assets build a synergetic production loop: coordinators pluck target persona outlines, fetch pre-mapped prompt equations, and load compliant background plates, creating a turnkey method of mass video creation. The ecosystem is steadily upgraded with incoming viral video dynamics and trending styles to continuously refine the human visual representation and prompting equations, driving higher reel virality, CTR, and transactional GMV metrics."
              )}
            </p>
          </div>
        </div>
      </div>

      {/* 五、工作模式升级与效率提升 */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 border-b border-white/5 pb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-300 animate-pulse" />
          <h4 className="text-sm md:text-base uppercase tracking-[0.1em] font-bold text-white/95">
            {t("五、工作模式升级与效率提升", "V. Workflow Optimization & Operational Scaling")}
          </h4>
        </div>
        <div className="space-y-2">
          {[
            {
              title: "三级生产体系搭建",
              enTitle: "Three-Tier Content Factory Paradigm",
              desc: "建立 \"个人创意把控 + BPO 团队执行 + AI Agent 辅助\" 的三级生产体系，将重复性的视频生成、字幕添加、素材拼接等工作标准化输出",
              enDesc: "Established a 'design direction (In-house) + BPO execution + AI Agent' three-tier workflow, standardizing repetitive video rendering, captioning, and background stitching."
            },
            {
              title: "产能爆发式增长",
              enTitle: "Exponential Volumetric Output",
              desc: "内容产能较纯手动制作阶段提升 3 倍以上，单日最高可产出 60 + 条符合平台标准的电商短视频",
              enDesc: "Boosted video output over 3-fold compared to manual editing, reaching peak production of 60+ compliant ecommerce reels per day."
            },
            {
              title: "质量稳定可控",
              enTitle: "Stable Quality Control",
              desc: "通过 AI Agent 自动化测试不同脚本模板，在产能大幅提升的同时，保持了 40% 以上的优质视频率（Decent%）",
              enDesc: "Tested diverse narrative frameworks automatically via AI Agent, maintaining a 40%+ excellent video tier (Decent%) amid scaled volume."
            },
            {
              title: "数据驱动迭代",
              enTitle: "Data-Driven Operational Iterations",
              desc: "每日监控四账号 GPM、CTR、CVR 等核心指标，总结不同人群的内容偏好，迭代优化出 \"真人实测 + 痛点解决 + 效果展示\" 的通用爆款模板",
              enDesc: "Monitored core performance metrics (GPM, CTR, CVR) across 4 profiles daily, distilling viewer trends to formulate highly-converting 'User Demo + Problem Solving + Highlight Showcase' layouts."
            }
          ].map((item, idx) => (
            <div key={idx} className="group flex gap-3 p-3.5 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-300 items-start">
              <span className="text-xs font-mono text-zinc-500 font-semibold mt-0.5 shrink-0">0{idx + 1}</span>
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-semibold text-zinc-100 group-hover:text-sky-300 transition-colors duration-300 leading-none">
                  {t(item.title, item.enTitle)}
                </span>
                <p className="text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors duration-350 leading-relaxed font-light">
                  {t(item.desc, item.enDesc)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 工作模式升级与效率提升图片 */}
        <div className="flex flex-col gap-1.5 mt-2">
          <div 
            onClick={() => setLightboxUrl("https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623205620823.webp")}
            className="relative rounded-xl overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer"
            title={t("点按查看大图", "Click to zoom")}
          >
            <img 
              src="https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623205620823.webp" 
              alt="Workflow optimization diagram" 
              className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="bg-black/60 text-white text-[11px] px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-sky-400" />
                {t("点按查看清晰大图", "Click to zoom")}
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
