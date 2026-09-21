import { query } from '@/lib/db';

let careerTableReady = false;

export async function ensureCareerApplicationsTable() {
  if (careerTableReady) return;

  await query(`
    CREATE TABLE IF NOT EXISTS career_applications (
      id CHAR(36) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50),
      location VARCHAR(255),
      role VARCHAR(255) NOT NULL,
      cover_letter TEXT NOT NULL,
      cv_file_url TEXT,
      cv_file_name VARCHAR(255),
      cv_mime_type VARCHAR(100),
      is_read TINYINT(1) NOT NULL DEFAULT 0,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  careerTableReady = true;
}
