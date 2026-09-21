import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PageBackBar } from '@/greenvelly/components/layout/PageBackBar'
import { Toast } from '@/greenvelly/components/Toast'
import { AppButton } from '@/greenvelly/components/widgets/AppButton'
import { CustomTextField } from '@/greenvelly/components/widgets/CustomTextField'
import { colors } from '@/greenvelly/config/colors'
import { LEAD_STATUSES } from '@/greenvelly/config/constants'
import * as inquiriesApi from '@/greenvelly/services/inquiriesService'
import { useSiteStore } from '@/greenvelly/stores/siteStore'

export function EditInquiryPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const patchInquiry = useSiteStore((s) => s.patchInquiry)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState('New Lead')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    if (!id) return
    inquiriesApi.getInquiry(id).then((d) => {
      if (!d) {
        setLoading(false)
        return
      }
      const name = String(d.name ?? '').trim()
      const parts = name.split(/\s+/)
      if (d.first_name || d.last_name) {
        setFirstName(String(d.first_name ?? ''))
        setLastName(String(d.last_name ?? ''))
      } else if (parts.length >= 2) {
        setFirstName(parts[0])
        setLastName(parts.slice(1).join(' '))
      } else {
        setFirstName(name)
      }
      setPhone(String(d.phone ?? ''))
      setStatus(String(d.status ?? 'New Lead'))
      setAddress(String(d.address ?? ''))
      setNotes(String(d.notes ?? ''))
      setLoading(false)
    })
  }, [id])

  const handleSave = async () => {
    if (!id) return
    setSaving(true)
    try {
      const updated = await patchInquiry(id, {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        phone: phone.trim(),
        status,
        address: address.trim(),
        notes: notes.trim(),
      })
      if (updated) {
        navigate(`/inquiry/${id}`, { replace: true, state: { inquiry: updated } })
      } else {
        setToast({ msg: 'Save failed.', type: 'error' })
      }
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="page app-shell">
        <PageBackBar title="Edit Inquiry" />
        <div className="loader-overlay">
          <div className="loader-spinner" />
        </div>
      </div>
    )
  }

  const selectStyle = { width: '100%', padding: '12px 14px', borderRadius: 12, border: `1px solid ${colors.border}`, background: colors.surfaceVariant, fontSize: 14 }

  return (
    <div className="page app-shell">
      <PageBackBar title="Edit Inquiry" />

      <div className="page-padding">
        <div className="form-card">
          <CustomTextField label="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <div style={{ height: 12 }} />
          <CustomTextField label="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <div style={{ height: 12 }} />
          <CustomTextField label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={10} />
          <div style={{ height: 12 }} />
          <label className="custom-field">
            <span className="custom-field-label">Status</span>
            <select style={selectStyle} value={status} onChange={(e) => setStatus(e.target.value)}>
              {LEAD_STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>
          <div style={{ height: 12 }} />
          <CustomTextField label="Address" multiline rows={2} value={address} onChange={(e) => setAddress(e.target.value)} />
          <div style={{ height: 12 }} />
          <CustomTextField label="Notes" multiline rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
          <div style={{ height: 20 }} />
          <AppButton text="Save changes" isLoading={saving} onClick={handleSave} />
        </div>
      </div>

      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
