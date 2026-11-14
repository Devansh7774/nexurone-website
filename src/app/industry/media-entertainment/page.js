import IndustryPage from '@/components/industry/IndustryPage';
import { auditPageMetadata } from '@/lib/auditMetadata';

export const metadata = auditPageMetadata('/industry/media-entertainment');

export default function Page() {
  return <IndustryPage slug="media-entertainment" />;
}
