import { notFound, redirect } from 'next/navigation';
import { verifySession } from '@/lib/auth';
import AdminBackLink from '@/components/admin/AdminBackLink';
import { query } from '@/lib/db';
import { ensureCareerApplicationsTable } from '@/lib/careerApplications';

export const metadata = { title: 'Career Application Details | Nexuron Admin' };
export const dynamic = 'force-dynamic';

export default async function CareerApplicationDetailPage({ params }) {
  const user = await verifySession();
  if (!user) redirect('/shiv_admin_login');

  const { id } = await params;
  await ensureCareerApplicationsTable();

  await query(
    `UPDATE career_applications
     SET is_read = 1
     WHERE id = $1 AND is_read = 0`,
    [id]
  );

  const result = await query(
    `SELECT id, name, email, phone, location, role, cover_letter,
            cv_file_url, cv_file_name, cv_mime_type, is_read, created_at
     FROM career_applications
     WHERE id = $1`,
    [id]
  );

  if (result.rowCount === 0) notFound();
  const item = result.rows[0];

  return (
    <div className="p-6 lg:p-8">
      <AdminBackLink href="/shiv_admin/career-applications">Back to applications</AdminBackLink>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-8">
          <p className="text-sm text-slate-500">
            Submitted {new Date(item.created_at).toLocaleString()}
          </p>
          <h2 className="mt-1 text-xl font-bold text-slate-900">{item.name}</h2>
          <p className="mt-1 text-sm font-medium text-blue-600">{item.role}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Email</p>
            <p className="font-medium text-slate-900">{item.email}</p>
          </div>
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Phone</p>
            <p className="font-medium text-slate-900">{item.phone || '-'}</p>
          </div>
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Location</p>
            <p className="font-medium text-slate-900">{item.location || '-'}</p>
          </div>
        </div>

        <div className="mt-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Cover Letter</p>
          <div className="whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-800">
            {item.cover_letter}
          </div>
        </div>

        <div className="mt-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">CV / Resume</p>
          {item.cv_file_url ? (
            <a
              href={item.cv_file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-xl nexuron-btn-solid"
            >
              Open CV ({item.cv_file_name || 'File'})
            </a>
          ) : (
            <p className="text-sm text-slate-600">No CV uploaded.</p>
          )}
          {item.cv_mime_type && (
            <p className="mt-2 text-xs text-slate-500">Type: {item.cv_mime_type}</p>
          )}
        </div>
      </div>
    </div>
  );
}
