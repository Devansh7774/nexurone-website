import ServiceSection from '@/components/services/ServiceSection';
import ServiceSectionHeader from '@/components/services/ServiceSectionHeader';
import {
  SERVICE_BODY,
  SERVICE_CARD_TITLE,
} from '@/components/services/servicePageLayout';

export default function ServiceCapabilitiesList({
  eyebrow,
  title,
  description,
  capabilities = [],
}) {
  const headingId = 'service-capabilities-heading';

  return (
    <ServiceSection bg="muted" ariaLabelledBy={headingId}>
      <ServiceSectionHeader
        id={headingId}
        eyebrow={eyebrow}
        title={title}
        description={description}
        wide
      />

      <div className="grid w-full grid-cols-1 gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 md:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((item, index) => (
          <article key={item.title} className="flex flex-col bg-white p-6 lg:p-8">
            <span className="mb-4 text-sm font-bold tabular-nums text-blue-600">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className={`${SERVICE_CARD_TITLE} mb-2`}>{item.title}</h3>
            <p className={`${SERVICE_BODY} flex-1`}>{item.description}</p>
          </article>
        ))}
      </div>
    </ServiceSection>
  );
}
