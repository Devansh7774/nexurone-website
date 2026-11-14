import IndustryPage from '@/components/industry/IndustryPage';
import { auditPageMetadata } from '@/lib/auditMetadata';

export const metadata = auditPageMetadata('/industry/real-estate');

export default function Page() {
  return <IndustryPage slug="real-estate" />;
}
