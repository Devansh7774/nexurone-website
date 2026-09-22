'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Save, Eye, ArrowLeft, Loader2, X, Globe, Wand2, Settings, Code2, Type, Upload,
} from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import DesignToolkit from './DesignToolkit';
import UnsavedChangesModal from './UnsavedChangesModal';
import AdminSelect from '@/components/ui/AdminSelect';
import RichTextEditor from './RichTextEditor';
import { useAdminShell, ADMIN_HEADER_CLASS, ADMIN_HEADER_PADDING, ADMIN_SHELL_LEFT_TRANSITION } from './AdminShellContext';
import AdminShellNavButton from './AdminShellNavButton';
import { renderBlogMarkdown } from '@/lib/renderBlogMarkdown';
import { prepareContentForVisual } from '@/lib/contentUtils';
import { normalizeTags } from '@/lib/blogUtils';
import { slugify } from '@/lib/slugify';
import { canChangeBlogAuthor, roleLabel } from '@/lib/roles';

function parseCategoryIds(post) {
  if (!post) return [];
  let ids = post.category_ids;
  if (typeof ids === 'string') {
    try {
      ids = JSON.parse(ids);
    } catch {
      ids = [];
    }
  }
  if (Array.isArray(ids) && ids.length) return ids.filter(Boolean);
  if (post.category_id) return [post.category_id];
  return [];
}

function toggleCategoryId(current, id) {
  return current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
}

const HtmlEditor = dynamic(() => import('./HtmlEditor'), { ssr: false });

function SerpPreview({ title, description, slug }) {
  const displayTitle = title?.trim() || 'Post title | Nexuron Blog';
  const displayDesc = description?.trim() || 'Meta description appears here. Leave blank to use the excerpt.';
  const displayUrl = slug ? `nexuron.com › blogs › ${slug}` : 'nexuron.com › blogs › your-post-slug';

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-2">Google preview</p>
      <p className="text-[13px] text-[#202124] leading-snug truncate">{displayTitle}</p>
      <p className="text-xs text-[#006621] mt-0.5 truncate">{displayUrl}</p>
      <p className="text-xs text-[#4d5156] mt-1 line-clamp-2 leading-relaxed">{displayDesc}</p>
    </div>
  );
}
function SectionCard({ title, hint, children, compact }) {
  return (
    <div className={`bg-white border border-gray-200 rounded-xl ${compact ? 'p-4' : 'p-5'} shadow-sm`}>
      <div className={compact ? 'mb-3' : 'mb-4'}>
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        {hint && <p className="text-xs text-gray-500 mt-1 leading-relaxed">{hint}</p>}
      </div>
      {children}
    </div>
  );
}

const CONTENT_MODES = [
  { id: 'visual', label: 'Visual', icon: Type, hint: 'Write with formatted headings and lists' },
  { id: 'html', label: 'HTML', icon: Code2, hint: 'Paste or edit raw HTML code' },
  { id: 'preview', label: 'Preview', icon: Eye, hint: 'See how the post looks on the site' },
];

