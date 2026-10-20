/**
 * Regenerates public/sitemap.xml from the routes and the project list.
 *
 * The hand-maintained sitemap had drifted: it pointed at example.com, listed a
 * project that no longer exists (dabubble) and was missing five real ones.
 * Deriving it from project-data.service.ts keeps it honest.
 *
 * Run: node scripts/generate-sitemap.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ORIGIN = 'https://quocnamtran.com';

const service = readFileSync(
  join(ROOT, 'src/app/shared/services/project-data.service.ts'),
  'utf8',
);
const projectIds = [...service.matchAll(/id:\s*'([^']+)'/g)].map((m) => m[1]);

if (projectIds.length === 0) {
  throw new Error('Keine Projekt-IDs gefunden, Sitemap nicht geschrieben.');
}

const today = new Date().toISOString().slice(0, 10);
const urls = [
  { loc: '/', priority: '1.0' },
  ...projectIds.map((id) => ({ loc: `/projects/${id}`, priority: '0.8' })),
  { loc: '/legal-notice', priority: '0.3' },
  { loc: '/privacy-policy', priority: '0.3' },
];

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map(
    ({ loc, priority }) =>
      `  <url><loc>${ORIGIN}${loc}</loc><lastmod>${today}</lastmod><priority>${priority}</priority></url>`,
  ),
  '</urlset>',
  '',
].join('\n');

writeFileSync(join(ROOT, 'public/sitemap.xml'), xml, 'utf8');
console.log(`Sitemap geschrieben: ${urls.length} URLs (${projectIds.length} Projekte)`);
