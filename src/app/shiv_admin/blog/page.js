import { redirect } from 'next/navigation';
import { verifySession } from '@/lib/auth';
import { query } from '@/lib/db';
import { ROLES } from '@/lib/roles';
import Link from 'next/link';
import { Plus, Pencil, Eye, FileText, FolderOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import DeletePostButton from '@/components/admin/DeletePostButton';
import QueriesFilters from '@/components/admin/QueriesFilters';
import { ADMIN_BTN_PRIMARY, ADMIN_BTN_SECONDARY } from '@/components/admin/adminShellStyles';

export const metadata = { title: 'Blog Posts | Nexuron Admin' };
export const dynamic = 'force-dynamic';

const PAGE_SIZE = 15;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const STATUS_VALUES = new Set(['all', 'published', 'draft', 'archived']);
const RANGE_VALUES = new Set([
  'all',
  'today',
  'yesterday',
  'last_week',
  'last_month',
  'custom',
]);

const BLOG_STATUS_OPTIONS = [
  { value: 'all', label: 'All status' },
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
  { value: 'archived', label: 'Archived' },
];

function buildBlogHref({ page, range, from, to, status, q }) {
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
  return qs ? `/shiv_admin/blog?${qs}` : '/shiv_admin/blog';
}

function pushCondition(conditions, params, clause, value) {
  params.push(value);
  conditions.push(clause.replace('?', `$${params.length}`));
}

function formatCreatedDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  return `${dd}-${mm}-${date.getFullYear()}`;
}

function applyDateRange(conditions, filterParams, { range, from, to }) {
  if (range === 'today') {
    conditions.push(`DATE(p.created_at) = CURDATE()`);
    return;
  }
  if (range === 'yesterday') {
    conditions.push(`DATE(p.created_at) = DATE_SUB(CURDATE(), INTERVAL 1 DAY)`);
    return;
  }
  if (range === 'last_week') {
    conditions.push(`p.created_at >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)`);
    return;
  }
  if (range === 'last_month') {
    conditions.push(
      `p.created_at >= DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 1 MONTH), '%Y-%m-01')`
    );
    conditions.push(`p.created_at < DATE_FORMAT(CURDATE(), '%Y-%m-01')`);
    return;
  }
  if (range === 'custom') {
    if (from) {
      pushCondition(conditions, filterParams, `p.created_at >= ?`, `${from} 00:00:00`);
    }
    if (to) {
      pushCondition(
        conditions,
        filterParams,
        `p.created_at < DATE_ADD(?, INTERVAL 1 DAY)`,
        `${to} 00:00:00`
      );
    }
  }
}

