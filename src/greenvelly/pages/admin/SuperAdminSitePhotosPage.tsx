import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { PageBackBar } from '@/greenvelly/components/layout/PageBackBar'
import { resolveUploadsUrl } from '@/greenvelly/config/api'
import { sitePhotoFromApi } from '@/greenvelly/models/site'
import * as sitesApi from '@/greenvelly/services/sitesService'

export function SuperAdminSitePhotosPage() {
  const { siteId } = useParams<{ siteId: string }>()
  const location = useLocation()
  const siteName = (location.state as { siteName?: string } | null)?.siteName ?? 'Site'
  const [photos, setPhotos] = useState<ReturnType<typeof sitePhotoFromApi>[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!siteId) return
    sitesApi.getPhotos(siteId).then((list) => {
      setPhotos((list ?? []).map((e) => sitePhotoFromApi(e as Record<string, unknown>)))
      setLoading(false)
    })
  }, [siteId])

  return (
    <div className="page app-shell">
      <PageBackBar title={`Photos · ${siteName}`} />

      <div className="page-padding">
        {loading ? (
          <div className="loader-overlay" style={{ position: 'relative', minHeight: 200 }}>
            <div className="loader-spinner" />
          </div>
        ) : photos.length === 0 ? (
          <div className="empty-state">No photos for this site.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {photos.map((photo) => (
              <div key={photo.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <img
                  src={resolveUploadsUrl(photo.url)}
                  alt=""
                  style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
