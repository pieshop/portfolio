# Portfolio Project — CLAUDE.md

> Codebase analysis as of February 2026. This is a personal portfolio website (~2018 origin) that has been maintained in production. **Upgrade complete as of February 2026.**

---

## What This Project Is

A personal portfolio website for Stephen Hamilton (Interactive Developer) at **stephenhamilton.co.uk**. It showcases client work organised by category (Web, App, Game, Responsive, OLM, etc.) and year, with project detail pages including images, descriptions, awards, and archive data.

**Key URLs:**
- Frontend: www.stephenhamilton.co.uk
- API: api.stephenhamilton.co.uk

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
│   │   ├── constants/      # AppConstants.ts (URLs via import.meta.env)
│   │   ├── routes/         # mainRoutes.tsx (React Router v7)
│   │   ├── store/          # Redux store (RTK, TypeScript)
│   │   ├── services/       # API service layer (native fetch)
│   │   └── utils/          # Utility functions (TypeScript)
│   ├── src/css/            # Plain CSS stylesheets (split into partials)
│   │   ├── index.css       # Imports all partials + Radix colour tokens
│   │   ├── theme.css       # CSS custom properties (colours, spacing vars)
│   │   ├── typography.css  # Font faces, base type styles
│   │   ├── grid.css        # Category grid + media item column classes
│   │   └── ui.css          # Component styles (navbar, footer, cards, etc.)
│   ├── src/assets/         # JSON data, images, fonts, sitemap files
│   ├── public/             # Static files served by Vite (archive JSON files)
│   ├── index.html          # Vite entry HTML
│   ├── vite.config.ts      # Vite config with path aliases + dev proxy
│   ├── tsconfig.json       # TypeScript config
│   ├── eslint.config.js    # ESLint v9 flat config
│   ├── .env.development    # Dev env vars (VITE_*)
│   ├── .env.staging        # Staging env vars
│   └── .env.production     # Production env vars
├── api/                    # Legacy PHP/Laravel API (Grunt-managed, mostly unused)
└── api_express/            # Newer Express.js API stub (src is empty — only node_modules)
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

## Build Targets

Environment config via `.env.*` files using `VITE_*` variables:

| Target | Command | Notes |
|---|---|---|
| Development | `npm run dev` | Vite HMR dev server |
| Dev build | `npm run build:dev` | tsc + vite build --mode development |
| Staging build | `npm run build:stage` | tsc + vite build --mode staging |
| Production build | `npm run build:prod` | tsc + vite build |
| Preview | `npm run preview` | Preview production build locally |

Deployment is done via rsync to SSH hosts defined in `~/.ssh/config`.

### Dev Proxy

`vite.config.ts` proxies `/assets-proxy` → `https://assets.stephenhamilton.co.uk/portfolio` to avoid CORS in development. `VITE_ASSETS_BASE=/assets-proxy` in `.env.development`.

### Archive JSON (local dev)

Per-project archive JSON files are copied into `www/public/` so Vite serves them statically at e.g. `/disney/capamerads.json`. `VITE_DATA_BASE` is empty in all envs — paths resolve relative to the site root.

---

## Known Issues / Remaining Work

- **No tests** — No test framework added during migration.
- **Service Worker** — Still disabled (`sw.js` present but not wired up); could be re-enabled with Vite PWA plugin.
- **Google Analytics removed** — react-ga was removed; no replacement added.
- **Flash support removed** — SWF/Flash components deleted; legacy Flash projects will not display media.
- **`api_express/src/`** — Directory exists but is empty (no source files, only `node_modules`).
- **`api/`** — Legacy PHP/Laravel API managed by Grunt; appears to be dormant.
- **`src/utils/DateFormat.ts`** — Unused utility file (date formatting); safe to delete.

---

## Patterns & Architecture Notes

- **Container/Presentational split** — Containers in `containers/`, UI in `components/`.
- **Selector pattern** — `itemsSelectors.ts`, `categoriesSelectors.ts`, `itemSelectors.ts` all use `createSelector` with stable fallback constants to prevent unnecessary re-renders.
- **Data flow** — `import.meta.env.VITE_*` → containers dispatch → reducers → localStorage.
- **Portfolio data** — Lives in `src/assets/json/data.json` and per-project archive JSON files (also copied to `public/`).
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
- `www/src/store/categories/categoriesActions.ts` fetches available categories + active-by-year, updates metadata, and triggers item fetches when category/year/filter changes.
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

### API Folders

- `api/` is legacy PHP/Laravel (Grunt-managed, not part of the Vite app).
- `api_express/` is an empty Express stub (no source in `src/`).

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
