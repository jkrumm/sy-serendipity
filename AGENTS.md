# sy-serendipity

Marketing site for the charter yacht SY Serendipity I. Astro 7, `output: 'static'` with
`@astrojs/netlify` for exactly one on-demand route, React 19 islands, Bun, Tailwind 4,
SCSS modules. README.md has the stack table and layout; this file only carries what changes
how you work here.

## Dev server runs in a herdr pane — you start it

Overrides the global "never start dev servers" rule for this repo, by explicit request:
the agent owns the dev server so it can read its logs and hit the routes itself.

```bash
herdr pane list                                   # is a pane labelled "sy-serendipity dev" alive?
herdr pane split --current --direction right --ratio 0.35 --cwd "$PWD" --no-focus   # → pane_id
herdr pane rename <pane_id> "sy-serendipity dev"
herdr pane run <pane_id> 'bun run dev'
herdr pane wait-output <pane_id> --regex 'Local|localhost:7734' --timeout 60000
herdr pane read <pane_id> --source recent --lines 80   # logs, incl. /api/request errors
```

- Port is **7734** by default, `strictPort`; `PORT=7735 bun run dev` moves it (the kill-port
  in `dev`/`preview` follows). Parallel worktrees each take their own port and Caddy block:
  `sy-serendipity-fable.test` → 7735, `sy-serendipity-codex.test` → 7736.
- Doors: `https://sy-serendipity.test` (Caddy, this machine) and
  `https://sy-serendipity.mini.jkrumm.com` (tailnet, from the mini). `server.allowedHosts`
  is `.test` + `.mini.jkrumm.com`, so any Caddy door works without a config change.
- `astro dev` (Astro 7) detaches into a daemon: `bun run dev` returns immediately,
  `astro dev logs` / `astro dev stop` / `astro dev status` manage it.
- Local Edge Function emulation is disabled in the adapter: this site has no Edge Functions,
  and the emulator's Deno process rejects `--allow-scripts`. The request route uses a regular
  Netlify Function; production output is unaffected.
- `/api/request` reads `EMAIL_GATEWAY_URL` / `EMAIL_GATEWAY_SECRET_KEY` via `astro:env/server` (schema in
  `astro.config.ts`), sourced from `.env` (gitignored, see `.env.example`) under `astro dev`
  and from Netlify's site environment variables (scope: Functions) in production. Restart
  the pane after editing `.env`.
- Verify the form end to end:
  ```bash
  curl -s -X POST http://localhost:7734/api/request -H 'Content-Type: application/json' \
    -d '{"email":"test@example.com","firstName":"Test","message":"hello"}'   # → {"ok":true}
  ```
  That sends a real mail through email-gateway to the configured receiver.

## Validation

`bun run check`, `bun run lint`, `bun run format:check`, `bun run build`. All four must pass
before a commit. `/check` covers them.

## Typography and copy (owner rules)

- Headings use the brand font RockStar Narrow Medium (`$font-display`, as on the original site),
  body text Brown. No serif anywhere, admin panel included.
- Headlines (page `h1`, section `h2`, gallery chapters, "Next" titles, CTA labels) capitalise
  every word: "Request A Charter", "Water Sports And Fitness". Subheadlines below them (card
  titles, spec table captions, the form heading, legal `h3`) are lowercase: "open decks",
  "the yacht", "charter request". Proper nouns keep their capitals.
- No decorative captions under photos or videos; keep only informative ones (crew names,
  destination names, deck-plan labels). No overlay icons on images.
- Crew by first name only (Scott, Renée, Max).

## Images and email

- Every image is one entry in `src/content/images.json` (id → folder/file/dims/alt/tags/quality,
  generated from a vision-model pass; regenerate with `sy-serendipity-compare/catalog/merge.py`).
  Content files reference ids only; `src/util/get-image.ts` resolves folder, file and dimensions
  from the registry (`src/util/images.ts`) and is the only place that builds a CDN URL. `/images/`
  (noindex, excluded from the sitemap) renders the catalogue with per-page usage.
- New assets: `imgcli sync <dir> sy-serendipity/` or `imgcli upload <file> sy-serendipity/`
  (see the `/img` skill), never a raw CDN path in a page.
- The hero video still streams from ImageKit; imgproxy is image-only.
- Charter requests: island → `/api/request` (Netlify Function) → email-gateway
  `POST /sy-serendipity` (repo `email-gateway`, deployed on the VPS by RollHook on push).
  Template lives there, not here. Receiver/sender addresses are env on the VPS
  (`vps/apps/email-gateway/.env.tpl`).

