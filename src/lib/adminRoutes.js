/** Public admin panel base path (not the API prefix). */
export const ADMIN_PATH = '/shiv_admin';

/** Admin sign-in page (non-obvious URL). */
export const ADMIN_LOGIN_PATH = '/shiv_admin_login';

export function adminPath(subpath = '') {
  if (!subpath) return ADMIN_PATH;
  return `${ADMIN_PATH}${subpath.startsWith('/') ? subpath : `/${subpath}`}`;
}

export function isAdminPath(pathname = '') {
  return pathname === ADMIN_PATH || pathname.startsWith(`${ADMIN_PATH}/`);
}

export function isAdminLoginPath(pathname = '') {
  return pathname === ADMIN_LOGIN_PATH;
}

export function isAdminShellPath(pathname = '') {
  return isAdminPath(pathname) || isAdminLoginPath(pathname);
}

export function isAdminBlogEditorPath(pathname = '') {
  if (pathname === adminPath('/blog/new')) return true;
  if (!pathname.startsWith(`${adminPath('/blog')}/`)) return false;
  if (pathname === adminPath('/blog/categories') || pathname.startsWith(`${adminPath('/blog/categories')}/`)) {
    return false;
  }
  const segment = pathname.slice(`${adminPath('/blog')}/`.length);
  return segment.length > 0 && !segment.includes('/');
}
