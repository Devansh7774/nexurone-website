import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { ensureContactQueriesTable } from '@/lib/contactQueries';
import { isValidEmail } from '@/lib/validation';

export async function POST(request) {
  try {
    const body = await request.json();
    const name = (body?.name || '').trim();
    const email = (body?.email || '').trim();
    const phone = (body?.phone || '').trim();
    const message = (body?.message || '').trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Please enter a valid email.' }, { status: 400 });
    }

    await ensureContactQueriesTable();

    const id = crypto.randomUUID();
    await query(
      `INSERT INTO contact_queries (id, name, email, phone, message, source)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [id, name, email, phone || null, message, 'contact']
    );

    const result = await query(
      `SELECT id, created_at FROM contact_queries WHERE id = $1`,
      [id]
    );

    return NextResponse.json(
      { success: true, query: result.rows[0] },
      { status: 201 }
    );
  } catch (err) {
    console.error('[POST /api/public/contact]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
