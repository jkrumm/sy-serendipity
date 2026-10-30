import { EMAIL_GATEWAY_READ_KEY, EMAIL_GATEWAY_URL } from 'astro:env/server'
import { fetchJson, NotConfiguredError } from './http'
import { periodOf, type DateRange } from './range'

type Verdict = 'legit' | 'spam' | 'marketing'

export type CharterRequest = {
  id: string
  receivedAt: string
  verdict: Verdict
  delivered: boolean
  firstName: string | null
  lastName: string | null
  email: string | null
  phone: string | null
  numberOfPeople: string | null
  destination: string | null
  duration: string | null
  arrivalDate: string | null
  departureDate: string | null
  message: string | null
}

export type RequestsOverview = {
  /** Genuine requests in the selected range, newest first. */
  requests: CharterRequest[]
  /** Everything the gateway filtered out in the selected range, newest first. */
  filtered: CharterRequest[]
  /** True when the gateway holds more requests than it returned, so older ones are missing. */
  truncated: boolean
  /** Genuine requests in the period right before the range, for the comparison. */
  previousCount: number
}

type GatewayResponse = { requests?: CharterRequest[]; total?: number }

const REQUEST_LIMIT = 200

export async function getRequests(range: DateRange): Promise<RequestsOverview> {
  if (!EMAIL_GATEWAY_READ_KEY) throw new NotConfiguredError('EMAIL_GATEWAY_READ_KEY')

  const url = new URL(`${EMAIL_GATEWAY_URL}/sy-serendipity/requests`)
  url.searchParams.set('since', new Date(range.previousStartAt).toISOString())
  url.searchParams.set('limit', String(REQUEST_LIMIT))
  const data = await fetchJson<GatewayResponse>(url, EMAIL_GATEWAY_READ_KEY)
  const requests = Array.isArray(data.requests) ? data.requests : []
  const truncated = typeof data.total === 'number' && data.total > requests.length

  const current: CharterRequest[] = []
  const filtered: CharterRequest[] = []
  let previousCount = 0
  for (const request of requests) {
    const period = periodOf(range, new Date(request.receivedAt).getTime())
    if (period === 'previous' && request.verdict === 'legit') previousCount += 1
    if (period !== 'current') continue
    ;(request.verdict === 'legit' ? current : filtered).push(request)
  }
  const newestFirst = (a: CharterRequest, b: CharterRequest) =>
    b.receivedAt.localeCompare(a.receivedAt)
  return {
    requests: current.sort(newestFirst),
    filtered: filtered.sort(newestFirst),
    truncated,
    previousCount,
  }
}
