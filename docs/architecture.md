# Frontend Architecture

> Application structure, patterns, Redux data flow, and component walkthrough.
>
> See also [CLAUDE.md](../CLAUDE.md) for quick reference and [docs/api.md](api.md) for the data/service layer.

---

## Entry Point & App Shell

### main.tsx

`www/src/main.tsx` is the Vite entry point. It:

1. Wraps the app in `<React.StrictMode>`, `<Provider>` (Redux), `<HelmetProvider>` (SEO), and Radix `<Theme accentColor="violet">`
2. Imports all CSS (`src/css/index.css` + Radix theme styles)
3. Logs environment flags to the console (`MODE`, `VITE_SERVICE_WORKER`, `VITE_GA_ENABLED`) via `prettyLog`
4. Conditionally registers the service worker (only in non-dev mode when `VITE_SERVICE_WORKER=true` — currently disabled)
5. Mounts to `#app-root` via `ReactDOM.createRoot()`

### App.tsx

`www/src/App.tsx` renders the global `<Loader>` component, then mounts the router inside `<Flex direction="column" minHeight="100vh">` for sticky footer layout.

### mainRoutes.tsx

`www/src/routes/mainRoutes.tsx` wraps all routes with `<Header>` and `<Footer>`, using a Radix `<Box flexGrow="1">` for the content area:

```tsx
<Header />
<Box flexGrow="1">
  <Routes>
    <Route path="/about" element={<About />} />
    <Route index element={<Navigate to="/about" replace />} />
    <Route path="/:category_id/:client_id/:entry_id" element={<Item />} />
    <Route path="/:category_id/:client_id/:entry_id/archive" element={<Item />} />
    <Route path="/:category_id/:year_id" element={<Categories />} />
    <Route path="*" element={<Navigate to="/about" replace />} />
  </Routes>
</Box>
<Footer />
```

---

## Routes

| Path | Component | Description |
|---|---|---|
| `/about` | About | About page with skills |
| `/:category_id/:year_id` | Categories | Filtered category view |
| `/:category_id/:client_id/:entry_id` | Item | Project detail page |
| `/:category_id/:client_id/:entry_id/archive` | Item | Archive view of a project |
| `/` | (redirect) | Redirects to `/about` |
| `*` | (redirect) | Catch-all redirects to `/about` |

---

## Redux Store & Data Flow

### configureStore.ts

`www/src/store/configureStore.ts` sets up the RTK store with:

- **`rootReducer`** — combined reducers (see below)
- **`preloadedState`** — in production, rehydrates from `localStorage` (via `reHydrateStore()`); in dev, starts fresh
- **`localStorageMiddleware`** — after every action, persists `filtered`, `itemsByID`, `categories`, and `itemsByCategory` to `localStorage` under the key `portfolioState`
- **`loggerMiddleware`** — redux-logger, only in dev (collapsed, with duration and timestamp)

Exports typed hooks:
```ts
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

### State shape

```ts
{
  selectedCategory,            // Current category name (string)
  selectedCategoryMetaData,    // Category metadata object
  selectedYear,                // Current year filter (string)
  filtered,                    // Boolean — show featured only (persisted)
  selectedItem,                // Current item object
  localData,                   // Media data lookup (client → entry → media)
  itemsByCategory,             // Cached items per category (persisted)
  itemsByID,                   // Cached individual items (persisted)
  categories                   // Category list (persisted)
}
```

### rootReducer.ts

Combines nine reducer slices via `combineReducers`:

| Slice | Reducer source | Description |
|---|---|---|
| `selectedCategory` | `categoriesReducer` | Active category name |
| `selectedCategoryMetaData` | `categoriesReducer` | Active category metadata |
| `selectedYear` | `categoriesReducer` | Active year filter |
| `filtered` | `categoriesReducer` | Featured-only toggle |
| `selectedItem` | `itemReducer` | Currently viewed item |
| `localData` | `localDataReducer` | Media data lookup |
| `itemsByCategory` | `itemsReducer` | Category → items cache |
| `itemsByID` | `itemReducer` | Entry key → item cache |
| `categories` | `categoriesReducer` | Available categories list |

### Data flow

```
portfolio.json (imported at build time)
  → service layer (filters, transforms, resolves lookups)
  → Redux actions dispatch results
  → reducers update state
  → localStorageMiddleware persists selected slices
  → components re-render via useAppSelector
