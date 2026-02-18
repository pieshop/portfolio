---
name: inspect-local-ui
description: Inspect a locally running web app (Vite) from Dockerized Playwright. Takes desktop+mobile screenshots, captures console + failed network requests, and applies a safe Vite allowedHosts fix if host.docker.internal is blocked.
---

# Inspect Local UI (Docker Playwright + Vite)

Use this skill when the user asks to “inspect”, “check”, “screenshot”, “see what it looks like”, or “UI review” for a locally running website.

## Assumptions & defaults
- Default dev server: Vite on port 5173
- Preferred URL from Docker containers: http://host.docker.internal:5173/
- Fallback URLs (if needed):
    - http://192.168.1.220:5173/
    - http://100.76.184.7:5173/

## Output requirements
Return a short markdown report with:
1) The URL used
2) Links to screenshots (desktop + mobile; fullPage)
3) Console messages summary (errors first, then warnings)
4) Failed network requests summary (4xx/5xx, blocked, CORS)
5) Quick UI notes (overlays/cookie dialogs/layout breakage)

Keep tool output compact; do not dump huge logs.

## Playwright workflow (use Playwright MCP tools)
1) Navigate
- Use browser_navigate to the target URL.
- Wait for the page to settle (browser_wait_for). If there’s a loading spinner, wait briefly and proceed.

2) Desktop screenshot
- Set viewport to desktop size (e.g., 1440x900) via browser_resize if available.
- Take a fullPage PNG screenshot.
- IMPORTANT: Do NOT pass `filename` unless writing to /tmp; prefer letting the server pick the output path to avoid EACCES.

3) Mobile screenshot
- Resize to 390x844 (mobile) and take another fullPage screenshot.

4) Collect diagnostics
- Get browser_console_messages
- Get browser_network_requests
- Summarize only what matters; prioritize errors.

## Vite “blocked host” remediation (only if needed)
If the page fails with a Vite host-blocking / “blocked request” / “Disallowed host” type error when using host.docker.internal:

- Apply the minimal change in vite.config.ts:
  server: { allowedHosts: ["host.docker.internal"] }
- Do NOT widen to allow-all unless the user explicitly asks.
- If server config already exists, merge carefully without breaking other fields (proxy/host/etc.).
- After changing, tell the user to restart Vite if required; then retry navigation.

If editing project files is not allowed or the repo is read-only, propose the alternative:
- Use the LAN URL (192.168.1.220) or Tailscale URL (100.76.184.7) instead.

## Safety / guardrails
- Never attempt logins or enter credentials.
- Do not click destructive UI actions.
- Keep changes minimal and explain what changed.
- If the page is behind auth and blocks inspection, still capture screenshot + console/network evidence and report that auth blocked further inspection.

## Invocation examples
- “/inspect-local-ui”
- “Inspect my local site”
- “Inspect http://host.docker.internal:5173/”