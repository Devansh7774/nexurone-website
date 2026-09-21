import {
  BarChart3,
  Bell,
  ChevronRight,
  FolderKanban,
  GitBranch,
  LogOut,
  Pencil,
  Shield,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Toast } from '@/greenvelly/components/Toast'
import { currentUserIsAdmin } from '@/greenvelly/config/api'
import { colors } from '@/greenvelly/config/colors'
import * as authService from '@/greenvelly/services/authService'
import { useFollowUpStore } from '@/greenvelly/stores/followUpStore'
import { useSiteStore } from '@/greenvelly/stores/siteStore'
import { initialsFromName } from '@/greenvelly/utils/initials'
import { forceLocalLogout } from '@/greenvelly/utils/sessionNavigation'
import { getUser } from '@/greenvelly/utils/storage'

export function ProfilePage() {
  const navigate = useNavigate()
  const inquiries = useSiteStore((s) => s.inquiries)
  const sites = useSiteStore((s) => s.sites)
  const today = useFollowUpStore((s) => s.today)
  const [user, setUser] = useState<Record<string, unknown>>(() => getUser() ?? {})
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    setLoading(true)
    authService
      .fetchProfile()
      .then((u) => {
        if (u) setUser(u)
      })
      .finally(() => setLoading(false))
  }, [])

  const isAdmin = currentUserIsAdmin() || String(user.role ?? '').toLowerCase() === 'admin'
  const name = String(user.full_name ?? '').trim() || (isAdmin ? 'Admin' : 'Builder')
  const company = String(user.company_name ?? '').trim()
  const closedCount = inquiries.filter((i) => String(i.status) === 'Closed / Booked').length
  const pendingFollowUps = today.filter((f) => !f.done).length

  const handleSignOut = async () => {
    await authService.logout()
    await forceLocalLogout(navigate)
  }

  const menuItems = [
    { icon: BarChart3, label: 'Reports', color: colors.primary, path: '/reports' },
    { icon: GitBranch, label: 'Lead Pipeline', color: colors.statusSiteVisit, path: '/pipeline' },
    { icon: FolderKanban, label: 'My Projects', color: colors.info, path: '/my-projects' },
    { icon: Bell, label: 'Notifications', color: colors.warning, path: '/notifications' },
    { icon: Shield, label: 'Privacy & Security', color: colors.success, path: '/privacy-security' },
  ]

  return (
    <div className="page app-shell">
      <div className="profile-header">
        <div className="profile-avatar">
          {initialsFromName(name)}
          <button
            type="button"
            className="profile-edit-badge"
            aria-label="Edit profile"
            onClick={() => navigate('/edit-profile')}
          >
            <Pencil size={14} color="#fff" />
          </button>
        </div>
        <h2 style={{ margin: '8px 0 0', fontSize: 22, fontWeight: 700 }}>{name}</h2>
        {company && <p style={{ margin: '4px 0 0', opacity: 0.85, fontSize: 14 }}>{company}</p>}
        <span className={`profile-badge ${isAdmin ? 'admin' : 'builder'}`}>
          {isAdmin ? 'Super Admin' : 'Builder Account'}
        </span>
      </div>

      <div className="stats-row">
        <div className="stat-mini">
          <div className="stat-mini-value">{sites.length}</div>
          <div className="stat-mini-label">Sites</div>
        </div>
        <div className="stat-mini">
          <div className="stat-mini-value">{inquiries.length}</div>
          <div className="stat-mini-label">Inquiries</div>
        </div>
        <div className="stat-mini">
          <div className="stat-mini-value">{closedCount}</div>
          <div className="stat-mini-label">Closed</div>
        </div>
        <div className="stat-mini">
          <div className="stat-mini-value">{pendingFollowUps}</div>
          <div className="stat-mini-label">Follow-ups</div>
        </div>
      </div>

      <div className="page-padding" style={{ paddingTop: 24, paddingBottom: 80 }}>
        <p className="section-title" style={{ marginTop: 0 }}>
          Menu
        </p>
        <div className="menu-list">
          {menuItems.map((item) => (
            <button
              key={item.path}
              type="button"
              className="menu-item"
              onClick={() => navigate(item.path)}
            >
              <span className="menu-item-icon" style={{ background: `${item.color}1a`, color: item.color }}>
                <item.icon size={20} />
              </span>
              {item.label}
              <ChevronRight size={18} className="menu-item-chevron" />
            </button>
          ))}
          <button type="button" className="menu-item" onClick={handleSignOut}>
            <span className="menu-item-icon" style={{ background: colors.errorLight, color: colors.error }}>
              <LogOut size={20} />
            </span>
            Sign out
            <ChevronRight size={18} className="menu-item-chevron" />
          </button>
        </div>

        {loading && (
          <p style={{ textAlign: 'center', color: colors.textHint, marginTop: 16, fontSize: 13 }}>
            Refreshing profile…
          </p>
        )}
      </div>

      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
