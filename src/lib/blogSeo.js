import { absoluteUrl, getSiteUrl } from '@/lib/site';
import { normalizeTags } from '@/lib/blogUtils';

function tagNames(tags) {
  return normalizeTags(tags).map((t) => t.name);
}

export function getBlogPostUrl(slug) {
  return absoluteUrl(`/insights/${slug}`);
}

export function resolveMetaTitle(post) {
  return post.meta_title?.trim() || `${post.title} | Nexuron Insights`;
}

export function resolveMetaDescription(post) {
  return post.meta_description?.trim() || post.excerpt?.trim() || '';
}

export function resolveCoverAlt(post) {
  return post.cover_image_alt?.trim() || post.title;
}

/** Next.js Metadata object for a blog post page. */
export function buildBlogPostMetadata(post) {
  const title = resolveMetaTitle(post);
  const description = resolveMetaDescription(post);
  const url = getBlogPostUrl(post.slug);
  const images = post.cover_image_url
    ? [{ url: post.cover_image_url, alt: resolveCoverAlt(post) }]
    : [];

  const names = tagNames(post.tags);

  const metadata = {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'article',
      url,
      title: post.meta_title?.trim() || post.title,
      description,
      siteName: 'Nexuron Technologies',
      images,
      publishedTime: post.published_at || undefined,
      modifiedTime: post.updated_at || undefined,
      authors: post.author_name ? [post.author_name] : undefined,
      tags: names.length ? names : undefined,
    },
    twitter: {
      card: images.length ? 'summary_large_image' : 'summary',
      title: post.meta_title?.trim() || post.title,
      description,
      images: post.cover_image_url ? [post.cover_image_url] : undefined,
    },
  };

  if (post.seo_noindex) {
    metadata.robots = { index: false, follow: true };
  }

  return metadata;
}

/** Schema.org BlogPosting JSON-LD for rich results. */
export function buildArticleJsonLd(post) {
  const url = getBlogPostUrl(post.slug);
  const siteUrl = getSiteUrl();
  const names = tagNames(post.tags);

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: resolveMetaDescription(post),
    image: post.cover_image_url ? [post.cover_image_url] : undefined,
    datePublished: post.published_at || post.created_at,
    dateModified: post.updated_at || post.published_at || post.created_at,
    author: {
      '@type': 'Person',
      name: post.author_name || 'Nexuron Technologies',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Nexuron Technologies',
      url: siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url,
    keywords: names.length ? names.join(', ') : undefined,
    articleSection: post.categories?.length
      ? post.categories.map((c) => c.name).join(', ')
      : post.category_name || undefined,
    wordCount: post.content ? post.content.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length : undefined,
    timeRequired: post.read_time_minutes ? `PT${post.read_time_minutes}M` : undefined,
  };
}
