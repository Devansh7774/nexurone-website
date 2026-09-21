import { query } from '@/lib/db';

let newsletterTableReady = false;

export async function ensureNewsletterSubscribersTable() {
  if (newsletterTableReady) return;

  await query(`
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id CHAR(36) PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      name VARCHAR(255),
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      subscribed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      unsubscribed_at DATETIME NULL,
      ip_address VARCHAR(45)
    )
  `);

  newsletterTableReady = true;
}
