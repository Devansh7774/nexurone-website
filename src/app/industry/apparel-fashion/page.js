import IndustryPage from '@/components/industry/IndustryPage';
import { auditPageMetadata } from '@/lib/auditMetadata';

export const metadata = auditPageMetadata('/industry/apparel-fashion');

export default function Page() {
  return <IndustryPage slug="apparel-fashion" />;
}
