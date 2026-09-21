import { NextResponse } from 'next/server';
import { resendVerificationForEmail } from '@/lib/emailVerification';

export async function POST(request) {
  try {
    const { email } = await request.json();
    const result = await resendVerificationForEmail(email);
    return NextResponse.json({ message: result.message });
  } catch (err) {
    console.error('[POST /api/auth/resend-verification]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
