# VPN Super Assistant

A free, mobile-first network diagnostics website designed for iPhone Safari.

## Cloudflare Pages deployment

1. Open https://dash.cloudflare.com/
2. Go to **Workers & Pages** → **Create application** → **Pages**.
3. Connect this repository: `pexshop/Repository-name`.
4. Select the `main` production branch.
5. Framework preset: **None**; build command: leave empty; build output directory: `.`.
6. Deploy and wait for **Success**.

The static website needs no build step, paid API key, database, or separate server. The `functions/api/probe.js` endpoint is a Cloudflare Pages Function and requires a **Pages** deployment. It will not automatically run on a regular `workers.dev` Worker.

## Included tools

- Public IPv4 and optional geolocation lookup
- IPv4 / IPv6 reachability checks
- WebRTC ICE candidate inspection
- Browser HTTPS request timing
- Server-side allowlisted checks for Cloudflare, Google, ipify, ipapi, Cloudflare DoH, Google DoH, and a small Cloudflare speed sample
- Foreground connectivity monitor
- Diagnostic report export
- 50-item tool directory and troubleshooting guide

## Test the API

After deployment, open `https://YOUR-PAGES-DOMAIN/api/probe`, then test `?target=google` and `?target=doh_google`.

The API accepts only fixed target names, not arbitrary URLs. This prevents it from becoming an open proxy or arbitrary server-side request tool.

## Limitations and privacy

This is an independent helper, not an official VPN Super product. A website cannot read or control VPN Super's private server list, inspect iOS system VPN status, force reconnection, keep a system VPN tunnel alive, or guarantee background monitoring. iOS Safari may suspend timers in the background or when locked. Browser HTTPS timings are not ICMP ping or VPN-node latency. DNS notes are not a certified DNS-leak audit.

Some tests contact public third-party endpoints. Their availability, CORS policies, rate limits, and privacy practices may change. Do not enter VPN passwords, private keys, subscription URLs, or configuration secrets.

If all server-side checks report that the API did not return JSON, confirm that this repository is deployed as **Cloudflare Pages**, and that you are using its Pages domain rather than an unrelated `workers.dev` address. If the API returns JSON with an upstream error, the Pages Function is running and the individual status/error can be investigated.
