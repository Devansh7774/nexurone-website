import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { verifySession } from '@/lib/auth';
import { query } from '@/lib/db';

// PUT /api/admin/categories/[id]?type=blog
export async function PUT(request, { params }) {
  const user = await verifySession();
  if (!user) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'blog';

  if (type !== 'blog') {
    return NextResponse.json({ error: 'Only blog categories are supported.' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { is_featured, sort_order, color, name } = body;

    const existing = await query(`SELECT * FROM blog_categories WHERE id = $1`, [id]);
    if (existing.rowCount === 0) {
      return NextResponse.json({ error: 'Category not found.' }, { status: 404 });
    }

    await query(
      `UPDATE blog_categories SET
         name = COALESCE($1, name),
         color = COALESCE($2, color),
         sort_order = COALESCE($3, sort_order),
         is_featured = COALESCE($4, is_featured)
       WHERE id = $5`,
      [
        name?.trim() || null,
        color || null,
        sort_order !== undefined ? Number(sort_order) : null,
        is_featured !== undefined ? (is_featured ? 1 : 0) : null,
        id,
      ]
    );

    const updated = await query(`SELECT * FROM blog_categories WHERE id = $1`, [id]);

    try {
      revalidatePath('/insights');
    } catch (err) {
      console.error('[PUT /api/admin/categories/[id]] revalidate', err);
    }

    return NextResponse.json({
      category: {
        ...updated.rows[0],
        is_featured: Boolean(updated.rows[0].is_featured),
      },
    });
  } catch (err) {
    console.error('[PUT /api/admin/categories/[id]]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

// DELETE /api/admin/categories/[id]?type=blog
export async function DELETE(request, { params }) {
  const user = await verifySession();
  if (!user) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'blog';

  if (type !== 'blog') {
    return NextResponse.json({ error: 'Only blog categories are supported.' }, { status: 400 });
  }

  try {
    const existing = await query(`SELECT id FROM blog_categories WHERE id = $1`, [id]);
    if (existing.rowCount === 0) {
      return NextResponse.json({ error: 'Category not found.' }, { status: 404 });
    }

    await query(`DELETE FROM blog_categories WHERE id = $1`, [id]);

    try {
      revalidatePath('/insights');
    } catch (err) {
      console.error('[DELETE /api/admin/categories/[id]] revalidate', err);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[DELETE /api/admin/categories/[id]]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
