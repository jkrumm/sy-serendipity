# sy-serendipity

Marketing site for the charter yacht SY Serendipity I. Astro 7, `output: 'static'` with
`@astrojs/cloudflare` for exactly one on-demand route, React 19 islands, Bun, Tailwind 4,
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

- Port is **7734**, `strictPort`, `bunx kill-port 7734` is baked into `dev` and `preview`.
- Doors: `https://sy-serendipity.test` (Caddy, this machine) and
  `https://sy-serendipity.mini.jkrumm.com` (tailnet, from the mini). Both hostnames are in
  `server.allowedHosts`; add any new one there too.
- Under `astro dev` the adapter runs pages in workerd; `/api/request` reads
  `BEA_BASE_URL` from `wrangler.jsonc` `vars` and `BEA_SECRET_KEY` from `.dev.vars`
  (gitignored, `chmod 600`; `.dev.vars.example` is the template). Restart the pane after
  editing `.dev.vars`.
- Verify the form end to end:
  ```bash
  curl -s -X POST http://localhost:7734/api/request -H 'Content-Type: application/json' \
    -d '{"email":"test@example.com","firstName":"Test","message":"hello"}'   # → {"ok":true}
  ```
  That sends a real mail through bun-email-api to the configured receiver.

## Validation

`bun run check` (runs `wrangler types` first), `bun run lint`, `bun run format:check`,
`bun run build`. All four must pass before a commit. `/check` covers them.

## Images and email

- Every image URL goes through `src/util/get-image.ts` (img.jkrumm.com, prefix
  `sy-serendipity/`, imgproxy options). New assets: `imgcli sync <dir> sy-serendipity/`
  or `imgcli upload <file> sy-serendipity/` (see the `/img` skill), never a raw CDN path in a page.
- The hero video still streams from ImageKit; imgproxy is image-only.
- Charter requests: island → `/api/request` (Worker) → bun-email-api `POST /sy-serendipity`
  (repo `bun-email-api`, deployed on the VPS by RollHook on push). Template lives there,
  not here. Receiver/sender addresses are env on the VPS (`vps/apps/bun-email-api/.env.tpl`).

## Deploy

Cloudflare Workers. `wrangler deploy` follows `.wrangler/deploy/config.json` to the
adapter-generated `dist/server/wrangler.json`, so always `bun run build` first
(`bun run deploy` does both). Production secret: `bunx wrangler secret put BEA_SECRET_KEY`.
The custom-domain route in `wrangler.jsonc` needs the zone on Cloudflare.
