import { LockKeyhole } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppButton } from '@/greenvelly/components/widgets/AppButton'
import { CustomTextField } from '@/greenvelly/components/widgets/CustomTextField'
import { Toast } from '@/greenvelly/components/Toast'
import { colors } from '@/greenvelly/config/colors'
import * as authService from '@/greenvelly/services/authService'
import { forceLocalLogout } from '@/greenvelly/utils/sessionNavigation'
import { clearLocalSession } from '@/greenvelly/utils/storage'

export function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [toast, setToast] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!email.trim()) {
      setError('Email is required')
      return
    }
    setLoading(true)
    try {
      const result = await authService.forgotPassword(email)
      if (!result.ok) {
        setToast(result.message ?? 'Could not send reset link.')
        return
      }
      clearLocalSession()
      setToast(result.message ?? 'Check your email for a reset link.')
      setTimeout(() => navigate('/login', { replace: true }), 2000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page page-white app-shell">
      <header className="app-bar">
        <button type="button" className="app-bar-back" onClick={() => navigate(-1)}>
          ←
        </button>
      </header>
      <div className="page-padding">
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: colors.primarySurface,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24,
          }}
        >
          <LockKeyhole size={36} color={colors.primary} />
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}>Forgot password?</h1>
        <p style={{ color: colors.textSecondary, marginBottom: 32 }}>
          Enter your email and we will send you a link to reset your password.
        </p>
        <CustomTextField
          label="Email"
          placeholder="you@company.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
        />
        <div style={{ height: 24 }} />
        <AppButton text="Send reset link" isLoading={loading} onClick={handleSubmit} />
        <button
          type="button"
          onClick={() => forceLocalLogout(navigate)}
          style={{ display: 'block', margin: '16px auto', background: 'none', border: 'none', color: colors.primary, fontWeight: 600, cursor: 'pointer' }}
        >
          Back to log in
        </button>
      </div>
      {toast && <Toast message={toast} type="success" onClose={() => setToast(null)} />}
    </div>
  )
}
