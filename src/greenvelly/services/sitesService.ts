import { getBaseUrl } from '@/greenvelly/config/api'
import { authHeaders, authJsonHeaders, decodeData } from './apiResponse'

export async function getSites(): Promise<unknown[] | null> {
  const r = await fetch(`${getBaseUrl()}/sites`, { headers: authJsonHeaders(true) })
  const d = await decodeData(r)
  return Array.isArray(d) ? d : null
}

export async function postSite(
  name: string,
  ownerId?: string,
): Promise<{ data?: Record<string, unknown>; error?: string }> {
  const body: Record<string, string> = { name: name.trim() }
  if (ownerId) body.owner_id = ownerId
  const r = await fetch(`${getBaseUrl()}/sites`, {
    method: 'POST',
    headers: authJsonHeaders(true),
    body: JSON.stringify(body),
  })
  try {
    const decoded = (await r.json()) as Record<string, unknown>
    if (decoded.success === true) {
      const data = decoded.data as Record<string, unknown> | undefined
      return { data: data ?? undefined }
    }
    const err = decoded.error as { message?: string } | undefined
    return { error: err?.message ?? 'Could not create site.' }
  } catch {
    return { error: 'Could not create site.' }
  }
}

export async function getSite(siteId: string): Promise<Record<string, unknown> | null> {
  const r = await fetch(`${getBaseUrl()}/sites/${siteId}`, { headers: authJsonHeaders(true) })
  const d = await decodeData(r)
  return d && typeof d === 'object' ? (d as Record<string, unknown>) : null
}

export async function deleteSite(siteId: string): Promise<boolean> {
  const r = await fetch(`${getBaseUrl()}/sites/${siteId}`, {
    method: 'DELETE',
    headers: authJsonHeaders(true),
  })
  return r.status >= 200 && r.status < 300
}

export async function getDocuments(siteId: string): Promise<unknown[] | null> {
  const r = await fetch(`${getBaseUrl()}/sites/${siteId}/documents`, {
    headers: authJsonHeaders(true),
  })
  const d = await decodeData(r)
  return Array.isArray(d) ? d : null
}

export async function postDocumentLink(
  siteId: string,
  uri: string,
  title = '',
  kind = 'other',
): Promise<Record<string, unknown> | null> {
  const r = await fetch(`${getBaseUrl()}/sites/${siteId}/documents`, {
    method: 'POST',
    headers: authJsonHeaders(true),
    body: JSON.stringify({ uri, title, kind }),
  })
  const d = await decodeData(r)
  return d && typeof d === 'object' ? (d as Record<string, unknown>) : null
}

export async function putDocumentUpload(
  siteId: string,
  file: File,
  title = '',
): Promise<Record<string, unknown> | null> {
  const form = new FormData()
  form.append('file', file)
  if (title) form.append('title', title)
  const r = await fetch(`${getBaseUrl()}/sites/${siteId}/documents/upload`, {
    method: 'PUT',
    headers: authHeaders(),
    body: form,
  })
  const d = await decodeData(r)
  return d && typeof d === 'object' ? (d as Record<string, unknown>) : null
}

export async function deleteDocument(siteId: string, docId: string): Promise<boolean> {
  const r = await fetch(`${getBaseUrl()}/sites/${siteId}/documents/${docId}`, {
    method: 'DELETE',
    headers: authJsonHeaders(true),
  })
  return r.status >= 200 && r.status < 300
}

export async function getPhotos(siteId: string): Promise<unknown[] | null> {
  const r = await fetch(`${getBaseUrl()}/sites/${siteId}/photos`, {
    headers: authJsonHeaders(true),
  })
  const d = await decodeData(r)
  return Array.isArray(d) ? d : null
}

export async function putSitePhoto(
  siteId: string,
  file: File,
): Promise<Record<string, unknown> | null> {
  const form = new FormData()
  form.append('file', file)
  const r = await fetch(`${getBaseUrl()}/sites/${siteId}/photos`, {
    method: 'PUT',
    headers: authHeaders(),
    body: form,
  })
  const d = await decodeData(r)
  return d && typeof d === 'object' ? (d as Record<string, unknown>) : null
}

export async function deletePhoto(siteId: string, photoId: string): Promise<boolean> {
  const r = await fetch(`${getBaseUrl()}/sites/${siteId}/photos/${photoId}`, {
    method: 'DELETE',
    headers: authJsonHeaders(true),
  })
  return r.status >= 200 && r.status < 300
}
