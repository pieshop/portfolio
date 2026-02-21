# Portfolio Project — CLAUDE.md

> Codebase analysis as of February 2026. This is a personal portfolio website (~2018 origin) that has been maintained in production. **Upgrade complete as of February 2026.**

---

## What This Project Is

A personal portfolio website for Stephen Hamilton (Interactive Developer) at **stephenhamilton.co.uk**. It showcases client work organised by category (Web, App, Game, Responsive, OLM, etc.) and year, with project detail pages including images, descriptions, awards, and archive data.

**Key URL:**
- Frontend: www.stephenhamilton.co.uk

---

## Repository Structure

```
portfolio/
├── www/                    # Frontend React/Redux app — the main codebase
│   ├── src/
│   │   ├── main.tsx        # Entry point (Vite)
│   │   ├── App.tsx         # Root component
│   │   ├── vite-env.d.ts   # Vite env type declarations
│   │   ├── components/     # Presentational components (TypeScript)
│   │   ├── containers/     # About, Categories, Item, Loader, NavBar (TypeScript)
│   │   ├── constants/      # AppConstants.ts (asset paths, defaults)
│   │   ├── routes/         # mainRoutes.tsx (React Router v7)
│   │   ├── store/          # Redux store (RTK, TypeScript)
│   │   ├── services/       # Data service layer (reads local JSON)
│   │   └── utils/          # Utility functions (TypeScript)
│   ├── src/css/            # Plain CSS stylesheets (split into partials)
│   │   ├── index.css       # Imports all partials + Radix colour tokens
│   │   ├── theme.css       # CSS custom properties (colours, spacing vars)
│   │   ├── typography.css  # Font faces, base type styles
│   │   ├── grid.css        # Category grid + media item column classes
│   │   └── ui.css          # Component styles (navbar, footer, cards, etc.)
│   ├── src/assets/         # JSON data, images, fonts
│   │   └── json/
│   │       └── portfolio.json  # All portfolio data (entries, categories, clients, etc.)
│   ├── public/             # Static files served by Vite
│   │   ├── assets/json/archive/  # Per-project archive JSON files
│   │   └── sitemap.xml     # Generated sitemap (committed)
│   ├── scripts/            # Shell scripts
│   │   ├── deploy.sh       # Build/deploy script (build, local, push, live, stage, assets, assets:pull)
│   │   └── purge-cdn.sh    # Ad-hoc BunnyCDN cache purge for portfolio images
│   ├── index.html          # Vite entry HTML
│   ├── vite.config.ts      # Vite config with path aliases + dev proxy
│   ├── tsconfig.json       # TypeScript config
│   ├── eslint.config.js    # ESLint v9 flat config
│   ├── .env.development    # Dev env vars (VITE_*)
│   ├── .env.staging        # Staging env vars
│   ├── .env.production     # Production env vars
│   ├── Dockerfile          # nginx:alpine image for production
│   ├── .dockerignore       # Limits build context to dist/ + nginx.conf
│   ├── nginx.conf          # SPA routing, gzip, cache headers, security headers
│   ├── docker-compose.yml  # Production (runs on NAS, port 8080)
│   ├── docker-compose.stage.yml  # Staging (runs on NAS, port 8081)
│   └── docker-compose.dev.yml    # Local testing (builds + runs on Mac, port 8080)
├── scripts/                # Build-time TypeScript scripts
│   ├── convert-db.ts       # One-time SQL → JSON conversion (reads sql/portfolio.sql)
│   ├── generate-sitemap.ts # Generates www/public/sitemap.xml from portfolio.json
│   └── tsconfig.json       # TypeScript config for scripts (uses www's @types/node)
├── sql/                    # Database archive
│   └── portfolio.sql       # phpMyAdmin dump — permanent archive of the original DB
├── assets/                 # Local portfolio media (git-ignored, ~90MB)
│   └── portfolio/
│       └── images/         # Thumbnails, screengrabs, awards — synced from NAS via SSH
├── api/                    # Legacy PHP/Laravel API (dormant, kept for reference)
└── api_express/            # Express.js API stub (empty src/, never completed)
```

---

## Tech Stack

