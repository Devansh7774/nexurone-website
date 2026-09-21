import { redirect } from 'next/navigation';
import { verifySession } from '@/lib/auth';
import { query } from '@/lib/db';
import { ensureNewsletterSubscribersTable } from '@/lib/newsletterSubscribers';
import SubscriberActions from '@/components/admin/SubscriberActions';

export const metadata = { title: 'Subscribers | Nexuron Admin' };
export const dynamic = 'force-dynamic';

export default async function AdminSubscribersPage() {
  const user = await verifySession();
  if (!user) redirect('/shiv_admin_login');

  await ensureNewsletterSubscribersTable();
  const result = await query(
    `SELECT id, email, name, is_active, subscribed_at, unsubscribed_at
     FROM newsletter_subscribers
     ORDER BY subscribed_at DESC`
  );

  const activeCount = result.rows.filter((r) => r.is_active).length;

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <p className="text-sm text-slate-500">
          {result.rows.length} total · {activeCount} active
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="grid grid-cols-12 gap-4 border-b border-slate-200 bg-slate-50 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <div className="col-span-4">Email</div>
          <div className="col-span-2">Name</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Subscribed</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {result.rows.length === 0 ? (
          <p className="px-6 py-12 text-center text-sm text-slate-500">No subscribers yet.</p>
        ) : (
          result.rows.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 gap-4 border-b border-slate-100 px-6 py-4 last:border-b-0 items-center transition hover:bg-slate-50"
            >
              <div className="col-span-4 truncate text-sm font-medium text-slate-900">{item.email}</div>
              <div className="col-span-2 truncate text-sm text-slate-700">{item.name || '-'}</div>
              <div className="col-span-2">
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                    item.is_active
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {item.is_active ? 'Active' : 'Unsubscribed'}
                </span>
              </div>
              <div className="col-span-2 text-sm text-slate-600">
                {new Date(item.subscribed_at).toLocaleDateString()}
              </div>
              <div className="col-span-2">
                <SubscriberActions id={item.id} isActive={item.is_active} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
