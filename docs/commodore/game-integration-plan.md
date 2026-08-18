# Commodore game integration plan

## Goal

Add Stephen's playable Commodore games to the portfolio using standalone, shareable player routes.

Initial games:

- VIC-20: `Skramble` / `ScrambleVic.prg`
- Commodore 64: `Jungle Drums` / `Jungle Drums (1984)(Anirog Software)[cr FCS].T64`

The games should be reachable directly by URL, and the project detail page should open each game route in a new browser tab.

## Current branch

```text
feature/vic20-scramble-overlay
```

## Source assets

Committed source/runtime game files live in this repo under:

```text
commodore/
```

Current source files:

```text
commodore/vic20/ScrambleVic.prg
commodore/c64/jungledrums/jungledrums.T64
commodore/c64/jungledrums/Jungle Drums (1984)(Anirog Software)[cr FCS].T64
commodore/c64/jungledrums/VERSION.NFO
```

These files should be committed. Treat this repo's `commodore/` folder as the source used by the portfolio build.

External preservation/reference workspaces:

```text
$HOME/projects/20.personal/commodore
$HOME/Documents/02.misc/gaming/my-commodore-files/c64/jungledrums
```

Use those external folders only as reference/source-of-truth archives. Do not make the build depend on absolute local paths.

## Existing portfolio context

- Frontend app is in `www/`.
- Stack: Vite, React 18, TypeScript, React Router v7, Radix UI Themes.
- Main route file: `www/src/routes/mainRoutes.tsx`.
- Project detail route already exists: `/:category_id/:client_id/:entry_id`.
- The Anirog games entry is data-driven from `www/src/assets/json/portfolio.json`:
  - `client_id`: `anirog`
  - `entry_id`: `variousgames`
  - URL: `/game/anirog/variousgames`

## Recommended architecture

Use a first-class React route that hosts a generic iframe-based Commodore player:

```text
React portfolio page
  -> new browser tab: /play/commodore/skramble
     -> React player route
        -> iframe: /commodore/player.html?game=skramble
           -> static player page loads EmulatorJS using per-game config JSON
```

Reasons:

- Keeps EmulatorJS globals out of the main React app.
- Gives every game a direct, shareable portfolio URL.
- Closing the browser tab reliably stops the emulator.
- Avoids React StrictMode duplicate effect/script-loading issues in development.
- Supports VIC-20 and C64 games with the same React component.
- Keeps the portfolio UI data-driven.

## Portfolio data integration

The portfolio is data-driven from:

```text
www/src/assets/json/portfolio.json
```

This JSON was converted from the previous API/database layer and should remain the source of site metadata.

Do not add separate top-level entries unless these games should appear as separate portfolio items. For the first implementation, extend the existing Anirog entry:

- `client_id`: `anirog`
- `entry_id`: `variousgames`
- URL: `/game/anirog/variousgames`

Use a `playables` array rather than a single `playable` field, because the same portfolio item can expose multiple games:

```json
"playables": [
  {
    "id": "skramble",
    "type": "commodore",
    "title": "Play Skramble",
    "routeUrl": "/play/commodore/skramble",
    "playerUrl": "/commodore/player.html?game=skramble",
    "machine": "VIC-20 +16K",
    "memory": "16kB",
    "emulatorCore": "vice_xvic",
    "controls": [
      "Arrow keys - move",
      "X - start / fire"
    ]
  },
  {
    "id": "jungledrums",
    "type": "commodore",
    "title": "Play Jungle Drums",
    "routeUrl": "/play/commodore/jungledrums",
    "playerUrl": "/commodore/player.html?game=jungledrums",
    "machine": "Commodore 64",
    "emulatorCore": "vice_x64",
    "controls": [
      "A - start",
      "Left / Right - move",
      "Up - jump",
      "Down - crouch",
      "X + direction - fire"
    ]
  }
]
```

Important implementation note: `www/src/services/portfolio.ts` currently builds a whitelisted item object in `fetchItemService`. Add `playables: entry.playables || []` there, otherwise the React item page will not receive this data.

## Emulator choice

Use EmulatorJS with VICE cores:

- `@emulatorjs/emulatorjs`
- `@emulatorjs/core-vice_xvic` for VIC-20
- `@emulatorjs/core-vice_x64` for C64

Do not use the CDN for the portfolio integration. The EmulatorJS runtime and required cores should be copied from `node_modules` into Vite `public/` assets at build time.

Use `vice_x64` first for C64 and set `EJS_core` to `vice_x64`. EmulatorJS maps `c64` to `vice_x64sc` by default, so using `c64` would require copying `@emulatorjs/core-vice_x64sc`. If Jungle Drums has compatibility issues, test `@emulatorjs/core-vice_x64sc` as an alternative.

## Known working VIC-20 configuration

A static test has already confirmed this works:

- EmulatorJS core: `vic20` / `vice_xvic`
- Program: `ScrambleVic.prg`
- VIC-20 RAM expansion: `16kB`
- Controls:
  - Arrow keys - move
  - `X` - start/fire

Required EmulatorJS options:

```js
EJS_core = 'vic20';
EJS_defaultOptions = {
  vice_vic20_memory_expansions: '16kB',
  vice_vic20_model: 'VIC20 PAL auto',
  vice_joyport_type: '1',
  vice_reset: 'autostart',
  vice_autostart: 'enabled',
};
```

## C64 configuration to verify

Create a static C64 player test for Jungle Drums before wiring it into the portfolio UI.

Expected starting point:

```js
EJS_core = 'vice_x64';
EJS_defaultOptions = {
  vice_reset: 'autostart',
  vice_autostart: 'enabled',
};
```

Open questions for Jungle Drums:

- Confirm the preferred runtime file: start with `Jungle Drums (1984)(Anirog Software)[cr FCS].T64` because `jungledrums.T64` is a TLG cracked/trainer release with an intro.
- Confirm keyboard/joystick controls. Current browser test: `A` starts the game, left/right move, up jumps, down crouches, and `X` fires while a direction key is held. `V` opens the EmulatorJS/VICE virtual keyboard and is not a game control.
- Confirm whether `vice_x64` is sufficient or `vice_x64sc` is needed.
- Confirm whether autostart works directly from T64 or whether a PRG extraction is preferable.

## Runtime asset layout

Source files are committed under repo root `commodore/`. The build copy script should generate Vite public assets under `www/public/`:

```text
www/public/commodore/player.html
www/public/commodore/games/skramble/config.json
www/public/commodore/games/skramble/ScrambleVic.prg
www/public/commodore/games/jungledrums/config.json
www/public/commodore/games/jungledrums/Jungle Drums (1984)(Anirog Software)[cr FCS].T64
www/public/emulatorjs/data/loader.js
www/public/emulatorjs/data/src/...
www/public/emulatorjs/data/localization/...
www/public/emulatorjs/data/compression/...
www/public/emulatorjs/data/cores/vice_xvic-wasm.data
www/public/emulatorjs/data/cores/vice_xvic-legacy-wasm.data
www/public/emulatorjs/data/cores/vice_xvic-thread-wasm.data
www/public/emulatorjs/data/cores/vice_xvic-thread-legacy-wasm.data
www/public/emulatorjs/data/cores/vice_x64-wasm.data
www/public/emulatorjs/data/cores/vice_x64-legacy-wasm.data
www/public/emulatorjs/data/cores/vice_x64-thread-wasm.data
www/public/emulatorjs/data/cores/vice_x64-thread-legacy-wasm.data
www/public/emulatorjs/data/cores/reports/vice_xvic.json
www/public/emulatorjs/data/cores/reports/vice_x64.json
```

Only required cores should be copied. Do not copy all EmulatorJS cores.

Generated public assets should not be committed if they are reproducible from `node_modules` plus the committed `commodore/` source folder.

Add gitignore rules if needed:

```text
www/public/emulatorjs/data/
www/public/commodore/player.html
www/public/commodore/games/
```

If `player.html` is hand-maintained rather than generated, commit it and do not ignore it.

## Per-game config

Use per-game config JSON loaded by the static player.

`www/public/commodore/games/skramble/config.json`:

```json
{
  "name": "Skramble",
  "core": "vic20",
  "emulatorCore": "vice_xvic",
  "gameUrl": "/commodore/games/skramble/ScrambleVic.prg",
  "defaultOptions": {
    "vice_vic20_memory_expansions": "16kB",
    "vice_vic20_model": "VIC20 PAL auto",
    "vice_joyport_type": "1",
    "vice_reset": "autostart",
    "vice_autostart": "enabled"
  }
}
```

`www/public/commodore/games/jungledrums/config.json`:

```json
{
  "name": "Jungle Drums",
  "core": "vice_x64",
  "emulatorCore": "vice_x64",
  "gameUrl": "/commodore/games/jungledrums/Jungle Drums (1984)(Anirog Software)[cr FCS].T64",
  "defaultOptions": {
    "vice_reset": "autostart",
    "vice_autostart": "enabled"
  }
}
```

## Static player page

Create or generate:

```text
www/public/commodore/player.html
```

Responsibilities:

- Read the `game` query parameter.
- Validate it with a strict allow-list or slug regex, e.g. `/^[a-z0-9-]+$/`.
- Fetch `/commodore/games/<game>/config.json`.
- Set required `window.EJS_*` globals from config.
- Load `/emulatorjs/data/loader.js` after globals are set.
- Show a clear error message if config or emulator assets fail to load.

Core setup:

```html
<div id="game"></div>
<script>
  async function main() {
    const params = new URLSearchParams(window.location.search);
    const game = params.get('game') || '';
    if (!/^[a-z0-9-]+$/.test(game)) throw new Error('Invalid game');

    const response = await fetch(`/commodore/games/${game}/config.json`);
    if (!response.ok) throw new Error(`Game config not found: ${game}`);
    const config = await response.json();

    window.EJS_player = '#game';
    window.EJS_core = config.core;
    window.EJS_gameName = config.name;
    window.EJS_gameUrl = config.gameUrl;
    window.EJS_pathtodata = '/emulatorjs/data/';
    window.EJS_startOnLoaded = true;
    window.EJS_threads = false;
    window.EJS_DEBUG_XX = true;
    window.EJS_disableAutoLang = false;
    window.EJS_defaultOptions = config.defaultOptions || {};

    const script = document.createElement('script');
    script.src = '/emulatorjs/data/loader.js';
    document.body.appendChild(script);
  }

  main().catch((error) => {
    document.body.textContent = error.message;
  });
</script>
```

## Copy/setup script

Add a script under `www/scripts/`, for example:

```text
www/scripts/copy-emulatorjs-assets.mjs
```

Responsibilities:

1. Delete/recreate `www/public/emulatorjs/data`.
2. Copy `node_modules/@emulatorjs/emulatorjs/data` to `www/public/emulatorjs/data`.
3. Copy `node_modules/@emulatorjs/core-vice_xvic/*` into `www/public/emulatorjs/data/cores`.
4. Copy `node_modules/@emulatorjs/core-vice_x64/*` into `www/public/emulatorjs/data/cores`.
5. Delete any copied cores that are not needed, if the base EmulatorJS package ever includes extras.
6. Copy committed source game files from repo root `commodore/` into `www/public/commodore/games/...`.
7. Write or copy per-game `config.json` files.
8. Ensure `www/public/commodore/player.html` exists, either by copying a committed source file or writing it from the script.

Package dependencies:

```sh
npm install @emulatorjs/emulatorjs @emulatorjs/core-vice_xvic @emulatorjs/core-vice_x64
```

Package scripts:

```json
{
  "emulatorjs:copy": "node scripts/copy-emulatorjs-assets.mjs",
  "build:dev": "npm run emulatorjs:copy && tsc && vite build --mode development",
  "build:stage": "npm run emulatorjs:copy && tsc && vite build --mode staging",
  "build:prod": "npm run emulatorjs:copy && tsc && vite build"
}
```

Avoid relying on `postinstall`. It can be used as a convenience, but production builds should explicitly run `emulatorjs:copy`.

Deploy note: `www/scripts/deploy.sh` calls `npm run build:prod` / `npm run build:stage`, then builds a Docker image from `dist/` only. Therefore EmulatorJS and Commodore runtime assets must be copied into `www/public/` before Vite builds `dist/`, otherwise they will not reach the NAS container.

## React route

Add a direct player route:

```text
/play/commodore/:game_id
```

Modify:

```text
www/src/routes/mainRoutes.tsx
```

Route responsibilities:

- Render a standalone Commodore game player page.
- Validate `game_id` against known `playables` from `portfolio.json`, or against a strict allow-list derived from that data.
- Show a useful not-found/error state for unsupported game IDs.
- Render the game title, controls, and technical details.
- Embed `/commodore/player.html?game=<game_id>` in an iframe.
- Make the page usable when loaded directly or refreshed.

Suggested route component:

```text
www/src/containers/CommodorePlayer.tsx
```

The route component can find matching playable metadata from the same data source used by the portfolio item page. Keep the EmulatorJS runtime isolated in the static iframe; do not load EmulatorJS scripts directly into React.

## React components

### `PlayableItemLink`

Create:

```text
www/src/components/item/PlayableItemLink.tsx
```

Responsibilities:

- Accept a single `playable` object from `portfolio.json`.
- Render a Radix `Button` as an anchor using `playable.title`, e.g. `Play Skramble`.
- Use `playable.routeUrl` as the link target.
- Open in a new browser tab with `target="_blank"` and `rel="noreferrer"`.
- Do not embed the emulator on the portfolio item page.

### `PlayableItemsPanel`

Create a small wrapper component if useful:

```text
www/src/components/item/PlayableItemsPanel.tsx
```

Responsibilities:

- Accept `playables: PlayableItem[]`.
- Filter to supported `type === "commodore"` entries.
- Render one `PlayableItemLink` per game.
- Render nothing when no supported playables are present.

## Integration point

Modify:

```text
www/src/containers/Item.tsx
```

Render playable links whenever an item has supported `playables` and the page is not in archive mode:

```tsx
{!is_archive && Array.isArray(item.playables) && (
  <PlayableItemsPanel playables={item.playables} />
)}
```