### Frontend
| Technology | Version | Notes |
|---|---|---|
| React | 18.3.1 | Functional components, hooks throughout |
| Redux Toolkit | 2.2.6 | RTK configureStore; all selectors memoized with `createSelector` |
| React Router | 7.5.3 | Routes/Route/Navigate, useParams/useLocation |
| Radix UI Themes | 3.2.1 | Replaces Bootstrap; accent color violet |
| Radix UI Primitives | latest | `@radix-ui/react-navigation-menu` for navbar |
| framer-motion | 12.x | Replaces GSAP v2; used for image fade-in on load |
| react-intersection-observer | ^10.0.3 | Replaces react-lazyload; withholds src until near viewport |
| react-helmet-async | 2.0.5 | SEO/head management |
| react-redux | 9.1.2 | useSelector/useDispatch typed hooks |

### Build Tools
| Technology | Version | Notes |
|---|---|---|
| Vite | 6.0.1 | Replaces Webpack 4 |
| TypeScript | 5.4.5 | Full migration from JavaScript |
| Node requirement | ^22.17.1 | |
| ESLint | 9.31.0 | Flat config (eslint.config.js) |
| Prettier | 3.4.1 | |

---

## Data Architecture

All portfolio data lives in a single local JSON file — no API or database dependency at runtime.

### portfolio.json

`www/src/assets/json/portfolio.json` is the single source of truth for all portfolio data. It is imported directly by the service layer and bundled into the app at build time.

**Structure** — Normalized with shared lookup tables at the top level; entries reference by key:

```json
{
  "categories":   { "web": { "label": "Websites", "description": "..." }, ... },
  "clients":      { "bbc": { "name": "BBC" }, ... },
  "technologies": { "html": "HTML", "css": "CSS", ... },
  "frameworks":   { "react": { "name": "React", "url": "..." }, ... },
  "platforms":    { "desktop": "Desktop", ... },
  "affiliations": { "jollywise": { "name": "Jollywise Media", "url": "..." }, ... },
  "territories":  { "uk": "UK", "emea": "EMEA", ... },
  "entries": [
    {
      "entry_key": "nextstep",
      "title": "Take it to the Top!",
      "description": "...",
      "responsibilities": "...",
      "year": 2016, "week": 45,
      "modified": "2026-02-18T14:41:54",
      "is_featured": true, "is_nda": false, "is_summary": false, "is_responsive": true,
      "client": "bbc",
      "categories": ["web", "game", "responsive", "app"],
      "affiliation": "jollywise",
      "technologies": ["html", "css", "javascript"],
      "frameworks": ["babel", "vuejs"],
      "platforms": ["desktop", "tablet", "smartphone"],
      "territories": ["uk"],
      "has_archive": false, "is_flash": false, "is_dark_background": false,
      "images": [{ "id": "desktop_01.jpg", "width": 1024, "height": 847 }],
      "pdfs": [], "videos": [], "links": [], "awards": []
    }
  ]
}
```

### How portfolio.json was generated

The `scripts/convert-db.ts` script performed a one-time conversion:
1. Parsed `sql/portfolio.sql` (phpMyAdmin dump of the MariaDB database with 15+ tables and junction tables)
2. Resolved all many-to-many relationships (entries ↔ categories, technologies, frameworks, platforms, territories, affiliations, awards)
3. Merged with the former `data.json` which provided media data (images with dimensions, PDFs, videos, links, awards with full detail, archive/flash/dark-background flags)
4. Output the merged, denormalized result

To regenerate: `npx tsx scripts/convert-db.ts` (from project root)

### Archive JSON

Per-project archive data (iframe embeds for legacy Flash content) is served as static JSON from `www/public/assets/json/archive/{client}/{entry}.json`. This is the only data still loaded via `fetch()` at runtime.

### Sitemap

`www/public/sitemap.xml` is generated from portfolio.json by `scripts/generate-sitemap.ts`. Run manually when data changes:

```bash
cd www && npm run sitemap
```

Or from the project root: `npx tsx scripts/generate-sitemap.ts`

---

## Routes

| Path | Component | Description |
|---|---|---|
| `/about` | About | About page with skills |
| `/:category_id/:year_id` | Categories | Filtered category view |
| `/:category_id/:client_id/:entry_id` | Item | Project detail page |
| `/:category_id/:client_id/:entry_id/archive` | Item | Archive view of a project |

---

## Redux State Shape

```ts
{
  selectedCategory,
  selectedCategoryMetaData,
  selectedYear,
  filtered,                 // Persisted to localStorage
  selectedItem,
  localData,
  itemsByCategory,          // Persisted to localStorage
  itemsByID,                // Persisted to localStorage
  categories                // Persisted to localStorage
}
```

