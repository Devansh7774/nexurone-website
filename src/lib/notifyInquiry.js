import { sendMail, isMailConfigured } from './mail';

function env(name, fallback = '') {
  const raw = process.env[name];
  if (raw == null || raw === '') return fallback;
  return String(raw).replace(/^['"]|['"]$/g, '');
}

export function getNotifyTo() {
  return env('CONTACT_NOTIFY_TO') || env('SMTP_FROM') || env('SMTP_USER');
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function rowsToHtml(rows) {
  return rows
    .filter(([, value]) => value != null && String(value).trim() !== '')
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:8px 12px;color:#6b7280;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td>
        <td style="padding:8px 12px;color:#111827;vertical-align:top">${escapeHtml(value).replace(/\n/g, '<br>')}</td>
      </tr>`
    )
    .join('');
}

/**
 * Notify site inbox about a new lead. Never throws — form save should still succeed.
 */
export async function notifyNewInquiry({
  subject,
  title,
  rows,
  replyTo,
}) {
  const to = getNotifyTo();
  if (!to) {
    console.warn('[notify] CONTACT_NOTIFY_TO / SMTP_FROM / SMTP_USER not set');
    return { sent: false };
  }

  if (!isMailConfigured()) {
    console.warn('[notify] SMTP not configured; skipping inquiry email');
    return { sent: false };
  }

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#111827">
      <h2 style="color:#00102A;margin-bottom:8px">${escapeHtml(title)}</h2>
      <p style="color:#6b7280;margin-bottom:20px">A new submission was received on nexurontechnologies.com.</p>
      <table style="width:100%;border-collapse:collapse;background:#f9fafb;border-radius:8px">
        ${rowsToHtml(rows)}
      </table>
    </div>
  `;

  try {
    return await sendMail({
      to,
      subject,
      html,
      replyTo: replyTo || undefined,
    });
  } catch (err) {
    console.error('[notify] Failed to send inquiry email:', err);
    return { sent: false, error: err };
  }
}
