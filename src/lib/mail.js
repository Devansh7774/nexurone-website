import nodemailer from 'nodemailer';

let transporter;

function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return transporter;
}

export function isMailConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

export function getMailFrom() {
  const address = process.env.SMTP_FROM || process.env.SMTP_USER;
  const name = process.env.SMTP_FROM_NAME || 'Nexuron Technologies';
  return `"${name}" <${address}>`;
}

/**
 * @param {{ to: string, subject: string, html: string, text?: string, devLogUrl?: string }} options
 */
export async function sendMail({ to, subject, html, text, devLogUrl }) {
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
  });

  return { sent: true };
}
