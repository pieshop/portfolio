# Migrate from API + Database to Local JSON

## Context

The portfolio currently uses a hybrid data architecture:
- **PHP/Laravel API** on the NAS queries a MariaDB database (15+ tables with junction tables) for entry metadata, categories, clients, technologies, frameworks, platforms, territories, affiliations, and awards
- **`data.json`** (local) provides media info: images (with dimensions), PDFs, videos, links, awards, archive flags
- The frontend merges both sources at runtime

This is overkill for ~100 portfolio entries that change rarely. The API adds a runtime dependency, network latency, and a database to maintain. The Express API replacement was never built (empty `src/`).

**Goal:** Consolidate all data into local JSON, eliminate the API dependency, and generate a sitemap at build time.

---

## Step 1: Write a SQL-to-JSON conversion script

**New file:** `scripts/convert-db.ts`

A one-time Node/TypeScript script that:
1. Parses `sql/portfolio.sql` (the phpMyAdmin dump)
2. Resolves all junction tables to produce denormalized entry objects
3. Merges with existing `www/src/assets/json/data.json` (images, PDFs, videos, links, awards, archive flags, `is_flash`, `is_dark_background`)
4. Outputs a single merged JSON file

**Output file:** `www/src/assets/json/portfolio.json`

**Normalized structure** — shared lookup tables at the top level, entries reference by key. This makes it easy to rename a technology or update a framework URL in one place.

```json
{
  "categories": {
    "web":        { "label": "Websites",   "description": "A selection of websites..." },
    "olm":        { "label": "OLM",        "description": "A selection of online media..." },
    "responsive": { "label": "Responsive", "description": "A selection of responsive..." },
    "game":       { "label": "Games",      "description": "A selection of games..." },
    "app":        { "label": "Apps",       "description": "A selection of native apps..." }
  },
  "clients": {
    "bbc":    { "name": "BBC" },
    "disney": { "name": "Disney" }
  },
  "technologies": {
    "as3":   "ActionScript 3",
    "as2":   "ActionScript 2",
    "flash": "Flash",
    "js":    "Javascript",
    "html":  "HTML",
    "css":   "CSS"
  },
  "frameworks": {
    "react":   { "name": "React",   "url": "https://facebook.github.io/react/" },
    "redux":   { "name": "Redux",   "url": "https://redux.js.org/" },
    "phaser":  { "name": "Phaser",  "url": "http://phaser.io/" }
  },
  "platforms": {
    "desktop":    "Desktop",
    "tablet":     "Tablet",
    "smartphone": "Smartphone"
  },
  "affiliations": {
    "jollywise":  { "name": "Jollywise Media",     "url": "https://www.jollywise.co.uk" },
    "mrm":        { "name": "MRMLondon",            "url": "http://mrm-meteorite.com" },
    "zentropy":   { "name": "Zentropy Partners",    "url": "http://mrm-meteorite.com" }
  },
  "territories": {
    "uk":   "UK",
    "emea": "EMEA",
    "us":   "US"
  },
  "entries": [
    {
      "entry_key": "nextstep",
      "title": "Take it to the Top!",
      "description": "A branching dialogue...",
      "responsibilities": "Tech Lead...",
      "year": 2016,
      "week": 45,
      "modified": "2026-02-18T14:41:54",
      "is_featured": true,
      "is_nda": false,
      "is_summary": false,
      "is_responsive": true,
      "client": "bbc",
      "categories": ["web", "game", "responsive", "app"],
      "affiliation": "jollywise",
      "technologies": ["as3"],
      "frameworks": ["babel", "vuejs"],
      "platforms": ["desktop", "tablet", "smartphone"],
      "territories": ["uk"],
      "has_archive": false,
      "is_flash": false,
      "is_dark_background": false,
      "images": [{ "id": "desktop_01.jpg", "width": 1024, "height": 847 }],
      "pdfs": [],
      "videos": [],
      "links": [],
      "awards": []
    }
  ]
}
```

Entries reference lookup tables by key. The service layer resolves references when building the response objects for Redux.

