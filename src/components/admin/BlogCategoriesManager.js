'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, FolderOpen, Loader2, Plus, Star, Trash2 } from 'lucide-react';
import { slugify } from '@/lib/slugify';

const PRESET_COLORS = [
  '#3B82F6', '#2563EB', '#0EA5E9', '#06B6D4',
  '#10B981', '#059669', '#8B5CF6', '#7C3AED',
  '#F59E0B', '#D97706', '#EF4444', '#EC4899',
];

function getNextSortOrder(categories) {
  if (!categories.length) return 0;
  return Math.max(...categories.map((c) => Number(c.sort_order) || 0)) + 1;
}

export default function BlogCategoriesManager({ initialCategories = [] }) {
  const router = useRouter();
  const [categories, setCategories] = useState(initialCategories);
  const [name, setName] = useState('');
  const [color, setColor] = useState(PRESET_COLORS[0]);
  const [sortOrder, setSortOrder] = useState(() => getNextSortOrder(initialCategories));
  const [isFeatured, setIsFeatured] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [togglingId, setTogglingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [highlightId, setHighlightId] = useState(null);

  const slugPreview = useMemo(() => slugify(name) || 'category-slug', [name]);

  async function handleCreate(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Enter a category name.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/admin/categories?type=blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmed, color, sort_order: sortOrder, is_featured: isFeatured }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to create category.');
        return;
      }

      const nextCategories = [...categories, { ...data.category, post_count: 0, is_featured: Boolean(data.category.is_featured) }].sort(
        (a, b) => (a.sort_order - b.sort_order) || a.name.localeCompare(b.name)
      );
      setCategories(nextCategories);
      setName('');
      setIsFeatured(false);
      setSortOrder(getNextSortOrder(nextCategories));
      setSuccess(`"${trimmed}" is ready — assign it when editing a post.`);
      setHighlightId(data.category.id);
      setTimeout(() => setHighlightId(null), 3000);
      setTimeout(() => setSuccess(''), 5000);
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleFeatured(cat) {
    setTogglingId(cat.id);
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`/api/admin/categories/${cat.id}?type=blog`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_featured: !cat.is_featured }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to update category.');
        return;
      }
      setCategories((prev) =>
        prev
          .map((c) => (c.id === cat.id ? { ...c, ...data.category, post_count: c.post_count } : c))
          .sort((a, b) => Number(b.is_featured) - Number(a.is_featured) || (a.sort_order - b.sort_order) || a.name.localeCompare(b.name))
      );
      setSuccess(
        data.category.is_featured
          ? `"${cat.name}" is now featured on the blog page.`
          : `"${cat.name}" removed from featured filters.`
      );
      setTimeout(() => setSuccess(''), 4000);
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setTogglingId(null);
    }
  }

  async function handleDelete(id, categoryName, postCount) {
    const postNote =
      postCount > 0
        ? ` ${postCount} post${postCount === 1 ? '' : 's'} will become uncategorized.`
        : '';
    if (!window.confirm(`Delete "${categoryName}"?${postNote}`)) {
      return;
    }

    setDeletingId(id);
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`/api/admin/categories/${id}?type=blog`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to delete category.');
        return;
      }
      const nextCategories = categories.filter((c) => c.id !== id);
      setCategories(nextCategories);
      setSortOrder(getNextSortOrder(nextCategories));
      setSuccess(`"${categoryName}" deleted.`);
      setTimeout(() => setSuccess(''), 4000);
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <div className="lg:col-span-2">
        <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5">
            <h2 className="text-base font-semibold text-slate-900">Add a category</h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-500">
              Featured categories show in the main filter bar on /insights. Others appear under &ldquo;More categories&rdquo;.
            </p>
          </div>

          <form onSubmit={handleCreate} className="space-y-5">
            <div>
              <label htmlFor="cat-name" className="mb-1.5 block text-sm font-medium text-slate-700">
                Category name
              </label>
              <input
                id="cat-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Technology, Case Studies"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <p className="mt-1.5 text-xs text-slate-500">
                Blog filter URL:{' '}
                <span className="font-mono text-slate-600">/insights?category={slugPreview}</span>
              </p>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Tab color on blog page
              </label>
              <div className="flex flex-wrap gap-2">
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`h-8 w-8 rounded-full border-2 transition ${
                      color === c ? 'scale-110 border-slate-900 ring-2 ring-slate-300' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: c }}
                    aria-label={`Select color ${c}`}
                    aria-pressed={color === c}
                  />
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="cat-sort" className="mb-1.5 block text-sm font-medium text-slate-700">
                Display order
              </label>
              <input
                id="cat-sort"
                type="number"
                min={0}
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value) || 0)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <p className="mt-1.5 text-xs text-slate-500">Lower numbers show first among featured categories.</p>
            </div>

            <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>
                <span className="block text-sm font-medium text-slate-800">Featured on blog page</span>
                <span className="mt-0.5 block text-xs text-slate-500">
                  Show in the main category filter on /insights (recommended for your top 4–8 categories).
                </span>
              </span>
            </label>

            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">Preview</p>
              <span
                className="inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm"
                style={{ backgroundColor: color }}
              >
                {name.trim() || 'Category name'}
              </span>
            </div>

            {error && (
              <p className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
            )}

            {success && (
              <p className="flex items-start gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                <Check className="mt-0.5 h-4 w-4 shrink-0" />
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl nexuron-btn-solid"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              Create category
            </button>
          </form>
        </div>
      </div>

      <div className="lg:col-span-3">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4 text-slate-400" />
              <h2 className="text-sm font-semibold text-slate-900">
                {categories.length} {categories.length === 1 ? 'category' : 'categories'}
              </h2>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Toggle the star to feature a category on the public blog page.
            </p>
          </div>

          {categories.length === 0 ? (
            <div className="px-5 py-14 text-center sm:px-6">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                <FolderOpen className="h-5 w-5 text-slate-400" />
              </div>
              <p className="text-sm font-medium text-slate-700">No categories yet</p>
              <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
                Create your first category using the form on the left, then assign it to posts in the editor.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {categories.map((cat) => (
                <li
                  key={cat.id}
                  className={`flex items-center gap-4 px-5 py-4 transition sm:px-6 ${
                    highlightId === cat.id ? 'bg-emerald-50/80 ring-1 ring-inset ring-emerald-200' : 'hover:bg-slate-50/80'
                  }`}
                >
                  <span
                    className="h-3 w-3 shrink-0 rounded-full ring-2 ring-white"
                    style={{ backgroundColor: cat.color || '#3B82F6' }}
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-slate-900">{cat.name}</p>
                      {cat.is_featured ? (
                        <span className="inline-flex items-center gap-1 rounded-sm bg-amber-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700 ring-1 ring-amber-200">
                          <Star className="h-3 w-3 fill-current" />
                          Featured
                        </span>
                      ) : (
                        <span className="inline-flex rounded-sm bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                          Hidden from main filters
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {cat.post_count ?? 0} post{(cat.post_count ?? 0) === 1 ? '' : 's'} · order {cat.sort_order}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggleFeatured(cat)}
                    disabled={togglingId === cat.id}
                    className={`rounded-lg p-2 transition disabled:opacity-50 ${
                      cat.is_featured
                        ? 'text-amber-500 hover:bg-amber-50'
                        : 'text-slate-300 hover:bg-slate-100 hover:text-amber-500'
                    }`}
                    aria-label={cat.is_featured ? `Remove ${cat.name} from featured` : `Feature ${cat.name} on blog page`}
                    title={cat.is_featured ? 'Remove from featured' : 'Feature on blog page'}
                  >
                    {togglingId === cat.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Star className={`h-4 w-4 ${cat.is_featured ? 'fill-current' : ''}`} />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(cat.id, cat.name, cat.post_count ?? 0)}
                    disabled={deletingId === cat.id}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                    aria-label={`Delete ${cat.name}`}
                    title="Delete category"
                  >
                    {deletingId === cat.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
