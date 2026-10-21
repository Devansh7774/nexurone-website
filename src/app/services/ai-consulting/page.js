import AiDevelopmentServicePage from '@/components/services/AiDevelopmentServicePage';
import { serviceAuditMetadata } from '@/lib/auditMetadata';

export const metadata = serviceAuditMetadata('ai-consulting');

export default function Page() {
  return <AiDevelopmentServicePage slug="ai-consulting" />;
}
