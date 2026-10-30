import { ADMIN_PASSWORD, ADMIN_SESSION_SECRET } from 'astro:env/server'
import {
  clearedSessionCookie,
  passwordMatches,
  sessionCookie,
  signSession,
  verifySession,
  COOKIE_NAME,
} from './session'

export const ADMIN_HEADERS = {
  'Cache-Control': 'private, no-store',
  'X-Robots-Tag': 'noindex, nofollow',
} as const

type AstroLike = {
  cookies: { get(name: string): { value: string } | undefined }
  url: URL
  response: { headers: Headers }
}

/** False when either secret is missing; the login page then explains instead of failing. */
export const isAuthConfigured = Boolean(ADMIN_PASSWORD && ADMIN_SESSION_SECRET)

/** Marks an admin page render as private and not indexable. */
export function applyAdminHeaders(astro: AstroLike): void {
  for (const [name, value] of Object.entries(ADMIN_HEADERS)) astro.response.headers.set(name, value)
}

function isSecure(url: URL): boolean {
  return url.protocol === 'https:'
}

export function hasValidSession(astro: AstroLike): boolean {
  if (!ADMIN_SESSION_SECRET) return false
  return verifySession(ADMIN_SESSION_SECRET, astro.cookies.get(COOKIE_NAME)?.value)
}

export function adminRedirect(to: string, cookie?: string): Response {
  const headers = new Headers({ ...ADMIN_HEADERS, Location: to })
  if (cookie) headers.append('Set-Cookie', cookie)
  return new Response(null, { status: 303, headers })
}

/** Returns a redirect to the login page when there is no valid session, otherwise `undefined`. */
export function requireAdmin(astro: AstroLike): Response | undefined {
  if (hasValidSession(astro)) return undefined
  return adminRedirect('/admin/login/')
}

/** Checks the submitted password; on success returns the redirect that starts the session. */
export function login(astro: AstroLike, password: string): Response | undefined {
  if (!ADMIN_PASSWORD || !ADMIN_SESSION_SECRET) return undefined
  if (!passwordMatches(password, ADMIN_PASSWORD)) return undefined
  return adminRedirect(
    '/admin/',
    sessionCookie(signSession(ADMIN_SESSION_SECRET), isSecure(astro.url)),
  )
}

export function logout(astro: AstroLike): Response {
  return adminRedirect('/admin/login/', clearedSessionCookie(isSecure(astro.url)))
}
