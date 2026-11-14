import IndustryPage from '@/components/industry/IndustryPage';
import { auditPageMetadata } from '@/lib/auditMetadata';

export const metadata = auditPageMetadata('/industry/banking-finance');

export default function Page() {
  return <IndustryPage slug="banking-finance" />;
}
