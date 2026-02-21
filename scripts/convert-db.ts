/**
 * One-time SQL-to-JSON conversion script.
 *
 * Parses sql/portfolio.sql (phpMyAdmin dump), resolves all junction tables,
 * merges with www/src/assets/json/data.json (images, PDFs, videos, links,
 * awards, archive flags), and outputs www/src/assets/json/portfolio.json.
 *
 * Usage: npx tsx scripts/convert-db.ts
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const sqlPath = resolve(ROOT, 'sql/portfolio.sql');
const dataJsonPath = resolve(ROOT, 'www/src/assets/json/data.json');
const outputPath = resolve(ROOT, 'www/src/assets/json/portfolio.json');

// ---------------------------------------------------------------------------
// SQL parsing helpers
// ---------------------------------------------------------------------------

function readSQL(): string {
  return readFileSync(sqlPath, 'utf-8');
}

/**
 * Extract INSERT rows for a given table from the SQL dump.
 * Handles multi-row INSERT statements and values that contain commas,
 * escaped quotes, and parentheses within strings.
 */
function extractInsertRows(sql: string, table: string): string[][] {
  // Find all INSERT blocks for the table.
  // We can't use a simple regex ending at `;` because values may contain
  // HTML entities like `&amp;` which include semicolons. Instead, we find
  // the INSERT header and then manually parse to the terminating `;` that
  // follows the last closing paren.
  const pattern = new RegExp(
    `INSERT INTO \`${table}\`\\s*\\([^)]+\\)\\s*VALUES\\s*`,
    'g',
  );
  const rows: string[][] = [];

  let match: RegExpExecArray | null;
  while ((match = pattern.exec(sql)) !== null) {
    // Start scanning from end of the matched header
    let pos = match.index + match[0].length;

    // Parse row tuples until we hit a `;` outside a string at top level
    while (pos < sql.length) {
      // Skip whitespace and commas between rows
      while (pos < sql.length && (sql[pos] === ' ' || sql[pos] === '\n' || sql[pos] === '\r' || sql[pos] === '\t' || sql[pos] === ',')) pos++;

      if (pos >= sql.length || sql[pos] === ';') break;
      if (sql[pos] !== '(') break;

      // Find matching closing paren, respecting quoted strings
      let depth = 0;
      let inString = false;
      let escape = false;
      const start = pos;
      for (; pos < sql.length; pos++) {
        const ch = sql[pos];
        if (escape) {
          escape = false;
          continue;
        }
        if (ch === '\\') {
          escape = true;
          continue;
        }
        if (ch === "'") {
          inString = !inString;
          continue;
        }
        if (inString) continue;
        if (ch === '(') depth++;
        if (ch === ')') {
          depth--;
          if (depth === 0) { pos++; break; }
        }
      }

      const tuple = sql.slice(start + 1, pos - 1);
      rows.push(parseTupleValues(tuple));
    }
  }

  return rows;
}

/**
 * Parse a comma-separated SQL tuple into individual string values.
 * Handles quoted strings (with escaped quotes) and unquoted values.
 */
function parseTupleValues(tuple: string): string[] {
  const values: string[] = [];
  let i = 0;

  while (i < tuple.length) {
    // Skip whitespace
    while (i < tuple.length && (tuple[i] === ' ' || tuple[i] === '\t' || tuple[i] === '\n' || tuple[i] === '\r')) i++;
    if (i >= tuple.length) break;

    if (tuple[i] === "'") {
      // Quoted string
      i++; // skip opening quote
      let val = '';
      while (i < tuple.length) {
        if (tuple[i] === '\\' && i + 1 < tuple.length) {
          // Handle escape sequences
          const next = tuple[i + 1];
          if (next === "'") { val += "'"; i += 2; }
          else if (next === 'n') { val += '\n'; i += 2; }
          else if (next === 'r') { val += '\r'; i += 2; }
          else if (next === '\\') { val += '\\'; i += 2; }
          else { val += next; i += 2; }
        } else if (tuple[i] === "'" && i + 1 < tuple.length && tuple[i + 1] === "'") {
          // Double-quoted apostrophe
          val += "'";
          i += 2;
        } else if (tuple[i] === "'") {
          i++; // closing quote
          break;
        } else {
          val += tuple[i];
          i++;
        }
      }
      values.push(val);
    } else {
      // Unquoted value (number, NULL, etc.)
      let val = '';
      while (i < tuple.length && tuple[i] !== ',') {
        val += tuple[i];
        i++;
      }
      values.push(val.trim());
    }

    // Skip comma
    while (i < tuple.length && (tuple[i] === ' ' || tuple[i] === ',')) {
      if (tuple[i] === ',') { i++; break; }
      i++;
    }
  }

  return values;
}

