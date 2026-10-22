import AiDevelopmentServicePage from '@/components/services/AiDevelopmentServicePage';
import { serviceAuditMetadata } from '@/lib/auditMetadata';

export const metadata = serviceAuditMetadata('ai-chatbot');

export default function Page() {
  return <AiDevelopmentServicePage slug="ai-chatbot" />;
}
