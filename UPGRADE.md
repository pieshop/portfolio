## Frontend Modernization
- React 18 with createRoot and StrictMode entrypoint in `www/src/main.tsx:37`.
- React Router v7 usage (`Routes`, `Route`, `Navigate`) in `www/src/routes/mainRoutes.tsx:13`.
- Redux Toolkit store setup with typed hooks in `www/src/store/configureStore.ts:1`.

## Build + Tooling
- Vite-based build pipeline and dev server via `www/vite.config.ts:1` and `www/package.json:8`.
- TypeScript-first setup with project references in `www/tsconfig.json:1` and `www/tsconfig.app.json:1`.
- ESLint v9 + Prettier v3 configured in `www/package.json:13`.

## UI + Animation
- Radix UI Themes integrated (`@radix-ui/themes`) in `www/src/main.tsx:5`.
- framer-motion added as animation layer (`www/package.json:20`).

## API + Data Fetching
- Native fetch services replace older request libraries in `www/src/services/portfolio.ts:9`.

## Platform Targets
- Node 22 runtime requirement declared in `www/package.json:49`.
