import {
  Bell,
  Building2,
  CheckCircle,
  Circle,
  FolderOpen,
  Images,
  LayoutDashboard,
  Users,
  User,
  UserPlus,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { BottomNav, type NavItem } from '@/greenvelly/components/layout/BottomNav'
import { NoSiteEmptyState } from '@/greenvelly/components/widgets/NoSiteEmptyState'
import { SiteHeroCarousel } from '@/greenvelly/components/widgets/SiteHeroCarousel'
import { StatCard } from '@/greenvelly/components/widgets/StatCard'
import { initialsFromName } from '@/greenvelly/utils/initials'
import { useHasRealSites, useSelectedSite, useSiteStore } from '@/greenvelly/stores/siteStore'

const builderNav: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/home' },
  { icon: Users, label: 'Inquiries', path: '/home/inquiries' },
  { icon: Bell, label: 'Follow-ups', path: '/home/follow-ups' },
  { icon: User, label: 'Profile', path: '/home/profile' },
]

export function BuilderTabLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const bootstrap = useSiteStore((s) => s.bootstrapFromApi)

  useEffect(() => {
    bootstrap()
    const onFocus = () => bootstrap()
    window.addEventListener('focus', onFocus)
    return () => window.removeEventListener('focus', onFocus)
  }, [bootstrap])

  const activePath =
    location.pathname === '/home' || location.pathname.startsWith('/home/dashboard')
      ? '/home'
      : location.pathname

  return (
    <div className="app-shell with-nav">
      <Outlet />
      <BottomNav items={builderNav} activePath={activePath} onNavigate={navigate} />
    </div>
  )
}

export function DashboardAppBar() {
  const navigate = useNavigate()
  const hasSite = useHasRealSites()
  const selectedSite = useSelectedSite()
  const sites = useSiteStore((s) => s.sites)
  const selectSite = useSiteStore((s) => s.selectSite)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [])

  return (
    <header className="app-bar" style={{ position: 'sticky' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className="app-logo app-logo-sm">
          <div className="app-logo-mark">SM</div>
        </div>
      </div>
      <div className="app-bar-actions">
        <button
          type="button"
          className="icon-btn"
          style={{ position: 'relative' }}
          onClick={() => navigate('/notifications')}
        >
          <Bell size={22} />
          <span className="notification-dot" />
        </button>
        {hasSite ? (
          <div style={{ position: 'relative' }} ref={menuRef}>
            <button type="button" className="site-avatar" onClick={() => setMenuOpen((o) => !o)}>
              {initialsFromName(selectedSite.name)}
            </button>
            {menuOpen && (
              <div className="dropdown-menu">
                {sites.map((s) => {
                  const selected = s.id === selectedSite.id
                  return (
                    <button
                      key={s.id}
                      type="button"
                      className={`dropdown-item ${selected ? 'selected' : ''}`}
                      onClick={() => {
                        selectSite(s.id)
                        setMenuOpen(false)
                      }}
                    >
                      {selected ? (
                        <CheckCircle size={20} color="var(--primary)" />
                      ) : (
                        <Circle size={20} color="var(--text-hint)" />
                      )}
                      {s.name}
                    </button>
                  )
                })}
                <div className="dropdown-divider" />
                <button
                  type="button"
                  className="dropdown-item"
                  style={{ color: 'var(--primary)', fontWeight: 600 }}
                  onClick={() => {
                    setMenuOpen(false)
                    navigate('/add-site')
                  }}
                >
                  <Building2 size={22} color="var(--primary)" />
                  Add Site
                </button>
              </div>
            )}
          </div>
        ) : (
          <button type="button" className="icon-btn" onClick={() => navigate('/add-site')}>
            <Building2 size={22} color="var(--primary)" />
          </button>
        )}
      </div>
    </header>
  )
}

export function DashboardPage() {
  const navigate = useNavigate()
  const hasSite = useHasRealSites()
  const selectedSite = useSelectedSite()
  const todayCount = useSiteStore((s) => s.todayInquiryCount())
  const documents = useSiteStore((s) => s.documents)
  const photoCount = useSiteStore((s) => s.photoRecords.length)

  return (
    <div className="page">
      <DashboardAppBar />
      {!hasSite ? (
        <NoSiteEmptyState />
      ) : (
        <div className="page-padding">
          <SiteHeroCarousel siteName={selectedSite.name} imageUrls={selectedSite.heroImageUrls} />
          <div style={{ height: 24 }} />
          <div className="grid-2">
            <StatCard label="Today Inquiries" value={String(todayCount)} icon={Users} color="#1E40AF" />
            <StatCard
              label="Add Inquiry"
              value="+"
              icon={UserPlus}
              color="#F59E0B"
              onClick={() => navigate('/add-inquiry')}
            />
          </div>
          <div style={{ height: 12 }} />
          <div className="grid-2">
            <StatCard
              label="Site Documents"
              value={String(documents.length)}
              icon={FolderOpen}
              color="#06B6D4"
              onClick={() => navigate('/site-documents')}
            />
            <StatCard
              label="Site Photos"
              value={String(photoCount)}
              icon={Images}
              color="#10B981"
              onClick={() => navigate('/site-photos')}
            />
          </div>
        </div>
      )}
    </div>
  )
}
