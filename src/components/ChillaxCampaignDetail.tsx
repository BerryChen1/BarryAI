import React from 'react';

interface ChillaxCampaignDetailProps {
  language: 'zh' | 'en';
  t: (zh: any, en: any) => any;
  setLightboxState: (state: { images: string[]; index: number }) => void;
  gallery: string[];
}

export function ChillaxCampaignDetail({ language, t, setLightboxState, gallery }: ChillaxCampaignDetailProps) {
  const openZoom = (idx: number) => {
    setLightboxState({ images: gallery, index: idx });
  };

  return (
    <div className="space-y-10 text-left w-full font-sans">
      {/* Project Banner Title & Main Overview */}
      <div className="p-6 md:p-8 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-4 shadow-2xl">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug">
          LIVE FREELY 2033 地球慵懒节：
          <span className="block mt-1 sm:mt-1.5">AIGC 情绪营销 Campaign 视觉企划</span>
        </h3>
        
        {/* Main Cover Key Visual */}
        <div className="pt-2">
          <div 
            className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-xl border border-white/10"
            onClick={() => openZoom(0)}
          >
            <img 
              src="/images/20260810201007869.webp" 
              alt="LIVE FREELY 2033 Hero KV" 
              className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" 
              referrerPolicy="no-referrer" 
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
            <div className="absolute bottom-4 right-4 bg-black/70 border border-white/10 text-[10px] text-zinc-300 px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
              {t("点击查看大图", "Click to Zoom")}
            </div>
          </div>
        </div>

        <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-light pt-2">
          本项目是一次主打“情绪价值”的现象级概念营销活动（Campaign）视觉企划。类似“地球一小时”倡导环保，本次活动以“2033 地球慵懒节”与“CHILLAX NOW 宇宙摸鱼季”为核心话题，将当代年轻人渴望松弛、拒绝内卷的情绪诉求，转化为一场极具治愈感与号召力的 3D 视觉盛宴。
        </p>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-light">
          本案以标准化的 SOP（标准作业程序）形式，完整展示了从活动基调探索、主视觉（KV）定调、物料模块化拆解，到最终线下媒介投放与活动文创周边开发的工业级 AIGC 视觉管线。
        </p>
      </div>

      {/* Phase 01 */}
      <div className="space-y-6 pt-2">
        <div className="border-l-4 border-sky-400 pl-4 space-y-1">
          <h4 className="text-lg md:text-xl font-bold text-sky-300 tracking-wide">
            Phase 01 / 活动视觉基调探索 (Campaign Concept & Visual Baseline)
          </h4>
          <p className="text-xs md:text-sm text-zinc-400 font-mono">
            目标：捕获活动核心情绪，确立高质感、反常规的 3D 材质语言。
          </p>
        </div>
        <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-light">
          一场成功的营销 Campaign 需要精准锚定其传达的“情绪价值”。通过早期的视觉探索，确立了本次活动“极致松弛”的核心氛围。
        </p>

        <div className="space-y-8 pl-1 md:pl-2">
          {/* Step 1 */}
          <div className="space-y-3">
            <h5 className="text-sm md:text-base font-semibold text-zinc-200">
              <span className="text-sky-400 font-mono mr-2">Step 1</span>情绪板与范式提取：
              <span className="font-normal text-zinc-300 ml-1">在项目初期，生成了一张极具慵懒氛围的概念图作为活动的视觉锚点。从中提取出本次 Campaign 的核心视觉符号：地球形状的懒人沙发、极度夸张的毛绒拖鞋、冒热气的马克杯以及云朵元素。</span>
            </h5>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full aspect-[16/10] rounded-xl border border-white/10"
                onClick={() => openZoom(1)}
              >
                <img src="/images/20260810201026613.webp" alt="Step 1 情绪板与范式提取 A" className="w-full h-full object-cover object-top group-hover:scale-[1.01] transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
                <div className="absolute bottom-4 right-4 bg-black/70 border border-white/10 text-[10px] text-zinc-300 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                  {t("点击查看大图", "Click to Zoom")}
                </div>
              </div>
              <div 
                className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full aspect-[16/10] rounded-xl border border-white/10"
                onClick={() => openZoom(2)}
              >
                <img src="/images/20260810201057668.webp" alt="Step 1 情绪板与范式提取 B" className="w-full h-full object-cover object-center group-hover:scale-[1.01] transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
                <div className="absolute bottom-4 right-4 bg-black/70 border border-white/10 text-[10px] text-zinc-300 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                  {t("点击查看大图", "Click to Zoom")}
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-3">
            <h5 className="text-sm md:text-base font-semibold text-zinc-200">
              <span className="text-sky-400 font-mono mr-2">Step 2</span>材质语言定义：
              <span className="font-normal text-zinc-300 ml-1">为配合“慵懒”的主题，放弃了传统的平滑 3D 渲染，确立了以“羊毛毡（Felt）、粗针织（Knit）、哑光陶瓷与黏土”为主的材质语言。这种温暖、毛茸茸的物理触感，从视觉根源上强化了活动的“治愈系”调性。</span>
            </h5>
          </div>
        </div>
      </div>

      {/* Phase 02 */}
      <div className="space-y-6 pt-6 border-t border-white/5">
        <div className="border-l-4 border-sky-400 pl-4 space-y-1">
          <h4 className="text-lg md:text-xl font-bold text-sky-300 tracking-wide">
            Phase 02 / 主视觉确立与物料模块化 (Key Visual & Collateral Modularization)
          </h4>
          <p className="text-xs md:text-sm text-zinc-400 font-mono">
            目标：完成活动主视觉（KV）定型，并建立可无限复用的标准化素材库。
          </p>
        </div>
        <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-light">
          在确立基调后，项目正式进入 KV 产出阶段，并将整体视觉进行模块化拆解，以适应线上线下的多渠道分发。
        </p>

        <div className="space-y-8 pl-1 md:pl-2">
          {/* Step 1 */}
          <div className="space-y-3">
            <h5 className="text-sm md:text-base font-semibold text-zinc-200">
              <span className="text-sky-400 font-mono mr-2">Step 1</span>核心 KV 输出：
              <span className="font-normal text-zinc-300 ml-1">生成了符合“地球慵懒节 2033”主题的男版主视觉。画面色彩采用高饱和的波普对比色，文字排版融入了膨胀气球质感的 3D 字体，确保了活动海报在第一眼就能产生极强的视觉冲击力。</span>
            </h5>
            <div 
              className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-xl border border-white/10"
              onClick={() => openZoom(3)}
            >
              <img src="/images/20260810201213304.webp" alt="Step 1 核心 KV 输出" className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
              <div className="absolute bottom-4 right-4 bg-black/70 border border-white/10 text-[10px] text-zinc-300 px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                {t("点击查看大图", "Click to Zoom")}
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-3">
            <h5 className="text-sm md:text-base font-semibold text-zinc-200">
              <span className="text-sky-400 font-mono mr-2">Step 2</span>视觉资产网格化（Grid System）：
              <span className="font-normal text-zinc-300 ml-1">将复杂的 KV 场景拆解为独立的、白底抠图级别的 UI 卡片素材（角色表情特写、马克杯、毛绒拖鞋、捏星星的手、地球沙发等）。这种标准化的素材库构建，极大提升了后续宣发海报、H5 页面的设计效率。</span>
            </h5>
            <div 
              className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-xl border border-white/10"
              onClick={() => openZoom(4)}
            >
              <img src="/images/20260810201234896.webp" alt="Step 2 视觉资产网格化" className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
              <div className="absolute bottom-4 right-4 bg-black/70 border border-white/10 text-[10px] text-zinc-300 px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                {t("点击查看大图", "Click to Zoom")}
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="space-y-3">
            <h5 className="text-sm md:text-base font-semibold text-zinc-200">
              <span className="text-sky-400 font-mono mr-2">Step 3</span>色彩与 UI 交互规范：
              <span className="font-normal text-zinc-300 ml-1">制定了严格的活动品牌色卡（Colorways），并将 3D 资产与数字 UI 界面（如社交媒体点赞框、3D 膨胀字体排版）进行无缝融合，验证了其在社交媒体传播端的适配性。</span>
            </h5>
            <div 
              className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-xl border border-white/10"
              onClick={() => openZoom(5)}
            >
              <img src="/images/20260810201313275.webp" alt="Step 3 色彩与 UI 交互规范" className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
              <div className="absolute bottom-4 right-4 bg-black/70 border border-white/10 text-[10px] text-zinc-300 px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                {t("点击查看大图", "Click to Zoom")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phase 03 */}
      <div className="space-y-6 pt-6 border-t border-white/5">
        <div className="border-l-4 border-sky-400 pl-4 space-y-1">
          <h4 className="text-lg md:text-xl font-bold text-sky-300 tracking-wide">
            Phase 03 / AIGC 节点工作流与底层语义控制 (Node Workflow & Semantic Control)
          </h4>
          <p className="text-xs md:text-sm text-zinc-400 font-mono">
            目标：展示工业级生成管线，通过标准化 Prompt 框架实现大批量产的绝对可控。
          </p>
        </div>
        <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-light">
          应对 Campaign 级别的海量物料需求，高质量的输出必须建立在严谨的底层逻辑之上。
        </p>

        <div className="space-y-8 pl-1 md:pl-2">
          {/* Step 1 */}
          <div className="space-y-3">
            <h5 className="text-sm md:text-base font-semibold text-zinc-200">
              <span className="text-sky-400 font-mono mr-2">Step 1</span>无限画布发散与阵列对比：
              <span className="font-normal text-zinc-300 ml-1">采用无限画布作为核心工作台。将不同的海报排版布局、场景变体（如不同角度的户外广告牌）以节点阵列的形式平铺，进行高效的视觉 A/B 测试。</span>
            </h5>
            <div 
              className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-xl border border-white/10"
              onClick={() => openZoom(6)}
            >
              <img src="/images/20260810201336478.webp" alt="Step 1 无限画布发散与阵列对比" className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
              <div className="absolute bottom-4 right-4 bg-black/70 border border-white/10 text-[10px] text-zinc-300 px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                {t("点击查看大图", "Click to Zoom")}
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-3">
            <h5 className="text-sm md:text-base font-semibold text-zinc-200">
              <span className="text-sky-400 font-mono mr-2">Step 2</span>结构化提示词 SOP (Prompt Engineering Framework)：
              <span className="font-normal text-zinc-300 ml-1">建立了一套严密的语义控制模板。从全局的 Split-screen layout (上下分屏布局)、Octane Render / 波普艺术 等风格约束，到针对单个活动素材的精准描述。这套标准化的框架，确保了在整个 Campaign 周期内，无论是生成新场景还是新道具，都能保持高度一致的商业 3D 质感。</span>
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-xl border border-white/10"
                onClick={() => openZoom(7)}
              >
                <img src="/images/20260810201400666.webp" alt="Step 2 结构化提示词 SOP A" className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
                <div className="absolute bottom-4 right-4 bg-black/70 border border-white/10 text-[10px] text-zinc-300 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                  {t("点击查看大图", "Click to Zoom")}
                </div>
              </div>
              <div 
                className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-xl border border-white/10"
                onClick={() => openZoom(8)}
              >
                <img src="/images/20260810201416773.webp" alt="Step 2 结构化提示词 SOP B" className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
                <div className="absolute bottom-4 right-4 bg-black/70 border border-white/10 text-[10px] text-zinc-300 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                  {t("点击查看大图", "Click to Zoom")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phase 04 */}
      <div className="space-y-6 pt-6 border-t border-white/5">
        <div className="border-l-4 border-sky-400 pl-4 space-y-1">
          <h4 className="text-lg md:text-xl font-bold text-sky-300 tracking-wide">
            Phase 04 / 宏观宣发场域与媒介视觉映射 (OOH Advertising & Media Rollout)
          </h4>
          <p className="text-xs md:text-sm text-zinc-400 font-mono">
            目标：验证活动视觉在真实物理空间中的媒介张力与信息传达效率。
          </p>
        </div>
        <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-light">
          一场现象级的 Campaign 需要通过宏观媒介来引爆话题。本环节展示了主视觉从“线上高清原图”向“线下巨幅媒介”的完美映射。
        </p>

        <div className="space-y-8 pl-1 md:pl-2">
          {/* Step 1 */}
          <div className="space-y-3">
            <h5 className="text-sm md:text-base font-semibold text-zinc-200">
              <span className="text-sky-400 font-mono mr-2">Step 1</span>主视觉与巨幅广告的无缝转化：
              <span className="font-normal text-zinc-300 ml-1">活动海报必须兼顾数字端的精细度与户外端的视觉冲击力。在画面上半部分，高饱和的波普色彩与 3D 膨胀字体奠定了 KV 的情绪基调；在下半部分，该视觉被无缝合成至阳光明媚的街头巨幅白皮布广告牌中。在自然光影的照射下，毛绒材质与黏土的体积感被完美凸显，证明了该视觉既能扛得住线上高清展现，也能胜任线下大促级别的巨幅宣发。</span>
            </h5>
            <div 
              className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-xl border border-white/10"
              onClick={() => openZoom(9)}
            >
              <img src="/images/20260810201559514.webp" alt="Step 1 主视觉与巨幅广告的无缝转化" className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
              <div className="absolute bottom-4 right-4 bg-black/70 border border-white/10 text-[10px] text-zinc-300 px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                {t("点击查看大图", "Click to Zoom")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phase 05 */}
      <div className="space-y-6 pt-6 border-t border-white/5">
        <div className="border-l-4 border-sky-400 pl-4 space-y-1">
          <h4 className="text-lg md:text-xl font-bold text-sky-300 tracking-wide">
            Phase 05 / 多维物料延展与活动伴手礼 (Offline Collaterals & Merchandise)
          </h4>
          <p className="text-xs md:text-sm text-zinc-400 font-mono">
            目标：打通“宣发-体验”闭环，以高完成度的设计打透线下多维触点。
          </p>
        </div>

        <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-light">
          情绪价值最终需要依托实体物品与线下场景进行留存。利用前期拆解的独立 3D 资产库，项目迅速铺开了多维度的文创伴手礼与街头物料设计，完美打通了这场 Campaign 的商业闭环。从精准击中年轻职场人情感共鸣的 3D 浮雕打卡工牌，到极具波普放大效应、增强街头视觉拦截率的三联灯箱矩阵，再到自带社交分享属性的专属模切贴纸包与高精度珐琅钥匙扣样机。每一项物料都精准控制了不同介质（如金属光泽与黏土质感）的视觉对比，展现了对实体周边生产工艺的深刻理解，并保证了视觉资产在全品类触点上的高度统一。最终，项目以极具杂志排版感的 Thank You 页面收尾，在留下视觉呼吸感的同时，进一步强化了整体作品包装的完整度与专属的个人品牌印记。
        </p>

        <div className="space-y-4">
          <div 
            className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-xl border border-white/10"
            onClick={() => openZoom(10)}
          >
            <img src="/images/20260810202144888.webp" alt="Phase 05 伴手礼延展 A" className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
            <div className="absolute bottom-4 right-4 bg-black/70 border border-white/10 text-[10px] text-zinc-300 px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
              {t("点击查看大图", "Click to Zoom")}
            </div>
          </div>
          <div 
            className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-xl border border-white/10"
            onClick={() => openZoom(11)}
          >
            <img src="/images/20260810202155199.webp" alt="Phase 05 伴手礼延展 B" className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
            <div className="absolute bottom-4 right-4 bg-black/70 border border-white/10 text-[10px] text-zinc-300 px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
              {t("点击查看大图", "Click to Zoom")}
            </div>
          </div>
          <div 
            className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-xl border border-white/10"
            onClick={() => openZoom(12)}
          >
            <img src="/images/20260810202208113.webp" alt="Phase 05 伴手礼延展 C" className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
            <div className="absolute bottom-4 right-4 bg-black/70 border border-white/10 text-[10px] text-zinc-300 px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
              {t("点击查看大图", "Click to Zoom")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
