import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, Settings, FastForward } from 'lucide-react';

interface CustomVideoPlayerProps {
  src: string;
  language?: 'zh' | 'en';
  aspectRatio?: string;
}

export const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({ 
  src, 
  language = 'zh',
  aspectRatio = 'aspect-video'
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  // Localization translator helper
  const t = (zh: string, en: string) => (language === 'zh' ? zh : en);

  // Intersection Observer for performance-oriented lazy preloading and scroll auto-pausing
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasBeenInView(true);
          } else {
            // Instantly pause playback if the player goes offscreen to reclaim CPU and Network resources
            if (videoRef.current && !videoRef.current.paused) {
              videoRef.current.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      { rootMargin: '800px' } // Preload when video player is within 800px of visible viewport
    );

    observer.observe(container);
    return () => {
      observer.unobserve(container);
    };
  }, []);

  // Format seconds to mm:ss
  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return '00:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Play / Pause Toggle
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(err => console.log("Video playback error: ", err));
    }
  };

  // Synchronize play/pause state from the video element events directly to prevent de-sync
  const handlePlayStateChange = () => {
    if (videoRef.current) {
      setIsPlaying(!videoRef.current.paused);
    }
  };

  // Updates time and progress sliders
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    setProgress(current);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  // Seek handler
  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const seekTime = parseFloat(e.target.value);
    videoRef.current.currentTime = seekTime;
    setProgress(seekTime);
  };

  // Volume slider handler
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    setIsMuted(vol === 0);
    if (videoRef.current) {
      videoRef.current.volume = vol;
      videoRef.current.muted = vol === 0;
    }
  };

  // Mute / Unmute Toggle
  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    videoRef.current.muted = nextMuted;
    if (!nextMuted && volume === 0) {
      setVolume(0.5);
      videoRef.current.volume = 0.5;
    }
  };

  // Fullscreen toggle utilizing standard Cross-Browser APIs
  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(err => console.error("Error entering fullscreen: ", err));
    } else {
      document.exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch(err => console.error("Error exiting fullscreen: ", err));
    }
  };

  // Sync state if user exits fullscreen via ESC key natively
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Sync duration on mount or loading
  useEffect(() => {
    if (videoRef.current) {
      if (videoRef.current.duration) {
        setDuration(videoRef.current.duration);
      }
    }
  }, [src, hasBeenInView]);

  // Handle Playback rate change
  const handleSpeedChange = (rate: number) => {
    setPlaybackRate(rate);
    setShowSpeedMenu(false);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  // Controls auto-hide logic on idle
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeoutId);
      // Wait 2.5 seconds, then hide controls if the video is playing
      if (isPlaying) {
        timeoutId = setTimeout(() => {
          setShowControls(false);
          setShowSpeedMenu(false);
        }, 2500);
      }
    };

    const handleMouseLeave = () => {
      if (isPlaying) {
        timeoutId = setTimeout(() => {
          setShowControls(false);
          setShowSpeedMenu(false);
        }, 800);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
      clearTimeout(timeoutId);
    };
  }, [isPlaying]);

  // Percentage of current progress for drawing custom track fill gradients
  const progressPercent = duration ? (progress / duration) * 100 : 0;
  const volumePercent = isMuted ? 0 : volume * 100;

  return (
    <div 
      ref={containerRef}
      className={`group/player relative w-full ${aspectRatio} rounded-3xl overflow-hidden border border-white/10 bg-black shadow-[0_0_50px_rgba(0,0,0,0.85)] select-none transition-all duration-300 ${
        isFullscreen ? 'rounded-none border-none' : 'hover:border-sky-500/30'
      }`}
      onContextMenu={(e) => e.preventDefault()}
      id="custom-video-player"
    >
      {/* Actual HTML Video Tag - Standard configurations applied natively */}
      <video
        ref={videoRef}
        src={hasBeenInView ? src : undefined}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={handlePlayStateChange}
        onPause={handlePlayStateChange}
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => setIsBuffering(false)}
        onSeeking={() => setIsBuffering(true)}
        onSeeked={() => setIsBuffering(false)}
        onCanPlay={() => setIsBuffering(false)}
        onClick={togglePlay}
        onDoubleClick={toggleFullscreen}
        playsInline
        preload={hasBeenInView ? "auto" : "none"}
        controlsList="nodownload"
        className={`w-full h-full object-cover transition-all duration-500 will-change-transform transform-gpu ${
          isPlaying ? 'brightness-100' : 'brightness-[0.7]'
        }`}
        referrerPolicy="no-referrer"
      />

      {/* BarryAI Repeated Faint Watermark Overlay */}
      <div className="absolute inset-0 pointer-events-none select-none z-[8] flex flex-col justify-between py-6 md:py-10 overflow-hidden">
        {Array.from({ length: 3 }).map((_, rowIdx) => (
          <div 
            key={rowIdx} 
            className={`flex justify-around items-center w-full ${rowIdx % 2 === 0 ? 'translate-x-[5%]' : '-translate-x-[5%]'}`}
          >
            {Array.from({ length: 3 }).map((_, colIdx) => {
              const isCenter = rowIdx === 1 && colIdx === 1;
              return (
                <div 
                  key={colIdx} 
                  className={`text-zinc-500 font-black tracking-wider uppercase select-none transform -rotate-[22deg] whitespace-nowrap transition-opacity duration-300 ${
                    isCenter ? 'opacity-0 h-0 w-0' : 'text-lg md:text-3xl opacity-[0.11]'
                  }`}
                  style={{ fontStyle: 'italic' }}
                >
                  {!isCenter && "BarryAI"}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Gentle Bottom Vignette & Glowing borders */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none transition-opacity duration-300 ${
        showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
      }`} />

      {/* Huge Decorative Pulsing Play/Pause button Overlay in center */}
      {!isPlaying && !isBuffering && (
        <div 
          onClick={togglePlay}
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 cursor-pointer z-10"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-black/65 border border-white/15 hover:border-sky-400 hover:bg-sky-500/10 flex items-center justify-center backdrop-blur-md transition-all duration-500 hover:scale-110 shadow-[0_0_30px_rgba(56,189,248,0.3)]">
            <Play className="w-6 h-6 md:w-8 md:h-8 text-white fill-white translate-x-0.5" />
          </div>
          <span className="px-4 py-1.5 rounded-full bg-black/85 border border-white/10 text-[10px] md:text-xs text-zinc-350 font-sans tracking-wide backdrop-blur-md hover:text-white transition-all duration-300">
            {t("点击播放视频", "Click to Play Video")}
          </span>
        </div>
      )}

      {/* Dynamic Cinematic Buffering Overlay */}
      {isBuffering && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/45 backdrop-blur-[2px] z-10 pointer-events-none">
          <div className="w-11 h-11 border-2 border-sky-450/20 border-t-sky-400 rounded-full animate-spin shadow-[0_0_15px_rgba(56,189,248,0.2)]" />
          <span className="text-[10px] md:text-xs text-sky-450 font-sans tracking-[0.25em] uppercase font-semibold text-zinc-300 antialiased drop-shadow-[0_0_8px_rgba(56,189,248,0.4)]">
            {t("智能解码缓存中", "Optimizing Stream")}
          </span>
        </div>
      )}

      {/* Modern Glassmorphic Dashboard Controls */}
      <div className={`absolute bottom-0 inset-x-0 p-4 md:p-6 flex flex-col gap-2.5 transition-all duration-500 z-20 ${
        showControls || !isPlaying ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        
        {/* Dynamic & Pure Mini Seek bar - now placed beautifully at the top of the controls stack */}
        <div className="flex flex-col gap-0.5 w-full group/seek">
          <div className="relative flex items-center w-full">
            <input
              type="range"
              min={0}
              max={duration || 100}
              step={0.01}
              value={progress}
              onChange={handleSeekChange}
              className="w-full h-0.5 rounded-full appearance-none cursor-pointer outline-none transition-all duration-300 opacity-90 group-hover/seek:opacity-100 bg-white/10 group-hover/seek:h-1
                [&::-webkit-slider-runnable-track]:bg-transparent
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-2
                [&::-webkit-slider-thumb]:h-2
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-sky-400
                [&::-webkit-slider-thumb]:border
                [&::-webkit-slider-thumb]:border-white
                [&::-webkit-slider-thumb]:shadow-[0_0_6px_rgba(56,189,248,1)]
                [&::-webkit-slider-thumb]:scale-100
                [&::-webkit-slider-thumb]:group-hover/seek:scale-110
                [&::-webkit-slider-thumb]:transition-all
                
                [&::-moz-range-track]:bg-transparent
                [&::-moz-range-thumb]:w-2
                [&::-moz-range-thumb]:h-2
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-sky-400
                [&::-moz-range-thumb]:border
                [&::-moz-range-thumb]:border-white
                [&::-moz-range-thumb]:shadow-[0_0_6px_rgba(56,189,248,1)]
                [&::-moz-range-thumb]:scale-100
                [&::-moz-range-thumb]:group-hover/seek:scale-110
                [&::-moz-range-thumb]:transition-all
              "
              style={{
                background: `linear-gradient(to right, #38bdf8 0%, #00f0ff ${progressPercent}%, rgba(255, 255, 255, 0.1) ${progressPercent}%, rgba(255, 255, 255, 0.1) 100%)`
              }}
            />
          </div>
          
          {/* Timeline counter micro text underneath seekbar */}
          {duration > 0 && (
            <div className="flex justify-between text-[8px] md:text-[9px] text-zinc-400/80 font-mono tracking-wider px-0.5 mt-0.5">
              <span>{formatTime(progress)}</span>
              <span>-{formatTime(Math.max(0, duration - progress))}</span>
            </div>
          )}
        </div>

        {/* Dashboard Actions Panel - now placed underneath the seekbar */}
        <div className="flex items-center justify-between gap-4 mt-1">
          <div className="flex items-center gap-3">
            {/* Play / Pause button */}
            <button 
              onClick={togglePlay}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/5 hover:border-white/10 text-white transition-all duration-300 focus:outline-none"
              title={isPlaying ? t("暂停", "Pause") : t("播放", "Play")}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 md:w-5 md:h-5 text-sky-400 fill-sky-400" />
              ) : (
                <Play className="w-4 h-4 md:w-5 md:h-5 text-white fill-white" />
              )}
            </button>

            {/* Volume Control widget */}
            <div className="flex items-center gap-2 group/volume bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl px-2.5 py-1.5 transition-all duration-300">
              <button 
                onClick={toggleMute}
                className="text-zinc-300 hover:text-white focus:outline-none"
                title={isMuted ? t("取消静音", "Unmute") : t("静音", "Mute")}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 md:w-5 md:h-5 text-rose-400" />
                ) : (
                  <Volume2 className="w-4 h-4 md:w-5 md:h-5" />
                )}
              </button>

              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-0 group-hover/volume:w-16 md:group-hover/volume:w-20 h-1 rounded-full appearance-none bg-white/20 accent-sky-400 cursor-pointer outline-none transition-all duration-300 opacity-0 group-hover/volume:opacity-100
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-2.5
                  [&::-webkit-slider-thumb]:h-2.5
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-white
                  
                  [&::-moz-range-thumb]:w-2.5
                  [&::-moz-range-thumb]:h-2.5
                  [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:bg-white
                "
                style={{
                  background: `linear-gradient(to right, #38bdf8 0%, #38bdf8 ${volumePercent}%, rgba(255, 255, 255, 0.2) ${volumePercent}%, rgba(255, 255, 255, 0.2) 100%)`
                }}
              />
            </div>

            {/* Time counter details */}
            <span className="hidden sm:inline text-xs text-zinc-350 font-mono tracking-wider ml-1 bg-black/35 px-2.5 py-1 rounded-lg border border-white/5">
              {formatTime(progress)} <span className="text-zinc-500">/</span> {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-300">
            {/* Playback speed selector */}
            <div className="relative">
              <button
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/5 text-[10px] md:text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 focus:outline-none"
              >
                <FastForward className="w-3.5 h-3.5 text-zinc-400" />
                {playbackRate.toFixed(1)}x
              </button>

              {showSpeedMenu && (
                <div className="absolute bottom-full right-0 mb-2 py-1 w-20 rounded-xl bg-zinc-950/95 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col z-30 transform origin-bottom animate-in fade-in slide-in-from-bottom-2 duration-300">
                  {[0.5, 1.0, 1.25, 1.5, 2.0].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => handleSpeedChange(rate)}
                      className={`px-3 py-1 text-left font-mono text-xs hover:bg-sky-500/20 hover:text-sky-300 transition-colors ${
                        playbackRate === rate ? 'text-sky-400 font-bold bg-sky-500/[0.07]' : 'text-zinc-400'
                      }`}
                    >
                      {rate.toFixed(1)}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/5 hover:border-white/10 text-white transition-all duration-300 focus:outline-none"
              title={isFullscreen ? t("退出全屏", "Exit Fullscreen") : t("全屏", "Fullscreen")}
            >
              {isFullscreen ? (
                <Minimize className="w-4 h-4 md:w-5 md:h-5 text-sky-400" />
              ) : (
                <Maximize className="w-4 h-4 md:w-5 md:h-5" />
              )}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
