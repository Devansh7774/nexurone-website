import { colors } from '@/greenvelly/config/colors'
import './StatusBadge.css'

function statusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'new lead':
      return colors.statusNew
    case 'follow-up':
      return colors.statusFollowUp
    case 'site visit done':
      return colors.statusSiteVisit
    case 'not interested':
      return colors.statusNotInterested
    case 'closed / booked':
      return colors.statusClosed
    default:
      return colors.textHint
  }
}

export function StatusBadge({ status }: { status: string }) {
  const color = statusColor(status)
  return (
    <span className="status-badge" style={{ color, borderColor: `${color}4d`, backgroundColor: `${color}1f` }}>
      {status}
    </span>
  )
}
