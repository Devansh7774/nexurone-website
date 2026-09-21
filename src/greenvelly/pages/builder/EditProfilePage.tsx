import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageBackBar } from '@/greenvelly/components/layout/PageBackBar'
import { Toast } from '@/greenvelly/components/Toast'
import { AppButton } from '@/greenvelly/components/widgets/AppButton'
import { CustomTextField } from '@/greenvelly/components/widgets/CustomTextField'
import * as authService from '@/greenvelly/services/authService'
import { getUser } from '@/greenvelly/utils/storage'

export function EditProfilePage() {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [gst, setGst] = useState('')
  const [rera, setRera] = useState('')
  const [location, setLocation] = useState('')
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    const u = getUser()
    if (!u) return
    setFullName(String(u.full_name ?? ''))
    setPhone(String(u.phone ?? ''))
    setCompany(String(u.company_name ?? ''))
    setGst(String(u.gst_number ?? ''))
    setRera(String(u.rera_number ?? ''))
    setLocation(String(u.location ?? ''))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const updated = await authService.patchProfile({
        full_name: fullName.trim(),
        phone: phone.trim(),
        company_name: company.trim(),
        gst_number: gst.trim(),
        rera_number: rera.trim(),
        location: location.trim(),
      })
      if (updated) {
        setToast({ msg: 'Profile saved.', type: 'success' })
        setTimeout(() => navigate(-1), 800)
      } else {
        setToast({ msg: 'Save failed.', type: 'error' })
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="page app-shell">
      <PageBackBar title="Edit Profile" />

      <div className="page-padding">
        <div className="form-card">
          <CustomTextField label="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <div style={{ height: 12 }} />
          <CustomTextField label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <div style={{ height: 12 }} />
          <CustomTextField label="Company name" value={company} onChange={(e) => setCompany(e.target.value)} />
          <div style={{ height: 12 }} />
          <CustomTextField label="GST number" value={gst} onChange={(e) => setGst(e.target.value)} />
          <div style={{ height: 12 }} />
          <CustomTextField label="RERA number" value={rera} onChange={(e) => setRera(e.target.value)} />
          <div style={{ height: 12 }} />
          <CustomTextField label="Location" multiline rows={2} value={location} onChange={(e) => setLocation(e.target.value)} />
          <div style={{ height: 20 }} />
          <AppButton text="Save profile" isLoading={saving} onClick={handleSave} />
        </div>
      </div>

      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
