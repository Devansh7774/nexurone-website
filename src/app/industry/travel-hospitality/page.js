import IndustryPage from '@/components/industry/IndustryPage';
import { auditPageMetadata } from '@/lib/auditMetadata';

export const metadata = auditPageMetadata('/industry/travel-hospitality');

export default function Page() {
  return <IndustryPage slug="travel-hospitality" />;
}
