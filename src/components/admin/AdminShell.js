'use client';

import { usePathname } from 'next/navigation';
import AdminContentLoader from '@/components/admin/AdminContentLoader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopBar from '@/components/admin/AdminTopBar';
import { AdminShellProvider, isBlogEditorRoute, useAdminShell, ADMIN_SHELL_MARGIN_TRANSITION, ADMIN_SHELL_FADE_TRANSITION } from '@/components/admin/AdminShellContext';

function AdminShellLayout({ user, children }) {
  const pathname = usePathname();
  const hideTopBar = isBlogEditorRoute(pathname);
  const { mobileSidebarOpen, closeSidebar, mainOffsetClass } = useAdminShell();

  return (
    <>
      <button
        type="button"
        className={`fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-[2px] lg:hidden ${ADMIN_SHELL_FADE_TRANSITION} ${
          mobileSidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={closeSidebar}
        aria-label="Close menu"
        aria-hidden={!mobileSidebarOpen}
        tabIndex={mobileSidebarOpen ? 0 : -1}
      />

      <AdminSidebar user={user} />

      <div className={`flex min-h-screen flex-1 flex-col ${ADMIN_SHELL_MARGIN_TRANSITION} ${mainOffsetClass}`}>
        {!hideTopBar && <AdminTopBar />}
        <div className="relative flex-1 bg-[#f4f7fb]">
          <AdminContentLoader />
          {children}
        </div>
      </div>
    </>
  );
}

export default function AdminShell({ user, children }) {
  return (
    <AdminShellProvider>
      <AdminShellLayout user={user}>{children}</AdminShellLayout>
    </AdminShellProvider>
  );
}
