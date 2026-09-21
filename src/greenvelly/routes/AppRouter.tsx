import { type ReactNode, useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { currentUserIsAdmin } from '@/greenvelly/config/api'
import { AdminTabLayout } from '@/greenvelly/pages/admin/AdminTabLayout'
import { SuperAdminAccountsPage } from '@/greenvelly/pages/admin/SuperAdminAccountsPage'
import { SuperAdminBuilderFormPage } from '@/greenvelly/pages/admin/SuperAdminBuilderFormPage'
import { SuperAdminBuilderSitesPage } from '@/greenvelly/pages/admin/SuperAdminBuilderSitesPage'
import { SuperAdminInquiryDataPage } from '@/greenvelly/pages/admin/SuperAdminInquiryDataPage'
import { SuperAdminMorePage } from '@/greenvelly/pages/admin/SuperAdminMorePage'
import { SuperAdminSiteDashboardPage } from '@/greenvelly/pages/admin/SuperAdminSiteDashboardPage'
import { SuperAdminSiteDocumentsPage } from '@/greenvelly/pages/admin/SuperAdminSiteDocumentsPage'
import { SuperAdminSitePhotosPage } from '@/greenvelly/pages/admin/SuperAdminSitePhotosPage'
import { ForgotPasswordPage } from '@/greenvelly/pages/auth/ForgotPasswordPage'
import { LoginPage } from '@/greenvelly/pages/auth/LoginPage'
import { OnboardingPage } from '@/greenvelly/pages/auth/OnboardingPage'
import { SplashPage } from '@/greenvelly/pages/auth/SplashPage'
import { AddInquiryPage } from '@/greenvelly/pages/builder/AddInquiryPage'
import { AddSitePage } from '@/greenvelly/pages/builder/AddSitePage'
import { BuilderTabLayout, DashboardPage } from '@/greenvelly/pages/builder/BuilderTabLayout'
import { DocumentViewerPage } from '@/greenvelly/pages/builder/DocumentViewerPage'
import { EditInquiryPage } from '@/greenvelly/pages/builder/EditInquiryPage'
import { EditProfilePage } from '@/greenvelly/pages/builder/EditProfilePage'
import { FollowUpsPage } from '@/greenvelly/pages/builder/FollowUpsPage'
import { InquiriesPage } from '@/greenvelly/pages/builder/InquiriesPage'
import { InquiryDetailPage } from '@/greenvelly/pages/builder/InquiryDetailPage'
import { MyProjectsPage } from '@/greenvelly/pages/builder/MyProjectsPage'
import { NotificationsPage } from '@/greenvelly/pages/builder/NotificationsPage'
import { PipelinePage } from '@/greenvelly/pages/builder/PipelinePage'
import { PrivacySecurityPage } from '@/greenvelly/pages/builder/PrivacySecurityPage'
import { ProfilePage } from '@/greenvelly/pages/builder/ProfilePage'
import { ProjectsPage } from '@/greenvelly/pages/builder/ProjectsPage'
import { ReportsPage } from '@/greenvelly/pages/builder/ReportsPage'
import { SiteDocumentsPage } from '@/greenvelly/pages/builder/SiteDocumentsPage'
import { SitePhotosPage } from '@/greenvelly/pages/builder/SitePhotosPage'
import { useFollowUpStore } from '@/greenvelly/stores/followUpStore'
import { useSiteStore } from '@/greenvelly/stores/siteStore'
import { forceLocalLogout } from '@/greenvelly/utils/sessionNavigation'
import { getAuthToken } from '@/greenvelly/utils/storage'

function RequireAuth({
  children,
  adminOnly = false,
  builderOnly = false,
}: {
  children: ReactNode
  adminOnly?: boolean
  builderOnly?: boolean
}) {
  const token = getAuthToken()
  if (!token) return <Navigate to="/login" replace />
  if (adminOnly && !currentUserIsAdmin()) return <Navigate to="/home" replace />
  if (builderOnly && currentUserIsAdmin()) return <Navigate to="/admin" replace />
  return children
}

function SessionBootstrap({ children }: { children: ReactNode }) {
  const navigate = useNavigate()

  useEffect(() => {
    const onExpired = () => forceLocalLogout(navigate)
    useSiteStore.getState().onSessionExpired = onExpired
    useFollowUpStore.getState().onSessionExpired = onExpired
  }, [navigate])

  return children
}

export function AppRouter() {
  return (
    <BrowserRouter basename="/greenvelly">
      <SessionBootstrap>
        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          <Route
            path="/home"
            element={
              <RequireAuth builderOnly>
                <BuilderTabLayout />
              </RequireAuth>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="inquiries" element={<InquiriesPage />} />
            <Route path="follow-ups" element={<FollowUpsPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          <Route path="/add-site" element={<RequireAuth builderOnly><AddSitePage /></RequireAuth>} />
          <Route path="/add-inquiry" element={<RequireAuth builderOnly><AddInquiryPage /></RequireAuth>} />
          <Route path="/site-documents" element={<RequireAuth builderOnly><SiteDocumentsPage /></RequireAuth>} />
          <Route path="/site-photos" element={<RequireAuth builderOnly><SitePhotosPage /></RequireAuth>} />
          <Route path="/document-viewer" element={<RequireAuth><DocumentViewerPage /></RequireAuth>} />
          <Route path="/inquiry/:id" element={<RequireAuth builderOnly><InquiryDetailPage /></RequireAuth>} />
          <Route path="/inquiry/:id/edit" element={<RequireAuth builderOnly><EditInquiryPage /></RequireAuth>} />
          <Route path="/edit-profile" element={<RequireAuth><EditProfilePage /></RequireAuth>} />
          <Route path="/my-projects" element={<RequireAuth><MyProjectsPage /></RequireAuth>} />
          <Route path="/notifications" element={<RequireAuth><NotificationsPage /></RequireAuth>} />
          <Route path="/privacy-security" element={<RequireAuth><PrivacySecurityPage /></RequireAuth>} />
          <Route path="/reports" element={<RequireAuth><ReportsPage /></RequireAuth>} />
          <Route path="/pipeline" element={<RequireAuth><PipelinePage /></RequireAuth>} />
          <Route path="/projects" element={<RequireAuth><ProjectsPage /></RequireAuth>} />

          <Route
            path="/admin"
            element={
              <RequireAuth adminOnly>
                <AdminTabLayout />
              </RequireAuth>
            }
          >
            <Route index element={<SuperAdminAccountsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="more" element={<SuperAdminMorePage />} />
          </Route>

          <Route path="/admin/builder/new" element={<RequireAuth adminOnly><SuperAdminBuilderFormPage /></RequireAuth>} />
          <Route path="/admin/builder/:id/edit" element={<RequireAuth adminOnly><SuperAdminBuilderFormPage /></RequireAuth>} />
          <Route path="/admin/builder/:builderId/sites" element={<RequireAuth adminOnly><SuperAdminBuilderSitesPage /></RequireAuth>} />
          <Route path="/admin/site/:siteId/dashboard" element={<RequireAuth adminOnly><SuperAdminSiteDashboardPage /></RequireAuth>} />
          <Route path="/admin/site/:siteId/inquiries" element={<RequireAuth adminOnly><SuperAdminInquiryDataPage /></RequireAuth>} />
          <Route path="/admin/site/:siteId/documents" element={<RequireAuth adminOnly><SuperAdminSiteDocumentsPage /></RequireAuth>} />
          <Route path="/admin/site/:siteId/photos" element={<RequireAuth adminOnly><SuperAdminSitePhotosPage /></RequireAuth>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SessionBootstrap>
    </BrowserRouter>
  )
}