Preferred placement: after `ItemOverview` and before awards/media list. Since existing external links are generated from data, the first implementation can place a standalone play panel directly below the overview card. The buttons should open the standalone game route in a new browser tab.

## Styling

Use existing CSS structure:

- Add styles to `www/src/css/ui.css`, or create `www/src/css/commodore.css` and import it from `www/src/css/index.css`.

Design direction:

- Keep the main page consistent with the current portfolio styling.
- The standalone player route can have a darker retro treatment.
- Emulator iframe should be centred and responsive.
- Recommended iframe dimensions: 768 x 576 or 724 x 576 depending on EmulatorJS output.
- Avoid inline emulator on the main project page.

## TypeScript types

Because the React app no longer sets EmulatorJS globals directly, it only needs normal TypeScript types for `playables`.

Example:

```ts
export interface PlayableItem {
  id: string;
  type: 'commodore';
  title: string;
  routeUrl: string;
  playerUrl: string;
  machine?: string;
  memory?: string;
  emulatorCore?: string;
  controls?: string[];
}
```

If `player.html` is kept as plain static HTML, no React `Window` global declarations are needed. The React route only embeds the static player iframe.

## Deploy / NAS considerations

The production site is hosted on the local NAS via Docker:

1. Vite builds to `www/dist/`.
2. Dockerfile copies only `dist/` and `nginx.conf` into an `nginx:alpine` image.
3. `deploy.sh` saves the image and loads it on the NAS over SSH.
4. NAS compose recreates the container.

Implications for this integration:

- Runtime emulator/game assets must exist in `www/public/` before `vite build`, so they are copied into `dist/`.
- No separate NAS asset sync is needed for the PRG/T64/core if they are bundled into `dist/`.
- `.dockerignore` is fine because Docker only needs the already-built `dist/`.
- The direct React route `/play/commodore/:game_id` is handled by the existing SPA fallback and should work on refresh.
- `nginx.conf` currently has a specific immutable cache rule only for `/assets/`. EmulatorJS assets under `/emulatorjs/` and game files under `/commodore/` will fall through to the SPA route and get `Cache-Control: no-cache` while still being served correctly if the file exists.
- Add explicit nginx locations for `/emulatorjs/` and `/commodore/` with `try_files $uri =404` and suitable cache headers. This avoids large core files being revalidated too often and prevents SPA fallback for missing emulator files.
- Keep `EJS_threads` disabled unless Synology reverse proxy/Cloudflare headers are configured for COOP/COEP. Threads require `Cross-Origin-Opener-Policy` and `Cross-Origin-Embedder-Policy`; the current setup does not include those headers.

Suggested nginx additions:

```nginx
location /emulatorjs/ {
    add_header Cache-Control "public, max-age=31536000, immutable" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    try_files $uri =404;
}

location = /commodore/player.html {
    add_header Cache-Control "no-cache" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    try_files $uri =404;
}

location ~ ^/commodore/games/[^/]+/config\.json$ {
    add_header Cache-Control "no-cache" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    try_files $uri =404;
}

location /commodore/ {
    add_header Cache-Control "public, max-age=86400" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    try_files $uri =404;
}
```

## Verification

Run from `www/`:

```sh
npm install
npm run emulatorjs:copy
npm run build:dev
npm run dev
```

Manual browser checks:

1. Open `http://localhost:5173/game/anirog/variousgames`.
2. Confirm play buttons appear based on the `playables` field in `portfolio.json`.
3. Click `Play Skramble`.
4. Confirm `/play/commodore/skramble` opens in a new browser tab.
5. Confirm direct refresh on `/play/commodore/skramble` keeps working.
6. Confirm the VIC-20 EmulatorJS iframe loads.
7. Confirm the VIC-20 screen appears.
8. Press `X` to start/fire.
9. Use arrow keys to move.
10. Return to the original portfolio tab and confirm the page remains usable.
11. Click `Play Jungle Drums`.
12. Confirm `/play/commodore/jungledrums` opens in a new browser tab.
13. Confirm C64 EmulatorJS iframe loads.
14. Confirm Jungle Drums starts or reaches a valid load/start screen.
15. Confirm C64 controls.
16. Confirm direct URL access works for both game routes.

Production-style check:

```sh
npm run deploy:local
```

Then confirm both games work from the local Docker/nginx build.

## Risks / open questions

- EmulatorJS package/core licensing must be confirmed before publishing.
- Need to confirm Jungle Drums preferred file and controls.
- Need to confirm whether C64 `vice_x64` is sufficient or `vice_x64sc` is needed.
- Need to decide whether `player.html` is committed or generated by the copy script.
- Need to decide whether game-route metadata is derived from `portfolio.json` only, or from a small dedicated playable registry shared by the item page and direct player route.
- Generated EmulatorJS assets should stay reproducible and should not be manually edited in `www/public/`.
