import { getBaseUrl } from '@/greenvelly/config/api'
import { authJsonHeaders, decodeData } from './apiResponse'

export async function getFollowUpsToday(siteId: string): Promise<unknown[] | null> {
  const r = await fetch(`${getBaseUrl()}/sites/${siteId}/follow-ups/today`, {
    headers: authJsonHeaders(true),
  })
  const d = await decodeData(r)
  return Array.isArray(d) ? d : null
}

export async function getFollowUpsMissed(siteId: string): Promise<unknown[] | null> {
  const r = await fetch(`${getBaseUrl()}/sites/${siteId}/follow-ups/missed`, {
    headers: authJsonHeaders(true),
  })
  const d = await decodeData(r)
  return Array.isArray(d) ? d : null
}

export async function getFollowUpsHistory(
  siteId: string,
  limit = 50,
): Promise<unknown[] | null> {
  const url = new URL(`${getBaseUrl()}/sites/${siteId}/follow-ups/history`)
  url.searchParams.set('limit', String(limit))
  const r = await fetch(url.toString(), { headers: authJsonHeaders(true) })
  const d = await decodeData(r)
  return Array.isArray(d) ? d : null
}

export async function postFollowUp(
  siteId: string,
  body: Record<string, unknown>,
): Promise<Record<string, unknown> | null> {
  const r = await fetch(`${getBaseUrl()}/sites/${siteId}/follow-ups`, {
    method: 'POST',
    headers: authJsonHeaders(true),
    body: JSON.stringify(body),
  })
  const d = await decodeData(r)
  return d && typeof d === 'object' ? (d as Record<string, unknown>) : null
}

export async function patchFollowUp(
  followUpId: string,
  body: Record<string, unknown>,
): Promise<boolean> {
  const r = await fetch(`${getBaseUrl()}/follow-ups/${followUpId}`, {
    method: 'PATCH',
    headers: authJsonHeaders(true),
    body: JSON.stringify(body),
  })
  return r.status >= 200 && r.status < 300
}
