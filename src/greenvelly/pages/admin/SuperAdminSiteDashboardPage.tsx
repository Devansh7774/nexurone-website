import { FolderOpen, Images, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { PageBackBar } from '@/greenvelly/components/layout/PageBackBar'
import { StatCard } from '@/greenvelly/components/widgets/StatCard'
import * as inquiriesApi from '@/greenvelly/services/inquiriesService'
import * as sitesApi from '@/greenvelly/services/sitesService'

export function SuperAdminSiteDashboardPage() {
  const { siteId } = useParams<{ siteId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const siteState = (location.state as { site?: Record<string, unknown>; builderName?: string } | null)?.site
  const [site, setSite] = useState<Record<string, unknown> | null>(siteState ?? null)
  const [inquiryCount, setInquiryCount] = useState(0)
  const [docCount, setDocCount] = useState(0)
  const [photoCount, setPhotoCount] = useState(0)

  useEffect(() => {
    if (!siteId) return
    if (!site) {
      sitesApi.getSite(siteId).then((s) => {
        if (s) setSite(s)
      })
    }
    Promise.all([
      inquiriesApi.getInquiries(siteId),
      sitesApi.getDocuments(siteId),
      sitesApi.getPhotos(siteId),
    ]).then(([inq, docs, photos]) => {
      setInquiryCount(inq?.length ?? 0)
      setDocCount(docs?.length ?? 0)
      setPhotoCount(photos?.length ?? 0)
    })
  }, [siteId, site])

  const siteName = String(site?.name ?? 'Site')

  return (
    <div className="page app-shell">
      <PageBackBar title={siteName} />

      <div className="page-padding">
        <div className="grid-2">
          <StatCard
            label="Inquiries"
            value={String(inquiryCount)}
            icon={Users}
            color="#1E40AF"
            onClick={() => navigate(`/admin/site/${siteId}/inquiries`, { state: { siteName } })}
          />
          <StatCard
            label="Documents"
            value={String(docCount)}
            icon={FolderOpen}
            color="#06B6D4"
            onClick={() => navigate(`/admin/site/${siteId}/documents`, { state: { siteName } })}
          />
        </div>
        <div style={{ height: 12 }} />
        <StatCard
          label="Photos"
          value={String(photoCount)}
          icon={Images}
          color="#10B981"
          onClick={() => navigate(`/admin/site/${siteId}/photos`, { state: { siteName } })}
        />
      </div>
    </div>
  )
}
