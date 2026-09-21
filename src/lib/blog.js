/**
 * Blog data-fetching layer.
 *
 * Public blog routes use ISR (`export const revalidate` on pages) so responses
 * are served from the Full Route Cache between revalidations.
 *
 * `unstable_cache` below tags data with 'blog' and matches the same interval
 * so regenerations dedupe DB reads. Call `revalidateBlogPublic()` from admin
 * APIs to purge both the data cache and static blog paths immediately.
 */

import { unstable_cache, revalidatePath, revalidateTag } from 'next/cache';
import { query } from './db';
import { BLOG_TAGS_JSON, BLOG_CATEGORIES_JSON } from './sql';
import { withNormalizedCategories } from './blogUtils';

const CACHE_TAG = 'blog';

/** Seconds — keep in sync with `export const revalidate` on `/insights` pages. */
export const BLOG_REVALIDATE_SECONDS = 60;

/** Purge blog data cache and ISR-cached `/insights`, optional `/insights/[slug]`, and sitemap. */
export function revalidateBlogPublic(slug = null) {
  revalidateTag(CACHE_TAG);
  revalidatePath('/insights');
  revalidatePath('/sitemap.xml');
  if (slug) revalidatePath(`/insights/${slug}`);
}

/** Slugs + dates for sitemap.xml (safe if DB unavailable — returns []). */
export async function getPublishedBlogPostsForSitemap() {
  try {
    const result = await query(
      `SELECT slug, updated_at, published_at
       FROM blog_posts
       WHERE status = 'published'
       ORDER BY published_at IS NULL, published_at DESC`
    );
    return result.rows;
  } catch (err) {
    console.error('[blog] sitemap posts', err);
    return [];
  }
}

/** Build-time paths for ISR (safe if DB unavailable — returns []). */
export async function getPublishedBlogSlugsForStaticParams() {
  try {
    const result = await query(
      `SELECT slug FROM blog_posts WHERE status = 'published' ORDER BY published_at IS NULL, published_at DESC`
    );
    return result.rows.map((row) => ({ slug: row.slug }));
  } catch {
    return [];
  }
}

// ─── Blog Posts ────────────────────────────────────────────────────────────

export const getBlogPosts = unstable_cache(
  async ({ page = 1, limit = 9, category = null, tag = null, q = null, featured = false } = {}) => {
    const offset = (page - 1) * limit;
    const searchTerm = q?.trim() ? `%${q.trim()}%` : null;

    const listConditions = [`p.status = 'published'`];
    const listParams = [limit, offset];
    let tagJoin = '';
    let categoryJoin = '';

    if (category) {
      categoryJoin = `
        JOIN blog_post_categories pc_filter ON pc_filter.post_id = p.id
        JOIN blog_categories c_filter ON c_filter.id = pc_filter.category_id`;
      listParams.push(category);
      listConditions.push(`c_filter.slug = $${listParams.length}`);
    }
    if (tag) {
      tagJoin = `
        JOIN blog_post_tags pt_filter ON pt_filter.post_id = p.id
        JOIN blog_tags t_filter ON t_filter.id = pt_filter.tag_id`;
      listParams.push(tag);
      listConditions.push(`t_filter.slug = $${listParams.length}`);
    }
    if (searchTerm) {
      listParams.push(searchTerm, searchTerm, searchTerm);
      const base = listParams.length - 2;
      listConditions.push(
        `(p.title LIKE $${base} OR p.excerpt LIKE $${base + 1} OR p.content LIKE $${base + 2})`
      );
    }
    if (featured) listConditions.push(`p.is_featured = 1`);

    const countConditions = [`p.status = 'published'`];
    const countParams = [];
    let countTagJoin = '';
    let countCategoryJoin = '';

    if (category) {
      countCategoryJoin = `
        JOIN blog_post_categories pc_filter ON pc_filter.post_id = p.id
        JOIN blog_categories c_filter ON c_filter.id = pc_filter.category_id`;
      countParams.push(category);
      countConditions.push(`c_filter.slug = $${countParams.length}`);
    }
    if (tag) {
      countTagJoin = `
        JOIN blog_post_tags pt_filter ON pt_filter.post_id = p.id
        JOIN blog_tags t_filter ON t_filter.id = pt_filter.tag_id`;
      countParams.push(tag);
      countConditions.push(`t_filter.slug = $${countParams.length}`);
    }
    if (searchTerm) {
      countParams.push(searchTerm, searchTerm, searchTerm);
      const base = countParams.length - 2;
      countConditions.push(
        `(p.title LIKE $${base} OR p.excerpt LIKE $${base + 1} OR p.content LIKE $${base + 2})`
      );
    }
    if (featured) countConditions.push(`p.is_featured = 1`);

    const [postsResult, countResult] = await Promise.all([
      query(
        `SELECT p.id, p.title, p.slug, p.excerpt, p.cover_image_url,
                p.published_at, p.read_time_minutes, p.view_count, p.is_featured,
                u.name  AS author_name,
                u.avatar_url AS author_avatar,
                ${BLOG_CATEGORIES_JSON}
         FROM   blog_posts p
         LEFT JOIN users u ON u.id = p.author_id
         ${categoryJoin}
         ${tagJoin}
         WHERE  ${listConditions.join(' AND ')}
         ORDER  BY p.is_featured DESC, p.published_at DESC
         LIMIT  $1 OFFSET $2`,
        listParams
      ),
      query(
        `SELECT COUNT(DISTINCT p.id) AS count FROM blog_posts p
         ${countCategoryJoin}
         ${countTagJoin}
         WHERE  ${countConditions.join(' AND ')}`,
        countParams
      ),
    ]);

    return {
      posts: postsResult.rows.map(withNormalizedCategories),
      total: parseInt(countResult.rows[0].count, 10),
      page,
      limit,
      totalPages: Math.ceil(parseInt(countResult.rows[0].count, 10) / limit),
    };
  },
  ['blog-posts-list'],
  { tags: [CACHE_TAG], revalidate: BLOG_REVALIDATE_SECONDS }
);

