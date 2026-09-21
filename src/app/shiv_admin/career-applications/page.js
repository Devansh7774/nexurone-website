import Link from 'next/link';
import { redirect } from 'next/navigation';
import { verifySession } from '@/lib/auth';
import { query } from '@/lib/db';
import { ensureCareerApplicationsTable } from '@/lib/careerApplications';

export const metadata = { title: 'Career Applications | Nexuron Admin' };
export const dynamic = 'force-dynamic';

export default async function AdminCareerApplicationsPage() {
  const user = await verifySession();
  if (!user) redirect('/shiv_admin_login');

  await ensureCareerApplicationsTable();
  const result = await query(
    `SELECT id, name, email, role, location, is_read, created_at
     FROM career_applications
     ORDER BY created_at DESC`
  );

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <p className="text-sm text-slate-500">{result.rows.length} total applications</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="grid grid-cols-12 gap-4 border-b border-slate-200 bg-slate-50 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <div className="col-span-2">Name</div>
          <div className="col-span-3">Email</div>
          <div className="col-span-2">Role</div>
          <div className="col-span-2">Location</div>
          <div className="col-span-2">Submitted</div>
          <div className="col-span-1">Status</div>
        </div>

        {result.rows.length === 0 ? (
          <p className="px-6 py-12 text-center text-sm text-slate-500">No applications yet.</p>
        ) : (
          result.rows.map((item) => (
            <Link
              key={item.id}
              href={`/shiv_admin/career-applications/${item.id}`}
              className={`grid grid-cols-12 gap-4 border-b border-slate-100 px-6 py-4 last:border-b-0 items-center transition ${
                item.is_read ? 'bg-white hover:bg-slate-50' : 'bg-blue-50/40 hover:bg-blue-50/70'
              }`}
            >
              <div className={`col-span-2 truncate text-sm ${item.is_read ? 'font-medium text-slate-900' : 'font-bold text-slate-900'}`}>
                {item.name}
              </div>
              <div className={`col-span-3 truncate text-sm ${item.is_read ? 'font-normal text-slate-700' : 'font-semibold text-slate-900'}`}>
                {item.email}
              </div>
              <div className={`col-span-2 truncate text-sm ${item.is_read ? 'font-normal text-slate-700' : 'font-semibold text-slate-900'}`}>
                {item.role}
              </div>
              <div className={`col-span-2 truncate text-sm ${item.is_read ? 'font-normal text-slate-600' : 'font-semibold text-slate-800'}`}>
                {item.location || '-'}
              </div>
              <div className={`col-span-2 text-sm ${item.is_read ? 'font-normal text-slate-600' : 'font-semibold text-slate-800'}`}>
                {new Date(item.created_at).toLocaleDateString()}
              </div>
              <div className="col-span-1">
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
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
