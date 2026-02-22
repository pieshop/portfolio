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

## Legacy Directories

The following directories are kept for historical reference only:

- `autorun/` — Synology autorun scripts
