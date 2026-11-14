import Image from 'next/image';
import Link from 'next/link';
import ServiceSection from '@/components/services/ServiceSection';
import ServiceSectionHeader from '@/components/services/ServiceSectionHeader';
import { getCaseStudy } from '@/lib/caseStudies';
import {
  SERVICE_BODY,
  SERVICE_CARD,
  SERVICE_CARD_TITLE,
} from '@/components/services/servicePageLayout';

export default function IndustryCaseStudiesSection({
  industryName,
  caseStudySlugs = [],
  bg = 'white',
}) {
  const studies = caseStudySlugs
    .map((slug) => {
      const study = getCaseStudy(slug);
      if (!study) return null;
      return { slug, ...study };
    })
    .filter(Boolean);

  if (!studies.length) return null;

  const headingId = 'industry-case-studies-heading';

  return (
    <ServiceSection bg={bg} ariaLabelledBy={headingId}>
      <ServiceSectionHeader
        id={headingId}
        eyebrow="Case studies"
        title={`Work we have delivered in ${industryName.toLowerCase()}`}
        description="Real projects from our portfolio. Open a case study for the full story."
        wide
      />

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
        {studies.map((study) => (
          <Link
            key={study.slug}
            href={`/case-study/${study.slug}`}
            className={`${SERVICE_CARD} group block overflow-hidden p-0 transition-shadow hover:shadow-md`}
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
              <Image
                src={study.heroImage}
                alt={study.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-6 lg:p-8">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#0072ff]">
                {study.tag}
              </p>
              <h3 className={`${SERVICE_CARD_TITLE} mb-2 group-hover:text-blue-600`}>
                {study.title}
              </h3>
              <p className={`${SERVICE_BODY} line-clamp-3`}>
                {study.intro?.[0] ?? study.projectInfo?.industry ?? ''}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </ServiceSection>
  );
}
