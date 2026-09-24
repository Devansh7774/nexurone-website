const VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';

export async function verifyRecaptchaToken(token, remoteIp) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    console.error('[recaptcha] RECAPTCHA_SECRET_KEY is not configured');
    return { ok: false, error: 'Captcha is not configured.' };
  }

  const response = typeof token === 'string' ? token.trim() : '';
  if (!response) {
    return { ok: false, error: 'Please complete the captcha.' };
  }

  const body = new URLSearchParams({
    secret,
    response,
  });
  if (remoteIp) body.set('remoteip', remoteIp);

  try {
    const res = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });
    const data = await res.json();
    if (!data?.success) {
      return { ok: false, error: 'Captcha verification failed. Please try again.' };
    }
    return { ok: true };
  } catch (err) {
    console.error('[recaptcha] siteverify failed', err);
    return { ok: false, error: 'Captcha verification failed. Please try again.' };
  }
}

export function getRequestIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') || undefined;
}
