import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { verifySession } from '@/lib/auth';
import { query } from '@/lib/db';
import { ensureCareerApplicationsTable } from '@/lib/careerApplications';
import QueriesFilters from '@/components/admin/QueriesFilters';

export const metadata = { title: 'Career Applications | Nexuron Admin' };
export const dynamic = 'force-dynamic';

const PAGE_SIZE = 15;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const STATUS_VALUES = new Set(['all', 'read', 'unread']);
const RANGE_VALUES = new Set([
  'all',
  'today',
  'yesterday',
  'last_week',
  'last_month',
  'custom',
]);

function buildApplicationsHref({ page, range, from, to, status, q }) {
  const params = new URLSearchParams();
  if (q) params.set('q', q);
  if (range && range !== 'all') params.set('range', range);
  if (range === 'custom') {
    if (from) params.set('from', from);
    if (to) params.set('to', to);
  }
  if (status && status !== 'all') params.set('status', status);
  if (page > 1) params.set('page', String(page));
  const qs = params.toString();
  return qs ? `/shiv_admin/career-applications?${qs}` : '/shiv_admin/career-applications';
}

function pushCondition(conditions, params, clause, value) {
  params.push(value);
  conditions.push(clause.replace('?', `$${params.length}`));
}

function applyDateRange(conditions, filterParams, { range, from, to }) {
  if (range === 'today') {
    conditions.push(`DATE(created_at) = CURDATE()`);
    return;
  }
  if (range === 'yesterday') {
    conditions.push(`DATE(created_at) = DATE_SUB(CURDATE(), INTERVAL 1 DAY)`);
    return;
  }
  if (range === 'last_week') {
    conditions.push(`created_at >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)`);
    return;
  }
  if (range === 'last_month') {
    conditions.push(
      `created_at >= DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 1 MONTH), '%Y-%m-01')`
    );
    conditions.push(`created_at < DATE_FORMAT(CURDATE(), '%Y-%m-01')`);
    return;
  }
  if (range === 'custom') {
    if (from) {
      pushCondition(conditions, filterParams, `created_at >= ?`, `${from} 00:00:00`);
    }
    if (to) {
      pushCondition(conditions, filterParams, `created_at < DATE_ADD(?, INTERVAL 1 DAY)`, `${to} 00:00:00`);
    }
  }
}

