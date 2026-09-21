import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { query } from '@/lib/db';
import { ensureContactQueriesTable } from '@/lib/contactQueries';

export async function PUT(request, { params }) {
  const user = await verifySession();
  if (!user) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  const { id } = await params;

  try {
    const body = await request.json();
    if (typeof body?.is_read !== 'boolean') {
      return NextResponse.json({ error: 'is_read must be a boolean.' }, { status: 400 });
    }

    await ensureContactQueriesTable();
    const result = await query(
      `UPDATE contact_queries
       SET is_read = $1
       WHERE id = $2`,
      [body.is_read ? 1 : 0, id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Query not found.' }, { status: 404 });
    }

    const updated = await query(
      `SELECT id, is_read FROM contact_queries WHERE id = $1`,
      [id]
    );

    return NextResponse.json({ query: updated.rows[0] });
  } catch (err) {
    console.error('[PUT /api/admin/queries/[id]]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
