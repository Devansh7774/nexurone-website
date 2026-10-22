import IndustryPage from '@/components/industry/IndustryPage';
import { auditPageMetadata } from '@/lib/auditMetadata';

export const metadata = auditPageMetadata('/industry/retail-ecommerce');

export default function Page() {
  return <IndustryPage slug="retail-ecommerce" />;
}
