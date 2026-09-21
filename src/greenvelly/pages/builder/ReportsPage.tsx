import { useEffect, useState } from 'react'
import { PageBackBar } from '@/greenvelly/components/layout/PageBackBar'
import { SectionHeader } from '@/greenvelly/components/widgets/SectionHeader'
import { StatCard } from '@/greenvelly/components/widgets/StatCard'
import { colors } from '@/greenvelly/config/colors'
import * as reportsService from '@/greenvelly/services/reportsService'
import { TrendingUp, Users, CheckCircle, Phone } from 'lucide-react'

const PERIODS = ['Today', 'This Week', 'This Month', 'Last 3 Months']

export function ReportsPage() {
  const [period, setPeriod] = useState('This Month')
  const [data, setData] = useState<Record<string, unknown> | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    reportsService.fetchReports(period).then((d) => {
      setData(d)
      setLoading(false)
    })
  }, [period])

  const summary = (data?.summary as Record<string, unknown>) ?? {}
  const monthly = ((data?.monthly_inquiries as unknown[]) ?? []).filter((e) => e && typeof e === 'object') as Record<string, unknown>[]
  const sources = ((data?.lead_sources as unknown[]) ?? []).filter((e) => e && typeof e === 'object') as Record<string, unknown>[]
  const sites = ((data?.site_performance as unknown[]) ?? []).filter((e) => e && typeof e === 'object') as Record<string, unknown>[]
  const funnel = ((data?.conversion_funnel as unknown[]) ?? []).filter((e) => e && typeof e === 'object') as Record<string, unknown>[]

  const trendLabel = (pct: unknown) => {
    const n = Number(pct)
    if (Number.isNaN(n)) return '—'
    if (n > 0) return `+${n}%`
    if (n < 0) return `${n}%`
    return '0%'
  }

  return (
    <div className="page app-shell">
      <PageBackBar title="Reports" />

      <div className="page-padding">
        <div className="chip-row" style={{ marginBottom: 20 }}>
          {PERIODS.map((p) => (
            <button
              key={p}
              type="button"
              className={`chip ${period === p ? 'selected' : ''}`}
              onClick={() => setPeriod(p)}
            >
              {p}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loader-overlay" style={{ position: 'relative', minHeight: 200 }}>
            <div className="loader-spinner" />
          </div>
        ) : !data ? (
          <div className="empty-state">Could not load reports. Check your connection.</div>
        ) : (
          <>
            <div className="grid-2">
              <StatCard label="Total Inquiries" value={String(summary.total_inquiries ?? '0')} icon={Users} color={colors.primary} />
              <StatCard label="Closed" value={String(summary.closed ?? '0')} icon={CheckCircle} color={colors.success} />
            </div>
            <div style={{ height: 12 }} />
            <div className="grid-2">
              <StatCard label="Follow-ups" value={String(summary.follow_ups ?? '0')} icon={Phone} color={colors.warning} />
              <StatCard label="Conversion" value={trendLabel(summary.conversion_pct)} icon={TrendingUp} color={colors.info} />
            </div>

            {monthly.length > 0 && (
              <>
                <SectionHeader title="Monthly inquiries" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {monthly.map((m, i) => (
                    <div key={i} className="list-item" style={{ cursor: 'default' }}>
                      <span style={{ flex: 1 }}>{String(m.month ?? m.label ?? '—')}</span>
                      <strong>{String(m.count ?? m.value ?? 0)}</strong>
                    </div>
                  ))}
                </div>
              </>
            )}

            {sources.length > 0 && (
              <>
                <SectionHeader title="Lead sources" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {sources.map((s, i) => (
                    <div key={i} className="list-item" style={{ cursor: 'default' }}>
                      <span style={{ flex: 1 }}>{String(s.source ?? s.name ?? '—')}</span>
                      <strong>{String(s.count ?? 0)}</strong>
                    </div>
                  ))}
                </div>
              </>
            )}

            {sites.length > 0 && (
              <>
                <SectionHeader title="Site performance" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {sites.map((s, i) => (
                    <div key={i} className="list-item" style={{ cursor: 'default' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600 }}>{String(s.site_name ?? s.name ?? '—')}</div>
                        <div style={{ fontSize: 12, color: colors.textHint }}>
                          {String(s.inquiries ?? 0)} inquiries · {String(s.closed ?? 0)} closed
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {funnel.length > 0 && (
              <>
                <SectionHeader title="Conversion funnel" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {funnel.map((f, i) => (
                    <div key={i} className="list-item" style={{ cursor: 'default' }}>
                      <span style={{ flex: 1 }}>{String(f.stage ?? f.status ?? '—')}</span>
                      <strong>{String(f.count ?? 0)}</strong>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
