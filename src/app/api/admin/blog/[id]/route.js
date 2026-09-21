import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { query, withTransaction } from '@/lib/db';
import { revalidateBlogPublic } from '@/lib/blog';
import { BLOG_TAGS_JSON, BLOG_CATEGORY_IDS_JSON } from '@/lib/sql';
import { linkPostTag, upsertBlogTag } from '@/lib/blogTags';
import { syncPostCategories } from '@/lib/blogCategories';
import { slugify, isValidSlug } from '@/lib/slugify';
import { canEditBlogPost } from '@/lib/roles';

/** Form sends `''` for “no category”; DB expects UUID or null. */
function categoryIdOrNull(v) {
  if (v === null || v === undefined) return null;
  const s = String(v).trim();
  return s === '' ? null : s;
}

// GET /api/admin/blog/[id]
export async function GET(request, { params }) {
  const user = await verifySession();
  if (!user) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  const { id } = await params;

  const result = await query(
    `SELECT p.*,
            u.name AS author_name,
            ${BLOG_TAGS_JSON},
            ${BLOG_CATEGORY_IDS_JSON}
     FROM blog_posts p
     LEFT JOIN users u ON u.id = p.author_id
     WHERE p.id = $1`,
    [id]
  );

  if (result.rowCount === 0) {
    return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
  }

  const post = result.rows[0];
  if (!canEditBlogPost(user, post)) {
    return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
  }

  return NextResponse.json({ post });
}

// PUT /api/admin/blog/[id]
export async function PUT(request, { params }) {
  const user = await verifySession();
  if (!user) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  const { id } = await params;

  try {
    const body = await request.json();
    const {
      title,
      content,
      excerpt,
      slug: slugInput,
      cover_image_url,
      cover_image_alt,
      category_id,
      category_ids,
      status,
      is_featured,
      meta_title,
      meta_description,
      seo_noindex,
      tags = [],
    } = body;

    const current = await query(`SELECT * FROM blog_posts WHERE id = $1`, [id]);
    if (current.rowCount === 0) {
      return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
    }

    const currentPost = current.rows[0];

    if (!canEditBlogPost(user, currentPost)) {
      return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
    }

    const oldSlug = currentPost.slug;

    let nextSlug = currentPost.slug;
    if (slugInput !== undefined && slugInput !== null) {
      const normalized = slugify(String(slugInput));
      if (!isValidSlug(normalized)) {
        return NextResponse.json({ error: 'URL slug is invalid. Use lowercase letters, numbers, and hyphens only.' }, { status: 400 });
      }
      if (normalized !== currentPost.slug) {
        const taken = await query(
          `SELECT id FROM blog_posts WHERE slug = $1 AND id != $2`,
          [normalized, id]
        );
        if (taken.rowCount > 0) {
          return NextResponse.json({ error: 'That URL slug is already used by another post.' }, { status: 409 });
        }
        nextSlug = normalized;
      }
    }

    let publishedAt = currentPost.published_at;
    if (status === 'published' && !publishedAt) {
      publishedAt = new Date();
    }

    const readTime = content
      ? Math.max(1, Math.round(content.trim().split(/\s+/).length / 200))
      : currentPost.read_time_minutes;

    const nextCategoryIds = category_ids !== undefined
      ? (Array.isArray(category_ids) ? category_ids.filter(Boolean) : [])
      : category_id !== undefined
        ? (categoryIdOrNull(category_id) ? [categoryIdOrNull(category_id)] : [])
        : null;

    const post = await withTransaction(async (client) => {
      await client.query(
        `UPDATE blog_posts SET
           title            = COALESCE($1, title),
           slug             = $2,
           content          = COALESCE($3, content),
           excerpt          = COALESCE($4, excerpt),
           cover_image_url  = $5,
           cover_image_alt  = $6,
           category_id      = $7,
           status           = COALESCE($8, status),
           is_featured      = COALESCE($9, is_featured),
           meta_title       = $10,
           meta_description = $11,
           seo_noindex      = COALESCE($12, seo_noindex),
           read_time_minutes = $13,
           published_at     = $14
         WHERE id = $15`,
        [
          title || null, nextSlug, content || null, excerpt || null,
          cover_image_url ?? currentPost.cover_image_url,
          cover_image_alt ?? currentPost.cover_image_alt,
          nextCategoryIds !== null
            ? (nextCategoryIds[0] || null)
            : currentPost.category_id,
          status || null, is_featured ?? null,
          meta_title ?? currentPost.meta_title,
          meta_description ?? currentPost.meta_description,
          seo_noindex !== undefined ? (seo_noindex ? 1 : 0) : null,
          readTime, publishedAt, id,
        ]
      );

      if (nextCategoryIds !== null) {
        await syncPostCategories(id, nextCategoryIds, client);
      }

      const updatedResult = await client.query(`SELECT * FROM blog_posts WHERE id = $1`, [id]);
      const updated = updatedResult.rows[0];

      await client.query(`DELETE FROM blog_post_tags WHERE post_id = $1`, [id]);
      for (const tagName of tags) {
        const name = typeof tagName === 'string' ? tagName : tagName?.name;
        if (!name || !String(name).trim()) continue;
        const tagSlug = slugify(name);
        const tagId = await upsertBlogTag(name, tagSlug, client);
        await linkPostTag(id, tagId, client);
      }

      return updated;
    });

    try {
      revalidateBlogPublic(post.slug);
      if (oldSlug !== post.slug) {
        revalidateBlogPublic(oldSlug);
      }
    } catch (revErr) {
      console.error('[PUT /api/admin/blog/[id]] revalidate', revErr);
    }
    return NextResponse.json({ post });
  } catch (err) {
    console.error('[PUT /api/admin/blog/[id]]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

// DELETE /api/admin/blog/[id]
export async function DELETE(request, { params }) {
  const user = await verifySession();
  if (!user) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  const { id } = await params;

  const existing = await query(`SELECT * FROM blog_posts WHERE id = $1`, [id]);
  if (existing.rowCount === 0) {
    return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
  }

  if (!canEditBlogPost(user, existing.rows[0])) {
    return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
  }

  const slug = existing.rows[0].slug;
  await query(`DELETE FROM blog_posts WHERE id = $1`, [id]);

  try {
    revalidateBlogPublic(slug);
  } catch (revErr) {
    console.error('[DELETE /api/admin/blog/[id]] revalidate', revErr);
  }
  return NextResponse.json({ success: true });
}
