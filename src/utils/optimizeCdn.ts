/**
 * Asset optimization and progressive preloader.
 * All images are cleanly hosted same-origin under /images/ (zero third-party external image links).
 * Video stream acceleration and background pre-buffering are maintained for optimal playback.
 */

import { PRELOAD_IMAGES_LIST } from './preloadList';

export function getOptimizedUrl(url: string | null | undefined): string {
  if (!url || typeof url !== 'string') return url || '';
  if (url.includes('BerryChen1/img-bed/images/')) {
    const filename = url.split('BerryChen1/img-bed/images/')[1];
    return `/images/${filename}`;
  }
  return url;
}

export function getVideoStreamUrl(url: string | null | undefined): string {
  if (!url || typeof url !== 'string') return url || '';
  return url;
}

export async function detectFastestCDN() {
  // All images are now same-origin local assets.
  // Preconnect critical video streaming endpoints.
  try {
    [
      "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev",
      "https://d8j0ntlcm91z4.cloudfront.net",
      "https://stream.mux.com"
    ].forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  } catch (e) {}
}

// Global DOM interception for video resilience and async image decoding
if (typeof window !== 'undefined') {
  // 1. Ensure all images use async decoding to keep scrolling buttery smooth
  const originalImgSet = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src')?.set;
  const originalImgGet = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src')?.get;

  if (originalImgSet) {
    Object.defineProperty(HTMLImageElement.prototype, 'src', {
      get() {
        return originalImgGet ? originalImgGet.call(this) : '';
      },
      set(val) {
        if (!this.decoding) {
          this.decoding = 'async';
        }
        if (typeof val === 'string' && val.includes('BerryChen1/img-bed/images/')) {
          const filename = val.split('BerryChen1/img-bed/images/')[1];
          originalImgSet.call(this, `/images/${filename}`);
        } else {
          originalImgSet.call(this, val);
        }
      },
      configurable: true,
      enumerable: true
    });
  }

  // 2. Intercept video src with fallback proxy support
  const interceptMediaSrc = (proto: any) => {
    const originalGet = Object.getOwnPropertyDescriptor(proto, 'src')?.get;
    const originalSet = Object.getOwnPropertyDescriptor(proto, 'src')?.set;

    if (originalSet) {
      Object.defineProperty(proto, 'src', {
        get() {
          return originalGet ? originalGet.call(this) : '';
        },
        set(val) {
          if (typeof val === 'string' && (val.includes('pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev') || val.includes('d8j0ntlcm91z4.cloudfront.net'))) {
            const elem = this as any;
            if (elem._cleanupVideoCdnListeners) {
              elem._cleanupVideoCdnListeners();
            }

            const directUrl = val;
            const proxyUrl = `/api/video-proxy?url=${encodeURIComponent(val)}`;

            const fallbackUrls = [directUrl, proxyUrl];
            let currentAttempt = 0;

            const tryNext = () => {
              if (currentAttempt < fallbackUrls.length) {
                const nextSrc = fallbackUrls[currentAttempt];
                currentAttempt++;
                originalSet.call(this, nextSrc);
              } else {
                cleanup();
              }
            };

            const cleanup = () => {
              this.removeEventListener('error', errorHandler);
              elem._cleanupVideoCdnListeners = null;
            };

            const errorHandler = () => {
              tryNext();
            };

            elem._cleanupVideoCdnListeners = cleanup;
            this.addEventListener('error', errorHandler);
            tryNext();
          } else {
            originalSet.call(this, val);
          }
        },
        configurable: true,
        enumerable: true
      });
    }
  };

  if (typeof HTMLVideoElement !== 'undefined') {
    interceptMediaSrc(HTMLVideoElement.prototype);
  }
  if (typeof HTMLMediaElement !== 'undefined') {
    interceptMediaSrc(HTMLMediaElement.prototype);
  }
}

// Keep a tracking Set of preloaded assets to avoid duplicate fetches
const preloadedVideos = new Set<string>();
const preloadedImages = new Set<string>();

/**
 * Background warm-up of video assets to pre-resolve sockets 
 * and pre-buffer stream chunks into the browser cache.
 */
