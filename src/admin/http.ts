const TIMEOUT_MS = 8000

/** A required secret is missing; the page shows a "not configured" notice instead of an error. */
export class NotConfiguredError extends Error {}

export async function fetchJson<T>(url: URL | string, token: string): Promise<T> {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  })
  if (!response.ok) throw new Error(`Upstream responded ${response.status}`)
  return (await response.json()) as T
}
