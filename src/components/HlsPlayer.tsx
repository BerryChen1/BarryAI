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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '150px' } // Load slightly before coming into view
    );

    observer.observe(video);
    return () => {
      observer.unobserve(video);
    };
  }, []);

  useEffect(() => {
    let active = true;

    if (!isInView) {
      if (videoRef.current) {
        try {
          videoRef.current.pause();
        } catch (e) {
          // Ignored
        }
      }
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    const playVideo = async () => {
      try {
        if (!active) return;
        await video.play();
      } catch (err: any) {
        if (err && err.name === 'AbortError') {
          // Play request was safely interrupted by a new load/pause, silent discard.
          return;
        }
        // Retrying with explicit mute
        if (active) {
          video.muted = true;
          try {
            await video.play();
          } catch (e: any) {
            if (e && e.name !== 'AbortError') {
              console.warn("HlsJS play failed:", e);
            }
          }
        }
      }
    };

    if (Hls.isSupported()) {
      hls = new Hls({
        maxMaxBufferLength: 20, // Increase buffer length to allow smoother playback over fluctuating pipelines
        enableWorker: true,
        lowLatencyMode: false,  // Buffer more advance segments rather than favoring minimum lag
        backBufferLength: 10,
        fragLoadingRetryDelay: 1000,
        fragLoadingMaxRetry: 6,
        manifestLoadingRetryDelay: 1000,
        manifestLoadingMaxRetry: 6,
      });
      hls.loadSource(url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (active) {
          playVideo();
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url;
      const onLoadedMetadata = () => {
        if (active) {
          playVideo();
        }
      };
      video.addEventListener('loadedmetadata', onLoadedMetadata);

      return () => {
        active = false;
        video.removeEventListener('loadedmetadata', onLoadedMetadata);
        try {
          video.pause();
          video.src = "";
          video.load();
        } catch (e) {}
      };
    }

    return () => {
      active = false;
      if (hls) {
        try {
          hls.destroy();
        } catch (err) {}
      }
    };
  }, [url, isInView]);

  return (
    <video
      ref={videoRef}
      id={id}
      className={className}
      muted
      loop
      playsInline
    />
  );
}
