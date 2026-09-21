import Image from 'next/image';
import ServiceSection from '@/components/services/ServiceSection';
import {
  SERVICE_BODY,
  SERVICE_CARD_TITLE,
  SERVICE_EYEBROW,
  SERVICE_H2,
  SERVICE_LEAD,
} from '@/components/services/servicePageLayout';

function OverviewServiceCard({ icon: Icon, title, description }) {
  return (
    <article className="flex gap-3.5 rounded-xl border border-slate-200 bg-white p-4 transition-shadow hover:shadow-[0_8px_24px_-8px_rgba(0,114,255,0.12)] sm:p-5">
      <div
        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#EEF3FF] text-[#0072ff]"
        aria-hidden
      >
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className={`${SERVICE_CARD_TITLE} mb-1.5 text-base`}>{title}</h3>
        <div className="nexuron-brand-gradient mb-2 h-0.5 w-8 rounded-full" aria-hidden />
        <p className={`${SERVICE_BODY} text-sm leading-relaxed`}>{description}</p>
      </div>
    </article>
  );
}

export default function ServiceOverview({
  eyebrow,
  title,
  titleHighlight,
  description,
  imageSrc,
  imageAlt,
  items = [],
  bg = 'white',
}) {
  const headingId = 'service-overview-heading';
  const highlightIndex =
    titleHighlight && title
      ? title.toLowerCase().indexOf(titleHighlight.toLowerCase())
      : -1;
  const hasHighlight = highlightIndex >= 0;
  const titleBefore = hasHighlight ? title.slice(0, highlightIndex) : title;
  const titleHighlightText = hasHighlight
    ? title.slice(highlightIndex, highlightIndex + titleHighlight.length)
    : '';
  const titleAfter = hasHighlight
    ? title.slice(highlightIndex + titleHighlight.length)
    : '';

  return (
    <ServiceSection bg={bg} ariaLabelledBy={headingId}>
      <header className="mb-10 w-full text-left lg:mb-12">
        {eyebrow ? <p className={`${SERVICE_EYEBROW} mb-3`}>{eyebrow}</p> : null}

        <h2 id={headingId} className={`${SERVICE_H2} text-slate-900`}>
          {hasHighlight ? (
            <>
              {titleBefore}
              <span className="bg-gradient-to-r from-[#00d2ff] via-[#0099ff] to-[#0072ff] bg-clip-text text-transparent">
                {titleHighlightText}
              </span>
              {titleAfter}
            </>
          ) : (
            title
          )}
        </h2>

        {hasHighlight ? (
          <div className="nexuron-brand-gradient mt-4 h-0.5 w-16 rounded-full" aria-hidden />
        ) : null}

        {description ? (
          <p className={`${SERVICE_LEAD} mt-4 w-full text-slate-600`}>{description}</p>
        ) : null}
      </header>

      <div className="grid w-full items-stretch gap-8 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-10 xl:grid-cols-[minmax(0,340px)_1fr] xl:gap-12">
        {imageSrc ? (
          <div className="w-full max-w-[320px] lg:max-w-none lg:h-full">
            <div className="relative flex h-full min-h-[320px] flex-col rounded-[2.5rem_4rem_2rem_3.5rem] bg-white p-3 shadow-[0_16px_48px_-20px_rgba(0,114,255,0.22)] sm:min-h-[360px] lg:min-h-0">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-0.5 -top-0.5 h-[42%] w-[48%] rounded-tr-[3.5rem] border-r-2 border-t-2 border-dashed border-[#0072ff]/30"
              />
              <div className="relative min-h-[300px] flex-1 overflow-hidden rounded-[1.75rem_3rem_1.5rem_2.75rem] sm:min-h-[340px]">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 320px, 340px"
                />
              </div>
            </div>
          </div>
        ) : null}

        {items.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            {items.map((item) => (
              <OverviewServiceCard key={item.title} {...item} />
            ))}
          </div>
        ) : null}
      </div>
    </ServiceSection>
  );
}
