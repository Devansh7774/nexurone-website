import { ExternalLink, FileText, Link2, Trash2, Upload } from 'lucide-react'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageBackBar } from '@/greenvelly/components/layout/PageBackBar'
import { Toast } from '@/greenvelly/components/Toast'
import { AppButton } from '@/greenvelly/components/widgets/AppButton'
import { CustomTextField } from '@/greenvelly/components/widgets/CustomTextField'
import { NoSiteEmptyState } from '@/greenvelly/components/widgets/NoSiteEmptyState'
import { colors } from '@/greenvelly/config/colors'
import type { SiteDocument } from '@/greenvelly/models/site'
import { useHasRealSites, useSelectedSite, useSiteStore } from '@/greenvelly/stores/siteStore'

export function SiteDocumentsPage() {
  const navigate = useNavigate()
  const hasSite = useHasRealSites()
  const selectedSite = useSelectedSite()
  const documents = useSiteStore((s) => s.documents)
  const addDocumentLink = useSiteStore((s) => s.addDocumentLink)
  const uploadDocument = useSiteStore((s) => s.uploadDocument)
  const deleteDocument = useSiteStore((s) => s.deleteDocument)
  const fileRef = useRef<HTMLInputElement>(null)
  const [linkOpen, setLinkOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [busy, setBusy] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  const openDoc = (doc: SiteDocument) => {
    navigate('/document-viewer', { state: { document: doc } })
  }

  const handleAddLink = async () => {
    const u = url.trim()
    if (!u.startsWith('http://') && !u.startsWith('https://')) {
      setToast({ msg: 'Enter a valid http(s) URL.', type: 'error' })
      return
    }
    setBusy(true)
    try {
      await addDocumentLink(selectedSite.id, title, u)
      setLinkOpen(false)
      setTitle('')
      setUrl('')
      setToast({ msg: 'Link added.', type: 'success' })
    } finally {
      setBusy(false)
    }
  }

  const handleUpload = async (file: File | undefined) => {
    if (!file) return
    setBusy(true)
    try {
      const ok = await uploadDocument(selectedSite.id, file, file.name)
      setToast({
        msg: ok ? 'Document uploaded.' : 'Upload failed.',
        type: ok ? 'success' : 'error',
      })
    } finally {
      setBusy(false)
    }
  }

  const handleDelete = async (doc: SiteDocument) => {
    if (!window.confirm(`Delete "${doc.title}"?`)) return
    await deleteDocument(selectedSite.id, doc.id)
    setToast({ msg: 'Document deleted.', type: 'success' })
  }

  if (!hasSite) {
    return (
      <div className="page app-shell">
        <PageBackBar title="Site Documents" />
        <NoSiteEmptyState />
      </div>
    )
  }

  return (
    <div className="page app-shell">
      <PageBackBar
        title={`Documents · ${selectedSite.name}`}
        actions={
          <button type="button" className="icon-btn" onClick={() => setLinkOpen(true)}>
            <Link2 size={22} />
          </button>
        }
      />

      <div className="page-padding">
        <input ref={fileRef} type="file" style={{ display: 'none' }} onChange={(e) => handleUpload(e.target.files?.[0])} />
        <button
          type="button"
          className="list-item"
          style={{ justifyContent: 'center', color: colors.primary, fontWeight: 600, width: '100%', marginBottom: 16 }}
          onClick={() => fileRef.current?.click()}
        >
          <Upload size={20} /> Upload file
        </button>

        {documents.length === 0 ? (
          <div className="empty-state">No documents yet. Add a link or upload a file.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {documents.map((doc) => (
              <div key={doc.id} className="list-item" style={{ cursor: 'default' }}>
                <FileText size={22} color={colors.primary} />
                <button
                  type="button"
                  style={{ flex: 1, background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', font: 'inherit' }}
                  onClick={() => openDoc(doc)}
                >
                  <div style={{ fontWeight: 600 }}>{doc.title}</div>
                  <div style={{ fontSize: 12, color: colors.textHint }}>{doc.kind}</div>
                </button>
                {doc.isRemote && (
                  <a href={doc.uri} target="_blank" rel="noreferrer" className="icon-btn">
                    <ExternalLink size={18} />
                  </a>
                )}
                <button type="button" className="icon-btn" onClick={() => handleDelete(doc)}>
                  <Trash2 size={18} color={colors.error} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {linkOpen && (
        <div className="modal-overlay" onClick={() => setLinkOpen(false)}>
          <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="modal-handle" />
            <h2 style={{ margin: '0 0 16px' }}>Add document link</h2>
            <CustomTextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <div style={{ height: 12 }} />
            <CustomTextField label="URL" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." />
            <div style={{ height: 16 }} />
            <AppButton text="Add link" isLoading={busy} onClick={handleAddLink} />
          </div>
        </div>
      )}

      {busy && (
        <div className="loader-overlay">
          <div className="loader-spinner" />
        </div>
      )}

      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
