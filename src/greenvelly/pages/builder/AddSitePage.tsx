import { Building2, X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Toast } from '@/greenvelly/components/Toast'
import { AppButton } from '@/greenvelly/components/widgets/AppButton'
import { CustomTextField } from '@/greenvelly/components/widgets/CustomTextField'
import { colors } from '@/greenvelly/config/colors'
import { useSiteStore } from '@/greenvelly/stores/siteStore'

export function AddSitePage() {
  const navigate = useNavigate()
  const addSite = useSiteStore((s) => s.addSite)
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  const handleSubmit = async () => {
    const trimmed = name.trim()
    if (!trimmed) {
      setError('Enter a site name')
      return
    }
    setError('')
    setLoading(true)
    try {
      const err = await addSite(trimmed)
      if (err) {
        setToast({ msg: err, type: 'error' })
        return
      }
      navigate('/home', { replace: true })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page app-shell page-white">
      <header className="app-bar">
        <button type="button" className="app-bar-back" onClick={() => navigate(-1)}>
          <X size={22} />
        </button>
        <h1 className="app-bar-title">Add Site</h1>
        <div style={{ width: 40 }} />
      </header>

      <div className="page-padding">
        <p style={{ fontSize: 14, color: colors.textSecondary, lineHeight: 1.5, margin: '0 0 24px' }}>
          Create a builder site to keep inquiries, documents, and photos organized.
        </p>
        <div className="form-card">
          <CustomTextField
            label="Site name"
            placeholder="e.g. Green Valley Phase 2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            prefixIcon={<Building2 size={18} color={colors.textHint} />}
            error={error}
          />
          <div style={{ height: 24 }} />
          <AppButton text="Create site" isLoading={loading} onClick={handleSubmit} />
        </div>
      </div>

      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
