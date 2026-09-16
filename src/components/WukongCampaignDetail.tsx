import React from 'react';
import { CustomVideoPlayer } from './CustomVideoPlayer';

interface WukongCampaignDetailProps {
  language: 'zh' | 'en';
  t: (zh: any, en: any) => any;
  setLightboxState: (state: { images: string[]; index: number }) => void;
  gallery: string[];
}

export function WukongCampaignDetail({ language, t, setLightboxState, gallery }: WukongCampaignDetailProps) {
  const openZoom = (idx: number) => {
    setLightboxState({ images: gallery, index: idx });
  };

  return (
    <div className="space-y-10 text-left w-full font-sans">
      {/* Project Banner Title & Main Overview */}
      <div className="space-y-6">
        
        
        {/* Main Cover Key Visual */}
      </div>
      {/* Phase 01 */}
      <div className="space-y-6 pt-2">
        <div className="border-l-4 border-red-500 pl-4 space-y-1">
          <h4 className="text-lg md:text-xl font-bold text-red-400 tracking-wide">
            Phase 01 / 核心视觉定调与动态先导 (Key Visual & Dynamic Teaser)
          </h4>
          <p className="text-xs md:text-sm text-zinc-400 font-mono">
            目标：以极具张力的主视觉与动态媒介，瞬间引爆“大圣出列”的营销话题。
          </p>
        </div>
        <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-light">
          作为一场主打“文化碰撞与街头能量”的现象级限时快闪营销事件（Pop-up Campaign），“WUKONG'S 24H”将中国传统符号“孙悟空”与 adidas 街头基因深度融合。本案以标准化 SOP 展示了从主视觉爆发到线下周边落地的工业级视觉管线；而视觉的第一眼冲击力，更是决定了这场跨界联名活动的传播广度。
        </p>

        <div className="space-y-8 pl-1 md:pl-2">
          {/* Step 1 */}
          <div className="space-y-3">
            <h5 className="text-sm md:text-base font-semibold text-zinc-200">
              <span className="text-red-400 font-mono mr-2">Step 1</span>破圈主视觉（KV）爆发：
              <span className="font-normal text-zinc-300 ml-1">画面采用广角微鱼眼透视，大圣身穿红黑撞色机能防风外套，手持金箍棒，单脚踩在木质取货柜台上，将一双巨大的红黑金配色 adidas Superstar 球鞋怼近镜头。极具压迫感与潮玩质感的 3D 角色，配合极具张力的书法字体“大圣出列，为你服务”，瞬间拉满了线下快闪店的赛博朋克潮流氛围。</span>
            </h5>
            
            <div 
              className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-none border border-white/10"
              onClick={() => openZoom(0)}
            >
              <img loading="lazy" decoding="async" src="/images/20260810210257417.webp" alt="Step 1 破圈主视觉（KV）爆发" className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
              <div className="absolute bottom-4 right-4 bg-black/70 border border-white/10 text-[10px] text-zinc-300 px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                {t("点击查看大图", "Click to Zoom")}
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-3">
            <h5 className="text-sm md:text-base font-semibold text-zinc-200">
              <span className="text-red-400 font-mono mr-2">Step 2</span>动态短片赋能（Img2Video 视觉延展）：
            </h5>
            
            <div className="rounded-none overflow-hidden border border-white/10 bg-black/60 shadow-2xl p-1 sm:p-2">
              <CustomVideoPlayer src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/eleven.mp4" language={language} />
            </div>

            <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-light pt-1">
              <span className="font-medium text-zinc-200">视觉描述：</span> 为了提升线上社交媒体的宣发声量，突破静态图像的限制。在产出极高精度的 3D KV 后，依托底层的图生视频（Img2Video）技术链路，对静帧画面进行了动态化重构。视频还原了大圣俯身递出鞋盒的流畅微动作与霓虹灯的光影流转，作为本次“WUKONG'S 24H”快闪企划的先导预告片（Teaser），极大地丰富了数字营销的物料维度。
            </p>
          </div>
        </div>
      </div>

      {/* Phase 02 */}
      <div className="space-y-6 pt-6 border-t border-white/5">
        <div className="border-l-4 border-red-500 pl-4 space-y-1">
          <h4 className="text-lg md:text-xl font-bold text-red-400 tracking-wide">
            Phase 02 / 视觉系统规范与 UI 体验映射 (Visual System & UI Mapping)
          </h4>
          <p className="text-xs md:text-sm text-zinc-400 font-mono">
            目标：提炼核心视觉资产，建立严谨的品牌色彩规范与线上线下服务体验。
          </p>
        </div>

        <div className="space-y-8 pl-1 md:pl-2">
          {/* Step 1 */}
          <div className="space-y-3">
            <h5 className="text-sm md:text-base font-semibold text-zinc-200">
              <span className="text-red-400 font-mono mr-2">Step 1</span>色彩规范与材质提取：
              <span className="font-normal text-zinc-300 ml-1">建立严格的联名色彩系统。提取“大圣红 (E60012)”、“暗夜黑 (1A1A1A)”与“筋斗云金 (FFD700)”作为本次 Campaign 的核心品牌色，确保后续所有衍生宣发物料的视觉统一。</span>
            </h5>
          </div>

          {/* Step 2 */}
          <div className="space-y-3">
            <h5 className="text-sm md:text-base font-semibold text-zinc-200">
              <span className="text-red-400 font-mono mr-2">Step 2</span>潮鞋极速服务 UI 映射：
              <span className="font-normal text-zinc-300 ml-1">将 3D 视觉与数字 UI 界面相融合。在海报中植入了时间地点信息框（TIME 14:00, 4F-407）及搜索引导（国潮大圣小店计划），将单纯的视觉图转化为带有“O2O（线上到线下）导览功能”的电商服务界面，凸显了商业设计师的交互思维。</span>
            </h5>
            <div 
              className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-none border border-white/10"
              onClick={() => openZoom(1)}
            >
              <img loading="lazy" decoding="async" src="/images/20260810210327215.webp" alt="Step 2 潮鞋极速服务 UI 映射" className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
              <div className="absolute bottom-4 right-4 bg-black/70 border border-white/10 text-[10px] text-zinc-300 px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                {t("点击查看大图", "Click to Zoom")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phase 03 */}
      <div className="space-y-6 pt-6 border-t border-white/5">
        <div className="border-l-4 border-red-500 pl-4 space-y-1">
          <h4 className="text-lg md:text-xl font-bold text-red-400 tracking-wide">
            Phase 03 / AIGC 逆向工程与节点控制流 (Reverse Engineering & Node Control)
          </h4>
          <p className="text-xs md:text-sm text-zinc-400 font-mono">
            目标：展示工业级生成管线，彻底摒弃 AI 盲盒感，实现像素级的结构与光影控制。
          </p>
        </div>
        <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-light">
          满足大厂级别的商业需求，必须深入到底层工作流的物理逻辑中。本环节以多图网格排版（Grid collage layout），展示了同场景下 AIGC 设计的严谨推演 SOP。
        </p>

        <div className="flex flex-col gap-6 w-full">
          <div 
            className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-none border border-white/10"
            onClick={() => openZoom(2)}
          >
            <img loading="lazy" decoding="async" src="/images/20260810210755058.webp" alt="Phase 03 节点控制 A" className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
            <div className="absolute bottom-4 right-4 bg-black/70 border border-white/10 text-[10px] text-zinc-300 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
              {t("点击查看大图", "Click to Zoom")}
            </div>
          </div>
          <div 
            className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-none border border-white/10"
            onClick={() => openZoom(3)}
          >
            <img loading="lazy" decoding="async" src="/images/20260810210810493.webp" alt="Phase 03 节点控制 B" className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
            <div className="absolute bottom-4 right-4 bg-black/70 border border-white/10 text-[10px] text-zinc-300 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
              {t("点击查看大图", "Click to Zoom")}
            </div>
          </div>
        </div>

        <div className="space-y-8 pl-1 md:pl-2">
          {/* Step 1 */}
          <div className="space-y-3">
            <h5 className="text-sm md:text-base font-semibold text-zinc-200">
              <span className="text-red-400 font-mono mr-2">Step 1</span>结构约束与白模渲染：
              <span className="font-normal text-zinc-300 ml-1">从线稿草图（Line Sketch）入手，利用底层的节点控制网络死死锁定广角透视与复杂的建筑/服饰结构；随后进行 3D 灰度白模（Clay Model）渲染，确保纯白环境光遮蔽下的哑光材质与物理空间关系绝对正确。</span>
            </h5>
          </div>

          {/* Step 2 */}
          <div className="space-y-3">
            <h5 className="text-sm md:text-base font-semibold text-zinc-200">
              <span className="text-red-400 font-mono mr-2">Step 2</span>材质重塑与商业合成：
              <span className="font-normal text-zinc-300 ml-1">在确认无误的骨骼基础上，进行基础底色（Basic Color）铺设，并最终输出带有极高细节的写实材质光影（高清底图）。最后叠加亮黄色的电商促销横幅与排版设计，完成最终商业成品。整个流程环环相扣，展现了顶级的 3D 视觉推演能力。</span>
            </h5>
            <div 
              className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-none border border-white/10"
              onClick={() => openZoom(4)}
            >
              <img loading="lazy" decoding="async" src="/images/20260810210355806.webp" alt="Step 2 设计过程五步拆解图" className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
              <div className="absolute bottom-4 right-4 bg-black/70 border border-white/10 text-[10px] text-zinc-300 px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                {t("点击查看大图", "Click to Zoom")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phase 04 */}
      <div className="space-y-6 pt-6 border-t border-white/5">
        <div className="border-l-4 border-red-500 pl-4 space-y-1">
          <h4 className="text-lg md:text-xl font-bold text-red-400 tracking-wide">
            Phase 04 / 全品类联名服饰与快闪文创周边 (Apparel & Merchandise Extension)
          </h4>
          <p className="text-xs md:text-sm text-zinc-400 font-mono">
            目标：打通设计到零售的闭环，输出符合高街运动品牌工业标准的实体资产包。
          </p>
        </div>
        <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-light">
          一场现象级的联名企划，其商业价值最终由丰富的 SKU（库存量单位）和实体爆款来承载。
        </p>

        <div className="space-y-8 pl-1 md:pl-2">
          {/* Step 1 */}
          <div className="space-y-3">
            <h5 className="text-sm md:text-base font-semibold text-zinc-200">
              <span className="text-red-400 font-mono mr-2">Step 1</span>高街运动服饰线（Apparel）：
              <span className="font-normal text-zinc-300 ml-1">严格按照服饰产业的展示规范，延展了包含连帽卫衣、运动夹克、短袖 TEE 在内的核心产品线。精准把控了布料材质的黑色基底与金色祥云刺绣工艺的视觉反馈。</span>
            </h5>
          </div>

          {/* Step 2 */}
          <div className="space-y-3">
            <h5 className="text-sm md:text-base font-semibold text-zinc-200">
              <span className="text-red-400 font-mono mr-2">Step 2</span>潮流配件与生活周边（Accessories & Lifestyle）：
              <span className="font-normal text-zinc-300 ml-1">将主视觉中的大圣面部特写与联名 Logo 提取，完美适配于手机壳、斜挎包、棒球帽、保温杯、马克杯等高频消费品。并设计了包含模切线的贴纸包与高规格硬质礼盒，直接满足了线下快闪店“打卡-购买-开箱”的完整消费者体验链路。</span>
            </h5>
            <div 
              className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-none border border-white/10"
              onClick={() => openZoom(5)}
            >
              <img loading="lazy" decoding="async" src="/images/20260810210436472.webp" alt="Step 2 全品类服饰与周边延展大图" className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
              <div className="absolute bottom-4 right-4 bg-black/70 border border-white/10 text-[10px] text-zinc-300 px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                {t("点击查看大图", "Click to Zoom")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phase 05 */}
      <div className="space-y-6 pt-6 border-t border-white/5">
        <div className="border-l-4 border-red-500 pl-4 space-y-1">
          <h4 className="text-lg md:text-xl font-bold text-red-400 tracking-wide">
            Phase 05 / 线下沉浸空间与第一人称交互 (Immersive Space & POV Interaction)
          </h4>
          <p className="text-xs md:text-sm text-zinc-400 font-mono">
            目标：通过视角的转换，强化消费者在线下快闪店中的沉浸式服务体验。
          </p>
        </div>

        <div className="space-y-8 pl-1 md:pl-2">
          {/* Step 1 */}
          <div className="space-y-3">
            <h5 className="text-sm md:text-base font-semibold text-zinc-200">
              <span className="text-red-400 font-mono mr-2">Step 1</span>互动视点（POV）重构：
              <span className="font-normal text-zinc-300 ml-1">除了广角的震撼海报，针对线下快闪店的体验环节，专门生成了第一人称视角（POV）的视觉图。大圣在带有发光霓虹灯的赛博朋克鞋店柜台后，双手捧着打开的联名鞋盒递向顾客，极大地拉近了虚拟角色与真实消费者的心理距离。这张图完美呼应了“大圣出列，为你服务”的 Campaign 核心主题，为整场 24 小时限时快闪活动画上了圆满的句号。</span>
            </h5>
            <div 
              className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-none border border-white/10"
              onClick={() => openZoom(6)}
            >
              <img loading="lazy" decoding="async" src="/images/20260810210500199.webp" alt="Step 1 大圣双手递鞋盒的互动视角图" className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
              <div className="absolute bottom-4 right-4 bg-black/70 border border-white/10 text-[10px] text-zinc-300 px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                {t("点击查看大图", "Click to Zoom")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
