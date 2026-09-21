'use client';

import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import AdminContentSkeleton from '@/components/admin/AdminContentSkeleton';

function isAdminInternalNavigation(anchor, pathname, searchParams) {
  const href = anchor.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return false;
  }

  if (anchor.target === '_blank' || anchor.hasAttribute('download')) {
    return false;
  }

  let url;
  try {
    url = new URL(href, window.location.origin);
  } catch {
    return false;
  }

  if (url.origin !== window.location.origin || !url.pathname.startsWith('/shiv_admin')) {
    return false;
  }

  const current =
    pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
  const target = url.pathname + url.search;

  return target !== current;
}

function getTargetPathname(anchor) {
  try {
    return new URL(anchor.getAttribute('href'), window.location.origin).pathname;
  } catch {
    return null;
  }
}

function AdminContentLoaderInner({ pathname, searchParams }) {
  const [isNavigating, setIsNavigating] = useState(false);
  const [pendingPath, setPendingPath] = useState(null);
  const delayTimerRef = useRef(null);

  const clearTimer = useCallback(() => {
    if (delayTimerRef.current) {
      clearTimeout(delayTimerRef.current);
      delayTimerRef.current = null;
    }
  }, []);

  const startNavigation = useCallback(() => {
    clearTimer();
    delayTimerRef.current = setTimeout(() => {
      setIsNavigating(true);
    }, 120);
  }, [clearTimer]);

  useEffect(() => {
    const handleClick = (event) => {
      if (event.defaultPrevented) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = event.target.closest('a');
      if (!anchor || !isAdminInternalNavigation(anchor, pathname, searchParams)) return;

      setPendingPath(getTargetPathname(anchor));
      startNavigation();
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [pathname, searchParams, startNavigation]);

  useEffect(() => () => clearTimer(), [clearTimer]);

  if (!isNavigating) return null;

  return (
    <div
      className="absolute inset-0 z-20 overflow-auto bg-[#f4f7fb]"
      aria-live="polite"
      aria-busy="true"
    >
      <AdminContentSkeleton pathname={pendingPath || pathname} />
    </div>
  );
}

function AdminContentLoaderBridge() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routeKey = `${pathname}?${searchParams.toString()}`;

  return (
    <AdminContentLoaderInner
      key={routeKey}
      pathname={pathname}
      searchParams={searchParams}
    />
  );
}

export default function AdminContentLoader() {
  return (
    <Suspense fallback={null}>
      <AdminContentLoaderBridge />
    </Suspense>
  );
}
