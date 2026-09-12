import React from 'react';
import { CustomVideoPlayer } from './CustomVideoPlayer';

export function Vid14Detail({ selectedProject, language, t, setLightboxState }: any) {
  return (
    <div className="space-y-12">
      {/* Title & Main Video Player */}
      <div className="space-y-6">
        <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-300 animate-pulse" />
          <h2 className="text-base sm:text-lg md:text-xl uppercase tracking-[0.2em] font-bold text-zinc-100">
            王者荣耀农音节“LIVE音乐会”官方合作短片《墨染·天下》 — AI短片创作企划与SOP
          </h2>
        </div>
        <CustomVideoPlayer src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/moran%20new.mp4" language={language} aspectRatio="aspect-[21/9]" />
      </div>

      {/* 一、 项目概述与核心风格 */}
      <div className="space-y-6 pt-4 border-t border-white/5">
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-sky-300 tracking-wide flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          一、 项目概述与核心风格
        </h3>
        <div className="p-5 md:p-6 rounded-xl bg-zinc-900/70 border border-white/10 space-y-3 text-xs sm:text-sm md:text-base text-zinc-300 font-light leading-relaxed">
          <p>
            本项目为“王者荣耀Live音乐会企划”的商业合作 MV。视频将基于【王者英雄x音乐】的主题，打造一支以战斗、热血为主，且具备强音乐性的视觉短片。（角色、音乐为官方授权）
          </p>
          <p className="font-semibold text-zinc-100">
            核心视觉风格：3D古风 CG 动画 + 强水墨画结合。
          </p>
        </div>

        {/* 三图并排 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {[
            {
              url: "/images/20260812011702131.webp",
              desc: "视频风格参考（展现3D古风与水墨特效结合的高燃战斗张力）"
            },
            {
              url: "/images/20260812011722241.webp",
              desc: "视频风格参考（展现画面的色彩质感与实验性美术风格）"
            },
            {
              url: "/images/20260812011735636.webp",
              desc: "视频风格参考（整体群像的海报构图与古风审美调性）"
            }
          ].map((item, idx, arr) => (
            <div key={`vid14-style-${idx}`} className="space-y-2">
              <div
                className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full aspect-video rounded-2xl border border-white/5"
                onClick={() => setLightboxState({ images: arr.map(a => a.url), index: idx })}
              >
                <img src={item.url} alt={`Style ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
                  {t("点击查看大图", "Click to Zoom")}
                </div>
              </div>
              <p className="text-xs text-zinc-400 font-light px-1 text-center sm:text-left">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 二、 核心角色设定与羁绊 */}
      <div className="space-y-6 pt-4 border-t border-white/5">
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-sky-300 tracking-wide flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          二、 核心角色设定与羁绊
        </h3>
        <div className="p-5 md:p-6 rounded-xl bg-zinc-900/70 border border-white/10 text-xs sm:text-sm md:text-base text-zinc-300 font-light leading-relaxed">
          故事围绕公孙离与李信展开，明世隐作为反派推动情节。公孙离对李信是“坚定又柔软”的单向暗恋，而李信虽视其为最重要的光，却因复仇执念与“美强惨”的宿命，将其推开。此次短片重点展现李信为了守护阿离，打破理智堕入修罗的悲剧美学。
        </div>

        {/* 并排三张新图 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {[
            {
              url: "/images/20260812013331604.jpg",
              desc: "核心角色关系与情感羁绊"
            },
            {
              url: "/images/20260812013348788.jpg",
              desc: "水墨风格角色对峙概念"
            },
            {
              url: "/images/20260812013359790.jpg",
              desc: "关键场景角色剧照与视觉呈现"
            }
          ].map((item, idx, arr) => (
            <div key={`vid14-bond-${idx}`} className="space-y-2">
              <div
                className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full aspect-video rounded-2xl border border-white/5"
                onClick={() => setLightboxState({ images: arr.map(a => a.url), index: idx })}
              >
                <img src={item.url} alt={`Bond ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
                  {t("点击查看大图", "Click to Zoom")}
                </div>
              </div>
              <p className="text-xs text-zinc-400 font-light px-1 text-center sm:text-left">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 三、 场景概念与氛围构建 */}
      <div className="space-y-6 pt-4 border-t border-white/5">
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-sky-300 tracking-wide flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          三、 场景概念与氛围构建
        </h3>
        <div className="p-5 md:p-6 rounded-xl bg-zinc-900/70 border border-white/10 text-xs sm:text-sm md:text-base text-zinc-300 font-light leading-relaxed">
          全片场景基调契合“墨染江湖”，环境的明暗色彩将随着李信的形态转换与剧情走向发生剧烈变化。
        </div>

        {/* 三图并列 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {[
            {
              url: "/images/20260812011923732.webp",
              desc: "场景概念1：茂密的翠绿竹林/枫林与破败小屋（用于第一幕【绞杀】的开场）"
            },
            {
              url: "/images/20260812011947029.webp",
              desc: "场景概念2：遮天蔽日的暗黑杀阵与巨大锁链（用于第二幕【死局】明世隐发力时）"
            },
            {
              url: "/images/20260812011957304.webp",
              desc: "场景概念3：硝烟散去、微风与红叶交织的废墟（用于尾声【余温】的情感落幅）"
            }
          ].map((item, idx, arr) => (
            <div key={`vid14-scene-${idx}`} className="space-y-2">
              <div
                className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full aspect-video rounded-2xl border border-white/5"
                onClick={() => setLightboxState({ images: arr.map(a => a.url), index: idx })}
              >
                <img src={item.url} alt={`Scene ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
                  {t("点击查看大图", "Click to Zoom")}
                </div>
              </div>
              <p className="text-xs text-zinc-400 font-light px-1 text-center sm:text-left">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 四、 剧本分镜与叙事拆解 (核心主题：为她，挥剑断天涯) */}
      <div className="space-y-6 pt-4 border-t border-white/5">
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-sky-300 tracking-wide flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          四、 剧本分镜与叙事拆解 (核心主题：为她，挥剑断天涯)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { time: "0:00 - 0:30", title: "【绞杀】", desc: "第一幕开场：竹林枫林与破败小屋，危机四伏" },
            { time: "0:30 - 1:00", title: "【死局】", desc: "第二幕爆发：明世隐遮天杀阵与巨大锁链困局" },
            { time: "1:00 - 1:20", title: "【修罗】", desc: "第三幕高潮：李信打破理智，堕入狂暴修罗状态" },
            { time: "1:20 - 1:30", title: "【余温】", desc: "尾声落幅：硝烟散去，微风红叶废墟中的情感余温" }
          ].map((act, aIdx) => (
            <div key={`vid14-act-${aIdx}`} className="p-4 rounded-xl bg-zinc-900/60 border border-white/10 space-y-2">
              <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-mono bg-sky-500/20 text-sky-300 border border-sky-400/30">
                {act.time}
              </span>
              <h4 className="text-sm md:text-base font-bold text-zinc-100">{act.title}</h4>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">{act.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 五、 AI 动画商业制作 SOP 工作流 */}
      <div className="space-y-6 pt-4 border-t border-white/5">
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-sky-300 tracking-wide flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          五、 AI 动画商业制作 SOP 工作流
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 font-light">
          为了满足甲方的关键反馈节点要求，整个制作拆分为以下 4 个阶段进行：
        </p>

        <div className="space-y-6">
          {/* 阶段 1 */}
          <div className="p-5 md:p-6 rounded-xl bg-zinc-900/70 border border-white/10 space-y-4">
            <div className="flex items-center gap-3 border-b border-white/5 pb-3">
              <span className="px-2.5 py-1 rounded bg-sky-500/20 text-sky-300 font-mono text-xs font-semibold border border-sky-400/30">
                阶段 1
              </span>
              <h4 className="text-sm sm:text-base font-bold text-zinc-100">AI 设定阶段</h4>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 font-light list-disc list-inside leading-relaxed">
              <li>使用 GPT 和 Nano Banana 结合垫图，生成 3D+水墨画风下的公孙离、李信双形态、明世隐的定妆照。</li>
              <li>交付给甲方确认脸部特征与整体画风。</li>
            </ul>

            {/* 移过来的 4 张角色设定三视图网格 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 pt-2">
              {[
                {
                  url: "/images/20260812011753353.webp",
                  title: "公孙离",
                  desc: "公孙离三视图（提取 AI 提示词：纸伞、兔耳、青色水墨、旗袍，展现坚定与柔软）"
                },
                {
                  url: "/images/20260812011809631.webp",
                  title: "明世隐",
                  desc: "明世隐三视图（提取 AI 提示词：白发、牡丹法器、黑白长袍，展现优雅的幕后黑手）"
                },
                {
                  url: "/images/20260812011859134.webp",
                  title: "李信（光信）",
                  desc: "李信（光信）三视图（提取 AI 提示词：金光、重剑、神明降临感，展现前期的克制与守护）"
                },
                {
                  url: "/images/20260812011911807.webp",
                  title: "李信（暗信）",
                  desc: "李信（暗信）三视图（提取 AI 提示词：猩红魔气、银发狂舞、狂暴修罗，展现后期的彻底爆发）"
                }
              ].map((item, idx, arr) => (
                <div key={`vid14-char-${idx}`} className="space-y-2">
                  <div
                    className="group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full aspect-video rounded-2xl border border-white/5"
                    onClick={() => setLightboxState({ images: arr.map(a => a.url), index: idx })}
                  >
                    <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                    <div className="absolute top-3 left-3 bg-black/70 border border-white/10 text-xs text-sky-300 font-medium px-2.5 py-1 rounded-md backdrop-blur-sm">
                      {item.title}
                    </div>
                    <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
                      {t("点击查看大图", "Click to Zoom")}
                    </div>
                  </div>
                  <p className="text-xs text-zinc-400 font-light px-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 阶段 2 */}
          <div className="p-5 md:p-6 rounded-xl bg-zinc-900/70 border border-white/10 space-y-3">
            <div className="flex items-center gap-3 border-b border-white/5 pb-3">
              <span className="px-2.5 py-1 rounded bg-sky-500/20 text-sky-300 font-mono text-xs font-semibold border border-sky-400/30">
                阶段 2
              </span>
              <h4 className="text-sm sm:text-base font-bold text-zinc-100">AI 分镜阶段（关键帧生成）</h4>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 font-light list-disc list-inside leading-relaxed">
              <li>根据第四部分的剧本拆解，在 Midjourney 中跑出每个章节的核心画面（如：阿离挥伞、光信降临、暗信冲天、手捧金叶）。</li>
              <li>交付给甲方确认镜头景别、动作张力与水墨特效覆盖比重。</li>
            </ul>
          </div>

          {/* 阶段 3 */}
          <div className="p-5 md:p-6 rounded-xl bg-zinc-900/70 border border-white/10 space-y-4">
            <div className="flex items-center gap-3 border-b border-white/5 pb-3">
              <span className="px-2.5 py-1 rounded bg-sky-500/20 text-sky-300 font-mono text-xs font-semibold border border-sky-400/30">
                阶段 3
              </span>
              <h4 className="text-sm sm:text-base font-bold text-zinc-100">视频初稿阶段（动态生成与初剪）</h4>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 font-light list-disc list-inside leading-relaxed">
              <li>将确认好的静态分镜导入 seedance、kling 等视频模型。使用提示词控制水墨的炸裂与流动。</li>
              <li>交付给甲方确认整体叙事节奏、音乐情绪匹配度。</li>
            </ul>

            {/* 移过来的 SOP 流程图 */}
            <div
              className="group relative overflow-hidden bg-zinc-900 rounded-xl border border-white/10 max-w-xl cursor-pointer mt-2"
              onClick={() => setLightboxState({ images: ["/images/20260812012228682.png"], index: 0 })}
            >
              <img src="/images/20260812012228682.png" alt="SOP Video Draft" className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500" referrerPolicy="no-referrer" />
              <div className="absolute bottom-3 right-3 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                {t("点击查看大图", "Click to Zoom")}
              </div>
            </div>
          </div>

          {/* 阶段 4 */}
          <div className="p-5 md:p-6 rounded-xl bg-zinc-900/70 border border-white/10 space-y-4">
            <div className="flex items-center gap-3 border-b border-white/5 pb-3">
              <span className="px-2.5 py-1 rounded bg-sky-500/20 text-sky-300 font-mono text-xs font-semibold border border-sky-400/30">
                阶段 4
              </span>
              <h4 className="text-sm sm:text-base font-bold text-zinc-100">终稿阶段（后期特效与润色）</h4>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 font-light list-disc list-inside leading-relaxed">
              <li>进入后期进行精修剪辑。补充 AI 生成细节不足的特效（如水墨点缀等）。</li>
              <li>将生成的动态素材导入 PR 或剪映，铺垫带有歌词的热血 BGM，完成基础的卡点剪辑。</li>
              <li>全片进行统一的“墨染江湖”色调校正，增加打斗音效与环境音，渲染输出最终 1分30秒 的成片交付。</li>
            </ul>

            {/* 阶段 4 补充说明图片 */}
            <div
              className="group relative overflow-hidden bg-zinc-900 rounded-xl border border-white/10 max-w-xl cursor-pointer mt-2"
              onClick={() => setLightboxState({ images: ["/images/20260812015011486.png"], index: 0 })}
            >
              <img src="/images/20260812015011486.png" alt="SOP Final Production" className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500" referrerPolicy="no-referrer" />
              <div className="absolute bottom-3 right-3 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                {t("点击查看大图", "Click to Zoom")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
