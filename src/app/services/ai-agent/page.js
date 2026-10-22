import AiDevelopmentServicePage from '@/components/services/AiDevelopmentServicePage';
import { serviceAuditMetadata } from '@/lib/auditMetadata';

export const metadata = serviceAuditMetadata('ai-agent');

export default function Page() {
  return <AiDevelopmentServicePage slug="ai-agent" />;
}
