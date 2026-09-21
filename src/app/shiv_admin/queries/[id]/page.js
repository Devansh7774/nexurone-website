import { notFound, redirect } from 'next/navigation';
import { verifySession } from '@/lib/auth';
import { query } from '@/lib/db';
import { ensureContactQueriesTable } from '@/lib/contactQueries';
import AdminBackLink from '@/components/admin/AdminBackLink';
import QueryReadToggle from '@/components/admin/QueryReadToggle';

export const metadata = { title: 'Query Details | Nexuron Admin' };
export const dynamic = 'force-dynamic';

export default async function AdminQueryDetailPage({ params }) {
  const user = await verifySession();
  if (!user) redirect('/shiv_admin_login');

  const { id } = await params;
  await ensureContactQueriesTable();

  await query(
    `UPDATE contact_queries
     SET is_read = 1
     WHERE id = $1 AND is_read = 0`,
    [id]
  );

  const result = await query(
    `SELECT id, name, email, phone, message, source, service_slug, field_of_work, is_read, created_at
     FROM contact_queries
     WHERE id = $1`,
    [id]
  );

  if (result.rowCount === 0) notFound();
  const item = result.rows[0];

  return (
    <div className="p-6 lg:p-8">
      <AdminBackLink href="/shiv_admin/queries">Back to queries</AdminBackLink>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">
              Submitted {new Date(item.created_at).toLocaleString()}
            </p>
            <h2 className="mt-1 text-xl font-bold text-slate-900">{item.name}</h2>
          </div>
          <QueryReadToggle queryId={item.id} initialIsRead={item.is_read} />
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
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Source</p>
            <p className="font-medium text-slate-900">
              {item.source === 'service_page' ? 'Service page hire form' : 'Contact page'}
            </p>
          </div>
          {item.service_slug ? (
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Service</p>
              <p className="font-medium text-slate-900">/services/{item.service_slug}</p>
            </div>
          ) : null}
          {item.field_of_work ? (
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Field of work</p>
              <p className="font-medium text-slate-900">{item.field_of_work}</p>
            </div>
          ) : null}
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Status</p>
            <span
              className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                item.is_read
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-amber-100 text-amber-700'
              }`}
            >
              {item.is_read ? 'Read' : 'Unread'}
            </span>
          </div>
        </div>

        <div className="mt-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Message</p>
          <div className="whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-800">
            {item.message}
          </div>
        </div>
      </div>
    </div>
  );
}
