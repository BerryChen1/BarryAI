import React, { useState, useRef, useEffect, useMemo, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ChevronRight, X, ArrowUpRight, Copy, Check, Eye } from 'lucide-react';
import { PORTFOLIO_DETAILS, CATALOG_PORTFOLIO_DATA } from './data';
import { ProjectItem } from './types';
import { CustomVideoPlayer } from './components/CustomVideoPlayer';
const TikTokDetail = React.lazy(() => import('./components/TikTokDetail').then(module => ({ default: module.TikTokDetail })));
const TikTokShopDetail = React.lazy(() => import('./components/TikTokShopDetail').then(module => ({ default: module.TikTokShopDetail })));
const TencentIEGDetail = React.lazy(() => import('./components/TencentIEGDetail').then(module => ({ default: module.TencentIEGDetail })));
import { ChillaxCampaignDetail } from './components/ChillaxCampaignDetail';
import { OddityClubDetail } from './components/OddityClubDetail';
import { WukongCampaignDetail } from './components/WukongCampaignDetail';
const ZoomableLightbox = React.lazy(() => import('./components/ZoomableLightbox').then(module => ({ default: module.ZoomableLightbox })));
import { Vid1Detail } from './components/Vid1Detail';
import { Vid2Detail } from './components/Vid2Detail';
import { Vid3Detail } from './components/Vid3Detail';
import { Vid5Detail } from './components/Vid5Detail';
import { Vid11Detail } from './components/Vid11Detail';
import { Vid12Detail } from './components/Vid12Detail';
import { Vid13Detail } from './components/Vid13Detail';
import { Vid14Detail } from './components/Vid14Detail';
import { VidGalleryDetail } from './components/VidGalleryDetail';
import { Xuanye } from './components/Xuanye';



const CyberText = ({ lines, noWrapLast = false }: { lines: string[], noWrapLast?: boolean }) => {
  const [charIndex, setCharIndex] = useState(-1);

  useEffect(() => {
    let frame: number;
    
    const update = () => {
      const now = Date.now();
      // Total cycle duration: 5500ms (5.5 seconds)
      const cycleTime = now % 5500;
      
      // Phase 1: 0ms - 1000ms -> Hidden (Blank)
      if (cycleTime < 1000) {
        setCharIndex(-1);
      } 
      // Phase 2 & 3: 1000ms - 5500ms -> Typing and Holding
      else {
        // 1 char every 100ms
        const typed = Math.floor((cycleTime - 1000) / 100);
        setCharIndex(typed);
      }
      
      frame = requestAnimationFrame(update);
    };
    
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, []);

  let charsRendered = 0;

  return (
    <div className="w-full h-full relative bg-[#0A0A0A] flex flex-col items-start justify-center text-left p-4 md:p-8 xl:p-12 overflow-hidden">
      <h2 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-[1.05] uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 via-zinc-100 to-zinc-500 bg-[length:200%_auto] animate-cyber-glitch-combined cursor-default flex flex-col items-start drop-shadow-sm">
        {lines.map((line, i) => {
          const isLast = i === lines.length - 1;
          return (
            <span key={i} className={isLast && noWrapLast ? "whitespace-nowrap" : "block"}>
              {line.split("").map((char, j) => {
                const isVisible = charsRendered <= charIndex;
                charsRendered++;
                return (
                  <span key={j} style={{ visibility: isVisible ? "visible" : "hidden" }} className="inline-block">
                    {char === " " ? "\u00A0" : char}
                  </span>
                );
              })}
            </span>
          );
        })}
      </h2>
    </div>
  );
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] },
});


