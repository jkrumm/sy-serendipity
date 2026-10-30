import { navigationLinks, requestLink } from '@/content/navigation'
import type { AnalyticsEvent } from '@/util/analytics'
import { TIMEZONE } from './range'

const number = new Intl.NumberFormat('en-GB')

export function formatCount(value: number): string {
  return number.format(value)
}

export function formatPercent(value: number): string {
  const rounded = value >= 10 ? Math.round(value) : Math.round(value * 10) / 10
  return `${rounded}%`
}

export function percentOf(part: number, whole: number): number | null {
  return whole > 0 ? (part / whole) * 100 : null
}

/** "2m 10s", "45s", "1h 5m". */
export function formatDuration(totalSeconds: number): string {
  const seconds = Math.round(totalSeconds)
  if (seconds < 60) return `${seconds}s`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ${String(seconds % 60)}s`
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`
}

/** Average visit length in seconds, or null without visits. */
export function averageVisitSeconds(totalTime: number, visits: number): number | null {
  return visits > 0 ? totalTime / visits : null
}

export type Delta = {
  direction: 'up' | 'down' | 'flat'
  /** "12%" or "0.4 pts". */
  text: string
}

/** Relative change in percent; null when there is nothing to compare against. */
function deltaPercent(current: number, previous: number): number | null {
  if (previous <= 0) return null
  return ((current - previous) / previous) * 100
}

function toDelta(change: number | null, suffix: string, digits: number): Delta | null {
  if (change === null) return null
  const factor = 10 ** digits
  const rounded = Math.round(Math.abs(change) * factor) / factor
  if (rounded === 0) return { direction: 'flat', text: `0${suffix}` }
  return { direction: change > 0 ? 'up' : 'down', text: `${rounded}${suffix}` }
}

export function relativeDelta(current: number, previous: number): Delta | null {
  return toDelta(deltaPercent(current, previous), '%', 0)
}

/** Difference between two percentages, in percentage points. */
export function pointsDelta(current: number | null, previous: number | null): Delta | null {
  if (current === null || previous === null) return null
  return toDelta(current - previous, ' pts', 1)
}

/** Share of the first step, for the funnel. */
export function funnelShares(counts: number[]): (number | null)[] {
  const first = counts[0] ?? 0
  return counts.map((count) => percentOf(count, first))
}

/* ---------- friendly names ---------- */

const PAGE_LABELS = new Map<string, string>([
  ...navigationLinks.map(({ href, label }) => [href, label] as const),
  [requestLink.href, requestLink.label],
  ['/', 'Yacht (home page)'],
  ['/legal-disclaimer/', 'Legal disclaimer'],
])

export function pageLabel(path: string): string {
  const clean = path.split(/[?#]/)[0] ?? path
  const normalised = clean.endsWith('/') ? clean : `${clean}/`
  return PAGE_LABELS.get(normalised) ?? path
}

const EVENT_LABELS: Record<AnalyticsEvent, string> = {
  'request-cta': "Clicked 'Request A Charter'",
  'request-form-start': 'Started the request form',
  'request-dates-selected': 'Picked travel dates',
  'request-submit': 'Sent a request',
  'request-error': 'Request form error',
  'gallery-open': 'Opened a photo',
  'gallery-chapter': 'Jumped to a gallery chapter',
  'phone-click': 'Tapped the phone number',
  'email-click': 'Tapped the e-mail address',
  'outbound-click': 'Followed an external link',
}

export function eventLabel(name: string): string {
  return (EVENT_LABELS as Record<string, string | undefined>)[name] ?? name
}

const CHANNEL_LABELS: Record<string, string> = {
  direct: 'Typed the address or bookmark',
  organicsearch: 'Search engines',
  paidsearch: 'Paid search',
  organicsocial: 'Social media',
  paidsocial: 'Paid social',
  social: 'Social media',
  referral: 'Links on other websites',
  email: 'E-mail',
  sms: 'Text message',
  organicshopping: 'Shopping sites',
  paidshopping: 'Paid shopping',
  organicvideo: 'Video sites',
  paidvideo: 'Paid video',
  affiliate: 'Partner links',
  display: 'Display ads',
}

export function channelLabel(name: string): string {
  const known = CHANNEL_LABELS[name.replace(/[^a-z]/gi, '').toLowerCase()]
  if (known) return known
  const words = name
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_]/g, ' ')
    .toLowerCase()
  return words.charAt(0).toUpperCase() + words.slice(1)
}

