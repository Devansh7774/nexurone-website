'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Save, Upload, X } from 'lucide-react';
import { ADMIN_BTN_PRIMARY } from '@/components/admin/AdminShellContext';
import AuthorAvatar from '@/components/blog/AuthorAvatar';
import { roleLabel } from '@/lib/roles';

const inputClass =
  'w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100';

export default function ProfileForm({ initialProfile }) {
  const router = useRouter();
  const fileRef = useRef(null);
  const [name, setName] = useState(initialProfile.name || '');
  const [bio, setBio] = useState(initialProfile.bio || '');
  const [avatarUrl, setAvatarUrl] = useState(initialProfile.avatar_url || '');
  const [avatarInput, setAvatarInput] = useState(initialProfile.avatar_url || '');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  async function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      const res = await fetch('/api/admin/profile/avatar', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Upload failed.');
        return;
      }
      setAvatarUrl(data.avatar_url);
      setAvatarInput(data.avatar_url.split('?')[0]);
      router.refresh();
    } catch {
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSaved(false);

    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          bio,
          avatar_url: avatarInput.trim() || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to save profile.');
        return;
      }
      setAvatarUrl(data.profile.avatar_url || '');
      setAvatarInput((data.profile.avatar_url || '').split('?')[0]);
      setSaved(true);
      router.refresh();
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  function clearAvatar() {
    setAvatarUrl('');
    setAvatarInput('');
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <div className="flex justify-center mb-4">
            <AuthorAvatar name={name} avatarUrl={avatarUrl || avatarInput} size="xl" />
          </div>
          <p className="text-sm font-semibold text-gray-900">{name || 'Your name'}</p>
          <p className="text-xs text-gray-500 mt-0.5">{roleLabel(initialProfile.role)}</p>
          <p className="text-xs text-gray-400 mt-1">{initialProfile.email}</p>

          <div className="mt-5 space-y-2">
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={handleUpload}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="w-full inline-flex items-center justify-center gap-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-100 rounded-lg py-2.5 hover:bg-blue-100 transition disabled:opacity-50"
            >
              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              Upload photo
            </button>
            {(avatarUrl || avatarInput) && (
              <button
                type="button"
                onClick={clearAvatar}
                className="w-full inline-flex items-center justify-center gap-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg py-2.5 hover:bg-gray-50 transition"
              >
                <X className="w-4 h-4" />
                Remove photo
              </button>
            )}
          </div>
          <p className="text-[11px] text-gray-400 mt-3">JPEG, PNG, WebP or GIF · max 2 MB</p>
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Public profile</h2>
            <p className="mt-1 text-sm text-slate-500">
              Your name and photo appear on blog posts you write.
            </p>
          </div>

          <div>
            <label htmlFor="profile-name" className="block text-sm font-medium text-gray-700 mb-1.5">
              Display name
            </label>
            <input
              id="profile-name"
              className={inputClass}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="profile-bio" className="block text-sm font-medium text-gray-700 mb-1.5">
              Short bio (optional)
            </label>
            <textarea
              id="profile-bio"
              className={`${inputClass} resize-none`}
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="e.g. Content writer at Nexuron Technologies"
            />
          </div>

          <div>
            <label htmlFor="profile-avatar-url" className="block text-sm font-medium text-gray-700 mb-1.5">
              Or paste image URL
            </label>
            <input
              id="profile-avatar-url"
              className={inputClass}
              value={avatarInput}
              onChange={(e) => setAvatarInput(e.target.value)}
              placeholder="https://example.com/photo.jpg"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>
          )}

          {saved && (
            <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2">
              Profile saved.
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className={ADMIN_BTN_PRIMARY}
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save profile
          </button>
        </div>
      </div>
    </form>
  );
}
