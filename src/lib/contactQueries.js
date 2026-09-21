import { query } from '@/lib/db';

let contactTableReady = false;

async function ensureColumn(table, column, definition) {
  try {
    await query(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
  } catch (err) {
    if (err?.code !== 'ER_DUP_FIELDNAME') throw err;
  }
}

export async function ensureContactQueriesTable() {
  if (contactTableReady) return;

  await query(`
    CREATE TABLE IF NOT EXISTS contact_queries (
      id CHAR(36) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50),
      message TEXT NOT NULL,
      source VARCHAR(50) NOT NULL DEFAULT 'contact',
      service_slug VARCHAR(100),
      field_of_work VARCHAR(255),
      is_read TINYINT(1) NOT NULL DEFAULT 0,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await ensureColumn('contact_queries', 'source', "VARCHAR(50) NOT NULL DEFAULT 'contact'");
  await ensureColumn('contact_queries', 'service_slug', 'VARCHAR(100)');
  await ensureColumn('contact_queries', 'field_of_work', 'VARCHAR(255)');

  contactTableReady = true;
}
