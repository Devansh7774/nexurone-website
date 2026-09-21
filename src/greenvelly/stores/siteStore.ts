import { resolveUploadsUrl } from '@/greenvelly/config/api'
import {
  heroUrlsFromSiteApi,
  siteDocumentFromApi,
  sitePhotoFromApi,
  type BuilderSite,
  type SiteDocument,
  type SitePhotoRecord,
} from '@/greenvelly/models/site'
import * as inquiriesApi from '@/greenvelly/services/inquiriesService'
import { UnauthorizedException } from '@/greenvelly/services/apiResponse'
import * as sitesApi from '@/greenvelly/services/sitesService'
import { create } from 'zustand'

export function projectMatchesSiteLabel(field: string, siteName: string): boolean {
  const s = siteName.toLowerCase().trim()
  if (!s || s === 'no site yet') return false
  const f = field.toLowerCase().trim()
  if (f.includes(s)) return true
  for (const word of s.split(/\s+/)) {
    if (word.length >= 3 && f.includes(word)) return true
  }
  return false
}

const emptySite: BuilderSite = {
  id: '',
  name: 'No site yet',
  heroImageUrls: [],
  pipelineValue: '—',
}

export function getSelectedSite(sites: BuilderSite[], selectedId: string): BuilderSite {
  if (!sites.length) return emptySite
  return sites.find((s) => s.id === selectedId) ?? sites[0]
}

interface SiteState {
  sites: BuilderSite[]
  selectedId: string
  documents: SiteDocument[]
  photoRecords: SitePhotoRecord[]
  inquiries: Record<string, unknown>[]
  isBusy: boolean
  onSessionExpired?: () => void
  bootstrapFromApi: () => Promise<void>
  refreshSites: () => Promise<void>
  selectSite: (id: string) => void
  addSite: (name: string) => Promise<string | null>
  addPhoto: (siteId: string, file: File) => Promise<boolean>
  removePhotoAt: (siteId: string, index: number) => Promise<void>
  addDocumentLink: (siteId: string, title: string, url: string) => Promise<void>
  uploadDocument: (siteId: string, file: File, title: string) => Promise<boolean>
  deleteDocument: (siteId: string, docId: string) => Promise<void>
  createInquiry: (body: Record<string, unknown>, photo?: File) => Promise<Record<string, unknown> | null>
  patchInquiry: (id: string, body: Record<string, unknown>) => Promise<Record<string, unknown> | null>
  checkDuplicatePhone: (phone: string) => Promise<Record<string, unknown> | null>
  refreshInquiries: () => Promise<void>
  todayInquiryCount: () => number
}

async function loadSitePayload(
  selectedId: string,
  set: (partial: Partial<SiteState> | ((s: SiteState) => Partial<SiteState>)) => void,
  onSessionExpired?: () => void,
) {
  if (!selectedId) {
    set({ documents: [], photoRecords: [], inquiries: [] })
    return
  }
  try {
    const [docs, ph, inq] = await Promise.all([
      sitesApi.getDocuments(selectedId),
      sitesApi.getPhotos(selectedId),
      inquiriesApi.getInquiries(selectedId),
    ])
    const documents = (docs ?? []).map((e) =>
      siteDocumentFromApi(e as Record<string, unknown>),
    )
    const photoRecords = (ph ?? []).map((e) =>
      sitePhotoFromApi(e as Record<string, unknown>),
    )
    const inquiries = (inq ?? []).map((e) => e as Record<string, unknown>)
    set({ documents, photoRecords, inquiries })
    set((state) => {
      const i = state.sites.findIndex((s) => s.id === selectedId)
      if (i < 0) return {}
      const urls = photoRecords.map((r) => resolveUploadsUrl(r.url))
      const sites = [...state.sites]
      sites[i] = { ...sites[i], heroImageUrls: urls }
      return { sites }
    })
  } catch (e) {
    if (e instanceof UnauthorizedException) onSessionExpired?.()
  }
}

