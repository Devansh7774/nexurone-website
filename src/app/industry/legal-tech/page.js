import IndustryPage from '@/components/industry/IndustryPage';
import { auditPageMetadata } from '@/lib/auditMetadata';

export const metadata = auditPageMetadata('/industry/legal-tech');

export default function Page() {
  return <IndustryPage slug="legal-tech" />;
}
