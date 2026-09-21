import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { ensureNewsletterSubscribersTable } from '@/lib/newsletterSubscribers';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const email = String(body?.email || '').trim().toLowerCase();
    const name = String(body?.name || '').trim();

    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Please enter a valid email.' }, { status: 400 });
    }

    await ensureNewsletterSubscribersTable();

    const id = crypto.randomUUID();
    await query(
      `INSERT INTO newsletter_subscribers (id, email, name, is_active, unsubscribed_at)
       VALUES ($1, $2, $3, 1, NULL)
       ON DUPLICATE KEY UPDATE
         name = COALESCE(VALUES(name), newsletter_subscribers.name),
         is_active = 1,
         unsubscribed_at = NULL`,
      [id, email, name || null]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[POST /api/public/newsletter]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
