import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { PageBackBar } from '@/greenvelly/components/layout/PageBackBar'
import { StatusBadge } from '@/greenvelly/components/widgets/StatusBadge'
import { colors } from '@/greenvelly/config/colors'
import * as inquiriesApi from '@/greenvelly/services/inquiriesService'
import { normalizeInquiry } from '@/greenvelly/utils/exportInquiries'

export function SuperAdminInquiryDataPage() {
  const { siteId } = useParams<{ siteId: string }>()
  const location = useLocation()
  const siteName = (location.state as { siteName?: string } | null)?.siteName ?? 'Site'
  const [rows, setRows] = useState<ReturnType<typeof normalizeInquiry>[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!siteId) return
    inquiriesApi.getInquiries(siteId).then((list) => {
      setRows((list ?? []).map((e) => normalizeInquiry(e as Record<string, unknown>)))
      setLoading(false)
    })
  }, [siteId])

  return (
    <div className="page app-shell">
      <PageBackBar title={`Inquiries · ${siteName}`} />

      <div className="page-padding">
        {loading ? (
          <div className="loader-overlay" style={{ position: 'relative', minHeight: 200 }}>
            <div className="loader-spinner" />
          </div>
        ) : rows.length === 0 ? (
          <div className="empty-state">No inquiries for this site.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {rows.map((row) => (
              <div key={row.id || row.phone} className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 600 }}>{row.name}</span>
                  <StatusBadge status={row.status} />
                </div>
                <div style={{ fontSize: 13, color: colors.textSecondary, marginTop: 6 }}>
                  {row.date} · {row.phone}
                </div>
                <div style={{ fontSize: 12, color: colors.textHint, marginTop: 4 }}>
                  {row.requirement} · {row.budget}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
