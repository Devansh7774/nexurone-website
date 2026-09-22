import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { ensureContactQueriesTable } from '@/lib/contactQueries';
import { isValidEmail } from '@/lib/validation';
import { notifyNewInquiry } from '@/lib/notifyInquiry';

export async function POST(request) {
  try {
    const body = await request.json();
    const name = String(body?.name || '').trim();
    const email = String(body?.email || '').trim().toLowerCase();
    const phone = String(body?.phone || '').trim();
    const message = String(body?.message || '').trim();
    const fieldOfWork = String(body?.fieldOfWork || '').trim();
    const serviceSlug = String(body?.serviceSlug || '').trim();
    const hireSubject = String(body?.hireSubject || 'Service Inquiry').trim();
    const serviceName = String(body?.serviceName || '').trim();

    if (!name) {
      return NextResponse.json({ error: 'Your name is required.' }, { status: 400 });
    }

    if (!email) {
      return NextResponse.json({ error: 'Work email address is required.' }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Please enter a valid email.' }, { status: 400 });
    }

    if (!message && !fieldOfWork) {
      return NextResponse.json({ error: 'Please tell us about your project.' }, { status: 400 });
    }

    const servicePath = serviceSlug ? `/services/${serviceSlug}` : '/services';
    const messageLines = [
      `Service inquiry: ${hireSubject}`,
      serviceName ? `Service: ${serviceName}` : null,
      serviceSlug ? `Page: ${servicePath}` : null,
      fieldOfWork ? `Field of work: ${fieldOfWork}` : null,
      '',
      message || (fieldOfWork ? `Field of work: ${fieldOfWork}` : ''),
    ].filter((line) => line !== null);

    await ensureContactQueriesTable();

    const id = crypto.randomUUID();
    await query(
      `INSERT INTO contact_queries (
         id, name, email, phone, message, source, service_slug, field_of_work
       )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        id,
        name,
        email,
        phone || null,
        messageLines.join('\n'),
        'service_page',
        serviceSlug || null,
        fieldOfWork || null,
      ]
    );

    const result = await query(
      `SELECT id, created_at FROM contact_queries WHERE id = $1`,
      [id]
    );

    await notifyNewInquiry({
      subject: `New service inquiry: ${hireSubject} — ${name}`,
      title: 'New service / hire inquiry',
      replyTo: email,
      rows: [
        ['Name', name],
        ['Email', email],
        ['Phone', phone],
        ['Subject', hireSubject],
        ['Service', serviceName],
        ['Service page', serviceSlug ? `/services/${serviceSlug}` : ''],
        ['Field of work', fieldOfWork],
        ['Message', message],
        ['Query ID', id],
      ],
    });

    return NextResponse.json(
      { success: true, inquiry: result.rows[0] },
      { status: 201 }
    );
  } catch (err) {
    console.error('[POST /api/public/service-inquiry]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
