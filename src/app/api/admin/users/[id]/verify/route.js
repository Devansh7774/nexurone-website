import { NextResponse } from 'next/server';
import { requireApiUser } from '@/lib/auth';
import { query } from '@/lib/db';
import { isSuperAdmin, ROLES } from '@/lib/roles';
import { markEmailVerified } from '@/lib/emailVerification';

function sanitizeUser(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    avatar_url: row.avatar_url || '',
    bio: row.bio || '',
    is_active: Boolean(row.is_active),
    email_verified: Boolean(row.email_verified_at),
    email_verified_at: row.email_verified_at,
    last_login_at: row.last_login_at,
    created_at: row.created_at,
  };
}

/** POST /api/admin/users/[id]/verify — mark email as verified without the email link */
export async function POST(request, { params }) {
  const auth = await requireApiUser({ superAdmin: true });
  if (auth.error) return auth.error;

  const { id } = await params;

  try {
    const result = await query(
      `SELECT id, name, email, role, avatar_url, bio, is_active, email_verified_at, last_login_at, created_at
       FROM users WHERE id = $1`,
      [id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    const user = result.rows[0];

    if (user.role === ROLES.SUPER_ADMIN && !isSuperAdmin(auth.user)) {
      return NextResponse.json(
        { error: 'Only a Super Admin can verify Super Admin accounts.' },
        { status: 403 }
      );
    }

    if (!user.is_active) {
      return NextResponse.json(
        { error: 'Cannot verify a disabled account. Enable the user first.' },
        { status: 400 }
      );
    }

    if (user.email_verified_at) {
      return NextResponse.json({ error: 'This email is already verified.' }, { status: 400 });
    }

    await markEmailVerified(id);

    const updated = await query(
      `SELECT id, name, email, role, avatar_url, bio, is_active, email_verified_at, last_login_at, created_at
       FROM users WHERE id = $1`,
      [id]
    );

    return NextResponse.json({
      user: sanitizeUser(updated.rows[0]),
      message: `${user.name} is now verified and can sign in.`,
    });
  } catch (err) {
    console.error('[POST /api/admin/users/[id]/verify]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
