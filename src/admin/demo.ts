/**
 * Example data for `/admin/?demo=1`: shaped exactly like the live overviews so the page takes the
 * same code path. Deterministic: values come from a seeded generator keyed by the bucket, never from
 * `Math.random`, so a reload (and every range that covers the same day) shows the same numbers.
 * Names, e-mail addresses and phone numbers are fictional.
 */
import type { DateRange } from './range'
import type { CharterRequest, RequestsOverview } from './requests'
import type { AnalyticsOverview, Metric, SeriesPoint, Totals } from './umami'

/** mulberry32 over an FNV-1a hash of the seed text. */
function seeded(seed: string): () => number {
  let h = 2166136261
  for (const char of seed) h = Math.imul(h ^ char.charCodeAt(0), 16777619)
  let a = h >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Sun..Sat: people browse yachts in the evening and at weekends. */
const WEEKDAY_FACTOR = [1.35, 1, 0.75, 0.75, 0.85, 0.95, 1.2]
/** Days before today that got a mention somewhere (a broker newsletter, an Instagram story). */
const SPIKES = new Map([
  [3, 1.9],
  [19, 2.1],
  [44, 1.8],
  [71, 2],
])
const PAGES_PER_VISITOR = 2.3
const VISITS_PER_VISITOR = 1.12
const SECONDS_PER_VISIT = 158

function dailyVisitors(key: string, daysAgo: number): number {
  const weekday = new Date(`${key}T00:00:00Z`).getUTCDay()
  const base = 7 + 4 * (1 - Math.min(daysAgo, 90) / 90)
  const noise = 0.85 + 0.3 * seeded(`day-${key}`)()
  const value = base * (WEEKDAY_FACTOR[weekday] ?? 1) * noise * (SPIKES.get(daysAgo) ?? 1)
  return Math.min(18, Math.max(3, Math.round(value)))
}

function monthlyVisitors(key: string, monthsAgo: number): number {
  const noise = 0.9 + 0.2 * seeded(`month-${key}`)()
  return Math.round((265 - monthsAgo * 20) * noise)
}

function seriesFor(range: DateRange): SeriesPoint[] {
  const last = range.buckets.length - 1
  return range.buckets.map(({ key }, index) => {
    const ago = last - index
    const visitors = range.unit === 'day' ? dailyVisitors(key, ago) : monthlyVisitors(key, ago)
    const pageviews = Math.round(visitors * PAGES_PER_VISITOR * (0.9 + 0.2 * seeded(key)()))
    return { key, visitors, pageviews }
  })
}

function totalsFor(visitors: number): Totals {
  const visits = Math.round(visitors * VISITS_PER_VISITOR)
  return {
    visitors,
    pageviews: Math.round(visitors * PAGES_PER_VISITOR),
    visits,
    bounces: Math.round(visits * 0.5),
    totaltime: visits * SECONDS_PER_VISIT,
  }
}

/** Largest-remainder split so the shares always add up to `total`. */
function split(total: number, shares: [string, number][]): Metric[] {
  const sum = shares.reduce((acc, [, share]) => acc + share, 0)
  const exact = shares.map(([key, share]) => ({ key, raw: (share / sum) * total }))
  const rows = exact.map(({ key, raw }) => ({ key, value: Math.floor(raw), rest: raw % 1 }))
  let left = total - rows.reduce((acc, row) => acc + row.value, 0)
  for (const row of [...rows].sort((a, b) => b.rest - a.rest)) {
    if (left <= 0) break
    row.value += 1
    left -= 1
  }
  return rows.map(({ key, value }) => ({ key, value })).sort((a, b) => b.value - a.value)
}

/** Share of all visitors, at least one. */
function share(visitors: number, fraction: number): number {
  return Math.max(1, Math.round(visitors * fraction))
}

export function getDemoAnalytics(range: DateRange): AnalyticsOverview {
  const series = seriesFor(range)
  const sum = series.reduce((acc, point) => acc + point.visitors, 0)
  const visitors = Math.round(sum * (range.unit === 'day' ? 0.88 : 0.9))
  const previousVisitors = Math.round(visitors * (range.unit === 'day' ? 0.8 : 0.45))

  // Fixed at three requests in every range (see getDemoRequests); the form steps never undercut it.
  const submitted = 3
  const started = Math.max(share(visitors, 0.0375), submitted + 1)
  const opened = Math.max(share(visitors, 0.129), started + 1)

  return {
    totals: { current: totalsFor(visitors), previous: totalsFor(previousVisitors) },
    series,
    activeVisitors: 1,
    channels: split(visitors, [
      ['direct', 38],
      ['organicSearch', 31],
      ['organicSocial', 19],
      ['referral', 12],
    ]),
    referrers: split(share(visitors, 0.62), [
      ['google.com', 42],
      ['instagram.com', 33],
      ['charterworld.com', 25],
    ]),
    countries: split(visitors, [
      ['DE', 34],
      ['US', 22],
      ['GB', 17],
      ['CH', 12],
      ['FR', 8],
      ['AU', 7],
    ]),
    devices: split(visitors, [
      ['mobile', 55],
      ['desktop', 40],
      ['tablet', 5],
    ]),
    pages: [
      ['/', 1],
      ['/gallery/', 0.46],
      ['/technical/', 0.33],
      ['/crew/', 0.24],
      ['/activities/', 0.21],
      ['/request/', 0.129],
    ].map(([key, fraction]) => ({ key: String(key), value: share(visitors, Number(fraction)) })),
    events: [
      ['gallery-open', 0.4],
      ['request-cta', 0.24],
      ['gallery-chapter', 0.17],
      ['outbound-click', 0.045],
      ['phone-click', 0.03],
      ['email-click', 0.02],
      ['request-dates-selected', started - 1],
      ['request-form-start', started],
      ['request-submit', submitted],
      ['request-error', 1],
    ]
      .map(([key, value]) => ({
        key: String(key),
        value: Number(value) < 1 ? share(visitors, Number(value)) : Number(value),
      }))
      .sort((a, b) => b.value - a.value),
    funnel: [
      { label: 'Visited the site', visitors },
      { label: 'Opened the request page', visitors: opened },
      { label: 'Started the form', visitors: started },
      { label: 'Sent a request', visitors: submitted },
    ],
  }
}

function fixtureRequests(range: DateRange): { legit: CharterRequest[]; spam: CharterRequest[] } {
  const span = range.endAt - range.startAt
  /** `age` is how far back into the range the request arrived, 0 = just now, 1 = range start. */
  const at = (age: number) => new Date(range.endAt - age * span).toISOString()
  const travelYear = new Date(range.endAt).getUTCFullYear() + 1
  const empty = {
    delivered: true,
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    numberOfPeople: null,
    destination: null,
    duration: null,
    arrivalDate: null,
    departureDate: null,
    message: null,
  } satisfies Partial<CharterRequest>

  const legit: CharterRequest[] = [
    {
      ...empty,
      id: 'demo-3',
      receivedAt: at(0.06),
      verdict: 'legit',
      firstName: 'Tomas',
      lastName: 'Lindqvist',
      email: 'tomas.lindqvist@example.com',
      message:
        'Hello, is Serendipity I still available in the Cook Islands next winter? Thank you.',
    },
    {
      ...empty,
      id: 'demo-2',
      receivedAt: at(0.38),
      verdict: 'legit',
      firstName: 'Anja',
      lastName: 'Brandt',
      email: 'anja.brandt@example.com',
      phone: '+1 555 0178',
      numberOfPeople: '6',
      destination: 'French Polynesia',
      duration: '8 days',
      arrivalDate: `${travelYear}-07-04`,
      departureDate: `${travelYear}-07-11`,
      message:
        'We are a family of six, two couples and two teenagers, and would love to explore the Society Islands and Tuamotus. Could you send us a sample itinerary and the weekly rate?',
    },
    {
      ...empty,
      id: 'demo-1',
      receivedAt: at(0.74),
      verdict: 'legit',
      firstName: 'Clara',
      lastName: 'Whitfield',
      email: 'clara.whitfield@example.com',
      phone: '+1 555 0142',
      numberOfPeople: '2',
      destination: 'The Pacific',
      duration: '11 days',
      arrivalDate: `${travelYear}-03-14`,
      departureDate: `${travelYear}-03-24`,
      message:
        'We are celebrating our tenth anniversary and are looking for a quiet, private week.',
    },
  ]
  const spam: CharterRequest[] = [
    {
      ...empty,
      id: 'demo-spam',
      receivedAt: at(0.2),
      verdict: 'spam',
      delivered: false,
      firstName: 'SEO',
      lastName: 'Boost',
      email: 'rank-now@example.com',
      message:
        'Guaranteed #1 ranking on Google in 7 days! Cheap SEO packages, reply today: example.com/seo',
    },
  ]
  return { legit, spam }
}

export function getDemoRequests(range: DateRange): RequestsOverview {
  const { legit, spam } = fixtureRequests(range)
  return { requests: legit, filtered: spam, truncated: false, previousCount: 2 }
}
