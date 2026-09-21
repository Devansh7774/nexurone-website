import { ChevronRight, Mail, Pencil, Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Toast } from '@/greenvelly/components/Toast'
import { colors } from '@/greenvelly/config/colors'
import * as adminService from '@/greenvelly/services/adminService'

export function SuperAdminAccountsPage() {
  const navigate = useNavigate()
  const [builders, setBuilders] = useState<Record<string, unknown>[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  const load = async () => {
    setLoading(true)
    setError('')
    const list = await adminService.listBuilders()
    if (!list) {
      setError('Could not load builders. Check connection and API.')
      setBuilders([])
    } else {
      setBuilders(list.filter((e) => e && typeof e === 'object') as Record<string, unknown>[])
    }
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const handleDelete = async (b: Record<string, unknown>) => {
    const name = String(b.full_name ?? 'Builder')
    if (!window.confirm(`Delete ${name} and all their sites, inquiries, and follow-ups? This cannot be undone.`)) {
      return
    }
    const id = String(b.id ?? '')
    if (!id) return
    const ok = await adminService.deleteBuilder(id)
    if (!ok) {
      setToast({ msg: 'Delete failed.', type: 'error' })
      return
    }
    await load()
    setToast({ msg: 'Builder deleted.', type: 'success' })
  }

  return (
    <div className="page app-shell">
      <header className="app-bar">
        <h1 className="app-bar-title">Super admin</h1>
        <div className="app-bar-actions">
          <button type="button" className="icon-btn" onClick={() => navigate('/admin/builder/new')}>
            <Plus size={22} />
          </button>
        </div>
      </header>

      <div className="page-padding" style={{ paddingBottom: 80 }}>
        {loading ? (
          <div className="loader-overlay" style={{ position: 'relative', minHeight: 200 }}>
            <div className="loader-spinner" />
          </div>
        ) : error ? (
          <div className="empty-state" style={{ color: colors.error }}>{error}</div>
        ) : builders.length === 0 ? (
          <div className="empty-state">
            <p>No builder accounts yet.</p>
            <button type="button" className="chip selected" onClick={() => navigate('/admin/builder/new')}>
              Add builder
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {builders.map((b) => (
              <div key={String(b.id)} className="card">
                <div style={{ fontWeight: 700, fontSize: 16 }}>{String(b.full_name ?? 'Builder')}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, fontSize: 13, color: colors.textSecondary }}>
                  <Mail size={14} />
                  {String(b.email ?? '—')}
                </div>
                {Boolean(b.company_name) && (
                  <div style={{ fontSize: 13, color: colors.textHint, marginTop: 4 }}>
                    {String(b.company_name)}
                  </div>
                )}
                <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                  <button
                    type="button"
                    className="chip"
                    onClick={() => navigate(`/admin/builder/${b.id}/sites`, { state: { builder: b } })}
                  >
                    View sites <ChevronRight size={14} />
                  </button>
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => navigate(`/admin/builder/${b.id}/edit`, { state: { builder: b } })}
                  >
                    <Pencil size={18} />
                  </button>
                  <button type="button" className="icon-btn" onClick={() => handleDelete(b)}>
                    <Trash2 size={18} color={colors.error} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
