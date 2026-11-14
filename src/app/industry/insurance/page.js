import IndustryPage from '@/components/industry/IndustryPage';
import { auditPageMetadata } from '@/lib/auditMetadata';

export const metadata = auditPageMetadata('/industry/insurance');

export default function Page() {
  return <IndustryPage slug="insurance" />;
}
