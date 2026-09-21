import { ExternalLink } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PageBackBar } from '@/greenvelly/components/layout/PageBackBar'
import { resolveUploadsUrl } from '@/greenvelly/config/api'
import { colors } from '@/greenvelly/config/colors'
import type { SiteDocument } from '@/greenvelly/models/site'

export function DocumentViewerPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const doc = (location.state as { document?: SiteDocument } | null)?.document

  if (!doc) {
    return (
      <div className="page app-shell">
        <PageBackBar title="Document" onBack={() => navigate(-1)} />
        <div className="empty-state">Document not found.</div>
      </div>
    )
  }

  const uri = doc.isRemote ? doc.uri : resolveUploadsUrl(doc.uri)
  const isPdf = uri.toLowerCase().includes('.pdf') || doc.kind === 'brochure'
  const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(uri) || doc.kind === 'image'

  return (
    <div className="page app-shell page-white">
      <PageBackBar
        title={doc.title}
        actions={
          <a href={uri} target="_blank" rel="noreferrer" className="icon-btn">
            <ExternalLink size={22} />
          </a>
        }
      />

      <div className="page-padding" style={{ paddingTop: 0 }}>
        {isImage && (
          <img src={uri} alt={doc.title} style={{ width: '100%', borderRadius: 12, border: `1px solid ${colors.border}` }} />
        )}
        {isPdf && !isImage && (
          <iframe
            title={doc.title}
            src={uri}
            style={{ width: '100%', height: 'calc(100vh - 120px)', border: `1px solid ${colors.border}`, borderRadius: 12 }}
          />
        )}
        {!isImage && !isPdf && (
          <div className="empty-state">
            <p>Preview not available for this file type.</p>
            <a href={uri} target="_blank" rel="noreferrer" style={{ fontWeight: 600 }}>
              Open in new tab
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
