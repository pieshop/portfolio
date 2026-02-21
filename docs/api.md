# Data Architecture & Service Layer

> Portfolio data structure, service layer API, URL builders, and data generation scripts.
>
> See also [CLAUDE.md](../CLAUDE.md) for a quick summary.

---

## portfolio.json

`www/src/assets/json/portfolio.json` is the single source of truth for all portfolio data. It is imported directly by the service layer and bundled into the app at build time. No API or database dependency at runtime.

### Structure

Normalized with shared lookup tables at the top level; entries reference by key:

```json
{
  "categories":   { "<key>": { "label": "...", "description": "..." } },
  "clients":      { "<key>": { "name": "..." } },
  "technologies": { "<key>": "Display Name" },
  "frameworks":   { "<key>": { "name": "...", "url": "..." } },
  "platforms":    { "<key>": "Display Name" },
  "affiliations": { "<key>": { "name": "...", "url": "..." } },
  "territories":  { "<key>": "Display Name" },
  "entries":      [ ... ]
}
```

### Lookup tables

| Table | Key type | Value shape | Example |
|---|---|---|---|
| `categories` | string (`web`, `game`, etc.) | `{ label, description }` | `{ "label": "Websites", "description": "..." }` |
| `clients` | string (`bbc`, `disney`, etc.) | `{ name }` | `{ "name": "BBC" }` |
| `technologies` | string (`html`, `css`, etc.) | plain string | `"HTML"` |
| `frameworks` | string (`react`, `vuejs`, etc.) | `{ name, url }` | `{ "name": "React", "url": "https://..." }` |
| `platforms` | string (`desktop`, `tablet`, etc.) | plain string | `"Desktop"` |
| `affiliations` | string (`jollywise`, etc.) | `{ name, url }` | `{ "name": "Jollywise Media", "url": "https://..." }` |
| `territories` | string (`uk`, `emea`, etc.) | plain string | `"UK"` |

### Entry schema

Each object in the `entries` array:

| Field | Type | Description |
|---|---|---|
| `entry_key` | string | Unique identifier (e.g. `"nextstep"`) |
| `title` | string | Display title |
| `description` | string | Project description (HTML allowed) |
| `responsibilities` | string | Role description |
| `year` | number | Year of project (e.g. `2016`) |
| `week` | number | Week number within the year |
| `modified` | string | Last modified timestamp (ISO 8601) |
| `is_featured` | boolean | Show in featured/filtered view |
| `is_nda` | boolean | Under NDA (limited display) |
| `is_summary` | boolean | Summary-only entry (no detail page) |
| `is_responsive` | boolean | Responsive design project |
| `client` | string | Key into `clients` lookup |
| `categories` | string[] | Keys into `categories` lookup |
| `affiliation` | string | Key into `affiliations` lookup |
| `technologies` | string[] | Keys into `technologies` lookup |
| `frameworks` | string[] | Keys into `frameworks` lookup |
| `platforms` | string[] | Keys into `platforms` lookup |
| `territories` | string[] | Keys into `territories` lookup |
| `has_archive` | boolean | Has archive JSON with iframe embed |
| `is_flash` | boolean | Was a Flash project (legacy) |
| `is_dark_background` | boolean | Requires dark background for images |
| `images` | array | `[{ id, width, height }]` — screengrab filenames with dimensions |
| `pdfs` | array | PDF attachments |
| `videos` | array | Video embeds |
| `links` | array | External links |
| `awards` | array | Award details |

---

## How portfolio.json Was Generated

The `scripts/convert-db.ts` script performed a one-time conversion:

1. Parsed `sql/portfolio.sql` (phpMyAdmin dump of the MariaDB database with 15+ tables and junction tables)
2. Resolved all many-to-many relationships (entries ↔ categories, technologies, frameworks, platforms, territories, affiliations, awards)
3. Merged with the former `data.json` which provided media data (images with dimensions, PDFs, videos, links, awards with full detail, archive/flash/dark-background flags)
4. Output the merged, denormalized result

To regenerate: `npx tsx scripts/convert-db.ts` (from project root)

The SQL file (`sql/portfolio.sql`) is kept as a permanent archive of the original database.

---

## Service Layer

`www/src/services/portfolio.ts` provides the data access layer. It imports `portfolio.json` directly and returns Promises — matching the original API-based function signatures so that Redux actions/reducers required no changes.

No network requests are made except for archive JSON (`fetchArchiveItemService`).

### Functions

#### `fetchAvailableCategoriesService()`

Returns all categories as an array matching the legacy API shape.

```ts
(): Promise<Array<{
  category_id: number;
  category_name: string;
  category_label: string;
  category_description: string;
  is_active: boolean;
}>>
```

Maps `portfolio.json` categories into indexed objects. All categories are always active.

#### `fetchAllActiveCategoriesByYearService(opts?)`

Returns a map of which categories have entries in each year.

```ts
(opts?: { isFiltered?: boolean }): Promise<Record<string, Record<string, boolean>>>
```

Returns `{ [year]: { [category_name]: true }, allyears: { ... } }`. The `isFiltered` parameter is accepted but currently unused (kept for API compatibility).

#### `fetchCategoryItemsService(opts)`

