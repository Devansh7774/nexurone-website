import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { APP_NAME, APP_TAGLINE } from '@/greenvelly/config/constants'
import { AppLogo } from '@/greenvelly/components/layout/AppLogo'
import { hasStoredSession, navigateToLoggedInHome } from '@/greenvelly/utils/sessionNavigation'
import { isOnboardingCompleted } from '@/greenvelly/utils/storage'

export function SplashPage() {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 100)
    const t2 = setTimeout(async () => {
      if (hasStoredSession()) {
        await navigateToLoggedInHome(navigate)
        return
      }
      if (isOnboardingCompleted()) {
        navigate('/login', { replace: true })
      } else {
        navigate('/onboarding', { replace: true })
      }
    }, 2500)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [navigate])

  return (
    <div className="splash-page" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.5s' }}>
      <AppLogo size="lg" />
      <h1 className="splash-title">{APP_NAME}</h1>
      <p className="splash-tagline">{APP_TAGLINE}</p>
      <div className="loader-spinner" style={{ marginTop: 32, width: 36, height: 36 }} />
      <style>{`
        .splash-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: var(--primary-gradient);
          color: #fff;
          padding: 24px;
        }
        .splash-title {
          font-size: 32px;
          font-weight: 800;
          margin: 24px 0 8px;
          letter-spacing: -0.5px;
        }
        .splash-tagline {
          font-size: 15px;
          opacity: 0.75;
          margin: 0;
        }
      `}</style>
    </div>
  )
}
