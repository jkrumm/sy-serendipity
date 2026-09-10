# SY Serendipity

Marketing site for the charter sailing yacht SY Serendipity I — <https://sy-serendipity.org>.

Astro 7 renders every page at build time, React 19 islands hydrate only the three interactive
spots (gallery lightbox, request form, image carousels). The single server-side piece is
`src/pages/api/request.ts`, a Worker route that forwards charter requests to bun-email-api
so the bearer key never reaches the browser. No CMS.

## Stack

| Concern      | Choice                                                                                                                              |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| Framework    | Astro 7, `output: 'static'`, directory URLs (`/about/`)                                                                             |
| Islands      | React 19 via `@astrojs/react` — `src/islands/*.tsx` only                                                                            |
| Styles       | SCSS modules per page/component (`sass-embedded`, `@use`), Tailwind 4 via `@tailwindcss/vite` for the few utility spots             |
| Images       | ImageKit transform URLs, built by the single seam `src/util/get-image.ts`                                                           |
| Carousel     | `embla-carousel-react` + autoplay plugin                                                                                            |
| Gallery      | `react-photo-album` + `yet-another-react-lightbox`                                                                                  |
| Request form | `react-day-picker` (range), `react-international-phone`; posts to `/api/request`, an on-demand route that forwards to bun-email-api |
| Hosting      | Cloudflare Workers static assets (`wrangler.jsonc`), no adapter                                                                     |
| Runtime / PM | Bun                                                                                                                                 |

## Develop

```sh
bun install
bun run dev        # https://sy-serendipity.test (Caddy) / http://localhost:7734
bun run build      # dist/
bun run preview
bun run check      # astro check (types)
bun run lint       # eslint, incl. .astro
bun run format
```

Env:

- `.env` (see `.env.example`): `PUBLIC_GA_TRACKING_ID` — when set, the Layout injects gtag.
- `.dev.vars` (see `.dev.vars.example`): `BEA_SECRET_KEY` for the request route under `astro dev`.
  `BEA_BASE_URL` is a plain var in `wrangler.jsonc`, secrets are declared there under
  `secrets.required`. In production the key is a Worker secret:
  `bunx wrangler secret put BEA_SECRET_KEY` (value from `op://vps/bun-email-api/SECRET_KEY`).

## Deploy

Two lanes, both driven by `wrangler.jsonc`:

- **Workers Builds (default)** — connect the GitHub repo in the Cloudflare dashboard
  (Workers & Pages → Create → Import a repository). Build command `bun run build`, deploy
  command `bunx wrangler deploy`. Every push to `master` deploys; the custom domain route
  in `wrangler.jsonc` binds `sy-serendipity.org` once the zone lives on Cloudflare.
- **Manual** — `bun run deploy` (`astro build && wrangler deploy`) with a logged-in wrangler.

## Layout

```
src/
  layouts/Layout.astro    head (SEO, GA), nav, footer, global CSS
  components/*.astro      static building blocks + their .module.scss
  islands/*.tsx           React, hydrated with client:* directives
  pages/*.astro           one file per route + its .module.scss
  styles/                 global.scss, overrides.scss, variables.scss, tailwind.css
  pages/api/request.ts    on-demand Worker route -> bun-email-api /sy-serendipity
  util/get-image.ts       every image URL on the site goes through here (img.jkrumm.com, imgproxy)
  util/images.ts          gallery image list with intrinsic sizes
public/                   fonts, favicon, robots.txt
```
