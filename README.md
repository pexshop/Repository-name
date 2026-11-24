# VPN Super Assistant

Mobile-first external service diagnostics for iPhone Safari.

## Third-party monitoring
- Public vendor status APIs: GitHub, OpenAI, Cloudflare, Discord, Slack, Stripe, Atlassian, Render and Vercel.
- Add custom public HTTPS health/status/API endpoints in the browser. Custom endpoints are saved locally in the browser.
- Cloudflare Pages Function checks a fixed allowlist of vendor status APIs server-side, avoiding browser CORS restrictions for those built-in checks.
- Existing network diagnostics: public IPv4/IPv6, browser HTTPS timing, WebRTC ICE candidate inspection and before/after VPN snapshots.

## Important limits
- A vendor status API reports the vendor's published overall incidents, not whether a particular customer account, private server or VPN node works.
- Custom endpoints are requested directly by the browser and require the endpoint to permit CORS. Use public, read-only HTTPS health endpoints only.
- Do not enter API keys, bearer tokens, passwords, private URLs or subscription links. This checker does not support authenticated endpoints.
- A web page cannot generically test arbitrary TCP/UDP ports, SSH, databases, or private network services. Those require a trusted probe agent/server and explicit authorization.
- Do not expose an unrestricted URL proxy: it can create SSRF and abuse risks. The Pages Function therefore uses a fixed target allowlist.

## Cloudflare Pages deployment
1. Connect this repository to Cloudflare Pages.
2. Production branch: `main`; framework preset: `None`.
3. Build command: empty; build output directory: `.`.
4. Deploy. Keep `functions/api/probe.js` at the project root.
