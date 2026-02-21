# Build Pipeline Plan — Portfolio Site

## Context

The portfolio site (`www.stephenhamilton.co.uk`) is a Vite-built React SPA currently deployed via a custom Node.js rsync script (`www/tools/sync.js`) to a Synology DS-918 NAS. The deployment tools reference missing directories (`buildtools/`) and have commented-out features — they're fragile and due for replacement.

**Current state of production (`/Volumes/web/www.stephenhamilton.co.uk/`):**
- The old Webpack build is still live (separate `css/`, `js/`, `fonts/` dirs, `.htaccess`, `sw.js`, PHP files)
- Served by Apache via Synology Web Station
- The upgraded Vite build (in `www/dist/`) has **not yet been deployed**

**Other sites on this NAS:** The `/Volumes/web/` mount shows multiple sites (api.stephenhamilton.co.uk, test.stephenhamilton.co.uk, sarah-brady, etc.) all served by the same Apache/Web Station. The Synology web volume is mounted on the Mac at `/Volumes/web/` via SMB.

---

## Asset Architecture (Current & Proposed)

Understanding how assets work is critical to this plan. There are **three distinct categories of assets**, each handled differently:

### 1. Build Artifacts (JS/CSS bundles, fonts)

| | Old (Webpack) | New (Vite) |
|---|---|---|
| Output structure | `dist/js/`, `dist/css/`, `dist/fonts/` | `dist/assets/` (all in one dir) |
| Filenames | `main.0c4cd23b.css`, `vendor.2902a9c4.css` | `index-BDKRFRq4.css`, `index-Tcn0QtRK.js` |
| Served from | BunnyCDN (`cdn.stephenhamilton.co.uk/portfolio/js/...`) | **Same origin as HTML** (relative `/assets/...` paths) |
| How referenced | Webpack `publicPath` set to CDN URL | Vite default — relative paths in `index.html` |

**What this means:** The new Vite build's JS/CSS bundles are self-contained in `dist/` and referenced via relative paths. They'll be served directly by the Docker nginx container — **no CDN needed for bundles**. Hashed filenames provide cache-busting automatically.

### 2. Portfolio Media (images, screengrabs, thumbnails, awards)

These are the actual portfolio content images — thousands of files at:
```
/Volumes/web/assets.stephenhamilton.co.uk/portfolio/images/
├── portfolio-entries/{client}/{entry}/screengrabs/   # Full-size project images
├── portfolio-entries/{client}/{entry}/thumb/          # Thumbnails
├── awards/                                           # Award logos
└── ...                                               # Other site images
```

- **Origin server:** `assets.stephenhamilton.co.uk` (served by Web Station on the NAS)
- **CDN:** BunnyCDN pull zone mirrors from the origin → served at `cdn.stephenhamilton.co.uk/portfolio/images/...`
- **Referenced in code via:** `VITE_ASSETS_BASE` (`get_image_path()`, `get_thumb_path()`, `get_awards_path()`)
- **These don't change per-deploy** — they're media files added when new portfolio entries are created

**What this means:** No change needed. BunnyCDN continues to serve these from the existing origin. The `VITE_ASSETS_BASE` env var points to the CDN origin, and BunnyCDN handles caching/distribution.

### 3. Archive JSON (per-project data files)

**Current (messy):** 30+ client directories dumped at the root of `dist/`:
```
dist/disney/capamerads.json
dist/sky/movies.json
dist/intel/ultrabook.json
...
```

**Proposed:** Nest under `dist/assets/json/archive/` for a clean structure:
```
dist/assets/json/archive/disney/capamerads.json
dist/assets/json/archive/sky/movies.json
dist/assets/json/archive/intel/ultrabook.json
...
```

- **Source:** Vite copies `www/public/` contents into `dist/` verbatim at build time
- **Fix:** Restructure `www/public/` to nest client dirs under `assets/json/archive/`
- **Referenced via:** `VITE_DATA_BASE` → `get_archive_path()` in `AppConstants.ts`
- **Env change:** `VITE_DATA_BASE=` → `VITE_DATA_BASE=/assets/json/archive` in all `.env.*` files
- **No code changes** — `get_archive_path()` already prepends `BASE_DATA_URL`
- **Served from:** Same origin as HTML (Docker nginx container)

