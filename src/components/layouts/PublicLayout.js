'use client';

import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import MarketingScrollAnimator from '@/components/layouts/MarketingScrollAnimator';

export default function PublicLayout({ children }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[#0072ff] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <MarketingScrollAnimator>{children}</MarketingScrollAnimator>
      </main>
      <Footer />
    </>
  );
}
