import { format, parseISO, isValid } from 'date-fns'
import { useEffect, useState } from 'react'
import { PageBackBar } from '@/greenvelly/components/layout/PageBackBar'
import { colors } from '@/greenvelly/config/colors'
import * as notificationsService from '@/greenvelly/services/notificationsService'

export function NotificationsPage() {
  const [items, setItems] = useState<Record<string, unknown>[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    notificationsService.fetchNotifications().then((list) => {
      setItems(list)
      setLoading(false)
    })
  }, [])

  const formatWhen = (raw: unknown) => {
    if (typeof raw !== 'string') return ''
    const dt = parseISO(raw)
    if (isValid(dt)) return format(dt, 'd MMM yyyy, h:mm a')
    return raw
  }

  return (
    <div className="page app-shell">
      <PageBackBar title="Notifications" />

      <div className="page-padding">
        {loading ? (
          <div className="loader-overlay" style={{ position: 'relative', minHeight: 200 }}>
            <div className="loader-spinner" />
          </div>
        ) : items.length === 0 ? (
          <div className="empty-state">No notifications yet.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {items.map((n, i) => (
              <div key={String(n.id ?? i)} className="card">
                <div style={{ fontWeight: 600, fontSize: 15 }}>{String(n.title ?? 'Notification')}</div>
                <div style={{ fontSize: 14, color: colors.textSecondary, marginTop: 6 }}>
                  {String(n.body ?? n.message ?? '')}
                </div>
                <div style={{ fontSize: 12, color: colors.textHint, marginTop: 8 }}>
                  {formatWhen(n.created_at ?? n.sent_at)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
