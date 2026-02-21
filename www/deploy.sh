#!/bin/bash
set -euo pipefail

# Portfolio deployment script
#
# Usage:
#   ./deploy.sh build [prod|stage]  — Build Vite app + Docker image
#   ./deploy.sh local               — Build prod + run locally in Docker on :8080
#   ./deploy.sh push [live|stage]   — Transfer image to NAS + restart container
#   ./deploy.sh live                — Shorthand: build prod + push live
#   ./deploy.sh stage               — Shorthand: build stage + push stage

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SSH_HOST="ds918_stephen"
REMOTE_COMPOSE_DIR="/volume1/docker/portfolio"
IMAGE_NAME="portfolio"
DATE_TAG="$(date +%Y-%m-%d)"

cd "$SCRIPT_DIR"

# ─── Helpers ──────────────────────────────────────────────

log() {
    echo "▸ $*"
}

err() {
    echo "✗ $*" >&2
    exit 1
}

# ─── Build ────────────────────────────────────────────────

build_vite() {
    local mode="$1"
    case "$mode" in
        prod)  log "Building Vite app (production)"; npm run build:prod ;;
        stage) log "Building Vite app (staging)";    npm run build:stage ;;
        *)     err "Unknown build mode: $mode (use prod or stage)" ;;
    esac
}

build_docker() {
    local tag="$1"
    log "Building Docker image → $IMAGE_NAME:$tag"

    if [[ "$tag" == "latest" ]]; then
        docker build --platform linux/amd64 -t "$IMAGE_NAME:latest" -t "$IMAGE_NAME:$DATE_TAG" .
    else
        docker build --platform linux/amd64 -t "$IMAGE_NAME:$tag" .
    fi
}

cmd_build() {
    local mode="${1:-prod}"
    case "$mode" in
        prod)
            build_vite prod
            build_docker latest
            ;;
        stage)
            build_vite stage
            build_docker stage
            ;;
        *)
            err "Unknown build target: $mode (use prod or stage)"
            ;;
    esac
}

# ─── Local ────────────────────────────────────────────────

cmd_local() {
    build_vite prod
    log "Running locally in Docker on :8080"
    docker compose -f docker-compose.dev.yml up --build --force-recreate -d
    log "Running at http://localhost:8080"
    log "Stop with: docker compose -f docker-compose.dev.yml down"
}

# ─── Push ─────────────────────────────────────────────────

push_image() {
    local tag="$1"
    local compose_file="$2"
    local container="$3"
    local project="$4"

    log "Transferring $IMAGE_NAME:$tag to NAS"
    docker save "$IMAGE_NAME:$tag" | ssh "$SSH_HOST" "sudo /usr/local/bin/docker load"

    log "Restarting container ($container)"
    ssh "$SSH_HOST" "cd $REMOTE_COMPOSE_DIR && sudo /usr/local/bin/docker compose -p $project -f $compose_file up -d --force-recreate"

    log "Deploy complete → $container"
}

cmd_push() {
    local target="${1:-live}"
    case "$target" in
        live)
            push_image "latest" "docker-compose.yml" "portfolio-www" "portfolio-prod"
            ;;
        stage)
            push_image "stage" "docker-compose.stage.yml" "portfolio-stage" "portfolio-stage"
            ;;
        *)
            err "Unknown push target: $target (use live or stage)"
            ;;
    esac
}

# ─── Shorthands ───────────────────────────────────────────

cmd_live() {
    cmd_build prod
    cmd_push live
}

cmd_stage() {
    cmd_build stage
    cmd_push stage
}

# ─── Main ─────────────────────────────────────────────────

case "${1:-}" in
    build) cmd_build "${2:-prod}" ;;
    local) cmd_local ;;
    push)  cmd_push "${2:-live}" ;;
    live)  cmd_live ;;
    stage) cmd_stage ;;
    *)
        echo "Usage: $0 {build|local|push|live|stage}"
        echo ""
        echo "Commands:"
        echo "  build [prod|stage]  Build Vite app + Docker image"
        echo "  local               Build prod + run locally on :8080"
        echo "  push [live|stage]   Transfer image to NAS + restart"
        echo "  live                Build prod + push to NAS (full deploy)"
        echo "  stage               Build stage + push to NAS"
        exit 1
        ;;
esac
