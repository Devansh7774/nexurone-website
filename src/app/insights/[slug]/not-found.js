import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Post Not Found',
};

export default function BlogPostNotFound() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gray-50 border-b border-gray-100 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Insight Not Found</h1>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center px-4 py-20 md:py-28">
        <div className="text-6xl mb-6">📝</div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#00102A] text-center mb-4">
          This insight doesn&apos;t exist
        </h2>
        <p className="text-gray-500 text-center max-w-md mb-10 leading-relaxed">
          The article may have been removed, is still a draft, or the link is incorrect.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full nexuron-btn-solid"
          >
            <ArrowLeft className="w-4 h-4" />
            All Insights
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-gray-200 text-gray-700 text-sm font-bold uppercase tracking-wider hover:border-blue-400 hover:text-blue-600 transition-colors"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
        </div>
      </section>
    </div>
  );
}
