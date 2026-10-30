export const TIMEZONE = 'Europe/Madrid'

export const RANGE_KEYS = ['7d', '30d', '90d', '12m'] as const
export type RangeKey = (typeof RANGE_KEYS)[number]
export const DEFAULT_RANGE: RangeKey = '30d'

const RANGE_META: Record<
  RangeKey,
  { tab: string; label: string; previousLabel: string; unit: 'day' | 'month'; length: number }
> = {
  '7d': {
    tab: 'Last 7 days',
    label: 'last 7 days',
    previousLabel: 'previous 7 days',
    unit: 'day',
    length: 7,
  },
  '30d': {
    tab: '30 days',
    label: 'last 30 days',
    previousLabel: 'previous 30 days',
    unit: 'day',
    length: 30,
  },
  '90d': {
    tab: '90 days',
    label: 'last 90 days',
    previousLabel: 'previous 90 days',
    unit: 'day',
    length: 90,
  },
  '12m': {
    tab: '12 months',
    label: 'last 12 months',
    previousLabel: 'previous 12 months',
    unit: 'month',
    length: 12,
  },
}

export type Bucket = {
  /** `YYYY-MM-DD` (day) or `YYYY-MM` (month), in the site's time zone. */
  key: string
  /** Short axis label, e.g. "1 Oct" or "Oct". */
  label: string
  /** Tooltip label, e.g. "Mon 1 Oct 2026" or "Oct 2026". */
  longLabel: string
}

export type DateRange = {
  key: RangeKey
  tab: string
  label: string
  previousLabel: string
  unit: 'day' | 'month'
  /** Unix milliseconds. */
  startAt: number
  endAt: number
  previousStartAt: number
  previousEndAt: number
  buckets: Bucket[]
}

export function parseRangeKey(value: string | null | undefined): RangeKey {
  return RANGE_KEYS.find((key) => key === value) ?? DEFAULT_RANGE
}

export function rangeTabs(): { key: RangeKey; tab: string }[] {
  return RANGE_KEYS.map((key) => ({ key, tab: RANGE_META[key].tab }))
}

const partsFormat = new Intl.DateTimeFormat('en-CA', {
  timeZone: TIMEZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
})

function zonedParts(ms: number) {
  const parts = Object.fromEntries(
    partsFormat.formatToParts(new Date(ms)).map((part) => [part.type, Number(part.value)]),
  )
  return {
    y: parts.year,
    m: parts.month,
    d: parts.day,
    h: parts.hour,
    min: parts.minute,
    s: parts.second,
  }
}

/** Offset of the site time zone from UTC at an instant, in milliseconds. */
function zoneOffset(ms: number): number {
  const { y, m, d, h, min, s } = zonedParts(ms)
  return Date.UTC(y, m - 1, d, h, min, s) - Math.floor(ms / 1000) * 1000
}

/** Start of a calendar day in the site time zone. Day/month overflow is normalised. */
export function zonedMidnight(y: number, m: number, d: number): number {
  const guess = Date.UTC(y, m - 1, d)
  return guess - zoneOffset(guess - zoneOffset(guess))
}

const dayLabel = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  timeZone: 'UTC',
})
const dayLongLabel = new Intl.DateTimeFormat('en-GB', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})
const monthLabel = new Intl.DateTimeFormat('en-GB', { month: 'short', timeZone: 'UTC' })
const monthLongLabel = new Intl.DateTimeFormat('en-GB', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

export function resolveRange(key: RangeKey, now: number = Date.now()): DateRange {
  const meta = RANGE_META[key]
  const { y, m, d } = zonedParts(now)
  const { length, unit } = meta

  if (unit === 'day') {
    const startAt = zonedMidnight(y, m, d - (length - 1))
    const buckets = Array.from({ length }, (_, i) => {
      const date = new Date(Date.UTC(y, m - 1, d - (length - 1) + i))
      return {
        key: date.toISOString().slice(0, 10),
        label: dayLabel.format(date),
        longLabel: dayLongLabel.format(date),
      }
    })
    return {
      key,
      tab: meta.tab,
      label: meta.label,
      previousLabel: meta.previousLabel,
      unit,
      startAt,
      endAt: now,
      previousStartAt: zonedMidnight(y, m, d - (2 * length - 1)),
      previousEndAt: startAt - 1,
      buckets,
    }
  }

  const startAt = zonedMidnight(y, m - (length - 1), 1)
  const buckets = Array.from({ length }, (_, i) => {
    const date = new Date(Date.UTC(y, m - 1 - (length - 1) + i, 1))
    return {
      key: date.toISOString().slice(0, 7),
      label: monthLabel.format(date),
      longLabel: monthLongLabel.format(date),
    }
  })
  return {
    key,
    tab: meta.tab,
    label: meta.label,
    previousLabel: meta.previousLabel,
    unit,
    startAt,
    endAt: now,
    previousStartAt: zonedMidnight(y, m - (2 * length - 1), 1),
    previousEndAt: startAt - 1,
    buckets,
  }
}

/** Bucket key (in the site time zone) an instant falls into. */
export function bucketKey(ms: number, unit: 'day' | 'month'): string {
  const { y, m, d } = zonedParts(ms)
  const month = String(m).padStart(2, '0')
  return unit === 'day' ? `${y}-${month}-${String(d).padStart(2, '0')}` : `${y}-${month}`
}

export function periodOf(range: DateRange, ms: number): 'current' | 'previous' | null {
  if (ms >= range.startAt && ms <= range.endAt) return 'current'
  if (ms >= range.previousStartAt && ms <= range.previousEndAt) return 'previous'
  return null
}
