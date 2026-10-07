import { useEffect, useRef, useState } from 'react';

interface VisibleLoopVideoProps {
  src: string;
  className?: string;
  paused?: boolean;
}

// Keep the existing loop in view, but do not load or play hidden homepage tiles.
export function VisibleLoopVideo({ src, className, paused = false }: VisibleLoopVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(() => document.visibilityState !== 'hidden');
  const [hasLoaded, setHasLoaded] = useState(false);
  const [failedDirect, setFailedDirect] = useState(false);
  const shouldPlay = inView && pageVisible && !paused;
  const shouldPlayRef = useRef(shouldPlay);
  shouldPlayRef.current = shouldPlay;

  useEffect(() => {
    const video = videoRef.current;
    return () => {
      // Retain the element for cleanup after React detaches its ref, and stop
      // any pending play() promise from reviving an unmounted tile.
      shouldPlayRef.current = false;
      video?.pause();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting && entry.intersectionRatio > 0);
    }, { threshold: [0, 0.01] });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateVisibility = () => setPageVisible(document.visibilityState !== 'hidden');
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  const syncPlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (shouldPlayRef.current && video.getAttribute('src')) {
      void video.play().then(() => {
        // A tile may leave view while the asynchronous play request is pending.
        if (!shouldPlayRef.current) video.pause();
      }).catch(() => {});
    } else {
      video.pause();
    }
  };

  useEffect(() => {
    if (shouldPlay) setHasLoaded(true);
    syncPlayback();
  }, [shouldPlay, hasLoaded, failedDirect]);

  const activeSrc = failedDirect ? `/api/video-proxy?url=${encodeURIComponent(src)}` : src;
  return (
    <video
      ref={videoRef}
      src={hasLoaded ? activeSrc : undefined}
      className={className}
      loop
      muted
      playsInline
      preload="none"
      aria-hidden="true"
      onCanPlay={syncPlayback}
      onError={() => {
        if (!failedDirect && src.startsWith('https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/')) {
          setFailedDirect(true);
        }
      }}
    />
  );
}
