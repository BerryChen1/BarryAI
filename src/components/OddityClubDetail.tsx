import React from 'react';
import { CustomVideoPlayer } from './CustomVideoPlayer';

interface OddityClubDetailProps {
  language: 'zh' | 'en';
  t: (zh: any, en: any) => any;
  setLightboxState: (state: { images: string[]; index: number }) => void;
  gallery: string[];
}

export function OddityClubDetail({ language, t, setLightboxState, gallery }: OddityClubDetailProps) {
  const openZoom = (idx: number) => {
    setLightboxState({ images: gallery, index: idx });
  };

  return (
    <div className="space-y-10 text-left w-full font-sans">
      <div className="space-y-6">
        <div className="pt-2">
          <div 
            className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-xl border border-white/10"
            onClick={() => openZoom(0)}
          >
            <img 
              src="/images/20260809223751589.webp" 
              alt="ODDITY CLUB 2037 KV" 
              className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" 
              referrerPolicy="no-referrer" 
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
            <div className="absolute bottom-4 right-4 bg-black/70 border border-white/10 text-[10px] text-zinc-300 px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
              {t("点击查看大图", "Click to Zoom")}
            </div>
          </div>
        </div>
      </div>

      {/* Phase 01 */}
      <div className="space-y-6 pt-2">
        <div className="border-l-4 border-sky-400 pl-4 space-y-1">
          <h4 className="text-lg md:text-xl font-bold text-sky-300 tracking-wide">
            Phase 01 / 视觉探索与范式确立 (Concept Incubation & Baseline)
          </h4>
          <p className="text-xs md:text-sm text-zinc-400 font-mono">
            目标：确立项目基调，完成从常规审美到独立商业风格的跨越。
          </p>
        </div>
        <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-light">
          在商业 IP 孵化的初期，核心在于为“怪奇研究所”寻找差异化的视觉定位。通过对参考情绪板的解构与多轮 AIGC 迭代，最终锁定了极具辨识度的废土高街风格。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 pl-1 md:pl-2 items-start">
          {/* Step 1 */}
          <div className="space-y-3 col-span-1">
            <h5 className="text-sm md:text-base font-semibold text-zinc-200">
              <span className="text-sky-400 font-mono mr-2 block mb-1">Step 1</span>提取排版范式：
              <span className="font-normal text-zinc-300 ml-1 block mt-1 text-xs md:text-sm">引入外部商业海报作为构图参考，提炼 3:4 竖版多角色站位的空间关系与信息层级排布，建立底层结构基准。</span>
            </h5>
            <div 
              className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-xl border border-white/10"
              onClick={() => openZoom(1)}
            >
              <img src="/images/20260809223905962.webp" alt="Step 1 提取排版范式" className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
              <div className="absolute bottom-4 right-4 bg-black/70 border border-white/10 text-[10px] text-zinc-300 px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                {t("点击查看大图", "Click to Zoom")}
              </div>
            </div>
          </div>
          {/* Step 2 */}
          <div className="space-y-3 col-span-1 md:col-span-2">
            <h5 className="text-sm md:text-base font-semibold text-zinc-200">
              <span className="text-sky-400 font-mono mr-2 block mb-1">Step 2</span>初稿测试与推翻：
              <span className="font-normal text-zinc-300 ml-1 block mt-1 text-xs md:text-sm">基于初始概念生成的首版测试图。因典型的平滑 3D 渲染质感以及过于沉闷的复古色调而缺乏商业辨识度，果断推翻此常规路径并进行优化</span>
            </h5>
            <div className="grid grid-cols-2 gap-4 w-full">
              <div 
                className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-xl border border-white/10"
                onClick={() => openZoom(2)}
              >
                <img src="/images/20260809223929810.webp" alt="Step 2 初稿测试 A" className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
                <div className="absolute bottom-4 right-4 bg-black/70 border border-white/10 text-[10px] text-zinc-300 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                  {t("点击查看大图", "Click to Zoom")}
                </div>
              </div>
              <div 
                className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-xl border border-white/10"
                onClick={() => openZoom(3)}
              >
                <img src="/images/20260809224006618.webp" alt="Step 2 初稿测试 B" className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
                <div className="absolute bottom-4 right-4 bg-black/70 border border-white/10 text-[10px] text-zinc-300 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                  {t("点击查看大图", "Click to Zoom")}
                </div>
              </div>
            </div>
          </div>
          {/* Step 3 */}
          <div className="space-y-3 col-span-1">
            <h5 className="text-sm md:text-base font-semibold text-zinc-200">
              <span className="text-sky-400 font-mono mr-2 block mb-1">Step 3</span>风格锁定与材质降维：
              <span className="font-normal text-zinc-300 ml-1 block mt-1 text-xs md:text-sm">最终定调，摒弃“塑料感”，追求极致的高级实体盲盒质感。怪奇的微缩比例配合复古穿搭，完美契合概念店的商业调性。</span>
            </h5>
            <div 
              className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-xl border border-white/10"
              onClick={() => openZoom(4)}
            >
              <img src="/images/20260809224137412.webp" alt="Step 3 风格锁定与材质降维" className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
              <div className="absolute bottom-4 right-4 bg-black/70 border border-white/10 text-[10px] text-zinc-300 px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                {t("点击查看大图", "Click to Zoom")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phase 02 */}
      <div className="space-y-6 pt-6 border-t border-white/5">
        <div className="border-l-4 border-sky-400 pl-4 space-y-1">
          <h4 className="text-lg md:text-xl font-bold text-sky-300 tracking-wide">
            Phase 02 / 商业世界观与去中心化 IP 矩阵 (World-building & IP Matrix)
          </h4>
          <p className="text-xs md:text-sm text-zinc-400 font-mono">
            目标：构建具备强延展性的角色生态与底层叙事逻辑。
          </p>
        </div>
        <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-light">
          ODDITY CLUB 的商业变现能力，建立在其独特的群像生态之上。
        </p>
        <div className="space-y-8 pl-1 md:pl-2">
          {/* Step 1 */}
          <div className="space-y-3">
            <h5 className="text-sm md:text-base font-semibold text-zinc-200">
              <span className="text-sky-400 font-mono mr-2">Step 1</span>平行主理人设定：
              <span className="font-normal text-zinc-300 ml-1">企划中的核心角色作为“怪奇研究所”的共同主理人，彼此之间绝对平等，没有任何上下级或从属关系。他们基于互补的怪诞性格建立起平行协作网络，为后续多 SKU 的独立代言提供了极高的自由度。</span>
            </h5>
            <div className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-xl border border-white/10" onClick={() => openZoom(5)}>
              <img src="/images/20260809224111423.webp" alt="Step 1 平行主理人设定" className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
              <div className="absolute bottom-4 right-4 bg-black/70 border border-white/10 text-[10px] text-zinc-300 px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                {t("点击查看大图", "Click to Zoom")}
              </div>
            </div>
          </div>
          {/* Step 2 */}
          <div className="space-y-3">
            <h5 className="text-sm md:text-base font-semibold text-zinc-200">
              <span className="text-sky-400 font-mono mr-2">Step 2</span>视觉矩阵发散：
              <span className="font-normal text-zinc-300 ml-1">在既定风格下，通过改变参考图与主题的权重，生成丰富的角色状态、怪奇配件与头像矩阵，完成 IP 库的初级积累，并且生成相应的2D手绘风格插画提高丰富度。</span>
            </h5>
            <div className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-xl border border-white/10" onClick={() => openZoom(6)}>
              <img src="/images/20260809224217524.png" alt="Step 2 视觉矩阵发散" className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
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
            Phase 03 / AIGC 节点控制与底层工作流 (Node Control & Underlying Workflow)
          </h4>
          <p className="text-xs md:text-sm text-zinc-400 font-mono">
            目标：消解 AI 盲盒效应，建立具备工业级精度与质感的可控管线。
          </p>
        </div>
        <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-light">
          要满足顶级商业落地标准，创意工作流必须深入到底层模型的调度与结构约束中。
        </p>
        <div className="space-y-8 pl-1 md:pl-2">
          {/* Step 1 */}
          <div className="space-y-3">
            <h5 className="text-sm md:text-base font-semibold text-zinc-200">
              <span className="text-sky-400 font-mono mr-2">Step 1</span>无限画布与全局调度：
              <span className="font-normal text-zinc-300 ml-1">采用 LibTV 无限画布模式，将所有资产的演进轨迹以节点网络形式平铺，实现跨品类资产的协同生成。</span>
            </h5>
            <div className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-xl border border-white/10" onClick={() => openZoom(7)}>
              <img src="/images/20260809224307248.webp" alt="Step 1 无限画布与全局调度" className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
              <div className="absolute bottom-4 right-4 bg-black/70 border border-white/10 text-[10px] text-zinc-300 px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                {t("点击查看大图", "Click to Zoom")}
              </div>
            </div>
          </div>
          {/* Step 2 */}
          <div className="space-y-3">
            <h5 className="text-sm md:text-base font-semibold text-zinc-200">
              <span className="text-sky-400 font-mono mr-2">Step 2</span>语义约束与物理干预：
              <span className="font-normal text-zinc-300 ml-1">强制写入“哑光 PVC、粗糙搪胶”等指令，并对齐底层模型的物理生成逻辑，确保质感达标。</span>
            </h5>
            <div className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-xl border border-white/10" onClick={() => openZoom(8)}>
              <img src="/images/20260809224331975.webp" alt="Step 2 语义约束与物理干预" className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
              <div className="absolute bottom-4 right-4 bg-black/70 border border-white/10 text-[10px] text-zinc-300 px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                {t("点击查看大图", "Click to Zoom")}
              </div>
            </div>
          </div>
          {/* Step 3 */}
          <div className="space-y-3">
            <h5 className="text-sm md:text-base font-semibold text-zinc-200">
              <span className="text-sky-400 font-mono mr-2">Step 3</span>结构逆向工程：
              <span className="font-normal text-zinc-300 ml-1">提取线稿（Lineart）锁定透视骨骼，并利用三维白模建立多角色互动时的准确物理空间关系，确保复杂材质下的结构严谨性。</span>
            </h5>
            <div className="space-y-4">
              <div className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-xl border border-white/10" onClick={() => openZoom(9)}>
                <img src="/images/20260809224405477.webp" alt="Step 3 结构逆向工程 线稿" className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
                <div className="absolute bottom-4 right-4 bg-black/70 border border-white/10 text-[10px] text-zinc-300 px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                  {t("点击查看大图", "Click to Zoom")}
                </div>
              </div>
              <div className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-xl border border-white/10" onClick={() => openZoom(10)}>
                <img src="/images/20260809224432013.webp" alt="Step 3 结构逆向工程 三维白模" className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
                <div className="absolute bottom-4 right-4 bg-black/70 border border-white/10 text-[10px] text-zinc-300 px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
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
            Phase 04 / 场域测试与复合叙事空间 (Spatial Testing & Scene Narrative)
          </h4>
          <p className="text-xs md:text-sm text-zinc-400 font-mono">
            目标：验证 IP 资产在复杂商业环境与宏大场景中的视觉稳定性。
          </p>
        </div>
        <div className="space-y-8 pl-1 md:pl-2">
          {/* Step 2 */}
          <div className="space-y-3">
            <h5 className="text-sm md:text-base font-semibold text-zinc-200">
              <span className="text-sky-400 font-mono mr-2">Step</span>复合场景压力测试：
              <span className="font-normal text-zinc-300 ml-1">将资产置入高密度的叙事空间（复古办公室、末班地铁）。在全局光照与金属反光下，角色群像依然维持极高辨识度。</span>
            </h5>
            <div 
              className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-xl border border-white/10"
              onClick={() => openZoom(11)}
            >
              <img src="/images/20260809224543802.webp" alt="复合场景压力测试" className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
              <div className="absolute bottom-4 right-4 bg-black/70 border border-white/10 text-[10px] text-zinc-300 px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                {t("点击查看大图", "Click to Zoom")}
              </div>
            </div>
          </div>
          {/* Step 3 */}
          <div className="space-y-3">
            <h5 className="text-sm md:text-base font-semibold text-zinc-200">
              <span className="text-sky-400 font-mono mr-2">Step</span>微观情绪渲染：
              <span className="font-normal text-zinc-300 ml-1">脱离大场景，测试在特写镜头（电话亭、叶片蜗牛、复古电视塔）下的光影氛围塑造能力。</span>
            </h5>
            <div 
              className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-xl border border-white/10"
              onClick={() => openZoom(12)}
            >
              <img src="/images/20260809224603318.webp" alt="微观情绪渲染" className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
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
            Phase 05 / 商业延展与实物级资产输出 (Commercial Output & Merchandising)
          </h4>
          <p className="text-xs md:text-sm text-zinc-400 font-mono">
            目标：打通设计到变现的最后一公里，输出符合工业标准的周边样机。
          </p>
        </div>
        <div className="space-y-8 pl-1 md:pl-2">
          {/* Step 1 */}
          <div className="space-y-3">
            <h5 className="text-sm md:text-base font-semibold text-zinc-200">
              <span className="text-sky-400 font-mono mr-2">Step 1</span>纺织品与工业规范：
              <span className="font-normal text-zinc-300 ml-1">产出高街服饰样机，并附带尺码表、领标、织唛等完整规范资产包，证明其已具备直接对接工厂生产的闭环能力。</span>
            </h5>
            <div className="flex flex-col gap-6 w-full">
              <div 
                className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-xl border border-white/10"
                onClick={() => openZoom(13)}
              >
                <img src="/images/20260809224739445.webp" alt="Step 1 服饰样机 A" className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
                <div className="absolute bottom-4 right-4 bg-black/70 border border-white/10 text-[10px] text-zinc-300 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                  {t("点击查看大图", "Click to Zoom")}
                </div>
              </div>
              <div 
                className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-xl border border-white/10"
                onClick={() => openZoom(14)}
              >
                <img src="/images/20260809224653969.webp" alt="Step 1 服饰周边 B" className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
                <div className="absolute bottom-4 right-4 bg-black/70 border border-white/10 text-[10px] text-zinc-300 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                  {t("点击查看大图", "Click to Zoom")}
                </div>
              </div>
            </div>
            <div 
              className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-xl border border-white/10 mt-4"
              onClick={() => openZoom(15)}
            >
              <img src="/images/20260809224848320.webp" alt="Step 1 服饰全资产展示板" className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
              <div className="absolute bottom-4 right-4 bg-black/70 border border-white/10 text-[10px] text-zinc-300 px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                {t("点击查看大图", "Click to Zoom")}
              </div>
            </div>
          </div>
          {/* Step 2 */}
          <div className="space-y-3">
            <h5 className="text-sm md:text-base font-semibold text-zinc-200">
              <span className="text-sky-400 font-mono mr-2">Step 2</span>底层模型切换与插画周边：
              <span className="font-normal text-zinc-300 ml-1">依托基座模型的原生泛化能力，无缝切换至 2D 高阶插画大模型，实现同构 IP 资产的无损降维，完美适配滑板、手机壳等街头配件。</span>
            </h5>
            <div 
              className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-xl border border-white/10"
              onClick={() => openZoom(16)}
            >
              <img src="/images/20260809224926227.webp" alt="Step 2 多色滑板与手机壳全家福" className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
              <div className="absolute bottom-4 right-4 bg-black/70 border border-white/10 text-[10px] text-zinc-300 px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                {t("点击查看大图", "Click to Zoom")}
              </div>
            </div>
          </div>
          {/* Step 3 */}
          <div className="space-y-3">
            <h5 className="text-sm md:text-base font-semibold text-zinc-200">
              <span className="text-sky-400 font-mono mr-2">Step 3</span>宏观物理介质落地：
              <span className="font-normal text-zinc-300 ml-1">部署线下巨幅 LED 商业广告牌与高分辨率地垫，夯实“怪奇研究所”的物理商业属性。</span>
            </h5>
            <div 
              className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full rounded-xl border border-white/10"
              onClick={() => openZoom(17)}
            >
              <img src="/images/20260809224943401.webp" alt="Step 3 巨幅 LED 广告牌与地垫细节" className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
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
