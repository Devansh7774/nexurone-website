'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { LayoutGrid } from 'lucide-react';
import BlogSearch from '@/components/blog/BlogSearch';

function buildHref(slug, { tag, q }) {
  const params = new URLSearchParams();
  if (slug) params.set('category', slug);
  if (tag) params.set('tag', tag);
  if (q) params.set('q', q);
  const qs = params.toString();
  return qs ? `/insights?${qs}` : '/insights';
}

function CategoryChip({ href, active, name, count, color, variant = 'category' }) {
  if (variant === 'all') {
    return (
      <Link
        href={href}
        className={`inline-flex shrink-0 items-center gap-2 px-3.5 py-2 text-[13px] font-semibold transition-colors rounded-sm ${
          active
            ? 'bg-[#00102A] text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-[#00102A]'
        }`}
      >
        <LayoutGrid className="h-3.5 w-3.5" />
        All Posts
        {count > 0 && (
          <span className={`text-[11px] font-medium ${active ? 'text-white/75' : 'text-gray-400'}`}>
            {count}
          </span>
        )}
      </Link>
    );
  }

  const activeStyle = active && color ? { backgroundColor: color, color: '#fff' } : undefined;

  return (
    <Link
      href={href}
      className={`inline-flex shrink-0 items-center gap-1.5 px-3 py-2 text-[12px] font-semibold transition-colors rounded-sm ${
        active && !color
          ? 'nexuron-btn-solid'
          : active
            ? ''
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-[#2667ff]'
      }`}
      style={activeStyle}
    >
      {color && (
        <span
          className="h-2 w-2 shrink-0 rounded-full"
          style={{ backgroundColor: active ? 'rgba(255,255,255,0.9)' : color }}
          aria-hidden
        />
      )}
      <span className="truncate">{name}</span>
      {count > 0 && (
        <span className={`text-[10px] font-medium ${active ? 'text-white/80' : 'text-gray-400'}`}>
          {count}
        </span>
      )}
    </Link>
  );
}

export default function BlogCategoryFilter({
  categories = [],
  activeCategory = null,
  activeTag = null,
  activeQuery = null,
  totalPosts = 0,
}) {
  const preserve = { tag: activeTag, q: activeQuery };
  const allActive = !activeCategory && !activeTag && !activeQuery;

  const featuredCategories = useMemo(
    () => categories.filter((c) => c.is_featured),
    [categories]
  );

  return (
    <div className="mb-10 w-full">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <CategoryChip href="/insights" active={allActive} variant="all" count={totalPosts} />

            {featuredCategories.map((cat) => (
              <CategoryChip
                key={cat.id}
                href={buildHref(cat.slug, preserve)}
                active={activeCategory === cat.slug}
                name={cat.name}
                count={cat.post_count}
                color={cat.color}
              />
            ))}

            {featuredCategories.length === 0 && categories.length > 0 && (
              <span className="text-xs text-gray-400">No featured categories yet.</span>
            )}

            {categories.length === 0 && (
              <span className="text-xs text-gray-400">No categories yet.</span>
            )}
          </div>

          {(activeCategory || activeTag || activeQuery) && (
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-gray-500">
              {activeCategory && (
                <span className="rounded-sm bg-gray-100 px-2 py-0.5 text-[12px] font-semibold text-gray-800">
                  {categories.find((c) => c.slug === activeCategory)?.name || activeCategory}
                </span>
              )}
              {activeTag && (
                <span className="rounded-sm bg-gray-100 px-2 py-0.5 text-[12px] font-semibold text-gray-800">
                  #{activeTag.replace(/-/g, ' ')}
                </span>
              )}
              {activeQuery && (
                <span className="rounded-sm bg-gray-100 px-2 py-0.5 text-[12px] font-semibold text-gray-800">
                  &ldquo;{activeQuery}&rdquo;
                </span>
              )}
              <Link href="/insights" className="text-[12px] font-medium text-[#2667ff] hover:underline">
                Clear all
              </Link>
            </div>
          )}
        </div>

        <div className="w-full shrink-0 lg:w-72">
          <BlogSearch
            defaultQuery={activeQuery || ''}
            preserveParams={{ category: activeCategory, tag: activeTag }}
            variant="compact"
            className="w-full"
            inputClassName="border-0 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-[#2667ff]/15 rounded-sm"
          />
        </div>
      </div>
    </div>
  );
}
