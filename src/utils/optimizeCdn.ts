/**
 * CDN mirror speed optimization for Mainland China networks.
 * Automatically resolves and reroutes requests of un-routed jsDelivr nodes to high-speed CDN mirrors
 * like GCore, Fastly, and Cloudflare-backed endpoints dynamically based on latency tests.
 */

export const JSDELIVR_MIRRORS = [
  "https://gcore.jsdelivr.net/gh/",
  "https://fastly.jsdelivr.net/gh/",
  "https://testingcf.jsdelivr.net/gh/",
  "https://cdn.jsdelivr.net/gh/"
];

// Default to GCore (extremely fast in mainland China due to optimized multi-line routing)
let selectedMirror = "https://gcore.jsdelivr.net/gh/";

export function getOptimizedUrl(url: string | null | undefined): string {
  if (!url || typeof url !== 'string') return url || '';
  if (url.includes('cdn.jsdelivr.net/gh/')) {
    return url.replace('https://cdn.jsdelivr.net/gh/', selectedMirror);
  }
  return url;
}

// Fast asynchronous CDN latency test to automatically select the optimal route
export async function detectFastestCDN() {
  const testPath = "BerryChen1/img-bed/images/20260613171852678.png"; // Tiny reference image
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 2000); // 2sec max timeout

  const promises = JSDELIVR_MIRRORS.map(async (mirror) => {
    const startTime = performance.now();
    try {
      // Use standard fetch HEAD with no-cors to prevent CORS blocks on simple ping
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

  try {
    const results = await Promise.all(promises);
    clearTimeout(timeoutId);
    
    // Filter out failed ones
    const activeResults = results.filter(r => r.duration < 9999);
    if (activeResults.length > 0) {
      activeResults.sort((a, b) => a.duration - b.duration);
      selectedMirror = activeResults[0].mirror;
      console.log(`[CDN Optimizer] Dynamic fastest mirror selected: ${selectedMirror} with latency ${activeResults[0].duration.toFixed(1)}ms`);
    }
  } catch (err) {
    console.warn("[CDN Optimizer] Latency check failed or timed out, remaining on default high-speed GCore mirror:", selectedMirror);
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
        if (typeof val === 'string' && val.includes('cdn.jsdelivr.net/gh/')) {
          const directMirrorUrl = val.replace('https://cdn.jsdelivr.net/gh/', selectedMirror);
          const isImageFile = /\.(jpg|jpeg|png|webp|gif|bmp)(\?.*)?$/i.test(val);

          if (isImageFile) {
            // Convert to high-performance, globally geo-distributed WebP format on-the-fly.
            // Downscale extremely large assets to a maximum width of 1450px, compression quality 80%.
            // This compresses assets from megabytes into kilobytes (90%+ size reduction) with indistinguishable visual difference!
            const compressedUrl = `https://images.weserv.nl/?url=${encodeURIComponent(directMirrorUrl)}&w=1450&output=webp&q=80`;

            const elem = this as any;
            if (elem._cdnFallbackHandler) {
              this.removeEventListener('error', elem._cdnFallbackHandler);
            }

            const fallbackHandler = () => {
              this.removeEventListener('error', fallbackHandler);
              elem._cdnFallbackHandler = null;
              originalImgSet.call(this, directMirrorUrl);
              console.log(`[CDN Optimizer] Image proxy failed, gracefully falling back to native CDN: ${directMirrorUrl}`);
            };

            elem._cdnFallbackHandler = fallbackHandler;
            this.addEventListener('error', fallbackHandler);

            originalImgSet.call(this, compressedUrl);
          } else {
            originalImgSet.call(this, directMirrorUrl);
          }
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

  // 3. Intercept Element.prototype.setAttribute to catch manual DOM manipulations or React Virtual DOM updates
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
      (this instanceof HTMLImageElement || this instanceof HTMLSourceElement || this.tagName === 'IMG' || this.tagName === 'SOURCE') &&
      name === 'src' &&
      typeof value === 'string' &&
      value.includes('cdn.jsdelivr.net/gh/')
    ) {
      value = value.replace('https://cdn.jsdelivr.net/gh/', selectedMirror);
    }
    return originalSetAttribute.call(this, name, value);
  };
}
