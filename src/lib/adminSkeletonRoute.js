import { ADMIN_PATH, adminPath, isAdminBlogEditorPath } from './adminRoutes';

export { isAdminBlogEditorPath };

export function getAdminSkeletonVariant(pathname = '') {
  if (!pathname || pathname === ADMIN_PATH) return 'dashboard';
  if (pathname === adminPath('/profile')) return 'profile';
  if (pathname === adminPath('/users')) return 'users';
  if (pathname === adminPath('/blog/categories')) return 'blog-categories';
  if (isAdminBlogEditorPath(pathname)) return 'blog-editor';
  if (pathname === adminPath('/blog') || pathname.startsWith(`${adminPath('/blog')}/`)) return 'blog-list';
  if (pathname === adminPath('/queries')) return 'queries-list';
  if (new RegExp(`^${ADMIN_PATH.replace('/', '\\/')}/queries/[^/]+$`).test(pathname)) return 'query-detail';
  if (pathname === adminPath('/career-applications')) return 'career-list';
  if (new RegExp(`^${ADMIN_PATH.replace('/', '\\/')}/career-applications/[^/]+$`).test(pathname)) return 'career-detail';
  if (pathname === adminPath('/subscribers')) return 'subscribers-list';
  return 'dashboard';
}