---

## CDN Strategy

### What stays on BunnyCDN

Portfolio media images only. The pull zone setup remains unchanged:
- **Origin:** `assets.stephenhamilton.co.uk` (Web Station on NAS, existing setup)
- **CDN hostname:** `cdn.stephenhamilton.co.uk`
- **No deployment action needed** — BunnyCDN pulls from origin on first request

### What moves off BunnyCDN

Build artifacts (JS/CSS/fonts). The old Webpack build rsynced these to the CDN origin and referenced them via CDN URLs. The new Vite build serves them directly from the same host as the HTML — no CDN hop needed.

### When CDN cache purging is needed

Only when portfolio media images are **updated** (not added). New images get new URLs and cache naturally. Updated images (same filename, new content) require a BunnyCDN purge.

**BunnyCDN purge API:**
```bash
curl -X POST "https://api.bunny.net/purge?url=https://cdn.stephenhamilton.co.uk/portfolio/images/portfolio-entries/{client}/{entry}/thumb/thumb.jpg" \
  -H "AccessKey: $BUNNY_API_KEY"
```

A utility script (`purge-cdn.sh`) will be provided for this — used ad-hoc, not part of the regular deploy flow.

### Production `.env` update

Currently `VITE_ASSETS_BASE` points to the origin (`https://assets.stephenhamilton.co.uk/portfolio`). This should be updated to use the CDN hostname for better performance:

```diff
- VITE_ASSETS_BASE=https://assets.stephenhamilton.co.uk/portfolio
+ VITE_ASSETS_BASE=https://cdn.stephenhamilton.co.uk/portfolio
```

This ensures portfolio images are loaded via BunnyCDN (with edge caching) rather than hitting the origin directly.

---

## Recommended Approach: Docker Image with nginx

### Why Docker over continuing with rsync?

| | rsync (current) | Docker (proposed) |
|---|---|---|
| Reproducibility | Depends on NAS web server config | Self-contained — nginx config travels with the image |
| Rollback | Manual (no versioning) | `docker run` a previous tag |
| Server config | Managed separately on NAS (Apache) | nginx config is in the repo, version-controlled |
| Port/routing | Tied to Apache/Web Station | Isolated container, any port |
| SSL | Managed on NAS | Can use Synology's reverse proxy |

### Architecture

```
Local Mac                           Synology DS-918
──────────                          ───────────────

npm run build:prod
     │
docker build → image
     │
docker save | ssh ─────────────────→ docker load
                                         │
                                    docker compose up -d
                                         │
                                    ┌────────────────────┐
                                    │  nginx container   │
                                    │  :8080             │
                                    │  serves:           │
                                    │  - index.html      │
                                    │  - /assets/* (JS,  │
                                    │    CSS, fonts)     │
                                    │  - /assets/json/   │
                                    │    archive/* (JSON)│
                                    └────────────────────┘
                                         │
                                    Synology Reverse Proxy
                                    www.stephenhamilton.co.uk → :8080

                                    ┌────────────────────┐
                                    │  Web Station       │
                                    │  (Apache)          │ ← unchanged
                                    │  serves:           │
                                    │  - assets.stephen  │
                                    │    hamilton.co.uk   │
                                    │    (CDN origin)    │
                                    │  - other sites     │
                                    └────────────────────┘
                                         ↑
                                    BunnyCDN pulls from
                                    assets.stephenhamilton.co.uk
                                         │
                                    cdn.stephenhamilton.co.uk
                                    (portfolio images only)
```

### Why `docker save/ssh` instead of a registry?

For a personal site with local builds, pushing to Docker Hub or GHCR adds unnecessary complexity and a registry dependency. `docker save | ssh docker load` transfers the image directly — simple, no accounts needed, and the DS-918 has plenty of bandwidth over LAN.

---

## Implementation Steps

### 1. Restructure archive JSON in `www/public/`

