import { Lock, Mail } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppLogo } from '@/greenvelly/components/layout/AppLogo'
import { AppButton } from '@/greenvelly/components/widgets/AppButton'
import { CustomTextField, PasswordFieldWithToggle } from '@/greenvelly/components/widgets/CustomTextField'
import { Toast } from '@/greenvelly/components/Toast'
import { colors } from '@/greenvelly/config/colors'
import * as authService from '@/greenvelly/services/authService'
import { navigateToLoggedInHome } from '@/greenvelly/utils/sessionNavigation'
import { setOnboardingCompleted } from '@/greenvelly/utils/storage'

export function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const validate = () => {
    const e: typeof errors = {}
    if (!email.trim()) e.email = 'Email is required'
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim())) {
      e.email = 'Enter a valid email address'
    }
    const pwd = authService.normalizeLoginPassword(password)
    if (!pwd) e.password = 'Password is required'
    else if (pwd.length < 6) e.password = 'At least 6 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleLogin = async () => {
    if (!validate()) return
    setLoading(true)
    try {
      const result = await authService.login(email, password)
      if (!result.ok) {
        setToast({ msg: result.message ?? 'Login failed.', type: 'error' })
        return
      }
      const ok = await navigateToLoggedInHome(navigate)
      if (!ok) {
        setToast({
          msg: 'Signed in, but the session could not be started. Please try again.',
          type: 'error',
        })
        return
      }
      setOnboardingCompleted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page page-white app-shell">
      <div className="page-padding" style={{ paddingTop: 40 }}>
        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          <AppLogo size="md" />
        </div>
        <h1 style={{ fontSize: 30, fontWeight: 800, margin: '24px 0 8px', letterSpacing: -0.5 }}>
          Welcome back
        </h1>
        <p style={{ fontSize: 15, color: colors.textSecondary, margin: '0 0 40px' }}>
          Sign in with your email and password
        </p>

        <div className="form-card">
          <CustomTextField
            label="Email ID"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            prefixIcon={<Mail size={18} color={colors.textHint} />}
            error={errors.email}
          />
          <div style={{ height: 16 }} />
          <PasswordFieldWithToggle
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            prefixIcon={<Lock size={18} color={colors.textHint} />}
            error={errors.password}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />
          <div style={{ textAlign: 'right', marginTop: 4 }}>
            <Link to="/forgot-password" style={{ fontSize: 14, fontWeight: 600 }}>
              Forgot password?
            </Link>
          </div>
          <div style={{ height: 16 }} />
          <AppButton text="Log in" isLoading={loading} onClick={handleLogin} />
        </div>
      </div>
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
