'use client';

import { PanelLeft, PanelLeftClose, Menu } from 'lucide-react';
import { useAdminShell, ADMIN_ICON, ADMIN_ICON_BTN } from '@/components/admin/AdminShellContext';

const btnClass = ADMIN_ICON_BTN;

export default function AdminShellNavButton() {
  const { toggleSidebar, sidebarCollapsed } = useAdminShell();

  return (
    <>
      <button
        type="button"
        onClick={toggleSidebar}
        className={`${btnClass} lg:hidden`}
        aria-label="Open navigation menu"
      >
        <Menu className={ADMIN_ICON} />
      </button>
      <button
        type="button"
        onClick={toggleSidebar}
        className={`${btnClass} hidden lg:inline-flex`}
        aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {sidebarCollapsed ? (
          <PanelLeft className={ADMIN_ICON} />
        ) : (
          <PanelLeftClose className={ADMIN_ICON} />
        )}
      </button>
    </>
  );
}
