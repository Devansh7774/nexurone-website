import { query as defaultQuery } from './db';

export async function syncPostCategories(postId, categoryIds, client = null) {
  const q = client ? client.query.bind(client) : defaultQuery;
  const ids = [...new Set((categoryIds || []).filter(Boolean))];

  await q(`DELETE FROM blog_post_categories WHERE post_id = $1`, [postId]);

  for (const categoryId of ids) {
    await q(
      `INSERT IGNORE INTO blog_post_categories (post_id, category_id) VALUES ($1, $2)`,
      [postId, categoryId]
    );
  }

  await q(`UPDATE blog_posts SET category_id = $1 WHERE id = $2`, [ids[0] || null, postId]);
}

export async function getPostCategoryIds(postId, client = null) {
  const q = client ? client.query.bind(client) : defaultQuery;
  const result = await q(
    `SELECT category_id FROM blog_post_categories WHERE post_id = $1 ORDER BY category_id`,
    [postId]
  );
  const rows = result.rows || [];
  return rows.map((row) => row.category_id);
}
