/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  Compass,
  Briefcase,
  Film,
  Palette,
  Megaphone
} from 'lucide-react';
import { HlsPlayer } from './components/HlsPlayer';
import { ScrollRevealParagraph } from './components/ScrollRevealParagraph';
import { InfoModal } from './components/InfoModal';
import { TikTokShopDetail } from './components/TikTokShopDetail';
import { TencentIEGDetail } from './components/TencentIEGDetail';
import { ZoomableLightbox } from './components/ZoomableLightbox';
import { CustomVideoPlayer } from './components/CustomVideoPlayer';
import { LazyVideo } from './components/LazyVideo';

// Reusable fadeUp animation helper from user request
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, delay, ease: "easeOut" },
});

const PORTFOLIO_DETAILS = [
  {
    title: "董柏辰/Barry",
    enTitle: "Bochen Dong / Barry",
    subtitle: "新片场AI平台Shotlab签约创作人\n即梦/可灵/LibLib等AI平台扶持计划优质创作者",
    enSubtitle: "Contracted Creator of Xinpianchang AI Platform Shotlab\n& Featured Creator of Dreamina/Kling/LibLib",
    tagline: "新片场AI平台Shotlab签约创作人\n即梦/可灵/LibLib等AI平台扶持计划优质创作者",
    enTagline: "Contracted Creator of Xinpianchang AI Platform Shotlab\n& Featured Creator of Dreamina/Kling/LibLib",
    coverImage: "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623215213891.webp",
    innerBgImage: "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623220043652.webp",
    stats: [
      { label: "毕业时间", enLabel: "GRADUATION YEAR", value: "2027届毕业生", enValue: "Class of 2027" },
      { label: "荣誉获奖", enLabel: "AWARDS & HONORS", value: "一等研究生奖学金" },
      { label: "研究方向", enLabel: "RESEARCH DIRS", value: "视觉传达设计 & AIGC", enValue: "Visual Communication & AIGC" }
    ],
    paragraphs: [
      "山东工艺美术学院视觉传达设计本硕连读，为我积淀了深厚的学院派设计理论底蕴，并在多媒体与商业视觉艺术实践中打下了稳固根基。我坚信，在 AIGC 技术浪潮下，未来的美学探索将走向人机共协的新形态。",
      "在校期间，我系统掌握了品牌全案策划、商业视觉落地与市场需求洞察方法，作为全院 AIGC 创意工具与新媒体叙事课题组核心，深耕 AIGC 创意生成、商业插画与品牌视觉设计，同时拥有丰富的自媒体内容创作运营经验，在长期实践中练就了高标准的交付把控力。"
    ],
    enParagraphs: [
      "The visual communication design integrated program at Shandong University of Arts and Crafts built a solid academic foundation in design theory and rooted my skills deeply in multimedia and commercial visual art. I firmly believe that under the wave of AIGC technology, the future of aesthetics will move toward a new form of human-machine collaboration.",
      "During my school years, I systematically became proficient in branding strategies, commercial design execution, and market insights. Serving as a core leader of the generative technologies and media narrative research group, I focused heavily on AIGC content generation, commercial illustration, and brand visual design, with extensive experience in self-media creation and operations, building highly resilient control over design delivery."
    ],
    features: [
      { title: "一等学术荣誉与多项大奖", enTitle: "First-Class Academic Honors & Awards", desc: "在校内连续荣获优秀硕士研究生一等学业奖学金、校级优秀毕业生候选人等荣誉。多次受邀参加重要学术论坛，并在全国多项数字创意设计及新媒体大奖中斩获奖项。", enDesc: "Consistently awarded first-class graduate scholarships, nominee for outstanding graduate, and representative in national design summits." },
      { title: "新视窗综合渲染与大模型熟稔度", enTitle: "Comprehensive Renderings & Model Mastery", desc: "熟练精通 Cinema 4D、MD 精细模拟、After Effects 等流程，并成功打通了将 AIGC 静态高保真海报无缝导入三维空间粒子渲染的跨界流程。", enDesc: "Proficient in Cinema 4D, Marvelous Designer, and After Effects. Mastered importing high-fidelity diffusion concepts into particle visualization frameworks." },
      { title: "高执行力协作：i人中的e人", enTitle: "Highly Executional Collaboration", desc: "虽性格偏温顺细致，但在推动项目进展或团队协调时能瞬间展现高情商的沟通效能——极易相处，秒懂商业诉求，具备高度责任感及超强落地速度。", enDesc: "Gentle and meticulous in nature, with strong emotional intelligence in business negotiation and collaborative taskforces." }
    ],
    works: [
      "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=600"
    ],
    section1Title: "获奖经历：",
    section1EnTitle: "Awards & Experience: ",
    awards: [
      "第13届未来设计师·全国高校数字艺术设计大赛(NCDA)国赛总决赛一等奖（AIGC赛道）",
      "第13届未来设计师·全国高校数字艺术设计大赛(NCDA)国赛总决赛三等奖（插画赛道）",
      "即梦AI放映厅「阿那亚海浪电影周」入选",
      "2025首届硅谷AI电影节北京赛区入围",
      "2025古剑山·大学生AI影像创作大赛",
      "2023CGDA平面设计学院奖入围",
      "2022国际大学生手绘艺术与设计大赛银奖"
    ],
    enAwards: [
      "13th Future Designer • National College Digital Art Design Competition (NCDA) National Finals - First Prize (AIGC Track)",
      "13th Future Designer • National College Digital Art Design Competition (NCDA) National Finals - Third Prize (Illustration Track)",
      "Selected for Dreamina AI Screening • Aranya Wave Film Week",
      "Shortlisted for 2025 Silicon Valley AI Film Festival (Beijing Division)",
      "2025 Gujianshan • College Student AI-Video Creation Competition",
      "Shortlisted for 2023 CGDA Graphic Design Academy Award",
      "Silver Award in 2022 International College Student Hand-painted Art & Design Competition"
    ],
    section2Title: "项目经历：",
    section2EnTitle: "Project Experience: ",
    projects: [
      "2026 上海虹桥·阿里中心 OSC源创会 特邀分享嘉宾",
      "制作并运营TikTok US美区电商视频账号并达到单月10k+的GMV产出",
      "以独立自媒体创作者身份与“小红书”的“红薯游戏制片厂”合作创作王者荣耀AIGC春节短片并入选精选视频",
      "与“Seko”和“MVLAND”AI创作平台合作进行短片创作推广共创",
      "参与2025腾讯IEG国内发行线“地下城与勇士\"的一些视觉项目产出",
      "参与青浦酒店(TSINGPU)济南五峰山全业态设计提案"
    ],
    enProjects: [
      "Invited Guest Speaker at 2026 OSC Fair (Shanghai Hongqiao • Alibaba Center)",
      "Produced and operated TikTok US e-commerce video account, reaching $10k+ monthly GMV output.",
      "Collaborated with Xiaohongshu 'Redshu Game Studio' as an independent creator to produce King of Glory AIGC Spring Festival videos, selected as Featured.",
      "Collaborated with 'Seko' and 'MVLAND' AI video platforms for promotional video co-creation.",
      "Participated in visual deliverables on the 'Dungeon & Fighter' project for Tencent IEG Domestic Publishing (2025).",
      "Participated in the full-format design proposal for Tsingpu Hotel (Jinan Wufeng Mountain)."
    ],
    achievementsTitle: "成果展示：",
    achievementsEnTitle: "Achievements Showcase: ",
    achievements: [
      "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623001532892.webp",
      "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623001545562.webp",
      "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623001629051.webp",
      "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623001654388.webp",
      "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623001754015.webp",
      "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623002317904.webp"
    ],
    achievementsRow2: [
      "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623001817374.webp",
      "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623001921888.webp",
      "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623001938273.webp",
      "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623001958265.webp",
      "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623002011724.webp"
    ],
    largeAchievementImage: "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260626222446052.webp"
  },
  {
    title: "字节跳动·抖音TikTok Shop",
    enTitle: "ByteDance • Douyin TikTok Shop",
    subtitle: "TikTok Shop AIGC内容运营与设计",
    enSubtitle: "TikTok Shop AIGC Content Operations & Design",
    tagline: "深度参与国际电商 AIGC 自运营内容生态建设，全周期驱动双账号矩阵产能增长",
    enTagline: "Deeply involved in cross-border E-commerce self-developed AIGC systems, driving matrix volumetric growth",
    coverImage: "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623215238563.webp",
    innerBgImage: "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623201318986.webp",
    stats: [
      { label: "爆款点赞", enLabel: "VIRAL LIKES", value: "10,000+" },
      { label: "先锋履历", enLabel: "BETA STATUS", value: "即梦/可灵内测创作者" },
      { label: "内容探索", enLabel: "STYLE FOCUS", value: "国潮/几何超现实" }
    ],
    paragraphs: [
      "在新一轮生成式人工智能浪潮席卷内容生态时，我作为独立创作者率先全面接入各大顶尖 AI 视频及生图大模型。用极富视觉张力、镜头美学与超前叙事的 AIGC 创意短片，在主流社交平台收获了极大的多向关注与赞许。",
      "通过定位东方神话重构、超现实流体装置等垂直细分之一，自主运营和撰写分镜，多条原创内容多次破圈，累计积累了上万次点赞投硬币收录。目前已打通了一条高敏捷性、极高美学产出的 AIGC 视频创作与商业落地渠道。"
    ],
    enParagraphs: [
      "As an independent AI creator, I am at the forefront of the generative revolution, mastering top-tier image and video diffusion models to create visually striking, emotionally loaded, and highly narrative films.",
      "Focusing on neo-Chinese myths and surreal fluid simulations, I direct and script original videos that have garnered tens of thousands of likes and saves. This established a fast-turnaround, high-aesthetic model for commercial video generation."
    ],
    features: [
      { 
        title: "顶级 AIGC 模型核心内测官", 
        enTitle: "Top-Tier Model Beta Tester", 
        desc: "作为字节跳动即梦与快手可灵 AI 先锋共创计划成员，参与产品功能内测反馈，能第一时间利用新升级节点的算力大片形成传播先发优势。", 
        enDesc: "As a member of ByteDance Dreamina & Kuaishou KLING AI development groups, feeding early feedback and utilizing model upgrades for instant viral reach." 
      },
      { 
        title: "网感主导极速内容运营", 
        enTitle: "Fast-Paced Content Operation", 
        desc: "对网络前沿潮流与视觉审美趋势有着天然的警觉性，懂得通过宏大叙事、声波卡点及光影设计捕捉核心情绪流，提高受众留存率。", 
        enDesc: "Highly alert to internet visuals and aesthetic shifts, capturing core emotions via deep optics to boost viewer retention." 
      },
      { 
        title: "品牌跨界 AIGC 案例共创", 
        enTitle: "Commercial Cross-Over Collaborations", 
        desc: "为多家新锐国潮汉服、国风配饰及潮流消费电子大厂提供高精度的 AIGC 视听概念视频与静态宣发绘卷，极大节约了客户前中期制片周期成本。", 
        enDesc: "Providing premium AIGC promo reels and visuals for modern Hanfu brands, luxury accessories, and consumer tech, cutting production cycles by up to 40%." 
      }
    ],
    works: [
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600"
    ]
  },
  {
    title: "腾讯·IEG国内发行线",
    enTitle: "Tencent • IEG Domestic Publishing",
    subtitle: "视觉设计与AIGC探索",
    enSubtitle: "Visual Design & AIGC Exploration",
    tagline: "深度参与两大核心版本品牌视觉体系搭建，以 AIGC 技术探索游戏美术全链路提效",
    enTagline: "Deeply involved in building brand visual systems, exploring full-cycle AIGC workflows to accelerate game art",
    coverImage: "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623215308377.webp",
    innerBgImage: "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623211627790.webp",
    stats: [
      { label: "实习期间", enLabel: "INTERN PERIOD", value: "2024.03 - 2024.09" },
      { label: "主导板块", enLabel: "CORE DOMAIN", value: "AI 视觉设计" },
      { label: "核心算法", enLabel: "MAIN STACK", value: "Stable Diffusion / Midjourney" }
    ],
    paragraphs: [
      "作为腾讯 IEG 国内发行线视觉设计实习生，我深度参与《地下城与勇士：起源》两大核心版本的品牌视觉体系搭建，同时支撑 QQ 炫舞、员工大会等多项目设计需求。",
      "在此期间，我不断优化 AIGC 的生图和创意分镜插画设计工作流，用顶尖的 AI 工具赋能商业视觉体系搭建。我积极协助打通超级创意视听管线，推动海量自适应素材的高质量、高一致度输出，并在品牌宣传册 and 社交平台预热中实现高达 40% 的执行时长提效。"
    ],
    enParagraphs: [
      "As a Visual Design Intern at Tencent IEG, I deeply engaged in scaffolding two core seasonal packages for Dungeon & Fighter (DNF) Mobile while supporting cross-IP projects.",
      "During this internship, I optimized stable AIGC and prompt generation workstreams to empower commercial projects with robust visuals. I helped establish standard visual asset templates, ensuring design alignment across high-throughput social/advertising deliverables, lowering processing periods."
    ],
    features: [
      { 
        title: "跨品类与版本视觉方案共创", 
        enTitle: "Cross-IP Visual Scaffolding", 
        desc: "完整主导及配合多套 DNF 春节/安徒恩特色等运营版本 KV 延展与创意排版，并产出高质量 AI 集卡周边图形物料。", 
        enDesc: "Spearheaded adaptational layouts on seasonal high-impact DNF events, delivering robust, cohesive graphic sets across diverse assets." 
      },
      { 
        title: "中式美感与 AIGC 精准控制", 
        enTitle: "Empowering Neo-Chinese Style", 
        desc: "运用多重控制节点精控中式山水与角色，形成多套兼备传统神采与先锋质感的大气宣传海报规范底图。", 
        enDesc: "Used advanced semantic layouts to pair delicate, ink-wash aesthetics with rugged modern styling for massive layout consistency." 
      },
      { 
        title: "高情商与高效率的企业沉淀", 
        enTitle: "Agility in Corporate Ecosystems", 
        desc: "在腾讯 IEG 大型工业创意链条中，积极发挥协调沟通优势，秒懂产品经理 and 研运总监的核心痛点并极速闭环产出。", 
        enDesc: "Excelled in fast-cycle commercial pipelines, maintaining open feedback channels to deliver polished vectors under strict timelines." 
      }
    ],
    works: [
      "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260607215915444.jpg",
      "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260607215949168.png",
      "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260607220023114.png"
    ]
  }
];

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  coverImage: string;
  tags: string[];
  tools: string[];
  year: string;
  client?: string;
  role?: string;
  description: string;
  story: string[];
  gallery: string[];
  videoUrl?: string;
}

export interface CatalogCategory {
  id: string;
  index: string;
  name: string;
  englishName: string;
  desc: string;
  enDesc: string;
  projects: ProjectItem[];
}

