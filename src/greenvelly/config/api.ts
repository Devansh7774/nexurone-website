export function getBaseUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_GREENVELLY_API_BASE as string | undefined
  if (fromEnv?.trim()) return fromEnv.trim()
  return 'https://site-manage-x.onrender.com/api/v1'
}

export function getApiWebOrigin(): string {
  const base = getBaseUrl()
  const u = new URL(base)
  if (u.pathname.endsWith('/api/v1')) {
    const stripped = u.pathname.slice(0, -'/api/v1'.length)
    u.pathname = stripped || '/'
  }
  return u.origin
}

export function getPrivacySecurityUrl(): string {
  return `${getApiWebOrigin()}/privacy-security`
}

export function apiWebRequestHeaders(url: string): Record<string, string> {
  try {
    const host = new URL(url).host.toLowerCase()
    if (host.includes('ngrok')) {
      return { 'ngrok-skip-browser-warning': 'true' }
    }
  } catch {
    /* ignore */
  }
  return {}
}

export function resolveUploadsUrl(fileUrlOrPath: string): string {
  const s = fileUrlOrPath.trim()
  if (!s) return s

  const api = new URL(getBaseUrl())

  const onApiOrigin = (path: string) => {
    const p = path.startsWith('/') ? path : `/${path}`
    return new URL(p, api.origin).toString()
  }

  if (s.startsWith('http://') || s.startsWith('https://')) {
    const u = new URL(s)
    const host = u.host.toLowerCase()
    if (host.includes('imagekit.io') || host.includes('ik.imagekit.io')) return s
    if (!u.pathname.startsWith('/uploads/')) return s

    const localHosts = new Set(['localhost', '127.0.0.1', '0.0.0.0', '10.0.2.2'])
    const wrongHost = localHosts.has(u.host) || (u.host && u.host !== api.host)
    if (wrongHost) return onApiOrigin(u.pathname)
    return s
  }

  return onApiOrigin(s)
}

export function resolveMediaUrl(url: string): string {
  return resolveUploadsUrl(url)
}

export function networkImageHeaders(imageUrl: string): Record<string, string> {
  try {
    const host = new URL(imageUrl).host.toLowerCase()
    if (host.includes('ngrok')) {
      return { 'ngrok-skip-browser-warning': 'true' }
    }
  } catch {
    /* ignore */
  }
  return {}
}

export function currentUserIsAdmin(): boolean {
  return (localStorage.getItem('role') ?? '').toLowerCase() === 'admin'
}
