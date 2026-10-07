import React from 'react';
import {
  ChevronDown,
  Clapperboard,
  FileText,
  Image as ImageIcon,
  Layers3,
  PlayCircle,
  Sparkles,
  WandSparkles,
  Workflow,
} from 'lucide-react';
import workflowContentJson from '../content/aiVideoWorkflow.json';

interface MediaAsset {
  id: string;
  label: string;
  type: 'image' | 'video' | 'whiteboard';
  path: string;
}

interface VideoAsset extends MediaAsset {
  type: 'video';
  poster: string;
}

interface WorkflowCase {
  id: string;
  number: string;
  title: string;
  input: string;
  creative_expansion: {
    方向: string;
    剧情: string;
    节奏与视听: string;
  };
  asset_notes: string[];
  assets: MediaAsset[];
  prompt: string;
  video: VideoAsset;
}

interface FeatureStep {
  number: number;
  title: string;
  body: string[];
  image?: MediaAsset;
}

interface WorkflowContent {
  title: string;
  subtitle: string;
  summary: string;
  updated_at: string;
  workflow: MediaAsset;
  cases: WorkflowCase[];
  feature: {
    id: string;
    title: string;
    intro: string[];
    steps: FeatureStep[];
    video: VideoAsset;
  };
}

interface AiVideoWorkflowShowcaseProps {
  setLightboxUrl: (url: string | null) => void;
}

const workflowContent = workflowContentJson as WorkflowContent;
const PUBLIC_ROOT = '/projects/ai-video-workflow/';

function mediaUrl(path: string) {
  return `${PUBLIC_ROOT}${path.replace(/^\/+/, '')}`;
}

function AssetImage({ asset, setLightboxUrl, wide = false }: {
  asset: MediaAsset;
  setLightboxUrl: (url: string | null) => void;
  wide?: boolean;
}) {
  const src = mediaUrl(asset.path);

  return (
    <button
      type="button"
      onClick={() => setLightboxUrl(src)}
      className={`group min-w-0 overflow-hidden border border-white/10 bg-black/40 text-left transition-colors hover:border-sky-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${wide ? 'sm:col-span-2' : ''}`}
      aria-label={`查看原图：${asset.label}`}
    >
      <div className={`${wide ? 'aspect-[16/7]' : 'aspect-[3/4]'} flex items-center justify-center overflow-hidden bg-zinc-950`}>
        <img
          src={src}
          alt={asset.label}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.015]"
        />
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-white/5 px-3 py-3 sm:px-4">
        <span className="min-w-0 text-xs font-medium leading-relaxed text-zinc-300 sm:text-sm">{asset.label}</span>
        <ImageIcon className="h-4 w-4 flex-none text-zinc-600 transition-colors group-hover:text-sky-400" aria-hidden="true" />
      </div>
    </button>
  );
}

function CaseVideo({ video }: { video: VideoAsset }) {
  return (
    <div className="mx-auto w-full max-w-[430px] min-w-0 overflow-hidden border border-white/10 bg-black shadow-2xl shadow-black/40">
      <video
        className="block h-auto max-h-[78vh] w-full bg-black object-contain"
        controls
        preload="metadata"
        playsInline
        poster={mediaUrl(video.poster)}
        aria-label={video.label}
      >
        <source src={mediaUrl(video.path)} type="video/mp4" />
        您的浏览器暂不支持 HTML5 视频播放。
      </video>
      <div className="flex items-center gap-2 border-t border-white/10 px-4 py-3 text-xs text-zinc-400 sm:text-sm">
        <PlayCircle className="h-4 w-4 flex-none text-sky-400" aria-hidden="true" />
        <span>{video.label}</span>
      </div>
    </div>
  );
}

function CreativeBrief({ item }: { item: WorkflowCase }) {
  const blocks = [
    ['创意方向', item.creative_expansion.方向],
    ['剧情推进', item.creative_expansion.剧情],
    ['节奏与视听', item.creative_expansion.节奏与视听],
  ];

  return (
    <div className="grid min-w-0 grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-3">
      {blocks.map(([label, body]) => (
        <div key={label} className="min-w-0 bg-[#080808] p-4 sm:p-5">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-400">{label}</p>
          <p className="text-sm font-light leading-7 text-zinc-300">{body}</p>
        </div>
      ))}
    </div>
  );
}

