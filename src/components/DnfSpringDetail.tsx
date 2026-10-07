import React from 'react';

interface DnfSpringDetailProps {
  t: (zh: string, en: string) => string;
  setLightboxState: (state: { images: string[]; index: number }) => void;
  gallery: string[];
}

interface Chapter {
  number: string;
  eyebrow: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  images: Array<{ index: number; label: string; labelEn: string }>;
}

const chapters: Chapter[] = [
  {
    number: '01',
    eyebrow: 'CORE IDEA',
    title: '让好运拥有出击的姿态',
    titleEn: 'Give Fortune a Fighting Stance',
    description: '从“祈愿”与“战斗”之间寻找同一个动作：击发。以角色的金发、白羽、红黑金甲建立识别，以福牌、红绳与金属建立新春信物，让祝福不再停留在静态装饰，而成为被角色主动点燃的能量。',
    descriptionEn: 'The concept connects wishing and fighting through one action: ignition. Blonde hair, white feathers and red-black-gold armor define the character, while fortune plaques, red cords and metal turn New Year symbols into active energy.',
    images: [
      { index: 0, label: '主视觉｜有锋芒的好运', labelEn: 'Key Visual · Fortune with an Edge' },
      { index: 1, label: '主题视觉基因', labelEn: 'The Visual DNA' },
    ],
  },
  {
    number: '02',
    eyebrow: 'ACTION LANGUAGE',
    title: '用四种动作，拆解一场新春愿望',
    titleEn: 'Four Motions, One New Year Wish',
    description: '“破阵、腾空、狂喜、所愿皆成”构成视觉叙事的四次推进。超近透视制造迎面而来的力量，腾空回旋拉开空间，双色网点释放情绪，巨物留白则让愿望最终落定。角色动作谱进一步把瞬间画面整理为可持续调用的动态资产。',
    descriptionEn: 'Breakthrough, flight, joy and fulfillment form a four-beat visual narrative. Extreme perspective creates impact, airborne rotation opens space, duotone halftones release emotion, and monumental negative space brings the wish to rest.',
    images: [
      { index: 2, label: '破阵｜超近透视', labelEn: 'Breakthrough · Extreme Perspective' },
      { index: 3, label: '天马行空｜腾空回旋', labelEn: 'Airborne · Spiraling Motion' },
      { index: 4, label: '狂喜｜双色网点', labelEn: 'Joy · Duotone Halftone' },
      { index: 5, label: '所愿皆成｜巨物留白', labelEn: 'Wish Fulfilled · Monumental Space' },
      { index: 6, label: '角色动作谱', labelEn: 'Character Motion Atlas' },
    ],
  },
  {
    number: '03',
    eyebrow: 'MATERIAL STUDY',
    title: '把锋芒写进材质',
    titleEn: 'Build the Edge into the Material',
    description: '两组材质实验分别从“亮”与“暗”展开：金属过曝、扫描切片放大冲击感；漆夜藏锋、裂金悬浮则把能量收进黑场。它们共同形成一套可在不同媒介中切换的红、黑、金视觉语法。',
    descriptionEn: 'Two material studies explore brightness and darkness. Overexposed metal and scanning slices amplify impact, while lacquered night and fractured gold contain the energy inside a dark field.',
    images: [
      { index: 7, label: '金属过曝｜扫描切片', labelEn: 'Metal Overexposure · Scan Slices' },
      { index: 8, label: '漆夜藏锋｜裂金悬浮', labelEn: 'Hidden Edge · Fractured Gold' },
    ],
  },
  {
    number: '04',
    eyebrow: 'BRAND OBJECTS',
    title: '从画面延展到可以拥有的好运',
    titleEn: 'Turn the Visual into Fortune You Can Own',
    description: '将角色、信物和材质语言压缩为实体资产：限定潮玩强调角色动作与收藏感，数码桌搭则把图形系统落到高频使用场景，让主题视觉从传播画面进入真实生活。',
    descriptionEn: 'Character, symbols and material language are condensed into tangible assets. Collectibles preserve the hero pose, while digital desk objects bring the system into everyday use.',
    images: [
      { index: 9, label: '限定潮玩与摆件', labelEn: 'Limited Collectibles' },
      { index: 10, label: '数码桌搭周边', labelEn: 'Digital Desk Objects' },
    ],
  },
  {
    number: '05',
    eyebrow: 'MOTION & SOUND',
    title: '让好运真正动起来',
    titleEn: 'Set Fortune in Motion',
    description: '30 秒动态方案以“蓄、破、腾、切、定、落”组织镜头能量；声音以 132 BPM、4/4 拍与 D 小调搭建骨架，用工业鼓组、低频合成器、金属撞击和马蹄采样，把视觉动作转译成可听见的节奏。',
    descriptionEn: 'A 30-second motion plan moves through charge, break, rise, slice, lock and resolve. At 132 BPM in 4/4 and D minor, industrial drums, bass synths, metallic impacts and hoof samples turn visual action into audible rhythm.',
    images: [
      { index: 11, label: '动态视觉节奏｜30 SEC', labelEn: 'Motion System · 30 SEC' },
      { index: 12, label: '原创音乐与剪辑节奏｜132 BPM', labelEn: 'Sound & Edit Rhythm · 132 BPM' },
    ],
  },
  {
    number: '06',
    eyebrow: 'SYSTEM SUMMARY',
    title: '角色 × 动作 × 材质 × 产品 × 声音',
    titleEn: 'Character × Motion × Material × Product × Sound',
    description: '全案最终形成一条完整的视觉链路：角色提供记忆点，动作建立叙事，材质统一气质，产品承接场景，声音完成情绪闭环。所有模块都围绕同一句核心表达——有锋芒的好运。',
    descriptionEn: 'The final system links character, motion, material, product and sound. Every module serves one central idea: fortune with an edge.',
    images: [
      { index: 13, label: '全案收束', labelEn: 'Case Summary' },
    ],
  },
];

