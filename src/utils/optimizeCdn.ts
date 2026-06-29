/**
 * CDN mirror speed optimization for Mainland China and Global networks.
 * Automatically resolves and reroutes requests of un-routed jsDelivr nodes to high-speed CDN mirrors
 * like GCore, Fastly, and high-speed China-friendly endpoints dynamically based on real-time latency tests.
 */

import { PRELOAD_IMAGES_LIST } from './preloadList';

export const JSDELIVR_MIRRORS = [
  "https://jsd.onmicrosoft.cn/gh/",    // Miaoruan Public CDN - clean, unblocked and extremely fast in China (No jsdelivr in domain!)
  "https://cdn.jsdmirror.com/gh/",     // Jsdmirror CDN - stable and extremely fast in China (No jsdelivr in domain!)
  "https://jsdelivr.b-cdn.net/gh/",    // Bunny.net premium corporate CDN, clean & blazing fast inside China
  "https://gcore.jsdelivr.net/gh/",    // GCore premium global CDN, exceptional China direct routing
  "https://fastly.jsdelivr.net/gh/",   // Fastly high-speed global CDN
  "https://testingcf.jsdelivr.net/gh/",// Cloudflare-backed alternative routing
  "https://cdn.jsdelivr.net/gh/"       // Native jsDelivr default fallback
];

// Default to a highly-resilient, fast, China-friendly mirror (Miaoruan onmicrosoft.cn)
let selectedMirror = "https://jsd.onmicrosoft.cn/gh/";
let useImageProxy = false; // Disable image proxy by default to prevent slow loads inside China
let proxyBaseUrl = "https://wsrv.nl/"; // Optimized faster modern alias for images.weserv.nl

export function getOptimizedUrl(url: string | null | undefined): string {
  if (!url || typeof url !== 'string') return url || '';
  if (url.includes('cdn.jsdelivr.net/gh/')) {
    return url.replace('https://cdn.jsdelivr.net/gh/', selectedMirror);
  }
  return url;
}

// Low-overhead background latency test to find the mathematically fastest connection path
export async function detectFastestCDN() {
  const testPath = "BerryChen1/img-bed/images/20260613171852678.png"; // Tiny reference image (under 5KB)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 2000); // Strict 2sec cap

  // 1. Immediately inject preconnect links to speed up initial TCP handshakes
  try {
    [
      "https://jsd.onmicrosoft.cn",
      "https://cdn.jsdmirror.com",
      "https://jsdelivr.b-cdn.net",
      "https://gcore.jsdelivr.net",
      "https://fastly.jsdelivr.net",
      "https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev", // Preconnect directly to R2 for instant video streams!
      "https://wsrv.nl",
      "https://images.weserv.nl"
    ].forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  } catch (e) {}

  // 2. Measure latency to determine fastest mirror
  const promises = JSDELIVR_MIRRORS.map(async (mirror) => {
    const startTime = performance.now();
    try {
      await fetch(`${mirror}${testPath}`, {
        method: "HEAD",
        mode: "no-cors",
        signal: controller.signal,
        cache: "no-store"
      });
      const duration = performance.now() - startTime;
      return { mirror, duration };
    } catch (e) {
      return { mirror, duration: 9999 };
    }
  });

  // 3. Measure latency of the WebP image compressors (wsrv.nl vs images.weserv.nl vs Direct load)
  const proxyPromise = (async () => {
    const testProxyStart = performance.now();
    try {
      // Use wsrv.nl to load a tiny image asset from a global CDN backbone to verify proxy speed
      const testUrl = "https://fastly.jsdelivr.net/gh/BerryChen1/img-bed/images/20260613171852678.png";
      await fetch(`https://wsrv.nl/?url=${encodeURIComponent(testUrl)}&w=16`, {
        method: "HEAD",
        mode: "no-cors",
        signal: controller.signal,
        cache: "no-store"
      });
      const duration = performance.now() - testProxyStart;
      return { ok: true, duration, url: "https://wsrv.nl/" };
    } catch (e) {
      // Inline alternate fallback
      try {
        const testUrlFallback = "https://fastly.jsdelivr.net/gh/BerryChen1/img-bed/images/20260613171852678.png";
        await fetch(`https://images.weserv.nl/?url=${encodeURIComponent(testUrlFallback)}&w=16`, {
          method: "HEAD",
          mode: "no-cors",
          signal: controller.signal,
          cache: "no-store"
        });
        return { ok: true, duration: 800, url: "https://images.weserv.nl/" };
      } catch (e2) {
        return { ok: false, duration: 9999, url: "" };
      }
    }
  })();

  try {
    const [results, proxyResult] = await Promise.all([
      Promise.all(promises),
      proxyPromise
    ]);
    clearTimeout(timeoutId);
    
    // Choose fastest CDN mirror
    const activeResults = results.filter(r => r.duration < 9999);
    if (activeResults.length > 0) {
      activeResults.sort((a, b) => a.duration - b.duration);
      selectedMirror = activeResults[0].mirror;
    }

    // Set fallback rules if the compression proxy is unreachable/throttled
    if (proxyResult.ok && proxyResult.duration < 350) { // require < 350ms to enable proxy, avoiding slow connections inside China
      useImageProxy = true;
      proxyBaseUrl = proxyResult.url;
    } else {
      useImageProxy = false;
    }
  } catch (err) {
    clearTimeout(timeoutId);
  }
}

