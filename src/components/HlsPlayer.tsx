import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

interface HlsPlayerProps {
  url: string;
  className?: string;
  id?: string;
}

export function HlsPlayer({ url, className, id }: HlsPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const hlsRef = useRef<Hls | null>(null);

  // 1. Intersection Observer to control playing and pausing only
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Use a wider margin (600px) to trigger play/pause well ahead of arrival
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '600px' }
    );

    observer.observe(video);
    return () => {
      observer.unobserve(video);
    };
  }, []);

  // 2. Play/Pause toggle based on visibility (preserves background buffers)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      const playVideo = async () => {
        try {
          video.muted = true;
          await video.play();
        } catch (err: any) {
          if (err && err.name !== 'AbortError') {
            console.warn("HlsPlayer play failed:", err);
          }
        }
      };
      playVideo();
    } else {
      try {
        video.pause();
      } catch (e) {
        // Ignored
      }
    }
  }, [isInView]);

  // 3. Initialize HLS once on mount and keep preloading in the background
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    const initHls = () => {
      if (Hls.isSupported()) {
        hls = new Hls({
          maxMaxBufferLength: 40, // Increased buffer length to handle high-fidelity streams smoothly
          enableWorker: true,
          lowLatencyMode: false,
          backBufferLength: 20,
          fragLoadingRetryDelay: 1000,
          fragLoadingMaxRetry: 8,
          manifestLoadingRetryDelay: 1000,
          manifestLoadingMaxRetry: 8,
        });
        hlsRef.current = hls;
        hls.loadSource(url);
        hls.attachMedia(video);
        video.preload = "auto";
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
        video.preload = "auto";
      }
    };

    // Delay initialization by 500ms so initial critical layout paint is prioritized
    const timer = setTimeout(initHls, 500);

    return () => {
      clearTimeout(timer);
      if (hlsRef.current) {
        try {
          hlsRef.current.destroy();
          hlsRef.current = null;
        } catch (err) {}
      }
      if (video) {
        try {
          video.src = "";
          video.load();
        } catch (e) {}
      }
    };
  }, [url]);

  return (
    <video
      ref={videoRef}
      id={id}
      className={className}
      muted
      loop
      playsInline
      preload="auto"
    />
  );
}
