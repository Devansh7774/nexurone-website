import ServiceSection from '@/components/services/ServiceSection';
import ServiceSectionHeader from '@/components/services/ServiceSectionHeader';
import { SERVICE_BODY, SERVICE_CARD, SERVICE_CARD_TITLE } from '@/components/services/servicePageLayout';

export default function ServiceDifferentiators({
  eyebrow,
  title,
  description,
  items = [],
  bg = 'white',
}) {
  const headingId = 'service-differentiators-heading';

  return (
    <ServiceSection bg={bg} ariaLabelledBy={headingId}>
      <ServiceSectionHeader
        id={headingId}
        eyebrow={eyebrow}
        title={title}
        description={description}
        wide
        className="mb-12 lg:mb-14"
      />

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.title}
              className={`${SERVICE_CARD} relative overflow-hidden text-left`}
            >
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-50"
                aria-hidden
              />

              <div className="relative mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white md:inline-flex">
                {Icon ? <Icon className="h-6 w-6" strokeWidth={1.75} /> : null}
              </div>

              <h3 className={`${SERVICE_CARD_TITLE} relative mb-3 text-xl`}>{item.title}</h3>
              <p className={`${SERVICE_BODY} relative`}>{item.description}</p>
            </article>
          );
        })}
      </div>
    </ServiceSection>
  );
}
