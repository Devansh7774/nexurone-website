import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { BLOG_TAGS_JSON, BLOG_CATEGORIES_JSON } from '@/lib/sql';
import { withNormalizedCategories } from '@/lib/blogUtils';

// GET /api/public/blog — published posts with pagination + filter
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
  const limit = Math.min(20, parseInt(searchParams.get('limit') || '9'));
  const category = searchParams.get('category') || null;
  const featured = searchParams.get('featured') === 'true';
  const offset = (page - 1) * limit;

  const conditions = [`p.status = 'published'`];
  const params = [limit, offset];
  let categoryJoin = '';

  if (category) {
    categoryJoin = `
      JOIN blog_post_categories pc_filter ON pc_filter.post_id = p.id
      JOIN blog_categories c_filter ON c_filter.id = pc_filter.category_id`;
    params.push(category);
    conditions.push(`c_filter.slug = $${params.length}`);
  }
  if (featured) {
    conditions.push(`p.is_featured = 1`);
  }

  const where = `WHERE ${conditions.join(' AND ')}`;

  const result = await query(
    `SELECT p.id, p.title, p.slug, p.excerpt, p.cover_image_url,
            p.published_at, p.read_time_minutes, p.view_count, p.is_featured,
            u.name AS author_name, u.avatar_url AS author_avatar,
            ${BLOG_CATEGORIES_JSON},
            ${BLOG_TAGS_JSON}
     FROM blog_posts p
     LEFT JOIN users u ON u.id = p.author_id
     ${categoryJoin}
     ${where}
     ORDER BY p.published_at DESC
     LIMIT $1 OFFSET $2`,
    params
  );

  const countConditions = [`p.status = 'published'`];
  const countParams = [];
  let countCategoryJoin = '';
  if (category) {
    countCategoryJoin = `
      JOIN blog_post_categories pc_filter ON pc_filter.post_id = p.id
      JOIN blog_categories c_filter ON c_filter.id = pc_filter.category_id`;
    countParams.push(category);
    countConditions.push(`c_filter.slug = $1`);
  }
  if (featured) countConditions.push(`p.is_featured = 1`);

  const countResult = await query(
    `SELECT COUNT(DISTINCT p.id) AS count FROM blog_posts p
     ${countCategoryJoin}
     WHERE ${countConditions.join(' AND ')}`,
    countParams
  );

  return NextResponse.json({
    posts: result.rows.map(withNormalizedCategories),
    total: parseInt(countResult.rows[0].count),
    page,
    limit,
  });
}
