import { NextResponse } from 'next/server';
import { requireApiUser } from '@/lib/auth';
import { query } from '@/lib/db';
import { revalidateBlogPublic } from '@/lib/blog';

function sanitizeProfile(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    avatar_url: row.avatar_url || '',
    bio: row.bio || '',
  };
}

// GET /api/admin/profile
export async function GET() {
  const auth = await requireApiUser();
  if (auth.error) return auth.error;

  const result = await query(
    `SELECT id, name, email, role, avatar_url, bio FROM users WHERE id = $1`,
    [auth.user.id]
  );

  return NextResponse.json({ profile: sanitizeProfile(result.rows[0]) });
}

// PUT /api/admin/profile
export async function PUT(request) {
  const auth = await requireApiUser();
  if (auth.error) return auth.error;

  try {
    const body = await request.json();
    const { name, bio, avatar_url } = body;

    if (!name?.trim()) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
    }

    const safeAvatar =
      avatar_url === null || avatar_url === undefined
        ? null
        : String(avatar_url).trim() || null;

    if (safeAvatar && !/^(\/|https?:\/\/)/i.test(safeAvatar)) {
      return NextResponse.json({ error: 'Avatar must be a valid URL or site path.' }, { status: 400 });
    }

    await query(
      `UPDATE users SET name = $1, bio = $2, avatar_url = $3 WHERE id = $4`,
      [name.trim(), bio?.trim() || null, safeAvatar, auth.user.id]
    );

    revalidateBlogPublic();

    const updated = await query(
      `SELECT id, name, email, role, avatar_url, bio FROM users WHERE id = $1`,
      [auth.user.id]
    );

    return NextResponse.json({ profile: sanitizeProfile(updated.rows[0]) });
  } catch (err) {
    console.error('[PUT /api/admin/profile]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
