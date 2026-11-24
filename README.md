# VPN Super Assistant

A free, mobile-first network diagnostics site for iPhone Safari.

## Real features
- Public IPv4 and IPv6 reachability checks from the browser.
- HTTPS request timing to Cloudflare and Google.
- Browser-visible WebRTC ICE candidate inspection (limited by browser privacy controls).
- Before/after VPN snapshots to compare public IP and request timing.
- Six allowlisted external service checks through Cloudflare Pages Functions.
- Plain-text diagnostic report export.

## Important limits
This is not a VPN provider and does not connect to private VPN nodes. A normal iPhone Safari page cannot read iOS VPN status, force reconnect, enable Kill Switch, keep a VPN tunnel alive, scan arbitrary UDP ports, or guarantee background execution. Detecting all provider nodes requires the provider's API or your own distributed probe servers.

## Deploy with Cloudflare Pages
1. Connect this GitHub repository to **Cloudflare Pages** (not a regular Worker).
2. Production branch: `main`.
3. Framework preset: `None`.
4. Build command: leave empty.
5. Build output directory: `.`.
6. Deploy. The `functions/api/probe.js` file is deployed as a Pages Function.

Do not use `wrangler deploy` for this Pages Functions project. If using Wrangler CLI, follow Cloudflare Pages deployment instructions and keep the `functions` directory at the project root.

## API
`GET /api/probe?target=cloudflare`

Allowed targets: `cloudflare`, `google`, `ipify`, `ipapi`, `doh_cloudflare`, `doh_google`.

The API intentionally uses a fixed allowlist and does not accept arbitrary URLs.
