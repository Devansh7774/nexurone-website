import { getPrivacySecurityUrl } from '@/greenvelly/config/api'
import { PageBackBar } from '@/greenvelly/components/layout/PageBackBar'

export function PrivacySecurityPage() {
  const url = getPrivacySecurityUrl()

  return (
    <div className="page app-shell page-white">
      <PageBackBar title="Privacy & Security" />

      <iframe
        title="Privacy and Security"
        src={url}
        style={{ width: '100%', height: 'calc(100vh - 56px)', border: 'none' }}
      />
    </div>
  )
}
