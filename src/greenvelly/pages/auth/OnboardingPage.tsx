import { BarChart3, Building2, Search } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppButton } from '@/greenvelly/components/widgets/AppButton'
import { colors } from '@/greenvelly/config/colors'
import { setOnboardingCompleted } from '@/greenvelly/utils/storage'

const pages = [
  {
    icon: Search,
    color: colors.primary,
    title: 'Manage All Inquiries',
    subtitle:
      'Track every lead from first contact to final booking. Never miss a follow-up or lose a potential buyer.',
  },
  {
    icon: Building2,
    color: colors.accent,
    title: 'Showcase Your Projects',
    subtitle:
      'Add projects with photos, amenities, pricing, and availability. Share brochures instantly with prospects.',
  },
  {
    icon: BarChart3,
    color: colors.success,
    title: 'Powerful Analytics',
    subtitle:
      'See conversion rates, follow-up success, and site-wise performance. Make data-driven sales decisions.',
  },
]

export function OnboardingPage() {
  const navigate = useNavigate()
  const [page, setPage] = useState(0)

  const finish = () => {
    setOnboardingCompleted(true)
    navigate('/login', { replace: true })
  }

  const current = pages[page]
  const Icon = current.icon

  return (
    <div className="page page-white app-shell">
      <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'flex-end' }}>
        <button type="button" className="icon-btn" onClick={finish} style={{ color: colors.textSecondary }}>
          Skip
        </button>
      </div>
      <div style={{ flex: 1, padding: '40px 32px', textAlign: 'center' }}>
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: 24,
            background: `${current.color}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 32px',
          }}
        >
          <Icon size={48} color={current.color} />
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 800, margin: '0 0 16px', letterSpacing: -0.3 }}>
          {current.title}
        </h1>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: colors.textSecondary, margin: 0 }}>
          {current.subtitle}
        </p>
      </div>
      <div style={{ padding: '0 24px 32px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 24 }}>
          {pages.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === page ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: i === page ? colors.primary : colors.border,
                transition: 'width 0.2s',
              }}
            />
          ))}
        </div>
        <AppButton
          text={page === pages.length - 1 ? 'Get Started' : 'Next'}
          onClick={() => (page === pages.length - 1 ? finish() : setPage((p) => p + 1))}
        />
      </div>
    </div>
  )
}
