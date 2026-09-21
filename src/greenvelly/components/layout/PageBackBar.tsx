import { ArrowLeft } from 'lucide-react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface PageBackBarProps {
  title: string
  onBack?: () => void
  actions?: ReactNode
}

export function PageBackBar({ title, onBack, actions }: PageBackBarProps) {
  const navigate = useNavigate()
  return (
    <header className="app-bar">
      <button type="button" className="app-bar-back" onClick={onBack ?? (() => navigate(-1))}>
        <ArrowLeft size={22} />
      </button>
      <h1 className="app-bar-title">{title}</h1>
      {actions ?? <div style={{ width: 40 }} />}
    </header>
  )
}