export const useSiteStore = create<SiteState>((set, get) => ({
  sites: [],
  selectedId: '',
  documents: [],
  photoRecords: [],
  inquiries: [],
  isBusy: false,

  bootstrapFromApi: async () => {
    await get().refreshSites()
    await loadSitePayload(get().selectedId, set, get().onSessionExpired)
  },

  refreshSites: async () => {
    set({ isBusy: true })
    try {
      const raw = await sitesApi.getSites()
      if (!raw) return
      const list: BuilderSite[] = []
      const seen = new Set<string>()
      for (const e of raw) {
        if (!e || typeof e !== 'object') continue
        const m = e as Record<string, unknown>
        const id = String(m.id ?? '').trim()
        if (!id || seen.has(id)) continue
        seen.add(id)
        list.push({
          id,
          name: String(m.name ?? ''),
          heroImageUrls: heroUrlsFromSiteApi(m).map(resolveUploadsUrl),
          pipelineValue: String(m.pipeline_value ?? '₹0'),
        })
      }
      let selectedId = get().selectedId
      if (!selectedId && list.length) selectedId = list[0].id
      else if (selectedId && !list.some((s) => s.id === selectedId)) {
        selectedId = list.length ? list[0].id : ''
      }
      set({ sites: list, selectedId })
    } catch (e) {
      if (e instanceof UnauthorizedException) get().onSessionExpired?.()
    } finally {
      set({ isBusy: false })
    }
  },

  selectSite: (id) => {
    if (get().selectedId === id) return
    set({ selectedId: id })
    loadSitePayload(id, set, get().onSessionExpired)
    import('@/greenvelly/stores/followUpStore').then(({ useFollowUpStore }) => {
      useFollowUpStore.getState().syncFromApi()
    })
  },

  addSite: async (name) => {
    const result = await sitesApi.postSite(name.trim())
    if (result.error) return result.error
    if (!result.data) return 'Could not create site. Check your connection.'
    await get().refreshSites()
    const id = String(result.data.id ?? '')
    set({ selectedId: id })
    await loadSitePayload(id, set, get().onSessionExpired)
    return null
  },

  addPhoto: async (siteId, file) => {
    const created = await sitesApi.putSitePhoto(siteId, file)
    if (!created) return false
    await loadSitePayload(get().selectedId, set, get().onSessionExpired)
    return true
  },

  removePhotoAt: async (siteId, index) => {
    const records = get().photoRecords
    if (index < 0 || index >= records.length) return
    await sitesApi.deletePhoto(siteId, records[index].id)
    await loadSitePayload(get().selectedId, set, get().onSessionExpired)
  },

  addDocumentLink: async (siteId, title, rawUrl) => {
    const url = rawUrl.trim()
    if (!url.startsWith('http://') && !url.startsWith('https://')) return
    await sitesApi.postDocumentLink(siteId, url, title.trim() || new URL(url).host, 'other')
    await loadSitePayload(get().selectedId, set, get().onSessionExpired)
  },

  uploadDocument: async (siteId, file, title) => {
    const created = await sitesApi.putDocumentUpload(siteId, file, title)
    if (!created) return false
    await loadSitePayload(get().selectedId, set, get().onSessionExpired)
    return true
  },

  deleteDocument: async (siteId, docId) => {
    await sitesApi.deleteDocument(siteId, docId)
    await loadSitePayload(get().selectedId, set, get().onSessionExpired)
  },

  createInquiry: async (body, photo) => {
    const sid = get().selectedId
    if (!sid) return null
    const r = await inquiriesApi.postInquiry(sid, body, photo)
    if (r) await get().refreshInquiries()
    return r
  },

  patchInquiry: async (id, body) => {
    const r = await inquiriesApi.patchInquiry(id, body)
    if (r) await get().refreshInquiries()
    return r
  },

  checkDuplicatePhone: async (phone) => {
    const sid = get().selectedId
    if (!sid) return null
    return inquiriesApi.checkDuplicate(sid, phone)
  },

  refreshInquiries: async () => {
    await loadSitePayload(get().selectedId, set, get().onSessionExpired)
  },

  todayInquiryCount: () => {
    const { selectedId, inquiries, sites } = get()
    const selectedSite = getSelectedSite(sites, selectedId)
    if (!selectedId) return 0
    const today = new Date()
    const todayStr = `${today.getUTCFullYear()}-${String(today.getUTCMonth() + 1).padStart(2, '0')}-${String(today.getUTCDate()).padStart(2, '0')}`
    return inquiries.filter((i) => {
      const iSid = String(i.site_id ?? '').trim()
      if (iSid && iSid !== selectedId) return false
      if (
        !iSid &&
        !projectMatchesSiteLabel(String(i.project ?? ''), selectedSite.name)
      )
        return false
      const createdRaw = i.created_at
      if (typeof createdRaw === 'string' && createdRaw) {
        const dt = new Date(createdRaw)
        if (!Number.isNaN(dt.getTime())) {
          const d = `${dt.getUTCFullYear()}-${String(dt.getUTCMonth() + 1).padStart(2, '0')}-${String(dt.getUTCDate()).padStart(2, '0')}`
          return d === todayStr
        }
      }
      return false
    }).length
  },
}))

export function useSelectedSite() {
  return useSiteStore((s) => getSelectedSite(s.sites, s.selectedId))
}

export function useHasRealSites() {
  return useSiteStore((s) => s.sites.length > 0)
}