State is selectively persisted to localStorage via custom middleware.
All selectors use `createSelector` from RTK to avoid unnecessary re-renders.

---

## Build & Deploy

### Build Commands

Environment config via `.env.*` files using `VITE_*` variables:

| Command | What it does |
|---|---|
| `npm run dev` | Vite HMR dev server |
| `npm run build:prod` | tsc + vite build (production) |
| `npm run build:stage` | tsc + vite build --mode staging |
| `npm run build:dev` | tsc + vite build --mode development |
| `npm run preview` | Preview production build locally |
| `npm run sitemap` | Generate sitemap.xml from portfolio.json |

### Deploy Commands

All deploy commands run from `www/` and delegate to `scripts/deploy.sh`:

| Command | What it does |
|---|---|
| `npm run deploy:live` | Full deploy: build prod → Docker image → push to NAS → restart |
| `npm run deploy:stage` | Full deploy: build stage → Docker image → push to NAS → restart |
| `npm run deploy:local` | Build prod → run in Docker locally on :8080 |
| `npm run docker:build` | Build prod Vite app + Docker image (no deploy) |
| `npm run docker:push` | Push existing image to NAS + restart container |
| `npm run deploy:assets` | Sync local portfolio images → NAS via SSH |
| `npm run assets:pull` | Pull portfolio images from NAS → local via SSH |

Or use `scripts/deploy.sh` directly:

```bash
./scripts/deploy.sh live                # build + deploy to production
./scripts/deploy.sh stage               # build + deploy to staging
./scripts/deploy.sh local               # build + run locally in Docker
./scripts/deploy.sh build [prod|stage]  # build only (no deploy)
./scripts/deploy.sh push [live|stage]   # push only (no rebuild)
./scripts/deploy.sh assets              # sync local images → NAS
./scripts/deploy.sh assets:pull         # pull images from NAS → local
```

### Deploy Pipeline

```
npm run build:prod              # Vite builds to dist/
    → docker build --platform linux/amd64    # nginx:alpine image (~25MB)
    → docker save | ssh ds918_stephen sudo docker load   # pipe to NAS
    → ssh sudo docker compose -p <project> up -d --force-recreate
```

- Images are tagged with both `portfolio:latest` and `portfolio:YYYY-MM-DD` for rollback
- Builds target `linux/amd64` (NAS platform) from Apple Silicon Mac
- SSH host `ds918_stephen` defined in `~/.ssh/config` (192.168.1.75:51966)
- Passwordless sudo for docker via `/etc/sudoers.d/docker-deploy` on NAS
- Compose projects are isolated by name (`portfolio-prod`, `portfolio-stage`) so deploying one doesn't affect the other
- Both containers have `restart: unless-stopped` — they survive NAS reboots

### Rollback

```bash
# On the NAS (via SSH):
sudo docker tag portfolio:2026-02-20 portfolio:latest
cd /volume1/docker/portfolio && sudo docker compose -p portfolio-prod -f docker-compose.yml up -d --force-recreate
```

### Hosting Architecture

- **Frontend:** Docker nginx container on Synology DS-918 NAS, port 8080
- **Reverse proxy:** Synology DSM reverse proxy (HTTPS → HTTP):
  - `www.stephenhamilton.co.uk:443` → `localhost:8080`
  - `stephenhamilton.co.uk:443` → `localhost:8080`
  - `stage.stephenhamilton.co.uk:443` → `localhost:8081`
- **SSL:** Let's Encrypt via Synology DSM, assigned to each reverse proxy entry
- **DNS/CDN edge:** Cloudflare
- **Containers:** Both `restart: unless-stopped` — auto-restart after NAS reboot

### Asset Architecture

Three types of assets, each served differently:

**1. Build artifacts (JS/CSS/fonts)** — Served by the nginx container from `/assets/*`. Hashed filenames, immutable cache headers. No CDN needed.

**2. Portfolio media (images, thumbnails, awards)** — Served via BunnyCDN:
- Origin: `assets.stephenhamilton.co.uk` (Web Station/Apache on NAS, unchanged)
- CDN: `cdn.stephenhamilton.co.uk` (BunnyCDN pull zone)
- Referenced via `VITE_ASSETS_BASE` → `get_image_path()`, `get_thumb_path()`, `get_awards_path()`