export function referrerLabel(domain: string): string {
  return domain.replace(/^www\./, '')
}

export type DeviceKind = 'phone' | 'desktop' | 'tablet' | 'other'
export const DEVICE_ORDER: DeviceKind[] = ['phone', 'desktop', 'tablet', 'other']
export const DEVICE_LABELS: Record<DeviceKind, string> = {
  phone: 'Phone',
  desktop: 'Desktop',
  tablet: 'Tablet',
  other: 'Other',
}

export function deviceKind(name: string): DeviceKind {
  switch (name.toLowerCase()) {
    case 'mobile':
      return 'phone'
    case 'desktop':
    case 'laptop':
      return 'desktop'
    case 'tablet':
      return 'tablet'
    default:
      return 'other'
  }
}

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })

export function countryName(code: string): string {
  try {
    return regionNames.of(code.toUpperCase()) ?? code
  } catch {
    return code
  }
}

export function flagEmoji(code: string): string {
  if (!/^[a-z]{2}$/i.test(code)) return ''
  return String.fromCodePoint(
    ...code
      .toUpperCase()
      .split('')
      .map((char) => 0x1f1e6 + char.charCodeAt(0) - 65),
  )
}

/* ---------- links ---------- */

const EMAIL_ADDRESS = /^[A-Za-z0-9._+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

/** `mailto:` link for a sender's address, or undefined unless it is a plain address (no header injection via `?bcc=`). */
export function mailtoHref(email: string | null, subject: string): string | undefined {
  if (!email || !EMAIL_ADDRESS.test(email)) return undefined
  return `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}`
}

/* ---------- dates ---------- */

const relative = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
const absolute = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: TIMEZONE,
})
const travelDay = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  timeZone: 'UTC',
})
const travelDayYear = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

export function formatDateTime(iso: string): string {
  const date = new Date(iso)
  return Number.isNaN(date.getTime()) ? iso : absolute.format(date)
}

export function relativeTime(iso: string, now: number = Date.now()): string {
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return iso
  const seconds = Math.round((then - now) / 1000)
  const abs = Math.abs(seconds)
  if (abs < 60) return 'just now'
  if (abs < 3600) return relative.format(Math.round(seconds / 60), 'minute')
  if (abs < 86400) return relative.format(Math.round(seconds / 3600), 'hour')
  if (abs < 86400 * 14) return relative.format(Math.round(seconds / 86400), 'day')
  if (abs < 86400 * 60) return relative.format(Math.round(seconds / (86400 * 7)), 'week')
  return relative.format(Math.round(seconds / (86400 * 30)), 'month')
}

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

/** Understands `2027-06-12` and the form's `Sat Jun 12 2027`; anything else is left as text. */
function parseDay(value: string | null): Date | null {
  if (!value) return null
  const iso = /^(\d{4})-(\d{2})-(\d{2})/.exec(value)
  if (iso) return new Date(Date.UTC(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3])))
  const text = /^[A-Za-z]{3} ([A-Za-z]{3}) (\d{1,2}) (\d{4})$/.exec(value)
  const month = MONTHS.indexOf((text?.[1] ?? '').toLowerCase())
  if (!text || month < 0) return null
  return new Date(Date.UTC(Number(text[3]), month, Number(text[2])))
}

/** "12 Jun – 19 Jun 2027", falling back to whatever text was submitted. */
export function formatTravelDates(arrival: string | null, departure: string | null): string | null {
  const from = parseDay(arrival)
  const to = parseDay(departure)
  if (from && to) return `${travelDay.format(from)} – ${travelDayYear.format(to)}`
  if (from && !departure) return `From ${travelDayYear.format(from)}`
  if (to && !arrival) return `Until ${travelDayYear.format(to)}`
  return [arrival, departure].filter(Boolean).join(' – ') || null
}
