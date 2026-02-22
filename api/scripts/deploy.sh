#!/bin/bash
set -euo pipefail

# API deployment script
#
# Usage:
#   ./deploy.sh build   — Build Docker image
#   ./deploy.sh local   — Build + run locally in Docker on :3010
#   ./deploy.sh push    — Transfer image to NAS + restart container
#   ./deploy.sh live    — Shorthand: build + push

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
API_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
SSH_HOST="ds918_stephen"
REMOTE_COMPOSE_DIR="/volume1/docker/portfolio"
IMAGE_NAME="portfolio-api"
DATE_TAG="$(date +%Y-%m-%d)"

cd "$API_DIR"

# ─── Helpers ──────────────────────────────────────────────

log() {
    echo "▸ $*"
}

err() {
    echo "✗ $*" >&2
    exit 1
}

# ─── Build ────────────────────────────────────────────────

cmd_build() {
    log "Building Docker image → $IMAGE_NAME:latest"
    docker build --platform linux/amd64 -t "$IMAGE_NAME:latest" -t "$IMAGE_NAME:$DATE_TAG" .
}

# ─── Local ────────────────────────────────────────────────

cmd_local() {
    log "Running locally in Docker on :3010"
    docker compose -f docker-compose.dev.yml up --build --force-recreate -d
    log "Running at http://localhost:3010"
    log "Stop with: docker compose -f docker-compose.dev.yml down"
}

# ─── Push ─────────────────────────────────────────────────

cmd_push() {
    log "Transferring $IMAGE_NAME:latest to NAS"
    docker save "$IMAGE_NAME:latest" | ssh "$SSH_HOST" "sudo /usr/local/bin/docker load"

    log "Restarting container (portfolio-api)"
    ssh "$SSH_HOST" "cd $REMOTE_COMPOSE_DIR && sudo /usr/local/bin/docker compose -p portfolio-api -f docker-compose.api.yml up -d --force-recreate"

    log "Deploy complete → portfolio-api"
}

# ─── Shorthands ───────────────────────────────────────────

cmd_live() {
    cmd_build
    cmd_push
}

# ─── Main ─────────────────────────────────────────────────

case "${1:-}" in
    build) cmd_build ;;
    local) cmd_local ;;
    push)  cmd_push ;;
    live)  cmd_live ;;
    *)
        echo "Usage: $0 {build|local|push|live}"
        echo ""
        echo "Commands:"
        echo "  build   Build Docker image"
        echo "  local   Build + run locally on :3010"
        echo "  push    Transfer image to NAS + restart"
        echo "  live    Build + push to NAS (full deploy)"
        exit 1
        ;;
esac
