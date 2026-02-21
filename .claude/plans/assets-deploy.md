# Local Assets Workflow Plan

## Context

Portfolio media images (96MB, ~1,776 files) currently live only on the NAS at `/Volumes/web/assets.stephenhamilton.co.uk/portfolio/images/`. During local development, Vite proxies `/assets-proxy` requests to the live origin server, which means:
- Requires network access to the NAS
- Adds latency to every image request in dev
- Can't test new/updated images locally before deploying them

This plan adds a local copy of the portfolio images directory, configures Vite to serve them directly in dev, and adds an rsync command to deploy assets to the NAS.

---

## What Changes

### 1. Seed local assets directory

One-time rsync from NAS to local. Only the `images/` directory (96MB) — skip `media/` (1.3GB legacy Flash/video), `archived/`, `css/`, `js/`, etc.

```bash
mkdir -p assets/portfolio
rsync -avz /Volumes/web/assets.stephenhamilton.co.uk/portfolio/images/ assets/portfolio/images/
```

Target structure:
```
portfolio/
├── www/                  # Frontend app
├── assets/               # Local portfolio assets (git-ignored)
│   └── portfolio/
│       └── images/       # 96MB — thumbnails, screengrabs, awards
└── ...
```

### 2. Git-ignore the assets directory

**Modified file:** `.gitignore` (root)

Add `/assets/` to prevent the 96MB images directory from being committed.

### 3. Configure Vite to serve local assets in dev

**Modified file:** `www/vite.config.ts`

Replace the proxy with a static file server that serves from the local `assets/` directory. Vite's `server.fs.allow` and a custom middleware or `publicDir` approach.

The cleanest way: add a second static directory via Vite plugin or use `server.proxy` to rewrite to a local path. Since `VITE_ASSETS_BASE=/assets-proxy` in dev, we can:

- Remove the remote proxy (`/assets-proxy` → `https://assets.stephenhamilton.co.uk/portfolio`)
- Add a Vite plugin that serves `/assets-proxy/*` from `../assets/portfolio/*` on disk

This way `VITE_ASSETS_BASE=/assets-proxy` stays the same in `.env.development` — no env changes needed. Components request `/assets-proxy/images/...` and Vite serves them from the local `assets/portfolio/images/...` directory.

**Fallback:** If the local assets directory doesn't exist, fall back to the remote proxy so the app still works without a local copy (e.g. fresh clone).

### 4. Add asset deploy command to deploy.sh

**Modified file:** `www/deploy.sh`

New subcommand: `./deploy.sh assets`

```bash
# Syncs local assets → NAS origin (assets.stephenhamilton.co.uk)
# Uses SSH + tar (same approach as docker image transfer, since rsync/scp aren't available)
```

Since rsync over SSH doesn't work with the `stephen` user (SFTP subsystem disabled), we have two options:
- **Option A:** Use the SMB mount directly: `rsync -avz assets/portfolio/images/ /Volumes/web/assets.stephenhamilton.co.uk/portfolio/images/`
- **Option B:** Tar + SSH pipe (like the docker image transfer)

The SMB mount is simpler and already available. The script will check that `/Volumes/web/` is mounted before syncing.

### 5. Add npm script

**Modified file:** `www/package.json`

```json
"deploy:assets": "./deploy.sh assets"
```

### 6. Add asset pull command

**Modified file:** `www/deploy.sh`

New subcommand: `./deploy.sh assets:pull`

Pulls from NAS → local (via SMB mount). Useful for syncing after someone else updates assets, or for initial setup.

---

## Files to Modify/Create

| File | Action | Description |
|---|---|---|
| `.gitignore` | Modify | Add `/assets/` |
| `www/vite.config.ts` | Modify | Serve local assets in dev, fall back to remote proxy |
| `www/deploy.sh` | Modify | Add `assets` and `assets:pull` subcommands |
| `www/package.json` | Modify | Add `deploy:assets` npm script |

---

## Verification

1. Run `./deploy.sh assets:pull` to seed local assets from NAS
2. Run `npm run dev` — images should load from local disk (check Network tab — no proxy to external origin)
3. Add/modify a test image locally, verify it shows in the dev server
4. Run `./deploy.sh assets` to sync back to NAS, verify it arrives at `/Volumes/web/assets.stephenhamilton.co.uk/portfolio/images/`
5. If local `assets/` directory is deleted, `npm run dev` should fall back to the remote proxy
