import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { query } from '@/lib/db';
import { ensureNewsletterSubscribersTable } from '@/lib/newsletterSubscribers';

export async function PUT(request, { params }) {
  const user = await verifySession();
  if (!user) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  const { id } = await params;

  try {
    const body = await request.json();
    if (typeof body?.is_active !== 'boolean') {
      return NextResponse.json({ error: 'is_active must be a boolean.' }, { status: 400 });
    }

    await ensureNewsletterSubscribersTable();
    const result = await query(
      `UPDATE newsletter_subscribers
       SET is_active = $1,
           unsubscribed_at = CASE WHEN $1 = 1 THEN NULL ELSE NOW() END
       WHERE id = $2`,
      [body.is_active ? 1 : 0, id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Subscriber not found.' }, { status: 404 });
    }

    const subscriber = await query(
      `SELECT id, is_active FROM newsletter_subscribers WHERE id = $1`,
      [id]
    );

    return NextResponse.json({ subscriber: subscriber.rows[0] });
  } catch (err) {
    console.error('[PUT /api/admin/newsletter/[id]]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const user = await verifySession();
  if (!user) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  const { id } = await params;

  await ensureNewsletterSubscribersTable();
  const result = await query(
    `DELETE FROM newsletter_subscribers WHERE id = $1`,
    [id]
  );

  if (result.rowCount === 0) {
    return NextResponse.json({ error: 'Subscriber not found.' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
