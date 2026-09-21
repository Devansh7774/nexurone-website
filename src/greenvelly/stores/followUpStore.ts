import * as followUpsApi from '@/greenvelly/services/followUpsService'
import { UnauthorizedException } from '@/greenvelly/services/apiResponse'
import { useSiteStore } from '@/greenvelly/stores/siteStore'
import { create } from 'zustand'

interface FollowUpState {
  today: Record<string, unknown>[]
  missed: Record<string, unknown>[]
  history: Record<string, unknown>[]
  syncFromApi: () => Promise<void>
  scheduleFollowUp: (params: {
    followUpType: string
    scheduledAt: Date
    contactName?: string
    phone?: string
    inquiryId?: string
    notes?: string
  }) => Promise<boolean>
  setFollowUpDone: (followUpId: string, done: boolean) => Promise<boolean>
  onSessionExpired?: () => void
}

export const useFollowUpStore = create<FollowUpState>((set, get) => ({
  today: [],
  missed: [],
  history: [],

  syncFromApi: async () => {
    const sid = useSiteStore.getState().selectedId
    if (!sid) {
      set({ today: [], missed: [], history: [] })
      return
    }
    try {
      const [t, m, h] = await Promise.all([
        followUpsApi.getFollowUpsToday(sid),
        followUpsApi.getFollowUpsMissed(sid),
        followUpsApi.getFollowUpsHistory(sid),
      ])
      set({
        today: (t ?? []).map((e) => e as Record<string, unknown>),
        missed: (m ?? []).map((e) => e as Record<string, unknown>),
        history: (h ?? []).map((e) => e as Record<string, unknown>),
      })
    } catch (e) {
      if (e instanceof UnauthorizedException) get().onSessionExpired?.()
    }
  },

  scheduleFollowUp: async ({
    followUpType,
    scheduledAt,
    contactName = 'Follow-up',
    phone = '',
    inquiryId,
    notes = '',
  }) => {
    const sid = useSiteStore.getState().selectedId
    if (!sid) return false
    const body: Record<string, unknown> = {
      follow_up_type: followUpType,
      scheduled_at: scheduledAt.toISOString(),
      contact_name: contactName,
      phone,
      notes,
    }
    if (inquiryId) body.inquiry_id = inquiryId
    const r = await followUpsApi.postFollowUp(sid, body)
    if (r) {
      await get().syncFromApi()
      return true
    }
    return false
  },

  setFollowUpDone: async (followUpId, done) => {
    const ok = await followUpsApi.patchFollowUp(followUpId, { done })
    if (ok) await get().syncFromApi()
    return ok
  },
}))
