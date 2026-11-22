// Smoke check: serves dist/Portfolio_2/browser, opens key routes in DE and EN at
// 375 and 1440 px, records console errors and the SEO tags, saves screenshots.
// Usage: npm run build && node scripts/smoke.mjs [outDir]
import { chromium } from '@playwright/test';
import { createServer } from 'node:http';
import { readFile, stat, mkdir, writeFile } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';

const root = resolve('dist/Portfolio_2/browser');
const outDir = resolve(process.argv[2] ?? 'tmp/smoke');
const routes = ['/', '/projects/stadtpuls', '/projects/praxis-ui-lab', '/projects/coderr', '/projects/join'];
const widths = [375, 1440];
const langs = ['de', 'en'];
const types = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp',
  '.mp4': 'video/mp4', '.woff2': 'font/woff2', '.pdf': 'application/pdf', '.ico': 'image/x-icon',
};

async function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0]);
  for (const candidate of [clean, join(clean, 'index.html')]) {
    const file = join(root, candidate);
    try {
      if ((await stat(file)).isFile()) return file;
    } catch {}
  }
  return extname(clean) ? null : join(root, 'index.html'); // SPA fallback like .htaccess
}

const server = createServer(async (req, res) => {
  const file = await resolveFile(req.url);
  if (!file) return res.writeHead(404).end();
  res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' });
  res.end(await readFile(file));
}).listen(0);
const base = `http://localhost:${server.address().port}`;

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });
const report = [];
let failures = 0;

for (const lang of langs) {
  for (const width of widths) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    await context.addInitScript((l) => localStorage.setItem('portfolio-language', l), lang);
    const page = await context.newPage();
    for (const route of routes) {
      const errors = [];
      page.removeAllListeners('console');
      page.removeAllListeners('pageerror');
      page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
      page.on('pageerror', (e) => errors.push(String(e)));
      await page.goto(base + route, { waitUntil: 'networkidle' });
      await page.waitForTimeout(400);
      const meta = await page.evaluate(() => ({
        title: document.title,
        canonical: document.querySelector('link[rel=canonical]')?.getAttribute('href') ?? null,
        ogUrl: document.querySelector('meta[property="og:url"]')?.getAttribute('content') ?? null,
        description: document.querySelector('meta[name=description]')?.getAttribute('content') ?? null,
        overflowX: document.documentElement.scrollWidth > window.innerWidth,
      }));
      const rawKey = /[A-Z_]+\.[A-Z_]+/.test(meta.title);
      if (errors.length || rawKey || meta.overflowX) failures++;
      report.push({ lang, width, route, ...meta, rawKey, errors });
      const name = `${lang}-${width}-${route.replace(/\W+/g, '_') || 'home'}.png`;
      await page.screenshot({ path: join(outDir, name), fullPage: route === '/' });
      if (route === '/') await page.screenshot({ path: join(outDir, name.replace('.png', '-top.png')) });
    }
    await context.close();
  }
}

await browser.close();
server.close();
await writeFile(join(outDir, 'report.json'), JSON.stringify(report, null, 2));
for (const r of report) {
  const flags = [r.rawKey && 'RAW-KEY', r.overflowX && 'OVERFLOW-X', r.errors.length && `${r.errors.length} ERR`]
    .filter(Boolean).join(' ');
  console.log(`${r.lang} ${String(r.width).padStart(4)} ${r.route.padEnd(26)} ${r.title} | canonical=${r.canonical} ${flags}`);
}
console.log(failures ? `\n${failures} Problem(e), Details in ${outDir}/report.json` : `\nOK, Screenshots in ${outDir}`);
process.exit(failures ? 1 : 0);
