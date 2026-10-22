import AiDevelopmentServicePage from '@/components/services/AiDevelopmentServicePage';
import { serviceAuditMetadata } from '@/lib/auditMetadata';

export const metadata = serviceAuditMetadata('llm-integration');

export default function Page() {
  return <AiDevelopmentServicePage slug="llm-integration" />;
}
