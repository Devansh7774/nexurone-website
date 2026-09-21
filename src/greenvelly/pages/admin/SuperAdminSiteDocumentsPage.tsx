import { ExternalLink, FileText } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { PageBackBar } from '@/greenvelly/components/layout/PageBackBar'
import { colors } from '@/greenvelly/config/colors'
import { siteDocumentFromApi } from '@/greenvelly/models/site'
import * as sitesApi from '@/greenvelly/services/sitesService'

export function SuperAdminSiteDocumentsPage() {
  const { siteId } = useParams<{ siteId: string }>()
  const location = useLocation()
  const siteName = (location.state as { siteName?: string } | null)?.siteName ?? 'Site'
  const [docs, setDocs] = useState<ReturnType<typeof siteDocumentFromApi>[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!siteId) return
    sitesApi.getDocuments(siteId).then((list) => {
      setDocs((list ?? []).map((e) => siteDocumentFromApi(e as Record<string, unknown>)))
      setLoading(false)
    })
  }, [siteId])

  return (
    <div className="page app-shell">
      <PageBackBar title={`Documents · ${siteName}`} />

      <div className="page-padding">
        {loading ? (
          <div className="loader-overlay" style={{ position: 'relative', minHeight: 200 }}>
            <div className="loader-spinner" />
          </div>
        ) : docs.length === 0 ? (
          <div className="empty-state">No documents for this site.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {docs.map((doc) => (
              <div key={doc.id} className="list-item" style={{ cursor: 'default' }}>
                <FileText size={22} color={colors.primary} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{doc.title}</div>
                  <div style={{ fontSize: 12, color: colors.textHint }}>{doc.kind}</div>
                </div>
                {doc.isRemote && (
                  <a href={doc.uri} target="_blank" rel="noreferrer" className="icon-btn">
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
