import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { requireApiUser } from '@/lib/auth';
import { query } from '@/lib/db';
import { ASSIGNABLE_ROLES, ROLES, isSuperAdmin } from '@/lib/roles';
import { revalidateBlogPublic } from '@/lib/blog';
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
  };
}

async function countSuperAdmins(excludeId = null) {
  const params = excludeId ? [excludeId] : [];
  const result = await query(
    `SELECT COUNT(*) AS count FROM users
     WHERE role = $1 AND is_active = 1${excludeId ? ' AND id != $2' : ''}`,
    excludeId ? [ROLES.SUPER_ADMIN, excludeId] : [ROLES.SUPER_ADMIN]
  );
  return Number(result.rows[0].count) || 0;
}

// PUT /api/admin/users/[id]
export async function PUT(request, { params }) {
  const auth = await requireApiUser({ superAdmin: true });
  if (auth.error) return auth.error;

  const { id } = await params;

  try {
    const body = await request.json();
    const { name, email, role, is_active, password, avatar_url, bio } = body;

    const current = await query(`SELECT * FROM users WHERE id = $1`, [id]);
    if (current.rowCount === 0) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    const existing = current.rows[0];
    const nextRole = role ?? existing.role;
    const nextActive = is_active !== undefined ? Boolean(is_active) : Boolean(existing.is_active);

    if (existing.role === ROLES.SUPER_ADMIN && !isSuperAdmin(auth.user)) {
      return NextResponse.json(
        { error: 'Only a Super Admin can edit Super Admin accounts.' },
        { status: 403 }
      );
    }

    if (role && !rolesAssignableBy(auth.user).includes(role)) {
      return NextResponse.json(
        { error: isSuperAdmin(auth.user) ? 'Invalid role.' : 'Admins cannot assign the Super Admin role.' },
        { status: 400 }
      );
    }

    if (existing.role === ROLES.SUPER_ADMIN && nextRole !== ROLES.SUPER_ADMIN) {
      const others = await countSuperAdmins(id);
      if (others === 0) {
        return NextResponse.json({ error: 'Cannot remove the last super admin.' }, { status: 400 });
      }
    }

    if (existing.role === ROLES.SUPER_ADMIN && !nextActive) {
      const others = await countSuperAdmins(id);
      if (others === 0) {
        return NextResponse.json({ error: 'Cannot disable the last super admin.' }, { status: 400 });
      }
    }

    if (id === auth.user.id && !nextActive) {
      return NextResponse.json({ error: 'You cannot disable your own account.' }, { status: 400 });
    }

    let normalizedEmail = existing.email;
    if (email !== undefined) {
      normalizedEmail = String(email).toLowerCase().trim();
      if (!normalizedEmail) {
        return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
      }
      const taken = await query(
        `SELECT id FROM users WHERE email = $1 AND id != $2`,
        [normalizedEmail, id]
      );
      if (taken.rowCount > 0) {
        return NextResponse.json({ error: 'Email is already in use.' }, { status: 409 });
      }
    }

    let passwordHash = null;
    if (password) {
      if (password.length < 8) {
        return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 });
      }
      passwordHash = await bcrypt.hash(password, 12);
    }

    const emailChanged = normalizedEmail !== existing.email;

    await query(
      `UPDATE users SET
         name = COALESCE($1, name),
         email = $2,
         role = $3,
         is_active = $4,
         password_hash = COALESCE($5, password_hash),
         email_verified_at = IF($6 = 1, NULL, email_verified_at),
         avatar_url = IF($7 = 1, $8, avatar_url),
         bio = IF($9 = 1, $10, bio)
       WHERE id = $11`,
      [
        name?.trim() || null,
        normalizedEmail,
        nextRole,
        nextActive ? 1 : 0,
        passwordHash,
        emailChanged ? 1 : 0,
        avatar_url !== undefined ? 1 : 0,
        avatar_url !== undefined ? (avatar_url?.trim() || null) : null,
        bio !== undefined ? 1 : 0,
        bio !== undefined ? (bio?.trim() || null) : null,
        id,
      ]
    );

    if (emailChanged && nextActive) {
      try {
        await sendVerificationEmail({
          id,
          name: name?.trim() || existing.name,
          email: normalizedEmail,
        });
      } catch (mailErr) {
        console.error('[PUT /api/admin/users/[id]] verification email failed:', mailErr);
      }
    }

    if (!nextActive) {
      await query(`DELETE FROM auth_tokens WHERE user_id = $1`, [id]);
    }

    if (avatar_url !== undefined || bio !== undefined || name !== undefined) {
      revalidateBlogPublic();
    }

    const updated = await query(`SELECT * FROM users WHERE id = $1`, [id]);
    return NextResponse.json({ user: sanitizeUser(updated.rows[0]) });
  } catch (err) {
    console.error('[PUT /api/admin/users/[id]]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

// DELETE /api/admin/users/[id] — soft delete via deactivate
export async function DELETE(request, { params }) {
  const auth = await requireApiUser({ superAdmin: true });
  if (auth.error) return auth.error;

  const { id } = await params;

  if (id === auth.user.id) {
    return NextResponse.json({ error: 'You cannot delete your own account.' }, { status: 400 });
  }

  const current = await query(`SELECT role FROM users WHERE id = $1`, [id]);
  if (current.rowCount === 0) {
    return NextResponse.json({ error: 'User not found.' }, { status: 404 });
  }

  if (current.rows[0].role === ROLES.SUPER_ADMIN && !isSuperAdmin(auth.user)) {
    return NextResponse.json(
      { error: 'Only a Super Admin can disable Super Admin accounts.' },
      { status: 403 }
    );
  }

  if (current.rows[0].role === ROLES.SUPER_ADMIN) {
    const others = await countSuperAdmins(id);
    if (others === 0) {
      return NextResponse.json({ error: 'Cannot delete the last super admin.' }, { status: 400 });
    }
  }

  await query(`UPDATE users SET is_active = 0 WHERE id = $1`, [id]);
  await query(`DELETE FROM auth_tokens WHERE user_id = $1`, [id]);

  return NextResponse.json({ success: true });
}
