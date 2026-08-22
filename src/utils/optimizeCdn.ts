/**
 * CDN mirror speed optimization for Mainland China and Global networks.
 * Automatically resolves and reroutes requests of un-routed jsDelivr nodes to high-speed CDN mirrors
 * like GCore, Fastly, and high-speed China-friendly endpoints dynamically based on real-time latency tests.
 */

import { PRELOAD_IMAGES_LIST } from './preloadList';

export const JSDELIVR_MIRRORS = [
  "https://cdn.jsdmirror.com/gh/",     // Jsdmirror CDN - ultra-fast in China & globally
  "https://fastly.jsdelivr.net/gh/",   // Fastly high-speed global CDN
  "https://gcore.jsdelivr.net/gh/",    // GCore premium global CDN
  "https://jsdelivr.b-cdn.net/gh/",    // Bunny.net corporate CDN
  "https://jsd.onmicrosoft.cn/gh/",    // Miaoruan mirror for China
  "https://testingcf.jsdelivr.net/gh/",// Cloudflare-backed alternative routing
  "https://cdn.jsdelivr.net/gh/"       // Native jsDelivr default fallback
];

// Default directly to ultra-fast CDN mirror
let selectedMirror = "https://cdn.jsdmirror.com/gh/";

export function getOptimizedUrl(url: string | null | undefined): string {
  if (!url || typeof url !== 'string') return url || '';
  
  let normalizedVal = url;
  for (const mirror of JSDELIVR_MIRRORS) {
    if (url.includes(mirror)) {
      normalizedVal = url.replace(mirror, 'https://cdn.jsdelivr.net/gh/');
      break;
    }
  }

  if (normalizedVal.includes('cdn.jsdelivr.net/gh/')) {
    return normalizedVal.replace('https://cdn.jsdelivr.net/gh/', selectedMirror);
  }
  return url;
}

export function getVideoStreamUrl(url: string | null | undefined): string {
  if (!url || typeof url !== 'string') return url || '';
  return url;
}

// Low-overhead background check to ensure mirror is alive without blocking
export async function detectFastestCDN() {
  const testPath = "BerryChen1/img-bed/images/20260613171852678.png";
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 1800);

  // Immediately inject preconnect links
  try {
    [
      "https://cdn.jsdmirror.com",
      "https://fastly.jsdelivr.net",
      "https://gcore.jsdelivr.net",
      "https://jsd.onmicrosoft.cn",
      "https://jsdelivr.b-cdn.net",
      "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev",
      "https://d8j0ntlcm91z4.cloudfront.net"
    ].forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  } catch (e) {}

  try {
    const promises = [
      "https://cdn.jsdmirror.com/gh/",
      "https://fastly.jsdelivr.net/gh/",
      "https://gcore.jsdelivr.net/gh/",
      "https://jsd.onmicrosoft.cn/gh/"
    ].map(async (mirror) => {
      const startTime = performance.now();
      try {
        const img = new Image();
        const promise = new Promise<number>((resolve, reject) => {
          img.onload = () => resolve(performance.now() - startTime);
          img.onerror = () => reject(new Error('load error'));
          img.src = `${mirror}${testPath}?t=${Date.now()}`;
        });
        const duration = await promise;
        return { mirror, duration };
      } catch (e) {
        return { mirror, duration: 9999 };
      }
    });

    const results = await Promise.race([
      Promise.all(promises),
      new Promise<any[]>((resolve) => setTimeout(() => resolve([]), 1500))
    ]);
    clearTimeout(timeoutId);

    const activeResults = results.filter((r: any) => r && r.duration < 9000);
    if (activeResults.length > 0) {
      activeResults.sort((a: any, b: any) => a.duration - b.duration);
      selectedMirror = activeResults[0].mirror;
    }
  } catch (err) {
    clearTimeout(timeoutId);
  }
}

