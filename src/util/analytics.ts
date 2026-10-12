// Self-hosted Umami. The website id is public; tracking is limited to `domains` (the tracker's `data-domains`).
export const ANALYTICS = {
  websiteId: '3e37cbbd-85d5-450c-b1d4-3c1900897644',
  trackerSrc: 'https://umami.jkrumm.com/p.js',
  recorderSrc: 'https://umami.jkrumm.com/recorder.js',
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
