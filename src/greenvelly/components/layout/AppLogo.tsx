import { APP_NAME } from '@/greenvelly/config/constants'
import './AppLogo.css'

export function AppLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  return (
    <div className={`app-logo app-logo-${size}`}>
      <div className="app-logo-mark">SM</div>
      {size !== 'sm' && <span className="app-logo-text">{APP_NAME}</span>}
    </div>
  )
}
