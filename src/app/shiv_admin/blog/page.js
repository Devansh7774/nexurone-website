import { redirect } from 'next/navigation';
import { verifySession } from '@/lib/auth';
import { query } from '@/lib/db';
import { ROLES } from '@/lib/roles';
import Link from 'next/link';
import { Plus, Pencil, Trash2, Eye, FileText, FolderOpen } from 'lucide-react';
import DeletePostButton from '@/components/admin/DeletePostButton';
import { ADMIN_BTN_PRIMARY, ADMIN_BTN_SECONDARY } from '@/components/admin/adminShellStyles';

export const metadata = { title: 'Blog Posts | Nexuron Admin' };

export default async function AdminBlogListPage({ searchParams }) {
  const user = await verifySession();
  if (!user) redirect('/shiv_admin_login');

  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page || '1'));
  const status = sp.status || '';
  const limit = 15;
  const offset = (page - 1) * limit;

  // Main query:  LIMIT=$1, OFFSET=$2, status=$3 (if set)
  // Count query: status=$1 (if set) | independent param numbering
  const listParams = [limit, offset];
  let listWhere = status ? `WHERE p.status = $3` : '';
  if (status) listParams.push(status);
  if (user.role === ROLES.EDITOR) {
    listParams.push(user.id);
    const authorClause = `p.author_id = $${listParams.length}`;
    listWhere = listWhere ? `${listWhere} AND ${authorClause}` : `WHERE ${authorClause}`;
  }

  const countParams = status ? [status] : [];
  let countWhere = status ? `WHERE p.status = $1` : '';
  if (user.role === ROLES.EDITOR) {
    countParams.push(user.id);
    const authorClause = `p.author_id = $${countParams.length}`;
    countWhere = countWhere ? `${countWhere} AND ${authorClause}` : `WHERE ${authorClause}`;
  }

  const [postsResult, countResult, categoryCountResult] = await Promise.all([
    query(
      `SELECT p.id, p.title, p.slug, p.status, p.is_featured,
              p.published_at, p.created_at, p.view_count,
              u.name AS author_name,
              (SELECT GROUP_CONCAT(c.name ORDER BY c.sort_order, c.name SEPARATOR ', ')
               FROM blog_post_categories pc
               JOIN blog_categories c ON c.id = pc.category_id
               WHERE pc.post_id = p.id) AS category_names
       FROM blog_posts p
       LEFT JOIN users u ON u.id = p.author_id
       ${listWhere}
       ORDER BY p.created_at DESC
       LIMIT $1 OFFSET $2`,
      listParams
    ),
    query(
      `SELECT COUNT(*) AS count FROM blog_posts p ${countWhere}`,
      countParams
    ),
    query(`SELECT COUNT(*) AS count FROM blog_categories`),
  ]);

  const posts = postsResult.rows;
  const total = parseInt(countResult.rows[0].count);
  const categoryCount = parseInt(categoryCountResult.rows[0].count);
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-500">
            {total} post{total !== 1 ? 's' : ''}
            {categoryCount > 0 ? ` · ${categoryCount} categor${categoryCount === 1 ? 'y' : 'ies'}` : ''}
          </p>
          {categoryCount === 0 && (
            <p className="mt-1 text-sm text-amber-700">
              Tip: create categories first so you can organize posts on the blog page.
            </p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/shiv_admin/blog/categories"
            className={ADMIN_BTN_SECONDARY}
          >
            <FolderOpen className="h-4 w-4" />
            {categoryCount > 0 ? `Categories (${categoryCount})` : 'Set up categories'}
          </Link>
          <Link
            href="/shiv_admin/blog/new"
            className={ADMIN_BTN_PRIMARY}
          >
            <Plus className="h-4 w-4" />
            New post
          </Link>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="mb-6 flex w-fit gap-1 rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
        {['', 'published', 'draft', 'archived'].map((s) => (
          <Link
            key={s}
            href={`/shiv_admin/blog${s ? `?status=${s}` : ''}`}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
              status === s
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            {s === '' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
          </Link>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {posts.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
              <FileText className="h-5 w-5 text-slate-400" />
            </div>
            <p className="text-sm font-medium text-slate-800">No posts found</p>
            <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
              {status
                ? `No ${status} posts yet. Try another filter or create a new post.`
                : 'Start by creating a post, or set up categories to organize your blog.'}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/shiv_admin/blog/new"
                className={ADMIN_BTN_PRIMARY}
              >
                <Plus className="h-4 w-4" />
                Create post
              </Link>
              {categoryCount === 0 && (
                <Link
                  href="/shiv_admin/blog/categories"
                  className={ADMIN_BTN_SECONDARY}
                >
                  <FolderOpen className="h-4 w-4" />
                  Set up categories
                </Link>
              )}
            </div>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 text-xs uppercase tracking-wide bg-gray-50">
                <th className="px-6 py-3.5 text-left">Title</th>
                <th className="px-4 py-3.5 text-left">Categories</th>
                <th className="px-4 py-3.5 text-left">Author</th>
                <th className="px-4 py-3.5 text-left">Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 line-clamp-1">{post.title}</div>
                    <div className="text-xs text-gray-500 mt-0.5">/blog/{post.slug}</div>
                  </td>
                  <td className="px-4 py-4 text-gray-600">{post.category_names || '—'}</td>
                  <td className="px-4 py-4 text-gray-600">{post.author_name}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex text-xs font-medium px-2.5 py-0.5 rounded-full ${
                      post.status === 'published'
                        ? 'bg-emerald-100 text-emerald-800'
                        : post.status === 'draft'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {post.status === 'published' && (
                        <Link
                          href={`/insights/${post.slug}`}
                          target="_blank"
                          className="p-1.5 text-gray-500 hover:text-blue-600 transition"
                          title="View post"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      )}
                      <Link
                        href={`/shiv_admin/blog/${post.id}`}
                        className="p-1.5 text-gray-500 hover:text-gray-900 transition"
                        title="Edit post"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <DeletePostButton postId={post.id} postTitle={post.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/shiv_admin/blog?page=${p}${status ? `&status=${status}` : ''}`}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm ${
                p === page
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
