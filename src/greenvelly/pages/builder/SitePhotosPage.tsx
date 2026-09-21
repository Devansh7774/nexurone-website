import { Trash2, Upload } from 'lucide-react'
import { useState } from 'react'
import { PageBackBar } from '@/greenvelly/components/layout/PageBackBar'
import { Toast } from '@/greenvelly/components/Toast'
import { NoSiteEmptyState } from '@/greenvelly/components/widgets/NoSiteEmptyState'
import { resolveUploadsUrl } from '@/greenvelly/config/api'
import { colors } from '@/greenvelly/config/colors'
import { useHasRealSites, useSelectedSite, useSiteStore } from '@/greenvelly/stores/siteStore'

export function SitePhotosPage() {
  const hasSite = useHasRealSites()
  const selectedSite = useSelectedSite()
  const photoRecords = useSiteStore((s) => s.photoRecords)
  const addPhoto = useSiteStore((s) => s.addPhoto)
  const removePhotoAt = useSiteStore((s) => s.removePhotoAt)
  const [busy, setBusy] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  const handleUpload = async (file: File | undefined) => {
    if (!file) return
    setBusy(true)
    try {
      const ok = await addPhoto(selectedSite.id, file)
      setToast({ msg: ok ? 'Photo uploaded.' : 'Upload failed.', type: ok ? 'success' : 'error' })
    } finally {
      setBusy(false)
    }
  }

  const handleDelete = async (index: number) => {
    if (!window.confirm('Delete this photo?')) return
    await removePhotoAt(selectedSite.id, index)
    setToast({ msg: 'Photo deleted.', type: 'success' })
  }

  if (!hasSite) {
    return (
      <div className="page app-shell">
        <PageBackBar title="Site Photos" />
        <NoSiteEmptyState />
      </div>
    )
  }

  return (
    <div className="page app-shell">
      <PageBackBar title={`Photos · ${selectedSite.name}`} />

      <div className="page-padding">
        <label style={{ display: 'block', marginBottom: 16 }}>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => handleUpload(e.target.files?.[0])}
          />
          <span
            className="list-item"
            style={{ justifyContent: 'center', color: colors.primary, fontWeight: 600 }}
          >
            <Upload size={20} /> Upload photo
          </span>
        </label>

        {photoRecords.length === 0 ? (
          <div className="empty-state">No photos yet. Upload site images for the carousel.</div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 12,
            }}
          >
            {photoRecords.map((photo, index) => (
              <div key={photo.id} className="card" style={{ padding: 0, overflow: 'hidden', position: 'relative' }}>
                <img
                  src={resolveUploadsUrl(photo.url)}
                  alt=""
                  style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }}
                />
                <button
                  type="button"
                  className="icon-btn"
                  style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    background: 'rgba(255,255,255,0.9)',
                    borderRadius: 8,
                  }}
                  onClick={() => handleDelete(index)}
                >
                  <Trash2 size={18} color={colors.error} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {busy && (
        <div className="loader-overlay">
          <div className="loader-spinner" />
        </div>
      )}

      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
