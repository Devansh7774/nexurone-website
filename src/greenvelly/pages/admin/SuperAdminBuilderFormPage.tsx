import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { PageBackBar } from '@/greenvelly/components/layout/PageBackBar'
import { Toast } from '@/greenvelly/components/Toast'
import { AppButton } from '@/greenvelly/components/widgets/AppButton'
import { CustomTextField } from '@/greenvelly/components/widgets/CustomTextField'
import * as adminService from '@/greenvelly/services/adminService'

export function SuperAdminBuilderFormPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const existing = (location.state as { builder?: Record<string, unknown> } | null)?.builder
  const isEdit = Boolean(id && existing)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [gst, setGst] = useState('')
  const [rera, setRera] = useState('')
  const [locationText, setLocationText] = useState('')
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    if (!existing) return
    setEmail(String(existing.email ?? ''))
    setFullName(String(existing.full_name ?? ''))
    setPhone(String(existing.phone ?? ''))
    setCompany(String(existing.company_name ?? ''))
    setGst(String(existing.gst_number ?? ''))
    setRera(String(existing.rera_number ?? ''))
    setLocationText(String(existing.location ?? ''))
  }, [existing])

  const handleSubmit = async () => {
    if (!email.trim() || !fullName.trim()) {
      setToast({ msg: 'Email and full name are required.', type: 'error' })
      return
    }
    setSaving(true)
    try {
      if (isEdit && id) {
        const body: Record<string, unknown> = {
          email: email.trim(),
          full_name: fullName.trim(),
          phone: phone.trim(),
          company_name: company.trim(),
          gst_number: gst.trim(),
          rera_number: rera.trim(),
          location: locationText.trim(),
        }
        if (password.trim()) body.password = password.trim()
        const r = await adminService.updateBuilder(id, body)
        if (!r) {
          setToast({ msg: 'Update failed.', type: 'error' })
          return
        }
        navigate('/admin', { replace: true })
      } else {
        const r = await adminService.createBuilder({
          email: email.trim().toLowerCase(),
          full_name: fullName.trim(),
          phone: phone.trim(),
          company_name: company.trim(),
          gst_number: gst.trim(),
          rera_number: rera.trim(),
          location: locationText.trim(),
        })
        if (!r.ok) {
          setToast({ msg: r.message ?? 'Could not create builder.', type: 'error' })
          return
        }
        setToast({
          msg: r.message ?? (r.emailSent ? 'Builder created. Credentials sent by email.' : 'Builder created.'),
          type: r.emailSent ? 'success' : 'error',
        })
        setTimeout(() => navigate('/admin', { replace: true }), 1200)
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="page app-shell">
      <PageBackBar title={isEdit ? 'Edit builder' : 'Add builder'} />

      <div className="page-padding">
        <div className="form-card">
          <CustomTextField label="Email *" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <div style={{ height: 12 }} />
          <CustomTextField
            label={isEdit ? 'New password (optional)' : 'Password'}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div style={{ height: 12 }} />
          <CustomTextField label="Full name *" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <div style={{ height: 12 }} />
          <CustomTextField label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <div style={{ height: 12 }} />
          <CustomTextField label="Company name" value={company} onChange={(e) => setCompany(e.target.value)} />
          <div style={{ height: 12 }} />
          <CustomTextField label="GST number" value={gst} onChange={(e) => setGst(e.target.value)} />
          <div style={{ height: 12 }} />
          <CustomTextField label="RERA number" value={rera} onChange={(e) => setRera(e.target.value)} />
          <div style={{ height: 12 }} />
          <CustomTextField label="Location" multiline rows={2} value={locationText} onChange={(e) => setLocationText(e.target.value)} />
          <div style={{ height: 20 }} />
          <AppButton text={isEdit ? 'Save changes' : 'Create builder'} isLoading={saving} onClick={handleSubmit} />
        </div>
      </div>

      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
