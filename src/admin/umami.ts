import { UMAMI_API_KEY, UMAMI_URL, UMAMI_WEBSITE_ID } from 'astro:env/server';
import type { AnalyticsEvent } from '@/util/analytics';
import { fetchJson, NotConfiguredError } from './http';
import { TIMEZONE, type DateRange } from './range';

export type Totals = {
  visitors: number;
  pageviews: number;
  visits: number;
  bounces: number;
  /** Seconds, summed over all visits. */
  totaltime: number;
};

export type Metric = { key: string; value: number };
export type SeriesPoint = { key: string; visitors: number; pageviews: number };
export type FunnelStep = { label: string; visitors: number };

/** Every block is `null` when its own request failed, so one slow endpoint hides only itself. */
export type AnalyticsOverview = {
  totals: { current: Totals; previous: Totals } | null;
  /** One point per bucket of the range, zero-filled. */
  series: SeriesPoint[] | null;
  activeVisitors: number | null;
  channels: Metric[] | null;
  referrers: Metric[] | null;
  countries: Metric[] | null;
  devices: Metric[] | null;
  pages: Metric[] | null;
  events: Metric[] | null;
  funnel: FunnelStep[] | null;
};

type FunnelStepDefinition = {
  label: string;
} & ({ type: 'path'; value: string } | { type: 'event'; value: AnalyticsEvent });

const FUNNEL_STEPS: FunnelStepDefinition[] = [
  { label: 'Visited the site', type: 'path', value: '/*' },
  { label: 'Opened the request page', type: 'path', value: '/request*' },
  { label: 'Started the form', type: 'event', value: 'request-form-start' },
  { label: 'Sent a request', type: 'event', value: 'request-submit' },
];
const FUNNEL_WINDOW_MINUTES = 1440;

type StatsResponse = Totals & { comparison: Totals };
type PageviewsResponse = {
  pageviews: { x: string; y: number }[];
  sessions: { x: string; y: number }[];
};
type MetricsResponse = { x: string | null; y: number }[];
type FunnelResponse = { visitors: number }[];

function cleanTotals(raw: Partial<Totals> | undefined): Totals {
  return {
    visitors: raw?.visitors ?? 0,
    pageviews: raw?.pageviews ?? 0,
    visits: raw?.visits ?? 0,
    bounces: raw?.bounces ?? 0,
    totaltime: raw?.totaltime ?? 0,
  };
}

export async function getAnalytics(range: DateRange): Promise<AnalyticsOverview> {
  if (!UMAMI_API_KEY) throw new NotConfiguredError('UMAMI_API_KEY');
  const key = UMAMI_API_KEY;
  const base = `${UMAMI_URL}/api/websites/${UMAMI_WEBSITE_ID}`;
  const period = { startAt: String(range.startAt), endAt: String(range.endAt) };

  const get = <T>(path: string, params: Record<string, string> = {}) => {
    const url = new URL(`${base}/${path}`);
    for (const [name, value] of Object.entries({ ...period, ...params })) {
      url.searchParams.set(name, value);
    }
    return fetchJson<T>(url, key);
  };
  const metrics = async (type: string, limit: number): Promise<Metric[]> => {
    const rows = await get<MetricsResponse>('metrics', { type, limit: String(limit) });
    return rows.flatMap((row) => (row.x ? [{ key: row.x, value: row.y }] : []));
  };

  const [stats, pageviews, active, channels, referrers, countries, devices, pages, events, funnel] =
    await Promise.allSettled([
      get<StatsResponse>('stats', { compare: 'prev' }),
      get<PageviewsResponse>('pageviews', { unit: range.unit, timezone: TIMEZONE }),
      fetchJson<{ visitors: number }>(`${base}/active`, key),
      metrics('channel', 10),
      metrics('referrer', 5),
      metrics('country', 5),
      metrics('device', 10),
      metrics('path', 5),
      metrics('event', 5),
      get<FunnelResponse>('funnels/stats', {
        timezone: TIMEZONE,
        window: String(FUNNEL_WINDOW_MINUTES),
        steps: JSON.stringify(FUNNEL_STEPS.map(({ type, value }) => ({ type, value }))),
      }),
    ]);

  const value = <T>(result: PromiseSettledResult<T>): T | null => {
    if (result.status === 'fulfilled') return result.value;
    console.error('[admin] Umami request failed:', result.reason);
    return null;
  };

  const statsValue = value(stats);
  const pageviewsValue = value(pageviews);
  const funnelValue = value(funnel);
  const bucketLength = range.unit === 'day' ? 10 : 7;

  return {
    totals: statsValue
      ? { current: cleanTotals(statsValue), previous: cleanTotals(statsValue.comparison) }
      : null,
    series: pageviewsValue ? fillSeries(range, pageviewsValue, bucketLength) : null,
    activeVisitors: value(active)?.visitors ?? null,
    channels: value(channels),
    referrers: value(referrers),
    countries: value(countries),
    devices: value(devices),
    pages: value(pages),
    events: value(events),
    funnel: funnelValue
      ? FUNNEL_STEPS.map((step, index) => ({
          label: step.label,
          visitors: funnelValue[index]?.visitors ?? 0,
        }))
      : null,
  };
}

function fillSeries(range: DateRange, data: PageviewsResponse, keyLength: number): SeriesPoint[] {
  const visitors = new Map(data.sessions.map(({ x, y }) => [x.slice(0, keyLength), y]));
  const pageviews = new Map(data.pageviews.map(({ x, y }) => [x.slice(0, keyLength), y]));
  return range.buckets.map(({ key }) => ({
    key,
    visitors: visitors.get(key) ?? 0,
    pageviews: pageviews.get(key) ?? 0,
  }));
}
