import ServiceSection from '@/components/services/ServiceSection';
import ServiceSectionHeader from '@/components/services/ServiceSectionHeader';
import {
  SERVICE_BODY,
  SERVICE_CARD,
  SERVICE_CARD_TITLE,
} from '@/components/services/servicePageLayout';

export default function ServiceSolutionsGrid({
  eyebrow,
  title,
  description,
  solutions = [],
  bg = 'white',
}) {
  const headingId = 'service-solutions-heading';

  return (
    <ServiceSection bg={bg} ariaLabelledBy={headingId}>
      <ServiceSectionHeader
        id={headingId}
        eyebrow={eyebrow}
        title={title}
        description={description}
        wide
      />

      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        {solutions.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.title}
              className={`${SERVICE_CARD} grid gap-6 sm:grid-cols-[auto_1fr] sm:items-start`}
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white"
                aria-hidden
              >
                <Icon className="h-6 w-6" strokeWidth={1.75} />
              </div>

              <div>
                <h3 className={`${SERVICE_CARD_TITLE} mb-2`}>{item.title}</h3>
                <p className={`${SERVICE_BODY} mb-4`}>{item.description}</p>

                {item.examples?.length ? (
                  <ul className="flex flex-wrap gap-2">
                    {item.examples.map((example) => (
                      <li
                        key={example}
                        className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
                      >
                        {example}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </ServiceSection>
  );
}
