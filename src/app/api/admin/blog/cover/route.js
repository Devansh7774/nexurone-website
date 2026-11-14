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
    const code = err?.name || err?.Code || err?.code || '';
    const httpStatus = err?.$metadata?.httpStatusCode;
    const message =
      typeof err?.message === 'string' && err.message.startsWith('Missing required env var')
        ? 'R2 is not configured. Add R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, and R2_PUBLIC_URL on the server.'
        : code === 'Unauthorized' || httpStatus === 401
          ? 'R2 rejected the API credentials (401 Unauthorized). Create a new R2 API token with Object Read & Write and update R2_ACCESS_KEY_ID / R2_SECRET_ACCESS_KEY on live.'
          : code === 'AccessDenied' || httpStatus === 403
            ? 'R2 denied the upload. The API token needs Object Read & Write on this bucket.'
            : typeof err?.message === 'string' && err.message.trim()
              ? `Upload failed: ${err.message}`
              : 'Upload failed.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
