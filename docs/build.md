# Build, Deploy & Infrastructure

> Detailed build pipeline, Docker setup, hosting architecture, and deployment procedures.
>
> Quick reference tables are also in [CLAUDE.md](../CLAUDE.md).

---

## Build Commands

All commands run from `www/`. Environment config via `.env.*` files using `VITE_*` variables.

| Command | What it does |
|---|---|
| `npm run dev` | Vite HMR dev server (port 5173) |
| `npm run build:prod` | `tsc && vite build` (production mode) |
| `npm run build:stage` | `tsc && vite build --mode staging` |
| `npm run build:dev` | `tsc && vite build --mode development` |
| `npm run preview` | Preview production build locally |
| `npm run sitemap` | Generate `sitemap.xml` from `portfolio.json` |

---

## Deploy Commands

All deploy commands run from `www/` and delegate to `scripts/deploy.sh`.

### npm scripts

| Command | What it does |
|---|---|
| `npm run deploy:live` | Full deploy: build prod → Docker image → push to NAS → restart |
| `npm run deploy:stage` | Full deploy: build stage → Docker image → push to NAS → restart |
| `npm run deploy:local` | Build prod → run in Docker locally on :8080 |
| `npm run docker:local:stop` | Stop the local Docker container |
| `npm run docker:build` | Build prod Vite app + Docker image (no deploy) |
| `npm run docker:push` | Push existing image to NAS + restart container |
| `npm run deploy:assets` | Sync local portfolio images → NAS via SSH |
| `npm run assets:pull` | Pull portfolio images from NAS → local via SSH |

### deploy.sh direct usage

```bash
./scripts/deploy.sh live                # build + deploy to production
./scripts/deploy.sh stage               # build + deploy to staging
./scripts/deploy.sh local               # build + run locally in Docker
./scripts/deploy.sh build [prod|stage]  # build only (no deploy)
./scripts/deploy.sh push [live|stage]   # push only (no rebuild)
./scripts/deploy.sh assets              # sync local images → NAS
./scripts/deploy.sh assets:pull         # pull images from NAS → local
```

---

## Deploy Pipeline

The full production deploy (`deploy.sh live`) runs these steps:

```
1. npm run build:prod          # Vite builds to www/dist/
2. docker build                # nginx:alpine image (~25MB), platform linux/amd64
     --platform linux/amd64
     -t portfolio:latest
     -t portfolio:YYYY-MM-DD   # date tag for rollback
3. docker save portfolio:latest | ssh ds918_stephen sudo docker load
4. ssh ds918_stephen "cd /volume1/docker/portfolio && sudo docker compose \
     -p portfolio-prod -f docker-compose.yml up -d --force-recreate"
```

### Key details

- Images are tagged with both `portfolio:latest` and `portfolio:YYYY-MM-DD` for rollback
- Builds target `linux/amd64` (NAS platform) from Apple Silicon Mac
- SSH host `ds918_stephen` defined in `~/.ssh/config` (192.168.1.75:51966)
- Passwordless sudo for docker via `/etc/sudoers.d/docker-deploy` on NAS
- Compose projects are isolated by name (`portfolio-prod`, `portfolio-stage`) so deploying one doesn't affect the other
- Both containers have `restart: unless-stopped` — they survive NAS reboots

### Staging deploy

Staging (`deploy.sh stage`) is identical except:
- Builds with `--mode staging` (uses `.env.staging`)
- Docker image tagged `portfolio:stage` (no date tag)
- Compose file: `docker-compose.stage.yml`
- Compose project: `portfolio-stage`
- Container: `portfolio-stage`, port 8081

---

## Rollback

```bash
# On the NAS (via SSH):
sudo docker tag portfolio:2026-02-20 portfolio:latest
cd /volume1/docker/portfolio && sudo docker compose -p portfolio-prod -f docker-compose.yml up -d --force-recreate
```

