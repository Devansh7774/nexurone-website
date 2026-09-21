import { redirect } from 'next/navigation';
import { verifySession } from '@/lib/auth';
import { query } from '@/lib/db';
import { ROLES } from '@/lib/roles';
import { ensureContactQueriesTable } from '@/lib/contactQueries';
import { ensureCareerApplicationsTable } from '@/lib/careerApplications';
import { ensureNewsletterSubscribersTable } from '@/lib/newsletterSubscribers';
import {
  ADMIN_BTN_GHOST_ON_DARK,
  ADMIN_BTN_PRIMARY,
  ADMIN_ICON,
  ADMIN_ICON_SM,
} from '@/components/admin/adminShellStyles';
import Link from 'next/link';
import {
  FileText,
  Plus,
  MessageSquare,
  Briefcase,
  Mail,
  Users,
  ArrowUpRight,
  PenLine,
} from 'lucide-react';

export const metadata = { title: 'Dashboard | Nexuron Admin' };

export default async function AdminDashboardPage() {
  const user = await verifySession();
  if (!user) redirect('/shiv_admin_login');
  if (user.role === ROLES.EDITOR) redirect('/shiv_admin/blog');

  await Promise.all([
    ensureContactQueriesTable(),
    ensureCareerApplicationsTable(),
    ensureNewsletterSubscribersTable(),
  ]);

  const [blogStats, recentPosts, queryStats, careerStats, subscriberStats] = await Promise.all([
    query(`SELECT
             SUM(CASE WHEN status = 'published' THEN 1 ELSE 0 END) AS published,
             SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END) AS drafts
           FROM blog_posts`),
    query(`SELECT p.id, p.title, p.slug, p.status, p.created_at,
                  u.name AS author_name
           FROM blog_posts p
           LEFT JOIN users u ON u.id = p.author_id
           ORDER BY p.created_at DESC
           LIMIT 5`),
    query(`SELECT
             COUNT(*) AS total,
             SUM(CASE WHEN is_read = 0 THEN 1 ELSE 0 END) AS unread
           FROM contact_queries`),
    query(`SELECT COUNT(*) AS total FROM career_applications`),
    query(`SELECT
             COUNT(*) AS total,
             SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) AS active
           FROM newsletter_subscribers`),
  ]);

  const b = blogStats.rows[0];
  const q = queryStats.rows[0];
  const c = careerStats.rows[0];
  const s = subscriberStats.rows[0];

  const stats = [
    {
      label: 'Published Posts',
      value: b.published || 0,
      hint: `${b.drafts || 0} drafts`,
      icon: FileText,
      href: '/shiv_admin/blog?status=published',
      accent: 'from-blue-500 to-blue-600',
    },
    {
      label: 'Unread Queries',
      value: q.unread || 0,
      hint: `${q.total || 0} total`,
      icon: MessageSquare,
      href: '/shiv_admin/queries',
      accent: 'from-violet-500 to-indigo-600',
    },
    {
      label: 'Career Applications',
      value: c.total || 0,
      hint: 'All submissions',
      icon: Briefcase,
      href: '/shiv_admin/career-applications',
      accent: 'from-emerald-500 to-teal-600',
    },
    {
      label: 'Active Subscribers',
      value: s.active || 0,
      hint: `${s.total || 0} total`,
      icon: Mail,
      href: '/shiv_admin/subscribers',
      accent: 'from-amber-500 to-orange-500',
    },
  ];

  const quickActions = [
    { href: '/shiv_admin/blog/new', label: 'New blog post', icon: PenLine },
    { href: '/shiv_admin/queries', label: 'View queries', icon: MessageSquare },
    { href: '/shiv_admin/career-applications', label: 'Review applications', icon: Users },
  ];

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 overflow-hidden rounded-[24px] border border-slate-200 bg-gradient-to-br from-[#0b1220] via-[#111b2e] to-[#1e3a8a] p-6 text-white shadow-xl sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200/80">
          Welcome back
        </p>
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{user.name}</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-300">
          Manage content, review applications, and keep Nexuron&apos;s digital presence up to date from one place.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {quickActions.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={ADMIN_BTN_GHOST_ON_DARK}
            >
              <Icon className={ADMIN_ICON_SM} />
              {label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${item.accent} text-white shadow-md`}
              >
                <item.icon className={ADMIN_ICON} />
              </div>
              <ArrowUpRight className={`${ADMIN_ICON_SM} text-slate-300 transition group-hover:text-blue-500`} />
            </div>
            <p className="mt-5 text-3xl font-bold text-slate-900">{item.value}</p>
            <p className="mt-1 text-sm font-medium text-slate-700">{item.label}</p>
            <p className="mt-1 text-xs text-slate-500">{item.hint}</p>
          </Link>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Recent Blog Posts</h2>
            <p className="text-sm text-slate-500">Latest content activity</p>
          </div>
          <Link
            href="/shiv_admin/blog/new"
            className={ADMIN_BTN_PRIMARY}
          >
            <Plus className={ADMIN_ICON_SM} />
            New post
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {recentPosts.rows.length === 0 ? (
            <p className="px-6 py-12 text-center text-sm text-slate-500">No posts yet.</p>
          ) : (
            recentPosts.rows.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between gap-4 px-6 py-4 transition hover:bg-slate-50"
              >
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/shiv_admin/blog/${post.id}`}
                    className="block truncate text-sm font-semibold text-slate-900 transition hover:text-blue-600"
                  >
                    {post.title}
                  </Link>
                  <p className="mt-1 text-xs text-slate-500">
                    {post.author_name} · {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    post.status === 'published'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {post.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
