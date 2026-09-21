import { getBaseUrl } from '@/greenvelly/config/api'
import { clearLocalSession, getAuthToken, persistUser, setAuthToken } from '@/greenvelly/utils/storage'
import { authJsonHeaders, decodeData, UnauthorizedException } from './apiResponse'

export function normalizeLoginEmail(email: string) {
  return email.trim().toLowerCase()
}

export function normalizeLoginPassword(password: string) {
  return password.trim()
}

export async function login(
  email: string,
  password: string,
): Promise<{ ok: boolean; message?: string }> {
  const normalizedEmail = normalizeLoginEmail(email)
  const normalizedPassword = normalizeLoginPassword(password)
  try {
    const response = await fetch(`${getBaseUrl()}/auth/login`, {
      method: 'POST',
      headers: authJsonHeaders(),
      body: JSON.stringify({ email: normalizedEmail, password: normalizedPassword }),
    })

    let root: Record<string, unknown>
    try {
      root = (await response.json()) as Record<string, unknown>
    } catch {
      return {
        ok: false,
        message:
          response.status === 404
            ? 'API not found. Check VITE_API_BASE (must end with /api/v1).'
            : `Invalid response from server (${response.status}).`,
      }
    }

    if (response.status === 200 && root.success === true) {
      const data = root.data as Record<string, unknown> | undefined
      if (!data) return { ok: false, message: 'Malformed login response.' }
      const token = (data.authToken ?? data.token) as string | undefined
      if (!token) return { ok: false, message: 'No token in response.' }
      setAuthToken(token)
      const user = data.user
      if (user && typeof user === 'object') {
        persistUser(user as Record<string, unknown>)
      }
      return { ok: true }
    }

    const err = root.error as { message?: string } | undefined
    return {
      ok: false,
      message: err?.message ?? `Login failed (${response.status}).`,
    }
  } catch (e) {
    return { ok: false, message: `Network error: ${e}` }
  }
}

export async function requireValidSession(): Promise<void> {
  const token = getAuthToken()
  if (!token) throw new UnauthorizedException()
  try {
    const r = await fetch(`${getBaseUrl()}/auth/me`, {
      headers: authJsonHeaders(true),
    })
    const d = await decodeData(r)
    if (d && typeof d === 'object') {
      persistUser(d as Record<string, unknown>)
    }
  } catch (e) {
    if (e instanceof UnauthorizedException) throw e
  }
}

export async function fetchProfile(): Promise<Record<string, unknown> | null> {
  try {
    const r = await fetch(`${getBaseUrl()}/auth/me`, {
      headers: authJsonHeaders(true),
    })
    const d = await decodeData(r)
    if (d && typeof d === 'object') {
      persistUser(d as Record<string, unknown>)
      return d as Record<string, unknown>
    }
  } catch (e) {
    if (e instanceof UnauthorizedException) throw e
  }
  return null
}

export async function patchProfile(
  body: Record<string, unknown>,
): Promise<Record<string, unknown> | null> {
  try {
    const r = await fetch(`${getBaseUrl()}/auth/me`, {
      method: 'PATCH',
      headers: authJsonHeaders(true),
      body: JSON.stringify(body),
    })
    const d = await decodeData(r)
    if (d && typeof d === 'object') {
      persistUser(d as Record<string, unknown>)
      return d as Record<string, unknown>
    }
  } catch (e) {
    if (e instanceof UnauthorizedException) throw e
  }
  return null
}

export async function logoutRemote() {
  const token = getAuthToken()
  if (!token) return
  try {
    await fetch(`${getBaseUrl()}/auth/logout`, {
      method: 'POST',
      headers: authJsonHeaders(true),
    })
  } catch {
    /* ignore */
  }
}

export async function logout() {
  await logoutRemote()
  clearLocalSession()
}

export async function forgotPassword(
  email: string,
): Promise<{ ok: boolean; message?: string }> {
  try {
    const response = await fetch(`${getBaseUrl()}/auth/forgot-password`, {
      method: 'POST',
      headers: authJsonHeaders(),
      body: JSON.stringify({ email: email.trim() }),
    })
    const root = (await response.json()) as Record<string, unknown>
    if (response.status === 200 && root.success === true) {
      return { ok: true, message: root.message as string | undefined }
    }
    const err = root.error as { message?: string } | undefined
    return { ok: false, message: err?.message ?? 'Could not send reset link.' }
  } catch (e) {
    return { ok: false, message: `Network error: ${e}` }
  }
}
