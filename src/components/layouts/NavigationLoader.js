'use client';

import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';

function isInternalNavigation(anchor, pathname, searchParams) {
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

  if (url.origin !== window.location.origin) {
    return false;
  }

  const current =
    pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
  const target = url.pathname + url.search;

  return target !== current;
}

function NavigationLoaderInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);
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
    }, 250);
  }, [clearTimer]);

  useEffect(() => {
    const handleClick = (event) => {
      if (event.defaultPrevented) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = event.target.closest('a');
      if (!anchor || !isInternalNavigation(anchor, pathname, searchParams)) return;

      startNavigation();
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [pathname, searchParams, startNavigation]);

  useEffect(() => () => clearTimer(), [clearTimer]);

  if (pathname.startsWith('/shiv_admin')) {
    return null;
  }

  if (!isNavigating) return null;

  return (
    <div
      className="navigation-loader-overlay fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/70 backdrop-blur-md transition-all duration-500"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
        {/* Minimalist Logo */}
        <Image
          src="/logo-dark-t-e1756917561911.png"
          alt="Nexuron"
          width={180}
          height={48}
          className="mb-8 h-9 w-auto object-contain"
        />
        
        {/* Sleek Indeterminate Progress Line */}
        <div className="w-40 h-[2px] bg-gray-200/60 rounded-full overflow-hidden mb-6 relative">
          <div className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-[#00d2ff] via-[#0072ff] to-[#00b8ff] rounded-full animate-loader-line"></div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes loader-line {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(250%); }
        }
        .animate-loader-line {
          animation: loader-line 1.5s ease-in-out infinite;
        }
      `}} />
    </div>
  );
}

function NavigationLoaderBridge() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routeKey = `${pathname}?${searchParams.toString()}`;

  return <NavigationLoaderInner key={routeKey} />;
}

export default function NavigationLoader() {
  return (
    <Suspense fallback={null}>
      <NavigationLoaderBridge />
    </Suspense>
  );
}
