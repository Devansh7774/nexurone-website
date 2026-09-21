import { getBaseUrl } from '@/greenvelly/config/api'
import { authHeaders, authJsonHeaders, decodeData } from './apiResponse'

export async function getInquiries(
  siteId: string,
  params?: { status?: string; search?: string },
): Promise<unknown[] | null> {
  const url = new URL(`${getBaseUrl()}/sites/${siteId}/inquiries`)
  if (params?.status) url.searchParams.set('status', params.status)
  if (params?.search) url.searchParams.set('search', params.search)
  const r = await fetch(url.toString(), { headers: authJsonHeaders(true) })
  const d = await decodeData(r)
  return Array.isArray(d) ? d : null
}

export async function getInquiry(inquiryId: string): Promise<Record<string, unknown> | null> {
  const r = await fetch(`${getBaseUrl()}/inquiries/${inquiryId}`, {
    headers: authJsonHeaders(true),
  })
  const d = await decodeData(r)
  return d && typeof d === 'object' ? (d as Record<string, unknown>) : null
}

export async function postInquiry(
  siteId: string,
  body: Record<string, unknown>,
  photo?: File,
): Promise<Record<string, unknown> | null> {
  const uri = `${getBaseUrl()}/sites/${siteId}/inquiries`
  if (photo) {
    const form = new FormData()
    Object.entries(body).forEach(([k, v]) => {
      if (v != null) form.append(k, String(v))
    })
    form.append('photo', photo)
    const r = await fetch(uri, { method: 'POST', headers: authHeaders(), body: form })
    const d = await decodeData(r)
    return d && typeof d === 'object' ? (d as Record<string, unknown>) : null
  }
  const r = await fetch(uri, {
    method: 'POST',
    headers: authJsonHeaders(true),
    body: JSON.stringify(body),
  })
  const d = await decodeData(r)
  return d && typeof d === 'object' ? (d as Record<string, unknown>) : null
}

export async function putInquiryPhoto(
  inquiryId: string,
  photo: File,
): Promise<Record<string, unknown> | null> {
  const form = new FormData()
  form.append('photo', photo)
  const r = await fetch(`${getBaseUrl()}/inquiries/${inquiryId}/photo`, {
    method: 'PUT',
    headers: authHeaders(),
    body: form,
  })
  const d = await decodeData(r)
  return d && typeof d === 'object' ? (d as Record<string, unknown>) : null
}

export async function patchInquiry(
  inquiryId: string,
  body: Record<string, unknown>,
): Promise<Record<string, unknown> | null> {
  const r = await fetch(`${getBaseUrl()}/inquiries/${inquiryId}`, {
    method: 'PATCH',
    headers: authJsonHeaders(true),
    body: JSON.stringify(body),
  })
  const d = await decodeData(r)
  return d && typeof d === 'object' ? (d as Record<string, unknown>) : null
}

export async function checkDuplicate(
  siteId: string,
  phone: string,
): Promise<Record<string, unknown> | null> {
  const url = new URL(`${getBaseUrl()}/sites/${siteId}/inquiries/check-duplicate`)
  url.searchParams.set('phone', phone)
  const r = await fetch(url.toString(), { headers: authJsonHeaders(true) })
  const d = await decodeData(r)
  return d && typeof d === 'object' ? (d as Record<string, unknown>) : null
}
