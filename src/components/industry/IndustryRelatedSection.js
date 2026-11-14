import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import ServiceSection from '@/components/services/ServiceSection';
import ServiceSectionHeader from '@/components/services/ServiceSectionHeader';
import { getIndustry } from '@/lib/industries';
import {
  SERVICE_BODY,
  SERVICE_CARD,
  SERVICE_CARD_TITLE,
} from '@/components/services/servicePageLayout';

export default function IndustryRelatedSection({
  industryName,
  relatedSlugs = [],
  bg = 'muted',
}) {
  const related = relatedSlugs
    .map((slug) => getIndustry(slug))
    .filter(Boolean);

  if (!related.length) return null;

  const headingId = 'industry-related-heading';

  return (
    <ServiceSection bg={bg} ariaLabelledBy={headingId}>
      <ServiceSectionHeader
        id={headingId}
        eyebrow="Related industries"
        title={`Where ${industryName.toLowerCase()} work often overlaps`}
        description="Explore adjacent verticals where similar workflows, compliance needs, or customer journeys show up."
        wide
      />

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {related.map((item) => (
          <Link
            key={item.slug}
            href={item.href}
            className={`${SERVICE_CARD} group flex h-full flex-col transition-shadow hover:shadow-md`}
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <h3 className={`${SERVICE_CARD_TITLE} group-hover:text-blue-600`}>
                {item.name}
              </h3>
              <ArrowUpRight
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-slate-400 transition-colors group-hover:text-blue-600"
                aria-hidden
              />
            </div>
            <p className={`${SERVICE_BODY} flex-1`}>{item.description}</p>
          </Link>
        ))}
      </div>
    </ServiceSection>
  );
}
