import IndustryPage from '@/components/industry/IndustryPage';
import { auditPageMetadata } from '@/lib/auditMetadata';

export const metadata = auditPageMetadata('/industry/construction');

export default function Page() {
  return <IndustryPage slug="construction" />;
}
