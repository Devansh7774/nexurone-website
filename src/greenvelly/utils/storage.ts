import { STORAGE_KEYS } from '@/greenvelly/config/constants'

export function getAuthToken(): string | null {
  return localStorage.getItem(STORAGE_KEYS.authToken)
}

export function setAuthToken(token: string) {
  localStorage.setItem(STORAGE_KEYS.authToken, token)
}

export function getUser(): Record<string, unknown> | null {
  const raw = localStorage.getItem(STORAGE_KEYS.user)
  if (!raw) return null
  try {
    return JSON.parse(raw) as Record<string, unknown>
  } catch {
    return null
  }
}

export function persistUser(user: Record<string, unknown>) {
  localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user))
  const role = user.role
  if (role != null) localStorage.setItem(STORAGE_KEYS.role, String(role))
}

export function clearLocalSession() {
  localStorage.removeItem(STORAGE_KEYS.authToken)
  localStorage.removeItem(STORAGE_KEYS.user)
  localStorage.removeItem(STORAGE_KEYS.role)
}

export function isOnboardingCompleted(): boolean {
  return localStorage.getItem(STORAGE_KEYS.onboardingCompleted) === 'true'
}

export function setOnboardingCompleted(value = true) {
  localStorage.setItem(STORAGE_KEYS.onboardingCompleted, String(value))
}
