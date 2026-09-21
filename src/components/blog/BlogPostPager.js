import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function BlogPostPager({ prev = null, next = null }) {
  return (
    <nav aria-label="Insights navigation" className="mt-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prev ? (
          <Link
            href={`/insights/${prev.slug}`}
            className="group flex flex-col gap-2 rounded-2xl border border-gray-100 bg-white p-5 hover:border-[#2667ff]/30 hover:shadow-[0_8px_24px_rgba(38,103,255,0.08)] transition-all"
          >
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400 group-hover:text-[#2667ff]">
              <ArrowLeft className="w-3.5 h-3.5" />
              Previous
            </span>
            <span className="text-[15px] font-semibold text-[#00102A] leading-snug line-clamp-2 group-hover:text-[#2667ff]">
              {prev.title}
            </span>
            {prev.category_name && (
              <span className="text-[12px] text-gray-500">{prev.category_name}</span>
            )}
          </Link>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50/60 p-5 flex items-center justify-center text-[13px] text-gray-400 min-h-[108px]">
            No older post
          </div>
        )}

        {next ? (
          <Link
            href={`/insights/${next.slug}`}
            className="group flex flex-col gap-2 rounded-2xl border border-gray-100 bg-white p-5 hover:border-[#2667ff]/30 hover:shadow-[0_8px_24px_rgba(38,103,255,0.08)] transition-all sm:text-right sm:items-end"
          >
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400 group-hover:text-[#2667ff]">
              Next
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
            <span className="text-[15px] font-semibold text-[#00102A] leading-snug line-clamp-2 group-hover:text-[#2667ff]">
              {next.title}
            </span>
            {next.category_name && (
              <span className="text-[12px] text-gray-500">{next.category_name}</span>
            )}
          </Link>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50/60 p-5 flex items-center justify-center text-[13px] text-gray-400 min-h-[108px] sm:text-right">
            No newer post
          </div>
        )}
      </div>
    </nav>
  );
}
