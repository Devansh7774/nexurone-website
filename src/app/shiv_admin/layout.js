import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { verifySession } from '@/lib/auth';
import { canAccessAdminPath, canManageUsers } from '@/lib/roles';
import { adminPath, isAdminPath } from '@/lib/adminRoutes';
import AdminShell from '@/components/admin/AdminShell';

export const metadata = {
  title: 'Admin | Nexuron',
};

export default async function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-900 flex">
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </div>
  );
}

async function AdminLayoutInner({ children }) {
  const user = await verifySession();
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';

  if (user && isAdminPath(pathname) && !canAccessAdminPath(user, pathname)) {
    redirect(adminPath('/blog'));
  }

  if (user && pathname.startsWith(adminPath('/users')) && !canManageUsers(user)) {
    redirect(adminPath('/blog'));
  }

  if (!user) {
    return <main className="flex-1">{children}</main>;
  }

  return <AdminShell user={user}>{children}</AdminShell>;
}
