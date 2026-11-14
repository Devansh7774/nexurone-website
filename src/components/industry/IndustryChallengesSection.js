import { AlertTriangle } from 'lucide-react';
import ServiceSection from '@/components/services/ServiceSection';
import ServiceSectionHeader from '@/components/services/ServiceSectionHeader';
import {
  SERVICE_BODY,
  SERVICE_CARD,
  SERVICE_CARD_TITLE,
} from '@/components/services/servicePageLayout';

export default function IndustryChallengesSection({
  industryName,
  challenges = [],
  description,
  bg = 'white',
}) {
  if (!challenges.length) return null;

  const headingId = 'industry-challenges-heading';

  return (
    <ServiceSection bg={bg} ariaLabelledBy={headingId}>
      <ServiceSectionHeader
        id={headingId}
        eyebrow="Key challenges"
        title={`What holds ${industryName.toLowerCase()} teams back`}
        description={
          description ||
          `These are the operational and customer problems we hear most often in ${industryName.toLowerCase()}, and the ones our products are designed to remove.`
        }
        wide
      />

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
        {challenges.map((item) => (
          <article key={item.title} className={`${SERVICE_CARD} h-full`}>
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
              <AlertTriangle className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </div>
            <h3 className={`${SERVICE_CARD_TITLE} mb-2`}>{item.title}</h3>
            <p className={SERVICE_BODY}>{item.description}</p>
          </article>
        ))}
      </div>
    </ServiceSection>
  );
}
