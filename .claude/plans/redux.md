# RTK Slice Migration Plan

## Context

The Redux store was migrated from pre-RTK patterns during the 2026 upgrade. `configureStore` and `combineReducers` from RTK are in use, but the async layer still uses hand-rolled thunks (manual `REQUEST/RECEIVE/INVALIDATE` constants, plain action creators, and `shouldFetch*` guard functions). The goal is to migrate to `createSlice` + `createAsyncThunk` without touching the existing slice folders or `configureStore.ts`/`rootReducer.ts`. The existing files remain as reference and can be deprecated/deleted separately.

---

## Files to Create

```
www/src/store/
├── localdataSlice.ts   ← createSlice only, no async
├── itemsSlice.ts       ← createSlice + createAsyncThunk (fetchItemsIfNeeded)
├── itemSlice.ts        ← createSlice + createAsyncThunk (fetchItemIfNeeded) + selectItem thunk
├── categoriesSlice.ts  ← createSlice + createAsyncThunk (fetchAvailableCategories) + coordination thunks
└── store.ts            ← new configureStore, localStorage middleware, typed hooks + AppState/AppDispatch
```

## Files to Update (import paths only — no logic changes)

```
www/src/main.tsx
www/src/containers/About.tsx
www/src/containers/Categories.tsx
www/src/containers/Item.tsx
www/src/containers/Loader.tsx
www/src/containers/NavBar.tsx
```

## Files Left Untouched (as instructed)

```
www/src/store/categories/*
www/src/store/items/*
www/src/store/item/*
www/src/store/localdata/*
www/src/store/configureStore.ts
www/src/store/rootReducer.ts
```

---

## New State Shape

The new slices consolidate the scattered reducers from rootReducer:

```ts
// store.ts AppState
{
  categories: {
    selectedCategory: string          // was top-level state.selectedCategory
    selectedCategoryMetaData: { label, description }  // was top-level
    selectedYear: string              // was top-level
    filtered: boolean                 // was top-level
    available: Category[]             // was state.categories.available
    activeByYear: Record<string, Record<string, boolean>>  // was state.categories.activeByYear
    lastUpdated: number
    isFetching: boolean
    didInvalidate: boolean
  }
  items: Record<string, CategoryItemsState>   // was state.itemsByCategory
  item: {
    selectedItem: string              // was top-level state.selectedItem
    itemsByID: Record<string, SingleItemState>  // was top-level state.itemsByID
  }
  localData: {
    activeClient: Record<string, unknown>
    clients: Record<string, unknown>  // loaded from get_localdata() at init
  }
}
```

---

## Slice Implementation Details

### 1. `localdataSlice.ts`

- `createSlice` only — static data loaded once from `get_localdata()` at init
- Reducer: `setActiveClient(state, action)` replaces `SET_ACTIVE_CLIENT`
- Selectors exported: `getLocalData`, `getLocalClientData`
- No async thunks needed

### 2. `itemsSlice.ts`

- `createAsyncThunk` replaces the `fetchItems` + `shouldFetchItems` + `fetchItemsIfNeeded` pattern
- The `condition` option on the thunk handles all the guard logic:
  ```ts
  export const fetchItemsIfNeeded = createAsyncThunk(
    'items/fetchIfNeeded',
    async ({ selectedCategory }, { getState }) => { /* fetch + parseItems */ },
    {
      condition: ({ selectedCategory }, { getState }) => {
        // replaces shouldFetchItems: checks CATEGORY_ABOUT, isFetching, lastUpdated, didInvalidate
      }
    }
  )
  ```
- `parseItems` logic copied inline into the thunk body (reads `getState().localData.clients` for awards)
- Reducer: `extraReducers` handles `pending/fulfilled/rejected` replacing `REQUEST/RECEIVE/INVALIDATE`
- Plain reducer action: `invalidateCategory(state, action: PayloadAction<string>)`
- Selectors exported (same names as current): `getHasCategoryItems`, `getIsFetching`, `getItemsByCategory`, `getItemsByYear`, `getYears`, `getItems`

### 3. `itemSlice.ts`

- `createAsyncThunk` for `fetchItemIfNeeded` — `condition` handles guard logic (isFetching, lastUpdated, didInvalidate)
- `parseItem` and `parseArchiveItem` logic copied inline into thunk body (reads localData)
- Conditional `Promise.all` (with optional archive fetch) stays inside the thunk body
- `selectItem` exported as a standalone `AppThunk` (not `createAsyncThunk`) — dispatches `setSelectedItem` slice action + `fetchItemIfNeeded` thunk:
  ```ts
  export const selectItem = ({ client_id, entry_id }): AppThunk =>
    (dispatch) => {
      dispatch(itemSlice.actions.setSelectedItem(entry_id));
      dispatch(fetchItemIfNeeded({ client_id, entry_id }));
    };
  ```
- Plain reducer action: `invalidateItem`
- Selectors exported (same names): `getSelectedItem`, `getItemsByID`, `getHasItem`, `getItem`, `getItemData`

