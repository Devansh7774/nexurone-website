import { Building2, CheckCircle, Circle, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageBackBar } from '@/greenvelly/components/layout/PageBackBar'
import { Toast } from '@/greenvelly/components/Toast'
import { colors } from '@/greenvelly/config/colors'
import { useSelectedSite, useSiteStore } from '@/greenvelly/stores/siteStore'

export function MyProjectsPage() {
  const navigate = useNavigate()
  const sites = useSiteStore((s) => s.sites)
  const selectedId = useSiteStore((s) => s.selectedId)
  const selectSite = useSiteStore((s) => s.selectSite)
  const selectedSite = useSelectedSite()
  const [search, setSearch] = useState('')
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return sites
    return sites.filter((s) => s.name.toLowerCase().includes(q))
  }, [sites, search])

  const handleSelect = (id: string, name: string) => {
    selectSite(id)
    setToast({ msg: `Selected ${name}`, type: 'success' })
  }

  return (
    <div className="page app-shell">
      <PageBackBar title="My Projects" />

      <div className="page-padding">
        <div className="search-wrap">
          <Search size={18} />
          <input
            className="search-field"
            placeholder="Search sites..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <p>No sites found.</p>
            <button type="button" className="chip selected" onClick={() => navigate('/add-site')}>
              Add your first site
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.map((site) => {
              const selected = site.id === selectedId
              return (
                <button
                  key={site.id}
                  type="button"
                  className="list-item"
                  onClick={() => handleSelect(site.id, site.name)}
                >
                  <Building2 size={22} color={colors.primary} />
                  <div style={{ flex: 1, textAlign: 'left' }}>
                    <div style={{ fontWeight: 600 }}>{site.name}</div>
                    <div style={{ fontSize: 12, color: colors.textHint }}>Pipeline: {site.pipelineValue}</div>
                  </div>
                  {selected ? (
                    <CheckCircle size={22} color={colors.primary} />
                  ) : (
                    <Circle size={22} color={colors.textHint} />
                  )}
                </button>
              )
            })}
          </div>
        )}

        {selectedSite.id && (
          <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: colors.textSecondary }}>
            Active site: <strong>{selectedSite.name}</strong>
          </p>
        )}
      </div>

      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