// Global DOM and Prototype Interception
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
        if (typeof val === 'string' && (val.includes('cdn.jsdelivr.net/gh/') || JSDELIVR_MIRRORS.some(m => val.includes(m)))) {
          // Normalize back to base jsdelivr URL first
          let normalizedVal = val;
          for (const mirror of JSDELIVR_MIRRORS) {
            if (val.includes(mirror)) {
              normalizedVal = val.replace(mirror, 'https://cdn.jsdelivr.net/gh/');
              break;
            }
          }

          const directMirrorUrl = normalizedVal.replace('https://cdn.jsdelivr.net/gh/', selectedMirror);
          const isImageFile = /\.(jpg|jpeg|png|webp|gif|bmp)(\?.*)?$/i.test(normalizedVal);
          const isWebp = /\.webp(\?.*)?$/i.test(normalizedVal);

          const elem = this as any;
          if (elem._cleanupCdnListeners) {
            elem._cleanupCdnListeners();
          }

          // Gather unique fallback strategies/URLs
          const triedUrls = new Set<string>();
          const fallbackUrls: string[] = [];

          // 1. Try Image compression proxy if available (skip WebP files as they are already fully compressed)
          if (isImageFile && useImageProxy && !isWebp) {
            const sourceUrlForProxy = normalizedVal.replace('https://cdn.jsdelivr.net/gh/', 'https://fastly.jsdelivr.net/gh/');
            const compressedUrl = `${proxyBaseUrl}?url=${encodeURIComponent(sourceUrlForProxy)}&w=1200&output=webp&q=80`;
            fallbackUrls.push(compressedUrl);
            triedUrls.add(compressedUrl);
          }

          // 2. Try the preferred mirror selected by our latency test
          if (!triedUrls.has(directMirrorUrl)) {
            fallbackUrls.push(directMirrorUrl);
            triedUrls.add(directMirrorUrl);
          }

          // 3. Try other mirrors in priority order
          JSDELIVR_MIRRORS.forEach(mirror => {
            const mirrorUrl = normalizedVal.replace('https://cdn.jsdelivr.net/gh/', mirror);
            if (!triedUrls.has(mirrorUrl)) {
              fallbackUrls.push(mirrorUrl);
              triedUrls.add(mirrorUrl);
            }
          });

          let currentAttemptIndex = 0;

          const loadNextUrl = () => {
            if (currentAttemptIndex < fallbackUrls.length) {
              const nextUrl = fallbackUrls[currentAttemptIndex];
              currentAttemptIndex++;
              originalImgSet.call(this, nextUrl);
            } else {
              console.error(`[CDN Optimizer] All image loading strategies failed for: ${normalizedVal}`);
              cleanup();
            }
          };

          const cleanup = () => {
            this.removeEventListener('error', errorHandler);
            this.removeEventListener('load', successHandler);
            elem._cleanupCdnListeners = null;
          };

          const errorHandler = () => {
            // Log as debug to keep console clean for recoverable fallback attempts
            console.debug(`[CDN Optimizer] Image load failed for: ${this.src}. Trying next fallback.`);
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

  // 2. Intercept property setter of HTMLSourceElement.prototype.src (for responsive images/videos)
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

  // 3. Intercept property setter of HTMLVideoElement/HTMLMediaElement.prototype.src (for direct video src updates)
  const interceptMediaSrc = (proto: any) => {
    const originalGet = Object.getOwnPropertyDescriptor(proto, 'src')?.get;
    const originalSet = Object.getOwnPropertyDescriptor(proto, 'src')?.set;

    if (originalSet) {
      Object.defineProperty(proto, 'src', {
        get() {
          return originalGet ? originalGet.call(this) : '';
        },
        set(val) {
          if (typeof val === 'string' && val.includes('cdn.jsdelivr.net/gh/')) {
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

  // 4. Intercept Element.prototype.setAttribute to catch manual DOM manipulations or React Virtual DOM updates
  const originalSetAttribute = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function(name, value) {
    if (
      name === 'src' &&
      (this instanceof HTMLImageElement || this.tagName === 'IMG') &&
      typeof value === 'string' &&
      value.includes('cdn.jsdelivr.net/gh/')
    ) {
      // Dispatch to the customized property setter above.
      // This ensures it gets optimized to WebP and has the fallback error handler correctly mounted!
      this.src = value;
      return;
    }

    if (
      (this instanceof HTMLImageElement || this instanceof HTMLSourceElement || 
       (typeof HTMLVideoElement !== 'undefined' && this instanceof HTMLVideoElement) ||
       this.tagName === 'IMG' || this.tagName === 'SOURCE' || this.tagName === 'VIDEO') &&
      name === 'src' &&
      typeof value === 'string' &&
      value.includes('cdn.jsdelivr.net/gh/')
    ) {
      value = value.replace('https://cdn.jsdelivr.net/gh/', selectedMirror);
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
      const directMirrorUrl = normalizedUrl.replace('https://cdn.jsdelivr.net/gh/', selectedMirror);
      const isWebp = /\.webp(\?.*)?$/i.test(normalizedUrl);
      if (useImageProxy && !isWebp) {
        const sourceUrlForProxy = normalizedUrl.replace('https://cdn.jsdelivr.net/gh/', 'https://fastly.jsdelivr.net/gh/');
        finalUrl = `${proxyBaseUrl}?url=${encodeURIComponent(sourceUrlForProxy)}&w=1200&output=webp&q=80`;
      } else {
        finalUrl = directMirrorUrl;
      }
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
