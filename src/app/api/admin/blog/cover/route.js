import { NextResponse } from 'next/server';
import { requireApiUser } from '@/lib/auth';
import { uploadToR2 } from '@/lib/r2';

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

// POST /api/admin/blog/cover — upload blog cover image to Cloudflare R2
export async function POST(request) {
  const auth = await requireApiUser();
  if (auth.error) return auth.error;

  try {
    const formData = await request.formData();
    const file = formData.get('cover');

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No image file provided.' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json({ error: 'Use JPEG, PNG, WebP, or GIF.' }, { status: 400 });
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: 'Image must be 5 MB or smaller.' }, { status: 400 });
    }

    const ext =
      file.type === 'image/png' ? 'png'
      : file.type === 'image/webp' ? 'webp'
      : file.type === 'image/gif' ? 'gif'
      : 'jpg';

    const key = `covers/${crypto.randomUUID()}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    const coverImageUrl = await uploadToR2({
      key,
      body: buffer,
      contentType: file.type,
    });

    return NextResponse.json({ cover_image_url: coverImageUrl });
  } catch (err) {
    console.error('[POST /api/admin/blog/cover]', err);
    const message =
      typeof err?.message === 'string' && err.message.startsWith('Missing required env var')
        ? 'R2 is not configured. Add R2 env vars to .env.local.'
        : 'Upload failed.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
