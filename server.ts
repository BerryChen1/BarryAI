import express from "express";
import path from "path";
import http from "http";
import https from "https";
import { URL } from "url";
import compression from "compression";

const app = express();
const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || "0.0.0.0";

if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
  throw new Error("PORT must be an integer between 1 and 65535");
}

const REVALIDATE_CACHE = "public, max-age=0, must-revalidate";

// API errors and health responses must never be stored by a CDN or browser.
app.use("/api", (_req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

// Enable gzip/brotli/deflate response compression
app.use(
  compression({
    threshold: 1024, // only compress responses above 1KB
    filter: (req, res) => {
      // Don't compress video/audio streams as they are already highly compressed
      const contentType = res.getHeader("Content-Type") as string;
      if (contentType && (contentType.startsWith("video/") || contentType.startsWith("audio/"))) {
        return false;
      }
      return compression.filter(req, res);
    }
  })
);

// High-speed HTTPS Agent Connection Pool with Keep-Alive
const httpsAgent = new https.Agent({
  keepAlive: true,
  maxSockets: 64,
  maxFreeSockets: 16,
  timeout: 30000
});

const ALLOWED_VIDEO_HOSTS = new Set([
  "pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev"
]);
const MAX_VIDEO_REDIRECTS = 3;

function getAllowedVideoUrl(rawUrl: unknown): URL | null {
  if (typeof rawUrl !== "string") return null;

  try {
    const parsedUrl = new URL(rawUrl);
    const hostname = parsedUrl.hostname.toLowerCase();

    // Exact host matching also excludes localhost, private IPs and lookalike subdomains.
    if (
      parsedUrl.protocol !== "https:" ||
      parsedUrl.username !== "" ||
      parsedUrl.password !== "" ||
      (parsedUrl.port !== "" && parsedUrl.port !== "443") ||
      !ALLOWED_VIDEO_HOSTS.has(hostname)
    ) {
      return null;
    }

    return parsedUrl;
  } catch {
    return null;
  }
}

// High-performance video streaming proxy with HTTP Range support & socket reuse
app.get("/api/video-proxy", async (req, res) => {
  const initialUrl = getAllowedVideoUrl(req.query.url);
  if (!initialUrl) {
    return res.status(400).send("Video URL is not allowed");
  }

  const clientRange = req.headers.range;
  let activeProxyRequest: http.ClientRequest | null = null;

  const fail = (status: number, message: string) => {
    if (!res.headersSent) {
      res.setHeader("Cache-Control", "no-store");
      res.removeHeader("Content-Length");
      res.removeHeader("Content-Range");
      res.removeHeader("ETag");
      res.removeHeader("Last-Modified");
      res.status(status).send(message);
    } else if (!res.writableEnded) {
      res.destroy();
    }
  };

  const requestVideo = (targetUrl: URL, redirectsRemaining: number) => {
    const requestHeaders: Record<string, string> = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Referer": targetUrl.origin
    };

    if (clientRange) {
      requestHeaders["Range"] = clientRange;
    }
    for (const header of ["if-range", "if-none-match", "if-modified-since"] as const) {
      const value = req.headers[header];
      if (typeof value === "string") requestHeaders[header] = value;
    }

    const proxyReq = https.request(
      targetUrl,
      {
        method: req.method === "HEAD" ? "HEAD" : "GET",
        headers: requestHeaders,
        agent: httpsAgent,
        timeout: 12000
      },
      (proxyRes) => {
        const statusCode = proxyRes.statusCode || 502;

        if ([301, 302, 303, 307, 308].includes(statusCode)) {
          const location = proxyRes.headers.location;
          proxyRes.resume();

          if (!location || redirectsRemaining <= 0) {
            fail(502, "Upstream video redirect was rejected");
            return;
          }

          let redirectedUrl: URL | null = null;
          try {
            redirectedUrl = getAllowedVideoUrl(new URL(location, targetUrl).toString());
          } catch {
            redirectedUrl = null;
          }
          if (!redirectedUrl) {
            fail(502, "Upstream video redirect target is not allowed");
            return;
          }

          requestVideo(redirectedUrl, redirectsRemaining - 1);
          return;
        }

        res.status(statusCode);
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Range, Origin, Content-Type, Accept");
        res.setHeader("Access-Control-Expose-Headers", "Content-Range, Content-Length, Accept-Ranges, ETag, Last-Modified");
        const cacheableResponse = [200, 206, 304].includes(statusCode);
        // Remote filenames are not content hashes: revalidate when the same URL is updated.
        res.setHeader("Cache-Control", cacheableResponse ? REVALIDATE_CACHE : "no-store");
        res.setHeader("Content-Type", proxyRes.headers["content-type"] || (cacheableResponse ? "video/mp4" : "text/plain"));
        for (const header of ["etag", "last-modified"] as const) {
          const value = proxyRes.headers[header];
          if (cacheableResponse && value) res.setHeader(header, value);
        }

        if (proxyRes.headers["content-length"]) {
          res.setHeader("Content-Length", proxyRes.headers["content-length"]);
        }
        if (proxyRes.headers["content-range"]) {
          res.setHeader("Content-Range", proxyRes.headers["content-range"]);
        }
        res.setHeader("Accept-Ranges", proxyRes.headers["accept-ranges"] || "bytes");

        proxyRes.on("error", (err) => {
          console.error("Video proxy response stream error:", err.message);
          fail(502, "Upstream video stream failed");
        });
        proxyRes.pipe(res);
      }
    );

    activeProxyRequest = proxyReq;
    proxyReq.on("error", (err) => {
      console.error("Video proxy request error:", err.message);
      fail(502, "Failed to fetch upstream media");
    });
    proxyReq.on("timeout", () => {
      proxyReq.destroy();
      fail(504, "Upstream request timed out");
    });
    proxyReq.end();
  };

  req.on("aborted", () => activeProxyRequest?.destroy());
  res.on("close", () => {
    if (!res.writableEnded) activeProxyRequest?.destroy();
  });

  requestVideo(initialUrl, MAX_VIDEO_REDIRECTS);
});

// The former open image proxy stays disabled.
app.get("/api/image-proxy", (_req, res) => {
  res.status(410).send("Image proxy is no longer available");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

app.use("/api", (_req, res) => {
  res.status(404).json({ error: "API endpoint not found" });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    // Also protect older deployments that still contain a server bundle or source maps.
    app.use((req, res, next) => {
      let requestPath: string;
      try {
        requestPath = decodeURIComponent(req.path).replace(/\\/g, "/");
      } catch {
        res.setHeader("Cache-Control", "no-store");
        res.status(400).send("Invalid request path");
        return;
      }
      if (/(?:^|\/)server\.(?:cjs|mjs|js|ts)(?:\/|$)|\.map(?:\/|$)/i.test(requestPath)) {
        res.setHeader("Cache-Control", "no-store");
        res.status(404).send("Not found");
        return;
      }
      next();
    });

    app.use(express.static(distPath, {
      setHeaders: (res, filePath) => {
        const relativePath = path.relative(distPath, filePath).split(path.sep).join("/");
        const isHashedAsset = relativePath.startsWith("assets/") && /-[A-Za-z0-9_-]{8,}\.[^.]+$/.test(relativePath);
        res.setHeader("Cache-Control", isHashedAsset
          ? "public, max-age=31536000, immutable"
          : REVALIDATE_CACHE);
      },
    }));
    app.get("*", (req, res) => {
      const isAssetPath = /^\/(?:assets|images|projects|fonts|videos|audio|icons)(?:\/|$)/i.test(req.path) || path.extname(req.path) !== "";
      if (isAssetPath || !req.accepts("html")) {
        res.setHeader("Cache-Control", "no-store");
        res.status(404).send("Not found");
        return;
      }
      res.setHeader("Cache-Control", REVALIDATE_CACHE);
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
  });
}

startServer();
