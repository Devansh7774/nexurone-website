import type { LucideIcon } from 'lucide-react'
import './BottomNav.css'

export interface NavItem {
  icon: LucideIcon
  label: string
  path: string
}

interface BottomNavProps {
  items: NavItem[]
  activePath: string
  onNavigate: (path: string) => void
}

export function BottomNav({ items, activePath, onNavigate }: BottomNavProps) {
  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-inner">
        {items.map((item) => {
          const selected = activePath === item.path
          const Icon = item.icon
          return (
            <button
              key={item.path}
              type="button"
              className={`bottom-nav-item ${selected ? 'selected' : ''}`}
              onClick={() => onNavigate(item.path)}
            >
              <Icon size={22} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
