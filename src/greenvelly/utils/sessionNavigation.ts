import { currentUserIsAdmin } from '@/greenvelly/config/api'
import * as authService from '@/greenvelly/services/authService'
import { UnauthorizedException } from '@/greenvelly/services/apiResponse'
import { useFollowUpStore } from '@/greenvelly/stores/followUpStore'
import { useSiteStore } from '@/greenvelly/stores/siteStore'
import { clearLocalSession, getAuthToken } from '@/greenvelly/utils/storage'

export async function navigateToLoggedInHome(
  navigate: (path: string, options?: { replace?: boolean }) => void,
): Promise<boolean> {
  try {
    await authService.requireValidSession()
  } catch (e) {
    if (e instanceof UnauthorizedException) {
      await forceLocalLogout(navigate)
      return false
    }
  }

  if (currentUserIsAdmin()) {
    navigate('/admin', { replace: true })
    return true
  }

  const siteStore = useSiteStore.getState()
  const followUpStore = useFollowUpStore.getState()

  siteStore.onSessionExpired = () => forceLocalLogout(navigate)
  followUpStore.onSessionExpired = () => forceLocalLogout(navigate)

  try {
    await siteStore.bootstrapFromApi()
    await followUpStore.syncFromApi()
  } catch {
    /* bootstrap errors are non-fatal */
  }

  navigate('/home', { replace: true })
  return true
}

export async function forceLocalLogout(
  navigate: (path: string, options?: { replace?: boolean }) => void,
) {
  clearLocalSession()
  useSiteStore.setState({
    sites: [],
    selectedId: '',
    documents: [],
    photoRecords: [],
    inquiries: [],
  })
  useFollowUpStore.setState({ today: [], missed: [], history: [] })
  navigate('/login', { replace: true })
}

export function hasStoredSession(): boolean {
  const token = getAuthToken()
  return Boolean(token && token.length > 0)
}