const CopyableContact = ({ label, value }: { label: string, value: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div 
      onClick={handleCopy}
      className="flex items-center gap-3 text-[11px] md:text-xs text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer group py-1"
      title="点击复制 / Click to copy"
    >
      <span className="w-10 md:w-12 tracking-widest">{label}</span>
      <span className="font-mono tracking-wider">{value}</span>
      {copied ? <Check className="w-3 h-3 text-zinc-300" /> : <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
    </div>
  );
};

export default function App() {
  if (window.location.search === '?route=xuanye') return <Xuanye />;
  const defaultFilter = CATALOG_PORTFOLIO_DATA.length > 0 ? CATALOG_PORTFOLIO_DATA[0].name.replace('作品', '') : '';
  const [activeFilter, setActiveFilter] = useState(defaultFilter);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  
  // Experience Details Modal State
  const [selectedExperienceIndex, setSelectedExperienceIndex] = useState<number | null>(null);
  
  // Lightbox State
  const [lightboxState, setLightboxState] = useState<{ images: string[], index: number } | null>(null);

  // Internationalization (for existing detailed components)
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');
  const t = (zh: any, en: any) => language === 'zh' ? zh : en;

  // Derive categories for filter (Removed '全部')
  const filters = useMemo(() => {
    return CATALOG_PORTFOLIO_DATA.map(c => c.name.replace('作品', ''));
  }, []);

  useEffect(() => {
    if (selectedProject !== null || selectedExperienceIndex !== null || lightboxState !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject, selectedExperienceIndex, lightboxState]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    const cat = CATALOG_PORTFOLIO_DATA.find(c => c.name.replace('作品', '') === activeFilter);
    return cat ? cat.projects : [];
  }, [activeFilter]);

  // Helper to open project by ID
  const openProjectById = (id: string) => {
    for (const cat of CATALOG_PORTFOLIO_DATA) {
      const proj = cat.projects.find(p => p.id === id);
      if (proj) {
        setSelectedProject(proj);
        return;
      }
    }
  };

  const scrollToSection = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const exps = [
    { id: 1, detail: PORTFOLIO_DETAILS[1] },
    { id: 2, detail: PORTFOLIO_DETAILS[2] },
    { id: 3, detail: PORTFOLIO_DETAILS[3] },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-300 font-sans selection:bg-zinc-800 selection:text-white">

        {/* Sticky Navigation */}
        <nav className="fixed top-0 left-0 right-0 w-full z-[200] bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/5 flex justify-between items-center px-6 md:px-12 py-2.5 md:py-3.5 shrink-0 transition-all">
          {/* Left: Avatar & Name */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('home')}>
            <img loading="lazy" decoding="async" src="/images/20260917004311360.webp" alt="BarryC" className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover border border-white/20" />
            <span className="text-white font-bold text-xl md:text-2xl tracking-wider" style={{ fontFamily: "'Caveat', cursive" }}>BarryC.</span>
          </div>

          {/* Right: Links & Xiaohongshu */}
          <div className="flex items-center gap-4 md:gap-8 text-[10px] md:text-sm font-medium tracking-widest text-zinc-400">
            <div className="flex items-center gap-3 md:gap-8">
              <button onClick={() => scrollToSection('home')} className="hover:text-white transition-colors">首页</button>
              <button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">关于我</button>
              <button onClick={() => scrollToSection('works')} className="hover:text-white transition-colors whitespace-nowrap">作品展示集</button>
            </div>
            
            <div className="w-px h-3 md:h-4 bg-white/20"></div>
            
            <a href="https://xhslink.cn/o/6MSzBnU332q" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-1.5 md:gap-2 hover:text-white transition-colors" title="前往小红书查看更多">
              <span className="hidden lg:inline-block text-xs font-medium mr-1 opacity-60 group-hover:opacity-100 transition-opacity">Follow</span>
              <img loading="lazy" decoding="async" src="/images/20260912213639645.webp" alt="小红书" className="w-5 h-5 md:w-6 md:h-6 object-contain group-hover:scale-110 transition-transform shrink-0 drop-shadow-[0_0_6px_rgba(255,255,255,0.2)]" />
              <ArrowUpRight className="w-3 h-3 md:w-3.5 md:h-3.5 opacity-50 group-hover:opacity-100 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 shrink-0" />
            </a>
          </div>
        </nav>


      {/* Header / Hero Container */}
      <div className="w-full h-[100dvh] min-h-[500px] flex flex-col bg-black overflow-hidden">
        {/* Massive Logo Area */}
        <header className="w-full flex flex-col items-center justify-center pt-20 pb-4 md:pt-24 md:pb-6 px-4 bg-[#0A0A0A] border-b border-white/5 shrink-0">
          <h1 className="text-[12vw] sm:text-[10vw] md:text-[8vw] font-black text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 via-zinc-100 to-zinc-500 leading-[0.8] tracking-tighter uppercase text-center w-full animate-title-combined">
            BOCHEN'S AI ROOM
          </h1>
          <h2 className="text-xs md:text-xl font-bold tracking-[0.3em] text-zinc-400 mt-3 md:mt-4 uppercase text-center whitespace-nowrap">
            AIGC Video & Visual Creator
          </h2>
          <p className="text-zinc-400 tracking-[0.2em] text-[9px] md:text-xs mt-1.5 md:mt-2 uppercase text-center whitespace-nowrap">
            AIGC 影视 · 动画 · 视觉
          </p>
        </header>

        {/* Hero Grid Section */}
        <section id="home" className="w-full flex-1 min-h-0 relative overflow-hidden bg-zinc-900 flex">
          <div className="flex h-full w-full overflow-x-auto hide-scrollbar snap-x snap-mandatory">
            {/* Grid 1 */}
            <div className="w-[200vw] lg:w-full h-full grid grid-cols-4 grid-rows-2 gap-0.5 shrink-0 bg-[#0A0A0A] snap-start">
              {/* Row 1 / Block 1-4 */}
          <div className="w-full h-full relative overflow-hidden group/vid bg-[#0A0A0A] cursor-pointer" onClick={() => openProjectById('brand-xuanye')}>
            <video src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%20shoye/6.mp4" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/vid:scale-105" autoPlay loop muted playsInline />
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover/vid:opacity-100 transition-all duration-500 flex flex-col items-center justify-center pointer-events-none p-4 text-center">
              <h3 className="text-white font-bold text-[10px] md:text-sm lg:text-base tracking-wider mb-2 transform translate-y-4 group-hover/vid:translate-y-0 transition-transform duration-500">《玄夜·引渡》</h3>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transform scale-90 group-hover/vid:scale-100 transition-all duration-500 delay-75">
                <Eye className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          
          <CyberText lines={["FRAME", "BY", "FRAME."]} />

          <div className="w-full h-full relative overflow-hidden group/vid bg-[#0A0A0A] cursor-pointer" onClick={() => openProjectById('vid-14')}>
            <video src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%20shoye/1.mp4" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/vid:scale-105" autoPlay loop muted playsInline />
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover/vid:opacity-100 transition-all duration-500 flex flex-col items-center justify-center pointer-events-none p-4 text-center">
              <h3 className="text-white font-bold text-[10px] md:text-sm lg:text-base tracking-wider mb-2 transform translate-y-4 group-hover/vid:translate-y-0 transition-transform duration-500">《墨染·天下》</h3>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transform scale-90 group-hover/vid:scale-100 transition-all duration-500 delay-75">
                <Eye className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          <div className="w-full h-full relative overflow-hidden group/vid bg-[#0A0A0A] cursor-pointer" onClick={() => openProjectById('vid-1')}>
            <video src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%20shoye/3.mp4" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/vid:scale-105" autoPlay loop muted playsInline />
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover/vid:opacity-100 transition-all duration-500 flex flex-col items-center justify-center pointer-events-none p-4 text-center">
              <h3 className="text-white font-bold text-[10px] md:text-sm lg:text-base tracking-wider mb-2 transform translate-y-4 group-hover/vid:translate-y-0 transition-transform duration-500">《The Last》</h3>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transform scale-90 group-hover/vid:scale-100 transition-all duration-500 delay-75">
                <Eye className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Row 2 / Block 5-8 */}
          <div className="w-full h-full relative overflow-hidden group/vid bg-[#0A0A0A] cursor-pointer" onClick={() => openProjectById('oth-2')}>
            <video src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%20shoye/4.mp4" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/vid:scale-105" autoPlay loop muted playsInline />
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover/vid:opacity-100 transition-all duration-500 flex flex-col items-center justify-center pointer-events-none p-4 text-center">
              <h3 className="text-white font-bold text-[10px] md:text-sm lg:text-base tracking-wider mb-2 transform translate-y-4 group-hover/vid:translate-y-0 transition-transform duration-500">怪奇研究所</h3>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transform scale-90 group-hover/vid:scale-100 transition-all duration-500 delay-75">
                <Eye className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          <div className="w-full h-full relative overflow-hidden group/vid bg-[#0A0A0A] cursor-pointer" onClick={() => openProjectById('vid-13')}>
            <video src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%20shoye/2.mp4" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/vid:scale-105" autoPlay loop muted playsInline />
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover/vid:opacity-100 transition-all duration-500 flex flex-col items-center justify-center pointer-events-none p-4 text-center">
              <h3 className="text-white font-bold text-[10px] md:text-sm lg:text-base tracking-wider mb-2 transform translate-y-4 group-hover/vid:translate-y-0 transition-transform duration-500">《超时空决战！英灵殿》</h3>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transform scale-90 group-hover/vid:scale-100 transition-all duration-500 delay-75">
                <Eye className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          <div className="w-full h-full relative overflow-hidden group/vid bg-[#0A0A0A] cursor-pointer" onClick={() => openProjectById('comm-3')}>
            <video src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%20shoye/5.mp4" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/vid:scale-105" autoPlay loop muted playsInline />
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover/vid:opacity-100 transition-all duration-500 flex flex-col items-center justify-center pointer-events-none p-4 text-center">
              <h3 className="text-white font-bold text-[10px] md:text-sm lg:text-base tracking-wider mb-2 transform translate-y-4 group-hover/vid:translate-y-0 transition-transform duration-500">《五音傩神》</h3>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transform scale-90 group-hover/vid:scale-100 transition-all duration-500 delay-75">
                <Eye className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          <CyberText lines={["READY", "WHEN", "YOU ARE."]} noWrapLast={true} />
            </div>
          </div>
        </section>
      </div>

      {/* About & Experience Section */}
      <section id="about" className="w-full max-w-7xl mx-auto px-6 pt-16 pb-8 md:pt-24 md:pb-12 flex flex-col lg:flex-row gap-20">
        
        {/* About Column */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <motion.h3 {...fadeUp(0)} className="text-zinc-500 text-sm tracking-[0.2em] font-medium mb-4 uppercase">ABOUT ME</motion.h3>
          <motion.h2 {...fadeUp(0.1)} className="text-4xl md:text-5xl font-bold text-white mb-12 tracking-tight">关于我</motion.h2>
          
          <div className="flex flex-col gap-8 text-base md:text-lg text-zinc-400 font-light leading-relaxed mb-12">
            <motion.p {...fadeUp(0.2)}>
              山东工艺美术学院艺术设计（视觉传达设计）专业本硕连读，硕士期间获得<strong className="text-white font-medium">硕士一等奖学金</strong>，具有“<strong className="text-zinc-200 font-medium">腾讯→字节→字节</strong>”多段 AIGC 相关（视频/视觉）业务履历，具备扎实的美术基本功与出色的画面审美。
            </motion.p>
            <motion.p {...fadeUp(0.3)}>
              <strong className="text-white font-medium">独立闭环创作AI影视与漫剧作品</strong>，擅长从创意 → IP 内容理解 → 美术风格设定 → 分镜脚本 → AI 视频生成 → 成片的全流程创作。拥有系统化的提示词工程与工作流编排经验（剧本拆解 → 分镜 → 提示词SOP）。
            </motion.p>
            <motion.p {...fadeUp(0.4)}>
              具备将 <strong className="text-white font-medium">AI 和商业品牌视觉结合</strong> 的能力，无论是做品牌资产落地、IP 孵化还是新零售视觉企划，都具有扎实的实操经验。
            </motion.p>
          </div>

          {/* Personal Intro Card */}
          <motion.div 
            {...fadeUp(0.5)}
            className="group relative flex items-center gap-5 p-4 md:p-5 rounded-sm bg-zinc-900/50 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer w-full max-w-sm shadow-xl hover:shadow-sky-500/10 overflow-hidden"
            onClick={() => setSelectedExperienceIndex(0)}
          >
            {/* Ambient Glow */}
            <div className="absolute -inset-x-10 -top-10 h-20 bg-sky-500/20 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="w-16 h-16 rounded-sm overflow-hidden shrink-0 border border-white/10 group-hover:border-sky-400/30 transition-colors shadow-lg z-10">
              <img loading="lazy" decoding="async" src={PORTFOLIO_DETAILS[0].coverImage} alt={PORTFOLIO_DETAILS[0].title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            
            <div className="flex flex-col flex-1 z-10">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-xl font-bold text-zinc-200 group-hover:text-white transition-colors">{PORTFOLIO_DETAILS[0].title}</h4>
                <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowUpRight className="w-3 h-3 text-sky-400" />
                </div>
              </div>
              <p className="text-zinc-400 text-xs md:text-sm line-clamp-1 group-hover:text-zinc-300 transition-colors">{PORTFOLIO_DETAILS[0].tagline || "个人详细履历、荣誉与成就"}</p>
              
              <span className="inline-flex items-center gap-1 text-[10px] tracking-widest uppercase text-white/80 mt-2.5 group-hover:text-sky-400 transition-colors">
                探索详细履历 <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </motion.div>

          {/* Contact Info Group */}
          <motion.div {...fadeUp(0.6)} className="mt-6 md:mt-8 ml-2 flex flex-col gap-0.5 w-full max-w-sm border-l border-white/10 pl-5">
            <CopyableContact label="微信号" value="Ddd032111" />
            <CopyableContact label="手机号" value="18189688167" />
            <CopyableContact label="邮　箱" value="1073186932@qq.com" />
          </motion.div>

        </div>

        {/* Experience Column (Timeline) */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <motion.h3 {...fadeUp(0)} className="text-zinc-500 text-sm tracking-[0.2em] font-medium mb-4 uppercase">EXPERIENCE</motion.h3>
          <motion.h2 {...fadeUp(0.1)} className="text-4xl md:text-5xl font-bold text-white mb-12 tracking-tight">实习经历</motion.h2>

          <div className="relative border-l border-white/10 ml-3 pl-8 flex flex-col gap-12">
            {exps.map((exp, idx) => (
              <motion.div 
                key={exp.id} 
                {...fadeUp(0.2 + idx * 0.1)} 
                className="relative group flex flex-col sm:flex-row items-start gap-3 sm:gap-4 cursor-pointer"
                onClick={() => setSelectedExperienceIndex(exp.id)}
              >
                {/* Dot */}
                <div className="absolute -left-[37.5px] top-4 w-3 h-3 rounded-full bg-zinc-800 group-hover:bg-zinc-300 transition-colors border border-zinc-700" />

                {/* Thumbnail */}
                {/* @ts-ignore */}
                {exp.detail.logo ? (
                  <div className="w-24 h-7 md:w-28 md:h-8 shrink-0 flex items-center justify-center -mt-0.5 md:mt-0 relative rounded-md md:rounded-sm overflow-hidden border border-white/5 group-hover:border-white/15 shadow-md transition-colors">
                    <img loading="lazy" decoding="async" src={(exp.detail as any).logo} alt={exp.detail.title} className="w-full h-full object-cover opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 origin-center" />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-sm overflow-hidden shrink-0 transition-colors mt-1 flex items-center justify-center border border-white/5 group-hover:border-white/20">
                    <img loading="lazy" decoding="async" src={exp.detail.coverImage} alt={exp.detail.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500" />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1">
                  <h4 className="text-lg md:text-xl font-bold text-zinc-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">{exp.detail.title}</h4>
                  <p className="text-zinc-500 text-sm font-medium tracking-wide mb-3 group-hover:text-zinc-400 group-hover:translate-x-1 transition-all duration-300">{exp.detail.subtitle}</p>
                  
                  {/* Provide a short tagline/summary */}
                  <p className="text-zinc-400 text-sm font-light mb-4 whitespace-pre-line leading-relaxed">
                    {exp.detail.tagline || (exp.detail.paragraphs && exp.detail.paragraphs[0]) || ""}
                  </p>

                  <span className="inline-flex items-center gap-2 text-[10px] tracking-widest uppercase text-zinc-500 group-hover:text-white transition-colors">
                    <ChevronRight className="w-4 h-4 text-zinc-400" /> 探索经历详情
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Works Section */}
      <section id="works" className="w-full px-4 md:px-6 lg:px-8 pt-4 pb-24 md:pt-8 md:pb-32">
        <div className="text-center mb-6 md:mb-10">
          <motion.h3 {...fadeUp(0)} className="text-zinc-500 text-sm tracking-[0.2em] font-medium mb-2 uppercase">WORKS</motion.h3>
          <motion.h2 {...fadeUp(0.1)} className="text-4xl md:text-5xl font-bold text-white tracking-tight">作品展示集</motion.h2>
        </div>

        {/* Filters */}
        <motion.div {...fadeUp(0.2)} className="flex flex-wrap justify-center gap-4 md:gap-5 mb-12 md:mb-16">
          {filters.map(f => (
            <button 
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`text-sm tracking-widest uppercase transition-colors pb-1 border-b-2 ${activeFilter === f ? 'text-white border-white' : 'text-zinc-500 border-transparent hover:text-white'}`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Works Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          <AnimatePresence>
            {filteredProjects.map((proj, idx) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5 }}
                key={proj.id}
                className="group cursor-pointer relative"
                onClick={() => setSelectedProject(proj)}
              >
                <div className="relative w-full aspect-video bg-[#111] overflow-hidden mb-4 md:mb-5">
                  {proj.coverImage ? (
                    <img loading="lazy" decoding="async" 
                      src={proj.coverImage} 
                      alt={proj.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                      
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-700 font-bold text-2xl">{proj.cardTitle || proj.title}</div>
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-[#0A0A0A]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center">
                    <span className="text-zinc-300 text-xs tracking-[0.2em] uppercase font-semibold mb-3">View Details</span>
                    <h4 className="text-2xl font-bold text-white text-center px-4 max-w-[80%] leading-tight">{proj.cardTitle || proj.title}</h4>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg md:text-xl font-bold text-zinc-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 truncate inline-block">{proj.cardTitle || proj.title}</h4>
                  {proj.subtitle && <p className="text-sm text-zinc-500 font-light truncate group-hover:text-zinc-400 group-hover:translate-x-1 transition-all duration-300 block">{proj.subtitle}</p>}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-[#0A0A0A] overflow-y-auto"
          >
            {/* Header / Close button fixed on top */}
            <div className="fixed top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0A0A0A] to-transparent z-[310] pointer-events-none flex justify-end items-start pt-6 pr-8 md:pr-16">
              <button 
                onClick={() => setSelectedProject(null)}
                className="p-3 md:p-4 bg-white/10 hover:bg-white hover:text-black border border-white/20 backdrop-blur-md rounded-full text-white transition-colors pointer-events-auto shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className={`w-full max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 py-24`}>
              <motion.div 
                initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
              >
                {selectedProject.customHtml ? (
                  <div className="fixed inset-0 z-[160] bg-[#0a0b0f] w-screen h-[100dvh] overflow-hidden">
                    <iframe src={selectedProject.customHtml} className="w-full h-full border-none" title={selectedProject.title} />
                  </div>
                ) : (
                  <>
                    {/* Commercial Visual Works - Top Cover Image */}
                    {["brand-1", "brand-wukong", "oth-2"].includes(selectedProject.id) && selectedProject.coverImage && (
                      <div className="w-full mb-12 -mt-6 group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer rounded-none border border-white/10" onClick={() => setLightboxState({ images: selectedProject.gallery || [selectedProject.coverImage], index: 0 })}>
                        <img loading="lazy" decoding="async" src={selectedProject.coverImage} alt={selectedProject.title} className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                      </div>
                    )}
                    
                    {/* Detail Header */}
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{selectedProject.title}</h2>
                    {selectedProject.subtitle && !CATALOG_PORTFOLIO_DATA.find(c => c.id === 'illustration')?.projects.some(p => p.id === selectedProject?.id) && <p className="text-xl text-zinc-400 font-light mb-12">{selectedProject.subtitle}</p>}
                    
                                        {/* Cinematic Video Player Section */}
                    {selectedProject.videoUrl && selectedProject.id !== "vid-13" && selectedProject.id !== "vid-14" && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-2.5 border-b border-white/5 pb-2.5 mb-6">
                          <span className="w-2 h-2 rounded-full bg-sky-300 animate-pulse" />
                          <h2 className="text-sm md:text-base uppercase tracking-[0.2em] font-bold text-zinc-200">
                            {selectedProject.id === "vid-4" || selectedProject.id === "vid-5"
                              ? t("短片展示（一） / FEATURED CINEMATIC SHORT", "FEATURED CINEMATIC SHORT")
                              : t("短片展示 / FEATURED CINEMATIC SHORT", "FEATURED CINEMATIC SHORT")}
                          </h2>
                        </div>
                        
                        {selectedProject.id === "vid-11" ? (
                          <div className="flex flex-col gap-6 w-full mb-16">
                            <CustomVideoPlayer src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/hainan.mp4" language={language} />
                            <CustomVideoPlayer src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/liaozhai%EF%BC%881%EF%BC%89.mp4" language={language} />
                            <CustomVideoPlayer src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/liaozhai%EF%BC%882%EF%BC%89.mp4" language={language} />
                          </div>
                        ) : selectedProject.id === "vid-12" ? (
                          <div className="flex flex-col gap-6 w-full mb-16">
                            <CustomVideoPlayer src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/wuxia%EF%BC%881%EF%BC%89.mp4" language={language} />
                            <CustomVideoPlayer src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/wuxia%EF%BC%882%EF%BC%89.mp4" language={language} />
                          </div>
                        ) : (
                          <div className="mb-16 bg-[#111]">
                            <CustomVideoPlayer src={selectedProject.videoUrl} language={language} />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Overview Block */}
                    {selectedProject.id !== "vid-13" && selectedProject.id !== "vid-14" && (
                    <div className="space-y-8 mb-16">
                      {selectedProject.id !== "vid-4" && selectedProject.id !== "vid-5" && (
                        <div className="flex items-center gap-2.5 border-b border-white/5 pb-2.5">
                          <span className="w-2 h-2 rounded-full bg-sky-300" />
                          <h2 className="text-sm md:text-base uppercase tracking-[0.2em] font-bold text-zinc-200">
                            {t("作品概述 / WORK OVERVIEW", "WORK OVERVIEW")}
                          </h2>
                        </div>
                      )}
                      {/* Taglined quote block */}
                      <div className="pl-5 border-l-3 border-sky-400/80 italic text-zinc-250 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed py-2.5 bg-sky-400/[0.02]">
                        {selectedProject.description}
                      </div>
                      {/* Detailed multi-paragraph story */}
                      <div className="space-y-6 text-zinc-350 text-sm sm:text-base md:text-lg lg:text-lg leading-[1.85] font-sans font-light text-justify">
                        {selectedProject.story && selectedProject.story.map((para, pIdx) => {
                          const isWuyinPara = para.includes("夜幕幻境之中五音傩神齐聚亮相");
                          const isNandouPara = para.includes("作品以南斗六星君为创作原型");
                          const isJiujiuPara = para.includes("山东工艺美术学院研究生学会 AIGC 卡通 IP 形象「究究」完整设计方案");
                          return (
                            <React.Fragment key={pIdx}>
                              <p className="tracking-wide">{para}</p>
                              {isWuyinPara && (
                                <div className="my-6 rounded-sm overflow-hidden border border-white/10 shadow-2xl bg-zinc-950/40">
                                  <CustomVideoPlayer src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/wuyin-nuo.mp4" language={language} />
                                </div>
                              )}
                              {isNandouPara && (
                                <div className="my-6 rounded-sm overflow-hidden border border-white/10 shadow-2xl bg-zinc-950/40">
                                  <CustomVideoPlayer src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/nandou.mp4" language={language} />
                                </div>
                              )}
                              
                              {isJiujiuPara && (
                                <div className="my-6 flex flex-col items-center">
                                  <div className="w-full max-w-2xl rounded-sm overflow-hidden border border-white/10 shadow-2xl bg-zinc-950/40">
                                    <CustomVideoPlayer src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/logo.mp4" language={language} />
                                  </div>
                                  <p className="text-xs md:text-sm text-zinc-400 mt-3 font-sans tracking-wide text-center">
                                    “究究”成为山东工艺美术学院“橙芽同学”绘画工作室品牌IP代言人
                                  </p>
                                </div>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </div>
                    </div>
                    )}

                    {/* Curated Media Showcase/Gallery */}
<div className="space-y-8">
                      {selectedProject.id === "vid-1" && <Vid1Detail selectedProject={selectedProject} language={language} t={t} setLightboxState={setLightboxState} />}
                      {selectedProject.id === "vid-2" && <Vid2Detail selectedProject={selectedProject} language={language} t={t} setLightboxState={setLightboxState} />}
                      {selectedProject.id === "vid-3" && <Vid3Detail selectedProject={selectedProject} language={language} t={t} setLightboxState={setLightboxState} />}
                      {selectedProject.id === "vid-5" && <Vid5Detail selectedProject={selectedProject} language={language} t={t} setLightboxState={setLightboxState} />}
                      {selectedProject.id === "vid-11" && <Vid11Detail selectedProject={selectedProject} language={language} t={t} setLightboxState={setLightboxState} />}
                      {selectedProject.id === "vid-12" && <Vid12Detail selectedProject={selectedProject} language={language} t={t} setLightboxState={setLightboxState} />}
                      {selectedProject.id === "vid-13" && <Vid13Detail selectedProject={selectedProject} language={language} t={t} setLightboxState={setLightboxState} />}
                      {selectedProject.id === "vid-14" && <Vid14Detail selectedProject={selectedProject} language={language} t={t} setLightboxState={setLightboxState} />}
                      {selectedProject.id === "brand-1" && <ChillaxCampaignDetail language={language} t={t} setLightboxState={setLightboxState} gallery={selectedProject.gallery || []} />}
                      {selectedProject.id === "oth-2" && <OddityClubDetail language={language} t={t} setLightboxState={setLightboxState} gallery={selectedProject.gallery || []} />}
                      {selectedProject.id === "brand-wukong" && <WukongCampaignDetail language={language} t={t} setLightboxState={setLightboxState} gallery={selectedProject.gallery || []} />}

                      {selectedProject.gallery && selectedProject.gallery.length > 0 && !["vid-1", "vid-2", "vid-3", "vid-4", "vid-5", "vid-11", "vid-12", "vid-13", "vid-14", "brand-1", "oth-2", "brand-wukong"].includes(selectedProject.id) && (
                        <>
                          <div className="flex items-center gap-2.5 border-b border-white/5 pb-2.5">
                            <span className="w-2 h-2 rounded-full bg-sky-300" />
                            <h2 className="text-sm md:text-base uppercase tracking-[0.2em] font-bold text-zinc-200">
                              {(selectedProject.id === "vid-6" || selectedProject.id === "vid-7" )
                                    ? t("作品详细 / WORK DETAILS", "WORK DETAILS")
                                    : t("精选创作成品 / VISUAL GALLERY", "VISUAL GALLERY")}
                            </h2>
                          </div>
                          <VidGalleryDetail selectedProject={selectedProject} language={language} t={t} setLightboxState={setLightboxState} />
                        </>
                      )}

                      {/* DNF Videos at the very bottom */}
                      {selectedProject.id === "comm-2" && (
                        <div className="flex flex-col gap-6 w-full mt-12 mb-6">
                          <div className="flex items-center gap-2.5 border-b border-white/5 pb-2.5 mb-6">
                            <span className="w-2 h-2 rounded-full bg-sky-300 animate-pulse" />
                            <h2 className="text-sm md:text-base uppercase tracking-[0.2em] font-bold text-zinc-200">
                              动态视效展示 / DYNAMIC VISUALS
                            </h2>
                          </div>
                          <div className="w-full rounded-sm overflow-hidden border border-white/10 shadow-2xl bg-zinc-950/40">
                            <CustomVideoPlayer src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/dnf1.mp4" language={language} />
                          </div>
                          <div className="w-full rounded-sm overflow-hidden border border-white/10 shadow-2xl bg-zinc-950/40">
                            <CustomVideoPlayer src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/dnf2.mp4" language={language} />
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}

              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Internship Experience Detail Modal */}
      <AnimatePresence>
        {selectedExperienceIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-[#0A0A0A] overflow-y-auto"
          >
            {/* Header / Close button */}
            <div className="fixed top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0A0A0A] to-transparent z-[310] pointer-events-none flex justify-end items-start pt-6 pr-8 md:pr-16">
              <button 
                onClick={() => setSelectedExperienceIndex(null)}
                className="p-3 md:p-4 bg-white/10 hover:bg-white hover:text-black border border-white/20 backdrop-blur-md rounded-full text-white transition-colors pointer-events-auto shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="w-full max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 py-24">
              <motion.div 
                initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
              >
                <div className="mb-16">
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{PORTFOLIO_DETAILS[selectedExperienceIndex].title}</h2>
                  <p className="text-zinc-400 text-lg md:text-xl font-light">{PORTFOLIO_DETAILS[selectedExperienceIndex].subtitle}</p>
                </div>

                {/* Render Personal Intro Details (Index 0) */}
                {selectedExperienceIndex === 0 && (
                  <div className="flex flex-col gap-12">
                    {/* Paragraphs */}
                    {PORTFOLIO_DETAILS[0].paragraphs && PORTFOLIO_DETAILS[0].paragraphs.length > 0 && (
                      <div className="flex flex-col gap-6 text-zinc-300 text-lg md:text-xl font-light leading-relaxed">
                        {(language === 'zh' ? PORTFOLIO_DETAILS[0].paragraphs : PORTFOLIO_DETAILS[0].enParagraphs)?.map((p, i) => (
                          <p key={i}>{p}</p>
                        ))}
                      </div>
                    )}

                    {/* Stats */}
                    {PORTFOLIO_DETAILS[0].stats && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8 border-y border-white/10 my-8">
                        {PORTFOLIO_DETAILS[0].stats.map((stat, i) => (
                          <div key={i} className="flex flex-col gap-2">
                            <span className="text-zinc-500 text-sm tracking-widest uppercase">{language === 'zh' ? stat.label : stat.enLabel}</span>
                            <span className="text-white text-xl font-medium">{language === 'zh' ? stat.value : stat.enValue}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Achievements Gallery (Moved Above Awards/Projects) */}
                    {PORTFOLIO_DETAILS[0].achievements && (
                      <div className="mb-12">
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-white" />
                          {language === 'zh' ? PORTFOLIO_DETAILS[0].achievementsTitle : PORTFOLIO_DETAILS[0].achievementsEnTitle}
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                          {PORTFOLIO_DETAILS[0].achievements.map((img, i) => (
                            <div key={i} className="aspect-square bg-zinc-900 rounded-sm overflow-hidden cursor-pointer group" onClick={() => setLightboxState({images: PORTFOLIO_DETAILS[0].achievements!, index: i})}>
                              <img alt="Portfolio Work" loading="lazy" decoding="async" src={img} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                            </div>
                          ))}
                        </div>
                        {PORTFOLIO_DETAILS[0].achievementsRow2 && (
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-4">
                            {PORTFOLIO_DETAILS[0].achievementsRow2.map((img, i) => (
                              <div key={i} className="aspect-square bg-zinc-900 rounded-sm overflow-hidden cursor-pointer group" onClick={() => setLightboxState({images: PORTFOLIO_DETAILS[0].achievementsRow2!, index: i})}>
                                <img alt="Portfolio Work" loading="lazy" decoding="async" src={img} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                              </div>
                            ))}
                          </div>
                        )}
                        {PORTFOLIO_DETAILS[0].largeAchievementImage && (
                          <div className="w-full rounded-sm overflow-hidden cursor-pointer group" onClick={() => setLightboxState({images: [PORTFOLIO_DETAILS[0].largeAchievementImage!], index: 0})}>
                             <img alt="Portfolio Work" loading="lazy" decoding="async" src={PORTFOLIO_DETAILS[0].largeAchievementImage} className="w-full h-auto opacity-80 group-hover:opacity-100 transition-all duration-700" />
                          </div>
                        )}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      {/* Awards */}
                      {PORTFOLIO_DETAILS[0].awards && (
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-white" />
                            {language === 'zh' ? PORTFOLIO_DETAILS[0].section1Title : PORTFOLIO_DETAILS[0].section1EnTitle}
                          </h3>
                          <ul className="flex flex-col gap-4">
                            {(language === 'zh' ? PORTFOLIO_DETAILS[0].awards : PORTFOLIO_DETAILS[0].enAwards)?.map((award, i) => (
                              <li key={i} className="text-zinc-400 text-sm md:text-base flex items-start gap-3">
                                <span className="text-zinc-600 mt-1">/</span> {award}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Projects */}
                      {PORTFOLIO_DETAILS[0].projects && (
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-white" />
                            {language === 'zh' ? PORTFOLIO_DETAILS[0].section2Title : PORTFOLIO_DETAILS[0].section2EnTitle}
                          </h3>
                          <ul className="flex flex-col gap-4">
                            {(language === 'zh' ? PORTFOLIO_DETAILS[0].projects : PORTFOLIO_DETAILS[0].enProjects)?.map((proj, i) => (
                              <li key={i} className="text-zinc-400 text-sm md:text-base flex items-start gap-3">
                                <span className="text-zinc-600 mt-1">/</span> {proj}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* DNF Videos at the very bottom */}
                      {selectedProject.id === "comm-2" && (
                        <div className="flex flex-col gap-6 w-full mt-12 mb-6">
                          <div className="flex items-center gap-2.5 border-b border-white/5 pb-2.5 mb-6">
                            <span className="w-2 h-2 rounded-full bg-sky-300 animate-pulse" />
                            <h2 className="text-sm md:text-base uppercase tracking-[0.2em] font-bold text-zinc-200">
                              动态视效展示 / DYNAMIC VISUALS
                            </h2>
                          </div>
                          <div className="w-full rounded-sm overflow-hidden border border-white/10 shadow-2xl bg-zinc-950/40">
                            <CustomVideoPlayer src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/dnf1.mp4" language={language} />
                          </div>
                          <div className="w-full rounded-sm overflow-hidden border border-white/10 shadow-2xl bg-zinc-950/40">
                            <CustomVideoPlayer src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/dnf2.mp4" language={language} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {/* Render the legacy detailed components */}
                <Suspense fallback={<div className="flex items-center justify-center p-12 text-zinc-500">Loading...</div>}>
{selectedExperienceIndex === 1 && (
                  <TikTokDetail language={language} t={t} setLightboxUrl={(url) => url ? setLightboxState({images: [url], index: 0}) : setLightboxState(null)} />
                )}
                {selectedExperienceIndex === 2 && (
                  <TikTokShopDetail language={language} t={t} setLightboxUrl={(url) => url ? setLightboxState({images: [url], index: 0}) : setLightboxState(null)} />
                )}
                {selectedExperienceIndex === 3 && (
                  <TencentIEGDetail language={language} t={t} setLightboxUrl={(url) => url ? setLightboxState({images: [url], index: 0}) : setLightboxState(null)} />
                )}
</Suspense>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox for both Modals */}
      <AnimatePresence>
        {lightboxState && (
          <Suspense fallback={null}><ZoomableLightbox
            url={lightboxState.images[lightboxState.index]}
            onClose={() => setLightboxState(null)}
            language={language}
            t={t}
            hasNext={lightboxState.index < lightboxState.images.length - 1}
            hasPrev={lightboxState.index > 0}
            onNext={() => setLightboxState({ ...lightboxState, index: lightboxState.index + 1 })}
            onPrev={() => setLightboxState({ ...lightboxState, index: lightboxState.index - 1 })}
          /></Suspense>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-16 text-center text-xs text-zinc-600 tracking-[0.2em] uppercase">
        © 2026 Bochen Dong / Barry. All rights reserved.
      </footer>
    </div>
  );
}