function WorkflowCaseSection({ item, setLightboxUrl }: {
  item: WorkflowCase;
  setLightboxUrl: (url: string | null) => void;
}) {
  return (
    <article className="min-w-0 border-t border-white/10 py-14 first:border-t-0 sm:py-20">
      <header className="mb-8 grid min-w-0 gap-5 lg:grid-cols-[120px_minmax(0,1fr)] lg:gap-8">
        <div className="font-mono text-5xl font-light tracking-tighter text-white/20 sm:text-6xl">{item.number}</div>
        <div className="min-w-0">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-sky-400">Complete video case</p>
          <h3 className="break-words text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">{item.title}</h3>
          <div className="mt-5 border-l-2 border-sky-400/60 pl-4">
            <p className="mb-1 text-[11px] uppercase tracking-[0.18em] text-zinc-500">一句话输入</p>
            <p className="break-words text-sm leading-7 text-zinc-200 sm:text-base">{item.input}</p>
          </div>
        </div>
      </header>

      <div className="min-w-0 space-y-8 lg:pl-[152px]">
        <CreativeBrief item={item} />

        <div className="grid min-w-0 gap-8 xl:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)]">
          <div className="min-w-0">
            <div className="mb-4 flex items-center gap-2">
              <Layers3 className="h-4 w-4 text-sky-400" aria-hidden="true" />
              <h4 className="text-sm font-semibold text-white">角色与场景资产</h4>
              <span className="text-xs text-zinc-600">{item.assets.length} 张</span>
            </div>
            <div className={`grid min-w-0 grid-cols-2 gap-3 ${item.assets.length >= 3 ? 'lg:grid-cols-3' : ''}`}>
              {item.assets.map((asset) => (
                <React.Fragment key={asset.id}>
                  <AssetImage asset={asset} setLightboxUrl={setLightboxUrl} />
                </React.Fragment>
              ))}
            </div>
            <ul className="mt-4 space-y-2 border border-white/5 bg-white/[0.015] p-4">
              {item.asset_notes.map((note) => (
                <li key={note} className="flex min-w-0 gap-3 text-xs leading-6 text-zinc-400 sm:text-sm">
                  <span className="mt-[10px] h-1 w-1 flex-none rounded-full bg-sky-400" />
                  <span className="min-w-0 break-words">{note}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <div className="mb-4 flex items-center gap-2">
              <Clapperboard className="h-4 w-4 text-sky-400" aria-hidden="true" />
              <h4 className="text-sm font-semibold text-white">最终成片</h4>
            </div>
            <CaseVideo video={item.video} />
          </div>
        </div>

        <details className="group min-w-0 overflow-hidden border border-white/10 bg-white/[0.015]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/[0.025] sm:px-5 [&::-webkit-details-marker]:hidden">
            <span className="flex min-w-0 items-center gap-2">
              <FileText className="h-4 w-4 flex-none text-sky-400" aria-hidden="true" />
              <span className="break-words">查看完整视频提示词</span>
            </span>
            <ChevronDown className="h-4 w-4 flex-none text-zinc-500 transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
          </summary>
          <div className="min-w-0 border-t border-white/10 px-4 py-5 sm:px-5">
            <pre className="m-0 max-w-full overflow-x-hidden whitespace-pre-wrap break-words font-sans text-xs font-light leading-6 text-zinc-400 [overflow-wrap:anywhere] sm:text-sm sm:leading-7">{item.prompt}</pre>
          </div>
        </details>
      </div>
    </article>
  );
}

function MotionCaptureFeature({ setLightboxUrl }: AiVideoWorkflowShowcaseProps) {
  const { feature } = workflowContent;

  return (
    <section className="min-w-0 border-t border-white/10 pt-14 sm:pt-20" aria-labelledby="motion-capture-title">
      <div className="mb-8 min-w-0">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-purple-400">Creative feature · Motion capture</p>
        <h3 id="motion-capture-title" className="max-w-4xl break-words text-2xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
          {feature.title}
        </h3>
        <div className="mt-5 max-w-4xl space-y-2">
          {feature.intro.map((paragraph) => (
            <p key={paragraph} className="break-words text-sm font-light leading-7 text-zinc-300 sm:text-base">{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="grid min-w-0 gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.72fr)]">
        <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
          {feature.steps.map((step) => (
            <article key={step.number} className={`min-w-0 border border-white/10 bg-white/[0.015] p-4 sm:p-5 ${step.number === 3 ? 'sm:col-span-2' : ''}`}>
              <div className="mb-4 flex items-center justify-between gap-4">
                <span className="font-mono text-3xl text-white/15">0{step.number}</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-purple-400">Process</span>
              </div>
              <h4 className="mb-3 text-base font-semibold text-white">{step.title}</h4>
              <div className="space-y-2">
                {step.body.map((paragraph) => (
                  <p key={paragraph} className="break-words text-xs font-light leading-6 text-zinc-400 sm:text-sm sm:leading-7">{paragraph}</p>
                ))}
              </div>
              {step.image && (
                <div className="mt-5">
                  <AssetImage asset={step.image} setLightboxUrl={setLightboxUrl} wide />
                </div>
              )}
            </article>
          ))}
        </div>

        <div className="min-w-0">
          <div className="mb-4 flex items-center gap-2">
            <Clapperboard className="h-4 w-4 text-purple-400" aria-hidden="true" />
            <h4 className="text-sm font-semibold text-white">动作捕捉实验成片</h4>
          </div>
          <CaseVideo video={feature.video} />
        </div>
      </div>
    </section>
  );
}

export function AiVideoWorkflowShowcase({ setLightboxUrl }: AiVideoWorkflowShowcaseProps) {
  const workflowImage = mediaUrl(workflowContent.workflow.path);
  const imageCount = workflowContent.cases.reduce((sum, item) => sum + item.assets.length, 1)
    + workflowContent.feature.steps.filter((step) => step.image).length;

  return (
    <div className="min-w-0 overflow-x-clip animate-in fade-in slide-in-from-bottom-2 duration-500">
      <section className="relative min-w-0 overflow-hidden border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.12),transparent_40%),linear-gradient(145deg,#0b0b0b,#050505)] p-5 sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 translate-x-1/3 -translate-y-1/3 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="relative z-10 min-w-0">
          <div className="mb-5 flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-400 sm:text-xs">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            <span>ByteDance · Multimedia Design · AI Video Workflow</span>
          </div>
          <h2 className="max-w-4xl break-words text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {workflowContent.title}
          </h2>
          <p className="mt-4 max-w-3xl break-words text-base font-light leading-7 text-zinc-300 sm:text-xl sm:leading-8">
            {workflowContent.subtitle}
          </p>
          <p className="mt-6 max-w-3xl break-words text-sm font-light leading-7 text-zinc-400 sm:text-base">
            {workflowContent.summary}
          </p>

          <div className="mt-8 grid min-w-0 grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10 lg:grid-cols-4">
            {[
              ['04', '完整视频案例'],
              ['05', '本地成片'],
              [String(imageCount).padStart(2, '0'), '图片与流程资产'],
              ['01', '端到端 Skill 工作流'],
            ].map(([value, label]) => (
              <div key={label} className="min-w-0 bg-black/70 p-4 sm:p-5">
                <div className="font-mono text-2xl text-white sm:text-3xl">{value}</div>
                <div className="mt-1 break-words text-[11px] leading-5 text-zinc-500 sm:text-xs">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="min-w-0 py-14 sm:py-20" aria-labelledby="skill-workflow-title">
        <div className="mb-6 flex min-w-0 items-start gap-3">
          <div className="mt-1 flex h-9 w-9 flex-none items-center justify-center border border-sky-400/30 bg-sky-400/10 text-sky-300">
            <Workflow className="h-4 w-4" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-400">System overview</p>
            <h3 id="skill-workflow-title" className="mt-1 break-words text-2xl font-bold text-white sm:text-3xl">{workflowContent.workflow.label}</h3>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setLightboxUrl(workflowImage)}
          className="group block w-full min-w-0 overflow-hidden border border-white/10 bg-white text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          aria-label={`查看原图：${workflowContent.workflow.label}`}
        >
          <div className="aspect-[16/7] w-full overflow-hidden bg-white">
            <img
              src={workflowImage}
              alt={workflowContent.workflow.label}
              loading="lazy"
              decoding="async"
              className="h-auto w-full origin-top object-top transition-transform duration-500 group-hover:scale-[1.005]"
            />
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-black/10 bg-zinc-100 px-4 py-3 text-zinc-700 sm:px-5">
            <span className="text-xs font-medium sm:text-sm">点击查看完整流程图</span>
            <WandSparkles className="h-4 w-4 flex-none text-sky-600" aria-hidden="true" />
          </div>
        </button>
      </section>

      <section className="min-w-0" aria-label="四个完整视频案例">
        {workflowContent.cases.map((item) => (
          <React.Fragment key={item.id}>
            <WorkflowCaseSection item={item} setLightboxUrl={setLightboxUrl} />
          </React.Fragment>
        ))}
      </section>

      <MotionCaptureFeature setLightboxUrl={setLightboxUrl} />

      <footer className="mt-14 flex min-w-0 flex-col gap-2 border-t border-white/10 py-6 text-xs text-zinc-600 sm:mt-20 sm:flex-row sm:items-center sm:justify-between">
        <span>{workflowContent.title} · 完整案例归档</span>
        <span className="font-mono">Updated {workflowContent.updated_at}</span>
      </footer>
    </div>
  );
}
