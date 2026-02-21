# Build Pipeline Plan — Portfolio Site

## Status: COMPLETE

All implementation steps have been completed and the pipeline is live in production.

---

## What Was Done

### Steps Completed

| # | Step | Status | Notes |
|---|---|---|---|
| 1 | Restructure archive JSON | Already done | Was completed in a prior session |
| 2 | Create nginx.conf | Done | SPA routing, gzip, cache headers, security headers |
| 3 | Create Dockerfile + .dockerignore | Done | nginx:alpine, healthcheck, amd64 platform |
| 4 | Create docker-compose files | Done | prod, stage, dev |
| 5 | Create deploy.sh | Done | Fully unattended pipeline |
| 6 | Create purge-cdn.sh | Done | Ad-hoc BunnyCDN purge |
| 7 | Add npm scripts | Done | deploy:live, deploy:stage, deploy:local, docker:build, docker:push |
| 8 | Update env files | Done | CDN hostname for assets, archive JSON path already set |
| 9 | Create .dockerignore | Done | Excludes everything except dist/ and nginx.conf |
| 10 | Synology setup | Done | Manual one-time config completed |

### NAS Configuration (Step 10 — manual, completed)

- Created `/volume1/docker/portfolio/` with `docker-compose.yml` and `docker-compose.stage.yml`
- Renamed old site dir to `.bak.www.stephenhamilton.co.uk`
- Deleted `www.stephenhamilton.co.uk` and `stephenhamilton.co.uk` vhosts from Web Station
- Added reverse proxy rules:
    - `https://www.stephenhamilton.co.uk:443` → `http://localhost:8080`
    - `https://stephenhamilton.co.uk:443` → `http://localhost:8080`
    - Updated `https://stage.stephenhamilton.co.uk:443` → `http://localhost:8081`
- Assigned Let's Encrypt SSL certificate to the reverse proxy entries
- Added passwordless sudo for docker commands: `/etc/sudoers.d/docker-deploy`

### Issues Encountered & Resolved

1. **Platform mismatch** — Docker Desktop on Apple Silicon builds `linux/arm64` by default; NAS is `linux/amd64`. Fixed by adding `--platform linux/amd64` to all `docker build` commands in `deploy.sh`.

2. **SCP/rsync not available** — SFTP subsystem not enabled for `stephen` user on NAS. Resolved by piping directly: `docker save | ssh docker load`.

3. **Docker socket permissions** — `stephen` user not in docker group; socket owned by `root:root`. Resolved with passwordless sudo via `/etc/sudoers.d/docker-deploy`.

4. **Cloudflare SSL error 526** — New reverse proxy entry needed the Let's Encrypt certificate manually assigned in DSM → Security → Certificate → Settings.

---

## Architecture (Final)

```
Local Mac                           Synology DS-918
──────────                          ───────────────

npm run build:prod
     │
docker build --platform linux/amd64
     │
docker save | ssh ─────────────────→ sudo docker load
                                         │
                                    sudo docker compose up -d
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
                                    www.stephenhamilton.co.uk:443 → :8080
                                    stephenhamilton.co.uk:443 → :8080
                                    stage.stephenhamilton.co.uk:443 → :8081
                                         │
                                    Cloudflare (DNS + edge)

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