Move all client directories into a nested structure:

```
www/public/                              www/public/
├── disney/capamerads.json        →      └── assets/json/archive/
├── sky/movies.json                          ├── disney/capamerads.json
├── intel/ultrabook.json                     ├── sky/movies.json
└── ... (30+ client dirs)                    ├── intel/ultrabook.json
                                             └── ...
```

Update `VITE_DATA_BASE` in all `.env.*` files:
```diff
- VITE_DATA_BASE=
+ VITE_DATA_BASE=/assets/json/archive
```

No changes needed to `AppConstants.ts` — `get_archive_path()` already prepends `BASE_DATA_URL`.

### 2. Create nginx configuration

**New file:** `www/nginx.conf`

A minimal nginx config for serving the SPA:
- Serve static files from `/usr/share/nginx/html`
- `try_files $uri $uri/ /index.html` for client-side routing (React Router)
- Gzip compression for JS/CSS/HTML/JSON
- Cache headers: `/assets/*` → `Cache-Control: public, max-age=31536000, immutable` (hashed filenames)
- Cache headers: `index.html` → `Cache-Control: no-cache` (always revalidate)
- Security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy)

### 3. Create Dockerfile

**New file:** `www/Dockerfile`

Multi-stage is unnecessary since we build locally. Simple single-stage:

```dockerfile
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/ /usr/share/nginx/html/
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -q --spider http://localhost/ || exit 1
EXPOSE 80
```

- Uses `nginx:alpine` (< 30MB)
- Copies the pre-built `dist/` output (HTML, JS/CSS bundles, archive JSON)
- No Node.js in the image — purely a static file server
- Healthcheck lets Docker (and Synology Container Manager) report container status

### 4. Create docker-compose files

**New file:** `www/docker-compose.yml` (production — runs on NAS)

```yaml
services:
  portfolio:
    image: portfolio:latest
    container_name: portfolio-www
    restart: unless-stopped
    ports:
      - "8080:80"
```

**New file:** `www/docker-compose.stage.yml` (staging — runs on NAS)

```yaml
services:
  portfolio:
    image: portfolio:stage
    container_name: portfolio-stage
    ports:
      - "8081:80"
```

**New file:** `www/docker-compose.dev.yml` (local testing — runs on Mac)

```yaml
services:
  portfolio:
    build: .
    container_name: portfolio-dev
    ports:
      - "8080:80"
```

This compose file uses `build: .` rather than a pre-built image, so `docker compose up --build` will build and run in one command — production-identical nginx serving locally.

### 5. Create deploy script

**New file:** `www/deploy.sh`

A single shell script replacing the Node.js rsync tooling, with subcommands:

```bash
#!/bin/bash
# Usage:
#   ./deploy.sh build [prod|stage]  — Build Vite app + Docker image (no deploy)
#   ./deploy.sh local               — Build prod + run locally in Docker on :8080
#   ./deploy.sh push [live|stage]   — Transfer image to NAS + restart container
#   ./deploy.sh live                — Shorthand: build prod + push live
#   ./deploy.sh stage               — Shorthand: build stage + push stage

# Image tagging:
#   Always tags with date (portfolio:2026-02-21) for rollback history
#   Plus portfolio:latest (live) or portfolio:stage (staging)
```

Subcommand details:

| Command | What it does |
|---|---|
| `build prod` | `npm run build:prod` → `docker build -t portfolio:latest -t portfolio:$(date +%Y-%m-%d)` |
| `build stage` | `npm run build:stage` → `docker build -t portfolio:stage` |
| `local` | Runs `build prod`, then `docker compose -f docker-compose.dev.yml up --build` |
| `push live` | `docker save portfolio:latest \| ssh ds918_stephen docker load` → restart container |
| `push stage` | `docker save portfolio:stage \| ssh ds918_stephen docker load` → restart container |
| `live` | `build prod` + `push live` (full deploy shorthand) |
| `stage` | `build stage` + `push stage` (full deploy shorthand) |

This split lets you **build once, test locally, then push the same image** without rebuilding.

### 6. Create CDN purge utility