The script will:
- Skip entries where `entry_isactive === 0` (entry_id 1, the Kraft prototype)
- Preserve `data.json` media data (images with width/height, awards with full detail) as the authoritative source for media — the DB `images` table only has filenames without dimensions
- Keep the SQL dump in `sql/` as a permanent archive

## Step 2: Rewrite the service layer

**Modified file:** `www/src/services/portfolio.ts`

Replace all `fetch()` calls with functions that import and filter `portfolio.json`:

| Current API call | Replacement |
|---|---|
| `fetchAvailableCategoriesService()` | Read `portfolio.json` categories, filter by which have active entries for the given year |
| `fetchAllActiveCategoriesByYearService()` | Derive from entries — group by year, check which categories have entries |
| `fetchCategoryItemsService()` | Filter entries by category + year, apply featured filter if needed |
| `fetchItemService()` | Find entry by `entry_key` |
| `fetchArchiveItemService()` | Unchanged — still loads from `/assets/json/archive/` |

All functions keep the same return signatures so the Redux actions/reducers don't need changes.

## Step 3: Remove API configuration

**Modified files:**
- `www/.env.development` — remove `VITE_API_BASE`
- `www/.env.staging` — remove `VITE_API_BASE`
- `www/.env.production` — remove `VITE_API_BASE`
- `www/src/constants/AppConstants.ts` — remove `API_BASE` constant

## Step 4: Build-time sitemap generation

**New file:** `scripts/generate-sitemap.ts`

Reads `www/src/assets/json/portfolio.json` and generates `www/public/sitemap.xml`:
- Static pages: `/about`
- Category pages: `/{category_name}/` for each category with active entries
- Item pages: `/{default_category}/{client_key}/{entry_key}` for each active entry
    - Uses the first category in the entry's categories list (matching current URL pattern)
    - `lastmod` from the entry's `ModifiedTime`

**Modified file:** `www/package.json` — add `"sitemap": "npx tsx ../scripts/generate-sitemap.ts"` script

Run manually when data changes. The output `sitemap.xml` is committed to `public/` and deployed with the build.

## Step 5: Clean up legacy files

**Delete:**
- `www/src/sitemap.xml` — replaced by generated `www/public/sitemap.xml`
- `www/src/sitemap/` — XSL stylesheet for old sitemap
- `www/src/assets/json/data.json` — merged into `portfolio.json`

**Keep (archive):**
- `sql/portfolio.sql` — permanent DB archive
- `api/` — leave in place (can be deleted in a separate cleanup)
- `api_express/` — leave in place (already git-ignored)

---

## Files Summary

| File | Action | Description |
|---|---|---|
| `scripts/convert-db.ts` | Create | One-time SQL → JSON conversion script |
| `scripts/generate-sitemap.ts` | Create | Build-time sitemap generator |
| `www/src/assets/json/portfolio.json` | Create (generated) | Merged data file replacing API + data.json |
| `www/src/services/portfolio.ts` | Modify | Replace fetch calls with local JSON reads |
| `www/src/constants/AppConstants.ts` | Modify | Remove API_BASE |
| `www/.env.development` | Modify | Remove VITE_API_BASE |
| `www/.env.staging` | Modify | Remove VITE_API_BASE |
| `www/.env.production` | Modify | Remove VITE_API_BASE |
| `www/package.json` | Modify | Add sitemap script |
| `www/src/sitemap.xml` | Delete | Replaced by generated version |
| `www/src/sitemap/` | Delete | Old XSL stylesheet |
| `www/src/assets/json/data.json` | Delete | Merged into portfolio.json |

---

## Verification

1. Run `npx tsx scripts/convert-db.ts` — produces `www/src/assets/json/portfolio.json`
2. Verify JSON has all ~102 active entries with complete data
3. Run `npm run dev` — site works identically without the API
4. Check category filtering, year filtering, featured filter all work
5. Check item detail pages show all metadata (description, tech, frameworks, etc.)
6. Check awards display correctly
7. Run `npx tsx scripts/generate-sitemap.ts` — produces valid `sitemap.xml` with all entries
8. Deploy to staging and verify
