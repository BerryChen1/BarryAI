import express from "express";
import path from "path";
import http from "http";
import https from "https";
import { URL } from "url";
import { Readable } from "stream";
import compression from "compression";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

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

// High-speed HTTP/HTTPS Agent Connection Pools with Keep-Alive
const httpAgent = new http.Agent({
  keepAlive: true,
  maxSockets: 64,
  maxFreeSockets: 16,
  timeout: 30000
});

const httpsAgent = new https.Agent({
  keepAlive: true,
  maxSockets: 64,
  maxFreeSockets: 16,
  timeout: 30000
});

// Fast in-memory cache for small images and video headers (up to 50MB)
interface CacheEntry {
  buffer: Buffer;
  contentType: string;
  contentLength: number;
  headers: Record<string, string>;
  timestamp: number;
}

const memoryCache = new Map<string, CacheEntry>();
let totalCacheBytes = 0;
const MAX_CACHE_BYTES = 50 * 1024 * 1024; // 50MB memory ceiling

function setCache(key: string, entry: CacheEntry) {
  if (entry.buffer.length > 5 * 1024 * 1024) return; // Skip files > 5MB from in-memory cache
  
  // Evict older entries if size exceeds threshold
  while (totalCacheBytes + entry.buffer.length > MAX_CACHE_BYTES && memoryCache.size > 0) {
    const oldestKey = memoryCache.keys().next().value;
    if (!oldestKey) break;
    const oldEntry = memoryCache.get(oldestKey);
    if (oldEntry) {
      totalCacheBytes -= oldEntry.buffer.length;
    }
    memoryCache.delete(oldestKey);
  }

  memoryCache.set(key, entry);
  totalCacheBytes += entry.buffer.length;
}

// High-performance video streaming proxy with HTTP Range support & socket reuse
app.get("/api/video-proxy", async (req, res) => {
  const targetUrl = req.query.url as string;
  if (!targetUrl || !targetUrl.startsWith("http")) {
    return res.status(400).send("Invalid or missing url query parameter");
  }

  try {
    const parsedUrl = new URL(targetUrl);
    const clientRange = req.headers.range;

    const requestHeaders: Record<string, string> = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Referer": parsedUrl.origin
    };

    if (clientRange) {
      requestHeaders["Range"] = clientRange;
    }

    const isHttps = parsedUrl.protocol === "https:";
    const client = isHttps ? https : http;
    const agent = isHttps ? httpsAgent : httpAgent;

    const proxyReq = client.request(
      targetUrl,
      {
        method: "GET",
        headers: requestHeaders,
        agent,
        timeout: 12000
      },
      (proxyRes) => {
        // Forward status code (200 or 206 Partial Content)
        const statusCode = proxyRes.statusCode || 200;

        // Set response headers
        res.status(statusCode);
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Range, Origin, Content-Type, Accept");
        res.setHeader("Access-Control-Expose-Headers", "Content-Range, Content-Length, Accept-Ranges");
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");

        if (proxyRes.headers["content-type"]) {
          res.setHeader("Content-Type", proxyRes.headers["content-type"]);
        } else {
          res.setHeader("Content-Type", "video/mp4");
        }

        if (proxyRes.headers["content-length"]) {
          res.setHeader("Content-Length", proxyRes.headers["content-length"]);
        }

        if (proxyRes.headers["content-range"]) {
          res.setHeader("Content-Range", proxyRes.headers["content-range"]);
        }

        if (proxyRes.headers["accept-ranges"]) {
          res.setHeader("Accept-Ranges", proxyRes.headers["accept-ranges"]);
        } else {
          res.setHeader("Accept-Ranges", "bytes");
        }

        // Pipe video stream directly to client
        proxyRes.pipe(res);

        proxyRes.on("error", (err) => {
          console.error("Video proxy response stream error:", err.message);
          if (!res.headersSent) {
            res.status(502).end();
          }
        });
      }
    );

    proxyReq.on("error", (err) => {
      console.error("Video proxy request error:", err.message);
      if (!res.headersSent) {
        res.status(502).send("Failed to fetch upstream media");
      }
    });

    proxyReq.on("timeout", () => {
      proxyReq.destroy();
      if (!res.headersSent) {
        res.status(504).send("Upstream request timed out");
      }
    });

    req.on("close", () => {
      proxyReq.destroy();
    });

    proxyReq.end();
  } catch (e: any) {
    console.error("Video proxy internal error:", e?.message);
    if (!res.headersSent) {
      res.status(500).send("Internal proxy error");
    }
  }
});

// Image acceleration proxy fallback with in-memory caching & Keep-Alive socket pool
app.get("/api/image-proxy", async (req, res) => {
  const targetUrl = req.query.url as string;
  if (!targetUrl || !targetUrl.startsWith("http")) {
    return res.status(400).send("Invalid or missing url query parameter");
  }

  // Check in-memory cache first for instantaneous 0ms response
  const cached = memoryCache.get(targetUrl);
  if (cached) {
    res.status(200);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    res.setHeader("Content-Type", cached.contentType);
    res.setHeader("Content-Length", cached.contentLength);
    res.setHeader("X-Cache-Lookup", "HIT");
    res.send(cached.buffer);
    return;
  }

  try {
    const parsedUrl = new URL(targetUrl);
    const isHttps = parsedUrl.protocol === "https:";
    const client = isHttps ? https : http;
    const agent = isHttps ? httpsAgent : httpAgent;

    const proxyReq = client.request(
      targetUrl,
      {
        method: "GET",
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          "Referer": parsedUrl.origin
        },
        agent,
        timeout: 8000
      },
      (proxyRes) => {
        const statusCode = proxyRes.statusCode || 200;
        const contentType = proxyRes.headers["content-type"] || "image/jpeg";
        const contentLength = parseInt(proxyRes.headers["content-length"] || "0", 10);

        res.status(statusCode);
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        res.setHeader("Content-Type", contentType);
        if (contentLength > 0) {
          res.setHeader("Content-Length", contentLength.toString());
        }
        res.setHeader("X-Cache-Lookup", "MISS");

        const chunks: Buffer[] = [];
        proxyRes.on("data", (chunk) => {
          chunks.push(Buffer.from(chunk));
        });

        proxyRes.on("end", () => {
          const buffer = Buffer.concat(chunks);
          if (statusCode === 200 && buffer.length > 0) {
            setCache(targetUrl, {
              buffer,
              contentType,
              contentLength: buffer.length,
              headers: {},
              timestamp: Date.now()
            });
          }
          if (!res.headersSent) {
            res.send(buffer);
          }
        });
      }
    );

    proxyReq.on("error", (err) => {
      if (!res.headersSent) res.status(502).send("Upstream error");
    });
    proxyReq.on("timeout", () => {
      proxyReq.destroy();
      if (!res.headersSent) res.status(504).send("Timeout");
    });

    req.on("close", () => proxyReq.destroy());
    proxyReq.end();
  } catch (e: any) {
    if (!res.headersSent) res.status(500).send("Error");
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