export const CATALOG_PORTFOLIO_DATA: CatalogCategory[] = [
  {
    id: "video",
    index: "01",
    name: "视频短片作品",
    englishName: "CREATIVE VIDEOS",
    desc: "运用前沿AI工具与模型制作的高质量视频、创意短片，注重叙事与镜头设计，搭建标准化数字资产与工作流。",
    enDesc: "High-quality videos & creative shorts crafted with cutting-edge AI, focusing on narrative, camera work, and standard digital asset pipelines.",
    projects: [
      {
        id: "vid-1",
        title: "《The Last》",
        subtitle: "赛博朋克AIGC动画短片",
        coverImage: "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623002718644.webp",
        tags: ["独立制片", "AIGC流体", "声画联觉"],
        tools: ["Runway Gen-3", "可灵 AI", "Suno", "Premiere"],
        year: "2025",
        client: "个人探索系列",
        role: "独立编导 / 全管线制片人",
        description: "“死亡不是我们的终点，遗忘才是”",
        story: [
          "霓虹流彩的赛博街巷里，一对恋人从温柔日常并肩走向末世烽烟。当机甲压境、城市崩塌，他们以血肉换机械义体，用牺牲守住彼此，让爱在钢铁废墟里成为永不熄灭的火种。",
          "本片模型选用 Seedance 2.0、Midjourney 与 Nano Banana Pro等，以赛博朋克为底色铺陈爱与牺牲的内核。从牵手漫步的安宁岁月中到末日绝境的双向奔赴，二人以自身为代价完成蜕变，在崩坏的世界里共赴一场以爱为名的坚守。"
        ],
        gallery: [
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623002835096.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623002909540.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623002923337.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623002936574.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623002947032.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003000623.webp"
        ],
        videoUrl: "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/one.mp4"
      },
      {
        id: "vid-2",
        title: "《致命节奏》",
        subtitle: "AIMV合作曲先导片 & MVLAND平台",
        coverImage: "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003438855.webp",
        tags: ["先锋影像", "抽象情绪", "动力学粒子"],
        tools: ["Houdini", "After Effects", "Midjourney"],
        year: "2024",
        client: "学术新媒体展演",
        role: "动画艺术创意编排",
        description: "“在迷人的节奏中沦陷吧！”",
        story: [
          "从晨起安睡的松弛状态睁眼觉醒，女主利落整装奔赴战斗之约，在充满张力的对决中尽显飒爽本色，以极具感染力的状态释放独树一帜的个人魅力。",
          "本片为与 MVLAND 平台合作打造的推广向 AIMV 短片，选用 Seedance 2.0、Kling 与 NanoBanana Pro 模型制作，以鲜明的美式动漫画风搭配炫彩故障视效，镜头节奏贴合音乐叙事，完成从日常松弛到战场热血的氛围跃迁，视觉记忆点突出。"
        ],
        gallery: [],
        videoUrl: "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/two.mp4"
      },
      {
        id: "vid-3",
        title: "《明天的前夜》",
        subtitle: "AIGC未来叙事短片",
        coverImage: "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003834136.webp",
        tags: ["科幻叙事", "情感共振", "末日美学"],
        tools: ["Midjourney", "Runway Gen-3", "Premiere"],
        year: "2025",
        client: "独立短片计划",
        role: "导演 / 视觉概念 / 剪辑",
        description: "“你会温和的走入那一夜吗?\"",
        story: [
          "“你会温和的走入那一夜吗?\"",
          "冷调压抑的房间中，女孩的平静被录音机传来的诡异声响击碎。她循声踏入幽暗无尽的长廊，一件件残破旧物接连浮现，录音里双胞胎的情感纠葛之下，暗涌着一场关于自我分裂与拉扯的精神迷局，长廊尽头的门后，藏着自我认同的终极真相。",
          "本片为个人独立全流程创作的AI动画短片，以黑塞的文字开启叙事，通过镜面构图、极速倒放蒙太奇等视听手法营造压抑诡谲的超现实质感。影片选用Seedance 2.0、Kling与 NanoBanana Pro 模型制作，借悬疑化的影像叙事，深入探讨自我认同的深层精神内核。"
        ],
        gallery: [
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003924128.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003934322.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003945977.webp"
        ],
        videoUrl: "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/three.mp4"
      },
      {
        id: "vid-4",
        title: "《CyberpunkGO》",
        subtitle: "AIGC未来都市概念片",
        coverImage: "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623004019826.webp",
        tags: ["赛博朋克", "夜景霓虹", "故障美学"],
        tools: ["Midjourney", "Runway Gen-3", "After Effects"],
        year: "2025",
        client: "个人创意实验",
        role: "导演 / 视觉设计 / 剪辑",
        description: "“嘿，你会想念夜之城吗？”",
        story: [
          "雨幕裹着霓虹漫过整座钢铁丛林，从高空俯瞰下去，摩天楼的灯海在水汽里沉浮，在楼宇夹缝与架空廊道间穿梭俯冲，在这机械与人性撕扯的霓虹都市里，守着夜之城最后一点摇摇欲坠的底线。",
          "短片选用 Seedance 2.0、Midjourney 与 NanoBanana Pro 模型制作，以浓烈的色彩笔触渲染追缉行动的紧张氛围，通过独处沉思与街巷穿行的画面切换，刻画出赛博世界里猎手的生存状态与使命。"
        ],
        gallery: [],
        videoUrl: "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/four%EF%BC%881%EF%BC%89.mp4"
      },
      {
        id: "vid-5",
        title: "《重返地球：42号远航队》",
        subtitle: "AIGC散文影像集",
        coverImage: "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623004140742.webp",
        tags: ["太空探索", "硬核科幻", "电影级CG"],
        tools: ["Midjourney", "Runway Gen-3", "After Effects"],
        year: "2025",
        client: "独立科幻艺术影像计划",
        role: "导演 / 视觉概念 / 合成",
        description: "“原子不会湮灭，我们终将再次相遇”",
        story: [
          "《重返地球：42 号远航队》第一集以散文式叙事开启归乡序章。身披战甲的仿生人踏入被草木吞噬的旧日都市“上海”，在爬满藤蔓的残垣与中式飞檐间缓步穿行，捡拾人类文明遗落的记忆碎片，于荒芜静默里叩问文明存续的温柔答案。",
          "本片为全流程个人独立创作的 AI 影像作品，选用 Seedance 2.0、Kling、Midjourney 与 NanoBanana Pro 模型制作，以沉郁细腻的东方废土质感铺陈画面，用极简克制的叙事节奏，承载对文明与情感的深层探讨。"
        ],
        gallery: [],
        videoUrl: "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/five%EF%BC%881%EF%BC%89.mp4"
      },
      {
        id: "vid-6",
        title: "《信》",
        subtitle: "AIGC中式动画短片",
        coverImage: "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623004412687.webp",
        tags: ["情感叙事", "超现实意象", "胶片美学"],
        tools: ["Midjourney", "Runway Gen-3", "Premiere"],
        year: "2025",
        client: "个人艺术创作 / 独立短片计划",
        role: "导演 / 视觉概念 / 剪辑",
        description: "“一纸愿，见风雪，却也暖尽人间”",
        story: [
          "风雪交加的寒夜村落，村民将写满新年祝福与朴素期盼的祈愿信交予神秘送信人。怀揣着孩童顺遂成长、家人平安康健的心愿，他顶风冒雪踏上艰险路途，终将信件送达高塔；当塔中暖光次第亮起，风雪与黑暗被悄然驱散，为整片土地降下希望与暖意。",
          "本片基于 ComfyUI 搭建全流程工作流创作，以冷冽沉郁的画面基调铺陈寒冬氛围感，借灯火微光与苍茫夜色的视觉反差，勾勒出关于信念与传递的东方诗意叙事，让平凡的人间祈愿拥有治愈人心的温度。"
        ],
        gallery: [
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623004624136.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623004609678.webp"
        ],
        videoUrl: "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/six.mp4"
      },
      {
        id: "vid-7",
        title: "《灵狐夜游》",
        subtitle: "AIGC东方奇幻叙事短片",
        coverImage: "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623005318193.webp",
        tags: ["国风奇幻", "夜景渲染", "光影粒子"],
        tools: ["Midjourney", "Runway Gen-3", "After Effects"],
        year: "2025",
        client: "独立艺术短片项目",
        role: "导演 / 视觉概念 / 合成",
        description: "“人心虔诚神灵现，口口相传存正念”",
        story: [
          "年末祭祀的烟火散尽，西桥村的石雕黑狐于深夜化灵而出，踏雾穿行灵境险境。为护佑善良人家的患病孩童，它历尽艰险求取狐神庇佑，终换得孩童病愈安康，这段奇遇也化作村中代代相传的向善传说。",
          "本片为个人独立全流程创作的 AI 动画短片，以中国传统绘画美学为创作基底，配音与歌曲改编均借助 AI 工具完成，背景音乐出处标注于片末。作品借灵狐夜游的意象寄寓东方哲思，传递心诚念正、行善福至的处世之道，以现代科技重焕传统民俗与东方美学的生命力。"
        ],
        gallery: [
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623005430012.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623005446033.webp"
        ],
        videoUrl: "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/seven.mp4"
      },
      {
        id: "vid-8",
        title: "《赤壁·新年篇》",
        subtitle: "王者荣耀AIGC新春短片 & 红薯游戏制片厂",
        coverImage: "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623005548580.webp",
        tags: ["史诗国风", "历史重构", "战争美学"],
        tools: ["Midjourney", "Runway Gen-3", "After Effects"],
        year: "2026",
        client: "新年国风艺术展映",
        role: "导演 / 视觉概念 / 合成",
        description: "“江东的风裹着烽烟，却也吹向团圆”",
        story: [
          "赤壁大战一触即发，孙权因战前局势深陷焦灼难安。孙策与孙尚香奔赴前线相伴左右，家人的暖意驱散了军营紧绷的氛围，更牵动全军将士共赴新春之约。江东长风裹挟着烽烟火气，也将团圆与年味吹进了铁马冰河的深处。",
          "本片为与小红书「红薯游戏制片厂」合作打造的王者荣耀春节贺岁 AIGC 动画短片，以软萌 Q 版画风重塑三国经典角色，将家国豪情与新春暖意相融，在烽火叙事的底色里，铺陈出充满烟火温度的新年团圆内核。"
        ],
        gallery: [
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623005625667.webp"
        ],
        videoUrl: "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/eight.mp4"
      },
      {
        id: "vid-9",
        title: "《归雁·春》",
        subtitle: "AIGC新春贺岁短片 & Seko平台",
        coverImage: "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623005648666.webp",
        tags: ["东方意象", "国风美学", "诗意镜头"],
        tools: ["Midjourney", "Runway Gen-3", "Premiere"],
        year: "2025",
        client: "江南水乡数字艺术节",
        role: "导演 / 视觉概念 / 剪辑",
        description: "“雁携春来，正好赴一场新年之约”",
        story: [
          "归雁衔来新春暖意，张灯结彩的市井长街间舞龙翻腾、烟火升腾。阖家相伴漫步于热闹年俗市集，孩童提灯嬉闹，满是团圆温馨；白马踏光穿行于巷陌灯火，携祥瑞奔赴人间，为新岁送上岁岁安康的美好祈愿。",
          "本片为新年国风动画短片，以温润雅致的东方插画笔触铺陈年俗盛景，以浓醇正红底色晕染新春氛围，将归雁、舞龙、白马等传统祥瑞意象融入阖家团圆的叙事，尽显中式新年的温情底蕴与诗意浪漫。"
        ],
        gallery: [
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623005708947.webp"
        ],
        videoUrl: "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/nine.mp4"
      },




      {
        id: "vid-11",
        title: "《聊斋·罗刹梦回》",
        subtitle: "创作中...",
        coverImage: "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623005750487.webp",
        tags: ["先锋影像", "抽象情绪", "动力学粒子"],
        tools: ["Houdini", "After Effects", "Midjourney"],
        year: "2024",
        client: "学术新媒体展演",
        role: "动画艺术创意编排",
        description: "创作中...",
        story: [
          "敬请期待"
        ],
        gallery: [],
        videoUrl: "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/liaozhai%EF%BC%881%EF%BC%89.mp4"
      },
      {
        id: "vid-12",
        title: "《炁》",
        subtitle: "创作中...",
        coverImage: "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010000605.webp",
        tags: ["先锋影像", "抽象情绪", "动力学粒子"],
        tools: ["Houdini", "After Effects", "Midjourney"],
        year: "2024",
        client: "学术新媒体展演",
        role: "动画艺术创意编排",
        description: "创作中...",
        story: [
          "敬请期待"
        ],
        gallery: [],
        videoUrl: "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/wuxia%EF%BC%881%EF%BC%89.mp4"
      },
      {
        id: "vid-13",
        title: "《三国一梦》",
        subtitle: "创作中...",
        coverImage: "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010210369.webp",
        tags: ["先锋影像", "抽象情绪", "动力学粒子"],
        tools: ["Houdini", "After Effects", "Midjourney"],
        year: "2024",
        client: "学术新媒体展演",
        role: "动画艺术创意编排",
        description: "创作中...",
        story: [
          "敬请期待"
        ],
        gallery: [],
        videoUrl: "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/sanguo%EF%BC%881%EF%BC%89.mp4"
      }
    ]
  },
  {
    id: "illustration",
    index: "02",
    name: "视觉插画作品",
    englishName: "VISUAL ILLUSTRATIONS",
    desc: "AIGC融合手绘，探索艺术灵感与概念表达的多风格插画设计、视觉艺术探索和数字艺术创作。",
    enDesc: "AIGC meets hand-drawn sketching to explore artistic inspiration & concept expression across multi-style digital art & illustration.",
    projects: [
      {
        id: "comm-3",
        title: "《五音傩神》：铜仁傩戏文化节主题视觉作品",
        subtitle: "基于即梦三维重组算法的硬核国风机甲大片",
        coverImage: "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010433256.webp",
        tags: ["潮玩跨界", "未来机械", "非遗重塑"],
        tools: ["即梦 AI", "C4D", "Photoshop"],
        year: "2024",
        client: "即梦 AI 创意工坊",
        role: "数字艺术家",
        description: "“五音共振·傩韵新声”",
        story: [
          "本次铜仁傩戏文化艺术节以「五音傩神」全套主题视觉设计为核心，五位拟人化傩神形象次第登场，揭开扎根民间、流传千载的傩文化秘事，为观者打造沉浸式祈福祷告的完整视听体验。",
          "设计体系深度融合唢呐、长笛、古筝、铜锣、大鼓五大传统乐器、经典傩戏面具图腾，锚定五音五行传统哲学内核，以现代化国风插画设计语言重构非遗形象，在保留传统祭祀仪式感的同时活化千年傩戏非遗，尽显音律相生、五行共振的东方民俗独特魅力。",
          "夜幕幻境之中五音傩神齐聚亮相，娓娓诉说古老傩戏动人的民间传说，邀观众共赴祈福祈祥的视听盛会。作品将五样传统民乐、傩戏面具图腾与五行音律哲学相融，依托全新创意视觉设计创新表达，让沉淀千年的傩戏非遗焕发新生，完整展现传统祭祀文化独有的震撼感染力。"
        ],
        gallery: [
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010501730.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010520107.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010537197.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010552993.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010608924.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010623861.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010636520.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010649901.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010705815.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010715083.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010726862.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010742554.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010758782.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010811301.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010821407.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010834738.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010848717.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010901342.webp"
        ]
      },
      {
        id: "comm-4",
        title: "《云祈六星》：南斗神仙文化主题插画视觉",
        subtitle: "线上艺术主题展演主KV及全案动态预热视觉",
        coverImage: "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010922651.webp",
        tags: ["全案宣发", "流体招贴", "中式几何"],
        tools: ["Stable Diffusion", "可灵 AI", "Illustrator"],
        year: "2025",
        client: "小红书社区部",
        role: "联合视觉主创",
        description: "“六星齐聚，戏说南斗；星行有道，凡心可通。”",
        story: [
          "《云祈六星》取材中国神话南斗六星君，以现代插画技法重构传统国风视觉。六位星君依托执掌寿元、福禄、命数等不同职能量身塑造，搭配专属视觉符号；缭绕云气勾连仙境凡尘，柔和庄重的色调烘托神圣祥瑞之感，传递出古人祈福纳祥、期许顺遂的美好愿景。",
          "作品以南斗六星君为创作原型，将传统神话底蕴与现代插画表现手法相融，塑造出典雅又充满神秘感的视觉气质。设计紧扣六位星君分管寿命、福禄、命途的神职职能，以多元视觉符号细化人物人设；流云环绕的画面意象打通仙境与人间，配色温润肃穆，既凸显神明的威仪祥瑞，也生动诠释了传统文化里祈愿安康、盼守福运的精神内核。"
        ],
        gallery: [
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623011012066.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623011028442.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623011043402.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623011059710.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623011112439.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623011126802.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623011140163.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623011154508.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623011207327.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623011220854.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623011231156.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623011243240.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623011254200.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623011306460.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623011319442.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623011332536.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623011344842.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623011358993.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623011412173.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623011424306.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623011438213.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623011451363.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623011504211.webp"
        ]
      },
      {
        id: "comm-1",
        title: "《地下城与勇士：起源》马年春节主题视觉",
        subtitle: "千万级流量新媒体平台的 AIGC 视觉体系升级与资产设计",
        coverImage: "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623011625825.webp",
        tags: ["先锋视听", "AIGC 视觉", "数字资产"],
        tools: ["Stable Diffusion", "Midjourney", "Photoshop"],
        year: "2024",
        client: "LibTV 先锋媒体",
        role: "核心AIGC视觉设计师",
        description: "“唐纹承岁，侠启新春”",
        story: [
          "本项目为《地下城与勇士・起源》马年春节全套视觉设计，本人独立负责整套纹样体系与素材图库搭建。设计溯源唐代马衔杯银壶、宝相花、忍冬纹等经典传统纹样，紧扣丙午马年新春主题，融合灯笼、牡丹等吉祥民俗元素，依托AIGC 辅助设计迭代，再经精细手绘定稿。",
          "整套视觉完整落地主 KV、游戏弹窗、拍脸 UI、线下游园会场布置、实体周边礼盒多场景应用，将盛唐国风美学与游戏二次元画风相融，落地西安大唐芙蓉园线下实景活动，实现传统纹样数字化转译、线上线下视觉体系统一，让国风古韵赋能游戏新春运营活动。"
        ],
        gallery: [
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623011642952.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623011656127.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623011708732.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623011722133.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623011733357.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623011744567.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623011803663.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623011823491.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623011814723.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623011834154.webp"
        ]
      },
      {
        id: "comm-2",
        title: "《地下城与勇士：起源》安徒恩主题视觉",
        subtitle: "汉服美学与几何超现实流体时装画卷",
        coverImage: "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623011912121.webp",
        tags: ["品牌策划", "国风美学", "三维空间"],
        tools: ["即梦 AI", "可灵 AI", "C4D"],
        year: "2025",
        client: "筑梦东方服饰机构",
        role: "创意视觉主指导",
        description: "“集合！决战安图恩”",
        story: [
          "本项目为《地下城与勇士・起源》安徒恩团本版本全套视觉设计，本人负责项目素材图库搭建与全链路 AIGC 设计探索。作品锁定红黑工业末世风格，提取火山裂隙、故障 UI、力量肌理字体等核心视觉元素，依托 Midjourney 批量生成基础素材，再手绘统一质感、搭建标准化素材图库；同时借助 ComfyUI 搭建完整动态工作流，拆解动作分镜、特效流转逻辑，实现静态版式完整向动态短视频视觉落地。",
          "整套设计覆盖版本主 KV、角色分镜海报、团本场景界面等多类应用画面，以高张力暗黑硬核视觉，还原安徒恩 raid 热血攻坚的史诗对抗氛围，完整打通 AIGC 辅助静态设计、动态视效迭代的完整落地流程。"
        ],
        gallery: [
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623011927201.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623011940701.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623011956485.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623012009431.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623012029033.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623012041670.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623012052858.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623012104912.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623012120004.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623012130079.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623012140977.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623012153870.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623012206751.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623012216515.webp"
        ]
      },
      {
        id: "illus-1",
        title: "“开吃啦！野餐日”主题视觉插画作品",
        subtitle: "多色温高强反差大色块情感构成画集",
        coverImage: "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623012234708.webp",
        tags: ["概念绘卷", "扁平构成", "版式设计"],
        tools: ["Procreate", "Photoshop", "Illustrator"],
        year: "2023",
        client: "学院毕业概念季",
        role: "核心概念画师",
        description: "“开吃啦！野餐日”",
        story: [
          "该潮流插画作品采用复古橡胶软管卡通画风，将汉堡、薯条、芝士、饮品等经典快餐食材拟人化，塑造出个性鲜活的卡通角色，构建了郊外河畔热闹欢乐的野餐派对场景。整套设计包含主场景长插画、角色海报、贴纸素材，并且完整落地帆布包、拼图、台历、礼盒等多款实体衍生周边，把复古美式卡通趣味插画 and 文创产品结合，画风明快活泼、色彩鲜亮饱满，兼具潮流装饰性与实用落地价值。"
        ],
        gallery: [
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623012249939.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623012302494.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623012314994.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623012327175.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623012339202.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623012350611.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623012401116.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623012412257.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623012431107.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623012440482.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623012451656.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623012511481.webp"
        ]
      }
    ]
  },
  {
    id: "other",
    index: "03",
    name: "品牌运营作品",
    englishName: "BRAND & OPERATIONS",
    desc: "探索性创意产品实验，打造差异化品牌 IP创意设计与视觉识别体系，实现商业运营与持续价值增长。",
    enDesc: "Exploratory creative product experiments crafting unique brand IP & visual identities for business operations & sustainable growth.",
    projects: [
      {
        id: "oth-1",
        title: "AIGC卡通IP形象“究究”主题作品",
        subtitle: "极高质量微观金属、玻璃材质演替渲染",
        coverImage: "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623012602214.webp",
        tags: ["三维写实", "Octane 渲染", "重力模拟"],
        tools: ["Cinema 4D", "Octane Render", "RealFlow"],
        year: "2024",
        client: "先锋数字艺术巡展",
        role: "3D 写实建模渲染师",
        description: "山东工艺美术学院研究生学会AIGC卡通IP形象“究究”",
        story: [
          "本项目为山东工艺美术学院研究生学会 AIGC 卡通 IP 形象「究究」完整设计方案。IP 定位热爱艺术、善于观察采风的研究生学子形象，圆脸蛋 + 眼镜 + 贝雷帽塑造亲和软萌的 3D 卡通造型，规范专属橙黄视觉配色与标准四视图。围绕四季踏青、林间采风等场景延展系列插画，同步配套多套表情包、手机壁纸等衍生视觉物料，依托 AIGC 完成形象迭代与场景拓展。IP 贴合美院研究生群体人设，兼具辨识度、情感亲和力与完整落地应用性，可用于学会宣传、文创延展、线上传播等多场景使用。"
        ],
        gallery: [
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623012618637.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623012629055.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623012641761.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623012654321.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623012706355.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623012718058.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623012731079.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623012744277.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623012756278.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623012808186.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623012818261.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623012832344.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623012843422.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623012859626.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623012909740.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623012919487.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623012930401.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623012947419.webp"
        ]
      },
      {
        id: "oth-2",
        title: "AIGC“六一欢乐行”主题活动作品",
        subtitle: "脑电呼吸触控交互与宏观流体视觉演绎",
        coverImage: "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623013007022.webp",
        tags: ["新媒体交互", "粒子算法", "跨界实验"],
        tools: ["TouchDesigner", "Kinect", "Ableton Live"],
        year: "2025",
        client: "学院美术馆新媒体实验厅",
        role: "交互与视听总监",
        description: "“云端逐童趣，六一欢乐行”",
        story: [
          "本项目是「六一欢乐行」儿童节线上运营全套视觉设计，依托 MJ、SD、GPT4o 等 AIGC 工具，搭配盲盒 LoRA 模型完成 3D 黏土卡通风格主视觉创作。画面以云端飞机、旋转木马构建梦幻童话场景，同步规划糖果巡游、矿车竞速四大趣味活动板块。整套视觉完整落地活动主 KV、多版本分支海报、APP 开屏页、弹窗、信息流 Banner、H5 活动页面等全渠道运营物料，色彩梦幻柔和、童趣氛围感饱满，适配儿童节全平台线上宣传推广需求，完整实现 AIGC 辅助商业运营视觉从创意生成、迭代筛选到落地应用的全流程闭环。"
        ],
        gallery: [
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623013007022.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623013030326.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623013043292.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623013140776.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623013152572.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623013203732.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623013214300.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623013300353.webp"
        ]
      },
      {
        id: "brand-3",
        title: "“Meow Tomorrow”爱心猫舍品牌作品",
        subtitle: "青岛珍稀手艺贝雕与国风刺绣的现代化平面重组全案",
        coverImage: "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623013335975.webp",
        tags: ["非遗再造", "偏光仿真", "品牌全案"],
        tools: ["Stable Diffusion", "Photoshop", "Illustrator"],
        year: "2024",
        client: "非遗创新中心推广项目",
        role: "品牌创意主策划",
        description: "“守护流浪猫的明天”",
        story: [
          "本项目是「喵的明天（Meow Tomorrow）」流浪猫救助公益品牌全案 VI 与衍生品设计。项目先梳理流浪猫生存困境、救助资金缺口、人宠矛盾等真实痛点，以此为出发点搭建完整公益品牌体系。手绘猫咪小屋线条作为核心视觉符号，选用暖黄、浅蓝、柔粉柔和三色搭建规范色彩系统，完成品牌 LOGO、标准字体、吊牌、菜单、打包杯袋、围裙等全套视觉物料设计；同时延伸宠物洗护套装、牵引绳、便携外出包、食碗、猫粮包装等完整救助配套产品，兼顾救助站分阶段管理标识、公益周边落地应用，以年轻化温柔视觉降低大众抵触情绪，用商业化产品收益反哺流浪猫救助，实现公益品牌可持续运营。"
        ],
        gallery: [
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623013353792.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623013404756.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623013417653.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623013428313.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623013439247.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623013450847.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623013504107.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623013514388.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623013525945.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623013537626.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623013547490.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623013556784.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623013608118.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623013620583.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623013630575.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623013640878.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623013650209.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623013702509.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623013713343.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623013724982.webp"
        ]
      },
      {
        id: "brand-4",
        title: "“上海老城隍庙梨膏糖”品牌设计作品",
        subtitle: "潮流沙龙三维动态招贴、偏光字体与网页前端视觉",
        coverImage: "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623013753065.webp",
        tags: ["多语种排版", "真空玻璃动态", "线上快闪"],
        tools: ["Cinema 4D", "Photoshop", "TouchDesigner"],
        year: "2024",
        client: "MATELAB 先锋沙龙",
        role: "视觉与动效主指导",
        description: "“一城豫园古韵，一盒梨膏留香”",
        story: [
          "本项目为上海老字号老城隍庙梨膏糖礼盒包装升级设计，依托豫园古建筑风貌提取屋檐轮廓作为核心视觉符号，将庙宇门楼造型转化为可开合解构式盒型，开盒模拟推开庙门的仪式感。采用金、绿、红三色区分原味、薄荷、玫瑰三款口味，外盒辅以传统暗纹肌理，内袋沿用建筑线稿细节，兼顾独立分装便携实用性。设计立足非遗梨膏糖药食同源属性，融合老上海地域文化与现代国潮审美，完成老字号包装年轻化迭代，适配旅游伴手礼、日常送礼多场景，实现传统文化载体的全新视觉表达。"
        ],
        gallery: [
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623013753065.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623013813966.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623013825915.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623013837666.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623013850636.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623013901670.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623013912354.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623013924315.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623013937450.webp",
          "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623013953516.webp"
        ]
      }
    ]
  }
];

