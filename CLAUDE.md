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
- `/api/request` reads `BEA_BASE_URL` / `BEA_SECRET_KEY` via `astro:env/server` (schema in
  `astro.config.ts`), sourced from `.env` (gitignored, see `.env.example`) under `astro dev`
  and from Netlify's site environment variables (scope: Functions) in production. Restart
  the pane after editing `.env`.
- Verify the form end to end:
  ```bash
  curl -s -X POST http://localhost:7734/api/request -H 'Content-Type: application/json' \
    -d '{"email":"test@example.com","firstName":"Test","message":"hello"}'   # → {"ok":true}
  ```
  That sends a real mail through bun-email-api to the configured receiver.

## Validation

`bun run check`, `bun run lint`, `bun run format:check`, `bun run build`. All four must pass
before a commit. `/check` covers them.

## Images and email

- Every image URL goes through `src/util/get-image.ts` (img.jkrumm.com, prefix
  `sy-serendipity/`, imgproxy options). New assets: `imgcli sync <dir> sy-serendipity/`
  or `imgcli upload <file> sy-serendipity/` (see the `/img` skill), never a raw CDN path in a page.
- The hero video still streams from ImageKit; imgproxy is image-only.
- Charter requests: island → `/api/request` (Netlify Function) → bun-email-api
  `POST /sy-serendipity` (repo `bun-email-api`, deployed on the VPS by RollHook on push).
  Template lives there, not here. Receiver/sender addresses are env on the VPS
  (`vps/apps/bun-email-api/.env.tpl`).

## Deploy

Netlify. Production: `bun run deploy` (`astro build && netlify-cli deploy --prod --dir=dist
--no-build`, needs `NETLIFY_AUTH_TOKEN` and a linked site). Previews:
`ALIAS=<name> bun run deploy:preview` → `https://<name>--sy-serendipity.netlify.app`.
`BEA_SECRET_KEY` is a Netlify site environment variable (scope: Functions), set in the
Netlify dashboard.
