import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import {
  getBlogPost,
  getPublishedBlogSlugsForStaticParams,
  getBlogPosts,
  getBlogCategories,
  getBlogTags,
  getAdjacentBlogPosts,
} from '@/lib/blog';
import { renderBlogMarkdown } from '@/lib/renderBlogMarkdown';
import { buildArticleJsonLd, buildBlogPostMetadata, resolveCoverAlt, getBlogPostUrl } from '@/lib/blogSeo';
import { normalizeTags } from '@/lib/blogUtils';
import AuthorByline from '@/components/blog/AuthorByline';
import BlogCategoryBadges from '@/components/blog/BlogCategoryBadges';
import BlogPostSidebar from '@/components/blog/BlogPostSidebar';
import BlogPostPager from '@/components/blog/BlogPostPager';
import BlogPostSocialRail from '@/components/blog/BlogPostSocialRail';

/** ISR (seconds). Must match `BLOG_REVALIDATE_SECONDS` in `@/lib/blog`. */
export const revalidate = 60;

export async function generateStaticParams() {
  return getPublishedBlogSlugsForStaticParams();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  return buildBlogPostMetadata(post);
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;

  const [post, recentResult, categories, allTags, adjacent] = await Promise.all([
    getBlogPost(slug),
    getBlogPosts({ page: 1, limit: 6 }),
    getBlogCategories(),
    getBlogTags(),
    getAdjacentBlogPosts(slug),
  ]);

  if (!post) notFound();

  const recentPosts = recentResult.posts.filter((p) => p.slug !== slug).slice(0, 5);

  const tags = normalizeTags(post.tags);
  const jsonLd = buildArticleJsonLd(post);
  const postUrl = getBlogPostUrl(post.slug);

  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-4 pt-20 pb-10 text-center">
        {post.categories?.length > 0 && (
          <BlogCategoryBadges
            categories={post.categories}
            className="mb-4 justify-center"
            size="lg"
          />
        )}
        <h1 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#00102A] mb-5 leading-tight tracking-tight">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mb-6 text-[13px] font-medium text-gray-500">
          {formattedDate && (
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <time dateTime={post.published_at}>{formattedDate}</time>
            </span>
          )}
          <AuthorByline
            name={post.author_name}
            avatarUrl={post.author_avatar}
            size="sm"
            className="text-[13px] font-medium text-gray-500"
          />
          {post.read_time_minutes ? (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              {post.read_time_minutes} min read
            </span>
          ) : null}
        </div>
      </div>

      <div className="container mx-auto max-w-[1340px] px-4 sm:px-6 lg:px-8 pb-24">
        <BlogPostSocialRail url={postUrl} title={post.title} variant="horizontal" />

        <div className="grid grid-cols-1 xl:grid-cols-[56px_minmax(0,1fr)_320px] gap-8 xl:gap-12 items-start">
          <BlogPostSocialRail url={postUrl} title={post.title} variant="vertical" />

          <article className="min-w-0 order-1 xl:order-none xl:col-start-2">
            {post.cover_image_url && (
              <div className="relative w-full aspect-[16/9] mb-8 bg-gray-100 overflow-hidden rounded-2xl shadow-[0_12px_40px_rgba(0,16,42,0.08)]">
                <Image
                  src={post.cover_image_url}
                  alt={resolveCoverAlt(post)}
                  fill
                  sizes="(max-width: 1024px) 100vw, 900px"
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div
              className="blog-content max-w-none prose-headings:text-[#00102A]"
              dangerouslySetInnerHTML={{ __html: renderBlogMarkdown(post.content) }}
            />

            {tags.length > 0 && (
              <div className="mt-10 pt-8 border-t border-gray-100">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Tagged in</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Link
                      key={tag.slug}
                      href={`/insights?tag=${tag.slug}`}
                      className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#E5F0F9] text-[#00102A] text-sm font-medium hover:bg-[#2667ff] hover:text-white transition-colors"
                    >
                      #{tag.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10 pt-8 border-t border-gray-100 rounded-2xl bg-gray-50/70 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Written by</p>
              <AuthorByline
                name={post.author_name}
                avatarUrl={post.author_avatar}
                bio={post.author_bio}
                size="lg"
                layout="card"
              />
            </div>

            <BlogPostPager prev={adjacent.prev} next={adjacent.next} />
          </article>

          <div className="order-2 xl:order-none xl:col-start-3">
            <BlogPostSidebar
              recentPosts={recentPosts}
              categories={categories}
              tags={allTags}
              activeCategorySlug={post.category_slug}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
