import ServiceSection from '@/components/services/ServiceSection';
import ServiceSectionHeader from '@/components/services/ServiceSectionHeader';

export default function ServiceFaqShell({ description, children, bg = 'white' }) {
  const headingId = 'service-faq-heading';

  return (
    <ServiceSection bg={bg} ariaLabelledBy={headingId}>
      <ServiceSectionHeader
        id={headingId}
        eyebrow="FAQ"
        title="Common questions"
        description={description}
        wide
      />

      <div className="w-full space-y-3">{children}</div>
    </ServiceSection>
  );
}
