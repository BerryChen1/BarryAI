import React, { useEffect, useRef, useState } from 'react';

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
}

export const LazyVideo: React.FC<LazyVideoProps> = ({ src, className, preload = "auto", ...props }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Use a highly generous rootMargin (1000px) so background loops load well in advance
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.unobserve(video);
        }
      },
      { rootMargin: '1000px' }
    );

    observer.observe(video);

    // Elegant idle optimization: if the user remains on the site after 2 seconds,
    // they are engaged. We can gracefully proceed to load the atmospheric loops
    // in the background to ensure instantaneous layout playback when they scroll.
    const idleTimer = setTimeout(() => {
      setShouldLoad(true);
      if (video) {
        observer.unobserve(video);
      }
    }, 2000);

    return () => {
      clearTimeout(idleTimer);
      if (video) {
        observer.unobserve(video);
      }
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      src={shouldLoad ? src : undefined}
      preload={preload}
      {...props}
    />
  );
};