export function warmUpVideo(url: string | null | undefined): void {
  if (!url || typeof url !== 'string' || !url.startsWith('http')) return;
  if (preloadedVideos.has(url)) return;
  
  preloadedVideos.add(url);
  
  try {
    const origin = new URL(url).origin;
    const existingLink = document.querySelector(`link[href^="${origin}"]`);
    if (!existingLink) {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = origin;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }
  } catch (e) {}

  try {
    const prefetchLink = document.createElement('link');
    prefetchLink.rel = 'prefetch';
    prefetchLink.as = 'video';
    prefetchLink.href = url;
    document.head.appendChild(prefetchLink);
  } catch (e) {
    try {
      const helperVideo = document.createElement('video');
      helperVideo.src = url;
      helperVideo.preload = 'auto';
      helperVideo.muted = true;
      helperVideo.load();
    } catch (err) {}
  }

  if (typeof fetch !== 'undefined') {
    fetch(url, { mode: 'cors', credentials: 'omit' })
      .then(async (response) => {
        if (!response.ok || !response.body) return;
        const reader = response.body.getReader();
        let bytesLoaded = 0;
        const maxBytes = 1.5 * 1024 * 1024; // 1.5MB
        
        while (true) {
          const { done, value } = await reader.read();
          if (done || !value) break;
          bytesLoaded += value.byteLength;
          if (bytesLoaded >= maxBytes) {
            await reader.cancel();
            break;
          }
        }
      })
      .catch(() => {});
  }
}

/**
 * Background pre-warming for local images into browser disk/memory cache.
 */
export function warmUpImage(url: string | null | undefined): void {
  if (!url || typeof url !== 'string') return;
  if (preloadedImages.has(url)) return;

  preloadedImages.add(url);

  try {
    const img = new Image();
    img.decoding = 'async';
    img.src = url;
  } catch (e) {}
}

let preloadingStarted = false;

/**
 * Background crawler that preloads critical images progressively during idle state.
 */
export function startProgressiveImagePreload(): void {
  if (preloadingStarted) return;
  preloadingStarted = true;

  setTimeout(() => {
    let index = 0;
    const MAX_PRELOAD_ITEMS = 40;
    const preloadNext = () => {
      if (index >= PRELOAD_IMAGES_LIST.length || index >= MAX_PRELOAD_ITEMS) {
        return;
      }

      const url = PRELOAD_IMAGES_LIST[index];
      index++;

      if (typeof window !== 'undefined') {
        const scheduler = (window as any).requestIdleCallback || (window as any).requestAnimationFrame || ((cb: any) => setTimeout(cb, 50));
        scheduler(() => {
          warmUpImage(url);
          setTimeout(preloadNext, 300);
        });
      }
    };

    preloadNext();
  }, 2000);
}

// Critical video portfolio assets to warm up during idle browser state
export const PRELOAD_VIDEOS_LIST = [
  "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/one.mp4",
  "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/two.mp4",
  "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/three.mp4",
  "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/four%EF%BC%881%EF%BC%89.mp4",
  "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/five%EF%BC%881%EF%BC%89.mp4",
  "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/six.mp4",
  "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/seven.mp4",
  "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/eight.mp4",
  "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/nine.mp4",
  "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/liaozhai%EF%BC%881%EF%BC%89.mp4",
  "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/wuxia%EF%BC%881%EF%BC%89.mp4",
  "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/sanguo%EF%BC%881%EF%BC%89.mp4",
  "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/liaozhai%EF%BC%882%EF%BC%89.mp4",
  "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/wuxia%EF%BC%882%EF%BC%89.mp4",
  "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/sanguo%EF%BC%882%EF%BC%89.mp4",
  "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/dnf1.mp4",
  "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/dnf2.mp4",
  "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/logo.mp4",
  "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/wuyin-nuo.mp4",
  "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/nandou.mp4",
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_120549_0cd82c36-56b3-4dd9-b190-069cfc3a623f.mp4",
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_132944_a0d124bb-eaa1-4082-aa30-2310efb42b4b.mp4",
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_125119_8e5ae31c-0021-4396-bc08-f7aebeb877a2.mp4",
  "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/tiktok1.mp4",
  "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/tiktok2.mp4",
  "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/tiktok3.mp4",
  "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/tiktok4.mp4"
];

let videoPreloadingStarted = false;

/**
 * Background crawler that preloads and caches video headers progressively.
 */
export function startProgressiveVideoPreload(): void {
  if (videoPreloadingStarted) return;
  videoPreloadingStarted = true;

  setTimeout(() => {
    let index = 0;
    const preloadNextVideo = () => {
      if (index >= PRELOAD_VIDEOS_LIST.length) {
        return;
      }

      const url = PRELOAD_VIDEOS_LIST[index];
      index++;

      if (typeof window !== 'undefined') {
        const scheduler = (window as any).requestIdleCallback || (window as any).requestAnimationFrame || ((cb: any) => setTimeout(cb, 50));
        scheduler(() => {
          warmUpVideo(url);
          setTimeout(preloadNextVideo, 1500);
        });
      }
    };

    preloadNextVideo();
  }, 4500);
}
