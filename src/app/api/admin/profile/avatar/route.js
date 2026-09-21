import { NextResponse } from 'next/server';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { requireApiUser } from '@/lib/auth';
import { query } from '@/lib/db';
import { revalidateBlogPublic } from '@/lib/blog';

const MAX_BYTES = 2 * 1024 * 1024;
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

// POST /api/admin/profile/avatar — upload profile photo
export async function POST(request) {
  const auth = await requireApiUser();
  if (auth.error) return auth.error;

  try {
    const formData = await request.formData();
    const file = formData.get('avatar');

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No image file provided.' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json({ error: 'Use JPEG, PNG, WebP, or GIF.' }, { status: 400 });
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: 'Image must be 2 MB or smaller.' }, { status: 400 });
    }

    const ext =
      file.type === 'image/png' ? 'png'
      : file.type === 'image/webp' ? 'webp'
      : file.type === 'image/gif' ? 'gif'
      : 'jpg';

    const dir = path.join(process.cwd(), 'public', 'uploads', 'avatars');
    await mkdir(dir, { recursive: true });

    const filename = `${auth.user.id}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(dir, filename), buffer);

    const avatarUrl = `/uploads/avatars/${filename}?v=${Date.now()}`;

    await query(`UPDATE users SET avatar_url = $1 WHERE id = $2`, [avatarUrl, auth.user.id]);

    revalidateBlogPublic();

    return NextResponse.json({ avatar_url: avatarUrl });
  } catch (err) {
    console.error('[POST /api/admin/profile/avatar]', err);
    return NextResponse.json({ error: 'Upload failed.' }, { status: 500 });
  }
}
