/** Platform roles and permission helpers. */

import { ADMIN_PATH, adminPath } from './adminRoutes';

export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  EDITOR: 'editor',
};

export const ROLE_LABELS = {
  super_admin: 'Super Admin',
  admin: 'Admin',
  editor: 'Blog Author',
};

export const ASSIGNABLE_ROLES = [
  { value: 'editor', label: 'Blog Author', hint: 'Can write and publish blog posts only' },
  { value: 'admin', label: 'Admin', hint: 'Full CMS access including team users (cannot manage Super Admins)' },
  { value: 'super_admin', label: 'Super Admin', hint: 'Full access including all user management' },
];

export function roleLabel(role) {
  return ROLE_LABELS[role] || role;
}

/** Admin + Super Admin can access Team Users (verify, create editors/admins, etc.). */
export function canManageUsers(user) {
  return [ROLES.SUPER_ADMIN, ROLES.ADMIN].includes(user?.role);
}

export function isSuperAdmin(user) {
  return user?.role === ROLES.SUPER_ADMIN;
}

export function canAccessBlog(user) {
  return [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.EDITOR].includes(user?.role);
}

export function canAccessFullAdmin(user) {
  return [ROLES.SUPER_ADMIN, ROLES.ADMIN].includes(user?.role);
}

/** Editors are limited to blog routes in the admin panel. */
export function canAccessAdminPath(user, pathname = '') {
  if (!user) return false;
  if (canAccessFullAdmin(user)) return true;
  if (user.role === ROLES.EDITOR) {
    return (
      pathname === ADMIN_PATH
      || pathname.startsWith(adminPath('/blog'))
      || pathname.startsWith(adminPath('/profile'))
    );
  }
  return false;
}

export function canEditBlogPost(user, post) {
  if (!user || !post) return false;
  if ([ROLES.SUPER_ADMIN, ROLES.ADMIN].includes(user.role)) return true;
  if (user.role === ROLES.EDITOR) return post.author_id === user.id;
  return false;
}
