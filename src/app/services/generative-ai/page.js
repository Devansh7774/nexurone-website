import AiDevelopmentServicePage from '@/components/services/AiDevelopmentServicePage';
import { serviceAuditMetadata } from '@/lib/auditMetadata';

export const metadata = serviceAuditMetadata('generative-ai');

export default function Page() {
  return <AiDevelopmentServicePage slug="generative-ai" />;
}
