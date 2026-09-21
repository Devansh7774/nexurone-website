import Link from 'next/link';
import Image from 'next/image';
import { getBlogPosts } from '@/lib/blog';
import AuthorByline from '@/components/blog/AuthorByline';

function formatDate(date) {
  if (!date) return '';
  return new Date(date)
    .toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    .toUpperCase();
}

export default async function BlogInsights() {
  let posts = [];
  try {
    const result = await getBlogPosts({ page: 1, limit: 2 });
    posts = result.posts;
  } catch (err) {
    console.error('[BlogInsights] Failed to load posts:', err.message);
  }

  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="container mx-auto max-w-[1340px] px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-6 bg-[#E5F0F9] rounded-md">
            <span className="text-[14px] font-bold uppercase tracking-wider text-[#00102A]">
              INSIGHTS
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[46px] font-bold text-[#00102A] leading-tight max-w-3xl mx-auto">
            Valuable insights to change<br className="hidden md:block" /> your startup idea
          </h2>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-6">No insights published yet.</p>
            <Link
              href="/insights"
              className="inline-flex items-center text-sm font-bold text-blue-600 uppercase tracking-widest hover:text-blue-800 transition-colors"
            >
              Visit Insights
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
            {posts.map((post) => {
              const color = post.category_color || '#3B82F6';
              const postHref = `/insights/${post.slug}`;

              return (
                <article key={post.id} className="group flex flex-col h-full">
                  <div className="relative overflow-hidden rounded-[16px] rounded-bl-none mb-5 h-[240px] sm:h-[260px] bg-gray-100">
                    <Link
                      href={postHref}
                      aria-label={`Open blog post: ${post.title}`}
                      className="absolute inset-0 block"
                    >
                      {post.cover_image_url ? (
                        <Image
                          src={post.cover_image_url}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center"
                          style={{ background: `linear-gradient(135deg, ${color}22, ${color}55)` }}
                        >
                          <span className="text-6xl font-black opacity-20" style={{ color }}>
                            {post.title.charAt(0)}
                          </span>
                        </div>
                      )}
                    </Link>

                    {post.is_featured && (
                      <span className="absolute top-3 right-3 z-20 bg-yellow-400 text-yellow-900 text-xs font-bold px-2.5 py-1 rounded-full shadow pointer-events-none">
                        ★ Featured
                      </span>
                    )}

                    <div className="absolute bottom-0 left-0 bg-white pt-4 pr-5 rounded-tr-[16px] z-10 pointer-events-none">
                      <div className="absolute bottom-0 -right-[16px] w-[16px] h-[16px] bg-transparent shadow-[-8px_8px_0_8px_white] rounded-bl-[16px]" />
                      <div className="absolute -top-[16px] left-0 w-[16px] h-[16px] bg-transparent shadow-[-8px_8px_0_8px_white] rounded-bl-[16px]" />

                      <div className="relative z-10">
                        <span className="text-[13px] font-medium text-gray-500 uppercase tracking-wider">
                          {formatDate(post.published_at)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link href={postHref} className="mb-3 block">
                    <h3 className="text-[20px] md:text-[22px] font-bold text-gray-900 leading-[1.4] hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                  </Link>

                  {post.author_name ? (
                    <AuthorByline
                      name={post.author_name}
                      avatarUrl={post.author_avatar}
                      size="sm"
                      className="text-[13px] text-gray-600 mb-5"
                    />
                  ) : (
                    <div className="mb-5" />
                  )}

                  <div className="mt-auto">
                    <Link
                      href={postHref}
                      className="inline-flex items-center text-[13px] font-bold text-gray-500 uppercase tracking-widest hover:text-gray-900 transition-colors group/link"
                    >
                      <span className="line-clamp-1">{post.title}</span>
                      <span className="sr-only"> — open full article</span>
                      <svg
                        className="ml-1.5 w-3.5 h-3.5 text-gray-400 group-hover/link:text-gray-900 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 17L17 7M17 7H7M17 7V17"
                        />
                      </svg>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {posts.length > 0 && (
          <div className="text-center mt-14">
            <Link
              href="/insights"
              className="nexuron-btn-solid inline-flex min-h-[44px] items-center justify-center rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-wider"
            >
              View All Insights
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
