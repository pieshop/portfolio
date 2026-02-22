# Portfolio API (Express)

Express.js API serving portfolio entry metadata from MariaDB. Provides the same response shapes consumed by the `www/` frontend service layer.

Media data (images, dimensions, archive/flash/dark-background flags) is **not** served by this API — that data lives in `portfolio.json` at build time and was never in the database.

## Requirements

- Node.js ^22.17.1
- MariaDB with the `portfolio` database (see `sql/portfolio.sql`)

## Setup

```bash
cp .env.example .env
# Edit .env with your DB credentials
npm install
npm start
```

The server starts on port 3010 by default (configurable via `PORT` in `.env`).

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `DB_HOST` | `localhost` | MariaDB host |
| `DB_PORT` | `3306` | MariaDB port |
| `DB_USER` | `portfoliouser` | Database user |
| `DB_PASSWORD` | *(empty)* | Database password |
| `DB_NAME` | `portfolio` | Database name |
| `PORT` | `3010` | API server port |

## Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/categories` | All active categories |
| `GET` | `/api/categories/active` | Year → category map for navigation |
| `GET` | `/api/categories/:categoryId/:yearId` | Entries filtered by category and year |
| `GET` | `/api/item/:entryId` | Single entry with full metadata |

## Curl Tests

```bash
# All active categories
curl http://192.168.1.75:3010/api/categories

# Year → category map for navigation
curl http://192.168.1.75:3010/api/categories/active

# Entries for web category, year 2018
curl http://192.168.1.75:3010/api/categories/web/2018

# All entries across all categories and years
curl http://192.168.1.75:3010/api/categories/all/allyears

# Single entry by key
curl http://192.168.1.75:3010/api/item/horriblehistories

# 404 for non-existent entry
curl http://192.168.1.75:3010/api/item/doesnotexist
```

## Docker

### Local testing

```bash
docker compose -f docker-compose.dev.yml up --build
# API available at http://localhost:3010
```

### Commands

- Restart image and container on NAS
```bash
ssh ds918_stephen "cd /volume1/docker/portfolio && sudo /usr/local/bin/docker compose -p portfolio-api -f docker-compose.api.yml up -d --force-recreate"
```

- Delete image and container on NAS
```bash
ssh ds918_stephen "cd /volume1/docker/portfolio && sudo /usr/local/bin/docker compose -p portfolio-api -f docker-compose.api.yml down && sudo /usr/local/bin/docker rmi portfolio-api:latest"
```

Requires a `.env` file with DB credentials (the container reads it via `env_file`).

### Deploy to NAS

```bash
./scripts/deploy.sh build   # Build Docker image
./scripts/deploy.sh push    # Transfer to NAS + restart
./scripts/deploy.sh live    # Shorthand: build + push
./scripts/deploy.sh local   # Build + run locally in Docker
```

## Legacy Directories

The following directories are kept for historical reference only:

- `autorun/` — Synology autorun scripts
