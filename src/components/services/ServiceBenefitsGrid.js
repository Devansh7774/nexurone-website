import ServiceSection from '@/components/services/ServiceSection';
import ServiceSectionHeader from '@/components/services/ServiceSectionHeader';
import {
  SERVICE_BODY,
  SERVICE_CARD,
  SERVICE_CARD_GRID,
  SERVICE_CARD_TITLE,
} from '@/components/services/servicePageLayout';

export default function ServiceBenefitsGrid({
  eyebrow,
  title,
  description,
  benefits = [],
}) {
  const headingId = 'service-benefits-heading';

  return (
    <ServiceSection bg="muted" ariaLabelledBy={headingId}>
      <ServiceSectionHeader
        id={headingId}
        eyebrow={eyebrow}
        title={title}
        description={description}
        wide
      />

      <div className={SERVICE_CARD_GRID}>
        {benefits.map((item) => (
          <article key={item.title} className={`${SERVICE_CARD} h-full`}>
            <h3 className={`${SERVICE_CARD_TITLE} mb-2`}>{item.title}</h3>
            <p className={SERVICE_BODY}>{item.description}</p>
          </article>
        ))}
      </div>
    </ServiceSection>
  );
}
