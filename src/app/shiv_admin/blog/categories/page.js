import { redirect } from 'next/navigation';
import { verifySession } from '@/lib/auth';
import { query } from '@/lib/db';
import BlogCategoriesManager from '@/components/admin/BlogCategoriesManager';

export const metadata = { title: 'Blog Categories | Nexuron Admin' };

export default async function BlogCategoriesPage() {
  const user = await verifySession();
  if (!user) redirect('/shiv_admin_login');

  const result = await query(
    `SELECT c.id, c.name, c.slug, c.color, c.sort_order, c.is_featured, c.created_at,
            COUNT(p.id) AS post_count
     FROM blog_categories c
     LEFT JOIN blog_post_categories pc ON pc.category_id = c.id
     LEFT JOIN blog_posts p ON p.id = pc.post_id
     GROUP BY c.id, c.name, c.slug, c.color, c.sort_order, c.is_featured, c.created_at
     ORDER BY c.is_featured DESC, c.sort_order ASC, c.name ASC`
  );

  const categories = result.rows.map((row) => ({
    ...row,
    is_featured: Boolean(row.is_featured),
    post_count: Number(row.post_count) || 0,
  }));

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 max-w-2xl">
        <p className="text-sm leading-relaxed text-slate-600">
          Categories group your blog posts. Toggle <strong>Featured on blog page</strong> to control which
          categories appear in the main filter bar on the public{' '}
          <a href="/insights" target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">
            blog page
          </a>
          . Others stay available under &ldquo;More categories&rdquo;. Assign categories when editing a post.
        </p>
      </div>
      <BlogCategoriesManager initialCategories={categories} />
    </div>
  );
}