export const getBlogPost = unstable_cache(
  async (slug) => {
    const result = await query(
      `SELECT p.*,
              u.name       AS author_name,
              u.avatar_url AS author_avatar,
              u.bio        AS author_bio,
              ${BLOG_CATEGORIES_JSON},
              ${BLOG_TAGS_JSON}
       FROM   blog_posts p
       LEFT JOIN users u ON u.id = p.author_id
       WHERE  p.slug = $1 AND p.status = 'published'`,
      [slug]
    );
    return result.rows[0] ? withNormalizedCategories(result.rows[0]) : null;
  },
  ['blog-post'],
  { tags: [CACHE_TAG], revalidate: BLOG_REVALIDATE_SECONDS }
);

export const getRelatedPosts = unstable_cache(
  async (slug, limit = 3) => {
    const result = await query(
      `SELECT p.title, p.slug, p.cover_image_url,
              p.published_at, p.read_time_minutes,
              ${BLOG_CATEGORIES_JSON}
       FROM   blog_posts p
       WHERE  p.status = 'published' AND p.slug != $1
       ORDER  BY p.published_at DESC
       LIMIT  $2`,
      [slug, limit]
    );
    return result.rows.map(withNormalizedCategories);
  },
  ['blog-related'],
  { tags: [CACHE_TAG], revalidate: BLOG_REVALIDATE_SECONDS }
);

/** Newer/older published neighbours for post navigation. */
export const getAdjacentBlogPosts = unstable_cache(
  async (slug) => {
    const current = await query(
      `SELECT id, published_at, created_at
       FROM blog_posts
       WHERE slug = $1 AND status = 'published'`,
      [slug]
    );
    if (!current.rows[0]) return { prev: null, next: null };

    const { published_at, created_at } = current.rows[0];
    const sortExpr = 'COALESCE(p.published_at, p.created_at)';

    const [prevResult, nextResult] = await Promise.all([
      query(
        `SELECT p.title, p.slug, p.published_at,
                ${BLOG_CATEGORIES_JSON}
         FROM blog_posts p
         WHERE p.status = 'published' AND p.slug != $1
           AND ${sortExpr} < COALESCE($2, $3)
         ORDER BY ${sortExpr} DESC, p.id DESC
         LIMIT 1`,
        [slug, published_at, created_at]
      ),
      query(
        `SELECT p.title, p.slug, p.published_at,
                ${BLOG_CATEGORIES_JSON}
         FROM blog_posts p
         WHERE p.status = 'published' AND p.slug != $1
           AND ${sortExpr} > COALESCE($2, $3)
         ORDER BY ${sortExpr} ASC, p.id ASC
         LIMIT 1`,
        [slug, published_at, created_at]
      ),
    ]);

    return {
      prev: prevResult.rows[0] ? withNormalizedCategories(prevResult.rows[0]) : null,
      next: nextResult.rows[0] ? withNormalizedCategories(nextResult.rows[0]) : null,
    };
  },
  ['blog-adjacent'],
  { tags: [CACHE_TAG], revalidate: BLOG_REVALIDATE_SECONDS }
);

// ─── Categories ────────────────────────────────────────────────────────────

export const getPublishedBlogPostCount = unstable_cache(
  async () => {
    const result = await query(
      `SELECT COUNT(*) AS count FROM blog_posts WHERE status = 'published'`
    );
    return parseInt(result.rows[0].count, 10) || 0;
  },
  ['blog-published-count'],
  { tags: [CACHE_TAG], revalidate: BLOG_REVALIDATE_SECONDS }
);

export const getBlogCategories = unstable_cache(
  async () => {
    const result = await query(
      `SELECT c.id, c.name, c.slug, c.color, c.is_featured,
              COUNT(DISTINCT p.id) AS post_count
       FROM blog_categories c
       LEFT JOIN blog_post_categories pc ON pc.category_id = c.id
       LEFT JOIN blog_posts p ON p.id = pc.post_id AND p.status = 'published'
       GROUP BY c.id, c.name, c.slug, c.color, c.is_featured, c.sort_order
       ORDER BY c.sort_order, c.name`
    );
    return result.rows.map((row) => ({
      ...row,
      is_featured: Boolean(row.is_featured),
      post_count: Number(row.post_count) || 0,
    }));
  },
  ['blog-categories'],
  { tags: [CACHE_TAG], revalidate: BLOG_REVALIDATE_SECONDS }
);

export const getBlogTags = unstable_cache(
  async () => {
    const result = await query(
      `SELECT t.id, t.name, t.slug,
              COUNT(DISTINCT p.id) AS post_count
       FROM blog_tags t
       JOIN blog_post_tags pt ON pt.tag_id = t.id
       JOIN blog_posts p ON p.id = pt.post_id AND p.status = 'published'
       GROUP BY t.id, t.name, t.slug
       ORDER BY t.name`
    );
    return result.rows.map((row) => ({
      ...row,
      post_count: Number(row.post_count) || 0,
    }));
  },
  ['blog-tags'],
  { tags: [CACHE_TAG], revalidate: BLOG_REVALIDATE_SECONDS }
);
