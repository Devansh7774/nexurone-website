import { redirect } from 'next/navigation';
import { verifySession } from '@/lib/auth';
import { query } from '@/lib/db';
import ProfileForm from '@/components/admin/ProfileForm';

export const metadata = { title: 'My Profile | Nexuron Admin' };

export default async function AdminProfilePage() {
  const user = await verifySession();
  if (!user) redirect('/shiv_admin_login');

  const result = await query(
    `SELECT id, name, email, role, avatar_url, bio FROM users WHERE id = $1`,
    [user.id]
  );

  return (
    <div className="p-6 lg:p-8">
      <ProfileForm initialProfile={result.rows[0]} />
    </div>
  );
}
