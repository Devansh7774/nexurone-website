import { redirect, notFound } from 'next/navigation';
import { verifySession } from '@/lib/auth';
import { query } from '@/lib/db';
import { BLOG_TAGS_JSON, BLOG_CATEGORY_IDS_JSON } from '@/lib/sql';
import { canEditBlogPost } from '@/lib/roles';
import BlogEditor from '@/components/admin/BlogEditor';

export const metadata = { title: 'Edit Post | Nexuron Admin' };

export default async function EditBlogPostPage({ params }) {
  const user = await verifySession();
  if (!user) redirect('/shiv_admin_login');

  const { id } = await params;

  const [postResult, categoriesResult] = await Promise.all([
    query(
      `SELECT p.*,
              u.name AS author_name,
              ${BLOG_TAGS_JSON},
              ${BLOG_CATEGORY_IDS_JSON}
       FROM blog_posts p
       LEFT JOIN users u ON u.id = p.author_id
       WHERE p.id = $1`,
      [id]
    ),
    query(`SELECT id, name, color FROM blog_categories ORDER BY sort_order, name`),
  ]);

  if (postResult.rowCount === 0) notFound();

  const post = postResult.rows[0];
  if (!canEditBlogPost(user, post)) notFound();

  return (
    <BlogEditor
      post={post}
      categories={categoriesResult.rows}
      currentUser={user}
    />
  );
}
