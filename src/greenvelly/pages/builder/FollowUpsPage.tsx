import { format, parseISO, isValid } from 'date-fns'
import { Check, Plus } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Toast } from '@/greenvelly/components/Toast'
import { AppButton } from '@/greenvelly/components/widgets/AppButton'
import { CustomTextField } from '@/greenvelly/components/widgets/CustomTextField'
import { NoSiteEmptyState } from '@/greenvelly/components/widgets/NoSiteEmptyState'
import { colors } from '@/greenvelly/config/colors'
import { FOLLOW_UP_TYPES } from '@/greenvelly/config/constants'
import { useFollowUpStore } from '@/greenvelly/stores/followUpStore'
import { useHasRealSites, useSelectedSite } from '@/greenvelly/stores/siteStore'
import { launchPhone, launchWhatsApp } from '@/greenvelly/utils/contact'

const TABS = ['Today', 'Missed', 'History'] as const

function followUpName(f: Record<string, unknown>): string {
  return String(f.contact_name ?? f.name ?? 'Follow-up')
}

function followUpDate(f: Record<string, unknown>): string {
  const raw = f.scheduled_at ?? f.date
  if (typeof raw === 'string' && raw) {
    const dt = parseISO(raw)
    if (isValid(dt)) return format(dt, 'd MMM yyyy, h:mm a')
    return raw
  }
  return String(f.date ?? '')
}

