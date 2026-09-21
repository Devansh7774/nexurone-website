import Link from 'next/link';
import Image from 'next/image';
import { Clock } from 'lucide-react';
import { getBlogPosts, getBlogCategories, getPublishedBlogPostCount } from '@/lib/blog';
import AuthorByline from '@/components/blog/AuthorByline';
import BlogCategoryBadges from '@/components/blog/BlogCategoryBadges';
import BlogCategoryFilter from '@/components/blog/BlogCategoryFilter';

import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Insights',
  description: 'Insights, tutorials and updates from the Nexuron Technologies team.',
  path: '/insights',
});

/** ISR (seconds). Must match `BLOG_REVALIDATE_SECONDS` in `@/lib/blog`. */
export const revalidate = 60;

function formatDate(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default async function BlogPage({ searchParams }) {
  const sp       = await searchParams;
  const page     = Math.max(1, parseInt(sp.page  || '1'));
  const category = sp.category || null;
  const tag      = sp.tag || null;
  const q        = sp.q?.trim() || null;

  let posts = [];
  let total = 0;
  let totalPages = 0;
  let categories = [];
  let allPostsTotal = 0;

  try {
    [{ posts, total, totalPages }, categories, allPostsTotal] = await Promise.all([
      getBlogPosts({ page, limit: 9, category, tag, q }),
      getBlogCategories(),
      getPublishedBlogPostCount(),
    ]);
  } catch (err) {
    console.error('[BlogPage] Failed to load blog data:', err.message);
  }

  const offset = (page - 1) * 9;

  function pageHref(nextPage) {
    const params = new URLSearchParams();
    if (nextPage > 1) params.set('page', String(nextPage));
    if (category) params.set('category', category);
    if (tag) params.set('tag', tag);
    if (q) params.set('q', q);
    const qs = params.toString();
    return qs ? `/insights?${qs}` : '/insights';
  }

  return (
    <div className="min-h-screen bg-white">

      {/* ── Page Header ── */}
      <section className="bg-white pt-24 pb-10 px-4 sm:px-6 border-b border-gray-100">
        <div className="container mx-auto max-w-[1200px]">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#00102A] mb-4 tracking-tight">
            Insights
          </h1>
          <p className="text-base md:text-lg text-gray-500 max-w-2xl">
            Insights, tutorials, and updates from the Nexuron Technologies team. Learn how to build better digital products.
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-10 lg:py-12 w-full">

        <BlogCategoryFilter
          categories={categories}
          activeCategory={category}
          activeTag={tag}
          activeQuery={q}
          totalPosts={allPostsTotal}
        />

        {/* ── Post count ── */}
        {total > 0 && (
          <p className="text-xs text-gray-400 mb-7 text-center">
            Showing {offset + 1}–{Math.min(offset + 9, total)} of{' '}
            <span className="text-gray-600 font-medium">{total}</span> posts
          </p>
        )}

        {/* ── Grid ── */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-3">{q ? '🔍' : '📝'}</div>
            <h2 className="text-lg font-semibold text-gray-700 mb-1.5">
              {q ? 'No posts match your search' : 'No posts yet'}
            </h2>
            <p className="text-sm text-gray-400">
              {q ? 'Try different keywords or browse all posts.' : 'Check back soon, we will publish regularly.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-12">
            {page > 1 && (
              <Link
                href={pageHref(page - 1)}
                className="px-4 py-2 rounded-full border border-gray-200 text-[13px] text-gray-600 hover:border-blue-500 hover:text-blue-600 transition"
              >
                ← Previous
              </Link>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={pageHref(p)}
                className={`w-9 h-9 flex items-center justify-center rounded-full text-[13px] font-medium transition ${
                  p === page
                    ? 'nexuron-btn-solid w-9 h-9 shadow-sm'
                    : 'border border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600'
                }`}
              >
                {p}
              </Link>
            ))}
            {page < totalPages && (
              <Link
                href={pageHref(page + 1)}
                className="px-4 py-2 rounded-full border border-gray-200 text-[13px] text-gray-600 hover:border-blue-500 hover:text-blue-600 transition"
              >
                Next →
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function BlogCard({ post }) {
  const color = post.category_color || post.categories?.[0]?.color || '#3B82F6';
  const dateLabel = post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).toUpperCase() : '';

  return (
    <article className="group flex flex-col h-full rounded-2xl border border-gray-100 bg-white overflow-hidden transition-all duration-500 ease-out hover:shadow-[0_24px_48px_-12px_rgba(0,16,42,0.15)]">
      <div className="relative overflow-hidden h-[200px] sm:h-[220px] bg-gray-100">
        <Link
          href={`/insights/${post.slug}`}
          aria-label={`Open blog post: ${post.title}`}
          className="absolute inset-0 block"
        >
          {post.cover_image_url ? (
            <Image
              src={post.cover_image_url}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
              quality={90}
              className="object-cover transform-gpu [backface-visibility:hidden] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${color}22, ${color}55)` }}
            >
              <span className="text-5xl font-bold opacity-20" style={{ color }}>
                {post.title.charAt(0)}
              </span>
            </div>
          )}
        </Link>

        {post.is_featured && (
          <span className="absolute top-3 right-3 z-20 bg-yellow-400 text-yellow-900 text-[11px] font-bold px-3 py-1 rounded-full shadow-sm pointer-events-none">
            ★ Featured
          </span>
        )}

        {/* Cutout for Date */}
        {dateLabel && (
          <div className="absolute bottom-0 left-0 bg-white pt-1.5 pr-2 rounded-tr-[10px] z-10">
            {/* Top curve */}
            <svg className="absolute bottom-full left-0 w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M0 24V0C0 13.2548 10.7452 24 24 24H0Z" />
            </svg>
            {/* Right curve */}
            <svg className="absolute bottom-0 left-full w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M0 24V0C0 13.2548 10.7452 24 24 24H0Z" />
            </svg>
            
            <div className="bg-white px-3 py-1 flex items-center">
              <span className="text-[12px] font-bold text-[#00102A] tracking-wider">
                {dateLabel}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 px-5 pt-5 pb-5">
        {post.categories?.length > 0 && (
          <div className="mb-3">
            <BlogCategoryBadges categories={post.categories} size="sm" limit={4} />
          </div>
        )}

        <Link href={`/insights/${post.slug}`} className="mb-2.5">
          <h2 className="text-[18px] font-bold text-[#00102A] leading-snug line-clamp-2 group-hover:text-[#2667ff] transition-colors">
            {post.title}
          </h2>
        </Link>

        {post.excerpt ? (
          <p className="text-[14px] text-gray-500 leading-relaxed line-clamp-2 mb-5">
            {post.excerpt}
          </p>
        ) : (
          <div className="mb-5" />
        )}

        <div className="mt-auto flex items-center justify-between gap-3 pt-4 border-t border-gray-100">
          <div className="flex flex-col gap-0.5 min-w-0">
            {post.author_name ? (
              <AuthorByline
                name={post.author_name}
                avatarUrl={post.author_avatar}
                size="xs"
                className="text-[13px] font-medium text-gray-700"
              />
            ) : null}
          </div>
          {post.read_time_minutes ? (
            <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-gray-400">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              {post.read_time_minutes} min
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