**3. Archive JSON (per-project data)** — Served by the nginx container from `/assets/json/archive/{client}/{entry}.json`. Source files in `www/public/assets/json/archive/`.

### CDN Cache Purge

Only needed when existing portfolio images are **replaced** (same filename, new content). New images cache naturally.

```bash
./scripts/purge-cdn.sh images/portfolio-entries/disney/capamerads/thumb/thumb.jpg
```

Requires `BUNNY_API_KEY` env var or `www/.env.local` file.

### Local Assets (Dev)

Portfolio media images (~90MB, ~1,800 files) can be served locally during development. `vite.config.ts` checks for `../assets/portfolio/images/` at startup:

- **If present:** A Vite plugin serves `/assets-proxy/*` directly from the local `assets/portfolio/` directory. No network requests to the NAS.
- **If absent:** Falls back to the remote proxy (`/assets-proxy` → `https://assets.stephenhamilton.co.uk/portfolio`), same as before.

Initial setup: `cd www && ./scripts/deploy.sh assets:pull`

The `assets/` directory is git-ignored. Synced to/from the NAS via SSH + rsync (`ds918_stephen:/volume1/web/assets.stephenhamilton.co.uk/portfolio/images/`). Synology `@eaDir` metadata directories are excluded.

### Environment Variables

| Variable | Development | Staging | Production |
|---|---|---|---|
| `VITE_ASSETS_BASE` | `/assets-proxy` | `https://assets...` | `https://cdn...` |
| `VITE_DATA_BASE` | `/assets/json/archive` | `/assets/json/archive` | `/assets/json/archive` |

### NAS Docker Setup (one-time, already done)

- Compose files at `/volume1/docker/portfolio/` on NAS
- Old site backed up to `.bak.www.stephenhamilton.co.uk` in `/volume1/web/`
- `www.stephenhamilton.co.uk` and `stephenhamilton.co.uk` vhosts removed from Web Station
- `assets.stephenhamilton.co.uk` remains on Web Station (BunnyCDN origin)
- Passwordless sudo: `stephen ALL=(root) NOPASSWD: /usr/local/bin/docker, /usr/local/bin/docker-compose`

---

## Known Issues / Remaining Work

- **No tests** — No test framework added during migration.
- **Service Worker** — Still disabled (`sw.js` present but not wired up); could be re-enabled with Vite PWA plugin.
- **Google Analytics removed** — react-ga was removed; no replacement added.
- **Flash support removed** — SWF/Flash components deleted; legacy Flash projects will not display media.
- **`api_express/src/`** — Directory exists but is empty (no source files, only `node_modules`).
- **`api/`** — Legacy PHP/Laravel API; dormant, kept for reference.
- **`src/utils/DateFormat.ts`** — Unused utility file (date formatting); safe to delete.

---

## Patterns & Architecture Notes

- **Container/Presentational split** — Containers in `containers/`, UI in `components/`.
- **Selector pattern** — `itemsSelectors.ts`, `categoriesSelectors.ts`, `itemSelectors.ts` all use `createSelector` with stable fallback constants to prevent unnecessary re-renders.
- **Data flow** — `portfolio.json` is imported at build time → service layer filters/transforms → Redux actions dispatch → reducers → localStorage.
- **Portfolio data** — All entry metadata, media info, and lookup tables live in `src/assets/json/portfolio.json`. Per-project archive JSON files are loaded at runtime from `public/assets/json/archive/`.
- **Service layer** — `src/services/portfolio.ts` reads directly from the imported `portfolio.json` and returns Promises (matching the original API-based signatures). No network requests except for archive JSON. Redux actions/reducers are unchanged.
- **Local data derivation** — `AppConstants.ts` derives the `localdata` lookup (`client → entry → media`) from `portfolio.json` entries at import time, maintaining the same shape used by `localDataReducer` and `itemActions`.
- **Config** — Environment vars in `.env.development` / `.env.staging` / `.env.production`.
- **TypeScript** — Full TypeScript migration complete. All source files are `.ts`/`.tsx`.
- **CSS** — Plain CSS (no preprocessor). Split into partials under `src/css/`. Uses native CSS nesting and custom properties. No Bootstrap — Radix UI Themes primitives used throughout.
- **Lazy loading** — `react-intersection-observer` (`useInView`) withholds `src`/`srcSet` until an image is within 200px of the viewport (`triggerOnce: true`). Applies to both the category grid thumbnails (`CategoryItemImage`) and item detail images (`ItemMediaList`). Loading placeholder uses Radix `<Spinner>`.
- **No tests** — No test framework added.

