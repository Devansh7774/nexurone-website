export interface BuilderSite {
  id: string
  name: string
  heroImageUrls: string[]
  pipelineValue: string
}

export interface SiteDocument {
  id: string
  title: string
  kind: string
  uri: string
  isRemote: boolean
}

export interface SitePhotoRecord {
  id: string
  url: string
}

export function siteDocumentFromApi(m: Record<string, unknown>): SiteDocument {
  const uri = String(m.uri ?? m.file_url ?? m.url ?? '')
  const isRemote = uri.startsWith('http://') || uri.startsWith('https://')
  return {
    id: String(m.id ?? ''),
    title: String(m.title ?? 'Document'),
    kind: String(m.kind ?? 'other'),
    uri,
    isRemote,
  }
}

export function sitePhotoFromApi(m: Record<string, unknown>): SitePhotoRecord {
  return {
    id: String(m.id ?? ''),
    url: String(m.file_url ?? m.url ?? ''),
  }
}

export function heroUrlsFromSiteApi(m: Record<string, unknown>): string[] {
  const raw = m.photos
  if (!Array.isArray(raw)) return []
  return raw
    .map((e) => {
      if (!e || typeof e !== 'object') return ''
      return String((e as Record<string, unknown>).file_url ?? '').trim()
    })
    .filter(Boolean)
}
