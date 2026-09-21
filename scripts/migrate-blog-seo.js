/**
 * Add SEO columns to blog_posts (safe to run multiple times).
 * Usage: node scripts/migrate-blog-seo.js
 */
import { loadEnv } from './lib/load-env.js';
import { withScriptConnection } from './lib/db-script.js';

loadEnv();

async function columnExists(conn, table, column) {
  const [rows] = await conn.query(
    `SELECT 1 FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?
     LIMIT 1`,
    [table, column]
  );
  return rows.length > 0;
}

async function main() {
  await withScriptConnection(async (conn) => {
    if (!(await columnExists(conn, 'blog_posts', 'cover_image_alt'))) {
      await conn.query(`ALTER TABLE blog_posts ADD COLUMN cover_image_alt VARCHAR(500) NULL AFTER cover_image_url`);
      console.log('Added cover_image_alt');
    } else {
      console.log('cover_image_alt already exists');
    }

    if (!(await columnExists(conn, 'blog_posts', 'seo_noindex'))) {
      await conn.query(`ALTER TABLE blog_posts ADD COLUMN seo_noindex TINYINT(1) NOT NULL DEFAULT 0 AFTER meta_description`);
      console.log('Added seo_noindex');
    } else {
      console.log('seo_noindex already exists');
    }

    console.log('Migration complete.');
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
