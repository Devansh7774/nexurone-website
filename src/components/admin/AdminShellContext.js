'use client';

import { createContext, useContext, useCallback, useMemo, useState, useSyncExternalStore } from 'react';
import { isAdminBlogEditorPath } from '@/lib/adminRoutes';

const STORAGE_KEY = 'nexuron-admin-sidebar-collapsed';

const sidebarListeners = new Set();

function readSidebarCollapsed() {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

function subscribeSidebar(onStoreChange) {
  if (typeof window === 'undefined') return () => {};
  sidebarListeners.add(onStoreChange);
  const onStorage = (event) => {
    if (event.key === STORAGE_KEY || event.key === null) {
      onStoreChange();
    }
  };
  window.addEventListener('storage', onStorage);
  return () => {
    sidebarListeners.delete(onStoreChange);
    window.removeEventListener('storage', onStorage);
  };
}

function writeSidebarCollapsed(collapsed) {
  try {
    localStorage.setItem(STORAGE_KEY, String(collapsed));
  } catch {
    // ignore
  }
  sidebarListeners.forEach((listener) => listener());
}

const AdminShellContext = createContext({
  sidebarCollapsed: false,
  mobileSidebarOpen: false,
  mainOffsetClass: 'lg:ml-64',
  sidebarLeftClass: 'lg:left-64',
  openSidebar: () => {},
  closeSidebar: () => {},
  toggleSidebar: () => {},
});

export function AdminShellProvider({ children }) {
  const sidebarCollapsed = useSyncExternalStore(
    subscribeSidebar,
    readSidebarCollapsed,
    () => false
  );
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const openSidebar = useCallback(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setMobileSidebarOpen(true);
    } else {
      writeSidebarCollapsed(false);
    }
  }, []);

  const closeSidebar = useCallback(() => {
    setMobileSidebarOpen(false);
  }, []);

  const toggleSidebar = useCallback(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setMobileSidebarOpen((open) => !open);
      return;
    }
    writeSidebarCollapsed(!readSidebarCollapsed());
  }, []);

  const layout = useMemo(
    () => ({
      sidebarCollapsed,
      mobileSidebarOpen,
      mainOffsetClass: sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64',
      sidebarLeftClass: sidebarCollapsed ? 'lg:left-16' : 'lg:left-64',
      sidebarWidthClass: sidebarCollapsed ? 'w-64 lg:w-16' : 'w-64',
      openSidebar,
      closeSidebar,
      toggleSidebar,
    }),
    [sidebarCollapsed, mobileSidebarOpen, openSidebar, closeSidebar, toggleSidebar]
  );

  return (
    <AdminShellContext.Provider value={layout}>
      {children}
    </AdminShellContext.Provider>
  );
}

export function useAdminShell() {
  return useContext(AdminShellContext);
}

export function isBlogEditorRoute(pathname) {
  return isAdminBlogEditorPath(pathname);
}

export {
  ADMIN_HEADER_HEIGHT,
  ADMIN_HEADER_PADDING,
  ADMIN_HEADER_CLASS,
  ADMIN_SIDEBAR_BRAND_CLASS,
  ADMIN_SHELL_EASE,
  ADMIN_SHELL_DURATION,
  ADMIN_SHELL_TRANSITION,
  ADMIN_SHELL_SLIDE_TRANSITION,
  ADMIN_SHELL_MARGIN_TRANSITION,
  ADMIN_SHELL_LEFT_TRANSITION,
  ADMIN_SHELL_FADE_TRANSITION,
  ADMIN_BTN,
  ADMIN_ICON_BTN,
  ADMIN_ICON,
  ADMIN_ICON_SM,
  ADMIN_BTN_PRIMARY,
  ADMIN_BTN_SECONDARY,
  ADMIN_BTN_GHOST_ON_DARK,
} from './adminShellStyles.js';
