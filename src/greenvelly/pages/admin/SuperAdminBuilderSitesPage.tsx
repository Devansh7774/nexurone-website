import { Building2, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { PageBackBar } from '@/greenvelly/components/layout/PageBackBar'
import { colors } from '@/greenvelly/config/colors'
import * as adminService from '@/greenvelly/services/adminService'

export function SuperAdminBuilderSitesPage() {
  const { builderId } = useParams<{ builderId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const builder = (location.state as { builder?: Record<string, unknown> } | null)?.builder
  const builderName = String(builder?.full_name ?? 'Builder')
  const [sites, setSites] = useState<Record<string, unknown>[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!builderId) return
    adminService.getBuilderSites(builderId).then((list) => {
      if (!list) {
        setError('Could not load sites.')
        setSites([])
      } else {
        setSites(list.filter((e) => e && typeof e === 'object') as Record<string, unknown>[])
      }
      setLoading(false)
    })
  }, [builderId])

  return (
    <div className="page app-shell">
      <PageBackBar title={`Sites · ${builderName}`} />

      <div className="page-padding">
        {loading ? (
          <div className="loader-overlay" style={{ position: 'relative', minHeight: 200 }}>
            <div className="loader-spinner" />
          </div>
        ) : error ? (
          <div className="empty-state" style={{ color: colors.error }}>{error}</div>
        ) : sites.length === 0 ? (
          <div className="empty-state">No sites for this builder.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {sites.map((site) => (
              <button
                key={String(site.id)}
                type="button"
                className="list-item"
                onClick={() =>
                  navigate(`/admin/site/${site.id}/dashboard`, {
                    state: { site, builderName },
                  })
                }
              >
                <Building2 size={22} color={colors.primary} />
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ fontWeight: 600 }}>{String(site.name ?? 'Site')}</div>
                  <div style={{ fontSize: 12, color: colors.textHint }}>
                    Pipeline: {String(site.pipeline_value ?? '—')}
                  </div>
                </div>
                <ChevronRight size={18} color={colors.textHint} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