export function DnfSpringDetail({ t, setLightboxState, gallery }: DnfSpringDetailProps) {
  const openZoom = (index: number) => setLightboxState({ images: gallery, index });

  return (
    <div className="space-y-20 text-left w-full font-sans">
      <section className="relative overflow-hidden border border-[#e7442d]/35 bg-[#110f0e] px-6 py-8 md:px-10 md:py-12">
        <div className="absolute inset-y-0 left-0 w-1.5 bg-[#e7442d]" />
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#e7442d]/10 blur-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div>
            <p className="mb-5 font-mono text-[11px] tracking-[0.32em] text-[#e9c87d] md:text-xs">
              CREATIVE STATEMENT / 祈愿新春
            </p>
            <h3 className="max-w-4xl text-3xl font-black leading-tight text-[#f4eee4] md:text-5xl lg:text-6xl">
              <span className="whitespace-nowrap">{t('锋芒迎新岁，', 'ENTER THE NEW YEAR WITH AN EDGE,')}</span>
              <wbr />
              <span className="whitespace-nowrap">{t('所愿皆成真。', ' MAY EVERY WISH COME TRUE.')}</span>
            </h3>
            <p className="mt-6 max-w-3xl text-sm font-light leading-8 text-zinc-300 md:text-lg">
              {t(
                '本案不把新春理解为一组传统装饰，而是把“祈愿”转化为角色能够执行的动作。以战斗者的锋芒承载新年的好运，让祝福在破阵、腾跃、切片与定场之间完成一次有节奏的爆发。',
                'Rather than treating Lunar New Year as a collection of decorations, this project turns wishing into an action the character can perform—giving fortune the force, rhythm and edge of a fighter.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-2 border-l border-t border-[#e9c87d]/20 text-[#f4eee4]">
            {[
              ['14', t('页视觉系统', 'VISUAL PAGES')],
              ['4×', t('叙事动作', 'ACTION BEATS')],
              ['3×', t('核心色彩', 'CORE COLORS')],
              ['2×', t('衍生场景', 'PRODUCT SCENES')],
            ].map(([value, label]) => (
              <div key={value} className="border-b border-r border-[#e9c87d]/20 p-5 md:p-6">
                <div className="font-mono text-xl font-bold text-[#e7442d] md:text-2xl">{value}</div>
                <div className="mt-2 text-[10px] tracking-[0.18em] text-zinc-400 md:text-xs">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {chapters.map((chapter) => (
        <section key={chapter.number} className="space-y-7 border-t border-white/10 pt-8 md:pt-10">
          <div className="grid gap-6 md:grid-cols-[9rem_1fr] md:gap-10">
            <div className="flex items-start gap-4 md:block">
              <span className="font-mono text-4xl font-black text-[#e7442d] md:text-6xl">{chapter.number}</span>
              <p className="pt-2 font-mono text-[10px] tracking-[0.28em] text-[#e9c87d] md:mt-3 md:pt-0 md:text-xs">
                {chapter.eyebrow}
              </p>
            </div>
            <div className="max-w-5xl">
              <h4 className="text-2xl font-bold leading-tight text-[#f4eee4] md:text-4xl">
                {t(chapter.title, chapter.titleEn)}
              </h4>
              <p className="mt-4 text-sm font-light leading-8 text-zinc-300 md:text-base lg:text-lg">
                {t(chapter.description, chapter.descriptionEn)}
              </p>
            </div>
          </div>

          <div className="space-y-7">
            {chapter.images.map((image) => (
              <figure key={image.index} className="group overflow-hidden border border-white/10 bg-[#0d0c0b] shadow-2xl">
                <button
                  type="button"
                  className="relative block w-full cursor-zoom-in overflow-hidden text-left"
                  onClick={() => openZoom(image.index)}
                  aria-label={t(`放大查看：${image.label}`, `Zoom image: ${image.labelEn}`)}
                >
                  <img
                    loading="lazy"
                    decoding="async"
                    src={gallery[image.index]}
                    alt={t(image.label, image.labelEn)}
                    className="h-auto w-full transition duration-700 ease-out group-hover:scale-[1.008] group-hover:brightness-105"
                  />
                  <span className="absolute bottom-4 right-4 translate-y-2 border border-white/15 bg-black/75 px-3 py-2 text-[10px] tracking-[0.16em] text-zinc-200 opacity-0 backdrop-blur-sm transition-all group-hover:translate-y-0 group-hover:opacity-100 md:text-xs">
                    {t('点击查看大图', 'CLICK TO ZOOM')}
                  </span>
                </button>
                <figcaption className="flex items-center justify-between gap-4 border-t border-white/10 px-4 py-3 text-xs text-zinc-400 md:px-6 md:py-4 md:text-sm">
                  <span>{t(image.label, image.labelEn)}</span>
                  <span className="font-mono text-[#e7442d]">{String(image.index + 1).padStart(2, '0')} / 14</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ))}

      <section className="border-y border-[#e7442d]/35 py-10 text-center md:py-14">
        <p className="font-mono text-xs tracking-[0.36em] text-[#e9c87d]">FORTUNE IN MOTION</p>
        <p className="mt-4 text-2xl font-black text-[#f4eee4] md:text-4xl">有锋芒的好运</p>
        <p className="mt-3 text-sm tracking-[0.2em] text-zinc-500">新春祈愿 · 所念皆成真</p>
      </section>
    </div>
  );
}
