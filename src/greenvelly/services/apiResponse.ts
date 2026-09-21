export class UnauthorizedException extends Error {
  constructor() {
    super('Unauthorized')
    this.name = 'UnauthorizedException'
  }
}

export async function decodeData(response: Response): Promise<unknown> {
  if (response.status === 401) {
    throw new UnauthorizedException()
  }
  try {
    const text = await response.text()
    const decoded = JSON.parse(text) as { success?: boolean; data?: unknown }
    if (decoded.success === true) return decoded.data
  } catch {
    /* fall through */
  }
  return null
}

export function authJsonHeaders(withAuth = false): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (withAuth) {
    const token = localStorage.getItem('authToken')
    if (token) headers.Authorization = `Bearer ${token}`
  }
  return headers
}

export function authHeaders(): Record<string, string> {
  const token = localStorage.getItem('authToken')
  return token ? { Authorization: `Bearer ${token}` } : {}
}