// ---------------------------------------------------------------------------
// Build lookup tables
// ---------------------------------------------------------------------------

interface Affiliation { name: string; url: string }
interface Award { award_result: string; award_category: string; award_name: string; award_long_name: string; award_url_link: string; award_pdf_link: string }
interface Category { label: string; description: string }
interface Client { name: string; key: string }
interface Framework { name: string; url: string }
interface LinkRow { url: string; target: string; type: number; width: number; height: number; label: string; isMobileFriendly: boolean }

function buildAffiliations(sql: string): Map<number, Affiliation & { key: string }> {
  const rows = extractInsertRows(sql, 'affiliations');
  const map = new Map<number, Affiliation & { key: string }>();
  for (const r of rows) {
    const id = parseInt(r[0]);
    const name = r[1];
    const url = r[2];
    // Generate a key from the name
    const key = name.toLowerCase().replace(/[^a-z0-9]+/g, '').replace(/\s+/g, '');
    map.set(id, { name, url, key });
  }
  return map;
}

function buildAwards(sql: string): Map<number, Award> {
  const rows = extractInsertRows(sql, 'awards');
  const map = new Map<number, Award>();
  for (const r of rows) {
    if (r.length < 7) continue;
    map.set(parseInt(r[0]), {
      award_result: r[1],
      award_category: r[2],
      award_name: r[3].replace(/\n/g, '').trim(),
      award_long_name: r[4],
      award_url_link: r[5],
      award_pdf_link: r[6],
    });
  }
  return map;
}

function buildCategories(sql: string): Map<number, { name: string; label: string; description: string }> {
  const rows = extractInsertRows(sql, 'categories');
  const map = new Map<number, { name: string; label: string; description: string }>();
  for (const r of rows) {
    map.set(parseInt(r[0]), { name: r[1], label: r[2], description: r[3] });
  }
  return map;
}

function buildClients(sql: string): Map<number, Client> {
  const rows = extractInsertRows(sql, 'clients');
  const map = new Map<number, Client>();
  for (const r of rows) {
    map.set(parseInt(r[0]), { name: r[1], key: r[2] });
  }
  return map;
}

function buildFrameworks(sql: string): Map<number, Framework> {
  const rows = extractInsertRows(sql, 'frameworks');
  const map = new Map<number, Framework>();
  for (const r of rows) {
    map.set(parseInt(r[0]), { name: r[1], url: r[2] });
  }
  return map;
}

function buildTechnologies(sql: string): Map<number, string> {
  const rows = extractInsertRows(sql, 'technologies');
  const map = new Map<number, string>();
  for (const r of rows) {
    map.set(parseInt(r[0]), r[1]);
  }
  return map;
}

function buildPlatforms(sql: string): Map<number, string> {
  const rows = extractInsertRows(sql, 'platforms');
  const map = new Map<number, string>();
  for (const r of rows) {
    map.set(parseInt(r[0]), r[1]);
  }
  return map;
}

function buildTerritories(sql: string): Map<number, string> {
  const rows = extractInsertRows(sql, 'territories');
  const map = new Map<number, string>();
  for (const r of rows) {
    map.set(parseInt(r[0]), r[1]);
  }
  return map;
}

function buildLinks(sql: string): Map<number, LinkRow> {
  const rows = extractInsertRows(sql, 'links');
  const map = new Map<number, LinkRow>();
  for (const r of rows) {
    map.set(parseInt(r[0]), {
      url: r[1],
      target: r[2],
      type: parseInt(r[3]),
      width: parseInt(r[4]),
      height: parseInt(r[5]),
      label: r[6],
      isMobileFriendly: r[7] === '1',
    });
  }
  return map;
}

function buildLinkTypes(sql: string): Map<number, { type: string; label: string }> {
  const rows = extractInsertRows(sql, 'link_types');
  const map = new Map<number, { type: string; label: string }>();
  for (const r of rows) {
    map.set(parseInt(r[0]), { type: r[1], label: r[2] });
  }
  return map;
}

// Junction table helpers
function buildJunction(sql: string, table: string): Map<number, number[]> {
  const rows = extractInsertRows(sql, table);
  const map = new Map<number, number[]>();
  for (const r of rows) {
    const entryId = parseInt(r[1]);
    const refId = parseInt(r[2]);
    if (!map.has(entryId)) map.set(entryId, []);
    map.get(entryId)!.push(refId);
  }
  return map;
}

// ---------------------------------------------------------------------------
// Main conversion
// ---------------------------------------------------------------------------

