import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import ServiceSection from '@/components/services/ServiceSection';
import ServiceSectionHeader from '@/components/services/ServiceSectionHeader';
import {
  SERVICE_BODY,
  SERVICE_CARD,
  SERVICE_CARD_TITLE,
} from '@/components/services/servicePageLayout';

export default function IndustryHowTechnologyHelps({
  industryName,
  title,
  description,
  points = [],
  imageSrc,
  imageAlt,
  bg = 'muted',
}) {
  if (!points.length && !description) return null;

  const headingId = 'industry-how-tech-helps-heading';

  return (
    <ServiceSection bg={bg} ariaLabelledBy={headingId}>
      <ServiceSectionHeader
        id={headingId}
        eyebrow="How technology helps"
        title={title || `How Nexuron technology helps ${industryName.toLowerCase()} businesses`}
        description={description}
        wide
      />

      <div className={`grid w-full gap-8 lg:gap-12 ${imageSrc ? 'lg:grid-cols-[1.05fr_0.95fr] lg:items-start' : ''}`}>
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          {points.map((item) => (
            <article key={item.title} className={`${SERVICE_CARD} h-full`}>
              <div className="mb-3 flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" aria-hidden />
                <h3 className={SERVICE_CARD_TITLE}>{item.title}</h3>
              </div>
              <p className={SERVICE_BODY}>{item.description}</p>
            </article>
          ))}
        </div>

        {imageSrc ? (
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-slate-100 lg:aspect-auto lg:min-h-[420px]">
            <Image
              src={imageSrc}
              alt={imageAlt || `${industryName} technology in practice`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        ) : null}
      </div>
    </ServiceSection>
  );
}
