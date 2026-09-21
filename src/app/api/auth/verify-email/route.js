import { NextResponse } from 'next/server';
import { verifyEmailToken } from '@/lib/emailVerification';

export async function GET(request) {
  const token = new URL(request.url).searchParams.get('token');

  try {
    const result = await verifyEmailToken(token);

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      email: result.email,
      message: 'Email verified successfully. You can now sign in.',
    });
  } catch (err) {
    console.error('[GET /api/auth/verify-email]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
