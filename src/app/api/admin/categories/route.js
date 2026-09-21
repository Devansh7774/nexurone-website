import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { verifySession } from '@/lib/auth';
import { query } from '@/lib/db';
import { slugify, isValidSlug } from '@/lib/slugify';

function getTable(type) {
  return type === 'work' ? 'work_categories' : 'blog_categories';
}

// GET /api/admin/categories?type=blog|work
export async function GET(request) {
  const user = await verifySession();
  if (!user) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'blog';
  const table = getTable(type);

  const result = await query(
    `SELECT * FROM ${table} ORDER BY sort_order ASC, name ASC`
  );

  return NextResponse.json({ categories: result.rows });
}

// POST /api/admin/categories?type=blog|work
export async function POST(request) {
  const user = await verifySession();
  if (!user) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'blog';

  if (type !== 'blog') {
    return NextResponse.json({ error: 'Only blog categories can be created here for now.' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { name, color = '#3B82F6', sort_order = 0, is_featured = false } = body;

    if (!name?.trim()) {
      return NextResponse.json({ error: 'Category name is required.' }, { status: 400 });
    }

    const slug = slugify(name);
    if (!isValidSlug(slug)) {
      return NextResponse.json({ error: 'Category name produces an invalid slug.' }, { status: 400 });
    }

    const existing = await query(`SELECT id FROM blog_categories WHERE slug = $1`, [slug]);
    if (existing.rowCount > 0) {
      return NextResponse.json({ error: 'A category with this name already exists.' }, { status: 409 });
    }

    const id = crypto.randomUUID();
    await query(
      `INSERT INTO blog_categories (id, name, slug, color, sort_order, is_featured)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [id, name.trim(), slug, color, Number(sort_order) || 0, is_featured ? 1 : 0]
    );

    const created = await query(`SELECT * FROM blog_categories WHERE id = $1`, [id]);

    try {
      revalidatePath('/insights');
    } catch (err) {
      console.error('[POST /api/admin/categories] revalidate', err);
    }

    return NextResponse.json({
      category: {
        ...created.rows[0],
        is_featured: Boolean(created.rows[0].is_featured),
      },
    }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/admin/categories]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
