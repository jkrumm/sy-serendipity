# Redesign notes

Large photographs show Serendipity I and her cruising areas.
Factual copy describes the accommodation, crew, equipment and destinations.
The main action is a charter enquiry through Ocean Independence.

- **Type:** existing self-hosted Addington Regular for display, Brown Regular/Bold for body.
  Display scales from 48–60 px on phones to 76–112 px on large screens; body is 16–18 px.
- **Colour:** sailcloth `#f5f2eb`, ink `#203b3e`, muted text `#56615d`, rules `#d7d8cf`,
  and a restrained ochre `#95754d` for focus and accents.
- **Spacing:** 24 px phone gutters, 64 px desktop gutters, 1312 px maximum content width;
  72/112 px section spacing. Fine rules replace boxes. No automatic motion or carousels.
- **Navigation:** sticky paper header, original brand mark, five discovery links and Request.
  Mobile Request stays visible; the disclosure supports keyboard use and Escape.
- **Home:** a side-on sailing photograph on desktop and an aerial portrait on phones.
  The hero states the yacht name, type and cruising area, with one charter invitation.
  Yacht facts lead into accommodation, decks, South Pacific destinations and service.
  Hero and lower-page film controls open the original video in a keyboard-accessible dialog;
  neither video nor poster loads beforehand.
- **About:** large aft-deck, cabin and yoga photographs; full accommodation details, equipment
  list, cruising areas, design credits and technical facts remain available in distinct sections.
- **Crew:** Scott and Renee retain their biographies; Max has the new client introduction.
  Portrait 24 uses a tight 400 × 360 crop from the top, removing the chest sticker.
- **Gallery:** 36 selected photographs in five chapters. The six-photo Yacht chapter opens
  first; All photographs exposes the complete selection. Static HTML shows the initial photos;
  the existing lightbox supplies keyboard navigation and full-size responsive images.
- **Technical:** grouped specification tables, complete uncropped drawings and wheelhouse details.
- **Request:** email is the only required field; dates, guests and phone preference are optional.
  The calendar adapts to its available width. Native country selection retains phone formatting
  without third-party flag images. Existing API fields, honeypot and server validation remain.
  Submission waits for hydration; a POST default protects entered details, with a broker call
  fallback when scripts are unavailable.
  Guests name their destination directly; dates no longer infer a cruising region.
  Barbara Mueller's portrait uses the `broker` folder and is capped at 160 px.
- **Legal / 404:** the same typography and spacing, with useful recovery links on the 404 page.

## Content and photography

Copy and named photograph selections live in `src/content/{home,about,crew,gallery,technical,request}.ts`.
Legal and 404 copy are small frontmatter objects in their page files. Shared invitation copy is
in `CharterCta.astro`; navigation and footer text are in their corresponding components.
The September client copy replaces the old seasonal itinerary with the South Pacific until
summer 2028 across home, About, Request, footer and metadata. Captain/stewardess histories stay.
`HOME_DESTINATION_IMAGES` selects photos 03, 02 and 12 in that order, with 03 opening the
destinations section at full width. About's named
cruising slots hold the waterfall and reef imagery; Cook Islands/Fiji slots await verified photos.
Max's portrait is selected in `crewImages`. The destination photos and Max's portrait use the
`polynesia` folder through `get-image.ts`, with responsive crops and source-size caps.
Hero stills are in `home.hero.desktop/mobile`; the film and poster are `home.film.source/image`.
Each is a single named choice. The existing film stays; the unhosted new videos are excluded.
No runtime dependency was added.
Decorative captions and taglines have been removed. Remaining photo labels describe places,
rooms, equipment or activities; introductions and form messages use factual language.

## Verification and remaining source questions

All eight routes were reviewed at 390 and 1440 px, including full-page captures. Navigation,
gallery filters, lightbox keys, film dialog, form validation and submission states were exercised.
Additional bounds checks cover every route at 360, 768 and 1920 px.
The four required project checks pass. An existing unused-type hint in `Container.astro` remains.
Production Lighthouse mobile: performance 98, accessibility 100, LCP 2.430 s, CLS 0, TBT 0.
Home has no external JavaScript requests; its inline scripts total about 0.54 KB gzipped.
This cold-cache audit uses simulated mobile throttling and a local production origin; deployed
edge latency can change the result. The original film is retained and loads only on request.

About retains interior design by Perini Navi; Technical retains “km design”. About retains
“1,100 hp each” while Technical retains engine and total power of 1100 hp. Both need confirmation.
Legal telephone and company-registration placeholders remain; no missing legal facts or privacy
terms were invented. The three named crew profiles remain within the stated seven-person crew.
The live request API test was accepted with HTTP 200 once; later form checks used mocked replies.
