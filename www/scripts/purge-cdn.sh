#!/bin/bash
set -euo pipefail

# Purge BunnyCDN cache for portfolio media assets
#
# Usage:
#   ./purge-cdn.sh <path>
#   ./purge-cdn.sh images/portfolio-entries/disney/capamerads/thumb/thumb.jpg
#   ./purge-cdn.sh images/awards/fwa.png
#   ./purge-cdn.sh "images/portfolio-entries/disney/*"
#
# Requires BUNNY_API_KEY environment variable or .env.local file in this directory.

CDN_BASE="https://cdn.stephenhamilton.co.uk/portfolio"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
WWW_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

# Load API key from .env.local if not already set
if [[ -z "${BUNNY_API_KEY:-}" ]] && [[ -f "$WWW_DIR/.env.local" ]]; then
    BUNNY_API_KEY="$(grep '^BUNNY_API_KEY=' "$WWW_DIR/.env.local" | cut -d= -f2-)"
fi

if [[ -z "${BUNNY_API_KEY:-}" ]]; then
    echo "Error: BUNNY_API_KEY not set." >&2
    echo "Set it as an environment variable or add BUNNY_API_KEY=... to .env.local" >&2
    exit 1
fi

if [[ $# -lt 1 ]]; then
    echo "Usage: $0 <path>" >&2
    echo "Example: $0 images/portfolio-entries/disney/capamerads/thumb/thumb.jpg" >&2
    exit 1
fi

PURGE_PATH="$1"
PURGE_URL="$CDN_BASE/$PURGE_PATH"

echo "Purging: $PURGE_URL"

RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
    "https://api.bunny.net/purge?url=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$PURGE_URL', safe=''))")" \
    -H "AccessKey: $BUNNY_API_KEY")

HTTP_CODE=$(echo "$RESPONSE" | tail -1)
BODY=$(echo "$RESPONSE" | head -n -1)

if [[ "$HTTP_CODE" == "200" ]]; then
    echo "Purged successfully."
else
    echo "Purge failed (HTTP $HTTP_CODE): $BODY" >&2
    exit 1
fi
