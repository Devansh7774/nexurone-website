import { NextResponse } from 'next/server';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { query } from '@/lib/db';
import { ensureCareerApplicationsTable } from '@/lib/careerApplications';
import { notifyNewInquiry } from '@/lib/notifyInquiry';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_MIME = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitizeFilename(name) {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_');
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const location = String(formData.get('location') || '').trim();
    const role = String(formData.get('role') || '').trim();
    const coverLetter = String(formData.get('coverLetter') || '').trim();
    const cvFile = formData.get('cvFile');

    if (!name || !email || !location || !role || !coverLetter) {
      return NextResponse.json(
        { error: 'Please fill all required fields.' },
        { status: 400 }
      );
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Please enter a valid email.' }, { status: 400 });
    }

    let cvFileUrl = null;
    let cvFileName = null;
    let cvMimeType = null;

    if (cvFile && typeof cvFile === 'object' && cvFile.size > 0) {
      if (!ALLOWED_MIME.has(cvFile.type)) {
        return NextResponse.json(
          { error: 'Only PDF, DOC, and DOCX files are allowed.' },
          { status: 400 }
        );
      }
      if (cvFile.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: 'CV file size must be 2MB or less.' },
          { status: 400 }
        );
      }

      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'career-cv');
      await mkdir(uploadDir, { recursive: true });

      const safeOriginal = sanitizeFilename(cvFile.name || 'cv');
      const storedName = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}-${safeOriginal}`;
      const diskPath = path.join(uploadDir, storedName);
      const bytes = await cvFile.arrayBuffer();
      await writeFile(diskPath, Buffer.from(bytes));

      cvFileUrl = `/uploads/career-cv/${storedName}`;
      cvFileName = cvFile.name || safeOriginal;
      cvMimeType = cvFile.type || null;
    }

    await ensureCareerApplicationsTable();
    const id = crypto.randomUUID();
    await query(
      `INSERT INTO career_applications
       (id, name, email, phone, location, role, cover_letter, cv_file_url, cv_file_name, cv_mime_type)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
      [id, name, email, phone || null, location, role, coverLetter, cvFileUrl, cvFileName, cvMimeType]
    );

    const result = await query(
      `SELECT id, created_at FROM career_applications WHERE id = $1`,
      [id]
    );

    await notifyNewInquiry({
      subject: `New career application: ${role} — ${name}`,
      title: 'New career application',
      replyTo: email,
      rows: [
        ['Name', name],
        ['Email', email],
        ['Phone', phone],
        ['Location', location],
        ['Role', role],
        ['Cover letter', coverLetter],
        ['CV', cvFileName || 'Not attached'],
        ['Application ID', id],
      ],
    });

    return NextResponse.json({ success: true, application: result.rows[0] }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/public/career]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
