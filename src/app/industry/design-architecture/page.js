import IndustryPage from '@/components/industry/IndustryPage';
import { auditPageMetadata } from '@/lib/auditMetadata';

export const metadata = auditPageMetadata('/industry/design-architecture');

export default function Page() {
  return <IndustryPage slug="design-architecture" />;
}
