import { NextResponse } from 'next/server';
import { mkdir, writeFile, unlink, readdir } from 'fs/promises';
import path from 'path';
import { requireApiUser } from '@/lib/auth';
import { query } from '@/lib/db';
import { revalidateBlogPublic } from '@/lib/blog';

const MAX_BYTES = 2 * 1024 * 1024;
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

async function removeLocalAvatarFiles(userId) {
  const dir = path.join(process.cwd(), 'public', 'uploads', 'avatars');
  try {
    const files = await readdir(dir);
    const prefix = `${userId}.`;
    await Promise.all(
      files
        .filter((name) => name.startsWith(prefix))
        .map((name) => unlink(path.join(dir, name)).catch(() => null))
    );
  } catch {
    // Directory may not exist yet
  }
}

// POST /api/admin/profile/avatar — upload profile photo to local public/uploads
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

    // Replace any previous extension for this user
    await removeLocalAvatarFiles(auth.user.id);

    const filename = `${auth.user.id}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(dir, filename), buffer);

    const storedPath = `/uploads/avatars/${filename}`;
    const avatarUrl = `${storedPath}?v=${Date.now()}`;

    await query(`UPDATE users SET avatar_url = $1 WHERE id = $2`, [storedPath, auth.user.id]);

    revalidateBlogPublic();

    return NextResponse.json({ avatar_url: avatarUrl });
  } catch (err) {
    console.error('[POST /api/admin/profile/avatar]', err);
    return NextResponse.json(
      { error: err?.message ? `Upload failed: ${err.message}` : 'Upload failed.' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/profile/avatar — clear avatar_url in MySQL and delete local file
export async function DELETE() {
  const auth = await requireApiUser();
  if (auth.error) return auth.error;

  try {
    await query(`UPDATE users SET avatar_url = NULL WHERE id = $1`, [auth.user.id]);
    await removeLocalAvatarFiles(auth.user.id);
    revalidateBlogPublic();
    return NextResponse.json({ success: true, avatar_url: '' });
  } catch (err) {
    console.error('[DELETE /api/admin/profile/avatar]', err);
    return NextResponse.json({ error: 'Failed to remove photo.' }, { status: 500 });
  }
}