Date-tagged images are retained on the NAS after each deploy, so you can roll back to any previous deploy date.

---

## Hosting Architecture

```
User → Cloudflare (DNS/CDN edge)
     → Synology DSM reverse proxy (HTTPS termination, Let's Encrypt)
     → Docker nginx container on Synology DS-918 NAS
```

### Reverse proxy rules (Synology DSM)

| Domain | Upstream |
|---|---|
| `www.stephenhamilton.co.uk:443` | `localhost:8080` (production) |
| `stephenhamilton.co.uk:443` | `localhost:8080` (production) |
| `stage.stephenhamilton.co.uk:443` | `localhost:8081` (staging) |

- **SSL:** Let's Encrypt certificates via Synology DSM, assigned to each reverse proxy entry
- **DNS/CDN edge:** Cloudflare
- **Containers:** Both `restart: unless-stopped` — auto-restart after NAS reboot

---

## Docker Setup

### Dockerfile

```dockerfile
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/ /usr/share/nginx/html/

HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -q --spider http://localhost/ || exit 1

EXPOSE 80
```

Minimal nginx:alpine image (~25MB). Only copies the pre-built `dist/` and the nginx config. Healthcheck ensures the container restarts if nginx stops responding.

### .dockerignore

```
*
!dist/
!nginx.conf
```

Everything is excluded except the two files needed — keeps the build context tiny.

### nginx.conf

The nginx config handles:

**Gzip compression** — Enabled for HTML, CSS, JS, JSON, and SVG (`gzip_min_length 256`).

