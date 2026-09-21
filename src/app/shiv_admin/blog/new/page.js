import { redirect } from 'next/navigation';
import { verifySession } from '@/lib/auth';
import { query } from '@/lib/db';
import BlogEditor from '@/components/admin/BlogEditor';

export const metadata = { title: 'New Post | Nexuron Admin' };

export default async function NewBlogPostPage() {
  const user = await verifySession();
  if (!user) redirect('/shiv_admin_login');

  const categoriesResult = await query(
    `SELECT id, name, color FROM blog_categories ORDER BY sort_order, name`
  );

  return <BlogEditor categories={categoriesResult.rows} currentUser={user} />;
}