function convert() {
  const sql = readSQL();
  const dataJson: Record<string, Record<string, Record<string, unknown>>> = JSON.parse(
    readFileSync(dataJsonPath, 'utf-8'),
  );

  // Build all lookup tables
  const affiliationsMap = buildAffiliations(sql);
  const awardsMap = buildAwards(sql);
  const categoriesMap = buildCategories(sql);
  const clientsMap = buildClients(sql);
  const frameworksMap = buildFrameworks(sql);
  const technologiesMap = buildTechnologies(sql);
  const platformsMap = buildPlatforms(sql);
  const territoriesMap = buildTerritories(sql);
  const linksMap = buildLinks(sql);
  const linkTypesMap = buildLinkTypes(sql);

  // Build junction tables
  const entryAffiliations = buildJunction(sql, 'entries_affiliations');
  const entryAwards = buildJunction(sql, 'entries_awards');
  const entryCategories = buildJunction(sql, 'entries_categories');
  const entryClients = buildJunction(sql, 'entries_clients');
  const entryFrameworks = buildJunction(sql, 'entries_frameworks');
  const entryPlatforms = buildJunction(sql, 'entries_platforms');
  const entryTechnologies = buildJunction(sql, 'entries_technologies');
  const entryTerritories = buildJunction(sql, 'entries_territories');

  // Build output lookup tables (keyed by name/key)
  const outCategories: Record<string, Category> = {};
  for (const [, cat] of categoriesMap) {
    outCategories[cat.name] = { label: cat.label, description: cat.description };
  }

  const outClients: Record<string, { name: string }> = {};
  for (const [, client] of clientsMap) {
    outClients[client.key] = { name: client.name };
  }

  const outTechnologies: Record<string, string> = {};
  for (const [, name] of technologiesMap) {
    const key = name.toLowerCase().replace(/[^a-z0-9]+/g, '');
    outTechnologies[key] = name;
  }

  const outFrameworks: Record<string, { name: string; url: string }> = {};
  for (const [, fw] of frameworksMap) {
    const key = fw.name.toLowerCase().replace(/[^a-z0-9]+/g, '');
    outFrameworks[key] = { name: fw.name, url: fw.url };
  }

  const outPlatforms: Record<string, string> = {};
  for (const [, name] of platformsMap) {
    const key = name.toLowerCase().replace(/[^a-z0-9]+/g, '');
    outPlatforms[key] = name;
  }

  const outAffiliations: Record<string, { name: string; url: string }> = {};
  for (const [, aff] of affiliationsMap) {
    outAffiliations[aff.key] = { name: aff.name, url: aff.url };
  }

  const outTerritories: Record<string, string> = {};
  for (const [, name] of territoriesMap) {
    const key = name.toLowerCase().replace(/[^a-z0-9,. ]+/g, '').replace(/\s+/g, '_').replace(/,/g, '_');
    outTerritories[key] = name;
  }

  // Parse entries
  const entryRows = extractInsertRows(sql, 'entries');

  interface EntryOutput {
    entry_key: string;
    title: string;
    description: string;
    responsibilities: string;
    year: number;
    week: number;
    modified: string;
    is_featured: boolean;
    is_nda: boolean;
    is_summary: boolean;
    is_responsive: boolean;
    client: string;
    categories: string[];
    affiliation: string;
    technologies: string[];
    frameworks: string[];
    platforms: string[];
    territories: string[];
    has_archive: boolean;
    is_flash: boolean;
    is_dark_background: boolean;
    images: Array<{ id: string; width: number; height: number }>;
    pdfs: string[];
    videos: Array<{ id: string; width?: number; height?: number }>;
    links: Array<{ url: string; target: string; label: string }>;
    awards: Array<{
      id: number;
      award_name: string;
      award_long_name: string;
      award_result: string;
      award_category: string;
      link: string;
      pdf: string;
    }>;
  }

  const entries: EntryOutput[] = [];

  for (const r of entryRows) {
    const entryId = parseInt(r[0]);
    const isActive = r[7] === '1';

    // Skip inactive entries (entry_id 1 = Kraft prototype)
    if (!isActive) continue;

    const entryKey = r[6];

    // Resolve client
    const clientIds = entryClients.get(entryId) || [];
    const clientId = clientIds[0] ? clientsMap.get(clientIds[0])?.key || '' : '';

    // Resolve categories
    const catIds = entryCategories.get(entryId) || [];
    const cats = catIds
      .map((id) => categoriesMap.get(id)?.name)
      .filter((n): n is string => !!n);

    // Resolve affiliation
    const affIds = entryAffiliations.get(entryId) || [];
    const affiliation = affIds[0] ? affiliationsMap.get(affIds[0])?.key || '' : '';

    // Resolve technologies
    const techIds = entryTechnologies.get(entryId) || [];
    const techs = techIds
      .map((id) => {
        const name = technologiesMap.get(id);
        return name ? name.toLowerCase().replace(/[^a-z0-9]+/g, '') : undefined;
      })
      .filter((k): k is string => !!k);

    // Resolve frameworks
    const fwIds = entryFrameworks.get(entryId) || [];
    const fws = fwIds
      .map((id) => {
        const fw = frameworksMap.get(id);
        return fw ? fw.name.toLowerCase().replace(/[^a-z0-9]+/g, '') : undefined;
      })
      .filter((k): k is string => !!k);

    // Resolve platforms
    const platIds = entryPlatforms.get(entryId) || [];
    const plats = platIds
      .map((id) => {
        const name = platformsMap.get(id);
        return name ? name.toLowerCase().replace(/[^a-z0-9]+/g, '') : undefined;
      })
      .filter((k): k is string => !!k);

    // Resolve territories
    const terrIds = entryTerritories.get(entryId) || [];
    const terrs = terrIds
      .map((id) => {
        const name = territoriesMap.get(id);
        return name ? name.toLowerCase().replace(/[^a-z0-9,. ]+/g, '').replace(/\s+/g, '_').replace(/,/g, '_') : undefined;
      })
      .filter((k): k is string => !!k);

    // Get local data (media, awards, flags)
    const localData = dataJson[clientId]?.[entryKey] || {};

    // Resolve awards from data.json (authoritative source for awards with full detail)
    const localAwards = (localData.awards as Array<Record<string, unknown>>) || [];

    // If no awards in data.json, check the DB junction table
    let entryAwardsOutput: EntryOutput['awards'] = [];
    if (localAwards.length > 0) {
      entryAwardsOutput = localAwards.map((a) => ({
        id: (a.id as number) || 0,
        award_name: (a.award_name as string) || '',
        award_long_name: (a.award_long_name as string) || '',
        award_result: (a.award_result as string) || '',
        award_category: (a.award_category as string) || '',
        link: (a.link as string) || '',
        pdf: (a.pdf as string) || '',
      }));
    } else {
      // Fall back to DB awards
      const dbAwardIds = entryAwards.get(entryId) || [];
      entryAwardsOutput = dbAwardIds
        .map((id) => {
          const a = awardsMap.get(id);
          if (!a) return null;
          return {
            id,
            award_name: a.award_name,
            award_long_name: a.award_long_name,
            award_result: a.award_result,
            award_category: a.award_category,
            link: a.award_url_link,
            pdf: a.award_pdf_link,
          };
        })
        .filter((a): a is NonNullable<typeof a> => a !== null);
    }

    const entry: EntryOutput = {
      entry_key: entryKey,
      title: r[1],
      description: r[2],
      responsibilities: r[3],
      year: parseInt(r[4]),
      week: parseInt(r[5]),
      modified: r[12],
      is_featured: r[8] === '1',
      is_nda: r[9] === '1',
      is_summary: r[10] === '1',
      is_responsive: r[11] === '1',
      client: clientId,
      categories: cats,
      affiliation,
      technologies: techs,
      frameworks: fws,
      platforms: plats,
      territories: terrs,
      has_archive: Boolean(localData.has_archive),
      is_flash: Boolean(localData.is_flash),
      is_dark_background: Boolean(localData.is_dark_background),
      images: (localData.images as EntryOutput['images']) || [],
      pdfs: (localData.pdfs as string[]) || [],
      videos: (localData.videos as EntryOutput['videos']) || [],
      links: (localData.links as EntryOutput['links']) || [],
      awards: entryAwardsOutput,
    };

    entries.push(entry);
  }

  // Sort entries by year desc, then week desc
  entries.sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    return b.week - a.week;
  });

  const output = {
    categories: outCategories,
    clients: outClients,
    technologies: outTechnologies,
    frameworks: outFrameworks,
    platforms: outPlatforms,
    affiliations: outAffiliations,
    territories: outTerritories,
    entries,
  };

  writeFileSync(outputPath, JSON.stringify(output, null, 2) + '\n');

  console.log(`Written ${entries.length} entries to ${outputPath}`);
  console.log(`Categories: ${Object.keys(outCategories).join(', ')}`);
  console.log(`Clients: ${Object.keys(outClients).length}`);
  console.log(`Technologies: ${Object.keys(outTechnologies).length}`);
  console.log(`Frameworks: ${Object.keys(outFrameworks).length}`);
}

convert();
