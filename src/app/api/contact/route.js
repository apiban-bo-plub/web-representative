import { Resend } from 'resend';

// Every submission sends mail, so the route must never be prerendered or cached.
export const dynamic = 'force-dynamic';

const INQUIRY_TYPES = ['general', 'wholesale', 'corporate', 'press'];

const LIMITS = {
  name: 120,
  email: 200,
  phone: 60,
  company: 160,
  message: 5000,
};

// Coarse per-IP throttle. In-memory only, so it resets on redeploy and is not
// shared between instances — enough to blunt casual abuse, not a real WAF.
const RATE_WINDOW_MS = 60 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) return true;
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

const clean = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[c]);

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'invalid_body' }, { status: 400 });
  }

  // Hidden field no human fills in. Bots that do get a 200 and no email.
  if (clean(body.website, 100)) {
    return Response.json({ ok: true });
  }

  const name = clean(body.name, LIMITS.name);
  const email = clean(body.email, LIMITS.email);
  const phone = clean(body.phone, LIMITS.phone);
  const company = clean(body.company, LIMITS.company);
  const message = clean(body.message, LIMITS.message);
  const inquiry = INQUIRY_TYPES.includes(body.inquiry) ? body.inquiry : 'general';

  if (!name || !email || !message) {
    return Response.json({ error: 'missing_fields' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return Response.json({ error: 'invalid_email' }, { status: 400 });
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';
  if (rateLimited(ip)) {
    return Response.json({ error: 'rate_limited' }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY is not set');
    return Response.json({ error: 'not_configured' }, { status: 500 });
  }

  const rows = [
    ['Name', name],
    ['Email', email],
    ['Phone', phone || '—'],
    ['Company', company || '—'],
    ['Inquiry', inquiry],
  ];

  const text = [
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    'Message:',
    message,
  ].join('\n');

  const html = `
    <div style="font-family:system-ui,-apple-system,sans-serif;font-size:14px;color:#2b2b2b">
      <h2 style="margin:0 0 16px">New enquiry — apibanboplup.com</h2>
      <table cellpadding="6" style="border-collapse:collapse;margin-bottom:20px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="color:#777">${k}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`
          )
          .join('')}
      </table>
      <div style="white-space:pre-wrap;border-left:3px solid #ddd;padding-left:12px">${escapeHtml(message)}</div>
    </div>
  `;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || 'Apiban Bo Plup <onboarding@resend.dev>',
      to: [process.env.CONTACT_TO_EMAIL || 'apibanapb@gmail.com'],
      replyTo: email,
      subject: `[${inquiry}] Enquiry from ${name}`,
      text,
      html,
    });
    if (error) {
      console.error('[contact] resend error', error);
      return Response.json({ error: 'send_failed' }, { status: 502 });
    }
  } catch (err) {
    console.error('[contact] send threw', err);
    return Response.json({ error: 'send_failed' }, { status: 502 });
  }

  return Response.json({ ok: true });
}