## Analytics (Umami)

Self-hosted Umami, cookie-free. The tracker script lives in `src/components/Analytics.astro`
(production builds only, not under `astro dev`); the event catalog and the website id live in
`src/util/analytics.ts`. Tracker and recorder load same-origin from `/u/p.js` and
`/u/recorder.js` (ad-blocker resilience): `public/_redirects` proxies exactly five paths to Umami
(`/u/p.js`, `/u/recorder.js`, `/u/api/p`, `/u/api/record` and the website's `/u/api/websites/<id>/recorder`)
with `200!`, never a wildcard. The scripts derive their endpoints from their own `src`, so a new
Umami endpoint needs a new rule; the adapter appends the `/about/` redirect to the same
`dist/_redirects`. Tracking only runs on the hostnames in its `data-domains`
(`sy-serendipity.org`, `www.`): previews are deliberately untracked; add an alias there only to
debug tracking on it. Event names are defined in the same file; the admin panel maps them to friendly
labels in `src/admin/format.ts`, so a new event needs a label there too.

## Admin panel

`/admin/` (on-demand, `noindex`, `Cache-Control: private, no-store`, excluded from the sitemap):
a one-screen overview for the owners. Visitors, page views, channels, countries, devices,
pages, funnel and clicks come from Umami; the charter-request inbox comes from email-gateway.
Zero client JS, no dependencies, the chart is server-rendered SVG. Code: `src/pages/admin/*`
(login, logout, dashboard) and `src/admin/` (`auth`/`session` cookie, `umami`, `requests`,
`range`, `format`, `chart`, components).

- Auth: `ADMIN_PASSWORD` (constant-time compare) → HMAC-SHA256-signed cookie `sy_admin`
  (`ADMIN_SESSION_SECRET`, 30 days, HttpOnly, SameSite=Lax, Path=/admin, Secure except on http).
- Env (schema in `astro.config.ts`, all secrets `optional` so `astro build` works without them,
  the pages then say "not set up yet"): `EMAIL_GATEWAY_READ_KEY`, `UMAMI_API_KEY`,
  `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`; public defaults `UMAMI_URL`, `UMAMI_WEBSITE_ID`
  (and the existing `EMAIL_GATEWAY_URL`). Netlify: site environment variables, scope Functions.
- Scoped keys: email-gateway `SY_SERENDIPITY_READ_KEY` (read-only, `GET /sy-serendipity/requests`)
  → `EMAIL_GATEWAY_READ_KEY`; Umami view-only user `sy-serendipity-viewer` → `UMAMI_API_KEY`.
  Secrets: 1Password `op://common/sy-serendipity-admin` and
  `op://vps/email-gateway/SY_SERENDIPITY_READ_KEY`.
- Netlify Functions read env at deploy time: rotating any admin secret needs a redeploy.
- Each upstream call has an 8 s timeout and the page renders with `Promise.allSettled`: if Umami
  or the gateway is down that block shows a notice, the rest still renders. Ranges are `?range=`
  `7d|30d|90d|12m` (default `30d`, Europe/Madrid days; 12m is monthly).
- `?demo=1` (with any `range`) renders the same page from deterministic fixtures in
  `src/admin/demo.ts` (DTO-identical to the live ones) under an "Example data" banner; an empty
  real period offers a link to it. Real renders collapse blocks without data (only the KPI tiles
  and the requests inbox stay), lists are capped at 5 rows.
- Charts follow the dataviz palette (teal / brass / violet on the paper surface, validated); keep
  new series in that fixed order.

## Deploy

Netlify. Production: `bun run deploy` (`astro build && netlify-cli deploy --prod --dir=dist
--no-build`, needs `NETLIFY_AUTH_TOKEN` and a linked site). Previews build with `PREVIEW=1`
set (`PREVIEW=1 ALIAS=<name> bun run deploy:preview`) so the Layout renders `noindex,
nofollow` and drops the canonical link — production builds (no `PREVIEW`) are unchanged.
→ `https://<name>--sy-serendipity.netlify.app`. `EMAIL_GATEWAY_SECRET_KEY` is a Netlify site
environment variable (scope: Functions), set in the Netlify dashboard.

`/about/` is a 301 redirect to `/` — the About content (accommodation, South Pacific
destinations) now lives on the home page.

Videos ship from `public/video/` as static Netlify assets. Encoding contract for anything
added there: H.264 high profile, `yuv420p`, 1280 px wide, 30 fps, ≤ 9 s, no audio, `+faststart`,
≤ 2.5 MB.
