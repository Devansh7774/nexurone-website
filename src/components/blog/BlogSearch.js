'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Search, X } from 'lucide-react';

export default function BlogSearch({
  defaultQuery = '',
  preserveParams = {},
  className = '',
  inputClassName = '',
  placeholder = 'Search articles…',
  variant = 'default',
}) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultQuery);
  const compact = variant === 'compact';
  const inputSurface =
    inputClassName ||
    `rounded-xl border border-gray-200 bg-gray-50/80 outline-none transition focus:border-[#2667ff] focus:bg-white focus:ring-2 focus:ring-[#2667ff]/10 ${
      compact ? 'rounded-sm' : ''
    }`;

  function buildHref(nextQuery) {
    const params = new URLSearchParams();
    const trimmed = nextQuery.trim();

    if (trimmed) params.set('q', trimmed);
    if (preserveParams.category) params.set('category', preserveParams.category);
    if (preserveParams.tag) params.set('tag', preserveParams.tag);

    const qs = params.toString();
    return qs ? `/insights?${qs}` : '/insights';
  }

  function handleSubmit(e) {
    e.preventDefault();
    router.push(buildHref(query));
  }

  function clearSearch() {
    setQuery('');
    router.push(buildHref(''));
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <label htmlFor={compact ? 'blog-search-compact' : 'blog-search'} className="sr-only">
        Search blog posts
      </label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          id={compact ? 'blog-search-compact' : 'blog-search'}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={`w-full text-sm text-gray-900 placeholder:text-gray-400 py-2.5 pl-10 pr-10 ${inputSurface}`}
        />
        {query ? (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-[#2667ff] hover:bg-[#E5F0F9] transition-colors"
          >
            Go
          </button>
        )}
      </div>
      {!compact && (
        <button
          type="submit"
          className="nexuron-btn-solid mt-2 w-full rounded-xl py-2.5 text-sm font-semibold shadow-sm"
        >
          Search articles
        </button>
      )}
    </form>
  );
}
