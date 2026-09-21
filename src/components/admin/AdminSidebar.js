'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  LogOut,
  MessageSquare,
  UserCog,
  CircleUser,
  X,
  Mail,
} from 'lucide-react';
import { canManageUsers, canAccessFullAdmin, roleLabel } from '@/lib/roles';
import AuthorAvatar from '@/components/blog/AuthorAvatar';
import {
  ADMIN_SIDEBAR_BRAND_CLASS,
  ADMIN_SHELL_SLIDE_TRANSITION,
  ADMIN_SHELL_TRANSITION,
  useAdminShell,
  ADMIN_BTN,
  ADMIN_ICON,
} from '@/components/admin/AdminShellContext';

const SIDEBAR_ACTION_BTN = `${ADMIN_BTN} text-xs font-medium`;

const allNavItems = [
  { href: '/shiv_admin', label: 'Dashboard', icon: LayoutDashboard, exact: true, section: 'full' },
  { href: '/shiv_admin/blog', label: 'Blog Posts', icon: FileText, section: 'blog' },
  { href: '/shiv_admin/users', label: 'Team Users', icon: UserCog, section: 'users' },
  { href: '/shiv_admin/queries', label: 'Queries', icon: MessageSquare, section: 'full' },
  { href: '/shiv_admin/career-applications', label: 'Career Applications', icon: Briefcase, section: 'full' },
  { href: '/shiv_admin/subscribers', label: 'Subscribers', icon: Mail, section: 'full' },
];

function SidebarLabel({ show, children, className = '' }) {
  return (
    <span
      className={`overflow-hidden whitespace-nowrap ${ADMIN_SHELL_TRANSITION} ${
        show ? 'max-w-[11rem] opacity-100' : 'max-w-0 opacity-0'
      } ${className}`}
    >
      {children}
    </span>
  );
}

export default function AdminSidebar({ user }) {
  const pathname = usePathname();
  const router = useRouter();
  const { sidebarCollapsed, mobileSidebarOpen, closeSidebar, sidebarWidthClass } = useAdminShell();

  const navItems = allNavItems.filter((item) => {
    if (item.section === 'users') return canManageUsers(user);
    if (item.section === 'full') return canAccessFullAdmin(user);
    return true;
  });

  const isProfileActive = pathname.startsWith('/shiv_admin/profile');

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/shiv_admin_login');
    router.refresh();
  }

  function isActive(href, exact) {
    return exact ? pathname === href : pathname.startsWith(href);
  }

  function handleNavClick() {
    closeSidebar();
  }

  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-screen flex-col overflow-hidden border-r border-slate-800/80 bg-[#0b1220] will-change-[width,transform] ${ADMIN_SHELL_SLIDE_TRANSITION} ${sidebarWidthClass} ${
        mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}
    >
      <div
        className={`${ADMIN_SIDEBAR_BRAND_CLASS} overflow-hidden ${ADMIN_SHELL_TRANSITION} ${
          sidebarCollapsed ? 'justify-center px-0 lg:px-2' : ''
        }`}
      >
        <Link
          href="/shiv_admin"
          onClick={handleNavClick}
          className="relative flex h-8 min-w-0 flex-1 items-center justify-center rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 lg:flex-none lg:justify-start"
          title="Dashboard"
        >
          <Image
            src="/logo-light-t-e1756834855898.png"
            alt="Nexuron"
            width={160}
            height={32}
            className={`h-8 w-auto max-w-[10.5rem] object-contain object-left ${ADMIN_SHELL_TRANSITION} ${
              sidebarCollapsed ? 'pointer-events-none absolute opacity-0 lg:scale-95' : 'opacity-100 lg:scale-100'
            }`}
            priority
          />
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white ${ADMIN_SHELL_TRANSITION} ${
              sidebarCollapsed ? 'opacity-100 scale-100' : 'pointer-events-none absolute opacity-0 scale-95'
            }`}
          >
            N
          </span>
          <span className="sr-only">Nexuron CMS | Dashboard</span>
        </Link>
        <button
          type="button"
          onClick={closeSidebar}
          className={`${ADMIN_BTN} w-10 shrink-0 px-0 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden ${ADMIN_SHELL_TRANSITION} ${
            mobileSidebarOpen ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label="Close menu"
        >
          <X className={ADMIN_ICON} />
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-x-hidden overflow-y-auto px-2 py-4">
        <p
          className={`mb-3 overflow-hidden px-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 ${ADMIN_SHELL_TRANSITION} ${
            sidebarCollapsed ? 'max-h-0 opacity-0' : 'max-h-6 opacity-100'
          }`}
        >
          {canAccessFullAdmin(user) ? 'Management' : 'Blog'}
        </p>
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const active = isActive(href, exact);
          return (
            <Link
              key={href}
              href={href}
              onClick={handleNavClick}
              title={sidebarCollapsed ? label : undefined}
              className={`flex items-center rounded-xl text-sm font-medium ${ADMIN_SHELL_TRANSITION} ${
                sidebarCollapsed ? 'justify-center px-2 py-2.5' : 'gap-3 px-3 py-2.5'
              } ${
                active
                  ? 'bg-gradient-to-r from-blue-600/20 to-indigo-600/10 text-white shadow-[inset_3px_0_0_0_#3b82f6]'
                  : 'text-slate-400 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <Icon className={`${ADMIN_ICON} ${active ? 'text-blue-400' : ''}`} />
              <SidebarLabel show={!sidebarCollapsed}>{label}</SidebarLabel>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 p-2">
        <div
          className={`rounded-2xl border border-slate-800 bg-slate-900/70 ${ADMIN_SHELL_TRANSITION} ${
            sidebarCollapsed ? 'p-2' : 'p-3'
          }`}
        >
          <div
            className={`flex items-center ${ADMIN_SHELL_TRANSITION} ${
              sidebarCollapsed ? 'justify-center' : 'gap-3'
            }`}
          >
            <AuthorAvatar name={user.name} avatarUrl={user.avatar_url} size="sm" />
            <div
              className={`min-w-0 flex-1 overflow-hidden ${ADMIN_SHELL_TRANSITION} ${
                sidebarCollapsed ? 'max-w-0 opacity-0' : 'max-w-full opacity-100'
              }`}
            >
              <p className="truncate text-sm font-medium text-white">{user.name}</p>
              <p className="truncate text-xs text-slate-400">{roleLabel(user.role)}</p>
            </div>
          </div>

          <div
            className={`mt-3 ${ADMIN_SHELL_TRANSITION} ${
              sidebarCollapsed ? 'flex flex-col gap-2' : 'grid grid-cols-2 gap-2'
            }`}
          >
            <Link
              href="/shiv_admin/profile"
              onClick={handleNavClick}
              title="Profile"
              className={`${SIDEBAR_ACTION_BTN} ${
                sidebarCollapsed ? 'w-10 px-0' : 'flex-1'
              } ${
                isProfileActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <CircleUser className={ADMIN_ICON} />
              <SidebarLabel show={!sidebarCollapsed}>Profile</SidebarLabel>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              title="Sign out"
              className={`${SIDEBAR_ACTION_BTN} ${
                sidebarCollapsed ? 'w-10 px-0' : 'flex-1'
              } bg-slate-800 text-slate-300 hover:bg-red-500/15 hover:text-red-300`}
            >
              <LogOut className={ADMIN_ICON} />
              <SidebarLabel show={!sidebarCollapsed}>Sign out</SidebarLabel>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
