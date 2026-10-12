// Self-hosted Umami. The website id is public; tracking is limited to `domains` (the tracker's `data-domains`).
// The scripts load from our own origin under `/u/`: Netlify proxies exactly these paths to Umami
// (`public/_redirects`), so ad blockers that list umami.jkrumm.com do not break tracking. Both scripts
// derive their endpoints from their own `src`, so `/u/p.js` posts to `/u/api/p`, and the recorder
// uses `/u/api/record` and `/u/api/websites/<id>/recorder`: a new endpoint needs a new rule.
export const ANALYTICS = {
  /** Where Umami runs; the browser never talks to it directly, see the proxy note above. */
  origin: 'https://umami.jkrumm.com',
  websiteId: '3e37cbbd-85d5-450c-b1d4-3c1900897644',
  trackerSrc: '/u/p.js',
  recorderSrc: '/u/recorder.js',
  domains: 'sy-serendipity.org,www.sy-serendipity.org,v2--sy-serendipity.netlify.app',
} as const;

/** Event catalog. Never attach names, e-mail addresses, phone numbers or free text. */
export const ANALYTICS_EVENTS = [
  'request-cta',
  'phone-click',
  'email-click',
  'outbound-click',
  'gallery-open',
  'gallery-chapter',
  'slider-use',
  'request-form-start',
  'request-dates-selected',
  'request-submit',
  'request-error',
] as const;

export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[number];

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, string | number>) => void };
  }
}

export function track(event: AnalyticsEvent, data?: Record<string, string | number>) {
  if (typeof window === 'undefined') return;
  window.umami?.track(event, data);
}