export default async function AdminCareerApplicationsPage({ searchParams }) {
  const user = await verifySession();
  if (!user) redirect('/shiv_admin_login');

  await ensureCareerApplicationsTable();

  const sp = await searchParams;
  const q = typeof sp.q === 'string' ? sp.q.trim() : '';
  const rawRange = typeof sp.range === 'string' ? sp.range : 'all';
  const range = RANGE_VALUES.has(rawRange) ? rawRange : 'all';
  const rawFrom = typeof sp.from === 'string' ? sp.from : '';
  const rawTo = typeof sp.to === 'string' ? sp.to : '';
  const from = DATE_RE.test(rawFrom) ? rawFrom : '';
  const to = DATE_RE.test(rawTo) ? rawTo : '';
  const rawStatus = typeof sp.status === 'string' ? sp.status : 'all';
  const status = STATUS_VALUES.has(rawStatus) ? rawStatus : 'all';
  const requestedPage = Math.max(1, parseInt(sp.page || '1', 10) || 1);

  const conditions = [];
  const filterParams = [];

  applyDateRange(conditions, filterParams, { range, from, to });

  if (status === 'read') {
    pushCondition(conditions, filterParams, `is_read = ?`, 1);
  } else if (status === 'unread') {
    pushCondition(conditions, filterParams, `is_read = ?`, 0);
  }
  if (q) {
    const like = `%${q}%`;
    const start = filterParams.length + 1;
    filterParams.push(like, like, like, like, like);
    conditions.push(
      `(name LIKE $${start} OR email LIKE $${start + 1} OR phone LIKE $${start + 2} OR role LIKE $${start + 3} OR COALESCE(location, '') LIKE $${start + 4})`
    );
  }

  const whereSql = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const countResult = await query(
    `SELECT COUNT(*) AS count FROM career_applications ${whereSql}`,
    filterParams
  );

  const total = parseInt(countResult.rows[0].count, 10) || 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(requestedPage, totalPages);
  const offset = (page - 1) * PAGE_SIZE;

  const listParams = [...filterParams, PAGE_SIZE, offset];
  const limitIdx = filterParams.length + 1;
  const offsetIdx = filterParams.length + 2;

  const result = await query(
    `SELECT id, name, email, role, location, is_read, created_at
     FROM career_applications
     ${whereSql}
     ORDER BY created_at DESC
     LIMIT $${limitIdx} OFFSET $${offsetIdx}`,
    listParams
  );

  const fromIdx = total === 0 ? 0 : offset + 1;
  const toIdx = Math.min(offset + PAGE_SIZE, total);
  const hasFilters = Boolean(
    q || status !== 'all' || (range !== 'all' && !(range === 'custom' && !from && !to))
  );

  const hrefArgs = { range, from, to, status, q };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-4">
        <p className="text-sm text-slate-500">
          {total === 0
            ? 'No matching applications'
            : `Showing ${fromIdx}–${toIdx} of ${total} application${total === 1 ? '' : 's'}`}
        </p>
      </div>

      <QueriesFilters
        initialQ={q}
        initialRange={range}
        initialFrom={from}
        initialTo={to}
        initialStatus={status}
        searchPlaceholder="Search name, email, phone, role, location…"
        searchAriaLabel="Search applications"
      />

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="hidden grid-cols-12 gap-4 border-b border-slate-200 bg-slate-50 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 md:grid">
          <div className="col-span-2">Name</div>
          <div className="col-span-3">Email</div>
          <div className="col-span-2">Role</div>
          <div className="col-span-2">Location</div>
          <div className="col-span-2">Submitted</div>
          <div className="col-span-1">Status</div>
        </div>

        {result.rows.length === 0 ? (
          <p className="px-6 py-12 text-center text-sm text-slate-500">
            {hasFilters ? 'No applications match your filters.' : 'No applications yet.'}
          </p>
        ) : (
          result.rows.map((item) => (
            <Link
              key={item.id}
              href={`/shiv_admin/career-applications/${item.id}`}
              className={`grid grid-cols-1 gap-2 border-b border-slate-100 px-6 py-4 last:border-b-0 transition md:grid-cols-12 md:items-center md:gap-4 ${
                item.is_read ? 'bg-white hover:bg-slate-50' : 'bg-blue-50/40 hover:bg-blue-50/70'
              }`}
            >
              <div className={`md:col-span-2 truncate text-sm ${item.is_read ? 'font-medium text-slate-900' : 'font-bold text-slate-900'}`}>
                {item.name}
              </div>
              <div className={`md:col-span-3 truncate text-sm ${item.is_read ? 'font-normal text-slate-700' : 'font-semibold text-slate-900'}`}>
                {item.email}
              </div>
              <div className={`md:col-span-2 truncate text-sm ${item.is_read ? 'font-normal text-slate-700' : 'font-semibold text-slate-900'}`}>
                {item.role}
              </div>
              <div className={`md:col-span-2 truncate text-sm ${item.is_read ? 'font-normal text-slate-600' : 'font-semibold text-slate-800'}`}>
                {item.location || '-'}
              </div>
              <div className={`md:col-span-2 text-sm ${item.is_read ? 'font-normal text-slate-600' : 'font-semibold text-slate-800'}`}>
                {new Date(item.created_at).toLocaleDateString()}
              </div>
              <div className="md:col-span-1">
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

      {totalPages > 1 && (
        <div className="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-sm text-slate-500">
            Page {page} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <Link
              href={buildApplicationsHref({ ...hrefArgs, page: page - 1 })}
              aria-disabled={page <= 1}
              className={`inline-flex h-9 items-center gap-1 rounded-lg border border-slate-200 px-3 text-sm font-medium transition ${
                page <= 1
                  ? 'pointer-events-none text-slate-300'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
              Prev
            </Link>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
              .reduce((acc, p, idx, arr) => {
                if (idx > 0 && p - arr[idx - 1] > 1) acc.push('ellipsis-' + p);
                acc.push(p);
                return acc;
              }, [])
              .map((item) =>
                typeof item === 'string' ? (
                  <span key={item} className="px-1 text-slate-400">
                    …
                  </span>
                ) : (
                  <Link
                    key={item}
                    href={buildApplicationsHref({ ...hrefArgs, page: item })}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition ${
                      item === page
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {item}
                  </Link>
                )
              )}

            <Link
              href={buildApplicationsHref({ ...hrefArgs, page: page + 1 })}
              aria-disabled={page >= totalPages}
              className={`inline-flex h-9 items-center gap-1 rounded-lg border border-slate-200 px-3 text-sm font-medium transition ${
                page >= totalPages
                  ? 'pointer-events-none text-slate-300'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