export default async function AdminBlogListPage({ searchParams }) {
  const user = await verifySession();
  if (!user) redirect('/shiv_admin_login');

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

  if (status !== 'all') {
    pushCondition(conditions, filterParams, `p.status = ?`, status);
  }

  if (user.role === ROLES.EDITOR) {
    pushCondition(conditions, filterParams, `p.author_id = ?`, user.id);
  }

  if (q) {
    const like = `%${q}%`;
    const start = filterParams.length + 1;
    filterParams.push(like, like, like, like);
    conditions.push(
      `(p.title LIKE $${start} OR p.slug LIKE $${start + 1} OR COALESCE(u.name, '') LIKE $${start + 2} OR EXISTS (
         SELECT 1 FROM blog_post_categories pc
         JOIN blog_categories c ON c.id = pc.category_id
         WHERE pc.post_id = p.id AND c.name LIKE $${start + 3}
       ))`
    );
  }

  const whereSql = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const [countResult, categoryCountResult] = await Promise.all([
    query(
      `SELECT COUNT(*) AS count
       FROM blog_posts p
       LEFT JOIN users u ON u.id = p.author_id
       ${whereSql}`,
      filterParams
    ),
    query(`SELECT COUNT(*) AS count FROM blog_categories`),
  ]);

  const total = parseInt(countResult.rows[0].count, 10) || 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(requestedPage, totalPages);
  const offset = (page - 1) * PAGE_SIZE;

  const postsResult = await query(
    `SELECT p.id, p.title, p.slug, p.status, p.is_featured,
            p.published_at, p.created_at, p.view_count,
            u.name AS author_name,
            (SELECT GROUP_CONCAT(c.name ORDER BY c.sort_order, c.name SEPARATOR ', ')
             FROM blog_post_categories pc
             JOIN blog_categories c ON c.id = pc.category_id
             WHERE pc.post_id = p.id) AS category_names
     FROM blog_posts p
     LEFT JOIN users u ON u.id = p.author_id
     ${whereSql}
     ORDER BY p.created_at DESC
     LIMIT $${filterParams.length + 1} OFFSET $${filterParams.length + 2}`,
    [...filterParams, PAGE_SIZE, offset]
  );
  const posts = postsResult.rows;

  const categoryCount = parseInt(categoryCountResult.rows[0].count, 10) || 0;
  const fromIdx = total === 0 ? 0 : offset + 1;
  const toIdx = Math.min(offset + PAGE_SIZE, total);
  const hasFilters = Boolean(
    q || status !== 'all' || (range !== 'all' && !(range === 'custom' && !from && !to))
  );
  const hrefArgs = { range, from, to, status, q };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-500">
            {total === 0
              ? 'No matching posts'
              : `Showing ${fromIdx}–${toIdx} of ${total} post${total !== 1 ? 's' : ''}`}
            {categoryCount > 0 ? ` · ${categoryCount} categor${categoryCount === 1 ? 'y' : 'ies'}` : ''}
          </p>
          {categoryCount === 0 && (
            <p className="mt-1 text-sm text-amber-700">
              Tip: create categories first so you can organize posts on the blog page.
            </p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/shiv_admin/blog/categories"
            className={ADMIN_BTN_SECONDARY}
          >
            <FolderOpen className="h-4 w-4" />
            {categoryCount > 0 ? `Categories (${categoryCount})` : 'Set up categories'}
          </Link>
          <Link
            href="/shiv_admin/blog/new"
            className={ADMIN_BTN_PRIMARY}
          >
            <Plus className="h-4 w-4" />
            New post
          </Link>
        </div>
      </div>

      <QueriesFilters
        initialQ={q}
        initialRange={range}
        initialFrom={from}
        initialTo={to}
        initialStatus={status}
        searchPlaceholder="Search title, slug, author, category…"
        searchAriaLabel="Search blog posts"
        statusOptions={BLOG_STATUS_OPTIONS}
      />

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {posts.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
              <FileText className="h-5 w-5 text-slate-400" />
            </div>
            <p className="text-sm font-medium text-slate-800">No posts found</p>
            <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
              {hasFilters
                ? 'No posts match your filters. Try another search, date range, or status.'
                : 'Start by creating a post, or set up categories to organize your blog.'}
            </p>
            {!hasFilters && (
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/shiv_admin/blog/new"
                  className={ADMIN_BTN_PRIMARY}
                >
                  <Plus className="h-4 w-4" />
                  Create post
                </Link>
                {categoryCount === 0 && (
                  <Link
                    href="/shiv_admin/blog/categories"
                    className={ADMIN_BTN_SECONDARY}
                  >
                    <FolderOpen className="h-4 w-4" />
                    Set up categories
                  </Link>
                )}
              </div>
            )}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 text-xs uppercase tracking-wide bg-gray-50">
                <th className="px-6 py-3.5 text-left">Title</th>
                <th className="px-4 py-3.5 text-left">Categories</th>
                <th className="px-4 py-3.5 text-left">Author</th>
                <th className="px-4 py-3.5 text-left">Created</th>
                <th className="px-4 py-3.5 text-left">Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 line-clamp-1">{post.title}</div>
                    <div className="text-xs text-gray-500 mt-0.5">/blog/{post.slug}</div>
                  </td>
                  <td className="px-4 py-4 text-gray-600">{post.category_names || '—'}</td>
                  <td className="px-4 py-4 text-gray-600">{post.author_name}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-gray-600">
                    {post.created_at ? formatCreatedDate(post.created_at) : '—'}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex text-xs font-medium px-2.5 py-0.5 rounded-full ${
                      post.status === 'published'
                        ? 'bg-emerald-100 text-emerald-800'
                        : post.status === 'draft'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {post.status === 'published' && (
                        <Link
                          href={`/insights/${post.slug}`}
                          target="_blank"
                          className="p-1.5 text-gray-500 hover:text-blue-600 transition"
                          title="View post"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      )}
                      <Link
                        href={`/shiv_admin/blog/${post.id}`}
                        className="p-1.5 text-gray-500 hover:text-gray-900 transition"
                        title="Edit post"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <DeletePostButton postId={post.id} postTitle={post.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-sm text-slate-500">
            Page {page} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <Link
              href={buildBlogHref({ ...hrefArgs, page: page - 1 })}
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
                    href={buildBlogHref({ ...hrefArgs, page: item })}
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
              href={buildBlogHref({ ...hrefArgs, page: page + 1 })}
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