```

### Action modules

**`categoriesActions.ts`** — Fetches available categories and active-by-year data from the service layer. Updates category metadata. Triggers item fetches when category, year, or filter changes.

**`itemsActions.ts`** — Fetches category items, enriches entries with paths and booleans (awards, archive flags), and caches results per category key.

**`itemActions.ts`** — Fetches a single item, merges local data (media), parses images/PDFs/videos into display-ready arrays, and optionally loads archive JSON for legacy content.

### Selectors

All selectors use `createSelector` from RTK with stable fallback constants to prevent unnecessary re-renders:

- `itemsSelectors.ts` — selectors for category item lists
- `categoriesSelectors.ts` — selectors for category data and metadata
- `itemSelectors.ts` — selectors for individual item data

### Date validation

`www/src/utils/dateValidation.ts` gates refetching with a staleness check: 15 seconds in dev, 1 day in production. Prevents redundant service calls when navigating between cached views.

---

## Container/Presentational Pattern

### Containers (`src/containers/`)

Containers connect to Redux, dispatch actions, read route params, and pass data to presentational components.

| Container | Role |
|---|---|
| `About.tsx` | Selects category/year, renders about page content with metadata |
| `Categories.tsx` | Reads `category_id`/`year_id` from URL params, dispatches category/year selection, renders `<Items>` |
| `Item.tsx` | Fetches item on mount, toggles archive view based on URL, renders overview/details/awards/media |
| `Loader.tsx` | Shows full-page loader overlay when category items are being fetched |

### Presentational components (`src/components/`)

| Component | Role |
|---|---|
| `Header.tsx` | App header — renders `<NavBar>` |
| `Footer.tsx` | App footer — Radix `IconButton` with `asChild` for icon links |
| `NavBar.tsx` | Radix `NavigationMenu` for accessible nav with keyboard support; Radix `DropdownMenu` for year filter; collapses to hamburger on mobile |
| `Items.tsx` | Renders grid of `<CategoryItem>` cards |
| `CategoryItem.tsx` | Individual card — thumbnail, title, awards, link |
| `CategoryItemImage.tsx` | Lazy-loaded thumbnail with `useInView` and Radix `<Spinner>` placeholder |
| `item/ItemMediaList.tsx` | Item detail image gallery — `MediaImageCell` with `useInView` for deferred loading |

---

## Lazy Loading Pattern

Images are lazy-loaded using `react-intersection-observer` (`useInView` hook) with consistent settings:

```ts
const { ref, inView } = useInView({
  triggerOnce: true,
  rootMargin: '200px',
});
```

- `triggerOnce: true` — only load once when entering viewport
- `rootMargin: '200px'` — start loading 200px before the image is visible

**Until in range:** Image `src`/`srcSet` is withheld and a Radix `<Spinner>` placeholder is shown.

**When in range:** The real `src` is set. `framer-motion` provides a fade-in animation on load.

Applies to:
- **Category grid thumbnails** — `CategoryItemImage.tsx`
- **Item detail images** — `ItemMediaList.tsx` (via internal `MediaImageCell` component)

---

## CSS Architecture

Plain CSS with no preprocessor. Split into partials under `src/css/`:

| File | Purpose |
|---|---|
| `index.css` | Imports all partials + Radix colour tokens |
| `theme.css` | CSS custom properties (colours, spacing vars) |
| `typography.css` | Font faces, base type styles |
| `grid.css` | Category grid + media item column classes |
| `ui.css` | Component styles (navbar, footer, cards, etc.) |

### Patterns used

- **Native CSS nesting** — no SCSS needed
- **CSS custom properties** — theming via `var(--color-*)`, `var(--space-*)`, etc.
- **No Bootstrap** — all layout via Radix UI Themes primitives (`Flex`, `Box`, `Grid`, `Container`)
- **Responsive** — media queries in component styles; NavBar collapses via `.site-nav__collapse.is-open` CSS class toggled by React state

---

## Vite Config

`www/vite.config.ts` configures:

### Plugins

- `@vitejs/plugin-react` — React Fast Refresh for HMR
- `localAssetsPlugin()` — custom Vite plugin to serve portfolio images from local filesystem (only added if `../assets/portfolio/images/` exists at startup)

### Path aliases

```
constants  → src/constants
components → src/components
containers → src/containers
store      → src/store
services   → src/services
utils      → src/utils
```

### Dev server proxy

When local assets are not present, proxies `/assets-proxy` to `https://assets.stephenhamilton.co.uk` with path rewriting (`/assets-proxy` → `/portfolio`).

---

## Legacy API Folders

- **`api/`** — Legacy PHP/Laravel API (Grunt-managed, dormant). Was the original data source before the local JSON migration. Kept for reference.
- **`api_express/`** — Empty Express.js stub (no source files in `src/`). Never completed.
