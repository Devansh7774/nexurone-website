import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { query } from '@/lib/db';
import { revalidateBlogPublic } from '@/lib/blog';
import { linkPostTag, upsertBlogTag } from '@/lib/blogTags';
import { syncPostCategories } from '@/lib/blogCategories';
import { slugify, isValidSlug } from '@/lib/slugify';
import { ROLES, canEditBlogPost } from '@/lib/roles';

function estimateReadTime(content) {
  const words = (content ?? '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Form sends `''` for “no category”; DB column is UUID — must be null, not "". */
function categoryIdOrNull(v) {
  if (v === null || v === undefined) return null;
  const s = String(v).trim();
  return s === '' ? null : s;
}

// GET /api/admin/blog — list all posts (paginated)
export async function GET(request) {
  const user = await verifySession();
  if (!user) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
  const limit = Math.min(50, parseInt(searchParams.get('limit') || '20'));
  const status = searchParams.get('status') || null;
  const offset = (page - 1) * limit;

  let whereClause = '';
  let countWhereClause = '';
  const params = [limit, offset];
  const countParams = [];
  if (status) {
    params.push(status);
    countParams.push(status);
    whereClause = `WHERE p.status = $3`;
    countWhereClause = `WHERE p.status = $1`;
  }
  if (user.role === ROLES.EDITOR) {
    params.push(user.id);
    countParams.push(user.id);
    const authorFilter = `p.author_id = $${params.length}`;
    whereClause = whereClause ? `${whereClause} AND ${authorFilter}` : `WHERE ${authorFilter}`;
    countWhereClause = countWhereClause ? `${countWhereClause} AND p.author_id = $${countParams.length}` : `WHERE p.author_id = $1`;
  }

  const result = await query(
    `SELECT p.id, p.title, p.slug, p.status, p.is_featured,
            p.published_at, p.created_at, p.view_count,
            u.name AS author_name,
            c.name AS category_name
     FROM blog_posts p
     LEFT JOIN users u ON u.id = p.author_id
     LEFT JOIN blog_categories c ON c.id = p.category_id
     ${whereClause}
     ORDER BY p.created_at DESC
     LIMIT $1 OFFSET $2`,
    params
  );

  const countResult = await query(
    `SELECT COUNT(*) AS count FROM blog_posts p ${countWhereClause}`,
    countParams
  );

  return NextResponse.json({
    posts: result.rows,
    total: parseInt(countResult.rows[0].count),
    page,
    limit,
  });
}

// POST /api/admin/blog — create a new post
export async function POST(request) {
  const user = await verifySession();
  if (!user) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  try {
    const body = await request.json();
    const {
      title,
      content = '',
      excerpt = '',
      slug: slugInput,
      cover_image_url = null,
      cover_image_alt = null,
      category_id = null,
      category_ids = [],
      status = 'draft',
      is_featured = false,
      meta_title = null,
      meta_description = null,
      seo_noindex = false,
      tags = [],
    } = body;

    if (!title?.trim()) {
      return NextResponse.json({ error: 'Title is required.' }, { status: 400 });
    }

    const baseSlug = slugInput?.trim() ? slugify(slugInput) : slugify(title);
    if (!isValidSlug(baseSlug)) {
      return NextResponse.json({ error: 'URL slug is invalid. Use lowercase letters, numbers, and hyphens only.' }, { status: 400 });
    }

    const existing = await query(
      `SELECT id FROM blog_posts WHERE slug = $1`, [baseSlug]
    );
    const slug = existing.rowCount > 0 ? `${baseSlug}-${Date.now()}` : baseSlug;
    const readTime = estimateReadTime(content);
    const publishedAt = status === 'published' ? new Date() : null;
    const postId = crypto.randomUUID();

    const categoryIds = Array.isArray(category_ids)
      ? category_ids.filter(Boolean)
      : categoryIdOrNull(category_id)
        ? [categoryIdOrNull(category_id)]
        : [];

    await query(
      `INSERT INTO blog_posts
         (id, title, slug, content, excerpt, cover_image_url, cover_image_alt, author_id,
          category_id, status, is_featured, meta_title, meta_description, seo_noindex,
          read_time_minutes, published_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)`,
      [
        postId, title.trim(), slug, content, excerpt, cover_image_url, cover_image_alt,
        user.id, categoryIds[0] || null, status, is_featured,
        meta_title, meta_description, seo_noindex ? 1 : 0, readTime, publishedAt,
      ]
    );

    await syncPostCategories(postId, categoryIds);

    const postResult = await query(`SELECT * FROM blog_posts WHERE id = $1`, [postId]);
    const post = postResult.rows[0];

    if (Array.isArray(tags) && tags.length > 0) {
      for (const tagName of tags) {
        const name = typeof tagName === 'string' ? tagName : tagName?.name;
        if (!name || !String(name).trim()) continue;
        const tagSlug = slugify(name);
        const tagId = await upsertBlogTag(name, tagSlug);
        await linkPostTag(post.id, tagId);
      }
    }

    try {
      revalidateBlogPublic(post.status === 'published' ? post.slug : null);
    } catch (revErr) {
      console.error('[POST /api/admin/blog] revalidate', revErr);
    }

    return NextResponse.json({ post }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/admin/blog]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