export function FollowUpsPage() {
  const hasSite = useHasRealSites()
  const selectedSite = useSelectedSite()
  const today = useFollowUpStore((s) => s.today)
  const missed = useFollowUpStore((s) => s.missed)
  const history = useFollowUpStore((s) => s.history)
  const syncFromApi = useFollowUpStore((s) => s.syncFromApi)
  const scheduleFollowUp = useFollowUpStore((s) => s.scheduleFollowUp)
  const setFollowUpDone = useFollowUpStore((s) => s.setFollowUpDone)
  const [tabIndex, setTabIndex] = useState(0)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [followUpType, setFollowUpType] = useState(FOLLOW_UP_TYPES[0])
  const [contactName, setContactName] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [scheduledAt, setScheduledAt] = useState('')
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    syncFromApi()
  }, [syncFromApi, selectedSite.id])

  const pending = today.filter((f) => !f.done).length
  const total = today.length
  const progress = total === 0 ? 0 : (total - pending) / total

  const listItems = useMemo(() => {
    if (tabIndex === 0) return today
    if (tabIndex === 1) return missed
    return history
  }, [tabIndex, today, missed, history])

  const handleToggle = async (f: Record<string, unknown>) => {
    const id = String(f.id ?? '')
    if (!id) return
    const next = !Boolean(f.done)
    const ok = await setFollowUpDone(id, next)
    if (!ok) setToast({ msg: 'Could not update follow-up.', type: 'error' })
  }

  const handleSchedule = async () => {
    if (!contactName.trim()) {
      setToast({ msg: 'Contact name is required.', type: 'error' })
      return
    }
    const when = scheduledAt ? new Date(scheduledAt) : new Date()
    if (Number.isNaN(when.getTime())) {
      setToast({ msg: 'Enter a valid date and time.', type: 'error' })
      return
    }
    setSaving(true)
    try {
      const ok = await scheduleFollowUp({
        followUpType,
        scheduledAt: when,
        contactName: contactName.trim(),
        phone: phone.trim(),
        notes: notes.trim(),
      })
      if (ok) {
        setSheetOpen(false)
        setContactName('')
        setPhone('')
        setNotes('')
        setScheduledAt('')
        setToast({ msg: 'Follow-up scheduled.', type: 'success' })
      } else {
        setToast({ msg: 'Could not schedule follow-up.', type: 'error' })
      }
    } finally {
      setSaving(false)
    }
  }

  if (!hasSite) {
    return (
      <div className="page app-shell">
        <header className="app-bar">
          <h1 className="app-bar-title">Follow-ups</h1>
        </header>
        <NoSiteEmptyState />
      </div>
    )
  }

  return (
    <div className="page app-shell">
      <header className="app-bar">
        <h1 className="app-bar-title">Follow-ups · {selectedSite.name}</h1>
      </header>

      <div className="tabs">
        {TABS.map((label, i) => (
          <button
            key={label}
            type="button"
            className={`tab ${tabIndex === i ? 'active' : ''}`}
            onClick={() => setTabIndex(i)}
          >
            {label}
          </button>
        ))}
      </div>

      {tabIndex === 0 && (
        <div className="page-padding" style={{ paddingBottom: 0 }}>
          <div
            className="card"
            style={{
              background: 'var(--primary-gradient)',
              border: 'none',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: 13, opacity: 0.85 }}>Today&apos;s Progress</div>
              <div style={{ fontSize: 20, fontWeight: 700, marginTop: 4 }}>
                {total === 0 ? '0 / 0 Done' : `${total - pending} / ${total} Done`}
              </div>
            </div>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                border: '3px solid rgba(255,255,255,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 12,
              }}
            >
              {Math.round(progress * 100)}%
            </div>
          </div>
        </div>
      )}

      <div className="page-padding" style={{ paddingTop: 12, paddingBottom: 80 }}>
        {listItems.length === 0 ? (
          <div className="empty-state">No follow-ups in this tab.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {listItems.map((f) => {
              const done = Boolean(f.done)
              const ph = String(f.phone ?? '')
              return (
                <div key={String(f.id)} className="card" style={{ padding: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <button
                      type="button"
                      onClick={() => handleToggle(f)}
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 8,
                        border: `2px solid ${done ? colors.success : colors.border}`,
                        background: done ? colors.success : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        flexShrink: 0,
                      }}
                      aria-label={done ? 'Mark incomplete' : 'Mark complete'}
                    >
                      {done && <Check size={16} color="#fff" />}
                    </button>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: 15, textDecoration: done ? 'line-through' : 'none' }}>
                        {followUpName(f)}
                      </div>
                      <div style={{ fontSize: 13, color: colors.textSecondary, marginTop: 4 }}>
                        {String(f.follow_up_type ?? 'Call')} · {String(f.project ?? selectedSite.name)}
                      </div>
                      {tabIndex !== 0 && (
                        <div style={{ fontSize: 12, color: colors.textHint, marginTop: 2 }}>
                          {followUpDate(f)}
                        </div>
                      )}
                      {ph && (
                        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                          <button
                            type="button"
                            className="chip"
                            onClick={() => launchPhone(ph)}
                          >
                            Call
                          </button>
                          <button
                            type="button"
                            className="chip"
                            onClick={() => launchWhatsApp(ph)}
                          >
                            WhatsApp
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <button type="button" className="fab" aria-label="Add follow-up" onClick={() => setSheetOpen(true)}>
        <Plus size={24} />
      </button>

      {sheetOpen && (
        <div className="modal-overlay" onClick={() => setSheetOpen(false)}>
          <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="modal-handle" />
            <h2 style={{ margin: '0 0 16px', fontSize: 18 }}>Schedule follow-up</h2>
            <CustomTextField label="Contact name *" value={contactName} onChange={(e) => setContactName(e.target.value)} />
            <div style={{ height: 12 }} />
            <CustomTextField label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <div style={{ height: 12 }} />
            <label className="custom-field">
              <span className="custom-field-label">Type</span>
              <select
                className="custom-field-input"
                value={followUpType}
                onChange={(e) => setFollowUpType(e.target.value)}
                style={{ width: '100%' }}
              >
                {FOLLOW_UP_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <div style={{ height: 12 }} />
            <CustomTextField
              label="Scheduled at"
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
            />
            <div style={{ height: 12 }} />
            <CustomTextField label="Notes" multiline rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
            <div style={{ height: 16 }} />
            <AppButton text="Schedule" isLoading={saving} onClick={handleSchedule} />
          </div>
        </div>
      )}

      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
