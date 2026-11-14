import IndustryPage from '@/components/industry/IndustryPage';
import { auditPageMetadata } from '@/lib/auditMetadata';

export const metadata = auditPageMetadata('/industry/logistics');

export default function Page() {
  return <IndustryPage slug="logistics" />;
}
