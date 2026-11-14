import IndustryPage from '@/components/industry/IndustryPage';
import { auditPageMetadata } from '@/lib/auditMetadata';

export const metadata = auditPageMetadata('/industry/automotive');

export default function Page() {
  return <IndustryPage slug="automotive" />;
}
