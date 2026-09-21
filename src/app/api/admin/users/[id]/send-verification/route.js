import { NextResponse } from 'next/server';
import { requireApiUser } from '@/lib/auth';
import { query } from '@/lib/db';
import { isSuperAdmin, ROLES } from '@/lib/roles';
import { sendVerificationEmail } from '@/lib/emailVerification';

export async function POST(request, { params }) {
  const auth = await requireApiUser({ superAdmin: true });
  if (auth.error) return auth.error;

  const { id } = await params;

  try {
    const result = await query(
      `SELECT id, name, email, role, email_verified_at, is_active FROM users WHERE id = $1`,
      [id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    const user = result.rows[0];

    if (user.role === ROLES.SUPER_ADMIN && !isSuperAdmin(auth.user)) {
      return NextResponse.json(
        { error: 'Only a Super Admin can manage Super Admin accounts.' },
        { status: 403 }
      );
    }

    if (!user.is_active) {
      return NextResponse.json({ error: 'Cannot send verification to a disabled account.' }, { status: 400 });
    }

    if (user.email_verified_at) {
      return NextResponse.json({ error: 'This email is already verified.' }, { status: 400 });
    }

    await sendVerificationEmail(user);
    return NextResponse.json({ success: true, message: 'Verification email sent.' });
  } catch (err) {
    console.error('[POST /api/admin/users/[id]/send-verification]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
