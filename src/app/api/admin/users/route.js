import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { requireApiUser } from '@/lib/auth';
import { query } from '@/lib/db';
import { ASSIGNABLE_ROLES, ROLES, isSuperAdmin } from '@/lib/roles';
import { sendVerificationEmail } from '@/lib/emailVerification';

const VALID_ROLES = ASSIGNABLE_ROLES.map((r) => r.value);

function rolesAssignableBy(actor) {
  if (isSuperAdmin(actor)) return VALID_ROLES;
  return VALID_ROLES.filter((r) => r !== ROLES.SUPER_ADMIN);
}

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
    post_count: Number(row.post_count) || 0,
  };
}

// GET /api/admin/users
export async function GET() {
  const auth = await requireApiUser({ superAdmin: true });
  if (auth.error) return auth.error;

  const result = await query(
    `SELECT u.id, u.name, u.email, u.role, u.avatar_url, u.bio, u.is_active, u.email_verified_at, u.last_login_at, u.created_at,
            COUNT(p.id) AS post_count
     FROM users u
     LEFT JOIN blog_posts p ON p.author_id = u.id
     GROUP BY u.id, u.name, u.email, u.role, u.avatar_url, u.bio, u.is_active, u.email_verified_at, u.last_login_at, u.created_at
     ORDER BY u.created_at DESC`
  );

  return NextResponse.json({ users: result.rows.map(sanitizeUser) });
}

// POST /api/admin/users
export async function POST(request) {
  const auth = await requireApiUser({ superAdmin: true });
  if (auth.error) return auth.error;

  try {
    const body = await request.json();
    const { name, email, password, role = 'editor', is_active = true, avatar_url = null, bio = null } = body;

    if (!name?.trim() || !email?.trim() || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required.' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 });
    }

    const allowedRoles = rolesAssignableBy(auth.user);
    if (!allowedRoles.includes(role)) {
      return NextResponse.json(
        { error: isSuperAdmin(auth.user) ? 'Invalid role.' : 'Admins cannot create Super Admin accounts.' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existing = await query(`SELECT id FROM users WHERE email = $1`, [normalizedEmail]);
    if (existing.rowCount > 0) {
      return NextResponse.json({ error: 'A user with this email already exists.' }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const userId = crypto.randomUUID();

    await query(
      `INSERT INTO users (id, name, email, password_hash, role, is_active, avatar_url, bio)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        userId, name.trim(), normalizedEmail, passwordHash, role, is_active ? 1 : 0,
        avatar_url?.trim() || null, bio?.trim() || null,
      ]
    );

    const created = await query(
      `SELECT u.id, u.name, u.email, u.role, u.avatar_url, u.bio, u.is_active, u.email_verified_at, u.last_login_at, u.created_at,
              0 AS post_count
       FROM users u WHERE u.id = $1`,
      [userId]
    );

    try {
      await sendVerificationEmail({
        id: userId,
        name: name.trim(),
        email: normalizedEmail,
      });
    } catch (mailErr) {
      console.error('[POST /api/admin/users] verification email failed:', mailErr);
    }

    return NextResponse.json(
      {
        user: sanitizeUser(created.rows[0]),
        message: 'User created. A verification email has been sent.',
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('[POST /api/admin/users]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
