import { getBaseUrl } from '@/greenvelly/config/api'
import { authJsonHeaders, decodeData } from './apiResponse'

export async function fetchNotifications(limit = 100): Promise<Record<string, unknown>[]> {
  const url = new URL(`${getBaseUrl()}/notifications`)
  url.searchParams.set('limit', String(limit))
  const r = await fetch(url.toString(), { headers: authJsonHeaders(true) })
  const d = await decodeData(r)
  if (Array.isArray(d)) {
    return d.filter((e) => e && typeof e === 'object') as Record<string, unknown>[]
  }
  return []
}
