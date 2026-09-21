import { query as defaultQuery } from './db';

export async function upsertBlogTag(tagName, tagSlug, client = null) {
  const q = client ? client.query.bind(client) : defaultQuery;
  
  const existing = await q(`SELECT id FROM blog_tags WHERE slug = $1`, [tagSlug]);
  // Note: if using client.query directly, the result format might differ slightly from the wrapper `query`
  // The wrapper `query` returns { rows, rowCount }. Let's ensure we handle both.
  const rows = existing.rows || (Array.isArray(existing[0]) ? existing[0] : existing);
  const rowCount = existing.rowCount ?? rows.length;

  if (rowCount > 0) {
    await q(`UPDATE blog_tags SET name = $1 WHERE id = $2`, [tagName.trim(), rows[0].id]);
    return rows[0].id;
  }

  const tagId = crypto.randomUUID();
  await q(
    `INSERT INTO blog_tags (id, name, slug) VALUES ($1, $2, $3)`,
    [tagId, tagName.trim(), tagSlug]
  );
  return tagId;
}

export async function linkPostTag(postId, tagId, client = null) {
  const q = client ? client.query.bind(client) : defaultQuery;
  await q(
    `INSERT IGNORE INTO blog_post_tags (post_id, tag_id) VALUES ($1, $2)`,
    [postId, tagId]
  );
}
