import nodemailer from 'nodemailer';

let transporter;

function env(name, fallback = '') {
  const raw = process.env[name];
  if (raw == null || raw === '') return fallback;
  // Strip wrapping quotes if present (common in .env password values)
  return String(raw).replace(/^['"]|['"]$/g, '');
}

function getTransporter() {
  if (transporter) return transporter;

  const host = env('SMTP_HOST');
  const port = parseInt(env('SMTP_PORT', '465'), 10);
  const user = env('SMTP_USER');
  const pass = env('SMTP_PASS');
  const secureEnv = env('SMTP_SECURE');
  const secure =
    secureEnv === 'true' || secureEnv === '1' || (!secureEnv && port === 465);

  if (!host || !user || !pass) {
    return null;
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  return transporter;
}

export function isMailConfigured() {
  return Boolean(env('SMTP_HOST') && env('SMTP_USER') && env('SMTP_PASS'));
}

export function getMailFrom() {
  const address = env('SMTP_FROM') || env('SMTP_USER');
  const name = env('SMTP_FROM_NAME') || 'Nexuron Technologies';
  return `"${name}" <${address}>`;
}

/**
 * @param {{ to: string, subject: string, html: string, text?: string, replyTo?: string, devLogUrl?: string }} options
 */
export async function sendMail({ to, subject, html, text, replyTo, devLogUrl }) {
  const transport = getTransporter();

  if (!transport) {
    console.warn('[mail] SMTP is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS in .env');
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[mail] To: ${to}`);
      console.log(`[mail] Subject: ${subject}`);
      if (devLogUrl) console.log(`[mail] Link: ${devLogUrl}`);
    }
    return { sent: false, dev: true };
  }

  await transport.sendMail({
    from: getMailFrom(),
    to,
    subject,
    html,
    text: text || html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
    ...(replyTo ? { replyTo } : {}),
  });

  return { sent: true };
}

/** Verify SMTP credentials (used by scripts/test-smtp.js). */
export async function verifySmtp() {
  const transport = getTransporter();
  if (!transport) {
    throw new Error('SMTP is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS in .env');
  }
  await transport.verify();
  return true;
}