**Security headers:**
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`

**Cache strategy:**
- `/assets/*` (hashed build artifacts): `Cache-Control: public, max-age=31536000, immutable` — cached forever, busted by hash in filename
- `/` (index.html, SPA fallback): `Cache-Control: no-cache` — always revalidates

**SPA routing:** `try_files $uri $uri/ /index.html` — all unmatched routes fall through to `index.html` for React Router.

### Docker Compose files

**Production** (`docker-compose.yml`):
```yaml
services:
  portfolio:
    image: portfolio:latest
    container_name: portfolio-www
    restart: unless-stopped
    ports:
      - "8080:80"
```

**Staging** (`docker-compose.stage.yml`):
```yaml
services:
  portfolio:
    image: portfolio:stage
    container_name: portfolio-stage
    restart: unless-stopped
    ports:
      - "8081:80"
```

**Local dev** (`docker-compose.dev.yml`):
```yaml
services:
  portfolio:
    build: .
    container_name: portfolio-dev
    ports:
      - "8080:80"
```

The local compose file uses `build: .` to build the image on the fly, while prod/stage reference pre-built images. Local doesn't set `restart: unless-stopped` since it's temporary.

---

## Asset Architecture

Three types of assets, each served differently:

### 1. Build artifacts (JS/CSS/fonts)

Served by the nginx container from `/assets/*`. Vite hashes filenames at build time, so they get immutable cache headers (1 year). No CDN needed — the files change hash on every build.

### 2. Portfolio media (images, thumbnails, awards)

Served via BunnyCDN pull zone:

| Layer | Domain | Notes |
|---|---|---|
| Origin | `assets.stephenhamilton.co.uk` | Web Station/Apache on NAS |
| CDN | `cdn.stephenhamilton.co.uk` | BunnyCDN pull zone |

Referenced in code via `VITE_ASSETS_BASE` environment variable, consumed by URL builder functions in `AppConstants.ts`:
- `get_image_path({ client_id, entry_id })` — screengrab images
- `get_thumb_path({ client_id, entry_id })` — thumbnail images
- `get_awards_path()` — award badge images
- `get_images_path()` — general images base path

### 3. Archive JSON (per-project data)

Served by the nginx container from `/assets/json/archive/{client}/{entry}.json`. Source files live in `www/public/assets/json/archive/`. This is the only data loaded via `fetch()` at runtime (all other data is bundled at build time).

---

## CDN Cache Purge

Only needed when existing portfolio images are **replaced** (same filename, new content). New images cache naturally via BunnyCDN.

```bash
# Single file
./scripts/purge-cdn.sh images/portfolio-entries/disney/capamerads/thumb/thumb.jpg

# Award image
./scripts/purge-cdn.sh images/awards/fwa.png

# Wildcard (quote to prevent shell expansion)
./scripts/purge-cdn.sh "images/portfolio-entries/disney/*"
```

The script constructs the full CDN URL (`https://cdn.stephenhamilton.co.uk/portfolio/<path>`) and calls the BunnyCDN purge API.

**API key setup:** Set `BUNNY_API_KEY` as an environment variable, or add `BUNNY_API_KEY=...` to `www/.env.local` (git-ignored).

---

## Local Assets (Dev)

Portfolio media images (~90MB, ~1,800 files) can be served locally during development to avoid network requests to the NAS.

### How it works

`vite.config.ts` checks for `../assets/portfolio/images/` at startup:

- **If present:** A custom Vite plugin (`localAssetsPlugin`) serves `/assets-proxy/*` directly from the local `assets/portfolio/` directory via middleware. No network requests.
- **If absent:** Falls back to Vite's dev proxy (`/assets-proxy` → `https://assets.stephenhamilton.co.uk/portfolio`), proxying through to the NAS.

### Initial setup

```bash
cd www && ./scripts/deploy.sh assets:pull
```

This pulls images from the NAS via SSH + rsync:
- Source: `ds918_stephen:/volume1/web/assets.stephenhamilton.co.uk/portfolio/images/`
- Destination: `assets/portfolio/images/` (project root)
- Synology `@eaDir` metadata directories are excluded

The `assets/` directory is git-ignored.

### Syncing changes

```bash
# Push local changes to NAS
./scripts/deploy.sh assets

# Pull latest from NAS
./scripts/deploy.sh assets:pull
```

Asset push uses `rsync --delete` (destructive sync), while pull does not.

---

## Environment Variables

Full table of all `VITE_*` variables across environments:

| Variable | Development | Staging | Production |
|---|---|---|---|
| `VITE_BASE_URL` | `https://www.stephenhamilton.co.uk` | `https://stage.stephenhamilton.co.uk` | `https://www.stephenhamilton.co.uk` |
| `VITE_ASSETS_BASE` | `/assets-proxy` | `https://assets.stephenhamilton.co.uk/portfolio` | `https://cdn.stephenhamilton.co.uk/portfolio` |
| `VITE_DATA_BASE` | `/assets/json/archive` | `/assets/json/archive` | `/assets/json/archive` |
| `VITE_GA_ENABLED` | `false` | `false` | `true` |
| `VITE_SERVICE_WORKER` | `false` | `false` | `false` |

**Notes:**
- Dev uses `/assets-proxy` which is handled by the Vite dev server (local plugin or proxy to NAS)
- Staging uses the origin server directly (no CDN) for testing
- Production uses BunnyCDN (`cdn.stephenhamilton.co.uk`)
- `VITE_GA_ENABLED` is `true` only in production (Google Analytics was removed, but the flag remains)
- `VITE_SERVICE_WORKER` is `false` everywhere (service worker is disabled)
- `VITE_DATA_BASE` is the same across all environments — archive JSON is served by the app's own nginx

---

## NAS Docker Setup (one-time, already done)

- Compose files at `/volume1/docker/portfolio/` on NAS
- Old site backed up to `.bak.www.stephenhamilton.co.uk` in `/volume1/web/`
- `www.stephenhamilton.co.uk` and `stephenhamilton.co.uk` vhosts removed from Web Station
- `assets.stephenhamilton.co.uk` remains on Web Station (BunnyCDN origin)
- Passwordless sudo: `stephen ALL=(root) NOPASSWD: /usr/local/bin/docker, /usr/local/bin/docker-compose`
