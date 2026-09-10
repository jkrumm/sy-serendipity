# SY Serendipity

Marketing site for the charter sailing yacht SY Serendipity I — <https://sy-serendipity.org>.

Fully static: Astro 7 renders every page at build time, React 19 islands hydrate only the
three interactive spots (gallery lightbox, request form, image carousels). No CMS, no server.

## Stack

| Concern      | Choice                                                                                                                  |
| ------------ | ----------------------------------------------------------------------------------------------------------------------- |
| Framework    | Astro 7, `output: 'static'`, directory URLs (`/about/`)                                                                 |
| Islands      | React 19 via `@astrojs/react` — `src/islands/*.tsx` only                                                                |
| Styles       | SCSS modules per page/component (`sass-embedded`, `@use`), Tailwind 4 via `@tailwindcss/vite` for the few utility spots |
| Images       | ImageKit transform URLs, built by the single seam `src/util/get-image.ts`                                               |
| Carousel     | `embla-carousel-react` + autoplay plugin                                                                                |
| Gallery      | `react-photo-album` + `yet-another-react-lightbox`                                                                      |
| Request form | `react-day-picker` (range), `react-international-phone`, plain `fetch` to Formspree                                     |
| Hosting      | Cloudflare Workers static assets (`wrangler.jsonc`), no adapter                                                         |
| Runtime / PM | Bun                                                                                                                     |

## Develop

```sh
bun install
bun run dev        # http://localhost:4321
bun run build      # dist/
bun run preview
bun run check      # astro check (types)
bun run lint       # eslint, incl. .astro
bun run format
```

Optional env (see `.env.example`): `PUBLIC_GA_TRACKING_ID` — when set, the Layout injects gtag.

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
  util/get-image.ts       every image URL on the site goes through here
  util/images.ts          gallery image list with intrinsic sizes
public/                   fonts, favicon, robots.txt
```
