import type { APIRoute } from 'astro';
import { EMAIL_GATEWAY_URL, EMAIL_GATEWAY_SECRET_KEY } from 'astro:env/server';

export const prerender = false;

const FIELDS = [
  'firstName',
  'lastName',
  'email',
  'numberOfPeople',
  'destination',
  'duration',
  'arrivalDate',
  'departureDate',
  'phone',
  'message',
] as const;

type Field = (typeof FIELDS)[number];
type Payload = Record<Field, string | null>;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

function text(data: Record<string, unknown>, key: string, max: number): string | null {
  const value = data[key];
  if (typeof value !== 'string') return null;
  const trimmed = value.trim().slice(0, max);
  return trimmed === '' ? null : trimmed;
}

/** Forwards a charter request to email-gateway, which holds the Resend integration. */
export const POST: APIRoute = async ({ request }) => {
  let data: Record<string, unknown>;
  try {
    data = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ errors: [{ message: 'Invalid request body.' }] }, 400);
  }

  // Honeypot: real users never see this field, bots fill it. Pretend success.
  if (text(data, 'website', 10)) return json({ ok: true });

  const email = text(data, 'email', 200);
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ errors: [{ field: 'email', message: 'is required and must be valid.' }] }, 422);
  }

  const payload = Object.fromEntries(
    FIELDS.map((field) => [
      field,
      field === 'message' ? text(data, field, 2000) : text(data, field, 200),
    ]),
  ) as Payload;
  payload.email = email;

  const upstream = await fetch(`${EMAIL_GATEWAY_URL}/sy-serendipity`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${EMAIL_GATEWAY_SECRET_KEY}`,
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(10_000),
  });

  if (!upstream.ok) {
    console.error('email-gateway rejected the request', upstream.status, await upstream.text());
    return json({ errors: [{ message: 'Sending failed. Please try again or call us.' }] }, 502);
  }

  return json({ ok: true });
};
