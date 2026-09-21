import './SectionHeader.css'

export function SectionHeader({
  title,
  actionLabel,
  onAction,
}: {
  title: string
  actionLabel?: string
  onAction?: () => void
}) {
  return (
    <div className="section-header">
      <h3 className="section-header-title">{title}</h3>
      {actionLabel && onAction && (
        <button type="button" className="section-header-action" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  )
}
