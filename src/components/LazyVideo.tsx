import React, { useEffect, useRef, useState } from 'react';

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
}

export const LazyVideo: React.FC<LazyVideoProps> = ({ src, className, preload = "metadata", onError, autoPlay, ...props }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [activeSrc, setActiveSrc] = useState(src);
  const [hasFailedDirect, setHasFailedDirect] = useState(false);

  useEffect(() => {
    setActiveSrc(src);
    setHasFailedDirect(false);
  }, [src]);

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    if (!hasFailedDirect && activeSrc && !activeSrc.includes('/api/video-proxy')) {
      setHasFailedDirect(true);
      const proxyUrl = `/api/video-proxy?url=${encodeURIComponent(src)}`;
      setActiveSrc(proxyUrl);
    }
    if (onError) {
      onError(e);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            if (autoPlay) {
              video.play().catch(() => {});
            }
          } else {
            // When out of view, pause it to save GPU decoding resources
            if (autoPlay) {
              video.pause();
            }
          }
        });
      },
      // Start loading slightly before it enters the viewport
      { rootMargin: '250px' }
    );

    observer.observe(video);

    return () => {
      if (video) {
        observer.unobserve(video);
      }
    };
  }, [autoPlay]);

  return (
    <video
      ref={videoRef}
      className={className}
      src={shouldLoad ? activeSrc : undefined}
      preload={preload}
      onError={handleVideoError}
      autoPlay={shouldLoad ? autoPlay : false}
      {...props}
    />
  );
};
