import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { query } from '@/lib/db';
import { createSession } from '@/lib/auth';

const DB_ERROR_CODES = new Set([
  'ER_ACCESS_DENIED_ERROR',
  'ECONNREFUSED',
  'ETIMEDOUT',
  'ENOTFOUND',
  'PROTOCOL_CONNECTION_LOST',
]);

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const result = await query(
      `SELECT id, name, email, role, password_hash, is_active, email_verified_at
       FROM users WHERE email = $1 LIMIT 1`,
      [email.toLowerCase().trim()]
    );

    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    if (!user.is_active) {
      return NextResponse.json(
        { error: 'Account is disabled. Contact an administrator.' },
        { status: 403 }
      );
    }

    if (!user.email_verified_at) {
      return NextResponse.json(
        {
          error: 'Please verify your email before signing in.',
          code: 'EMAIL_NOT_VERIFIED',
          email: user.email,
        },
        { status: 403 }
      );
    }

    // Update last login timestamp
    await query(`UPDATE users SET last_login_at = NOW() WHERE id = $1`, [user.id]);

    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || null;
    const userAgent = request.headers.get('user-agent') || null;

    await createSession(user.id, { ip, userAgent });

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('[POST /api/auth/login]', err.code || err.message, err);

    if (DB_ERROR_CODES.has(err?.code) || err?.message?.includes('DATABASE_URL')) {
      return NextResponse.json(
        { error: 'Database connection failed. Check DATABASE_URL on the server.' },
        { status: 503 }
      );
    }

    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