function StatusBadge({ status }) {
  const styles = {
    published: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
    draft: 'bg-amber-50 text-amber-700 ring-amber-600/20',
    archived: 'bg-gray-100 text-gray-600 ring-gray-500/20',
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ring-1 ring-inset ${styles[status] || styles.draft}`}
    >
      {status}
    </span>
  );
}

function EditorHeader({
  isEdit,
  post,
  form,
  saved,
  loading,
  onSave,
  onPublish,
  onRequestLeave,
}) {
  return (
    <header className={`z-20 border-b border-slate-200 bg-white ${ADMIN_HEADER_CLASS} ${ADMIN_HEADER_PADDING}`}>
      <div className="flex w-full items-center gap-2 sm:gap-3">
        <AdminShellNavButton />

        <button
          type="button"
          onClick={() => onRequestLeave('/shiv_admin/blog')}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition flex-shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Blog posts</span>
        </button>

        <div className="h-5 w-px bg-gray-200 flex-shrink-0" aria-hidden />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <h1 className="text-base font-semibold text-gray-900 truncate">
              {isEdit ? (form.title.trim() || 'Untitled post') : 'New post'}
            </h1>
            <StatusBadge status={form.status} />
            {saved && (
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">
                Saved
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {post?.status === 'published' && isEdit && form.slug && (
            <Link
              href={`/insights/${form.slug}`}
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50 transition"
            >
              <Globe className="w-4 h-4" />
              View
            </Link>
          )}

          <button
            type="button"
            onClick={onSave}
            disabled={loading}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 px-3.5 py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span className="hidden sm:inline">
              {form.status === 'published' ? 'Update' : 'Save'}
            </span>
          </button>

          {form.status !== 'published' && (
            <button
              type="button"
              onClick={onPublish}
              disabled={loading || !form.title.trim()}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-white nexuron-btn-solid"
            >
              Publish
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

function EditorModePanel({ contentMode, onChange }) {
  return (
    <div className="flex-shrink-0 px-3 py-2 border-b border-slate-200 bg-white">
      <div
        className="inline-flex w-full p-0.5 bg-slate-100 border border-slate-200 rounded-lg"
        role="tablist"
        aria-label="Editor mode"
      >
        {CONTENT_MODES.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={contentMode === id}
            aria-label={label}
            title={label}
            onClick={() => onChange(id)}
            className={`flex-1 inline-flex items-center justify-center h-9 rounded-md transition-all duration-150 ${
              contentMode === id
                ? 'bg-[#2f6bff] text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800 hover:bg-white'
            }`}
          >
            <Icon className="w-4 h-4" />
          </button>
        ))}
      </div>
    </div>
  );
}

function ToggleSwitch({ checked, onChange, label, description }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="w-full flex items-center justify-between gap-3 text-left rounded-lg hover:bg-gray-50 -mx-1 px-1 py-1 transition"
    >
      <div>
        <span className="block text-sm font-medium text-gray-900">{label}</span>
        {description && <span className="block text-sm text-gray-500 mt-0.5">{description}</span>}
      </div>
      <span
        className={`relative inline-flex h-7 w-12 flex-shrink-0 rounded-full transition-colors ${
          checked ? 'bg-blue-600' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform mt-1 ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </span>
    </button>
  );
}

export default function BlogEditor({
  post = null,
  categories = [],
  authors = [],
  currentUser = null,
}) {
  const router = useRouter();
  const { sidebarLeftClass } = useAdminShell();
  const isEdit = Boolean(post);
  const showAuthorSelect = canChangeBlogAuthor(currentUser) && authors.length > 0;
  const defaultAuthorId = post?.author_id || currentUser?.id || '';

  const [contentMode, setContentMode] = useState('visual');
  const visualEditorRef = useRef(null);
  const coverFileRef = useRef(null);
  const slugManuallyEdited = useRef(Boolean(post?.slug));
  const [sidebarTab, setSidebarTab] = useState('settings');
  const [form, setForm] = useState({
    title: post?.title || '',
    slug: post?.slug || '',
    excerpt: post?.excerpt || '',
    content: post?.content ? prepareContentForVisual(post.content) : '',
    cover_image_url: post?.cover_image_url || '',
    cover_image_alt: post?.cover_image_alt || '',
    status: post?.status || 'draft',
    is_featured: post?.is_featured || false,
    meta_title: post?.meta_title || '',
    meta_description: post?.meta_description || '',
    seo_noindex: Boolean(post?.seo_noindex),
    author_id: defaultAuthorId,
  });
  const initialCategoryIds = parseCategoryIds(post);
  const [categoryIds, setCategoryIds] = useState(initialCategoryIds);
  const initialTagNames = normalizeTags(post?.tags).map((t) => t.name);
  const [tags, setTags] = useState(initialTagNames);
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [insertNotice, setInsertNotice] = useState('');
  const [leavePrompt, setLeavePrompt] = useState(null);
  const [leaveSaving, setLeaveSaving] = useState(false);
  const skipLeaveGuardRef = useRef(false);

  const [dirtyBaseline, setDirtyBaseline] = useState(() => ({
    form: {
      title: post?.title || '',
      slug: post?.slug || '',
      excerpt: post?.excerpt || '',
      content: post?.content ? prepareContentForVisual(post.content) : '',
      cover_image_url: post?.cover_image_url || '',
      cover_image_alt: post?.cover_image_alt || '',
      status: post?.status || 'draft',
      is_featured: post?.is_featured || false,
      meta_title: post?.meta_title || '',
      meta_description: post?.meta_description || '',
      seo_noindex: Boolean(post?.seo_noindex),
      author_id: defaultAuthorId,
    },
    tags: initialTagNames,
    categoryIds: initialCategoryIds,
  }));

  const isDirty =
    JSON.stringify(form) !== JSON.stringify(dirtyBaseline.form) ||
    JSON.stringify(tags) !== JSON.stringify(dirtyBaseline.tags) ||
    JSON.stringify(categoryIds) !== JSON.stringify(dirtyBaseline.categoryIds);

  const navigateAway = useCallback((href) => {
    skipLeaveGuardRef.current = true;
    router.push(href);
  }, [router]);

  const requestLeave = useCallback((href = '/shiv_admin/blog') => {
    if (!isDirty || skipLeaveGuardRef.current) {
      navigateAway(href);
      return;
    }
    setLeavePrompt({ href });
  }, [isDirty, navigateAway]);

  useEffect(() => {
    if (!isDirty) return;

    function handleClick(e) {
      if (skipLeaveGuardRef.current) return;

      const anchor = e.target.closest('a[href]');
      if (!anchor) return;
      if (anchor.target === '_blank' || anchor.hasAttribute('download')) return;

      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

      try {
        const dest = new URL(href, window.location.origin);
        if (dest.origin !== window.location.origin) return;

        const current = window.location.pathname + window.location.search;
        const next = dest.pathname + dest.search;
        if (next === current) return;

        e.preventDefault();
        e.stopPropagation();
        setLeavePrompt({ href: next });
      } catch {
        // ignore invalid URLs
      }
    }

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [isDirty]);

  useEffect(() => {
    if (!isDirty) return;

    const currentUrl = window.location.href;
    window.history.pushState(null, '', currentUrl);

    function handlePopState() {
      if (skipLeaveGuardRef.current) return;
      window.history.pushState(null, '', currentUrl);
      setLeavePrompt({ href: '/shiv_admin/blog' });
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isDirty]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => {
      const next = { ...f, [name]: type === 'checkbox' ? checked : value };
      if (name === 'title' && !slugManuallyEdited.current) {
        next.slug = slugify(value);
      }
      return next;
    });
  }

  async function handleCoverUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCover(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('cover', file);
      const res = await fetch('/api/admin/blog/cover', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Cover upload failed.');
        return;
      }
      setForm((f) => ({ ...f, cover_image_url: data.cover_image_url }));
    } catch {
      setError('Cover upload failed. Please try again.');
    } finally {
      setUploadingCover(false);
      if (coverFileRef.current) coverFileRef.current.value = '';
    }
  }

  function handleSlugChange(e) {
    slugManuallyEdited.current = true;
    setForm((f) => ({ ...f, slug: slugify(e.target.value) }));
  }

  function addTag(e) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const t = tagInput.trim().replace(/,/g, '');
      if (t && !tags.includes(t)) setTags((prev) => [...prev, t]);
      setTagInput('');
    }
  }

  function removeTag(tag) {
    setTags((prev) => prev.filter((t) => t !== tag));
  }

  function insertSnippet(html, label = 'Block') {
    const isMedia = /image|youtube|video/i.test(label);
    const notice = isMedia ? `${label} inserted` : `${label} added | hover the block and click Remove to delete`;

    if (contentMode === 'html') {
      setForm((f) => ({
        ...f,
        content: (f.content ? `${f.content}\n\n` : '') + html,
      }));
      setInsertNotice(notice);
    } else if (contentMode === 'preview') {
      setContentMode('visual');
      requestAnimationFrame(() => {
        visualEditorRef.current?.insertHtml(html, { wrapAsBlock: true });
        setInsertNotice(notice);
      });
    } else {
      visualEditorRef.current?.insertHtml(html, { wrapAsBlock: true });
      setInsertNotice(notice);
    }

    setTimeout(() => setInsertNotice(''), 3000);
  }

  const changeContentMode = useCallback((mode) => {
    if (contentMode === 'visual' && visualEditorRef.current) {
      visualEditorRef.current.flush();
    }
    setContentMode(mode);
  }, [contentMode]);

  async function handleSubmit(nextStatus = form.status, options = {}) {
    const { redirectTo } = options;
    setError('');
    setLoading(true);
    setSaved(false);

    const content = contentMode === 'visual' && visualEditorRef.current
      ? visualEditorRef.current.getHtml()
      : form.content;

    try {
      const url = isEdit ? `/api/admin/blog/${post.id}` : '/api/admin/blog';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, content, status: nextStatus, tags, category_ids: categoryIds }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to save post.');
        return false;
      }

      if (data.post) {
        const updatedForm = {
          ...form,
          content,
          slug: data.post.slug,
          seo_noindex: Boolean(data.post.seo_noindex),
          status: nextStatus,
          author_id: data.post.author_id || form.author_id,
        };
        setForm(updatedForm);
        setDirtyBaseline({ form: updatedForm, tags, categoryIds });
      }

      if (redirectTo) {
        navigateAway(redirectTo);
        return true;
      }

      if (nextStatus === 'draft') {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        if (!isEdit) {
          skipLeaveGuardRef.current = true;
          router.push(`/shiv_admin/blog/${data.post.id}`);
        }
      } else {
        skipLeaveGuardRef.current = true;
        router.push('/shiv_admin/blog');
        router.refresh();
      }
      return true;
    } catch {
      setError('Network error. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveAndLeave() {
    if (!leavePrompt) return;
    const href = leavePrompt.href;
    setLeaveSaving(true);
    const ok = await handleSubmit(form.status, { redirectTo: href });
    setLeaveSaving(false);
    if (ok) setLeavePrompt(null);
  }

  function handleDiscardAndLeave() {
    if (!leavePrompt) return;
    const href = leavePrompt.href;
    setLeavePrompt(null);
    navigateAway(href);
  }

  return (
    <div className={`fixed inset-y-0 right-0 left-0 z-20 flex flex-col overflow-hidden bg-[#f4f7fb] will-change-[left] ${ADMIN_SHELL_LEFT_TRANSITION} ${sidebarLeftClass}`}>
      <UnsavedChangesModal
        open={Boolean(leavePrompt)}
        loading={leaveSaving || loading}
        onCancel={() => setLeavePrompt(null)}
        onDiscard={handleDiscardAndLeave}
        onSaveAndLeave={handleSaveAndLeave}
      />

      <EditorHeader
        isEdit={isEdit}
        post={post}
        form={form}
        saved={saved}
        loading={loading}
        onSave={() => handleSubmit(form.status)}
        onPublish={() => handleSubmit('published')}
        onRequestLeave={requestLeave}
      />

      {error && (
        <div className="flex-shrink-0 mx-4 sm:mx-6 mt-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      <div className="flex flex-1 min-h-0 flex-col xl:flex-row overflow-hidden">
        {/* Main editor | title fixed, content area scrolls internally */}
        <div className="flex-1 min-w-0 min-h-0 flex flex-col overflow-hidden">
          <div className="flex-shrink-0 px-4 sm:px-6 lg:px-8 pt-5 pb-3 w-full space-y-4">
            <div>
              <label htmlFor="post-title" className="block text-sm font-semibold text-slate-700 mb-2">
                Title
              </label>
              <input
                id="post-title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter post title"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-2xl font-bold text-slate-900 outline-none focus:border-[#2f6bff] focus:ring-2 focus:ring-[#2f6bff]/15 placeholder-slate-400 shadow-sm"
              />
            </div>

            <div>
              <label htmlFor="post-excerpt" className="block text-sm font-semibold text-slate-700 mb-2">
                Excerpt
                <span className="font-normal text-slate-500 ml-1">— shown on the blog listing page</span>
              </label>
              <textarea
                id="post-excerpt"
                name="excerpt"
                value={form.excerpt}
                onChange={handleChange}
                rows={3}
                placeholder="Short summary of your post"
                className="w-full min-h-[5.5rem] bg-white border border-slate-200 rounded-xl px-4 py-3 text-base text-slate-700 outline-none focus:border-[#2f6bff] focus:ring-2 focus:ring-[#2f6bff]/15 placeholder-slate-400 resize-y shadow-sm"
              />
            </div>
          </div>

          {/* Post content | toolbar stays visible; only writing area scrolls */}
          <div className="flex-1 min-h-0 flex flex-col px-4 sm:px-6 lg:px-8 pb-5 w-full">
            <div className="flex-1 min-h-0 flex flex-col bg-white border border-slate-200 rounded-2xl shadow-md shadow-slate-200/50 ring-1 ring-slate-900/5 overflow-hidden">
              <div className={contentMode === 'visual' ? 'flex flex-col flex-1 min-h-0' : 'hidden'}>
                <RichTextEditor
                  ref={visualEditorRef}
                  value={form.content}
                  onChange={(html) => setForm((f) => ({ ...f, content: html }))}
                  placeholder="Start writing… Use the toolbar for headings, bold, lists, links, tables, and more. Switch to HTML for custom code."
                />
              </div>

              <div className={contentMode === 'html' ? 'flex flex-col flex-1 min-h-0' : 'hidden'}>
                <HtmlEditor
                  value={form.content}
                  onChange={(html) => setForm((f) => ({ ...f, content: html }))}
                  placeholder={'<h2>Your heading</h2>\n<p>Your paragraph with <strong>bold</strong> text.</p>\n<table>...</table>'}
                />
              </div>

              <div className={contentMode === 'preview' ? 'flex flex-col flex-1 min-h-0' : 'hidden'}>
                <div className="editor-content-scroll flex-1 min-h-0 overflow-y-auto p-6 sm:p-8 bg-slate-50/50">
                  {form.title && (
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{form.title}</h1>
                  )}
                  {form.excerpt && (
                    <p className="text-gray-500 italic text-lg mb-6 pb-6 border-b border-gray-200">
                      {form.excerpt}
                    </p>
                  )}
                  {form.cover_image_url && (
                    <img
                      src={form.cover_image_url}
                      alt="Cover preview"
                      className="w-full max-h-80 object-cover rounded-xl mb-6"
                    />
                  )}
                  {form.content ? (
                    <div
                      className="blog-content max-w-none"
                      dangerouslySetInnerHTML={{ __html: renderBlogMarkdown(form.content) }}
                    />
                  ) : (
                    <div className="text-center py-20">
                      <Eye className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 text-base">Nothing to preview yet. Switch to Visual or HTML and add content.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-full xl:w-[20rem] flex-shrink-0 flex flex-col border-t xl:border-t-0 xl:border-l border-gray-200 bg-gray-50 xl:min-h-0 xl:overflow-hidden">
          <EditorModePanel
            contentMode={contentMode}
            onChange={changeContentMode}
          />

          <div className="flex-shrink-0 flex p-2 gap-1 border-b border-gray-200 bg-white">
            <button
              type="button"
              onClick={() => setSidebarTab('settings')}
              className={`flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold py-2.5 rounded-lg transition ${
                sidebarTab === 'settings'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <button
              type="button"
              onClick={() => setSidebarTab('design')}
              className={`flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold py-2.5 rounded-lg transition ${
                sidebarTab === 'design'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Wand2 className="w-4 h-4" />
              Blocks
            </button>
          </div>

          <div className="p-4 space-y-4 xl:flex-1 xl:min-h-0 xl:overflow-y-auto">
            {sidebarTab === 'design' ? (
              <DesignToolkit onInsert={insertSnippet} insertNotice={insertNotice} />
            ) : (
              <>
                <SectionCard title="Publish" hint="Who can see this post?" compact>
                  <AdminSelect
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="draft">Draft | only visible in admin</option>
                    <option value="published">Published | live on website</option>
                    <option value="archived">Archived | hidden from visitors</option>
                  </AdminSelect>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <ToggleSwitch
                      checked={form.is_featured}
                      onChange={(val) => setForm((f) => ({ ...f, is_featured: val }))}
                      label="Featured post"
                      description="Show this post prominently on the blog page"
                    />
                  </div>

                  {form.status !== 'archived' && isEdit && (
                    <button
                      type="button"
                      onClick={() => handleSubmit('archived')}
                      disabled={loading}
                      className="mt-4 w-full text-sm text-gray-600 hover:text-red-600 border border-gray-200 hover:border-red-200 rounded-lg py-2.5 transition disabled:opacity-40"
                    >
                      Archive this post
                    </button>
                  )}
                </SectionCard>

                {showAuthorSelect ? (
                  <SectionCard
                    title="Author"
                    hint="Shown on the public blog post. Change this to reassign ownership."
                    compact
                  >
                    <AdminSelect
                      name="author_id"
                      value={form.author_id}
                      onChange={handleChange}
                      placeholder="Select author"
                    >
                      {authors.map((author) => {
                        const inactive = !author.is_active;
                        const label = `${author.name}${inactive ? ' (inactive)' : ''} · ${roleLabel(author.role)}`;
                        return (
                          <option key={author.id} value={author.id}>
                            {label}
                          </option>
                        );
                      })}
                    </AdminSelect>
                  </SectionCard>
                ) : post?.author_name ? (
                  <SectionCard title="Author" compact>
                    <p className="text-sm font-medium text-gray-900">{post.author_name}</p>
                  </SectionCard>
                ) : null}

                <SectionCard title="Categories" hint="Select one or more. Shown as filter tabs on the blog page." compact>
                  {categories.length === 0 ? (
                    <p className="text-sm text-amber-700">
                      No categories yet.{' '}
                      <Link href="/shiv_admin/blog/categories" className="font-medium text-blue-600 hover:underline">
                        Create categories first
                      </Link>
                    </p>
                  ) : (
                    <>
                      <div className="max-h-44 space-y-1 overflow-y-auto rounded-lg border border-slate-200 p-2">
                        {categories.map((c) => {
                          const checked = categoryIds.includes(c.id);
                          return (
                            <label
                              key={c.id}
                              className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition ${
                                checked ? 'bg-blue-50 text-blue-900' : 'text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                checked={checked}
                                onChange={() => setCategoryIds((prev) => toggleCategoryId(prev, c.id))}
                              />
                              <span
                                className="h-2.5 w-2.5 shrink-0 rounded-full"
                                style={{ backgroundColor: c.color || '#3B82F6' }}
                                aria-hidden
                              />
                              <span className="font-medium">{c.name}</span>
                            </label>
                          );
                        })}
                      </div>
                      {categoryIds.length > 0 && (
                        <p className="mt-2 text-xs text-slate-500">
                          {categoryIds.length} selected
                        </p>
                      )}
                      <p className="mt-2 text-xs text-slate-500">
                        <Link href="/shiv_admin/blog/categories" className="font-medium text-blue-600 hover:underline">
                          Manage categories
                        </Link>
                      </p>
                    </>
                  )}
                </SectionCard>

                <SectionCard title="Tags" hint="Press Enter after each tag." compact>
                  <div className="flex flex-wrap gap-2 mb-3 min-h-8">
                    {tags.length === 0 && (
                      <span className="text-sm text-gray-400">No tags added</span>
                    )}
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1.5 bg-blue-50 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="hover:text-blue-950 transition"
                          aria-label={`Remove tag ${tag}`}
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={addTag}
                    placeholder="Type a tag and press Enter"
                    className="w-full bg-white border border-gray-200 text-gray-900 rounded-xl px-4 py-2.5 text-[14px] font-medium transition-all duration-200 hover:border-gray-300 focus:outline-none focus:border-[#2667ff] focus:ring-4 focus:ring-[#2667ff]/10 placeholder-gray-400 shadow-sm"
                  />
                </SectionCard>

                <SectionCard title="URL slug" hint="The post address on your site. Use lowercase words separated by hyphens." compact>
                  <div className="flex items-center rounded-xl border border-gray-200 bg-white overflow-hidden transition-all duration-200 hover:border-gray-300 focus-within:border-[#2667ff] focus-within:ring-4 focus-within:ring-[#2667ff]/10 shadow-sm">
                    <span className="pl-4 text-[14px] text-gray-400 whitespace-nowrap">/insights/</span>
                    <input
                      id="slug"
                      name="slug"
                      value={form.slug}
                      onChange={handleSlugChange}
                      placeholder="my-post-title"
                      className="flex-1 py-2.5 pr-4 text-[14px] font-medium text-gray-900 outline-none bg-transparent placeholder-gray-400"
                    />
                  </div>
                </SectionCard>

                <SectionCard title="Cover image" hint="Upload a file or paste an image URL." compact>
                  <input
                    ref={coverFileRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="hidden"
                    onChange={handleCoverUpload}
                  />
                  <button
                    type="button"
                    onClick={() => coverFileRef.current?.click()}
                    disabled={uploadingCover}
                    className="w-full inline-flex items-center justify-center gap-2 text-sm font-medium text-[#2667ff] bg-[#2667ff]/5 border border-[#2667ff]/20 rounded-xl py-2.5 mb-3 hover:bg-[#2667ff]/10 transition disabled:opacity-50"
                  >
                    {uploadingCover ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    {uploadingCover ? 'Uploading…' : 'Upload image'}
                  </button>
                  <input
                    name="cover_image_url"
                    value={form.cover_image_url}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg or /uploads/covers/…"
                    className="w-full bg-white border border-gray-200 text-gray-900 rounded-xl px-4 py-2.5 text-[14px] font-medium transition-all duration-200 hover:border-gray-300 focus:outline-none focus:border-[#2667ff] focus:ring-4 focus:ring-[#2667ff]/10 placeholder-gray-400 shadow-sm mb-3"
                  />
                  <label htmlFor="cover_image_alt" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Cover image alt text
                  </label>
                  <input
                    id="cover_image_alt"
                    name="cover_image_alt"
                    value={form.cover_image_alt}
                    onChange={handleChange}
                    placeholder={form.title || 'Describe the cover image'}
                    className="w-full bg-white border border-gray-200 text-gray-900 rounded-xl px-4 py-2.5 text-[14px] font-medium transition-all duration-200 hover:border-gray-300 focus:outline-none focus:border-[#2667ff] focus:ring-4 focus:ring-[#2667ff]/10 placeholder-gray-400 shadow-sm mb-3"
                  />
                  {form.cover_image_url ? (
                    <div className="relative group">
                      <img
                        src={form.cover_image_url}
                        alt="Cover preview"
                        className="w-full h-40 object-cover rounded-lg border border-gray-200"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                      <button
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, cover_image_url: '' }))}
                        className="absolute top-2 right-2 bg-black/60 hover:bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition"
                        aria-label="Remove cover image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-full h-28 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center bg-gray-50">
                      <span className="text-sm text-gray-500">Image preview appears here</span>
                    </div>
                  )}
                </SectionCard>

                <SectionCard title="SEO" hint="Optional | leave blank to use title & excerpt." compact>
                  <div className="space-y-4">
                    <SerpPreview
                      title={form.meta_title || form.title}
                      description={form.meta_description || form.excerpt}
                      slug={form.slug}
                    />

                    <ToggleSwitch
                      checked={form.seo_noindex}
                      onChange={(val) => setForm((f) => ({ ...f, seo_noindex: val }))}
                      label="Hide from search engines"
                      description="Adds noindex | post stays public but won't appear in Google"
                    />

                    <div>
                      <label htmlFor="meta_title" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Meta title
                      </label>
                      <input
                        id="meta_title"
                        name="meta_title"
                        value={form.meta_title}
                        onChange={handleChange}
                        placeholder={form.title || 'Uses post title if empty'}
                        className="w-full bg-white border border-gray-200 text-gray-900 rounded-xl px-4 py-2.5 text-[14px] font-medium transition-all duration-200 hover:border-gray-300 focus:outline-none focus:border-[#2667ff] focus:ring-4 focus:ring-[#2667ff]/10 placeholder-gray-400 shadow-sm"
                      />
                      <p className="text-sm text-gray-500 mt-1 text-right">
                        {form.meta_title.length}/60
                      </p>
                    </div>
                    <div>
                      <label htmlFor="meta_description" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Meta description
                      </label>
                      <textarea
                        id="meta_description"
                        name="meta_description"
                        value={form.meta_description}
                        onChange={handleChange}
                        rows={3}
                        placeholder={form.excerpt || 'Uses excerpt if empty'}
                        className="w-full bg-white border border-gray-200 text-gray-900 rounded-xl px-4 py-2.5 text-[14px] font-medium transition-all duration-200 hover:border-gray-300 focus:outline-none focus:border-[#2667ff] focus:ring-4 focus:ring-[#2667ff]/10 placeholder-gray-400 resize-none shadow-sm"
                      />
                      <p className={`text-sm mt-1 text-right ${form.meta_description.length > 160 ? 'text-red-600' : 'text-gray-500'}`}>
                        {form.meta_description.length}/160
                      </p>
                    </div>
                  </div>
                </SectionCard>
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