**New file:** `www/purge-cdn.sh`

Ad-hoc script for purging BunnyCDN cache when portfolio images are updated:

```bash
#!/bin/bash
# Usage: ./purge-cdn.sh <path>
# Example: ./purge-cdn.sh images/portfolio-entries/disney/capamerads/thumb/thumb.jpg
# Example: ./purge-cdn.sh images/awards/fwa.png
#
# Requires BUNNY_API_KEY environment variable (or reads from .env.local)
#
# For purging all cached content under a directory:
# ./purge-cdn.sh "images/portfolio-entries/disney/*"
```

This is **not** part of the regular deploy pipeline — used only when media files on the CDN origin are replaced with new content at the same URL.

### 7. Add npm scripts

**Modified file:** `www/package.json`

Add convenience scripts:
```json
{
  "scripts": {
    "deploy:live": "./deploy.sh live",
    "deploy:stage": "./deploy.sh stage",
    "deploy:local": "./deploy.sh local",
    "docker:build": "./deploy.sh build prod",
    "docker:push": "./deploy.sh push live"
  }
}
```

All npm scripts delegate to `deploy.sh` — single source of truth for all build/deploy logic.

### 8. Update environment files

**Modified file:** `www/.env.production`
```diff
- VITE_ASSETS_BASE=https://assets.stephenhamilton.co.uk/portfolio
+ VITE_ASSETS_BASE=https://cdn.stephenhamilton.co.uk/portfolio
- VITE_DATA_BASE=
+ VITE_DATA_BASE=/assets/json/archive
```

**Modified file:** `www/.env.staging`
```diff
- VITE_DATA_BASE=
+ VITE_DATA_BASE=/assets/json/archive
```

**Modified file:** `www/.env.development`
```diff
- VITE_DATA_BASE=
+ VITE_DATA_BASE=/assets/json/archive
```

### 9. Create .dockerignore

**New file:** `www/.dockerignore`

Exclude everything except `dist/` and `nginx.conf` from the Docker build context:

```
*
!dist/
!nginx.conf
```

### 10. Synology setup (manual, one-time)

**Docker setup:**
- Create `/volume1/docker/portfolio/` on the NAS
- Copy `docker-compose.yml` (and stage override) to the NAS
- Can be done via the SMB mount or SSH

**Web Station → Reverse Proxy migration for this site only:**
- Currently `www.stephenhamilton.co.uk` is served by Web Station (Apache) from `/volume1/web/www.stephenhamilton.co.uk/`
- **Before switching:** Rename the old site directory as a backup (e.g. `www.stephenhamilton.co.uk.bak`)
- Remove the `www.stephenhamilton.co.uk` virtual host from Web Station
- Add a **Reverse Proxy** rule in DSM (Control Panel → Login Portal → Advanced → Reverse Proxy):
    - `www.stephenhamilton.co.uk:443` → `localhost:8080` (HTTPS → HTTP)
    - `stage.stephenhamilton.co.uk:443` → `localhost:8081`
- **`assets.stephenhamilton.co.uk` stays on Web Station** — it's the BunnyCDN origin and must remain accessible
- Other sites (api.stephenhamilton.co.uk, sarah-brady, etc.) remain on Web Station — unaffected
- SSL via Synology's Let's Encrypt integration (likely already configured for this domain)

---

## Files to Create/Modify

| File | Action | Description |
|---|---|---|
| `www/public/assets/json/archive/` | Move | Restructure archive JSON from `public/{client}/` to nested path |
| `www/Dockerfile` | Create | nginx:alpine serving dist/, with healthcheck |
| `www/.dockerignore` | Create | Exclude everything except dist/ and nginx.conf |
| `www/nginx.conf` | Create | SPA-friendly nginx config with caching rules |
| `www/docker-compose.yml` | Create | Production compose file (runs on NAS) |
| `www/docker-compose.stage.yml` | Create | Staging compose override (runs on NAS) |
| `www/docker-compose.dev.yml` | Create | Local testing compose file (build + run on Mac) |
| `www/deploy.sh` | Create | Build/test/deploy script with subcommands |
| `www/purge-cdn.sh` | Create | Ad-hoc BunnyCDN cache purge utility |
| `www/.env.production` | Modify | Point `VITE_ASSETS_BASE` to CDN, set `VITE_DATA_BASE` |
| `www/.env.staging` | Modify | Set `VITE_DATA_BASE` |
| `www/.env.development` | Modify | Set `VITE_DATA_BASE` |
| `www/package.json` | Modify | Add deploy/docker npm scripts |

