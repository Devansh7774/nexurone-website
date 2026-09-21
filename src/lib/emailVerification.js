import { query } from './db';
import { generateToken } from './auth';
import { sendMail } from './mail';
import { absoluteUrl } from './site';

const VERIFY_EXPIRY_HOURS = parseInt(process.env.EMAIL_VERIFY_EXPIRY_HOURS || '24', 10);

export async function createVerificationToken(userId) {
  await query(
    `DELETE FROM auth_tokens WHERE user_id = $1 AND token_type = 'email_verify'`,
    [userId]
  );

  const token = generateToken();
  const expiresAt = new Date(Date.now() + VERIFY_EXPIRY_HOURS * 60 * 60 * 1000);

  await query(
    `INSERT INTO auth_tokens (id, user_id, token, token_type, expires_at)
     VALUES ($1, $2, $3, 'email_verify', $4)`,
    [crypto.randomUUID(), userId, token, expiresAt]
  );

  return token;
}

export async function sendVerificationEmail(user) {
  const token = await createVerificationToken(user.id);
  const verifyUrl = absoluteUrl(`/verify-email?token=${encodeURIComponent(token)}`);

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#111827">
      <h2 style="color:#00102A;margin-bottom:8px">Verify your Nexuron account</h2>
      <p style="color:#4b5563;line-height:1.6">
        Hi ${user.name || 'there'},<br><br>
        Please confirm your email address to access the Nexuron admin portal.
      </p>
      <p style="margin:28px 0">
        <a href="${verifyUrl}" style="background:linear-gradient(135deg,#00d2ff,#0072ff);color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;display:inline-block">
          Verify email address
        </a>
      </p>
      <p style="color:#6b7280;font-size:13px;line-height:1.6">
        This link expires in ${VERIFY_EXPIRY_HOURS} hours. If you did not request this, you can ignore this email.
      </p>
      <p style="color:#9ca3af;font-size:12px;word-break:break-all">${verifyUrl}</p>
    </div>
  `;

  return sendMail({
    to: user.email,
    subject: 'Verify your Nexuron admin account',
    html,
    devLogUrl: verifyUrl,
  });
}

export async function verifyEmailToken(token) {
  if (!token?.trim()) {
    return { ok: false, error: 'Verification token is missing.' };
  }

  const result = await query(
    `SELECT t.user_id, u.email, u.name, u.email_verified_at
     FROM auth_tokens t
     JOIN users u ON u.id = t.user_id
     WHERE t.token = $1
       AND t.token_type = 'email_verify'
       AND t.expires_at > NOW()`,
    [token.trim()]
  );

  if (result.rowCount === 0) {
    return { ok: false, error: 'This verification link is invalid or has expired.' };
  }

  const row = result.rows[0];

  if (!row.email_verified_at) {
    await query(`UPDATE users SET email_verified_at = NOW() WHERE id = $1`, [row.user_id]);
  }

  await query(`DELETE FROM auth_tokens WHERE token = $1`, [token.trim()]);

  return { ok: true, email: row.email, name: row.name };
}

/** Manually mark a user's email as verified (admin action). Clears pending verify tokens. */
export async function markEmailVerified(userId) {
  await query(`UPDATE users SET email_verified_at = NOW() WHERE id = $1`, [userId]);
  await query(
    `DELETE FROM auth_tokens WHERE user_id = $1 AND token_type = 'email_verify'`,
    [userId]
  );
}

export async function resendVerificationForEmail(email) {
  const normalized = email?.toLowerCase().trim();
  if (!normalized) {
    return { ok: true, message: 'If an account exists, a verification email has been sent.' };
  }

  const result = await query(
    `SELECT id, name, email, email_verified_at, is_active
     FROM users WHERE email = $1 LIMIT 1`,
    [normalized]
  );

  const user = result.rows[0];
  if (!user || !user.is_active || user.email_verified_at) {
    return { ok: true, message: 'If an account exists, a verification email has been sent.' };
  }

  await sendVerificationEmail(user);
  return { ok: true, message: 'If an account exists, a verification email has been sent.' };
}
