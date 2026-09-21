import { getBaseUrl } from '@/greenvelly/config/api'
import { authJsonHeaders, decodeData } from './apiResponse'

export function periodKey(label: string): string {
  switch (label) {
    case 'Today':
      return 'today'
    case 'This Week':
      return 'week'
    case 'Last 3 Months':
      return '3months'
    case 'This Month':
    default:
      return 'month'
  }
}

export async function fetchReports(periodLabel: string): Promise<Record<string, unknown> | null> {
  const url = new URL(`${getBaseUrl()}/reports`)
  url.searchParams.set('period', periodKey(periodLabel))
  const r = await fetch(url.toString(), { headers: authJsonHeaders(true) })
  const d = await decodeData(r)
  return d && typeof d === 'object' ? (d as Record<string, unknown>) : null
}
