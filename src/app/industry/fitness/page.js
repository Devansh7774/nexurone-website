import IndustryPage from '@/components/industry/IndustryPage';
import { auditPageMetadata } from '@/lib/auditMetadata';

export const metadata = auditPageMetadata('/industry/fitness');

export default function Page() {
  return <IndustryPage slug="fitness" />;
}
