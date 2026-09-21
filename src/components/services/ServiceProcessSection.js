import { Check, ClipboardList, Code2, Rocket } from 'lucide-react';
import ServiceSection from '@/components/services/ServiceSection';
import ServiceSectionHeader from '@/components/services/ServiceSectionHeader';
import {
  SERVICE_BODY,
  SERVICE_CARD_TITLE,
  SERVICE_EYEBROW,
} from '@/components/services/servicePageLayout';

const DEFAULT_ICONS = [ClipboardList, Code2, Rocket];

function ProcessIcon({ Icon }) {
  return (
    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full nexuron-brand-gradient text-white shadow-[0_8px_24px_-6px_rgba(0,114,255,0.45)] ring-[5px] ring-slate-50">
      <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
    </div>
  );
}

function ProcessStepContent({ step, index, Icon }) {
  const phase = String(index + 1).padStart(2, '0');

  return (
    <div className="w-full text-left">
      <ProcessIcon Icon={Icon} />

      <span
        className={`${SERVICE_EYEBROW} relative z-10 mt-5 mb-2 block text-sm font-bold tracking-[0.08em]`}
      >
        {phase}
      </span>

      <h3 className={`${SERVICE_CARD_TITLE} relative z-10 mb-3 text-lg leading-snug md:text-xl`}>
        {step.title}
      </h3>

      <p className={`${SERVICE_BODY} relative z-10 w-full text-sm leading-relaxed md:text-[15px]`}>
        {step.description}
      </p>

      {step.deliverables?.length ? (
        <ul className="relative z-10 mt-5 w-full space-y-2">
          {step.deliverables.map((item) => (
            <li key={item} className="flex items-start gap-2 text-xs text-slate-600 md:text-sm">
              <Check
                className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#0072ff]"
                strokeWidth={2.5}
                aria-hidden
              />
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default function ServiceProcessSection({
  eyebrow = 'How we work',
  title,
  description,
  steps = [],
  headerAlign = 'left',
  bg = 'muted',
}) {
  const headingId = 'service-process-heading';

  return (
    <ServiceSection bg={bg} ariaLabelledBy={headingId}>
      <ServiceSectionHeader
        id={headingId}
        eyebrow={eyebrow}
        title={title}
        description={description}
        align={headerAlign}
        wide
        className="mb-12 lg:mb-16"
      />

      {/* Desktop & tablet — horizontal dotted path through left-aligned icons */}
      <div className="relative hidden md:block">
        <ol className="relative grid list-none grid-cols-3 gap-6 lg:gap-10">
          {steps.map((step, index) => {
            const Icon = step.icon || DEFAULT_ICONS[index] || ClipboardList;
            const isLast = index === steps.length - 1;

            return (
              <li key={step.title} className="relative flex flex-col items-start">
                {!isLast ? (
                  <span
                    className="pointer-events-none absolute top-7 left-14 z-0 hidden h-px w-[calc(100%-2rem)] border-t-2 border-dashed border-[#0072ff]/35 md:block lg:w-[calc(100%-1rem)]"
                    aria-hidden
                  />
                ) : null}

                <ProcessStepContent step={step} index={index} Icon={Icon} />
              </li>
            );
          })}
        </ol>
      </div>

      {/* Mobile — vertical timeline; content reads left-aligned beside each icon */}
      <ol className="relative list-none space-y-10 md:hidden">
        {steps.map((step, index) => {
          const Icon = step.icon || DEFAULT_ICONS[index] || ClipboardList;
          const isLast = index === steps.length - 1;

          return (
            <li key={step.title} className="relative pl-14 text-left">
              {!isLast ? (
                <span
                  className="absolute top-14 bottom-0 left-[27px] w-px border-l-2 border-dashed border-[#0072ff]/30"
                  aria-hidden
                />
              ) : null}

              <div className="absolute left-0 top-0">
                <ProcessIcon Icon={Icon} />
              </div>

              <div className="pt-1">
                <span className={`${SERVICE_EYEBROW} mb-2 block text-sm font-bold`}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className={`${SERVICE_CARD_TITLE} mb-2 text-lg`}>{step.title}</h3>
                <p className={`${SERVICE_BODY} text-sm leading-relaxed`}>{step.description}</p>

                {step.deliverables?.length ? (
                  <ul className="mt-4 space-y-2">
                    {step.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                        <Check
                          className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#0072ff]"
                          strokeWidth={2.5}
                          aria-hidden
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </ServiceSection>
  );
}
