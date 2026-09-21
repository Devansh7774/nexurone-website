'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ExternalLink, ChevronRight, Home } from 'lucide-react';
import {
  ADMIN_HEADER_CLASS,
  ADMIN_HEADER_PADDING,
  ADMIN_BTN,
  ADMIN_ICON,
  ADMIN_ICON_BTN,
  ADMIN_ICON_SM,
} from '@/components/admin/AdminShellContext';
import AdminShellNavButton from '@/components/admin/AdminShellNavButton';

const PAGE_META = [
  { prefix: '/shiv_admin/blog/categories', title: 'Categories', breadcrumb: [{ label: 'Blog posts', href: '/shiv_admin/blog' }] },
  { prefix: '/shiv_admin/blog/new', title: 'New post', breadcrumb: [{ label: 'Blog posts', href: '/shiv_admin/blog' }] },
  { prefix: '/shiv_admin/blog/', title: 'Edit post', breadcrumb: [{ label: 'Blog posts', href: '/shiv_admin/blog' }] },
  { prefix: '/shiv_admin/blog', title: 'Blog posts' },
  { prefix: '/shiv_admin/users', title: 'Team' },
  { prefix: '/shiv_admin/queries/', title: 'Details', breadcrumb: [{ label: 'Queries', href: '/shiv_admin/queries' }] },
  { prefix: '/shiv_admin/queries', title: 'Queries' },
  { prefix: '/shiv_admin/career-applications/', title: 'Details', breadcrumb: [{ label: 'Applications', href: '/shiv_admin/career-applications' }] },
  { prefix: '/shiv_admin/career-applications', title: 'Applications' },
  { prefix: '/shiv_admin/subscribers', title: 'Subscribers' },
  { prefix: '/shiv_admin/profile', title: 'Profile' },
  { prefix: '/shiv_admin', title: 'Dashboard', exact: true },
];

function getPageMeta(pathname) {
  for (const item of PAGE_META) {
    if (item.exact ? pathname === item.prefix : pathname.startsWith(item.prefix)) {
      return item;
    }
  }
  return { title: 'Admin' };
}

function PageTitle({ title, breadcrumb }) {
  if (breadcrumb?.length) {
    return (
      <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5 text-sm">
        {breadcrumb.map((crumb, index) => (
          <span key={crumb.href} className="flex min-w-0 items-center gap-1.5">
            {index > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-300" aria-hidden />}
            <Link
              href={crumb.href}
              className="truncate font-medium text-slate-500 transition hover:text-slate-800"
            >
              {crumb.label}
            </Link>
          </span>
        ))}
        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-300" aria-hidden />
        <span className="truncate font-semibold text-slate-900">{title}</span>
      </nav>
    );
  }

  return (
    <h1 className="truncate text-base font-semibold tracking-tight text-slate-900 sm:text-lg">
      {title}
    </h1>
  );
}

export default function AdminTopBar() {
  const pathname = usePathname();
  const { title, breadcrumb } = getPageMeta(pathname);
  const showDashboardLink = pathname !== '/shiv_admin';

  return (
    <header
      className={`sticky top-0 z-20 justify-between gap-4 border-b border-slate-200 bg-white ${ADMIN_HEADER_CLASS} ${ADMIN_HEADER_PADDING}`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <AdminShellNavButton />

        {showDashboardLink && (
          <Link
            href="/shiv_admin"
            className={`${ADMIN_ICON_BTN} hidden sm:inline-flex text-slate-500 hover:text-slate-800`}
            title="Dashboard"
            aria-label="Go to dashboard"
          >
            <Home className={ADMIN_ICON} />
          </Link>
        )}

        <div className="hidden h-5 w-px shrink-0 bg-slate-200 sm:block" aria-hidden />

        <PageTitle title={title} breadcrumb={breadcrumb} />
      </div>

      <Link
        href="/"
        target="_blank"
        className={`${ADMIN_BTN} shrink-0 border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900`}
      >
        <ExternalLink className={ADMIN_ICON_SM} />
        <span className="hidden sm:inline">View site</span>
      </Link>
    </header>
  );
}
