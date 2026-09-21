'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Loader2, Pencil, UserX, UserCheck, X, Save, Mail, BadgeCheck } from 'lucide-react';
import AdminSelect from '@/components/ui/AdminSelect';
import AuthorAvatar from '@/components/blog/AuthorAvatar';
import { ASSIGNABLE_ROLES, roleLabel, ROLES } from '@/lib/roles';
import { ADMIN_BTN_PRIMARY } from '@/components/admin/AdminShellContext';

const inputClass =
  'w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100';

function RoleBadge({ role }) {
  const styles = {
    super_admin: 'bg-purple-100 text-purple-800',
    admin: 'bg-blue-100 text-blue-800',
    editor: 'bg-emerald-100 text-emerald-800',
  };
  return (
    <span className={`inline-flex text-xs font-semibold px-2.5 py-0.5 rounded-full ${styles[role] || 'bg-gray-100 text-gray-700'}`}>
      {roleLabel(role)}
    </span>
  );
}

function UserForm({ initial, onClose, onSaved, assignableRoles }) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);
  const [name, setName] = useState(initial?.name || '');
  const [email, setEmail] = useState(initial?.email || '');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(
    assignableRoles.some((r) => r.value === initial?.role)
      ? initial.role
      : assignableRoles[0]?.value || 'editor'
  );
  const [isActive, setIsActive] = useState(initial?.is_active !== false);
  const [avatarUrl, setAvatarUrl] = useState(initial?.avatar_url || '');
  const [bio, setBio] = useState(initial?.bio || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const url = isEdit ? `/api/admin/users/${initial.id}` : '/api/admin/users';
      const method = isEdit ? 'PUT' : 'POST';
      const body = isEdit
        ? { name, email, role, is_active: isActive, avatar_url: avatarUrl.trim() || null, bio: bio.trim() || null, ...(password ? { password } : {}) }
        : { name, email, password, role, is_active: isActive, avatar_url: avatarUrl.trim() || null, bio: bio.trim() || null };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to save user.');
        return;
      }

      onSaved(data.user, data.message);
      onClose();
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={onClose}>
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900">{isEdit ? 'Edit user' : 'Create user'}</h2>
          <button type="button" onClick={onClose} className="p-1 rounded-md text-gray-400 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Full name</label>
            <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Smith" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input className={inputClass} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@nexuron.com" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {isEdit ? 'New password (optional)' : 'Password'}
            </label>
            <input
              className={inputClass}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isEdit ? 'Leave blank to keep current' : 'Min. 8 characters'}
              required={!isEdit}
              minLength={isEdit ? undefined : 8}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Role</label>
            <AdminSelect value={role} onChange={(e) => setRole(e.target.value)}>
              {assignableRoles.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </AdminSelect>
            <p className="text-xs text-gray-500 mt-1">
              {assignableRoles.find((r) => r.value === role)?.hint}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Profile photo URL (optional)</label>
            <input className={inputClass} value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="https://example.com/photo.jpg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Bio (optional)</label>
            <textarea className={`${inputClass} resize-none`} rows={2} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Short author bio for blog posts" />
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="rounded border-gray-300" />
            Account active (can log in after email verification)
          </label>

          {!isEdit && (
            <p className="text-xs text-gray-500">
              A verification email will be sent automatically. You can also mark the user as verified from the list.
            </p>
          )}

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>
          )}

          <div className="flex gap-2 pt-1">
            <button type="button" onClick={onClose} className="flex-1 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg py-2.5 hover:bg-gray-50">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 ${ADMIN_BTN_PRIMARY}`}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {isEdit ? 'Save changes' : 'Create user'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function UsersManager({ initialUsers = [], currentUserId, currentUserRole }) {
  const router = useRouter();
  const [users, setUsers] = useState(initialUsers);
  const [formUser, setFormUser] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [busyId, setBusyId] = useState(null);
  const [busyAction, setBusyAction] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const isSuperAdmin = currentUserRole === ROLES.SUPER_ADMIN;
  const assignableRoles = isSuperAdmin
    ? ASSIGNABLE_ROLES
    : ASSIGNABLE_ROLES.filter((r) => r.value !== ROLES.SUPER_ADMIN);

  function canModifyUser(user) {
    if (user.role !== ROLES.SUPER_ADMIN) return true;
    return isSuperAdmin;
  }

  async function toggleActive(user) {
    if (user.id === currentUserId) {
      setError('You cannot disable your own account.');
      return;
    }
    if (!canModifyUser(user)) {
      setError('Only a Super Admin can disable Super Admin accounts.');
      return;
    }
    if (!window.confirm(`${user.is_active ? 'Disable' : 'Enable'} ${user.name}?`)) return;

    setBusyId(user.id);
    setBusyAction('toggle');
    setError('');
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !user.is_active }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to update user.');
        return;
      }
      setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, ...data.user, post_count: u.post_count } : u)));
      router.refresh();
    } catch {
      setError('Network error.');
    } finally {
      setBusyId(null);
      setBusyAction('');
    }
  }

  async function resendVerification(user) {
    setBusyId(user.id);
    setBusyAction('resend');
    setError('');
    setNotice('');
    try {
      const res = await fetch(`/api/admin/users/${user.id}/send-verification`, { method: 'POST' });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to send verification email.');
        return;
      }
      setNotice(data.message || 'Verification email sent.');
    } catch {
      setError('Network error.');
    } finally {
      setBusyId(null);
      setBusyAction('');
    }
  }

  async function markVerified(user) {
    if (!window.confirm(`Mark ${user.name} (${user.email}) as verified? They will be able to sign in without clicking the email link.`)) {
      return;
    }

    setBusyId(user.id);
    setBusyAction('verify');
    setError('');
    setNotice('');
    try {
      const res = await fetch(`/api/admin/users/${user.id}/verify`, { method: 'POST' });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to verify user.');
        return;
      }
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, ...data.user, post_count: u.post_count } : u))
      );
      setNotice(data.message || 'User marked as verified.');
      router.refresh();
    } catch {
      setError('Network error.');
    } finally {
      setBusyId(null);
      setBusyAction('');
    }
  }

  function handleSaved(user, message) {
    setUsers((prev) => {
      const exists = prev.some((u) => u.id === user.id);
      if (exists) {
        return prev.map((u) => (u.id === user.id ? { ...u, ...user } : u));
      }
      return [{ ...user, post_count: 0 }, ...prev];
    });
    if (message) setNotice(message);
  }

  return (
    <>
      {(showCreate || formUser) && (
        <UserForm
          initial={formUser}
          assignableRoles={assignableRoles}
          onClose={() => { setShowCreate(false); setFormUser(null); }}
          onSaved={handleSaved}
        />
      )}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">
          {users.length} team member{users.length !== 1 ? 's' : ''}
        </p>
        <button
          type="button"
          onClick={() => setShowCreate(true)}
          className={ADMIN_BTN_PRIMARY}
        >
          <Plus className="w-4 h-4" /> Add user
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3 mb-4">{error}</p>
      )}

      {notice && (
        <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-4 py-3 mb-4">{notice}</p>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {users.length === 0 ? (
          <p className="py-16 text-center text-sm text-slate-500">No users yet. Create the first team member.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <th className="px-6 py-3.5 text-left">User</th>
                <th className="px-4 py-3.5 text-left">Role</th>
                <th className="px-4 py-3.5 text-left">Posts</th>
                <th className="px-4 py-3.5 text-left">Status</th>
                <th className="px-4 py-3.5 text-left">Last login</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => {
                const busy = busyId === user.id;
                const canEdit = canModifyUser(user);
                return (
                  <tr key={user.id} className="transition hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <AuthorAvatar name={user.name} avatarUrl={user.avatar_url} size="sm" />
                        <div className="min-w-0">
                          <p className="font-medium text-slate-900">{user.name}</p>
                          <p className="mt-0.5 text-xs text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4"><RoleBadge role={user.role} /></td>
                    <td className="px-4 py-4 text-slate-600">{user.post_count ?? 0}</td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-1">
                        <span className={`inline-flex w-fit text-xs font-medium px-2.5 py-0.5 rounded-full ${
                          user.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {user.is_active ? 'Active' : 'Disabled'}
                        </span>
                        <span className={`inline-flex w-fit text-xs font-medium px-2.5 py-0.5 rounded-full ${
                          user.email_verified ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {user.email_verified ? 'Verified' : 'Unverified'}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-xs text-slate-500">
                      {user.last_login_at
                        ? new Date(user.last_login_at).toLocaleString()
                        : 'Never'}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-1">
                        {canEdit && (
                          <button
                            type="button"
                            onClick={() => setFormUser(user)}
                            className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition"
                            title="Edit user"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                        )}
                        {!user.email_verified && user.is_active && canEdit && (
                          <>
                            <button
                              type="button"
                              onClick={() => markVerified(user)}
                              disabled={busy}
                              className="p-2 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition disabled:opacity-50"
                              title="Mark as verified"
                            >
                              {busy && busyAction === 'verify' ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <BadgeCheck className="w-4 h-4" />
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() => resendVerification(user)}
                              disabled={busy}
                              className="p-2 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition disabled:opacity-50"
                              title="Resend verification email"
                            >
                              {busy && busyAction === 'resend' ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Mail className="w-4 h-4" />
                              )}
                            </button>
                          </>
                        )}
                        {user.id !== currentUserId && canEdit && (
                          <button
                            type="button"
                            onClick={() => toggleActive(user)}
                            disabled={busy}
                            className="p-2 rounded-lg text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition disabled:opacity-50"
                            title={user.is_active ? 'Disable user' : 'Enable user'}
                          >
                            {busy && busyAction === 'toggle' ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : user.is_active ? (
                              <UserX className="w-4 h-4" />
                            ) : (
                              <UserCheck className="w-4 h-4" />
                            )}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
