import { useEffect } from 'react'

export function useToast(message: string | null, onClear?: () => void, duration = 3000) {
  useEffect(() => {
    if (!message) return
    const t = setTimeout(() => onClear?.(), duration)
    return () => clearTimeout(t)
  }, [message, onClear, duration])
}

export function Toast({
  message,
  type = 'success',
  onClose,
}: {
  message: string
  type?: 'success' | 'error'
  onClose?: () => void
}) {
  return (
    <div className={`toast toast-${type}`} onClick={onClose} role="status">
      {message}
    </div>
  )
}