Returns entries filtered by category and/or year, plus metadata.

```ts
(opts: {
  isFiltered?: boolean;
  category_id?: string;  // default: "all"
  year_id?: string;      // default: "allyears"
}): Promise<{
  entries: Array<Record<string, unknown>>;
  years: number[];
  active_categories: Record<string, boolean>;
}>
```

Each entry in the response is mapped to the legacy API shape:
```ts
{
  id, client_id, entry_id, client_label, category,
  title, year, is_responsive, is_summary, is_featured
}
```

Also returns:
- `years` — all available years for the selected category (descending)
- `active_categories` — which categories have entries in the selected year

#### `fetchItemService(opts)`

Returns a single portfolio item with fully resolved lookup data.

```ts
(opts: { entry_id: string }): Promise<Record<string, unknown>>
```

Resolves all foreign keys:
- `client` key → `client_label` (display name)
- `affiliation` key → `affiliation` name + `affiliation_url`
- `technologies` keys → comma-separated display names
- `frameworks` keys → array of `{ name, url }` objects
- `territories` keys → comma-separated display names
- `platforms` keys → comma-separated display names

Returns `Promise.reject()` if the entry is not found.

#### `fetchArchiveItemService(opts)`

Fetches per-project archive JSON from the static files. This is the **only** function that makes a network request.

```ts
(opts: { client_id: string; entry_id: string }): Promise<unknown>
```

Fetches from `VITE_DATA_BASE/{client_id}/{entry_id}.json` using the native `fetch()` API.

---

## URL Builder Functions

`www/src/constants/AppConstants.ts` exports URL builder functions that construct asset paths from the `VITE_ASSETS_BASE` and `VITE_DATA_BASE` environment variables.

| Function | Signature | Returns |
|---|---|---|
| `get_base_assets_path()` | `() → string` | `VITE_ASSETS_BASE` raw value |
| `get_image_path(opts)` | `({ client_id, entry_id }) → string` | `{ASSETS}/images/portfolio-entries/{client}/{entry}/screengrabs/` |
| `get_thumb_path(opts)` | `({ client_id, entry_id }) → string` | `{ASSETS}/images/portfolio-entries/{client}/{entry}/thumb/` |
| `get_summary_thumb_path()` | `() → string` | `{ASSETS}/images/portfolio-entries/jollywise/miscellaneous/thumb/` |
| `get_images_path()` | `() → string` | `{ASSETS}/images/` |
| `get_awards_path()` | `() → string` | `{ASSETS}/images/awards/` |
| `get_archive_path(opts)` | `({ client_id, entry_id }) → string` | `{DATA_BASE}/{client_id}/{entry_id}.json` |
| `get_sitemap()` | `() → string` | `{BASE_URL}/sitemap.xml` |

---

## Local Data Derivation

`AppConstants.ts` also derives the `localdata` lookup from `portfolio.json` at import time. This replaces the old `data.json` import and maintains the same shape consumed by `localDataReducer` and `itemActions`.

### Shape

```ts
// client_key → entry_key → media data
Record<string, Record<string, {
  has_archive: boolean;
  is_flash: boolean;
  is_dark_background: boolean;
  images: Array<{ id: string; width: number; height: number }>;
  pdfs: unknown[];
  videos: unknown[];
  links: unknown[];
  awards: unknown[];
}>>
```

Accessed via `get_localdata()`.

### Constants

| Constant | Value | Description |
|---|---|---|
| `DEFAULT_FILTER` | `true` | Default filter state (show featured only) |
| `CATEGORY_ABOUT` | `"about"` | About page category key |
| `ALL_YEARS` | `"allyears"` | All-years filter value |
| `DEFAULT_YEAR` | `"allyears"` | Default year selection |
| `DEFAULT_CATEGORY` | `"about"` | Default category (landing page) |
| `DEFAULT_ITEM` | `"grootdance"` | Default item for fallback |
| `IFRAME` | `"IFRAME"` | Archive content type identifier |

### Default categories

`defaultCategories` provides the "About" and "All" pseudo-categories that are prepended to the category list from the service layer:

```ts
[
  { category_id: -1, category_name: "about", category_label: "About", to: "/about", ... },
  { category_id: 0,  category_name: "all",   category_label: "All",   to: "/all/{year}", ... }
]
```

---

## Archive JSON

Per-project archive data (iframe embeds for legacy Flash content) is served as static JSON from `www/public/assets/json/archive/{client}/{entry}.json`.

This is the **only data loaded via `fetch()` at runtime** — everything else is bundled at build time from `portfolio.json`.

Archive JSON is loaded by `fetchArchiveItemService()` when a user navigates to `/:category/:client/:entry/archive`.

---

## Sitemap Generation

`www/public/sitemap.xml` is generated from `portfolio.json` by `scripts/generate-sitemap.ts`.

### What it generates

- `/about` — priority 1.0
- `/{category}/allyears` for each category — priority 0.8
- `/{category}/{client}/{entry_key}` for each entry — priority 0.6, with `<lastmod>` from entry's `modified` field

### Usage

```bash
# From www/
npm run sitemap

# From project root
npx tsx scripts/generate-sitemap.ts
```

The sitemap is committed to the repo and served as a static file.
