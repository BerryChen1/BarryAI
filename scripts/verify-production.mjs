import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Read-only HTTP checks against an already running production server.
// Usage: node scripts/verify-production.mjs http://127.0.0.1:4173
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const base = process.argv[2] || 'http://127.0.0.1:4173';
let checks = 0;
const failures = [];
async function check(name, run) {
  try {
    await run();
    checks++;
    console.log(`PASS ${name}`);
  } catch (error) {
    failures.push({ name, error: error.message });
    console.error(`FAIL ${name}: ${error.message}`);
  }
}
const request = (url, options = {}) => fetch(new URL(url, base), {
  signal: AbortSignal.timeout(25000), ...options,
});
const cache = response => response.headers.get('cache-control') || '';
async function filesUnder(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory()
    ? filesUnder(path.join(dir, entry.name)) : path.join(dir, entry.name)))).flat();
}

await check('homepage and production bundle', async () => {
  const response = await request('/');
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /text\/html/);
  assert.match(cache(response), /must-revalidate/);
  const html = await response.text();
  assert.doesNotMatch(html, /<script[^>]+src=["'][^"']*@vite\/client|fonts\.googleapis\.com/);
  const js = html.match(/src="(\/assets\/index-[^"]+\.js)"/)?.[1];
  assert.ok(js, 'missing built entry');
  const bundle = await request(js, { method: 'HEAD' });
  assert.equal(bundle.status, 200);
  assert.match(cache(bundle), /max-age=31536000, immutable/);
});
await check('health is JSON and not cached', async () => {
  const response = await request('/api/health');
  assert.equal(response.status, 200);
  assert.equal(cache(response), 'no-store');
  assert.equal((await response.json()).status, 'ok');
});
for (const route of ['/server.cjs', '/server.cjs.map', '/build/server.cjs',
  '/assets/__missing__.js', '/images/__missing__.webp', '/api/__missing__']) {
  await check(`missing/private path ${route}`, async () => {
    const response = await request(route);
    assert.equal(response.status, 404);
    assert.equal(cache(response), 'no-store');
    assert.doesNotMatch(await response.text(), /<html|id="root"/i);
  });
}
await check('former image proxy disabled', async () => {
  const response = await request('/api/image-proxy');
  assert.equal(response.status, 410);
  assert.equal(cache(response), 'no-store');
});
for (const url of ['https://example.com/video.mp4', 'http://127.0.0.1/video.mp4',
  'https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev.evil.example/video.mp4']) {
  await check(`video proxy rejects ${new URL(url).hostname}`, async () => {
    const response = await request(`/api/video-proxy?url=${encodeURIComponent(url)}`);
    assert.equal(response.status, 400);
    assert.equal(cache(response), 'no-store');
  });
}
const publicRoot = path.join(root, 'public');
const publicFiles = await filesUnder(publicRoot);
const selectedFiles = publicFiles.filter(file =>
  file.includes(`${path.sep}ai-video-workflow${path.sep}`) ||
  file.endsWith('-display.webp') ||
  (file.includes(`${path.sep}fonts${path.sep}`) && /\.(woff2?|css)$/.test(file)));
for (const file of selectedFiles) {
  const route = '/' + path.relative(publicRoot, file).split(path.sep).join('/');
  await check(`local media ${route}`, async () => {
    const response = await request(route, { method: 'HEAD' });
    assert.equal(response.status, 200);
    assert.equal(Number(response.headers.get('content-length')), (await stat(file)).size);
    assert.match(cache(response), /must-revalidate/);
    const expectedType = file.endsWith('.mp4') ? /video\/mp4/ : file.endsWith('.webp')
      ? /image\/webp/ : /\.jpe?g$/.test(file) ? /image\/jpeg/
        : file.endsWith('.css') ? /text\/css/ : /font\/woff2?|application\/font/;
    assert.match(response.headers.get('content-type'), expectedType);
    if (file.endsWith('.mp4')) {
      const part = await request(route, { headers: { Range: 'bytes=0-1023' } });
      assert.equal(part.status, 206);
      assert.match(part.headers.get('content-range'), /^bytes 0-1023\//);
      assert.equal((await part.arrayBuffer()).byteLength, 1024);
    }
  });
}
const origin = 'https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev';
const proxy = url => `/api/video-proxy?url=${encodeURIComponent(url)}`;
await check('upstream 404 must not be cached', async () => {
  const response = await request(proxy(`${origin}/__audit_missing_20261008.mp4`), { method: 'HEAD' });
  assert.equal(response.status, 404);
  assert.equal(cache(response), 'no-store');
});
await check('video proxy HEAD, byte range and conditional cache', async () => {
  const route = proxy(`${origin}/new%20shoye/8.mp4`);
  const head = await request(route, { method: 'HEAD' });
  assert.equal(head.status, 200);
  assert.match(cache(head), /must-revalidate/);
  assert.match(head.headers.get('content-type'), /video\/mp4/);
  const part = await request(route, { headers: { Range: 'bytes=0-1023' } });
  assert.equal(part.status, 206);
  assert.equal((await part.arrayBuffer()).byteLength, 1024);
  assert.match(part.headers.get('content-range'), /^bytes 0-1023\//);
  const etag = head.headers.get('etag');
  assert.ok(etag, 'missing upstream ETag');
  const conditional = await request(route, { method: 'HEAD', headers: { 'If-None-Match': etag } });
  assert.equal(conditional.status, 304);
  assert.match(cache(conditional), /must-revalidate/);
});
await check('build does not publish server bundles/maps', async () => {
  const distFiles = await filesUnder(path.join(root, 'dist'));
  assert.deepEqual(distFiles.filter(file => /(?:^|[\\/])server\.(?:cjs|mjs|js|ts)$|\.map$/i.test(file)), []);
  const entry = await readFile(path.join(root, 'scripts', 'start-production.cjs'), 'utf8');
  assert.match(entry, /process\.env\.NODE_ENV\s*=\s*"production"/);
});
console.log(JSON.stringify({ passed: checks, failed: failures.length, failures }, null, 2));
if (failures.length) process.exitCode = 1;
