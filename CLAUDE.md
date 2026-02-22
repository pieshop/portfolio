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
├── docs/                   # Detailed documentation
│   ├── api.md              # Data architecture & service layer
│   ├── architecture.md     # Frontend architecture & patterns
│   └── build.md            # Build, deploy & infrastructure
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

All portfolio data lives in `www/src/assets/json/portfolio.json` — a single local JSON file imported at build time. No API or database at runtime. The service layer (`src/services/portfolio.ts`) reads directly from the imported JSON and returns Promises matching the original API signatures. Per-project archive JSON is the only data fetched at runtime (`public/assets/json/archive/`).

See [docs/api.md](docs/api.md) for full schema, service layer functions, URL builders, and data generation scripts.

---

## Routes

| Path | Component | Description |
|---|---|---|
| `/about` | About | About page with skills |
| `/:category_id/:year_id` | Categories | Filtered category view |
| `/:category_id/:client_id/:entry_id` | Item | Project detail page |
| `/:category_id/:client_id/:entry_id/archive` | Item | Archive view of a project |

---

## Build & Deploy

### Build Commands

| Command | What it does |
|---|---|
| `npm run dev` | Vite HMR dev server |
| `npm run build:prod` | tsc + vite build (production) |
| `npm run build:stage` | tsc + vite build --mode staging |
| `npm run build:dev` | tsc + vite build --mode development |
| `npm run preview` | Preview production build locally |
| `npm run sitemap` | Generate sitemap.xml from portfolio.json |

### Deploy Commands

| Command | What it does |
|---|---|
| `npm run deploy:live` | Full deploy: build prod → Docker image → push to NAS → restart |
| `npm run deploy:stage` | Full deploy: build stage → Docker image → push to NAS → restart |
| `npm run deploy:local` | Build prod → run in Docker locally on :8080 |
| `npm run deploy:assets` | Sync local portfolio images → NAS via SSH |
| `npm run assets:pull` | Pull portfolio images from NAS → local via SSH |

See [docs/build.md](docs/build.md) for the full deploy pipeline, Docker setup, hosting architecture, environment variables, CDN purge, and local asset serving.

---

## Patterns & Architecture

Container/Presentational split with Redux Toolkit. Data flows from `portfolio.json` (build-time import) → service layer → Redux actions → reducers → localStorage persistence. All selectors use `createSelector` with stable fallback constants. Images lazy-loaded via `react-intersection-observer` (`useInView`). Plain CSS with native nesting and custom properties.

See [docs/architecture.md](docs/architecture.md) for the full app walkthrough, Redux state shape, component details, and CSS architecture.

---

## Known Issues / Remaining Work

- **No tests** — No test framework added during migration.
- **Service Worker** — Still disabled (`sw.js` present but not wired up); could be re-enabled with Vite PWA plugin.
- **Google Analytics removed** — react-ga was removed; no replacement added.
- **Flash support removed** — SWF/Flash components deleted; legacy Flash projects will not display media.
- **`api_express/`** — Express.js API upgraded to Node 22 ESM; serves entry metadata from MariaDB. See `api_express/README.md`.
- **`api/`** — Legacy PHP/Laravel API; dormant, kept for reference.
- **`src/utils/DateFormat.ts`** — Unused utility file (date formatting); safe to delete.

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