### 4. `categoriesSlice.ts`

- `createAsyncThunk` for `fetchAvailableCategories` — runs `Promise.all` of two API calls; `condition` checks `isFetching` + `shouldUpdateCategories`
- `parseCategories` logic copied inline into thunk body
- Metadata update (`updateMetaData`) is computed inside the `selectCategory` slice reducer using Immer (finds matching category in `state.available` and updates `state.selectedCategoryMetaData` inline) — no separate action needed
- `selectYear` slice reducer also recalculates `available[].is_active` inline using Immer (same logic as current `YEAR_SELECT` case)
- Three cross-slice coordination thunks exported as standalone `AppThunk` functions — these dispatch slice actions then dispatch `fetchItemsIfNeeded` from `itemsSlice`:
  ```ts
  export const selectCategory = (category: string): AppThunk =>
    (dispatch, getState) => {
      dispatch(categoriesSlice.actions.setSelectedCategory(category));
      const { selectedYear } = getState().categories;
      dispatch(fetchItemsIfNeeded({ selectedCategory: category, selectedYear }));
    };

  export const selectYear = (year: string): AppThunk =>
    (dispatch, getState) => {
      dispatch(categoriesSlice.actions.setSelectedYear(year));
      const { selectedCategory } = getState().categories;
      dispatch(fetchItemsIfNeeded({ selectedCategory, selectedYear: year }));
    };

  export const toggleFilter = (): AppThunk =>
    (dispatch, getState) => {
      dispatch(categoriesSlice.actions.toggleFilter());
      const { selectedCategory, selectedYear } = getState().categories;
      dispatch(fetchItemsIfNeeded({ selectedCategory, selectedYear }));
    };
  ```
- Selectors exported (same names): `getSelectedCategory`, `getSelectedYear`, `getFilteredState`, `getSelectedState`, `getAvailableCategories`, `getActiveByYearCategories`, `getSelectedCategoryMetaData`, `getCategoriesLastUpdated`

### 5. `store.ts`

- New `configureStore` wiring all four slice reducers:
  ```ts
  reducer: { categories, items, item, localData }
  ```
- localStorage middleware adapted for new state shape:
  ```ts
  // persists: categories (full slice), items, item (full slice)
  // localData excluded — reloaded from get_localdata() at init
  ```
- Rehydration (`reHydrateStore`) in production only — same pattern as `configureStore.ts`
- Logger middleware in dev — same as `configureStore.ts`
- Exports: `AppState`, `AppDispatch`, `AppThunk`, `useAppDispatch`, `useAppSelector`

---

## Container Import Changes

All containers get two kinds of changes:
1. `useAppDispatch`/`useAppSelector` import path: `from 'store/configureStore'` → `from 'store/store'`
2. Action/selector imports: old folder paths → new slice file paths

| Container | Old action import | New import |
|---|---|---|
| About | `store/categories/categoriesActions` | `store/categoriesSlice` |
| Categories | `store/categories/categoriesActions` | `store/categoriesSlice` |
| Item | `store/item/itemActions` | `store/itemSlice` |
| Loader | `store/items/itemsSelectors` | `store/itemsSlice` |
| NavBar | `store/categories/categoriesActions` + `store/items/itemsSelectors` | `store/categoriesSlice` + `store/itemsSlice` |

The `as unknown as { type: string }` dispatch casts in all containers are removed — RTK's `AppDispatch` type from `store.ts` includes thunk support via `redux-thunk`, so casts are no longer needed.

`main.tsx` store import changes from `store/configureStore` → `store/store`.

---

## TypeScript Typing Strategy

- `AppState` exported from `store.ts` used by selectors in all slice files
- To avoid circular dependency (slice → store → slice), selectors use a local `AppState` type alias or type-only import (`import type { AppState } from 'store/store'`)
- `AppThunk` defined in `store.ts`:
  ```ts
  export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;
  ```
- `createAsyncThunk` thunks typed with `{ state: AppState }` in the `ThunkApiConfig` generic to get proper `getState` typing

---

## localStorage Compatibility Note

The new state shape differs from what the old `configureStore.ts` persists. On first load after the switch, old localStorage data will fail gracefully — `reHydrateStore` discards unparseable or structurally mismatched state and starts fresh. No migration needed.

---

## Verification

1. Run `npm run dev` in `www/` — app loads with no console errors
2. Navigate to a category (`/web/allyears`) — items load, network tab shows one `categories/web/allyears` request
3. Navigate to a year (`/web/2018`) — year filter works, year highlighted in dropdown
4. Toggle filter ON/OFF — items re-filter without extra API calls
5. Navigate to an item — detail page loads, archive (if available) loads
6. Navigate to About — no item fetch, page renders normally
7. Reload page in production build (`npm run build:prod && npm run preview`) — state rehydrated from localStorage, no extra API calls within the 1-day cache window
8. Check Redux DevTools — action names now show RTK format (`categories/fetchAvailableCategories/pending`, etc.) instead of string constants
