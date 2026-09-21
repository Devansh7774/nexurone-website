import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { BLOG_TAGS_JSON, BLOG_CATEGORIES_JSON } from '@/lib/sql';
import { withNormalizedCategories } from '@/lib/blogUtils';

// GET /api/public/blog/[slug]
export async function GET(request, { params }) {
  const { slug } = await params;

  const result = await query(
    `SELECT p.*,
            u.name AS author_name, u.avatar_url AS author_avatar, u.bio AS author_bio,
            ${BLOG_CATEGORIES_JSON},
            ${BLOG_TAGS_JSON}
     FROM blog_posts p
     LEFT JOIN users u ON u.id = p.author_id
     WHERE p.slug = $1 AND p.status = 'published'`,
    [slug]
  );

  if (result.rowCount === 0) {
    return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
  }

  return NextResponse.json({ post: withNormalizedCategories(result.rows[0]) });
}
