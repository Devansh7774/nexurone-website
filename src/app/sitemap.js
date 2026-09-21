import { absoluteUrl } from '@/lib/site';
import { getAllCaseStudySlugs } from '@/lib/caseStudies';
import { getPublishedBlogPostsForSitemap } from '@/lib/blog';

const STATIC_ROUTES = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/about-us', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/career', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/case-study', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/insights', priority: 0.9, changeFrequency: 'daily' },
  { path: '/services/mean-mern', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/dot-net', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/laravel', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/php', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/wordpress', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/frontend', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/flutter', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/react-native', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/android', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/ios', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/iot', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/devops', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/ai-ml', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/ui-ux', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/graphic', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/3d', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/hire/javascript-developer', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/hire/angular-developer', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/hire/react-developer', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/hire/vuejs-developer', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/hire/wordpress-developer', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/hire/woocommerce-developer', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/hire/wix-developer', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/hire/shopify-developer', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/hire/dotnet-developer', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/hire/laravel-developer', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/hire/nodejs-developer', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/hire/php-developer', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/hire/python-developer', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/hire/devops-developer', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/hire/ai-developer', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/hire/n8n-developer', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/hire/zapier-developer', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/hire/python-aiml-developer', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/hire/flutter-developer', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/hire/react-native-developer', priority: 0.7, changeFrequency: 'monthly' },
];

/** Always read published posts from the DB (not a stale build snapshot). */
export const dynamic = 'force-dynamic';

export default async function sitemap() {
  const posts = await getPublishedBlogPostsForSitemap();

  return [
    ...STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
      url: absoluteUrl(path),
      lastModified: new Date(),
      changeFrequency,
      priority,
    })),
    ...getAllCaseStudySlugs().map((slug) => ({
      url: absoluteUrl(`/case-study/${slug}`),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.75,
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/insights/${post.slug}`),
      lastModified: post.updated_at || post.published_at || new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    })),
  ];
}
