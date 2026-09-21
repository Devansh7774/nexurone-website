import { MessageCircle, Pencil, Phone } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { PageBackBar } from '@/greenvelly/components/layout/PageBackBar'
import { Toast } from '@/greenvelly/components/Toast'
import { AppButton } from '@/greenvelly/components/widgets/AppButton'
import { StatusBadge } from '@/greenvelly/components/widgets/StatusBadge'
import { colors } from '@/greenvelly/config/colors'
import { LEAD_STATUSES } from '@/greenvelly/config/constants'
import * as inquiriesApi from '@/greenvelly/services/inquiriesService'
import { useFollowUpStore } from '@/greenvelly/stores/followUpStore'
import { useSiteStore } from '@/greenvelly/stores/siteStore'
import { launchPhone, launchWhatsApp } from '@/greenvelly/utils/contact'
import { normalizeInquiry } from '@/greenvelly/utils/exportInquiries'

export function InquiryDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const patchInquiry = useSiteStore((s) => s.patchInquiry)
  const scheduleFollowUp = useFollowUpStore((s) => s.scheduleFollowUp)
  const [inquiry, setInquiry] = useState<Record<string, unknown> | null>(
    () => (location.state as { inquiry?: Record<string, unknown> } | null)?.inquiry ?? null,
  )
  const [status, setStatus] = useState('')
  const [tab, setTab] = useState(0)
  const [followUpDays, setFollowUpDays] = useState('')
  const [sheetOpen, setSheetOpen] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    if (!id) return
    if (inquiry) return
    inquiriesApi.getInquiry(id).then((d) => {
      if (d) {
        setInquiry(d)
        setStatus(String(d.status ?? 'New Lead'))
      }
    })
  }, [id, inquiry])

  useEffect(() => {
    if (inquiry) setStatus(String(inquiry.status ?? 'New Lead'))
  }, [inquiry])

  if (!inquiry || !id) {
    return (
      <div className="page app-shell">
        <PageBackBar title="Inquiry" />
        <div className="empty-state">Inquiry not found.</div>
      </div>
    )
  }

  const row = normalizeInquiry(inquiry)
  const phone = row.phone

  const updateStatus = async (next: string, extra?: Record<string, unknown>) => {
    setStatus(next)
    const updated = await patchInquiry(id, { status: next, ...extra })
    if (updated) {
      setInquiry(updated)
      setToast({ msg: 'Status updated.', type: 'success' })
    } else {
      setToast({ msg: 'Update failed.', type: 'error' })
    }
  }

  const handleSiteVisitFollowUp = async () => {
    const days = Number(followUpDays) || 7
    const when = new Date()
    when.setDate(when.getDate() + days)
    await scheduleFollowUp({
      followUpType: 'Call',
      scheduledAt: when,
      contactName: row.name,
      phone,
      inquiryId: id,
      notes: `Follow-up after site visit (${days} days)`,
    })
    await updateStatus('Follow-up')
    setSheetOpen(false)
  }

  const detailFields: [string, string][] = [
    ['Inquiry Date', row.date],
    ['Phone', row.phone],
    ['Project', row.project || String(inquiry.project ?? '—')],
    ['Requirement', row.requirement],
    ['Budget', row.budget],
    ['Source', row.source || String(inquiry.lead_source ?? '—')],
    ['State', String(inquiry.state ?? '—')],
    ['City', String(inquiry.city ?? '—')],
    ['Address', String(inquiry.address ?? '—')],
    ['Notes', String(inquiry.notes ?? '—')],
  ]

  return (
    <div className="page app-shell">
      <PageBackBar
        title={row.name}
        actions={
          <button type="button" className="icon-btn" onClick={() => navigate(`/inquiry/${id}/edit`)}>
            <Pencil size={20} />
          </button>
        }
      />

      <div className="page-padding" style={{ paddingTop: 0 }}>
        <div className="card" style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <StatusBadge status={status} />
            {phone && (
              <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
                <button type="button" className="chip" onClick={() => launchPhone(phone)}>
                  <Phone size={14} style={{ marginRight: 4 }} /> Call
                </button>
                <button type="button" className="chip" onClick={() => launchWhatsApp(phone)}>
                  <MessageCircle size={14} style={{ marginRight: 4 }} /> WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="tabs">
          {['Details', 'Status', 'Activity'].map((label, i) => (
            <button key={label} type="button" className={`tab ${tab === i ? 'active' : ''}`} onClick={() => setTab(i)}>
              {label}
            </button>
          ))}
        </div>

        {tab === 0 && (
          <div style={{ marginTop: 16 }}>
            {detailFields.map(([label, value]) => (
              <div key={label} style={{ padding: '12px 0', borderBottom: `1px solid ${colors.border}` }}>
                <div style={{ fontSize: 12, color: colors.textHint, marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 15, fontWeight: 500 }}>{value || '—'}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 1 && (
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {LEAD_STATUSES.map((s) => (
              <button
                key={s}
                type="button"
                className={`list-item ${status === s ? 'selected' : ''}`}
                style={{ borderColor: status === s ? colors.primary : undefined }}
                onClick={() => {
                  if (s === 'Site Visit Done') {
                    setSheetOpen(true)
                    return
                  }
                  updateStatus(s)
                }}
              >
                <StatusBadge status={s} />
              </button>
            ))}
          </div>
        )}

        {tab === 2 && (
          <div className="empty-state" style={{ marginTop: 24 }}>
            Activity timeline will appear here as follow-ups and status changes are recorded.
          </div>
        )}
      </div>

      {sheetOpen && (
        <div className="modal-overlay" onClick={() => setSheetOpen(false)}>
          <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="modal-handle" />
            <h2 style={{ margin: '0 0 8px' }}>Site visit outcome</h2>
            <button type="button" className="menu-item" style={{ marginBottom: 8 }} onClick={() => setSheetOpen(false)}>
              <span style={{ flex: 1, textAlign: 'left' }}>
                <strong>Follow-up</strong>
                <div style={{ fontSize: 13, color: colors.textSecondary }}>Schedule next follow-up</div>
              </span>
            </button>
            <label className="custom-field">
              <span className="custom-field-label">Days until follow-up</span>
              <input
                className="custom-field-input"
                type="number"
                min={1}
                value={followUpDays}
                onChange={(e) => setFollowUpDays(e.target.value)}
                placeholder="7"
              />
            </label>
            <div style={{ height: 12 }} />
            <AppButton text="Schedule follow-up" onClick={handleSiteVisitFollowUp} />
            <div style={{ height: 8 }} />
            <AppButton
              text="Close — property purchased"
              backgroundColor={colors.success}
              onClick={() => updateStatus('Closed / Booked')}
            />
          </div>
        </div>
      )}

      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
