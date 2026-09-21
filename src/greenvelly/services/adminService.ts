import { getBaseUrl } from '@/greenvelly/config/api'
import { authJsonHeaders, decodeData } from './apiResponse'

export async function listBuilders(): Promise<unknown[] | null> {
  const r = await fetch(`${getBaseUrl()}/admin/builders`, { headers: authJsonHeaders(true) })
  const d = await decodeData(r)
  return Array.isArray(d) ? d : null
}

export async function createBuilder(
  body: Record<string, unknown>,
): Promise<{ ok: boolean; message?: string; emailSent?: boolean }> {
  const r = await fetch(`${getBaseUrl()}/admin/builders`, {
    method: 'POST',
    headers: authJsonHeaders(true),
    body: JSON.stringify(body),
  })
  try {
    const decoded = (await r.json()) as Record<string, unknown>
    if (decoded.success === true) {
      return {
        ok: true,
        message: decoded.message as string | undefined,
        emailSent: decoded.email_sent === true,
      }
    }
    const err = decoded.error as { message?: string } | undefined
    return { ok: false, message: err?.message ?? 'Could not create builder.' }
  } catch {
    return { ok: false, message: 'Could not create builder.' }
  }
}

export async function updateBuilder(
  builderId: string,
  body: Record<string, unknown>,
): Promise<Record<string, unknown> | null> {
  const r = await fetch(`${getBaseUrl()}/admin/builders/${builderId}`, {
    method: 'PATCH',
    headers: authJsonHeaders(true),
    body: JSON.stringify(body),
  })
  const d = await decodeData(r)
  return d && typeof d === 'object' ? (d as Record<string, unknown>) : null
}

export async function deleteBuilder(builderId: string): Promise<boolean> {
  const r = await fetch(`${getBaseUrl()}/admin/builders/${builderId}`, {
    method: 'DELETE',
    headers: authJsonHeaders(true),
  })
  return r.status >= 200 && r.status < 300
}

export async function getBuilderSites(builderId: string): Promise<unknown[] | null> {
  const r = await fetch(`${getBaseUrl()}/admin/builders/${builderId}/sites`, {
    headers: authJsonHeaders(true),
  })
  const d = await decodeData(r)
  return Array.isArray(d) ? d : null
}
