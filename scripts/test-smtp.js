/**
 * Test Hostinger SMTP from .env
 *
 * Usage:
 *   node --env-file=.env scripts/test-smtp.js
 *   node --env-file=.env scripts/test-smtp.js you@example.com
 */
import nodemailer from 'nodemailer';

function env(name, fallback = '') {
  const raw = process.env[name];
  if (raw == null || raw === '') return fallback;
  return String(raw).replace(/^['"]|['"]$/g, '');
}

async function main() {
  const host = env('SMTP_HOST');
  const port = parseInt(env('SMTP_PORT', '465'), 10);
  const user = env('SMTP_USER');
  const pass = env('SMTP_PASS');
  const secureEnv = env('SMTP_SECURE');
  const secure =
    secureEnv === 'true' || secureEnv === '1' || (!secureEnv && port === 465);
  const fromAddress = env('SMTP_FROM') || user;
  const fromName = env('SMTP_FROM_NAME') || 'Nexuron Technologies';
  const to = process.argv[2] || env('CONTACT_NOTIFY_TO') || user;

  if (!host || !user || !pass) {
    console.error('Missing SMTP_HOST / SMTP_USER / SMTP_PASS in .env');
    process.exit(1);
  }

  console.log('Connecting…');
  console.log(`  Host: ${host}`);
  console.log(`  Port: ${port} (secure=${secure})`);
  console.log(`  User: ${user}`);
  console.log(`  To:   ${to}`);

  const transport = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  await transport.verify();
  console.log('SMTP connection OK.');

  const info = await transport.sendMail({
    from: `"${fromName}" <${fromAddress}>`,
    to,
    subject: 'Nexuron SMTP test',
    text: 'This is a test email from your Nexuron website SMTP setup.',
    html: '<p>This is a <strong>test email</strong> from your Nexuron website SMTP setup.</p>',
  });

  console.log('Test email sent.');
  console.log(`  MessageId: ${info.messageId}`);
}

main().catch((err) => {
  console.error('SMTP test failed:');
  console.error(err?.message || err);
  process.exit(1);
});
