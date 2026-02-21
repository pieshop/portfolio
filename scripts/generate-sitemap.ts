/**
 * Build-time sitemap generator.
 *
 * Reads www/src/assets/json/portfolio.json and generates www/public/sitemap.xml.
 *
 * Usage: npx tsx scripts/generate-sitemap.ts
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const portfolioPath = resolve(ROOT, 'www/src/assets/json/portfolio.json');
const outputPath = resolve(ROOT, 'www/public/sitemap.xml');

const BASE_URL = 'https://www.stephenhamilton.co.uk';

interface Entry {
  entry_key: string;
  client: string;
  categories: string[];
  modified: string;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatDate(dateStr: string): string {
  // ModifiedTime format: "2026-02-18T14:41:54" or "2017-02-09 10:37:23"
  const d = new Date(dateStr.replace(' ', 'T'));
  if (isNaN(d.getTime())) return new Date().toISOString().split('T')[0];
  return d.toISOString().split('T')[0];
}

function generate() {
  const data = JSON.parse(readFileSync(portfolioPath, 'utf-8'));
  const entries: Entry[] = data.entries;
  const categories: Record<string, unknown> = data.categories;

  const urls: string[] = [];

  // Static pages
  urls.push(`  <url>
    <loc>${escapeXml(BASE_URL + '/about')}</loc>
    <priority>1.0</priority>
  </url>`);

  // Category pages (use allyears)
  for (const categoryName of Object.keys(categories)) {
    urls.push(`  <url>
    <loc>${escapeXml(BASE_URL + '/' + categoryName + '/allyears')}</loc>
    <priority>0.8</priority>
  </url>`);
  }

  // Item pages: /{first_category}/{client}/{entry_key}
  for (const entry of entries) {
    const defaultCategory = entry.categories[0] || 'all';
    const loc = `${BASE_URL}/${defaultCategory}/${entry.client}/${entry.entry_key}`;
    const lastmod = formatDate(entry.modified);
    urls.push(`  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>0.6</priority>
  </url>`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;

  writeFileSync(outputPath, xml);
  console.log(`Written sitemap with ${urls.length} URLs to ${outputPath}`);
}

generate();
