import { redirect, notFound } from 'next/navigation';
import { verifySession } from '@/lib/auth';
import { query } from '@/lib/db';
import { BLOG_TAGS_JSON, BLOG_CATEGORY_IDS_JSON } from '@/lib/sql';
import { canEditBlogPost, canChangeBlogAuthor, BLOG_AUTHOR_ROLES } from '@/lib/roles';
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

  let authors = [];
  if (canChangeBlogAuthor(user)) {
    const rolePlaceholders = BLOG_AUTHOR_ROLES.map((_, i) => `$${i + 1}`).join(', ');
    const authorsResult = await query(
      `SELECT id, name, email, role, is_active
       FROM users
       WHERE role IN (${rolePlaceholders})
         AND (is_active = 1 OR id = $${BLOG_AUTHOR_ROLES.length + 1})
       ORDER BY name ASC`,
      [...BLOG_AUTHOR_ROLES, post.author_id]
    );
    authors = authorsResult.rows;
  }

  return (
    <BlogEditor
      post={post}
      categories={categoriesResult.rows}
      authors={authors}
      currentUser={user}
    />
  );
}
