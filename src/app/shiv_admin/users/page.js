import { redirect, notFound } from 'next/navigation';
import { verifySession } from '@/lib/auth';
import { query } from '@/lib/db';
import { canManageUsers } from '@/lib/roles';
import UsersManager from '@/components/admin/UsersManager';

export const metadata = { title: 'Users | Nexuron Admin' };

export default async function AdminUsersPage() {
  const user = await verifySession();
  if (!user) redirect('/shiv_admin_login');
  if (!canManageUsers(user)) notFound();

  const result = await query(
    `SELECT u.id, u.name, u.email, u.role, u.avatar_url, u.bio, u.is_active, u.email_verified_at, u.last_login_at, u.created_at,
            COUNT(p.id) AS post_count
     FROM users u
     LEFT JOIN blog_posts p ON p.author_id = u.id
     GROUP BY u.id, u.name, u.email, u.role, u.avatar_url, u.bio, u.is_active, u.email_verified_at, u.last_login_at, u.created_at
     ORDER BY u.created_at DESC`
  );

  const users = result.rows.map((row) => ({
    ...row,
    is_active: Boolean(row.is_active),
    email_verified: Boolean(row.email_verified_at),
    post_count: Number(row.post_count) || 0,
  }));

  return (
    <div className="p-6 lg:p-8">
      <UsersManager
        initialUsers={users}
        currentUserId={user.id}
        currentUserRole={user.role}
      />
    </div>
  );
}