---

## Local Testing Workflow

The local testing experience mirrors production as closely as possible:

### Quick test (Vite dev server — fastest feedback loop)

```bash
npm run dev          # HMR, hot reload, proxy for assets
```

Uses Vite's dev server with the proxy for CDN assets. Best for active development.

### Production-identical test (Docker + nginx — verify before deploy)

```bash
npm run deploy:local    # builds prod, runs in Docker on :8080
```

This runs `deploy.sh local` which:
1. Builds the Vite app in production mode
2. Builds a Docker image using the same Dockerfile as production
3. Runs it locally via `docker-compose.dev.yml` on `:8080`

Visit `http://localhost:8080` and verify:
- SPA routing works (navigate to `/about`, refresh — should not 404)
- Portfolio images load from CDN
- Archive JSON loads at `/assets/json/archive/{client}/{entry}.json`
- nginx cache headers are correct (check DevTools Network tab)
- Gzip compression is active

### Build once, test, then ship

```bash
npm run docker:build         # build prod + Docker image
npm run deploy:local         # test locally
# verify everything works...
npm run docker:push          # ship the same image to NAS (no rebuild)
```

This avoids rebuilding between test and deploy — the exact image you tested is what goes to production.

---

## Deployment Workflow (day-to-day)

### Regular deploy (code changes)

```bash
cd www
npm run deploy:live     # builds, dockerises, ships to NAS, restarts container
```

No CDN interaction needed — JS/CSS bundles are served by the nginx container, and portfolio images haven't changed.

### Adding new portfolio entries

1. Upload images to `/Volumes/web/assets.stephenhamilton.co.uk/portfolio/images/portfolio-entries/{client}/{entry}/` via SMB mount
2. Update the API / data as needed
3. Deploy the app if code changes are involved

BunnyCDN will cache new images on first request — no purge needed since they're new URLs.

### Updating existing portfolio images

1. Replace the image file(s) on the origin via SMB mount
2. Purge the CDN cache for those specific paths:
   ```bash
   ./purge-cdn.sh images/portfolio-entries/disney/capamerads/thumb/thumb.jpg
   ```

### Rollback

```bash
# On the NAS (via SSH):
docker tag portfolio:2026-02-20 portfolio:latest
cd /volume1/docker/portfolio && docker compose up -d
```

---

## Verification Checklist

1. **Local Docker test:** `npm run deploy:local` — visit `http://localhost:8080`, verify:
    - SPA routing works (navigate to `/about`, refresh — should not 404)
    - Portfolio images load from CDN (`cdn.stephenhamilton.co.uk`)
    - Archive JSON loads (click into a project with archive data)
    - Check nginx response headers (cache-control, gzip, security headers)
2. **Stage deploy:** `npm run deploy:stage` — verify site loads at `stage.stephenhamilton.co.uk`
3. **Production deploy:** `npm run deploy:live` — verify site loads at `www.stephenhamilton.co.uk`
4. **Rollback test:** Tag images with dates, verify you can roll back by loading a previous tag

---

## Future Considerations (not in scope)

- **GitHub Actions CI:** Could automate builds on push to `master`, build the Docker image in CI, and transfer to the NAS via SSH. Worth adding later if you want hands-off deploys.
- **Watchtower:** Auto-pull new images if you switch to a registry later.
- **The API:** The PHP/Laravel API could also be containerised, but it's separate scope.
- **Serve bundles via CDN too:** Could set Vite's `base` config to the CDN URL and rsync `dist/assets/` to the CDN origin, gaining edge caching for JS/CSS. Marginal benefit for a personal site but easy to add later.
