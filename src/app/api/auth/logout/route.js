import { NextResponse } from 'next/server';
import { destroySession } from '@/lib/auth';

export async function POST() {
  try {
    await destroySession();
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[POST /api/auth/logout]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
