import { Building2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './NoSiteEmptyState.css'

export function NoSiteEmptyState() {
  const navigate = useNavigate()

  return (
    <div className="no-site-empty">
      <div className="no-site-icon">
        <Building2 size={44} color="var(--primary)" />
      </div>
      <h2 className="no-site-title">Add your first site</h2>
      <p className="no-site-desc">
        Sites organize inquiries, documents, photos, and follow-ups. Create a site to unlock the
        dashboard and the rest of the app.
      </p>
      <button type="button" className="no-site-btn" onClick={() => navigate('/add-site')}>
        <Building2 size={20} />
        Add Site
      </button>
    </div>
  )
}