// Global DOM and Prototype Interception for automatic fault tolerance
if (typeof window !== 'undefined') {
  // 1. Intercept property setter of HTMLImageElement.prototype.src
  const originalImgGet = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src')?.get;
  const originalImgSet = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src')?.set;

  if (originalImgSet) {
    Object.defineProperty(HTMLImageElement.prototype, 'src', {
      get() {
        return originalImgGet ? originalImgGet.call(this) : '';
      },
      set(val) {
        if (!this.decoding) {
          this.decoding = 'async';
        }
        if (typeof val === 'string' && (val.includes('cdn.jsdelivr.net/gh/') || JSDELIVR_MIRRORS.some(m => val.includes(m)))) {
          let normalizedVal = val;
          for (const mirror of JSDELIVR_MIRRORS) {
            if (val.includes(mirror)) {
              normalizedVal = val.replace(mirror, 'https://cdn.jsdelivr.net/gh/');
              break;
            }
          }

          const directMirrorUrl = normalizedVal.replace('https://cdn.jsdelivr.net/gh/', selectedMirror);

          const elem = this as any;
          if (elem._cleanupCdnListeners) {
            elem._cleanupCdnListeners();
          }

          // Build clean list of fast direct CDN mirrors + backend image proxy fallback
          const triedUrls = new Set<string>();
          const fallbackUrls: string[] = [];

          if (!triedUrls.has(directMirrorUrl)) {
            fallbackUrls.push(directMirrorUrl);
            triedUrls.add(directMirrorUrl);
          }

          JSDELIVR_MIRRORS.forEach(mirror => {
            const mirrorUrl = normalizedVal.replace('https://cdn.jsdelivr.net/gh/', mirror);
            if (!triedUrls.has(mirrorUrl)) {
              fallbackUrls.push(mirrorUrl);
              triedUrls.add(mirrorUrl);
            }
          });

          // Final safety net: server-side image proxy
          const proxyFallback = `/api/image-proxy?url=${encodeURIComponent(normalizedVal)}`;
          if (!triedUrls.has(proxyFallback)) {
            fallbackUrls.push(proxyFallback);
            triedUrls.add(proxyFallback);
          }

          let currentAttemptIndex = 0;

          const loadNextUrl = () => {
            if (currentAttemptIndex < fallbackUrls.length) {
              const nextUrl = fallbackUrls[currentAttemptIndex];
              currentAttemptIndex++;
              originalImgSet.call(this, nextUrl);
            } else {
              cleanup();
            }
          };

          const cleanup = () => {
            this.removeEventListener('error', errorHandler);
            this.removeEventListener('load', successHandler);
            elem._cleanupCdnListeners = null;
          };

          const errorHandler = () => {
            loadNextUrl();
          };

          const successHandler = () => {
            cleanup();
          };

          elem._cleanupCdnListeners = cleanup;
          this.addEventListener('error', errorHandler);
          this.addEventListener('load', successHandler);

          loadNextUrl();
        } else {
          originalImgSet.call(this, val);
        }
      },
      configurable: true,
      enumerable: true
    });
  }

  // 2. Intercept property setter of HTMLSourceElement.prototype.src
  const originalSourceGet = Object.getOwnPropertyDescriptor(HTMLSourceElement.prototype, 'src')?.get;
  const originalSourceSet = Object.getOwnPropertyDescriptor(HTMLSourceElement.prototype, 'src')?.set;

  if (originalSourceSet) {
    Object.defineProperty(HTMLSourceElement.prototype, 'src', {
      get() {
        return originalSourceGet ? originalSourceGet.call(this) : '';
      },
      set(val) {
        if (typeof val === 'string' && val.includes('cdn.jsdelivr.net/gh/')) {
          const optimized = val.replace('https://cdn.jsdelivr.net/gh/', selectedMirror);
          originalSourceSet.call(this, optimized);
        } else {
          originalSourceSet.call(this, val);
        }
      },
      configurable: true,
      enumerable: true
    });
  }

  // 3. Intercept property setter of HTMLVideoElement/HTMLMediaElement.prototype.src with video proxy failover
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
          } else if (typeof val === 'string' && val.includes('cdn.jsdelivr.net/gh/')) {
            const optimized = val.replace('https://cdn.jsdelivr.net/gh/', selectedMirror);
            originalSet.call(this, optimized);
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

  // 4. Intercept Element.prototype.setAttribute
  const originalSetAttribute = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function(name, value) {
    if (
      name === 'src' &&
      (this instanceof HTMLImageElement || this.tagName === 'IMG') &&
      typeof value === 'string' &&
      (value.includes('cdn.jsdelivr.net/gh/') || JSDELIVR_MIRRORS.some(m => value.includes(m)))
    ) {
      this.src = value;
      return;
    }

    if (
      name === 'src' &&
      (this instanceof HTMLVideoElement || this.tagName === 'VIDEO') &&
      typeof value === 'string' &&
      (value.includes('pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev') || value.includes('d8j0ntlcm91z4.cloudfront.net'))
    ) {
      this.src = value;
      return;
    }

    return originalSetAttribute.call(this, name, value);
  };
}

// Keep a tracking Set of preloaded video URLs to avoid duplicate fetches
const preloadedVideos = new Set<string>();
const preloadedImages = new Set<string>();

/**
 * Highly optimized background warm-up of video assets to pre-resolve sockets 
 * and pre-buffer stream chunks into the browser's persistent cache.
 */
