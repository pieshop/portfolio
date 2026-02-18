# Portfolio Project — CLAUDE.md

> Codebase analysis as of February 2026. This is a personal portfolio website (~2018 origin) that has been maintained in production. The goal is to upgrade it.

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
│   ├── src/js/             # Source JavaScript
│   │   ├── index.js        # Entry point
│   │   ├── App.js          # Root component
│   │   ├── Analytics.js    # Google Analytics tracker
│   │   ├── components/     # ~28 presentational components
│   │   ├── containers/     # About, Categories, Item, Loader, NavBar
│   │   ├── constants/      # AppConstants.js (URLs, API endpoints)
│   │   ├── routes/         # mainRoutes.js (React Router config)
│   │   ├── store/          # Redux store (categories, items, item, localdata)
│   │   └── services/       # API service layer (superagent)
│   ├── src/scss/           # SASS stylesheets
│   ├── src/assets/         # JSON data, images, fonts, sitemap files
│   ├── buildtools/         # Webpack config (modular, multi-env)
│   ├── tools/              # Build scripts (run, deploy, sync, critical)
│   ├── dist/               # Production build output
│   ├── stage/              # Staging build output
│   └── dev/                # Dev build output
├── api/                    # Legacy PHP/Laravel API (Grunt-managed, mostly unused)
└── api_express/            # Newer Express.js API stub (src is empty — only node_modules)
```

---

## Tech Stack

### Frontend
| Technology | Version | Notes |
|---|---|---|
| React | 16.8.4 | Hooks era but many class components remain |
| Redux | 4.0.4 | |
| React Router DOM | 5.1.2 | |
| connected-react-router | 6.5.2 | |
| Bootstrap | 4.1.2 | CSS only |
| GSAP | 2.0.2 | Legacy v2 (not v3) |
| React Helmet | 5.2.0 | SEO/head management |
| React Lazyload | 2.3.0 | Image lazy loading |
| React GA | 2.7.0 | Google Analytics |
| Superagent | 3.8.3 | HTTP client |
| Redux Thunk | 2.3.0 | Async middleware |

### Build Tools
| Technology | Version | Notes |
|---|---|---|
| Webpack | 4.27.1 | Very old — v5 is current |
| Babel | 7.6.2 | ES6+ transpilation |
| Node requirement | >8.1.x | Very outdated |
| ESLint | 5.1.0 | Google style guide |
| Prettier | 1.18.2 | |
| Workbox | 3.5.0 | Service Worker (disabled in prod) |

---

## Routes

| Path | Component | Description |
|---|---|---|
| `/about` | About | About page with skills |
| `/:category_id/:year_id` | Categories | Filtered category view |
| `/:category_id/:client_id/:entry_id` | Item | Project detail page |

---

## Redux State Shape

```js
{
  router,                   // React Router state
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

---

## Build Targets

The build system supports multiple environments via Webpack config composition (`buildtools/webpack_config/constants/project-*.js`):

| Target | Command | Notes |
|---|---|---|
| Development | `npm run watch` | HMR, no minification |
| Local iMac | `npm run imac` | |
| Staging | `npm run stage` | |
| Production | `npm run dist` | Minified, versioned |

Deployment is done via rsync to SSH hosts defined in `~/.ssh/config`.

---

## Known Issues / Technical Debt

- **Webpack 4** — Current is v5. Major upgrade needed.
- **React 16** — Current is React 19. No concurrent features, no Server Components.
- **React Router v5** — Current is v6/v7. Breaking API changes needed.
- **GSAP v2** — Current is v3. Completely different API.
- **Bootstrap 4** — Current is v5. Some API differences.
- **Node requirement `>8.1.x`** — Node 8 has been EOL since 2019.
- **`UNSAFE_componentWillReceiveProps`** — Used in containers; marked as TODO to refactor.
- **Service Worker disabled in production** — Was breaking sitemaps; Workbox v3 is ancient.
- **`api_express/src/`** — Directory exists but is empty (no source files, only `node_modules`).
- **`api/`** — Legacy PHP/Laravel API managed by Grunt; appears to be dormant.
- **Flash support** — Still present for legacy client projects.
- **`package-lock.json` deleted** — Git shows `D www/package-lock.json` in working tree.

---

## Patterns & Architecture Notes

- **Container/Presentational split** — Containers in `containers/`, UI in `components/`.
- **Selector pattern** — `itemsSelectors.js`, `categoriesSelectors.js` abstract state shape.
- **Data flow** — AppConstants loads config.json → containers dispatch → reducers → localStorage.
- **Portfolio data** — Lives in `src/assets/json/data.json` and per-project archive JSON files.
- **Config** — `src/assets/json/config.json` is environment-templated (base URL, GA ID, CDN).
- **No TypeScript** — Plain JavaScript throughout.
- **No tests** — No test framework or test files found.

---

## Upgrade Goals (TBD)

To be refined with the user, but likely includes:
- Upgrade Node, npm/package tooling
- Upgrade Webpack 4 → 5 (or migrate to Vite)
- Upgrade React 16 → 18/19
- Upgrade React Router v5 → v6/v7
- Upgrade GSAP v2 → v3
- Refactor class components with `UNSAFE_*` lifecycle methods
- Re-enable Service Worker properly
- Consider TypeScript migration
- Add basic testing

## Tech

I have added a new package.json with new dependencies. Please compare against package-original.json

- Node 22.1.0
- npm 8.1.3
- Remove Webpack - use Vite
- Remove Bootstrap - use Radix UI
- Upgrade eslint to latest
- Upgrade GSAP to v3
- Upgrade React to latest - no server components
- Upgrade React Router to latest
- Upgrade Redux to latest
- Migrate to Typescript
