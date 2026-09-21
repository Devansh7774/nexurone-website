import { MoreHorizontal, User, Users } from 'lucide-react'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { BottomNav, type NavItem } from '@/greenvelly/components/layout/BottomNav'
import { useSiteStore } from '@/greenvelly/stores/siteStore'

const adminNav: NavItem[] = [
  { icon: Users, label: 'Accounts', path: '/admin' },
  { icon: User, label: 'Profile', path: '/admin/profile' },
  { icon: MoreHorizontal, label: 'More', path: '/admin/more' },
]

export function AdminTabLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const bootstrap = useSiteStore((s) => s.bootstrapFromApi)

  useEffect(() => {
    bootstrap()
  }, [bootstrap])

  const activePath =
    location.pathname === '/admin' || location.pathname.startsWith('/admin/accounts')
      ? '/admin'
      : location.pathname

  return (
    <div className="app-shell with-nav">
      <Outlet />
      <BottomNav items={adminNav} activePath={activePath} onNavigate={navigate} />
    </div>
  )
}
