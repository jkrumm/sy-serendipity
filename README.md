# SY Serendipity

Marketing site for the charter sailing yacht SY Serendipity I — <https://sy-serendipity.org>.

Astro 7 renders every page at build time, React 19 islands hydrate only the two interactive
spots (gallery lightbox, request form). The single server-side piece is
`src/pages/api/request.ts`, an on-demand Netlify Function that forwards charter requests to email-gateway
so the bearer key never reaches the browser. No CMS.

## Stack

| Concern      | Choice                                                                                                                              |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| Framework    | Astro 7, `output: 'static'`, directory URLs (`/about/`)                                                                             |
| Islands      | React 19 via `@astrojs/react` — `src/islands/*.tsx` only                                                                            |
| Styles       | SCSS modules per page/component (`sass-embedded`, `@use`), Tailwind 4 via `@tailwindcss/vite` for the few utility spots             |
| Images       | imgproxy URLs on img.jkrumm.com from the registry `src/content/images.json`, built by `src/util/get-image.ts`                       |
| Gallery      | CSS grid + `yet-another-react-lightbox`                                                                                             |
| Request form | `react-day-picker` (range), `react-international-phone`; posts to `/api/request`, an on-demand route that forwards to email-gateway |
| Hosting      | Netlify — static assets + one Netlify Function for /api/request (@astrojs/netlify)                                                  |
| Runtime / PM | Bun                                                                                                                                 |

## Develop

```sh
bun install
bun run dev        # https://sy-serendipity.test (Caddy) / http://localhost:7734
bun run build      # dist/
bun run preview
bun run check      # astro check (types)
bun run lint       # oxlint --type-aware
bun run format     # oxfmt
```

Env:

- `.env` (see `.env.example`): `EMAIL_GATEWAY_URL` / `EMAIL_GATEWAY_SECRET_KEY` carry the request
  route under `astro dev`. In production `EMAIL_GATEWAY_SECRET_KEY` is a Netlify site environment
  variable (scope: Functions). The admin panel adds `EMAIL_GATEWAY_READ_KEY`, `UMAMI_API_KEY`,
  `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` (all optional for builds; Functions scope too), and
  optionally `UMAMI_URL` / `UMAMI_WEBSITE_ID`.
- Analytics is self-hosted Umami: the tracker script in `src/components/Analytics.astro` (production
  builds only) and the event catalog in `src/util/analytics.ts`. No cookies, no env var.

## Deploy

- **Production** — every push to `master` runs `.github/workflows/deploy.yml`: check, lint,
  format, build, then `netlify-cli deploy --prod --no-build` (repo secrets `NETLIFY_AUTH_TOKEN`,
  `NETLIFY_SITE_ID`). Pull requests run the same checks without deploying.
- **Manual** — `bun run deploy` (needs `NETLIFY_AUTH_TOKEN` and `netlify link` once).
- The domain sy-serendipity.org already points at Netlify (DNS at the registrar, www CNAME →
  sy-serendipity.netlify.app).

## Routes

| Route                | Content                                                                  |
| -------------------- | ------------------------------------------------------------------------ |
| `/`                  | Home — hero, yacht facts, accommodation, Pacific destinations, service   |
| `/activities/`       | Activities and equipment                                                 |
| `/crew/`             | Crew biographies                                                         |
| `/gallery/`          | Photo gallery, chapters                                                  |
| `/technical/`        | Specifications                                                           |
| `/request/`          | Charter request form                                                     |
| `/legal-disclaimer/` | Legal / privacy                                                          |
| `/about/`            | 301 redirect to `/` (content merged into home)                           |
| `/admin/`            | Owners' overview: visitors (Umami) and charter requests (e-mail gateway) |
| `404`                | Not found                                                                |

## Layout

```
src/
  layouts/Layout.astro    head (SEO, Umami, robots/canonical), nav, footer, global CSS
  components/*.astro      static building blocks + their .module.scss
  islands/*.tsx           React, hydrated with client:* directives
  pages/*.astro           one file per route + its .module.scss
  styles/                 global.scss, overrides.scss, variables.scss, tailwind.css
  pages/admin/*.astro     on-demand admin panel (login, logout, dashboard)
  admin/                  admin server modules (auth, umami, requests, range, format) + components
  pages/api/request.ts    on-demand Netlify Function -> email-gateway /sy-serendipity
  util/get-image.ts       every image URL on the site goes through here (img.jkrumm.com, imgproxy)
  util/images.ts          typed lookup into the image registry (src/content/images.json)
public/                   fonts, activity video loops, favicon, robots.txt, _redirects
```
