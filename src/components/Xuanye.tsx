import React, { useEffect, useRef } from 'react';
import { CustomVideoPlayer } from './CustomVideoPlayer';

export const Xuanye = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    if (containerRef.current) {
      const reveals = containerRef.current.querySelectorAll('.reveal');
      reveals.forEach((el) => io.observe(el));
    }
    return () => io.disconnect();
  }, []);

  return (
    <div className="xuanye-container" ref={containerRef}>
      <style>{`
  :root{
    --xuan:      #0a0b0f;   /* 玄黑 · 主底 */
    --xuan-2:    #12141b;   /* 夜青黑 · 次底 */
    --xuan-3:    #1b1e28;   /* 卡面 */
    --ink:       #05060a;   /* 纯玄 · 阴影 */
    --zhu:       #b8352e;   /* 朱砂 */
    --zhu-lit:   #e0564a;   /* 朱砂·亮 */
    --gold:      #c8a45c;   /* 鎏金 */
    --gold-lit:  #e6cf94;   /* 鎏金·亮 */
    --jade:      #2f9e8f;   /* 青碧 */
    --jade-lit:  #4fd8c4;   /* 青碧·焰 */
    --yue:       #ece3d4;   /* 月白 */
    --yue-dim:   #a49b8c;   /* 月白·晦 */
    --line:      rgba(200,164,92,.18);
    --line-2:    rgba(200,164,92,.10);
    --serif:     "Noto Serif SC", serif;
    --latin:     "Cormorant Garamond", serif;
    --brush:     "Ma Shan Zheng", "Noto Serif SC", serif;
  }

  *{margin:0;padding:0;box-sizing:border-box}
  html{scroll-behavior:smooth}
  body{
    background:var(--xuan);
    color:var(--yue);
    font-family:var(--serif);
    font-weight:300;
    line-height:1.9;
    letter-spacing:.02em;
    overflow-x:hidden;
    -webkit-font-smoothing:antialiased;
  }

  /* 背景氛围 */
  body::before{
    content:"";position:fixed;inset:0;z-index:0;pointer-events:none;
    background:
      radial-gradient(1100px 700px at 78% -8%, rgba(47,158,143,.10), transparent 60%),
      radial-gradient(900px 650px at 8% 12%, rgba(184,53,46,.10), transparent 58%),
      radial-gradient(1200px 900px at 50% 120%, rgba(200,164,92,.06), transparent 60%);
  }
  /* 落瓣颗粒 */
  body::after{
    content:"";position:fixed;inset:0;z-index:0;pointer-events:none;opacity:.5;
    background-image:radial-gradient(circle, rgba(184,53,46,.5) 1px, transparent 1.4px);
    background-size:180px 180px;
    background-position:0 0;
  }

  .wrap{position:relative;z-index:1;max-width:1180px;margin:0 auto;padding:0 clamp(20px,5vw,64px)}

  /* ============ 竖排侧签 ============ */
  .rail{
    position:fixed;top:0;right:clamp(8px,2vw,28px);height:100vh;
    display:flex;align-items:center;z-index:5;pointer-events:none;
  }
  .rail span{
    writing-mode:vertical-rl;font-family:var(--brush);
    font-size:clamp(20px,2vw,30px);color:var(--gold);
    letter-spacing:.5em;opacity:.55;text-shadow:0 0 22px rgba(200,164,92,.35);
  }
  @media(max-width:820px){.rail{display:none}}

  /* ============ 页眉 / HERO ============ */
  header{
    min-height:100vh;display:flex;flex-direction:column;justify-content:center;
    position:relative;padding:120px 0 50px;
  }
  .kicker{
    display:flex;align-items:center;gap:16px;margin-bottom:38px;
    font-family:var(--latin);font-size:.82rem;letter-spacing:.42em;
    text-transform:uppercase;color:var(--jade-lit);
  }
  .kicker::before{content:"";width:54px;height:1px;background:linear-gradient(90deg,var(--jade),transparent)}

  .title-cn{
    font-family:var(--serif);font-weight:900;
    font-size:clamp(4.4rem,15vw,12rem);
    line-height:.92;letter-spacing:.06em;
    color:var(--yue);
    text-shadow:0 0 60px rgba(0,0,0,.9);
    position:relative;
  }
  .title-cn .glyph{position:relative;display:inline-block}
  .title-cn .yin{
    color:transparent;-webkit-text-stroke:1.5px var(--gold);
    text-stroke:1.5px var(--gold);
  }
  .seal-inline{
    display:inline-flex;align-items:center;justify-content:center;
    width:clamp(48px,7vw,86px);height:clamp(48px,7vw,86px);
    margin:0 clamp(6px,1vw,14px);vertical-align:middle;
    border:2px solid var(--zhu);border-radius:50%;
    font-size:clamp(1.6rem,4vw,3rem);color:var(--zhu-lit);
    font-weight:400;box-shadow:0 0 30px rgba(184,53,46,.4), inset 0 0 20px rgba(184,53,46,.2);
  }
  .title-en{
    font-family:var(--latin);font-style:italic;font-weight:400;
    font-size:clamp(1.1rem,2.4vw,1.7rem);color:var(--gold-lit);
    letter-spacing:.14em;margin-top:34px;max-width:100%; white-space:nowrap;line-height:1.6;
  }
  .title-en b{color:var(--jade-lit);font-style:normal;font-weight:500}

  .hero-meta{
    display:flex;flex-wrap:wrap;gap:40px;margin-top:64px;
    padding-top:34px;border-top:1px solid var(--line);
  }
  .hero-meta div{min-width:120px}
  .hero-meta dt{font-family:var(--latin);font-size:.72rem;letter-spacing:.3em;text-transform:uppercase;color:var(--yue-dim)}
  .hero-meta dd{font-size:1.05rem;color:var(--gold-lit);margin-top:6px;font-weight:400}

  /* ============ 章节通用 ============ */
  section{padding:clamp(20px,3vh,40px) 0;position:relative}
  .sec-head{display:flex;align-items:baseline;gap:20px;margin-bottom:40px;flex-wrap:wrap}
  .sec-no{
    font-family:var(--latin);font-size:clamp(2.4rem,5vw,4.2rem);font-weight:300;
    color:transparent;-webkit-text-stroke:1px var(--gold);line-height:1;
  }
  .sec-cn{font-size:clamp(1.6rem,3.6vw,2.7rem);font-weight:600;color:var(--yue);letter-spacing:.14em}
  .sec-en{font-family:var(--latin);font-style:italic;color:var(--jade-lit);font-size:1rem;letter-spacing:.1em}
  .sec-desc{max-width:100%;color:var(--yue-dim);font-size:1.02rem;margin-top:-30px;margin-bottom:52px;line-height:2}

  /* ============ 设计理念 ============ */
  .concept{display:grid;grid-template-columns:1.3fr 1fr;gap:clamp(28px,4vw,64px);align-items:start}
  @media(max-width:780px){.concept{grid-template-columns:1fr}}
  .concept p{font-size:1.1rem;line-height:2.1;color:var(--yue);margin-bottom:22px}
  .concept p .em{color:var(--gold-lit);font-weight:500}
  .concept p .em-z{color:var(--zhu-lit);font-weight:500}
  .concept p .em-j{color:var(--jade-lit);font-weight:500}
  .pull{
    border-left:2px solid var(--zhu);padding:24px 0 24px 30px;
    font-family:var(--brush);font-size:clamp(1.4rem,3vw,2rem);
    color:var(--gold-lit);line-height:1.7;letter-spacing:.08em;
    background:linear-gradient(90deg, rgba(184,53,46,.05), transparent);
  }

  /* ============ 色彩系统 ============ */
  .palette{display:grid;grid-template-columns:repeat(5,1fr);gap:2px;border:1px solid var(--line);}
  @media(max-width:780px){.palette{grid-template-columns:repeat(2,1fr)}}
  @media(max-width:440px){.palette{grid-template-columns:1fr}}
  .sw{padding:30px 22px 26px;min-height:230px;display:flex;flex-direction:column;justify-content:flex-end;position:relative;transition:transform .5s cubic-bezier(.16,1,.3,1)}
  .sw:hover{transform:translateY(-8px)}
  .sw .zh{font-size:1.5rem;font-weight:600;letter-spacing:.1em}
  .sw .en{font-family:var(--latin);font-style:italic;font-size:.95rem;opacity:.8;margin-top:2px}
  .sw .hex{font-family:var(--latin);font-size:.82rem;letter-spacing:.18em;margin-top:16px;opacity:.85}
  .sw .role{font-size:.78rem;margin-top:6px;opacity:.7;line-height:1.5}
  .sw .pct{position:absolute;top:20px;right:22px;font-family:var(--latin);font-size:.8rem;letter-spacing:.1em;opacity:.6}
  .sw-xuan{background:var(--xuan-2);color:var(--yue)}
  .sw-zhu{background:var(--zhu);color:#1a0605}
  .sw-gold{background:var(--gold);color:#241a06}
  .sw-jade{background:var(--jade);color:#04150f}
  .sw-yue{background:var(--yue);color:#2b2416}

  .ratio-bar{display:flex;height:14px;margin-top:36px;border:1px solid var(--line);overflow:hidden}
  .ratio-bar i{display:block}
  .ratio-legend{display:flex;flex-wrap:wrap;gap:22px;margin-top:16px;font-size:.82rem;color:var(--yue-dim)}
  .ratio-legend span{display:flex;align-items:center;gap:8px}
  .ratio-legend b{width:12px;height:12px;display:inline-block}

  /* ============ 元素拆解 ============ */
  .elements{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--line-2);border:1px solid var(--line-2)}
  @media(max-width:720px){.elements{grid-template-columns:1fr}}
  .el{
    background:linear-gradient(160deg,var(--xuan-3),var(--xuan-2));
    padding:clamp(28px,3.5vw,44px);position:relative;overflow:hidden;
    transition:background .6s ease;
  }
  .el:hover{background:linear-gradient(160deg,#20232e,var(--xuan-3))}
  .el-idx{position:absolute;top:22px;right:26px;font-family:var(--latin);font-size:2.6rem;color:transparent;-webkit-text-stroke:.8px var(--line);line-height:1}
  .el-sym{font-family:var(--brush);font-size:2.6rem;color:var(--gold-lit);margin-bottom:18px;text-shadow:0 0 24px rgba(200,164,92,.3)}
  .el h3{font-size:1.35rem;font-weight:600;color:var(--yue);letter-spacing:.06em;margin-bottom:4px}
  .el .el-en{font-family:var(--latin);font-style:italic;color:var(--jade-lit);font-size:.92rem;margin-bottom:18px}
  .el p{font-size:.98rem;color:var(--yue-dim);line-height:1.95}
  .el .tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:20px}
  .el .tags span{font-family:var(--latin);font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);border:1px solid var(--line);padding:4px 11px;border-radius:20px}

  /* ============ 字体系统 ============ */
  .type-grid{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--line-2);border:1px solid var(--line-2)}
  @media(max-width:720px){.type-grid{grid-template-columns:1fr}}
  .type-cell{background:var(--xuan-2);padding:clamp(30px,4vw,50px)}
  .type-cell .lab{font-family:var(--latin);font-size:.74rem;letter-spacing:.3em;text-transform:uppercase;color:var(--jade-lit);margin-bottom:24px}
  .type-cell .spec-title{font-family:var(--serif);font-weight:900;font-size:clamp(2.6rem,6vw,4rem);line-height:1;color:var(--yue)}
  .type-cell .spec-title.g{color:transparent;-webkit-text-stroke:1px var(--gold)}
  .type-cell .spec-body{font-family:var(--latin);font-size:2rem;font-style:italic;color:var(--gold-lit);line-height:1.3}
  .type-cell .meta{margin-top:26px;font-size:.86rem;color:var(--yue-dim);line-height:1.9}
  .type-cell .meta b{color:var(--gold-lit);font-weight:500}
  .glyph-row{display:flex;gap:14px;margin-top:22px;flex-wrap:wrap}
  .glyph-row b{font-family:var(--brush);font-size:2.4rem;color:var(--gold);font-weight:400}

  /* ============ 版式/构图 ============ */
  .grid-demo{display:grid;grid-template-columns:1fr 1.1fr;gap:clamp(28px,4vw,60px);align-items:center}
  @media(max-width:780px){.grid-demo{grid-template-columns:1fr}}
  .canvas{
    aspect-ratio:16/9;border:1px solid var(--line);position:relative;
    background:radial-gradient(120% 120% at 50% 40%, #16181f, var(--ink));overflow:hidden;
  }
  .canvas .cline{position:absolute;background:var(--line-2)}
  .canvas .v{width:1px;top:0;bottom:0}
  .canvas .h{height:1px;left:0;right:0}
  .canvas .center-mass{
    position:absolute;left:50%;top:52%;transform:translate(-50%,-50%);
    width:34%;aspect-ratio:1;border-radius:50%;
    background:radial-gradient(circle, rgba(200,164,92,.28), rgba(184,53,46,.12) 60%, transparent 72%);
    border:1px dashed rgba(200,164,92,.4);display:flex;align-items:center;justify-content:center;
    font-family:var(--brush);font-size:1.4rem;color:var(--gold-lit)
  }
  .canvas .tag-tl,.canvas .tag-tr,.canvas .tag-bl,.canvas .tag-br{
    position:absolute;font-family:var(--latin);font-size:.7rem;letter-spacing:.16em;
    text-transform:uppercase;color:var(--yue-dim);
  }
  .canvas .chip{position:absolute;border:1px solid var(--jade);width:12%;aspect-ratio:1;border-radius:4px}
  .principles{list-style:none}
  .principles li{padding:20px 0;border-bottom:1px solid var(--line-2);display:flex;gap:18px;align-items:baseline}
  .principles li b{font-family:var(--latin);color:var(--zhu-lit);font-size:1.1rem;min-width:34px}
  .principles li .t{font-size:1.05rem;color:var(--yue);font-weight:500}
  .principles li .d{display:block;color:var(--yue-dim);font-size:.92rem;margin-top:4px;font-weight:300}

  /* ============ 材质光影 ============ */
  .mat{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
  @media(max-width:720px){.mat{grid-template-columns:1fr}}
  .mat-card{padding:34px 28px;border:1px solid var(--line);position:relative;min-height:200px;display:flex;flex-direction:column;justify-content:flex-end;overflow:hidden}
  .mat-card::before{content:"";position:absolute;inset:0;opacity:.9}
  .mat-1::before{background:linear-gradient(135deg,#1a1206,#c8a45c 180%,transparent);}
  .mat-1::before{background:linear-gradient(135deg,#0d0b06 30%,#8a6f38 78%,#e6cf94)}
  .mat-2::before{background:linear-gradient(135deg,#100608 30%,#7a201c 80%,#e0564a)}
  .mat-3::before{background:linear-gradient(135deg,#05100e 30%,#1e5f56 80%,#4fd8c4)}
  .mat-card h4,.mat-card p{position:relative;z-index:1}
  .mat-card h4{font-size:1.2rem;color:var(--yue);font-weight:600;letter-spacing:.06em;text-shadow:0 2px 12px rgba(0,0,0,.8)}
  .mat-card p{font-size:.9rem;color:rgba(236,227,212,.85);margin-top:8px;text-shadow:0 1px 8px rgba(0,0,0,.9)}

  /* ============ 页脚 ============ */
  footer{padding:100px 0 80px;text-align:center;border-top:1px solid var(--line);margin-top:60px}
  .footer-seal{
    width:96px;height:96px;margin:0 auto 30px;border:2px solid var(--zhu);
    display:flex;align-items:center;justify-content:center;font-family:var(--brush);
    font-size:3rem;color:var(--zhu-lit);box-shadow:0 0 40px rgba(184,53,46,.35),inset 0 0 24px rgba(184,53,46,.2);
    transform:rotate(-3deg)
  }
  footer .f-cn{font-size:1.3rem;color:var(--gold-lit);letter-spacing:.3em;margin-bottom:12px}
  footer .f-en{font-family:var(--latin);font-style:italic;color:var(--yue-dim);letter-spacing:.14em}

  /* ============ 图片占位框 ============ */
  .imgph{
    position:relative;border:1px dashed rgba(200,164,92,.45);
    background:
      repeating-linear-gradient(45deg, rgba(200,164,92,.04) 0 12px, transparent 12px 24px),
      var(--xuan-2);
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    text-align:center;padding:26px;color:var(--gold-lit);gap:8px;
    min-height:180px;transition:border-color .4s ease,background .4s ease;
  }
  .imgph:hover{border-color:var(--gold);background:
      repeating-linear-gradient(45deg, rgba(200,164,92,.08) 0 12px, transparent 12px 24px),
      var(--xuan-3);}
  .imgph .ico{font-family:var(--brush);font-size:1.8rem;opacity:.7}
  .imgph .ph-tag{font-family:var(--latin);font-size:.7rem;letter-spacing:.24em;text-transform:uppercase;color:var(--jade-lit)}
  .imgph .ph-name{font-size:1rem;font-weight:500;color:var(--yue)}
  .imgph .ph-file{font-family:var(--latin);font-size:.78rem;letter-spacing:.06em;color:var(--yue-dim);word-break:break-all;line-height:1.5}
  .imgph .ph-note{font-size:.8rem;color:var(--yue-dim);line-height:1.6;max-width:42ch}
  .imgph.hero-ph{aspect-ratio:16/9;min-height:auto}
  .imgph.tall{aspect-ratio:3/4}
  .imgph.wide{aspect-ratio:16/9}
  .imgph.sq{aspect-ratio:1}
  .imgph-grid{display:grid;gap:14px}
  .imgph-cap{margin-top:10px;font-size:.82rem;color:var(--yue-dim);text-align:center;font-family:var(--latin);letter-spacing:.08em}
  .ph-block{margin:30px 0}
  .ph-label{display:flex;align-items:center;gap:12px;margin-bottom:14px;font-size:.82rem;letter-spacing:.2em;color:var(--jade-lit);text-transform:uppercase;font-family:var(--latin)}
  .ph-label::before{content:"◈";color:var(--zhu-lit);font-size:.9rem}

  /* reveal */
  .reveal{opacity:0;transform:translateY(30px);transition:opacity 1s cubic-bezier(.16,1,.3,1),transform 1s cubic-bezier(.16,1,.3,1)}
  .reveal.in{opacity:1;transform:none}
`}</style>
      

<div className="rail"><span>玄 夜 引 渡</span></div>

<div className="wrap">

  
  <header>
    <div className="kicker">Key Visual Design Specification · 主视觉设计说明</div>
    <h1 className="title-cn">
      <span className="glyph">玄</span><span className="glyph yin">夜</span><span className="seal-inline">☯</span><span className="glyph">引</span><span className="glyph yin">渡</span>
    </h1>
    <p className="title-en">
      Through <b>light</b> comes clarity, through <b>darkness</b> comes divining.<br />
      阴阳交生，引渡魂灵越幽冥而归澄明。
    </p>
    <dl className="hero-meta">
      <div><dt>Genre</dt><dd>东方玄幻 · 暗黑国风</dd></div>
      <div><dt>Format</dt><dd>横版主视觉 16:9</dd></div>
      <div><dt>Mood</dt><dd>幽邃 · 华贵 · 仪式感</dd></div>
      <div><dt>Palette</dt><dd>玄 / 朱 / 金 / 碧</dd></div>
    </dl>

    <div className="ph-block reveal">
      <div className="ph-label">Position A · Hero Key Visual</div>
      <img src="/images/20260912184251573.webp" alt="图1" style={{"width":"100%","display":"block","border":"1px solid rgba(200,164,92,.18)"}} />
      <div style={{ marginTop: '2rem' }}>
        <CustomVideoPlayer src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/yindu.mp4" />
      </div>
    </div>
  </header>

  
  <section>
    <div className="sec-head reveal">
      <span className="sec-no">01</span>
      <div>
        <div className="sec-cn">设计理念</div>
        <div className="sec-en">Design Philosophy</div>
      </div>
    </div>
    <div className="concept reveal">
      <div>
        <p>整幅画面以「<span className="em">引渡</span>」为叙事内核——一位持<span className="em">鎏金香球</span>的国风女子隐于玄夜之中，以香为媒，沟通幽明两界。设计上刻意压暗环境、聚光于面部与双手，营造出一种<span className="em-z">近乎宗教仪式</span>的凝视感。</p>
        <p>色彩以<span className="em">玄黑</span>为底奠定深邃与神秘，<span className="em-z">朱砂</span>点睛承载生命与祭祀之意，<span className="em">鎏金</span>铺陈华贵与器物质感，<span className="em-j">青碧幽焰</span>作为超自然的灵性符号，四色互为阴阳、彼此制衡。</p>
        <p>视觉母题贯穿<span className="em-j">阴阳太极</span>——光与暗、生与灭、清与浊。所有元素（印章、簪花、香器、火焰）皆服务于这一「二元交生」的哲学表达。</p>
      </div>
      <div className="pull">澄以生慧<br />幽以生玄<br />阴阳相生<br />引渡众灵</div>
    </div>

    <div className="ph-block reveal">
      <div className="ph-label">Position B · Mood Portrait</div>
      <img src="/images/20260912190045556.webp" alt="新增顶图" style={{"width":"100%","display":"block","border":"1px solid rgba(200,164,92,.18)","marginBottom":"20px"}} />
      <div style={{"display":"flex","justifyContent":"center","gap":"20px"}}>
        <img src="/images/20260912184325915.webp" alt="图3" style={{"width":"100%","maxWidth":"420px","objectFit":"cover","display":"block","border":"1px solid rgba(200,164,92,.18)"}} />
        <img src="/images/20260912184337215.webp" alt="图4新加" style={{"width":"100%","maxWidth":"420px","objectFit":"cover","display":"block","border":"1px solid rgba(200,164,92,.18)"}} />
      </div>
    </div>
  </section>

  
  <section>
    <div className="sec-head reveal">
      <span className="sec-no">02</span>
      <div>
        <div className="sec-cn">色彩系统</div>
        <div className="sec-en">Color System · 玄朱金碧</div>
      </div>
    </div>
    <p className="sec-desc reveal">四色构成的东方色谱：以大面积玄黑压场，朱砂与鎏金作为主辅点缀，青碧为唯一冷色调「灵光」。刻意规避高饱和撞色，所有色相均向玄黑微调，保持整体的沉稳与统一。</p>

    <div className="palette reveal">
      <div className="sw sw-xuan"><span className="pct">72%</span><span className="zh">玄黑</span><span className="en">Obsidian Night</span><span className="hex">#0A0B0F</span><span className="role">主背景 · 环境 · 服饰</span></div>
      <div className="sw sw-zhu"><span className="pct">10%</span><span className="zh">朱砂</span><span className="en">Cinnabar</span><span className="hex">#B8352E</span><span className="role">印章 · 花钿 · 蔻丹 · 落瓣</span></div>
      <div className="sw sw-gold"><span className="pct">10%</span><span className="zh">鎏金</span><span className="en">Gilt Bronze</span><span className="hex">#C8A45C</span><span className="role">香器 · 发饰 · 标题描边</span></div>
      <div className="sw sw-jade"><span className="pct">5%</span><span className="zh">青碧</span><span className="en">Jade Flame</span><span className="hex">#2F9E8F</span><span className="role">幽焰 · 瞳色 · 灵性符号</span></div>
      <div className="sw sw-yue"><span className="pct">3%</span><span className="zh">月白</span><span className="en">Moon Silk</span><span className="hex">#ECE3D4</span><span className="role">簪花 · 高光 · 正文</span></div>
    </div>

    <div className="ratio-bar reveal">
      <i style={{"flex":"72","background":"var(--xuan-2)"}}></i>
      <i style={{"flex":"10","background":"var(--zhu)"}}></i>
      <i style={{"flex":"10","background":"var(--gold)"}}></i>
      <i style={{"flex":"5","background":"var(--jade)"}}></i>
      <i style={{"flex":"3","background":"var(--yue)"}}></i>
    </div>
    <div className="ratio-legend reveal">
      <span><b style={{"background":"var(--xuan-2)"}}></b>玄黑 72%</span>
      <span><b style={{"background":"var(--zhu)"}}></b>朱砂 10%</span>
      <span><b style={{"background":"var(--gold)"}}></b>鎏金 10%</span>
      <span><b style={{"background":"var(--jade)"}}></b>青碧 5%</span>
      <span><b style={{"background":"var(--yue)"}}></b>月白 3%</span>
    </div>
  </section>

  
  <section>
    <div className="sec-head reveal">
      <span className="sec-no">03</span>
      <div>
        <div className="sec-cn">核心元素拆解</div>
        <div className="sec-en">Visual Elements Breakdown</div>
      </div>
    </div>
    <p className="sec-desc reveal">六组核心视觉符号，各自承载独立叙事，又共同服务于「玄夜引渡」的整体意象。</p>

    <div className="ph-block reveal">
      <div className="ph-label">Position C · Design Board Overview</div>
      <img src="/images/20260912184348720.webp" alt="图5" style={{"width":"100%","display":"block","border":"1px solid rgba(200,164,92,.18)"}} />
    </div>

    <div className="elements reveal">
      <div className="el">
        <span className="el-idx">01</span>
        <div className="el-sym">香</div>
        <h3>鎏金香球</h3>
        <div className="el-en">The Gilt Incense Sphere</div>
        <p>画面绝对视觉中心。镂空球体、繁复錾刻，被双手托举于唇前，是「以香引渡」的核心法器。金属反光与暖调聚光在此汇聚，牵引全部视线。</p>
        <div className="tags"><span>Focal Point</span><span>Metalwork</span><span>Ritual</span></div>
      </div>
      <div className="el">
        <span className="el-idx">02</span>
        <div className="el-sym">簪</div>
        <h3>簪花发饰</h3>
        <div className="el-en">Floral Headdress</div>
        <p>月白牡丹、朱红点缀、鎏金流苏与步摇层叠堆砌，形成头部华贵的视觉重量。冷白花瓣与暖金饰件的冷暖对撞，凸显人物的雍容与神性。</p>
        <div className="tags"><span>Ornament</span><span>Texture</span><span>Volume</span></div>
      </div>
      <div className="el">
        <span className="el-idx">03</span>
        <div className="el-sym">印</div>
        <h3>玄 / 夜 印章</h3>
        <div className="el-en">Seal Marks · Yin & Yang</div>
        <p>左上「夜」嵌青碧方框、右侧「玄」入朱砂红印，一冷一暖遥相呼应，锚定四角构图。书法感字体强化东方仪式属性，也是品牌记忆符号。</p>
        <div className="tags"><span>Typography</span><span>Balance</span><span>Brand</span></div>
      </div>
      <div className="el">
        <span className="el-idx">04</span>
        <div className="el-sym">丹</div>
        <h3>朱砂花钿 · 蔻丹</h3>
        <div className="el-en">Cinnabar Accents</div>
        <p>眉心花钿、指尖蔻丹、飘散的红色落瓣，以极小面积的高纯朱砂在玄黑与鎏金间跳跃，注入血色生命力与祭祀的隐喻。</p>
        <div className="tags"><span>Accent</span><span>Detail</span><span>Symbolism</span></div>
      </div>
      <div className="el">
        <span className="el-idx">05</span>
        <div className="el-sym">焰</div>
        <h3>青碧幽焰</h3>
        <div className="el-en">Jade Spirit Flame</div>
        <p>右侧升腾的冷色火焰，是画面唯一的超自然「灵光」。青碧与整体暖调形成戏剧性冷暖对比，暗示阴间、灵魂与引渡之门的开启。</p>
        <div className="tags"><span>Supernatural</span><span>Contrast</span><span>Motion</span></div>
      </div>
      <div className="el">
        <span className="el-idx">06</span>
        <div className="el-sym">炉</div>
        <h3>器物图注 · 香炉</h3>
        <div className="el-en">Artefact Annotation</div>
        <p>右上角线描香炉图标 + 英文注解，模拟「图鉴 / 卷宗」的信息层，为画面增添叙事纵深与考据质感，平衡纯美术与信息设计。</p>
        <div className="tags"><span>Info Layer</span><span>Line Art</span><span>Depth</span></div>
      </div>
    </div>
  </section>

  
  <section>
    <div className="sec-head reveal">
      <span className="sec-no">04</span>
      <div>
        <div className="sec-cn">文字系统</div>
        <div className="sec-en">Typography</div>
      </div>
    </div>
    <p className="sec-desc reveal">中文以高衬线宋体撑起标题的骨力与东方气韵，英文以人文衬线斜体作为「注解 / 咒语」层，二者主次分明、互不争夺。</p>

    <div className="type-grid reveal">
      <div className="type-cell">
        <div className="lab">Display · 标题主字</div>
        <div className="spec-title">玄夜引渡</div>
        <div className="spec-title g">阴阳相生</div>
        <div className="meta">
          字体族 · <b>Noto Serif SC / 思源宋体 Heavy</b><br />
          处理 · 实体填充 + 描边镂空「阴阳」交错<br />
          字重 · 900 &nbsp;|&nbsp; 字距 · +0.06em
        </div>
        <div className="glyph-row"><b>玄</b><b>夜</b><b>引</b><b>渡</b></div>
      </div>
      <div className="type-cell">
        <div className="lab">Text · 注解 / 咒语</div>
        <div className="spec-body">Yin &amp; Yang<br />intertwine</div>
        <div className="meta">
          字体族 · <b>Cormorant Garamond Italic</b><br />
          用途 · 英文副题 · 器物注解 · 标签<br />
          字重 · 400 &nbsp;|&nbsp; 字距 · +0.14em
        </div>
      </div>
    </div>
  </section>

  
  <section>
    <div className="sec-head reveal">
      <span className="sec-no">05</span>
      <div>
        <div className="sec-cn">版式与构图</div>
        <div className="sec-en">Layout &amp; Composition</div>
      </div>
    </div>
    <div className="grid-demo reveal">
      <div className="canvas">
        <span className="cline v" style={{"left":"33.33%"}}></span>
        <span className="cline v" style={{"left":"66.66%"}}></span>
        <span className="cline h" style={{"top":"33.33%"}}></span>
        <span className="cline h" style={{"top":"66.66%"}}></span>
        <span className="tag-tl" style={{"left":"6%","top":"8%"}}>夜 · 印</span>
        <span className="tag-tr" style={{"right":"6%","top":"8%"}}>香炉 · 图注</span>
        <span className="tag-bl" style={{"left":"6%","bottom":"8%"}}>香球 · 特写</span>
        <span className="tag-br" style={{"right":"6%","bottom":"8%"}}>玄 · 印</span>
        <span className="chip" style={{"left":"9%","top":"26%"}}></span>
        <span className="chip" style={{"right":"9%","top":"20%"}}></span>
        <span className="center-mass">中宫</span>
      </div>
      <ol className="principles">
        <li><b>①</b><div><span className="t">中宫聚焦</span><span className="d">人物面部与香球置于画面中央黄金区，光比最强，第一视觉落点。</span></div></li>
        <li><b>②</b><div><span className="t">四角锚定</span><span className="d">印章、图注、特写图卡分居四角，形成稳定的口字形框架。</span></div></li>
        <li><b>③</b><div><span className="t">冷暖对角</span><span className="d">左上青碧「夜」与右侧朱砂「玄」构成对角线呼应，平衡冷暖。</span></div></li>
        <li><b>④</b><div><span className="t">明暗渐隐</span><span className="d">四周向内压暗（暗角），强化聚光与幽邃的沉浸氛围。</span></div></li>
      </ol>
    </div>

    
  </section>

  
  <section>
    <div className="sec-head reveal">
      <span className="sec-no">06</span>
      <div>
        <div className="sec-cn">材质与光影</div>
        <div className="sec-en">Material &amp; Lighting</div>
      </div>
    </div>
    <p className="sec-desc reveal">以单一主光塑造戏剧性明暗，材质质感是华贵感的关键来源。</p>
    <div className="mat reveal">
      <div className="mat-card mat-1"><h4>鎏金 · 金属</h4><p>高反光、硬边高光，錾刻纹理承接暖调主光，是画面最亮的质感锚点。</p></div>
      <div className="mat-card mat-2"><h4>朱砂 · 漆感</h4><p>半哑光深红，边缘柔和过渡，如古漆器与朱印，承载庄重与祭祀意味。</p></div>
      <div className="mat-card mat-3"><h4>青碧 · 幽光</h4><p>自发光雾状扩散，无实体边界，模拟灵焰的通透与飘忽，冷调点睛。</p></div>
    </div>
  </section>

  
  <section>
    <div className="sec-head reveal">
      <span className="sec-no">07</span>
      <div>
        <div className="sec-cn">应用延展</div>
        <div className="sec-en">Applications &amp; Extensions</div>
      </div>
    </div>
    <p className="sec-desc reveal">同一套「玄朱金碧」视觉语言，延展至系列海报、角色设定与衍生物料，验证体系的可复用性。</p>

    

    <div className="ph-block reveal">
      <div className="ph-label">Position F · Character Sheet</div>
      <img src="/images/20260912184410665.webp" alt="图6" style={{"width":"100%","display":"block","border":"1px solid rgba(200,164,92,.18)"}} />
    </div>

    <div className="ph-block reveal">
      <div className="ph-label">Position G · Applications Board</div>
      <img src="/images/20260912184422016.webp" alt="图7" style={{"width":"100%","display":"block","border":"1px solid rgba(200,164,92,.18)"}} />
    </div>
  </section>

  
  <footer className="reveal">
    <div className="footer-seal">玄</div>
    <div className="f-cn">玄 夜 引 渡</div>
    <div className="f-en">Key Visual Design Specification · 阴阳相生 · 引渡众灵</div>
  </footer>

</div>


    </div>
  );
};
