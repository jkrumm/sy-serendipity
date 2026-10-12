import { createHash, createHmac, timingSafeEqual } from 'node:crypto';

export const COOKIE_NAME = 'sy_admin';
export const SESSION_DAYS = 30;
const SESSION_MS = SESSION_DAYS * 24 * 60 * 60 * 1000;

function signature(secret: string, expiry: string): string {
  return createHmac('sha256', secret).update(`${COOKIE_NAME}.${expiry}`).digest('hex');
}

function safeEqual(a: string, b: string): boolean {
  // Hash first so both buffers have equal length; the compare itself is constant-time.
  const left = createHash('sha256').update(a).digest();
  const right = createHash('sha256').update(b).digest();
  return timingSafeEqual(left, right);
}

export function passwordMatches(input: string, expected: string): boolean {
  return safeEqual(input, expected);
}

/** Cookie value: `<expiry ms>.<hex hmac>`. */
export function signSession(secret: string, now: number = Date.now()): string {
  const expiry = String(now + SESSION_MS);
  return `${expiry}.${signature(secret, expiry)}`;
}

export function verifySession(
  secret: string,
  value: string | undefined,
  now: number = Date.now(),
): boolean {
  if (!value) return false;
  const [expiry, sig, ...rest] = value.split('.');
  if (!expiry || !sig || rest.length > 0 || !/^\d+$/.test(expiry)) return false;
  if (!safeEqual(sig, signature(secret, expiry))) return false;
  return Number(expiry) > now;
}

/** `Set-Cookie` header value. `secure` is off only for plain-http local development. */
export function sessionCookie(value: string, secure: boolean): string {
  return cookieHeader(value, SESSION_MS / 1000, secure);
}

export function clearedSessionCookie(secure: boolean): string {
  return cookieHeader('', 0, secure);
}

function cookieHeader(value: string, maxAge: number, secure: boolean): string {
  const parts = [
    `${COOKIE_NAME}=${value}`,
    'Path=/admin',
    `Max-Age=${maxAge}`,
    'HttpOnly',
    'SameSite=Lax',
  ];
  if (secure) parts.push('Secure');
  return parts.join('; ');
}
