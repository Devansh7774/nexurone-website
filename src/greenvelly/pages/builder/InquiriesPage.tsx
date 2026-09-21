import { Filter, Plus, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Toast } from '@/greenvelly/components/Toast'
import { NoSiteEmptyState } from '@/greenvelly/components/widgets/NoSiteEmptyState'
import { StatusBadge } from '@/greenvelly/components/widgets/StatusBadge'
import { colors } from '@/greenvelly/config/colors'
import { projectMatchesSiteLabel, useHasRealSites, useSelectedSite, useSiteStore } from '@/greenvelly/stores/siteStore'
import {
  exportInquiriesToExcel,
  exportInquiriesToPdf,
  filterInquiriesByPeriod,
  filterInquiriesBySearch,
  filterInquiriesByTab,
  normalizeInquiry,
  type InquiryPeriodFilter,
  type InquiryRow,
} from '@/greenvelly/utils/exportInquiries'

const TABS = ['All', 'New Lead', 'Follow-up', 'Site Visit Done', 'Closed'] as const
const PERIODS: { key: InquiryPeriodFilter; label: string }[] = [
  { key: 'week', label: 'Week' },
  { key: 'month', label: 'Month' },
  { key: 'year', label: 'Year' },
]

export function InquiriesPage() {
  const navigate = useNavigate()
  const hasSite = useHasRealSites()
  const selectedSite = useSelectedSite()
  const inquiries = useSiteStore((s) => s.inquiries)
  const [tabIndex, setTabIndex] = useState(0)
  const [search, setSearch] = useState('')
  const [period, setPeriod] = useState<InquiryPeriodFilter>('month')
  const [filterOpen, setFilterOpen] = useState(false)
  const [modalPeriod, setModalPeriod] = useState<InquiryPeriodFilter>('month')
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  const siteRows = useMemo(() => {
    const sid = selectedSite.id
    if (!sid) return []
    return inquiries
      .filter((i) => {
        const iSid = String(i.site_id ?? '').trim()
        if (iSid) return iSid === sid
        return projectMatchesSiteLabel(String(i.project ?? ''), selectedSite.name)
      })
      .map((i) => normalizeInquiry(i))
  }, [inquiries, selectedSite])

  const visibleRows = useMemo(() => {
    let rows = filterInquiriesByPeriod(siteRows, period)
    rows = filterInquiriesByTab(rows, tabIndex)
    rows = filterInquiriesBySearch(rows, search)
    return rows
  }, [siteRows, period, tabIndex, search])

  const modalVisible = useMemo(() => {
    let rows = filterInquiriesByPeriod(siteRows, modalPeriod)
    rows = filterInquiriesByTab(rows, tabIndex)
    rows = filterInquiriesBySearch(rows, search)
    return rows
  }, [siteRows, modalPeriod, tabIndex, search])

  const runExport = (fn: (rows: InquiryRow[]) => void) => {
    try {
      fn(modalVisible)
      setToast({ msg: 'Export ready — file downloaded.', type: 'success' })
      setFilterOpen(false)
    } catch (e) {
      setToast({ msg: `Export failed: ${e}`, type: 'error' })
    }
  }

  if (!hasSite) {
    return (
      <div className="page app-shell">
        <header className="app-bar">
          <h1 className="app-bar-title">Inquiries</h1>
        </header>
        <NoSiteEmptyState />
      </div>
    )
  }

  return (
    <div className="page app-shell">
      <header className="app-bar">
        <h1 className="app-bar-title">Inquiries · {selectedSite.name}</h1>
        <div className="app-bar-actions">
          <button
            type="button"
            className="icon-btn"
            aria-label="Filters and export"
            onClick={() => {
              setModalPeriod(period)
              setFilterOpen(true)
            }}
          >
            <Filter size={22} />
          </button>
        </div>
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

      <div className="page-padding" style={{ paddingTop: 12, paddingBottom: 80 }}>
        <div className="search-wrap">
          <Search size={18} />
          <input
            className="search-field"
            placeholder="Search by name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <p style={{ fontSize: 12, color: colors.textHint, margin: '0 0 12px' }}>
          Showing: {PERIODS.find((p) => p.key === period)?.label ?? 'Month'}
        </p>

        {visibleRows.length === 0 ? (
          <div className="empty-state">No inquiries match your filters.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {visibleRows.map((inquiry) => (
              <button
                key={inquiry.id || inquiry.phone + inquiry.name}
                type="button"
                className="list-item"
                onClick={() => navigate(`/inquiry/${inquiry.id}`, { state: { inquiry: inquiry.raw } })}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: colors.primarySurface,
                    color: colors.primary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {inquiry.name.charAt(0).toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 600, fontSize: 15 }}>{inquiry.name}</span>
                    <StatusBadge status={inquiry.status} />
                  </div>
                  <div style={{ fontSize: 13, color: colors.textSecondary, marginTop: 4 }}>
                    {inquiry.phone} · {inquiry.date}
                  </div>
                  {inquiry.requirement && (
                    <div style={{ fontSize: 12, color: colors.textHint, marginTop: 2 }}>
                      {inquiry.requirement} · {inquiry.budget}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <button type="button" className="fab" aria-label="Add inquiry" onClick={() => navigate('/add-inquiry')}>
        <Plus size={24} />
      </button>

      {filterOpen && (
        <div className="modal-overlay" onClick={() => setFilterOpen(false)}>
          <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="modal-handle" />
            <h2 style={{ margin: '0 0 4px', fontSize: 18 }}>Filters & export</h2>
            <p style={{ margin: '0 0 16px', fontSize: 13, color: colors.textSecondary }}>
              {modalVisible.length} inquir{modalVisible.length === 1 ? 'y' : 'ies'} match (current tab & search)
            </p>
            <p className="section-title" style={{ marginTop: 0 }}>
              Date range
            </p>
            <div className="chip-row">
              {PERIODS.map((p) => (
                <button
                  key={p.key}
                  type="button"
                  className={`chip ${modalPeriod === p.key ? 'selected' : ''}`}
                  onClick={() => setModalPeriod(p.key)}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <div style={{ height: 20 }} />
            <button
              type="button"
              className="list-item"
              style={{ marginBottom: 8 }}
              onClick={() => {
                setPeriod(modalPeriod)
                runExport(exportInquiriesToPdf)
              }}
            >
              Export as PDF
            </button>
            <button
              type="button"
              className="list-item"
              onClick={() => {
                setPeriod(modalPeriod)
                runExport(exportInquiriesToExcel)
              }}
            >
              Export as Excel
            </button>
            <button
              type="button"
              className="list-item"
              style={{ marginTop: 8, justifyContent: 'center', color: colors.primary, fontWeight: 600 }}
              onClick={() => {
                setPeriod(modalPeriod)
                setFilterOpen(false)
              }}
            >
              Apply period filter
            </button>
          </div>
        </div>
      )}

      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