export function warmUpVideo(url: string | null | undefined): void {
  if (!url || typeof url !== 'string' || !url.startsWith('http')) return;
  if (preloadedVideos.has(url)) return;
  
  preloadedVideos.add(url);
  
  // 1. Instantly perform speed warming by creating a link relation mapping the remote origin
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

  // 2. Perform background pre-fetching / buffering of video chunks
  try {
    // Try modern HTML5 prefetch mechanism
    const prefetchLink = document.createElement('link');
    prefetchLink.rel = 'prefetch';
    prefetchLink.as = 'video';
    prefetchLink.href = url;
    document.head.appendChild(prefetchLink);
  } catch (e) {
    // Elegant fallback: Spawn a silent lightweight HTML5 video tag to preload chunks off-screen
    try {
      const helperVideo = document.createElement('video');
      helperVideo.src = url;
      helperVideo.preload = 'auto';
      helperVideo.muted = true;
      helperVideo.load();
    } catch (err) {}
  }

  // 3. Advanced stream pre-buffering via partial body chunk retrieval
  // This downloads the first 1.5MB containing video metadata (moov atom) and start frames
  // directly into the browser's HTTP disk/memory cache.
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
 * Highly optimized background pre-warming for images.
 * Downloads the optimized image format directly into browser HTTP cache ahead of use.
 */
export function warmUpImage(url: string | null | undefined): void {
  if (!url || typeof url !== 'string' || !url.startsWith('http')) return;
  if (preloadedImages.has(url)) return;

  preloadedImages.add(url);

  try {
    let normalizedUrl = url;
    for (const mirror of JSDELIVR_MIRRORS) {
      if (url.includes(mirror)) {
        normalizedUrl = url.replace(mirror, 'https://cdn.jsdelivr.net/gh/');
        break;
      }
    }

    let finalUrl = normalizedUrl;
    if (normalizedUrl.includes('cdn.jsdelivr.net/gh/')) {
      finalUrl = normalizedUrl.replace('https://cdn.jsdelivr.net/gh/', selectedMirror);
    }

    const img = new Image();
    img.src = finalUrl;
  } catch (e) {}
}

let preloadingStarted = false;

/**
 * Highly optimized background crawler that preloads all images in the portfolio
 * progressively when the browser is idle to guarantee 0ms local cache hits.
 */
export function startProgressiveImagePreload(): void {
  if (preloadingStarted) return;
  preloadingStarted = true;

  // Wait 3 seconds after boot before kicking off, to ensure standard resources load first
  setTimeout(() => {
    let index = 0;
    const MAX_PRELOAD_ITEMS = 35; // Preload only critical initial layout images to prevent connection congestion
    const preloadNext = () => {
      if (index >= PRELOAD_IMAGES_LIST.length || index >= MAX_PRELOAD_ITEMS) {
        console.log('[CDN Optimizer] Background progressive image preloading of critical assets completed.');
        return;
      }

      const url = PRELOAD_IMAGES_LIST[index];
      index++;

      if (typeof window !== 'undefined') {
        const scheduler = (window as any).requestIdleCallback || (window as any).requestAnimationFrame || ((cb: any) => setTimeout(cb, 50));
        scheduler(() => {
          warmUpImage(url);
          // 450ms interval to stream but keep network pipe completely free and responsive
          setTimeout(preloadNext, 450);
        });
      }
    };

    console.log(`[CDN Optimizer] Booting background progressive preloader for first ${Math.min(PRELOAD_IMAGES_LIST.length, MAX_PRELOAD_ITEMS)} critical assets...`);
    preloadNext();
  }, 3000);
}

// Highly optimized list of critical video portfolio assets to warm up during idle browser state
export const PRELOAD_VIDEOS_LIST = [
  // Core works / critical portfolio pieces
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
  // Cloudfront high quality videos
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_120549_0cd82c36-56b3-4dd9-b190-069cfc3a623f.mp4",
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_132944_a0d124bb-eaa1-4082-aa30-2310efb42b4b.mp4",
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_125119_8e5ae31c-0021-4396-bc08-f7aebeb877a2.mp4",
  // TikTok specific videos
  "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/tiktok1.mp4",
  "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/tiktok2.mp4",
  "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/tiktok3.mp4",
  "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%EF%BC%88small%EF%BC%89/tiktok4.mp4"
];

let videoPreloadingStarted = false;

/**
 * Highly optimized background crawler that preloads and caches video headers
 * progressively when the browser is idle to guarantee lag-free start times.
 */
export function startProgressiveVideoPreload(): void {
  if (videoPreloadingStarted) return;
  videoPreloadingStarted = true;

  // Wait 4.5 seconds after boot (staggered after image preloader) to prevent thread/network contention
  setTimeout(() => {
    let index = 0;
    const preloadNextVideo = () => {
      if (index >= PRELOAD_VIDEOS_LIST.length) {
        console.log('[CDN Optimizer] Background progressive video preloading completed.');
        return;
      }

      const url = PRELOAD_VIDEOS_LIST[index];
      index++;

      if (typeof window !== 'undefined') {
        const scheduler = (window as any).requestIdleCallback || (window as any).requestAnimationFrame || ((cb: any) => setTimeout(cb, 50));
        scheduler(() => {
          warmUpVideo(url);
          // Wait 1.5 seconds between each video pre-buffering to keep network completely free and responsive
          setTimeout(preloadNextVideo, 1500);
        });
      }
    };

    console.log(`[CDN Optimizer] Booting background progressive video preloader for ${PRELOAD_VIDEOS_LIST.length} assets...`);
    preloadNextVideo();
  }, 4500);
}