---

## Frontend App Walkthrough (Concise)

### Entry + App Shell

- `www/src/main.tsx` wires React, Redux, Helmet, Radix Theme, CSS, logs env flags, and conditionally registers the service worker.
- `www/src/App.tsx` renders the global `Loader`, then mounts the router inside `<Flex direction="column" minHeight="100vh">` for sticky footer layout.
- `www/src/routes/mainRoutes.tsx` wraps routes with `Header` and `Footer` and defines all four routes.

### Redux Store + Data Flow

- `www/src/store/configureStore.ts` sets RTK store, persists selected slices to `localStorage`, and rehydrates in production builds.
- `www/src/store/rootReducer.ts` combines selected category/year/filter, category metadata, item lists, items by id, and local data.
- `www/src/store/categories/categoriesActions.ts` fetches available categories + active-by-year from the service layer, updates metadata, and triggers item fetches when category/year/filter changes.
- `www/src/store/items/itemsActions.ts` fetches category items, enriches entries (paths, booleans, awards), and caches per category.
- `www/src/store/item/itemActions.ts` fetches a single item, merges local data, parses media (images/pdfs/videos), and optionally loads archive JSON.
- `www/src/utils/dateValidation.ts` gates refetching (15s dev, 1 day prod).

### Routes + Containers

- `www/src/containers/About.tsx` selects category/year and renders the about content with metadata.
- `www/src/containers/Categories.tsx` reads params, dispatches category/year selection, and renders `Items`.
- `www/src/containers/Item.tsx` fetches the item, toggles archive view, and renders overview/details/awards/media.
- `www/src/containers/Loader.tsx` shows a full-page loader when category items are fetching.

### Components + Styling

- `www/src/components/Header.tsx` and `www/src/components/Footer.tsx` provide the global frame. Footer uses Radix `IconButton` with `asChild` for icon links.
- `www/src/components/NavBar.tsx` uses `@radix-ui/react-navigation-menu` for accessible nav with keyboard support; Radix `DropdownMenu` for the year filter; collapses to hamburger on mobile via React state + `.site-nav__collapse.is-open` CSS class.
- `www/src/components/Items.tsx` + `www/src/components/CategoryItem.tsx` render item cards with thumbnails, awards, and lazy-loaded images.
- `www/src/components/CategoryItemImage.tsx` uses `useInView` to defer image loading; shows Radix `<Spinner>` placeholder until in range.
- `www/src/components/item/ItemMediaList.tsx` uses `MediaImageCell` (internal component) with `useInView` to defer item detail images; shows `ItemImagePlaceholder` (Radix `<Spinner>`) until in range.
- `www/src/css/` contains all styles as plain CSS partials (no SCSS).

### Legacy API Folders

- `api/` is legacy PHP/Laravel (Grunt-managed, dormant). Was the original data source before the local JSON migration.
- `api_express/` is an empty Express stub (no source in `src/`). Never completed.

---

## Upgrade Goals (Completed February 2026)

- ✅ Node 22, npm — updated
- ✅ Webpack 4 → Vite 6
- ✅ React 16 → React 18 (createRoot, functional components)
- ✅ React Router v5 → v7 (Routes/Route, hooks)
- ✅ Redux → Redux Toolkit (configureStore, typed hooks, memoized selectors)
- ✅ GSAP v2 → framer-motion
- ✅ Bootstrap → Radix UI Themes
- ✅ Superagent → native fetch
- ✅ react-lazyload → react-intersection-observer (`useInView`) + native `loading="lazy"`
- ✅ react-helmet → react-helmet-async
- ✅ Class components → functional components with hooks
- ✅ `UNSAFE_componentWillReceiveProps` removed
- ✅ Full TypeScript migration (all `.js` → `.ts`/`.tsx`)
- ✅ ESLint v9 flat config
- ✅ Flash/SWF support removed
- ✅ Environment config via `import.meta.env.VITE_*`
- ✅ SCSS → plain CSS (native nesting, custom properties, split into partials)
- ✅ Bootstrap modal → Radix `Dialog`
- ✅ Bootstrap dropdown → Radix `DropdownMenu`
- ✅ Bootstrap navbar → Radix `NavigationMenu` primitive
- ✅ API + MariaDB → local JSON (`portfolio.json`; API eliminated)
- ✅ Build-time sitemap generation
