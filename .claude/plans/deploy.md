# Build Pipeline Plan — Portfolio Site

## Context

The portfolio site (`www.stephenhamilton.co.uk`) is a Vite-built React SPA currently deployed via a custom Node.js rsync script (`www/tools/sync.js`) to a Synology DS-918 NAS. The deployment tools reference missing directories (`buildtools/`) and have commented-out features — they're fragile and due for replacement.

**Current state of production (`/Volumes/web/www.stephenhamilton.co.uk/`):**
- The old Webpack build is still live (separate `css/`, `js/`, `fonts/` dirs, `.htaccess`, `sw.js`, PHP files)
- Served by Apache via Synology Web Station
- Assets loaded from BunnyCDN (`cdn.stephenhamilton.co.uk/portfolio`)
- The Synology web volume is mounted on the Mac at `/Volumes/web/` via SMB
- The upgraded Vite build (in `www/dist/`) has **not yet been deployed**

**Other sites on this NAS:** The `/Volumes/web/` mount shows multiple sites (api.stephenhamilton.co.uk, test.stephenhamilton.co.uk, sarah-brady, etc.) all served by the same Apache/Web Station.

The goal is to create a modern, reproducible build pipeline that:
- Builds locally on macOS
- Packages the static site into a Docker image with nginx
- Deploys to the Synology DS-918 (which has Container Manager / Docker installed)

**Important consideration:** Moving this one site from Apache/Web Station to a Docker nginx container means the Synology reverse proxy will need to route `www.stephenhamilton.co.uk` to the container while other sites continue to be served by Web Station on their current ports. This is straightforward — Synology's reverse proxy can coexist with Web Station.

---

## Recommended Approach: Docker Image with nginx

### Why Docker over continuing with rsync?

| | rsync (current) | Docker (proposed) |
|---|---|---|
| Reproducibility | Depends on NAS web server config | Self-contained — nginx config travels with the image |
| Rollback | Manual (no versioning) | `docker run` a previous tag |
| Server config | Managed separately on NAS (Apache) | nginx config is in the repo, version-controlled |
| Port/routing | Tied to Apache/Web Station | Isolated container, any port |
| SSL | Managed on NAS | Can use Synology's reverse proxy or Traefik |

### Architecture

```
Local Mac                        Synology DS-918
──────────                       ───────────────
npm run build:prod
     │
docker build → image
     │
docker save → scp ──────────────→ docker load
                                      │
                                 docker compose up
                                      │
                                 nginx container
                                 serving on port 8080
                                      │
                                 Synology Reverse Proxy
                                 (*.stephenhamilton.co.uk → :8080)
```

### Why `docker save/scp` instead of a registry?

For a personal site with local builds, pushing to Docker Hub or GHCR adds unnecessary complexity and a registry dependency. `docker save | ssh` transfers the image directly — simple, no accounts needed, and the DS-918 has plenty of bandwidth over LAN.

---

## Implementation Steps

### 1. Create nginx configuration

**New file:** `www/nginx.conf`

A minimal nginx config for serving the SPA:
- Serve static files from `/usr/share/nginx/html`
- `try_files $uri $uri/ /index.html` for client-side routing
- Gzip compression for JS/CSS/HTML/JSON
- Cache headers for hashed assets (`/assets/*` → long cache)
- Security headers (X-Frame-Options, CSP basics)

### 2. Create Dockerfile

**New file:** `www/Dockerfile`

Multi-stage is unnecessary since we build locally. Simple single-stage:

```dockerfile
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/ /usr/share/nginx/html/
EXPOSE 80
```

- Uses `nginx:alpine` (< 30MB)
- Copies the pre-built `dist/` output
- No Node.js in the image — it's purely a static file server

### 3. Create docker-compose files

**New file:** `www/docker-compose.yml`

```yaml
services:
  portfolio:
    image: portfolio:latest
    container_name: portfolio-www
    restart: unless-stopped
    ports:
      - "8080:80"
```

**New file:** `www/docker-compose.stage.yml` (override for staging)

```yaml
services:
  portfolio:
    image: portfolio:stage
    container_name: portfolio-stage
    ports:
      - "8081:80"
```

### 4. Create deploy script

**New file:** `www/deploy.sh`

A single shell script replacing the Node.js rsync tooling:

```bash
#!/bin/bash
# Usage: ./deploy.sh [live|stage]

# 1. Build the Vite app (production or staging mode)
# 2. Build Docker image with tag (portfolio:latest or portfolio:stage)
# 3. docker save | ssh ds918_stephen docker load
# 4. ssh ds918_stephen "cd /volume1/docker/portfolio && docker compose up -d"
```

Supports two targets:
- `./deploy.sh live` — builds prod, deploys to ds918 as `portfolio:latest`
- `./deploy.sh stage` — builds staging, deploys to ds918 as `portfolio:stage`

### 5. Add npm scripts

**Modified file:** `www/package.json`

Add convenience scripts:
```json
{
  "scripts": {
    "deploy:live": "./deploy.sh live",
    "deploy:stage": "./deploy.sh stage",
    "docker:build": "docker build -t portfolio:latest .",
    "docker:preview": "docker run --rm -p 8080:80 portfolio:latest"
  }
}
```

### 6. Create .dockerignore

**New file:** `www/.dockerignore`

Exclude everything except `dist/` and `nginx.conf` from the Docker build context.

### 7. Synology setup (manual, one-time)

Document the one-time NAS configuration:

**Docker setup:**
- Create `/volume1/docker/portfolio/` on the NAS
- Copy `docker-compose.yml` (and stage override) to the NAS
- The compose file can also be deployed via the SMB mount: copy to `/Volumes/web/../docker/portfolio/` or via SSH

**Web Station → Reverse Proxy migration:**
- Currently `www.stephenhamilton.co.uk` is served by Web Station (Apache) from `/volume1/web/www.stephenhamilton.co.uk/`
- **Before switching:** Back up the old site directory (or just leave it — it's the old Webpack build)
- Remove the `www.stephenhamilton.co.uk` virtual host from Web Station
- Add a **Reverse Proxy** rule in DSM (Control Panel → Login Portal → Advanced → Reverse Proxy):
  - `www.stephenhamilton.co.uk:443` → `localhost:8080` (HTTPS → HTTP)
  - `stage.stephenhamilton.co.uk:443` → `localhost:8081`
- Other sites (api.stephenhamilton.co.uk, sarah-brady, etc.) remain on Web Station — unaffected
- SSL via Synology's Let's Encrypt integration (likely already configured for this domain)

### 8. Handle assets separately

The current setup syncs assets to a separate directory (`/volume1/web/assets.stephenhamilton.co.uk/portfolio`). Two options:

**Option A (recommended):** Keep assets on the existing CDN (`cdn.stephenhamilton.co.uk`). The Docker container only serves the SPA — assets are loaded from the CDN as they are now in production.

**Option B:** Add a second nginx container for assets, or mount `/volume1/web/assets.stephenhamilton.co.uk` as a Docker volume. Only needed if moving away from the CDN.

---

## Files to Create/Modify

| File | Action | Description |
|---|---|---|
| `www/Dockerfile` | Create | nginx:alpine serving dist/ |
| `www/.dockerignore` | Create | Exclude everything except dist/ and nginx.conf |
| `www/nginx.conf` | Create | SPA-friendly nginx config |
| `www/docker-compose.yml` | Create | Production compose file |
| `www/docker-compose.stage.yml` | Create | Staging compose override |
| `www/deploy.sh` | Create | Build + deploy script |
| `www/package.json` | Modify | Add deploy/docker npm scripts |

---

## Verification

1. **Local preview:** `npm run build:prod && npm run docker:build && npm run docker:preview` — visit `http://localhost:8080`, verify SPA routing works (navigate to `/about`, refresh — should not 404)
2. **Stage deploy:** `npm run deploy:stage` — verify site loads at `stage.stephenhamilton.co.uk`
3. **Production deploy:** `npm run deploy:live` — verify site loads at `www.stephenhamilton.co.uk`
4. **Rollback test:** Tag images with dates (e.g. `portfolio:2026-02-20`), verify you can roll back by loading a previous tag

---

## Future Considerations (not in scope)

- **GitHub Actions CI:** Could automate builds on push to `master`, build the Docker image in CI, and `scp` to the NAS via SSH. Worth adding later if you want hands-off deploys.
- **Watchtower:** Auto-pull new images if you switch to a registry later.
- **Health checks:** Add a Docker healthcheck hitting nginx.
- **The API:** The PHP/Laravel API could also be containerised, but it's separate scope.
