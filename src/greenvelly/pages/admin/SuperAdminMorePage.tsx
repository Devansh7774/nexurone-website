import { ChevronRight, Shield } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { colors } from '@/greenvelly/config/colors'

export function SuperAdminMorePage() {
  const navigate = useNavigate()

  const items = [
    { label: 'Privacy & Security', path: '/privacy-security', icon: Shield, color: colors.success },
  ]

  return (
    <div className="page app-shell">
      <header className="app-bar">
        <h1 className="app-bar-title">More</h1>
      </header>

      <div className="page-padding" style={{ paddingBottom: 80 }}>
        <div className="menu-list">
          {items.map((item) => (
            <button key={item.path} type="button" className="menu-item" onClick={() => navigate(item.path)}>
              <span className="menu-item-icon" style={{ background: `${item.color}1a`, color: item.color }}>
                <item.icon size={20} />
              </span>
              {item.label}
              <ChevronRight size={18} className="menu-item-chevron" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
