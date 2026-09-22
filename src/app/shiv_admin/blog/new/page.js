import { redirect } from 'next/navigation';
import { verifySession } from '@/lib/auth';
import { query } from '@/lib/db';
import { canChangeBlogAuthor, BLOG_AUTHOR_ROLES } from '@/lib/roles';
import BlogEditor from '@/components/admin/BlogEditor';

export const metadata = { title: 'New Post | Nexuron Admin' };

export default async function NewBlogPostPage() {
  const user = await verifySession();
  if (!user) redirect('/shiv_admin_login');

  const categoriesResult = await query(
    `SELECT id, name, color FROM blog_categories ORDER BY sort_order, name`
  );

  let authors = [];
  if (canChangeBlogAuthor(user)) {
    const rolePlaceholders = BLOG_AUTHOR_ROLES.map((_, i) => `$${i + 1}`).join(', ');
    const authorsResult = await query(
      `SELECT id, name, email, role, is_active
       FROM users
       WHERE role IN (${rolePlaceholders}) AND is_active = 1
       ORDER BY name ASC`,
      BLOG_AUTHOR_ROLES
    );
    authors = authorsResult.rows;
  }

  return (
    <BlogEditor
      categories={categoriesResult.rows}
      authors={authors}
      currentUser={user}
    />
  );
}
