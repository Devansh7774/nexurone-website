import AiDevelopmentServicePage from '@/components/services/AiDevelopmentServicePage';
import { serviceAuditMetadata } from '@/lib/auditMetadata';

export const metadata = serviceAuditMetadata('rag-knowledge-bots');

export default function Page() {
  return <AiDevelopmentServicePage slug="rag-knowledge-bots" />;
}
