# SY Serendipity

Marketing site for the charter sailing yacht SY Serendipity I — <https://sy-serendipity.org>.

Astro 7 renders every page at build time, React 19 islands hydrate only the three interactive
spots (gallery lightbox, request form, image carousels). The single server-side piece is
`src/pages/api/request.ts`, an on-demand Netlify Function that forwards charter requests to bun-email-api
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
| Hosting      | Netlify — static assets + one Netlify Function for /api/request (@astrojs/netlify)                                                  |
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
  `BEA_BASE_URL` / `BEA_SECRET_KEY` carry the request route under `astro dev`. In production
  `BEA_SECRET_KEY` is a Netlify site environment variable (scope: Functions).

## Deploy

- **Production** — `bun run deploy` (needs `NETLIFY_AUTH_TOKEN`, site `sy-serendipity`,
  `netlify link` once).
- **Preview** — `ALIAS=fable bun run deploy:preview` → `https://fable--sy-serendipity.netlify.app`.
- The domain sy-serendipity.org already points at Netlify (DNS at the registrar, www CNAME →
  sy-serendipity.netlify.app).

## Layout

```
src/
  layouts/Layout.astro    head (SEO, GA), nav, footer, global CSS
  components/*.astro      static building blocks + their .module.scss
  islands/*.tsx           React, hydrated with client:* directives
  pages/*.astro           one file per route + its .module.scss
  styles/                 global.scss, overrides.scss, variables.scss, tailwind.css
  pages/api/request.ts    on-demand Netlify Function -> bun-email-api /sy-serendipity
  util/get-image.ts       every image URL on the site goes through here (img.jkrumm.com, imgproxy)
  util/images.ts          gallery image list with intrinsic sizes
public/                   fonts, favicon, robots.txt
```