export default function App() {
  // Navigation Modal control
  const [modalType, setModalType] = useState<'how-it-works' | 'philosophy' | 'use-cases' | null>(null);
  const [modalTitle, setModalTitle] = useState('');
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');

  // Lightweight translation helper
  const t = (zh: any, en: any) => {
    return language === 'zh' ? zh : en;
  };
  
  // Track currently active card detail modal
  const [activeDetailIndex, setActiveDetailIndex] = useState<number | null>(null);
  
  // Lightbox picture expander state
  const [lightboxState, setLightboxState] = useState<{ images: string[], index: number } | null>(null);
  
  // Catalog active expanded category - clicked to toggle
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  // Catalog active hovered category for dynamic animation and premium highlight
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  // Detailed long-page selected project representation
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  
  // Interactive toast feedback for footer and custom action triggers
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Localized popups for header and footer copy operations
  const [headerCopyFeedback, setHeaderCopyFeedback] = useState<string | null>(null);
  const [footerCopyFeedback, setFooterCopyFeedback] = useState<string | null>(null);

  // Interactive state for the card stack/fan-out on About Me page
  const [isCardsHovered, setIsCardsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Interactive state for suggestions and messaging
  const [suggestionMessage, setSuggestionMessage] = useState("");

  // Background idle warm-up queue for project cover images
  useEffect(() => {
    const idleTimer = setTimeout(() => {
      import('./utils/optimizeCdn').then(({ warmUpImage, detectFastestCDN }) => {
        // Run latency detection to ensure useImageProxy & selectedMirror are fully aligned
        detectFastestCDN().then(() => {
          // Progressively warm up cover images block by block to not block the main thread
          CATALOG_PORTFOLIO_DATA.forEach((category, catIdx) => {
            category.projects.forEach((proj, projIdx) => {
              setTimeout(() => {
                if (proj.coverImage) {
                  warmUpImage(proj.coverImage);
                }
              }, (catIdx * 150) + (projIdx * 40));
            });
          });
        });
      });
    }, 1500);

    return () => clearTimeout(idleTimer);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', checkScroll);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', checkScroll);
    };
  }, []);

  const openModal = (type: 'how-it-works' | 'philosophy' | 'use-cases', title: string) => {
    setModalType(type);
    setModalTitle(title);
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const focusEmailInput = () => {
    const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
    if (emailInput) {
      emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        emailInput.focus();
      }, 600);
    }
  };

  const handleCopy = (text: string, label: string, location: 'header' | 'footer') => {
    const successMsg = t(`已复制${label}：${text}`, `Copied ${label}: ${text}`);
    const failMsg = t("复制失败，请手动复制", "Copy failed, please copy manually");

    navigator.clipboard.writeText(text).then(() => {
      if (location === 'header') {
        setHeaderCopyFeedback(successMsg);
        setTimeout(() => setHeaderCopyFeedback(null), 3000);
      } else {
        setFooterCopyFeedback(successMsg);
        setTimeout(() => setFooterCopyFeedback(null), 3000);
      }
    }).catch(() => {
      if (location === 'header') {
        setHeaderCopyFeedback(failMsg);
        setTimeout(() => setHeaderCopyFeedback(null), 3000);
      } else {
        setFooterCopyFeedback(failMsg);
        setTimeout(() => setFooterCopyFeedback(null), 3000);
      }
    });
  };

  const handleSendMessage = () => {
    if (!suggestionMessage.trim()) {
      triggerToast(t("请输入您的想法或建议后再发送哦！", "Please input your thoughts or suggestions before sending!"));
      return;
    }
    triggerToast(t("正在为您唤起电子邮箱，感谢您的宝贵想法！", "Opening mail client, thank you for your feedback!"));
    const mailtoUrl = `mailto:1073186932@qq.com?subject=${encodeURIComponent(t("来自作品集网站的想法反馈", "Feedback from Portfolio Site"))}&body=${encodeURIComponent(suggestionMessage)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="relative min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black overflow-hidden">
      
      {/* 1. NAVBAR SECTION */}
      <nav id="app-navbar" className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between pl-4 pr-4 md:pl-12 md:pr-12 py-5 bg-transparent backdrop-blur-none pointer-events-auto">
        {/* Left: Logo & Language Switcher */}
        <div className="flex items-center gap-3">
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            {/* Logo representation conforming to specifications */}
            <div className="relative w-7 h-7 rounded-full border-2 border-white/60 flex items-center justify-center transition-transform duration-500 group-hover:rotate-180">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white font-sans">
              BarryAI
            </span>
          </div>

          {/* Tiny Language Selector */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const nextLang = language === 'zh' ? 'en' : 'zh';
              setLanguage(nextLang);
              triggerToast(nextLang === 'zh' ? "已切换至中文界面" : "Switched to English interface");
            }}
            className="flex items-center gap-1.5 text-[9px] font-mono font-bold tracking-tight bg-white/[0.04] border border-white/10 hover:border-white/20 px-2 py-0.5 rounded-full hover:bg-white/[0.09] active:scale-95 transition-all duration-300 ml-1.5 cursor-pointer text-neutral-400 hover:text-white"
            title="Switch Language / 切换中英文"
          >
            <span className={language === 'zh' ? 'text-sky-300' : ''}>ZH</span>
            <span className="text-white/20 scale-75 select-none">|</span>
            <span className={language === 'en' ? 'text-sky-300' : ''}>EN</span>
          </button>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 items-center gap-5 text-[13.5px] font-medium tracking-[1.5px]">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-white/45 hover:text-white hover:scale-115 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            {t("我的首页", "Home")}
          </button>
          <span className="text-neutral-700 select-none">•</span>
          <button 
            onClick={() => document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-white/45 hover:text-white hover:scale-115 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            {t("个人介绍", "About")}
          </button>
          <span className="text-neutral-700 select-none">•</span>
          <button 
            onClick={() => document.getElementById('experience-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-white/45 hover:text-white hover:scale-115 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            {t("工作经历", "Experience")}
          </button>
          <span className="text-neutral-700 select-none">•</span>
          <button 
            onClick={() => document.getElementById('solution-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-white/45 hover:text-white hover:scale-115 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            {t("作品展示", "Portfolio")}
          </button>
          <span className="text-neutral-700 select-none">•</span>
          <button 
            onClick={() => document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-white/45 hover:text-white hover:scale-115 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            {t("页面结尾", "Footer")}
          </button>
        </div>

        {/* Right: Xiaohongshu Link */}
        <div className="flex items-center gap-3">
          <a 
            href="https://xhslink.com/m/yS43Y3wTzL" 
            target="_blank" 
            rel="noopener noreferrer"
            className="liquid-glass px-4.5 py-2 rounded-full text-xs font-medium tracking-wide text-neutral-300 hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span>{t("点击看看我的小红书", "Visit My Xiaohongshu")}</span>
          </a>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <header id="hero-section" className="relative w-full h-screen flex flex-col items-center justify-start overflow-hidden bg-black pt-16 pb-6">
        {/* Background MP4 loop - Offset using a matching negative top positioning to prevent empty space at the top while keeping it shifted downward */}
        <video 
          className="absolute -top-[10vh] md:-top-[14vh] left-0 w-full h-[110vh] md:h-[114vh] object-cover object-bottom translate-y-[10vh] md:translate-y-[14vh] opacity-100 z-0 pointer-events-none transform-gpu will-change-transform"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_120549_0cd82c36-56b3-4dd9-b190-069cfc3a623f.mp4"
          autoPlay 
          muted 
          loop 
          playsInline
          preload="auto"
        />

        {/* Very subtle vignette shade to keep top text clear without darkening the central main art */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-transparent z-0 pointer-events-none" />

        {/* Bottom vertical fade to pure black - made shorter to keep the bottom details fully visible */}
        <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-black to-transparent z-[1] pointer-events-none" />

        {/* Centered Main content container - utilizing flex-1 and justify-between with a top spacer to place the title block in the vertical center */}
        <div className="relative z-10 w-full max-w-5xl flex-1 px-6 md:px-8 text-center flex flex-col items-center justify-between pb-2">
          
          {/* Invisible spacer to push the Title block to the center of the viewport */}
          <div className="h-0 md:h-[5vh]" />

          {/* Centered Block: Badges & Heading */}
          <div className="flex flex-col items-center gap-4 pt-2">

            {/* Subscriber group visual - styled with liquid-glass matching the search input */}
            <motion.div 
              {...fadeUp(0.1)}
              className="liquid-glass rounded-full px-5 py-2 backdrop-blur-md select-none text-xs flex items-center gap-2.5 text-white font-sans tracking-wide"
            >
              <span className="font-medium text-white">{t("AIGC视听创作者", "AIGC Audiovisual Creator")}</span>
              <span className="text-white/30">|</span>
              <span className="font-normal text-white">{t("动画 视觉 内容创作", "Animation • Visual • Content")}</span>
            </motion.div>

            {/* Heading */}
            <motion.h1 
              {...fadeUp(0.2)}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif italic font-normal tracking-[-1.5px] text-white leading-snug sm:leading-[1.05]"
            >
              {language === 'zh' ? (
                <>柏辰的<span className="ml-2.5 sm:ml-5 mr-1">AI</span>小行星</>
              ) : (
                <>Barry's AI Asteroid</>
              )}
            </motion.h1>
          </div>

          {/* Bottom Block: Subtitle & Subscription */}
          <div className="w-full max-w-2xl flex flex-col items-center gap-5 pb-[10vh] md:pb-[18vh] z-10">
            {/* Styled Subtitle */}
            <motion.p 
              {...fadeUp(0.3)}
              className="text-base md:text-lg lg:text-xl text-[hsl(var(--hero-subtitle))] font-light leading-relaxed font-sans whitespace-pre-line"
            >
              {t(
                "欢迎来到我的创作小宇宙。\n我想用AI打造高品质的动画、创意视觉和新媒体故事体验。",
                "Welcome to my creative universe.\nI leverage AI to deliver high-quality animations, creative visuals, and new media storytelling."
              )}
            </motion.p>

            {/* "探索小行星" Explore Button instead of subscription */}
            <motion.div {...fadeUp(0.4)} className="flex flex-col items-center justify-center gap-3 w-full">
              <motion.button
                whileHover={{ scale: 1.03, translateY: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                onClick={() => document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="liquid-glass bg-white/[0.08] hover:bg-white/[0.15] px-8 py-3 rounded-full text-sm font-semibold text-white/90 hover:text-white transition-all duration-150 flex items-center justify-center cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.25)] border border-white/15 hover:border-white/25"
              >
                <span>{t("探索小行星", "Explore Asteroid")}</span>
              </motion.button>

              {/* Mobile-only WeChat ID and email, vertically stacked, smaller */}
              <div className="flex flex-col items-center gap-1.5 mt-2 md:hidden">
                <span 
                  className="text-[10px] text-white/50 font-sans tracking-wide cursor-pointer hover:text-white transition-colors flex items-center gap-1 group/mobile-hero-wechat"
                  onClick={() => handleCopy("Ddd032111", t("微信号", "WeChat ID"), 'header')}
                >
                  <span>{t("微信号：Ddd032111", "WeChat : Ddd032111")}</span>
                  <span className="text-[8px] text-sky-400 opacity-70 bg-white/5 px-1 py-0.5 rounded border border-white/5 select-none">{t("复制", "Copy")}</span>
                </span>
                <span 
                  className="text-[10px] text-white/50 font-sans tracking-wide cursor-pointer hover:text-white transition-colors flex items-center gap-1 group/mobile-hero-email"
                  onClick={() => handleCopy("1073186932@qq.com", t("邮箱", "Email"), 'header')}
                >
                  <span>{t("邮箱：1073186932@qq.com", "Email : 1073186932@qq.com")}</span>
                  <span className="text-[8px] text-sky-400 opacity-70 bg-white/5 px-1 py-0.5 rounded border border-white/5 select-none">{t("复制", "Copy")}</span>
                </span>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Static bottom-centered tagline for the hero page and contact info */}
        <motion.span 
          {...fadeUp(0.5)}
          className="hidden md:flex absolute bottom-6 left-12 z-20 text-[11px] text-white/45 font-sans tracking-wider cursor-pointer hover:text-white transition-colors items-center gap-1.5 group/header-item"
          onClick={() => handleCopy("Ddd032111", t("微信号", "WeChat ID"), 'header')}
          title={t("点击复制微信号", "Click to copy WeChat ID")}
        >
          <span>{t("微信号：Ddd032111", "WeChat ID: Ddd032111")}</span>
          <span className="opacity-0 group-hover/header-item:opacity-100 transition-opacity text-[9px] text-sky-455 bg-white/5 px-1 py-0.5 rounded border border-white/5 select-none">{t("点击复制", "Copy")}</span>
        </motion.span>

        <motion.div
          {...fadeUp(0.5)}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center justify-end"
        >
          <AnimatePresence>
            {headerCopyFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: -8, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="bg-zinc-900/95 border border-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-neutral-200 text-[11px] font-sans tracking-wide whitespace-nowrap mb-2 flex items-center gap-1.5"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{headerCopyFeedback}</span>
              </motion.div>
            )}
          </AnimatePresence>
          <span className="text-xs text-sky-300 font-sans tracking-[0.2em] font-medium select-none text-center whitespace-nowrap">
            {t("Vibe Coding 手搓个人作品网站", "Vibe Coding - Handcrafted Portfolio Website")}
          </span>
        </motion.div>

        <motion.span 
          {...fadeUp(0.5)}
          className="hidden md:flex absolute bottom-6 right-12 z-20 text-[11px] text-white/45 font-sans tracking-wider cursor-pointer hover:text-white transition-colors items-center gap-1.5 group/header-item"
          onClick={() => handleCopy("1073186932@qq.com", t("邮箱", "Email"), 'header')}
          title={t("点击复制邮箱", "Click to copy Email")}
        >
          <span>{t("邮箱：1073186932@qq.com", "Email: 1073186932@qq.com")}</span>
          <span className="opacity-0 group-hover/header-item:opacity-100 transition-opacity text-[9px] text-sky-455 bg-white/5 px-1 py-0.5 rounded border border-white/5 select-none">{t("点击复制", "Copy")}</span>
        </motion.span>
      </header>

      {/* 3. "SEARCH HAS CHANGED" SECTION */}
      <section id="search-section" className="relative w-full max-w-7xl mx-auto px-6 md:px-12 pt-28 md:pt-36 pb-6 md:pb-9 bg-black z-10 text-center">
        {/* Animated header layout */}
        <motion.div 
          {...fadeUp(0.1)}
          className="max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.2] sm:leading-[1.1] tracking-tight sm:tracking-[-2px] text-white">
            {t("关于我", "About Me")}
          </h2>
          
          <div className="text-neutral-300 text-base md:text-lg font-light max-w-5xl mx-auto mt-10 font-sans leading-relaxed flex flex-col gap-6 text-left md:text-justify">
            {t(
              <p className="tracking-wide">
                我是<strong className="text-sky-400 font-medium font-sans">董柏辰</strong>，2002年出生于兰州市，在<strong className="text-sky-400 font-medium font-sans">山东工艺美术学院</strong>进行本硕连读，<strong className="text-sky-450 font-medium font-sans">艺术设计（视觉传达设计）</strong>专业。在校期间，获得过<strong className="text-sky-400 font-medium font-sans">一等硕士研究生学业奖学金</strong>荣誉及各种专业奖项，性格温和，善于团队协作，具备高度的责任心与执行能力，i人中的e人，懂需求，易沟通，好相处。
              </p>,
              <p className="tracking-wide leading-relaxed font-sans font-light">
                I am <strong className="text-sky-400 font-semibold font-sans">Bochen Dong</strong>, born in Lanzhou in 2002. I completed an integrated Bachelor-Master's program in <strong className="text-sky-400 font-semibold font-sans">Art and Design (Visual Communication Design)</strong> at <strong className="text-sky-400 font-semibold font-sans">Shandong University of Arts and Crafts</strong>. During my academic journey, I was honored with the <strong className="text-sky-400 font-semibold font-sans">First-Class Graduate Academic Scholarship</strong> and various professional design accolades. Known to be warm-hearted, responsible, and a highly collaborative "E" among "I"s, I am deeply sensible to business needs and extremely easy to cooperate with.
              </p>
            )}
            {t(
              <p className="tracking-wide">
                专注<strong className="text-sky-400 font-medium">AIGC</strong>创意视听内容创作，作品获得众多比赛奖项，入选<strong className="text-sky-400 font-medium">小红书精选</strong>、入选<strong className="text-sky-400 font-medium">新片场·精选周榜</strong>TOP10，凭借兼具设计审美、情感温度与个人风格的原创作品收获上万点赞，<strong className="text-sky-400 font-medium font-sans">新片场AI平台Shotlab签约创作人</strong>、<strong className="text-sky-400 font-medium font-sans">即梦/可灵/LibLib等AI平台扶持计划优质创作者</strong>，与众多平台展开合作，具备成熟的 AIGC 创作、内容运营、品牌合作及商业落地能力。
              </p>,
              <p className="tracking-wide leading-relaxed font-sans font-light">
                Specializing in creative <strong className="text-sky-400 font-semibold font-sans">AIGC</strong> audiovisual creation, with works winning multiple contest awards, featured on <strong className="text-sky-400 font-semibold font-sans">Xiaohongshu</strong>, and selected for <strong className="text-sky-400 font-semibold font-sans">Xinpianchang Weekly Best Chart</strong> TOP 10. My original content blends exquisite aesthetic design, emotional warmth, and distinct personal styles which has garnered tens of thousands of likes. As a <strong className="text-sky-400 font-semibold font-sans">Contracted Creator of Xinpianchang AI Platform Shotlab & Featured Creator of Dreamina/Kling/LibLib</strong>, I collaborate with numerous platforms, possessing mature capabilities in AIGC creation, content operation, brand collaboration, and commercial implementation.
              </p>
            )}
          </div>
        </motion.div>

        {/* Centered Overlapping Card Deck - Stack on idle, expand horizontal on hover */}
        <div id="experience-section" className="relative w-full overflow-visible pt-16 pb-4 flex flex-col items-center justify-center scroll-mt-24">
          <div 
            className="relative flex items-center justify-center select-none"
            style={{ 
              width: isMobile ? '290px' : '940px', 
              height: isMobile ? (isCardsHovered ? '1280px' : '430px') : '430px',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onMouseEnter={() => !isMobile && setIsCardsHovered(true)}
            onMouseLeave={() => !isMobile && setIsCardsHovered(false)}
            onClick={() => isMobile && setIsCardsHovered(!isCardsHovered)}
          >
            {/* Instruction tooltip overlay */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsCardsHovered(!isCardsHovered);
              }}
              className="absolute -top-10 left-1/2 -translate-x-1/2 z-40 bg-zinc-900/95 border border-white/10 hover:border-white/20 hover:bg-zinc-800/95 backdrop-blur px-4 py-1.5 rounded-full text-[10px] text-zinc-300 font-sans tracking-widest uppercase flex items-center gap-2 shadow-xl cursor-pointer transition-all duration-300 select-none pointer-events-auto"
            >
              <span className={`w-1.5 h-1.5 rounded-full bg-sky-400 ${!isCardsHovered ? 'animate-ping' : ''}`} />
              <span>
                {isMobile 
                  ? (isCardsHovered ? t("点击收起作品与经历", "Click to Collapse Bio") : t("点击展开作品与经历", "Click to Expand Bio")) 
                  : (isCardsHovered ? t("点击收起个人履历", "Click to Collapse Bio") : t("点击/悬停展开个人履历", "Click/Hover to Expand Bio"))
                }
              </span>
            </motion.button>

            {/* CARD 1: PHOTO MASTERPIECE CARD (Anchor: Left in desktop row, Top stack) */}
            <motion.div
              style={{ originX: 0.5, originY: 0.5 }}
              animate={isCardsHovered ? {
                x: isMobile ? 0 : -320,
                y: isMobile ? -420 : 0,
                rotate: 0,
                scale: 1,
                zIndex: 30
              } : {
                x: 0,
                y: 0,
                rotate: 0,
                scale: 1,
                zIndex: 30
              }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              onClick={() => {
                if (isMobile) {
                  if (!isCardsHovered) {
                    setIsCardsHovered(true);
                  } else {
                    setActiveDetailIndex(0);
                  }
                } else {
                  setActiveDetailIndex(0);
                }
              }}
              className="absolute left-[calc(50%-140px)] top-[15px] w-[280px] h-[400px] rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] cursor-pointer bg-neutral-950 border border-white/10 group flex flex-col justify-end p-6"
            >
              {/* Background portrait/stylized image */}
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260607215912805.jpg"
                  alt="董柏辰 - 艺术设计专业硕士"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 opacity-85 contrast-[1.05]"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-black/40 to-transparent z-10" />
                <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black via-black/90 to-transparent z-10" />
              </div>

              {/* Card content */}
              <div className="relative z-20 flex flex-col items-center text-center w-full">
                
                {/* Title and subtitle labels */}
                <h3 className="text-lg font-bold text-white tracking-wide mb-1 select-none font-sans">
                  {t("董柏辰/Barry", "Bochen Dong / Barry")}
                </h3>
                <p className="text-[11px] text-zinc-400 font-sans tracking-wider mb-4 font-light select-none">
                  {t("山东工艺美术学院·艺术设计专业硕士", "Shandong University of Arts & Crafts • Master of Art & Design")}
                </p>

                {/* Hidden details shown on card interaction */}
                <p className="text-[11px] leading-relaxed text-zinc-350 font-sans font-light select-none mb-6 opacity-0 group-hover:opacity-100 h-0 group-hover:h-auto overflow-hidden transition-all duration-500 text-center">
                  {t("专注AIGC创意视听内容，凭借设计审美、情感温度与个人风格创作，性格温和易沟通，团队协作执行力满格。", "Focusing on AIGC creative audiovisual content, blending design aesthetics, emotional warmth, and personal style. Warm, collaborative, and highly executive.")}
                </p>

                {/* Retro premium dark pill */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveDetailIndex(0);
                  }}
                  className="w-full py-2 bg-black/90 border border-white/10 rounded-full text-[10px] text-sky-300 font-sans font-semibold tracking-widest text-center select-none uppercase shadow-md transition-colors duration-300 group-hover:bg-white group-hover:text-black group-hover:border-white cursor-pointer"
                >
                  {t("点击查看详细内容", "View Details")}
                </button>
              </div>
            </motion.div>

            {/* CARD 2: INTERNSHIP EXPERIENCE 1 CARD (Center in desktop row, beneath Card 1, tilted slightly left) */}
            <motion.div
              style={{ originX: 0.5, originY: 0.5 }}
              animate={isCardsHovered ? {
                x: 0,
                y: 0,
                rotate: 0,
                scale: 1,
                zIndex: 20
              } : {
                x: 10,
                y: 12,
                rotate: -4,
                scale: 0.96,
                zIndex: 20
              }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              onClick={() => {
                if (isMobile) {
                  if (!isCardsHovered) {
                    setIsCardsHovered(true);
                  } else {
                    setActiveDetailIndex(1);
                  }
                } else {
                  setActiveDetailIndex(1);
                }
              }}
              className="absolute left-[calc(50%-140px)] top-[15px] w-[280px] h-[400px] rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] cursor-pointer bg-neutral-950 border border-white/10 group flex flex-col justify-end p-6"
            >
              {/* Background conceptual AIGC workspace image */}
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260607215410483.png"
                  alt="AIGC 头部平台合作"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.8] opacity-70 contrast-[1.1]"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-black/40 to-transparent z-10" />
                <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black via-black/90 to-transparent z-10" />
              </div>

              {/* Card content */}
              <div className="relative z-20 flex flex-col items-center text-center w-full">
                
                {/* Title and subtitle labels */}
                <h3 className="text-lg font-bold text-white tracking-wide mb-1 select-none font-sans">
                  {t("字节跳动·抖音TikTok Shop", "ByteDance • Douyin TikTok Shop")}
                </h3>
                <p className="text-[11px] text-zinc-400 font-sans tracking-wider mb-4 font-light select-none">
                  {t("AIGC内容运营与设计", "AIGC Content Operations & Design")}
                </p>

                {/* Hidden details shown on card interaction */}
                 <p className="text-[11px] leading-relaxed text-zinc-350 font-sans font-light select-none mb-6 opacity-0 group-hover:opacity-100 h-0 group-hover:h-auto overflow-hidden transition-all duration-500 text-center">
                  {t("参与国际电商AIGC内容创意与AI视频制作，内容脚本模板输出，短视频生产，效果数据分析等。", "Participated in AIGC content ideation and AI video production for international e-commerce, outputting script templates, producing short videos, and analyzing performance data.")}
                </p>

                {/* Retro premium dark pill */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveDetailIndex(1);
                  }}
                  className="w-full py-2 bg-black/90 border border-white/10 rounded-full text-[10px] text-sky-300 font-sans font-semibold tracking-widest text-center select-none uppercase shadow-md transition-colors duration-300 group-hover:bg-white group-hover:text-black group-hover:border-white cursor-pointer"
                >
                  {t("点击查看详细内容", "View Details")}
                </button>
              </div>
            </motion.div>

            {/* CARD 3: INTERNSHIP EXPERIENCE 2 CARD (Right in desktop row, bottom of stack, tilted slightly right) */}
            <motion.div
              style={{ originX: 0.5, originY: 0.5 }}
              animate={isCardsHovered ? {
                x: isMobile ? 0 : 320,
                y: isMobile ? 420 : 0,
                rotate: 0,
                scale: 1,
                zIndex: 10
              } : {
                x: -10,
                y: 24,
                rotate: 4,
                scale: 0.92,
                zIndex: 10
              }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              onClick={() => {
                if (isMobile) {
                  if (!isCardsHovered) {
                    setIsCardsHovered(true);
                  } else {
                    setActiveDetailIndex(2);
                  }
                } else {
                  setActiveDetailIndex(2);
                }
              }}
              className="absolute left-[calc(50%-140px)] top-[15px] w-[280px] h-[400px] rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] cursor-pointer bg-neutral-950 border border-white/10 group flex flex-col justify-end p-6"
            >
              {/* Background cinematic media vortex image */}
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260607215707204.png"
                  alt="新媒体创意视听"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.8] opacity-70 contrast-[1.1]"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-black/40 to-transparent z-10" />
                <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black via-black/90 to-transparent z-10" />
              </div>

              {/* Card content */}
              <div className="relative z-20 flex flex-col items-center text-center w-full">
                
                {/* Title and subtitle labels */}
                <h3 className="text-lg font-bold text-white tracking-wide mb-1 select-none font-sans">
                  {t("腾讯·IEG国内发行线", "Tencent • IEG Domestic Publishing")}
                </h3>
                <p className="text-[11px] text-zinc-400 font-sans tracking-wider mb-4 font-light select-none">
                  {t("视觉设计与AIGC探索", "Visual Design & AIGC Exploration")}
                </p>

                {/* Hidden details shown on card interaction */}
                <p className="text-[11px] leading-relaxed text-zinc-350 font-sans font-light select-none mb-6 opacity-0 group-hover:opacity-100 h-0 group-hover:h-auto overflow-hidden transition-all duration-500 text-center">
                  {t("在职期间主要参与“地下城与勇士”游戏的KV视觉设计、以及游戏图库创作，并利用AIGC技术提效。", "Mainly participated in the KV visual design and game library asset creation for 'Dungeon & Fighter', utilizing AIGC technologies for efficiency optimization.")}
                </p>

                {/* Retro premium dark pill */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveDetailIndex(2);
                  }}
                  className="w-full py-2 bg-black/90 border border-white/10 rounded-full text-[10px] text-sky-300 font-sans font-semibold tracking-widest text-center select-none uppercase shadow-md transition-colors duration-300 group-hover:bg-white group-hover:text-black group-hover:border-white cursor-pointer"
                >
                  {t("点击查看详细内容", "View Details")}
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Copied and downsized headline aligned left */}
        <div className="w-full text-left mt-32 md:mt-48 mb-2 max-w-4xl select-none flex flex-col gap-2">
          <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-zinc-100 leading-normal font-sans">
            {language === 'zh' ? (
              <>
                <div>“当答案变得唾手可得，</div>
                <div className="mt-1">真正有价值的反而是<span className="font-serif italic text-sky-400 mr-2.5">提出问题</span>的能力。”</div>
              </>
            ) : (
              <>
                <div>"When answers become readily available,</div>
                <div className="mt-1">what is truly valuable instead is the ability to</div>
                <div className="mt-1"><span className="font-serif italic text-sky-400 mr-1.5">ask questions</span>."</div>
              </>
            )}
          </h2>
        </div>
      </section>

      {/* 4. MISSION SECTION */}
      <section id="mission-section" className="relative w-full max-w-7xl mx-auto px-6 md:px-12 mt-4 md:mt-6 pt-0 md:pt-2 pb-4 md:pb-6 bg-black z-10 flex flex-col items-center">
        {/* Large looping MP4 mission video placed in background or accent element */}
        <div className="relative w-full max-w-3xl mb-16 rounded-3xl overflow-hidden aspect-square flex items-center justify-center border border-white/5 bg-neutral-950/20">
          <LazyVideo 
            className="absolute inset-0 w-full h-full object-cover opacity-100 z-0 pointer-events-none transform-gpu will-change-transform"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_132944_a0d124bb-eaa1-4082-aa30-2310efb42b4b.mp4"
            autoPlay 
            muted 
            loop 
            playsInline
            preload="auto"
          />
          {/* Subtle fade overlay to keep edges clean without darkening the central art */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/25" />
          <div className="relative z-10 flex flex-col items-center justify-center text-center p-8 bg-black/15 backdrop-blur-[1px] rounded-2xl">
            <span className="text-xs uppercase font-sans tracking-[4px] text-white/80 mb-2 font-medium">{t("AIGC小行星", "AIGC Asteroid")}</span>
            <span className="text-lg font-light tracking-widest text-zinc-300 font-sans">{t("等待探索中", "Awaiting Exploration")}</span>
          </div>
        </div>
      </section>

      {/* Solution Section Content replacing CLARITY and INTEGRATION */}
        <section id="solution-section" className="relative w-full max-w-7xl mx-auto px-6 md:px-12 pt-10 pb-4 text-left border-t border-white/5 mt-10 z-20 bg-black">
          
          {/* Solution Section Header */}
          <div className="flex flex-col gap-2.5 mb-8 text-left max-w-4xl">
            <span className="text-xs tracking-[4px] uppercase bg-gradient-to-r from-sky-400 via-sky-250 to-sky-400 bg-clip-text text-transparent font-semibold font-sans drop-shadow-[0_0_10px_rgba(56,189,248,0.3)]">
              {t("AIGC & 艺术设计", "AIGC & Art Design")}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-medium tracking-tight text-white leading-tight font-sans">
              {t("作品展示", "Portfolio Showcase")}
            </h2>
            <p className="text-xs md:text-sm font-light tracking-widest text-zinc-400 font-sans mt-1">
              {t("工作产出作品 / 视频短片作品 / 视觉插画作品 / 品牌运营作品", "Commercial / Creative Video / Illustration / Brand Operations")}
            </p>
          </div>

          {/* Large object-cover feature showcase video */}
          <div className="relative w-full aspect-[3/1] min-h-[220px] max-h-[460px] rounded-2xl overflow-hidden mb-8 border border-white/5 bg-neutral-900/10">
            <LazyVideo 
              className="absolute inset-0 w-full h-full object-cover opacity-100 z-0 pointer-events-none transform-gpu will-change-transform"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_125119_8e5ae31c-0021-4396-bc08-f7aebeb877a2.mp4"
              autoPlay 
              muted 
              loop 
              playsInline
              preload="auto"
            />
            {/* Subtle color mask */}
            <div className="absolute inset-0 bg-transparent z-0" />
          </div>

          {/* Typographical Portfolio Catalog Directory (作品目录形式) */}
          <div className="flex flex-col border-t border-white/5">
            {CATALOG_PORTFOLIO_DATA.map((item, idx) => {
              // Map dynamic icons
              const getIcon = () => {
                switch(item.id) {
                  case 'commercial': return <Briefcase className="w-4 h-4 text-fuchsia-300 drop-shadow-[0_0_8px_rgba(232,121,249,0.95)]" />;
                  case 'video': return <Film className="w-4 h-4 text-sky-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.95)]" />;
                  case 'illustration': return <Palette className="w-4 h-4 text-fuchsia-300 drop-shadow-[0_0_8px_rgba(232,121,249,0.95)]" />;
                  default: return <Megaphone className="w-4 h-4 text-emerald-300 drop-shadow-[0_0_8px_rgba(52,211,153,0.95)]" />;
                }
              };

              const isExpanded = expandedCategory === item.id;
              const isHovered = hoveredCategory === item.id;

              return (
                <div key={item.id} className="relative w-full border-b border-white/5 select-none">
                  {/* Catalog item header row */}
                  <div 
                    onMouseEnter={() => setHoveredCategory(item.id)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    onClick={() => setExpandedCategory(isExpanded ? null : item.id)}
                    className={`relative w-full flex flex-col md:flex-row items-start md:items-center justify-between py-8 px-4 transition-all duration-500 cursor-pointer ${
                      isExpanded ? 'bg-white/[0.03]' : 'bg-transparent'
                    } overflow-hidden`}
                  >
                    {/* Hover sliding metallic-glass background highlight */}
                    {isHovered && (
                      <motion.div
                        layoutId="catalogHoverHighlight"
                        className="absolute inset-0 bg-gradient-to-r from-sky-400/[0.04] via-white/[0.015] to-transparent border-l-2 border-sky-400/70 z-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}

                    {/* Left block: Index and Name */}
                    <div className={`relative z-10 flex items-center gap-6 md:gap-10 w-full md:w-[310px] shrink-0 transition-all duration-300 ${
                      isHovered ? 'translate-x-2' : ''
                    }`}>
                      <span className={`text-xs font-mono tracking-widest transition-colors duration-300 ${
                        isHovered || isExpanded ? 'text-sky-350' : 'text-neutral-500'
                      }`}>{item.index}</span>
                      <div className="flex flex-col gap-1 text-left">
                        <h3 className="text-xl md:text-2xl font-semibold text-white tracking-wide font-sans flex items-center gap-2">
                          {t(item.name, item.englishName)}
                          <motion.span 
                            animate={isHovered ? { scale: 1.15, rotate: 10 } : { scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            className="p-1 rounded-full bg-white/5 text-neutral-400"
                          >
                            {getIcon()}
                          </motion.span>
                        </h3>
                        <span className={`text-[10px] tracking-widest font-mono font-medium transition-colors duration-300 ${
                          isHovered ? 'text-sky-300/60' : 'text-neutral-500'
                        }`}>{item.englishName}</span>
                      </div>
                    </div>

                    {/* Middle block: Tagline description */}
                    <p className={`relative z-10 text-[10px] md:text-[11.5px] font-sans font-light my-3 md:my-0 flex-1 md:pl-8 leading-relaxed shrink text-left whitespace-normal md:whitespace-nowrap overflow-hidden md:text-ellipsis transition-colors duration-300 ${
                      isHovered ? 'text-zinc-200' : 'text-neutral-400'
                    }`}>
                      {t(item.desc, item.enDesc)}
                    </p>

                    {/* Right block: Action hint */}
                    <div className="relative z-10 flex items-center gap-4 self-end md:self-auto shrink-0 md:pl-4">
                      {/* Number of projects badge */}
                      <span className={`text-[10px] md:text-xs font-mono font-medium transition-all duration-300 ${
                        isHovered || isExpanded ? 'text-sky-300 bg-sky-950/25 border-sky-400/20' : 'text-neutral-300 bg-white/5 border-white/10'
                      } border px-3 py-1 rounded-full`}>
                        {item.projects.length} {t("作品 / CASES", "CASES")}
                      </span>
                      {/* Expand Chevron */}
                      <motion.div
                        animate={{ 
                          rotate: isExpanded ? 90 : 0,
                          scale: isHovered ? 1.25 : 1,
                          x: isHovered ? 3 : 0
                        }}
                        transition={{ type: "spring", stiffness: 200, damping: 12 }}
                        className={`transition-colors duration-300 ${isHovered || isExpanded ? 'text-sky-350' : 'text-neutral-500'}`}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </motion.div>
                    </div>

                  </div>

                  {/* Expanded Portfolio Cards Area (鼠标悬停时，会出现全部的作品卡片) */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden bg-black/40 border-t border-white/[0.02]"
                      >
                        {/* Interactive Horizontal Scroll Row matching the active items */}
                        <div className="relative w-full px-4 md:px-12 py-8 overflow-hidden select-none">
                          {/* Navigation / Interaction hint */}
                          <div className="flex items-center justify-between mb-4 text-xs text-zinc-400 font-mono tracking-widest uppercase">
                            <span className="flex items-center gap-1.5 opacity-75">
                              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-pulse" />
                              {t("点击卡片呈现作品详细长页面", "Click cards to view detailed project pages")}
                            </span>
                            <span className="opacity-75 flex items-center gap-1">
                              {language === 'zh' ? `← 左右滑动浏览 (${item.projects.length}个作品) →` : `← Scroll horizontally to browse (${item.projects.length} projects) →`}
                            </span>
                          </div>

                          <div className="flex flex-row overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scroll-smooth scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-neutral-850 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
                            {item.projects.map((proj, pIdx) => (
                              <motion.div
                                key={proj.id}
                                initial={{ opacity: 0, x: 25 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: pIdx * 0.08, duration: 0.55, ease: "easeOut" }}
                                onClick={() => setSelectedProject(proj)}
                                onMouseEnter={() => {
                                  import('./utils/optimizeCdn').then(({ warmUpImage, warmUpVideo }) => {
                                    if (proj.coverImage) {
                                      warmUpImage(proj.coverImage);
                                    }
                                    if (proj.gallery && proj.gallery.length > 0) {
                                      proj.gallery.forEach(imgUrl => warmUpImage(imgUrl));
                                    }
                                    if (proj.videoUrl) {
                                      warmUpVideo(proj.videoUrl);
                                    }
                                  });
                                  if (proj.id === "vid-11" || proj.id === "vid-12" || proj.id === "vid-13") {
                                    import('./utils/optimizeCdn').then(({ warmUpVideo }) => {
                                      const primaryUrl = proj.id === "vid-11" ? "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/liaozhai%EF%BC%881%EF%BC%89.mp4" : proj.id === "vid-13" ? "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/sanguo%EF%BC%881%EF%BC%89.mp4" : "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/wuxia%EF%BC%881%EF%BC%89.mp4";
                                      const secUrl = proj.id === "vid-11" ? "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/liaozhai%EF%BC%882%EF%BC%89.mp4" : proj.id === "vid-13" ? "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/sanguo%EF%BC%882%EF%BC%89.mp4" : "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/wuxia%EF%BC%882%EF%BC%89.mp4";
                                      warmUpVideo(primaryUrl);
                                      warmUpVideo(secUrl);
                                    });
                                  }
                                  if (proj.id === "vid-4") {
                                    import('./utils/optimizeCdn').then(({ warmUpVideo }) => warmUpVideo("https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/night2.mp4"));
                                  }
                                  if (proj.id === "vid-5") {
                                    import('./utils/optimizeCdn').then(({ warmUpVideo }) => warmUpVideo("https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/earth2.mp4"));
                                  }
                                }}
                                className={`group flex flex-col ${item.id === 'video' ? 'w-[185px] sm:w-[215px] md:w-[235px]' : 'w-[280px] sm:w-[330px] md:w-[360px]'} shrink-0 snap-start rounded-2xl border border-white/[0.04] bg-neutral-950/60 hover:border-sky-450/40 overflow-hidden transition-all duration-300 cursor-pointer shadow-[0_12px_40px_rgba(0,0,0,0.65)] hover:shadow-[0_12px_45px_rgba(56,189,248,0.06)]`}
                              >
                                {/* Card Image Cover with Zoom */}
                                <div className={`relative ${item.id === 'video' ? 'aspect-[3/4]' : 'aspect-[16/9]'} overflow-hidden`}>
                                  <img
                                    src={proj.coverImage}
                                    alt={proj.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-90 group-hover:brightness-100"
                                    referrerPolicy="no-referrer"
                                    loading="lazy"
                                  />
                                  {/* Overlay glow gradient */}
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300" />
                                  

 
                                  {/* Floating View icon */}
                                  <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-black/60 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                  </div>
 
                                  {/* Bottom title over image */}
                                  {item.id !== 'video' ? null : (
                                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-1 w-[calc(100%-24px)] text-left">
                                      <h4 className="text-[11px] sm:text-xs md:text-sm font-semibold text-white tracking-wide font-sans block truncate max-w-[62%] transition-transform duration-300 group-hover:scale-[1.03] origin-left" title={proj.title}>
                                        {proj.title}
                                      </h4>
                                      <span className="text-[9px] md:text-[10px] text-sky-400 font-medium tracking-wider font-sans uppercase flex items-center gap-0.5 shrink-0 bg-white/5 border border-white/10 rounded-md px-2 py-0.5 group-hover:bg-sky-500 group-hover:text-black group-hover:border-transparent transition-all duration-300">
                                        {t("查看详细", "View")}
                                        <ArrowRight className="w-2.5 h-2.5" />
                                      </span>
                                    </div>
                                  )}
                                </div>
 
                                {/* Card details body */}
                                <div className="p-4 flex flex-col text-left pb-4 pt-3 flex-1 gap-2 justify-start">
                                  {item.id !== 'video' ? (
                                    <div className="flex items-center justify-between gap-2 w-full min-w-0">
                                      <h4 className="text-zinc-100 text-[10px] sm:text-[11px] md:text-xs font-semibold font-sans tracking-tight transition-transform duration-300 group-hover:scale-[1.03] origin-left truncate flex-1 min-w-0" title={proj.title}>
                                        {proj.title}
                                      </h4>
                                      <span className="text-[9px] md:text-[10px] text-sky-400 font-medium tracking-wider font-sans uppercase flex items-center gap-0.5 shrink-0 bg-white/5 border border-white/10 rounded-md px-2 py-0.5 group-hover:bg-sky-500 group-hover:text-black group-hover:border-transparent transition-all duration-300">
                                        {t("查看详细", "View")}
                                        <ArrowRight className="w-2.5 h-2.5" />
                                      </span>
                                    </div>
                                  ) : (
                                    <p className="text-zinc-400 text-xs font-light leading-relaxed font-sans line-clamp-2">
                                      {proj.description}
                                    </p>
                                  )}
                                </div>

                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              );
            })}
          </div>
        </section>

      {/* 6. CTA SECTION */}
      <section id="cta-section" className="relative w-full mt-16 md:mt-24 pt-10 pb-24 md:pt-14 md:pb-36 border-t border-white/5 overflow-hidden bg-black flex flex-col items-center justify-center text-center">
        {/* Background HLS Stream (HlsPlayer component) */}
        <HlsPlayer 
          url="https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8" 
          className="absolute inset-0 w-full h-full object-cover opacity-55 z-0 pointer-events-none"
        />

        {/* Video darkness mask to preserve white text readability */}
        <div className="absolute inset-0 bg-black/45 z-[1]" />

        {/* Inner Content centered on top of moving HLS streams */}
        <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center gap-8">
          
          {/* Logo element representing Mindloop */}
          <div className="w-10 h-10 rounded-full border-2 border-white/60 flex items-center justify-center mb-2">
            <div className="w-5 h-5 rounded-full border border-white/55" />
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-7xl font-serif italic font-normal tracking-[-0.5px] sm:tracking-[-1px] text-white leading-snug sm:leading-[1.05]">
            {t("感谢参观我的小行星", "Thank You for Visiting My Asteroid")}
          </h2>

          <p className="text-neutral-400 text-sm md:text-base max-w-2xl font-light leading-relaxed whitespace-pre-line">
            {t(
              "当我用AI做了一个自己的网站\n我想，AI可以是一座孤岛，但也能成为独属于我的小宇宙",
              "When I built my own website with AI.\nI believe AI can be an isolated island, or it can become a microspace exclusively yours."
            )}
          </p>

          <motion.div 
            {...fadeUp(0.4)} 
            className="w-full max-w-xl md:max-w-2xl bg-white/[0.08] backdrop-blur-md border border-white/[0.15] p-2 pr-2.5 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] flex items-center gap-3 mt-4 animate-pulse-once"
          >
            <input 
              type="text"
              value={suggestionMessage}
              onChange={(e) => setSuggestionMessage(e.target.value)}
              placeholder={t("有想法或建议欢迎留言...", "Drop your ideas or suggestions here...")}
              className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder-white/40 px-3 py-2.5 focus:ring-0"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
            />
            <button
              onClick={handleSendMessage}
              className="bg-white text-black hover:bg-neutral-200 transition-colors duration-200 px-5 py-2.5 rounded-xl text-[11px] md:text-xs font-semibold tracking-wider flex items-center gap-1.5 shrink-0 shadow-lg cursor-pointer"
            >
              <span>{t("点击发送", "Send")}</span>
              <ArrowRight className="w-3.5 h-3.5 text-black" />
            </button>
          </motion.div>

          {/* Mobile-only vertically-stacked smaller contact links below the message input box */}
          <div className="flex flex-col items-center gap-1.5 mt-4 md:hidden">
            <span 
              className="text-[10px] text-white/50 font-sans tracking-wider cursor-pointer hover:text-white transition-colors flex items-center gap-1 group/mobile-footer-wechat"
              onClick={() => handleCopy("Ddd032111", t("微信号", "WeChat ID"), 'footer')}
            >
              <span>{t("微信号：Ddd032111", "WeChat : Ddd032111")}</span>
              <span className="text-[8px] text-sky-400 opacity-70 bg-white/5 px-1 py-0.5 rounded border border-white/5 select-none">{t("复制", "Copy")}</span>
            </span>
            <span 
              className="text-[10px] text-white/50 font-sans tracking-wider cursor-pointer hover:text-white transition-colors flex items-center gap-1 group/mobile-footer-email"
              onClick={() => handleCopy("1073186932@qq.com", t("邮箱", "Email"), 'footer')}
            >
              <span>{t("邮箱：1073186932@qq.com", "Email : 1073186932@qq.com")}</span>
              <span className="text-[8px] text-sky-400 opacity-70 bg-white/5 px-1 py-0.5 rounded border border-white/5 select-none">{t("复制", "Copy")}</span>
            </span>
          </div>
        </div>
      </section>

      {/* 7. FOOTER SECTION */}
      <footer id="app-footer" className="relative w-full max-w-7xl mx-auto px-4 md:px-4 pt-8 pb-12 border-t border-white/5 bg-black z-10 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full -translate-y-2">
          <span 
            className="hidden md:flex text-white/45 text-xs md:text-sm font-sans tracking-wider cursor-pointer hover:text-white transition-colors items-center gap-1.5 group/foot-item"
            onClick={() => handleCopy("Ddd032111", t("微信号", "WeChat ID"), 'footer')}
            title={t("点击复制微信号", "Click to copy WeChat ID")}
          >
            <span>{t("微信号：Ddd032111", "WeChat ID: Ddd032111")}</span>
            <span className="opacity-0 group-hover/foot-item:opacity-100 transition-opacity text-[10px] text-sky-450 bg-white/5 px-1.5 py-0.5 rounded border border-white/5 select-none">{t("点击复制", "Copy")}</span>
          </span>

          <div className="relative flex flex-col items-center">
            <AnimatePresence>
              {footerCopyFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: -8, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute bottom-full mb-2 bg-zinc-900/95 border border-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-neutral-200 text-[11px] font-sans tracking-wide whitespace-nowrap flex items-center gap-1.5 z-30"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{footerCopyFeedback}</span>
                </motion.div>
              )}
            </AnimatePresence>
            <span className="text-sky-300 text-xs font-sans tracking-[0.2em] font-medium text-center select-none">
              {t("Vibe Coding 手搓个人作品网站", "Vibe Coding - Handcrafted Portfolio Website")}
            </span>
          </div>

          <span 
            className="hidden md:flex text-white/45 text-xs md:text-sm font-sans tracking-wider cursor-pointer hover:text-white transition-colors items-center gap-1.5 group/foot-item"
            onClick={() => handleCopy("1073186932@qq.com", t("邮箱", "Email"), 'footer')}
            title={t("点击复制邮箱", "Click to copy Email")}
          >
            <span>{t("邮箱：1073186932@qq.com", "Email: 1073186932@qq.com")}</span>
            <span className="opacity-0 group-hover/foot-item:opacity-100 transition-opacity text-[10px] text-sky-455 bg-white/5 px-1.5 py-0.5 rounded border border-white/5 select-none">{t("点击复制", "Copy")}</span>
          </span>
        </div>
      </footer>

      {/* Interactive flyout modals */}
      <InfoModal 
        isOpen={modalType !== null} 
        onClose={() => setModalType(null)} 
        title={modalTitle} 
        type={modalType || 'philosophy'} 
      />

      {/* Custom Portfolio Detail Overlay Modal */}
      <AnimatePresence>
        {activeDetailIndex !== null && (() => {
          const detail = PORTFOLIO_DETAILS[activeDetailIndex];
          return (
            <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveDetailIndex(null)}
                className="fixed inset-0 bg-black/90 backdrop-blur-xl cursor-zoom-out"
              />

              {/* Modal Card - Flowing vertical long card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                transition={{ type: "spring", duration: 0.6, bounce: 0.1 }}
                className="relative w-full max-w-5xl bg-zinc-950 border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,1)] z-10 flex flex-col max-h-[94vh] md:max-h-[92vh]"
              >
                {/* Elegant Close Button overlay */}
                <button
                  onClick={() => setActiveDetailIndex(null)}
                  className="absolute top-4 right-4 sm:top-5 sm:right-5 z-40 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 border border-white/10 backdrop-blur-md flex items-center justify-center text-zinc-400 hover:text-white hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg"
                  title="关闭详情"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Scrollable Container */}
                <div className="overflow-y-auto w-full custom-scrollbar flex flex-col">
                  {/* Header Cover Banner */}
                  <div className="relative w-full h-48 sm:h-64 md:h-80 shrink-0 overflow-hidden">
                    <img
                      src={(detail as any).innerBgImage || detail.coverImage}
                      alt={detail.title}
                      className="w-full h-full object-cover select-none"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/35 to-transparent" />
                    <div className="absolute bottom-4 left-5 right-5 sm:bottom-6 sm:left-8 sm:right-8">
                      {activeDetailIndex === 0 && (
                        <div className="flex -ml-2 sm:-ml-4 mb-2 sm:mb-3">
                          <span className="inline-block bg-sky-500/10 border border-sky-400/20 text-sky-300 tracking-widest uppercase font-sans text-xs sm:text-sm md:text-base font-extrabold drop-shadow-[0_0_15px_rgba(56,189,248,0.4)] px-3 py-1 sm:px-4 sm:py-1.5 rounded-full">
                            {t("山东工艺美术学院·艺术设计专业硕士", "Shandong University of Arts & Crafts • Master of Art & Design")}
                          </span>
                        </div>
                      )}
                      <h3 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight select-none font-sans">
                        {t(detail.title, detail.enTitle)}
                      </h3>
                    </div>
                  </div>

                  {/* Core Content Body */}
                  <div className="p-5 sm:p-8 md:p-12 flex flex-col gap-6 sm:gap-10">
                    {activeDetailIndex === 1 ? (
                      <TikTokShopDetail language={language} t={t} setLightboxUrl={(url) => setLightboxState({images: [url], index: 0})} />
                    ) : activeDetailIndex === 2 ? (
                      <TencentIEGDetail language={language} t={t} setLightboxUrl={(url) => setLightboxState({images: [url], index: 0})} />
                    ) : (
                      <>
                        {/* Tagline */}
                        <div className="relative pl-5 border-l-3 border-sky-400/80 py-2 bg-sky-400/[0.01]">
                          <p className="text-zinc-200 italic text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed font-light whitespace-pre-line">
                            “ {t(detail.tagline, detail.enTagline)} ”
                          </p>
                        </div>

                        {/* Subtitle Details */}
                        {activeDetailIndex !== 0 && (
                          <div className="text-sm md:text-base text-zinc-400 font-sans tracking-wide border-b border-white/5 pb-4">
                            {t("就读院校及方向定位：", "Institution & Focus: ")}<span className="text-zinc-200 font-medium">{t(detail.subtitle, detail.enSubtitle)}</span>
                          </div>
                        )}

                        {/* Grid stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {detail.stats.map((stat, idx) => (
                            <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                              <span className="text-[10px] text-zinc-500 font-sans tracking-widest uppercase mb-1.5">{t(stat.label, (stat as any).enLabel)}</span>
                              <span className="text-sm md:text-base lg:text-lg text-sky-300 font-bold tracking-wide font-sans">{t(stat.value, (stat as any).enValue || stat.value)}</span>
                            </div>
                          ))}
                        </div>

                        {/* Long Paragraph Descriptions */}
                        <div className="space-y-6 text-zinc-300 text-sm sm:text-base md:text-lg leading-[1.85] font-sans font-light text-justify">
                          {((detail as any).enParagraphs && language === 'en' ? (detail as any).enParagraphs : detail.paragraphs).map((p: string, idx: number) => (
                            <p key={idx}>{p}</p>
                          ))}
                        </div>

                        {/* Features list */}
                        <div className="flex flex-col gap-6">
                          <div className="flex items-center gap-2.5 border-b border-white/5 pb-3">
                            <span className="w-2 h-2 rounded-full bg-sky-300" />
                            <h4 className="text-base md:text-lg uppercase tracking-[0.1em] font-bold text-white/90">
                              {t((detail as any).section1Title || "能力坐标 & 实践亮点", (detail as any).section1EnTitle || "Key Capabilities & Practices Highlights")}
                            </h4>
                          </div>
                          {(detail as any).awards ? (
                            <div className="space-y-3">
                              {((detail as any).enAwards && language === 'en' ? (detail as any).enAwards : (detail as any).awards).map((item: string, idx: number) => (
                                <div key={idx} className="group flex gap-3 p-4 sm:p-5 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-300 items-start">
                                  <span className="text-sm sm:text-base md:text-lg text-zinc-250 group-hover:text-sky-300 transition-colors duration-300 leading-relaxed font-sans font-light">{item}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {detail.features.map((feat, idx) => (
                                <div key={idx} className="flex gap-5 p-5 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-colors duration-300">
                                  <span className="text-sm font-mono text-zinc-500 font-semibold mt-0.5">0{idx + 1}</span>
                                  <div className="flex flex-col gap-1.5">
                                    <h5 className="text-sm sm:text-base font-semibold text-zinc-100">{t(feat.title, (feat as any).enTitle)}</h5>
                                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">{t(feat.desc, (feat as any).enDesc)}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Works Gallery */}
                        <div className="flex flex-col gap-6">
                          <div className="flex items-center gap-2.5 border-b border-white/5 pb-3">
                            <span className="w-2 h-2 rounded-full bg-sky-300" />
                            <h4 className="text-base md:text-lg uppercase tracking-[0.1em] font-bold text-white/90">
                              {t((detail as any).section2Title || "主创叙美学探索", (detail as any).section2EnTitle || "Narrative Aesthetics")}
                            </h4>
                          </div>
                          {(detail as any).projects ? (
                            <div className="space-y-3">
                              {((detail as any).enProjects && language === 'en' ? (detail as any).enProjects : (detail as any).projects).map((item: string, idx: number) => (
                                <div key={idx} className="group flex gap-3 p-4 sm:p-5 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-300 items-start">
                                  <span className="text-sm sm:text-base md:text-lg text-zinc-250 group-hover:text-sky-300 transition-colors duration-300 leading-relaxed font-sans font-light">{item}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              {detail.works.map((url, i) => (
                                <div key={i} className="relative aspect-video rounded-2xl overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer" onClick={() => setLightboxState({images: detail.works, index: i})}>
                                  <img 
                                    src={url} 
                                    alt="Creation sample" 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90 group-hover:brightness-100"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Achievements Gallery */}
                        {(detail as any).achievements && (() => {
                          const allAchievementImages = [
                            ...((detail as any).achievementsRow2 || []),
                            ...((detail as any).achievements || []),
                            ...((detail as any).largeAchievementImage ? [(detail as any).largeAchievementImage] : [])
                          ];
                          return (
                            <div className="flex flex-col gap-6 mt-4">
                              <div className="flex items-center gap-2.5 border-b border-white/5 pb-3">
                                <span className="w-2 h-2 rounded-full bg-sky-300" />
                                <h4 className="text-base md:text-lg uppercase tracking-[0.1em] font-bold text-white/90">
                                  {t((detail as any).achievementsTitle || "成果展示：", (detail as any).achievementsEnTitle || "Achievements Showcase: ")}
                                </h4>
                              </div>
                              {(detail as any).achievementsRow2 && (
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full">
                                  {(detail as any).achievementsRow2.map((url: string, i: number) => (
                                    <div key={`row2-${i}`} className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer" onClick={() => setLightboxState({images: allAchievementImages, index: i})}>
                                      <img 
                                        src={url} 
                                        alt="Achievement sample" 
                                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 brightness-95 group-hover:brightness-100"
                                        referrerPolicy="no-referrer"
                                      />
                                      <div className="absolute inset-0 bg-transparent group-hover:bg-black/10 transition-colors" />
                                    </div>
                                  ))}
                                </div>
                              )}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                {(detail as any).achievements.map((url: string, i: number) => (
                                  <div key={i} className="relative w-full h-full rounded-2xl overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer" onClick={() => setLightboxState({images: allAchievementImages, index: ((detail as any).achievementsRow2 ? (detail as any).achievementsRow2.length : 0) + i})}>
                                    <img 
                                      src={url} 
                                      alt="Achievement sample" 
                                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 brightness-95 group-hover:brightness-100"
                                      referrerPolicy="no-referrer"
                                    />
                                    <div className="absolute inset-0 bg-transparent group-hover:bg-black/10 transition-colors" />
                                  </div>
                                ))}
                              </div>

                              {/* Large Achievement Image at the very bottom */}
                              {(detail as any).largeAchievementImage && (
                                <div className="relative w-full rounded-2xl overflow-hidden border border-white/5 bg-zinc-900 group cursor-pointer mt-2" onClick={() => setLightboxState({images: allAchievementImages, index: allAchievementImages.length - 1})}>
                                  <img 
                                    src={(detail as any).largeAchievementImage} 
                                    alt="Large Achievement sample" 
                                    className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500 brightness-95 group-hover:brightness-100"
                                    referrerPolicy="no-referrer"
                                  />
                                  <div className="absolute inset-0 bg-transparent group-hover:bg-black/10 transition-colors" />
                                </div>
                              )}
                            </div>
                          );
                        })()}
                      </>
                    )}
                  </div>

                  {/* Sticky Footer control */}
                  <div className="px-8 md:px-12 py-6 border-t border-white/5 bg-neutral-950/80 backdrop-blur flex justify-between items-center shrink-0 mt-auto">
                    <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
                      BarryAI Studio © 0321
                    </span>
                    <button
                      onClick={() => setActiveDetailIndex(null)}
                      className="bg-white text-black font-semibold text-xs py-2.5 px-6 rounded-full hover:bg-zinc-200 active:scale-95 transition-all cursor-pointer"
                    >
                      {t("关闭详情", "Close Details")}
                    </button>
                  </div>

                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>

      {/* Stunning Immersive Project Long Detailed Page Overlay Modal (作品详细长页面) */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[160] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-xl cursor-zoom-out"
            />

            {/* Modal Card - Flowing vertical long card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", duration: 0.6, bounce: 0.1 }}
              className="relative w-full max-w-5xl bg-zinc-950 border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,1)] z-10 flex flex-col max-h-[94vh] md:max-h-[92vh]"
            >
              {/* Elegant Close Button overlay */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 z-55 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 border border-white/10 backdrop-blur-md flex items-center justify-center text-zinc-400 hover:text-white hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg"
                title={t("返回目录", "Back to catalog")}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Scrollable Container */}
              <div className="overflow-y-auto w-full custom-scrollbar flex flex-col">
                {/* Parallax Cinematic Hero Banner */}
                <div className="relative w-full h-48 sm:h-64 md:h-80 shrink-0 overflow-hidden bg-black flex items-end">
                  <img
                    src={selectedProject.coverImage}
                    alt={selectedProject.title}
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.75] select-none"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Visual mask shades for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent z-[1]" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-transparent z-[1] pointer-events-none" />

                  {/* Hero Title and Categories Overlay */}
                  <div className="relative z-10 w-full px-5 sm:px-8 md:px-12 pb-5 sm:pb-6 flex flex-col items-start gap-2">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight font-sans mt-2 max-w-4xl text-left select-none">
                      {selectedProject.title}
                    </h1>
                    {!["comm-3", "comm-4", "comm-1", "comm-2", "illus-1", "oth-1", "oth-2", "brand-3", "brand-4"].includes(selectedProject.id) && (
                      <p className="text-xs sm:text-sm text-zinc-350 tracking-wide font-sans font-light mt-1 max-w-3xl text-left">
                        {selectedProject.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                {/* Core Content Layout Area */}
                <div className="w-full px-5 sm:px-8 md:px-12 py-6 sm:py-10 text-left relative z-10">
                  
                  {/* Left Side: Dense Project Narrative */}
                  <div className="space-y-12 pb-16">

                  {/* Cinematic Video Player Section */}
                  {selectedProject.videoUrl && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-2.5 border-b border-white/5 pb-2.5">
                        <span className="w-2 h-2 rounded-full bg-sky-300 animate-pulse" />
                        <h2 className="text-sm md:text-base uppercase tracking-[0.2em] font-bold text-zinc-200">
                          {selectedProject.id === "vid-4" || selectedProject.id === "vid-5"
                            ? t("短片展示（一） / FEATURED CINEMATIC SHORT", "FEATURED CINEMATIC SHORT")
                            : t("短片展示 / FEATURED CINEMATIC SHORT", "FEATURED CINEMATIC SHORT")}
                        </h2>
                      </div>
                      
                      {selectedProject.id === "vid-11" || selectedProject.id === "vid-12" || selectedProject.id === "vid-13" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                          <CustomVideoPlayer src={
                            selectedProject.id === "vid-11" 
                              ? "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/liaozhai%EF%BC%881%EF%BC%89.mp4" 
                              : selectedProject.id === "vid-13"
                              ? "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/sanguo%EF%BC%881%EF%BC%89.mp4"
                              : "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/wuxia%EF%BC%881%EF%BC%89.mp4"
                          } language={language} />
                          <CustomVideoPlayer src={
                            selectedProject.id === "vid-11" 
                              ? "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/liaozhai%EF%BC%882%EF%BC%89.mp4" 
                              : selectedProject.id === "vid-13"
                              ? "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/sanguo%EF%BC%882%EF%BC%89.mp4"
                              : "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/wuxia%EF%BC%882%EF%BC%89.mp4"
                          } language={language} />
                        </div>
                      ) : (
                        <CustomVideoPlayer src={selectedProject.videoUrl} language={language} />
                      )}
                    </div>
                  )}
                  
                  {/* Overview Block */}
                  <div className="space-y-8">
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
                      {selectedProject.story.map((para, pIdx) => {
                        const isWuyinPara = para.includes("夜幕幻境之中五音傩神齐聚亮相");
                        const isNandouPara = para.includes("作品以南斗六星君为创作原型");
                        const isDnfPara = para.includes("整套设计覆盖版本主 KV、角色分镜海报、团本场景界面等多类应用画面");
                        const isJiujiuPara = para.includes("山东工艺美术学院研究生学会 AIGC 卡通 IP 形象「究究」完整设计方案");
                        return (
                          <Fragment key={pIdx}>
                            <p className="tracking-wide">{para}</p>
                            {isWuyinPara && (
                              <div className="my-6 rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950/40">
                                <CustomVideoPlayer src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/wuyin-nuo.mp4" language={language} />
                              </div>
                            )}
                            {isNandouPara && (
                              <div className="my-6 rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950/40">
                                <CustomVideoPlayer src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/nandou.mp4" language={language} />
                              </div>
                            )}
                            {isDnfPara && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                                <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950/40">
                                  <CustomVideoPlayer src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/dnf1.mp4" language={language} />
                                </div>
                                <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950/40">
                                  <CustomVideoPlayer src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/dnf2.mp4" language={language} />
                                </div>
                              </div>
                            )}
                            {isJiujiuPara && (
                              <div className="my-6 flex flex-col items-center">
                                <div className="w-full max-w-2xl rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950/40">
                                  <CustomVideoPlayer src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/logo.mp4" language={language} />
                                </div>
                                <p className="text-xs md:text-sm text-zinc-400 mt-3 font-sans tracking-wide text-center">
                                  “究究”成为山东工艺美术学院“橙芽同学”绘画工作室品牌IP代言人
                                </p>
                              </div>
                            )}
                          </Fragment>
                        );
                      })}
                    </div>
                  </div>

                  {/* Curated Media Showcase/Gallery */}
                  <div className="space-y-8">
                    {selectedProject.id === "vid-1" && (
                        <div className="space-y-8">
                            <div className="flex items-center gap-2.5 border-b border-white/5 pb-2.5">
                              <span className="w-2 h-2 rounded-full bg-sky-300" />
                              <h2 className="text-sm md:text-base uppercase tracking-[0.2em] font-bold text-zinc-200">
                                {t("自媒体收获 / MEDIA ACHIEVEMENTS", "MEDIA ACHIEVEMENTS")}
                              </h2>
                            </div>
                            
                            {/* Card 1: Xiaohongshu */}
                            <div className="space-y-3">
                              <div className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-xl border border-white/5" onClick={() => setLightboxState({ images: ["https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003203649.webp"], index: 0 })}>
                                  <img src="https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003203649.webp" alt="Media Achievements" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
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
                              <div className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-xl border border-white/5" onClick={() => setLightboxState({ images: ["https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260626222446052.webp"], index: 0 })}>
                                  <img src="https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260626222446052.webp" alt="Xinpianchang Achievements" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
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
                                  <ArrowUpRight className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            </div>
                        </div>
                    )}

                    {selectedProject.id === "vid-1" && (
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
                            "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003245431.webp",
                            "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003258200.webp"
                          ].map((imgUrl, idx) => {
                            const arr = [
                              "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003245431.webp",
                              "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003258200.webp",
                              "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003324908.webp",
                              "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003337365.webp",
                              "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003348195.webp"
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
                            "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003324908.webp",
                            "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003337365.webp",
                            "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003348195.webp"
                          ].map((imgUrl, idx) => {
                            const arr = [
                              "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003245431.webp",
                              "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003258200.webp",
                              "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003324908.webp",
                              "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003337365.webp",
                              "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003348195.webp"
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
                              "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003038385.webp",
                              "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003057911.webp",
                              "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003111222.webp",
                              "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003122761.webp"
                            ].map((imgUrl, idx) => {
                              const arr = [
                                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003038385.webp",
                                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003057911.webp",
                                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003111222.webp",
                                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003122761.webp"
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
                        </div>
                      </div>
                    )}

                    {selectedProject.id === "vid-3" && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-2.5 border-b border-white/5 pb-2.5">
                              <span className="w-2 h-2 rounded-full bg-sky-300" />
                              <h2 className="text-sm md:text-base uppercase tracking-[0.2em] font-bold text-zinc-200">
                                {t("自媒体收获 / MEDIA ACHIEVEMENTS", "MEDIA ACHIEVEMENTS")}
                              </h2>
                            </div>
                            <div className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-xl border border-white/5" onClick={() => setLightboxState({ images: ["https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003847949.webp"], index: 0 })}>
                                <img src="https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003847949.webp" alt="Media Achievements" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                                <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
                                  {t("点击查看大图", "Click to Zoom")}
                                </div>
                            </div>
                            <div className="text-center text-zinc-400 text-sm mt-3 tracking-widest font-light">
                              {t("B站10w+播放", "100k+ Views on Bilibili")}
                            </div>
                        </div>
                    )}

                    {selectedProject.id !== "vid-2" && selectedProject.id !== "vid-11" && selectedProject.id !== "vid-12" && selectedProject.id !== "vid-13" && (
                    <div className="flex items-center gap-2.5 border-b border-white/5 pb-2.5">
                      <span className="w-2 h-2 rounded-full bg-sky-300" />
                      <h2 className="text-sm md:text-base uppercase tracking-[0.2em] font-bold text-zinc-200">
                        {selectedProject.id === "vid-4" || selectedProject.id === "vid-5"
                          ? t("短片展示（二） / FEATURED CINEMATIC SHORT (II)", "FEATURED CINEMATIC SHORT (II)")
                          : selectedProject.id === "vid-3"
                            ? t("工作流设计 / WORKFLOW DESIGN", "WORKFLOW DESIGN")
                            : selectedProject.id === "vid-1"
                              ? t("视觉分镜资产 / CONCEPTUAL STORYBOARDS", "CONCEPTUAL STORYBOARDS")
                              : (selectedProject.id === "vid-6" || selectedProject.id === "vid-7" || selectedProject.id === "vid-8" || selectedProject.id === "vid-9")
                                  ? t("作品详细 / WORK DETAILS", "WORK DETAILS")
                                  : t("精选创作成品 / VISUAL GALLERY", "VISUAL GALLERY")}
                      </h2>
                    </div>
                    )}

                    {/* Conditional video for CyberpunkGO project (id: vid-4) placed ABOVE the two images */}
                    {selectedProject.id === "vid-4" && (
                      <div className="space-y-6">
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
                                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623004032798.webp",
                                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623004044178.webp",
                                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623004055288.webp"
                              ].map((imgUrl, gIdx, arr) => (
                                <div key={gIdx} className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full aspect-video rounded-2xl border border-white/5" onClick={() => setLightboxState({images: arr, index: gIdx})}>
                                  <img src={imgUrl} alt="Visual Scene Asset" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
                                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                                  <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
                                    {t("点击查看大图", "Click to Zoom")}
                                  </div>
                                </div>
                              ))}
                            </div>
                        </div>
                      </div>
                    )}

                    {/* Conditional video for Return to Earth (id: vid-5) placed ABOVE the two images */}
                    {selectedProject.id === "vid-5" && (
                      <div className="space-y-6">
                        <CustomVideoPlayer src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/five%EF%BC%882%EF%BC%89.mp4" language={language} />
                        <div className="space-y-4">
                          <div className="pl-5 border-l-3 border-sky-400/80 italic text-zinc-250 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed py-2.5 bg-sky-400/[0.02]">
                            “谁又会为太阳的西坠而感到哀伤呢？”
                          </div>
                          <div className="space-y-4 text-zinc-350 text-sm sm:text-base md:text-lg lg:text-lg leading-[1.85] font-sans font-light text-justify">
                            <p className="tracking-wide">《重返地球：42 号远航队》第二集来到“北京”，将探索步履延伸向山野深处。瀑布垂落、荒草漫生，远航队穿行于被自然包裹的古建与旧城遗迹，在山川与人文的交融里触摸人类情感的底色，让消散的文明以记忆的方式温柔延续。</p>
                            <p className="tracking-wide">本片属于散文式 AI 影片集篇目，由个人全流程独立创作完成，选用 Seedance 2.0、Kling、Midjourney 与 NanoBanana Pro 模型制作，以灵动的自然光影与氛围感镜头延展诗意叙事，在极简表达中完成对文明重生的诗意思考。</p>
                          </div>
                        </div>

                        {/* Workflow Breakdown for vid-5 */}
                        <div className="space-y-8 pt-6">
                            <div className="flex items-center gap-2.5 border-b border-white/5 pb-2.5">
                              <span className="w-2 h-2 rounded-full bg-sky-300" />
                              <h2 className="text-sm md:text-base uppercase tracking-[0.2em] font-bold text-zinc-200">
                                {t("工作流拆解 / WORKFLOW BREAKDOWN", "WORKFLOW BREAKDOWN")}
                              </h2>
                            </div>
                            <div className="flex flex-col gap-6 w-full">
                              {[
                                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623004154038.webp",
                                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623004204584.webp",
                                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623004217131.webp",
                                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623004230317.webp",
                                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623004306129.webp"
                              ].map((imgUrl, gIdx, arr) => (
                                <div key={gIdx} className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-xl border border-white/5" onClick={() => setLightboxState({images: arr, index: gIdx})}>
                                  <img src={imgUrl} alt="Workflow Breakdown" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
                                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                                  <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
                                    {t("点击查看大图", "Click to Zoom")}
                                  </div>
                                </div>
                              ))}
                            </div>
                        </div>
                      </div>
                    )}

                    <div className={
                      ["comm-1", "comm-2", "comm-3", "comm-4", "illus-1", "oth-1", "oth-2", "brand-3", "brand-4", "vid-3", "vid-6", "vid-7", "vid-8", "vid-9"].includes(selectedProject.id) 
                        ? "flex flex-col gap-6 w-full" 
                        : selectedProject.id === "vid-1"
                          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8"
                          : "grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
                    }>
                      {selectedProject.gallery.map((imgUrl, gIdx, arr) => (
                        <div key={gIdx} className={`group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full ${["comm-1", "comm-2", "comm-3", "comm-4", "illus-1", "oth-1", "oth-2", "brand-3", "brand-4", "vid-3", "vid-6", "vid-7", "vid-8", "vid-9"].includes(selectedProject.id) ? "rounded-xl border border-white/5" : "aspect-video rounded-2xl border border-white/5"}`} onClick={() => setLightboxState({images: arr, index: gIdx})}>
                          <img
                            src={imgUrl}
                            alt="Visual fragment"
                            className={`w-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100 ${["comm-1", "comm-2", "comm-3", "comm-4", "illus-1", "oth-1", "oth-2", "brand-3", "brand-4", "vid-3", "vid-6", "vid-7", "vid-8", "vid-9"].includes(selectedProject.id) ? "h-auto" : "h-full"}`}
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                          <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
                            {t("点击查看大图", "Click to Zoom")}
                          </div>
                        </div>
                      ))}
                    </div>

                    {selectedProject.id === "vid-2" && (
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
                                  "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003528472.webp",
                                  "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003541296.webp",
                                  "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003553176.webp",
                                  "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003608886.webp",
                                  "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003620460.webp",
                                  "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003632706.webp"
                                ].map((imgUrl, gIdx, arr) => (
                                  <div key={gIdx} className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full aspect-video rounded-2xl border border-white/5" onClick={() => setLightboxState({images: arr, index: gIdx})}>
                                    <img src={imgUrl} alt="Character & Scene Asset" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                                    <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
                                      {t("点击查看大图", "Click to Zoom")}
                                    </div>
                                  </div>
                                ))}
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
                                  "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003649063.webp",
                                  "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003702549.webp",
                                  "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003730234.webp",
                                  "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003740707.webp",
                                  "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003752421.webp",
                                  "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623003802637.webp"
                                ].map((imgUrl, gIdx, arr) => (
                                  <div key={gIdx} className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full aspect-video rounded-2xl border border-white/5" onClick={() => setLightboxState({images: arr, index: gIdx})}>
                                    <img src={imgUrl} alt="Conceptual Storyboards" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                                    <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
                                      {t("点击查看大图", "Click to Zoom")}
                                    </div>
                                  </div>
                                ))}
                              </div>
                          </div>
                        </>
                    )}

                    {selectedProject.id === "vid-12" && (
                      <div className="space-y-8 -mt-4 md:-mt-6">
                        <div className="space-y-6">
                          <div className="flex items-center gap-2.5 border-b border-white/5 pb-2.5">
                            <span className="w-2 h-2 rounded-full bg-sky-300" />
                            <h2 className="text-sm md:text-base uppercase tracking-[0.2em] font-bold text-zinc-200">
                              {t("美术资产 / ART ASSETS", "ART ASSETS")}
                            </h2>
                          </div>

                          {/* Row 1: 3 cards */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
                            {[
                              "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010015651.webp",
                              "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010030727.webp",
                              "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010043783.webp"
                            ].map((imgUrl, idx) => {
                              const arr = [
                                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010015651.webp",
                                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010030727.webp",
                                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010043783.webp",
                                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010058475.webp",
                                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010111949.webp",
                                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010125471.webp"
                              ];
                              return (
                                <div key={`${selectedProject.id}-r1-${idx}`} className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full aspect-video rounded-2xl border border-white/5" onClick={() => setLightboxState({images: arr, index: idx})}>
                                  <img src={imgUrl} alt="Character & Scene Asset" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
                                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                                  <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
                                    {t("点击查看大图", "Click to Zoom")}
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Row 2: 3 cards */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
                            {[
                              "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010058475.webp",
                              "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010111949.webp",
                              "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010125471.webp"
                            ].map((imgUrl, idx) => {
                              const arr = [
                                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010015651.webp",
                                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010030727.webp",
                                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010043783.webp",
                                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010058475.webp",
                                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010111949.webp",
                                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010125471.webp"
                              ];
                              return (
                                <div key={`${selectedProject.id}-r2-${idx}`} className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full aspect-video rounded-2xl border border-white/5" onClick={() => setLightboxState({images: arr, index: 3 + idx})}>
                                  <img src={imgUrl} alt="Character & Scene Asset" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
                                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                                  <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
                                    {t("点击查看大图", "Click to Zoom")}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedProject.id === "vid-13" && (
                      <div className="space-y-8 -mt-4 md:-mt-6">
                        <div className="space-y-6">
                          <div className="flex items-center gap-2.5 border-b border-white/5 pb-2.5">
                            <span className="w-2 h-2 rounded-full bg-sky-300" />
                            <h2 className="text-sm md:text-base uppercase tracking-[0.2em] font-bold text-zinc-200">
                              {t("美术资产 / ART ASSETS", "ART ASSETS")}
                            </h2>
                          </div>

                          {/* Row 1: 3 cards */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
                            {[
                              "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010226522.webp",
                              "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010302570.webp",
                              "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010317896.webp"
                            ].map((imgUrl, idx) => {
                              const arr = [
                                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010226522.webp",
                                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010302570.webp",
                                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623010317896.webp"
                              ];
                              return (
                                <div key={`${selectedProject.id}-r1-${idx}`} className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full aspect-video rounded-2xl border border-white/5" onClick={() => setLightboxState({images: arr, index: idx})}>
                                  <img src={imgUrl} alt="Art Asset" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
                                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                                  <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
                                    {t("点击查看大图", "Click to Zoom")}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedProject.id === "vid-11" && (
                      <div className="space-y-8 -mt-4 md:-mt-6">
                        <div className="space-y-6">
                          <div className="flex items-center gap-2.5 border-b border-white/5 pb-2.5">
                            <span className="w-2 h-2 rounded-full bg-sky-300" />
                            <h2 className="text-sm md:text-base uppercase tracking-[0.2em] font-bold text-zinc-200">
                              {t("美术资产 / ART ASSETS", "ART ASSETS")}
                            </h2>
                          </div>

                          {/* Row 1: 2 cards */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                            {[
                              "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623005816069.webp",
                              "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623005827860.webp"
                            ].map((imgUrl, idx) => {
                              const arr = [
                                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623005816069.webp",
                                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623005827860.webp",
                                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623005841087.webp",
                                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623005852169.webp",
                                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623005906818.webp"
                              ];
                              return (
                                <div key={`vid-11-r1-${idx}`} className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full aspect-video rounded-2xl border border-white/5" onClick={() => setLightboxState({images: arr, index: idx})}>
                                  <img src={imgUrl} alt="Character & Scene Asset" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
                                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                                  <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
                                    {t("点击查看大图", "Click to Zoom")}
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Row 2: 3 cards */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
                            {[
                              "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623005841087.webp",
                              "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623005852169.webp",
                              "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623005906818.webp"
                            ].map((imgUrl, idx) => {
                              const arr = [
                                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623005816069.webp",
                                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623005827860.webp",
                                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623005841087.webp",
                                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623005852169.webp",
                                "https://cdn.jsdelivr.net/gh/BerryChen1/img-bed/images/20260623005906818.webp"
                              ];
                              return (
                                <div key={`vid-11-r2-${idx}`} className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full aspect-video rounded-2xl border border-white/5" onClick={() => setLightboxState({images: arr, index: 2 + idx})}>
                                  <img src={imgUrl} alt="Character & Scene Asset" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
                                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                                  <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
                                    {t("点击查看大图", "Click to Zoom")}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Return block */}
                  <div className="pt-8">
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="liquid-glass border border-white/10 text-neutral-300 font-medium text-xs py-3.5 px-8 rounded-full hover:text-white active:scale-95 transition-all duration-300 cursor-pointer uppercase font-mono tracking-widest flex items-center gap-2"
                    >
                      ← 返回目录 / Back to catalog
                    </button>
                  </div>

                </div>

              </div>
              
            </div>
          </motion.div>
        </div>
        )}
      </AnimatePresence>

      {/* Floating Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-[140] w-10 h-10 rounded-full bg-black/60 border border-white/10 backdrop-blur-md flex items-center justify-center text-zinc-400 hover:text-white hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg"
            title={t("回到顶部", "Scroll to Top")}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Dynamic Toast Feedback Overlay */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 30, x: '-50%' }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-neutral-900 border border-white/10 text-neutral-200 text-xs md:text-sm py-3.5 px-6 rounded-xl shadow-2xl flex items-center gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxState && (
          <ZoomableLightbox
            url={lightboxState.images[lightboxState.index]}
            onClose={() => setLightboxState(null)}
            language={language}
            t={t}
            onNext={() => setLightboxState({ images: lightboxState.images, index: lightboxState.index + 1 })}
            onPrev={() => setLightboxState({ images: lightboxState.images, index: lightboxState.index - 1 })}
            hasNext={lightboxState.index < lightboxState.images.length - 1}
            hasPrev={lightboxState.index > 0}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
