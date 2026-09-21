/** MySQL-compatible SQL fragments shared across queries. */

export const BLOG_TAGS_JSON = `
  COALESCE(
    (
      SELECT JSON_ARRAYAGG(
        JSON_OBJECT('name', t.name, 'slug', t.slug)
        ORDER BY t.name
      )
      FROM blog_post_tags pt
      JOIN blog_tags t ON t.id = pt.tag_id
      WHERE pt.post_id = p.id
    ),
    JSON_ARRAY()
  ) AS tags
`;

export const BLOG_CATEGORIES_JSON = `
  COALESCE(
    (
      SELECT JSON_ARRAYAGG(
        JSON_OBJECT('id', c.id, 'name', c.name, 'slug', c.slug, 'color', c.color)
        ORDER BY c.sort_order, c.name
      )
      FROM blog_post_categories pc
      JOIN blog_categories c ON c.id = pc.category_id
      WHERE pc.post_id = p.id
    ),
    JSON_ARRAY()
  ) AS categories
`;

export const BLOG_CATEGORY_IDS_JSON = `
  COALESCE(
    (
      SELECT JSON_ARRAYAGG(pc.category_id)
      FROM blog_post_categories pc
      WHERE pc.post_id = p.id
    ),
    JSON_ARRAY()
  ) AS category_ids
`;
