import React, { useEffect, useRef, useState } from 'react';

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
}

export const LazyVideo: React.FC<LazyVideoProps> = ({ src, className, ...props }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.unobserve(video);
        }
      },
      { rootMargin: '150px' } // Pre-load slightly before coming into view
    );

    observer.observe(video);
    return () => {
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
      {...props}
    />
  );
};
