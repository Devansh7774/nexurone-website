import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';

export const metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
 

      <section className="flex flex-col items-center justify-center px-4 py-20 md:py-28">
        <div className="relative mb-8">
          <span className="text-[120px] md:text-[180px] font-black leading-none text-[#E6F0FF] select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="w-16 h-16 md:w-20 md:h-20 text-[#2f6bff]" strokeWidth={1.5} />
          </div>
        </div>

        <div className="inline-block px-4 py-1.5 mb-6 bg-[#E6F0FF] rounded-md">
          <span className="text-[14px] font-bold uppercase tracking-wider text-[#00102A]">
            Page Not Found
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-[#00102A] text-center mb-4 leading-tight max-w-2xl">
          Oops! This page doesn&apos;t exist
        </h1>

        <p className="text-gray-500 text-lg text-center max-w-lg mb-10 leading-relaxed">
          The page you&apos;re looking for may have been moved, deleted, or never existed.
          Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full nexuron-btn-solid"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-gray-200 text-gray-700 text-sm font-bold uppercase tracking-wider hover:border-blue-400 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            View Insights
          </Link>
        </div>


      </section>
    </div>
  );
}
