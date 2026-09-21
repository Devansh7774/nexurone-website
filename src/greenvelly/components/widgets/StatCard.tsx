import type { LucideIcon } from 'lucide-react'
import { colors } from '@/greenvelly/config/colors'
import './StatCard.css'

interface StatCardProps {
  label: string
  value: string
  icon: LucideIcon
  color: string
  trend?: string | null
  onClick?: () => void
}

export function StatCard({ label, value, icon: Icon, color, onClick }: StatCardProps) {
  const card = (
    <div className="stat-card">
      <div className="stat-card-icon" style={{ backgroundColor: `${color}1a` }}>
        <Icon size={22} color={color} />
      </div>
      <div className="stat-card-value">{value}</div>
      <div className="stat-card-label">{label}</div>
    </div>
  )

  if (!onClick) return card
  return (
    <button type="button" className="stat-card-button" onClick={onClick}>
      {card}
    </button>
  )
}

export { colors as statColors }
