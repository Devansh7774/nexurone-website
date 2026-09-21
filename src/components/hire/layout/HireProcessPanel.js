import { ClipboardList, Users, Rocket, ArrowRight } from 'lucide-react';
import {
  HIRE_SHELL,
  HIRE_SECTION,
  HIRE_BADGE,
  HIRE_TITLE,
  HIRE_BG,
} from '@/components/hire/layout/hirePageTokens';

const STEP_ICONS = [ClipboardList, Users, Rocket];

const PROCESS_CARD =
  'flex flex-col rounded-[16px] border border-gray-100 bg-white p-7 shadow-sm transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] lg:p-8';

export default function HireProcessPanel({
  bg = 'muted',
  badge = 'Our Process',
  title = 'How Hiring Works',
  subtitle = 'A straightforward path from requirement to a developer working in your codebase — typically within 48–72 hours.',
  steps = [],
}) {
  return (
    <section className={`${HIRE_SECTION} ${HIRE_BG[bg] ?? HIRE_BG.muted}`}>
      <div className={HIRE_SHELL}>
        {/* Header */}
        <div className="mb-12 max-w-2xl lg:mb-14">
          <span className={HIRE_BADGE}>{badge}</span>
          <h2 className={`${HIRE_TITLE} mt-5 text-balance`}>{title}</h2>
          {subtitle && (
            <p className="mt-4 text-[16px] leading-relaxed text-gray-600">{subtitle}</p>
          )}
        </div>

        <div className="hidden w-full items-stretch md:flex md:gap-5 lg:gap-6">
          {steps.map((step, index) => {
            const Icon = STEP_ICONS[index] || ClipboardList;
            const isLast = index === steps.length - 1;

            return (
              <div key={step.title} className="contents">
                <article className={`${PROCESS_CARD} flex-1`}>
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#E6F0FF] text-[#2563eb]">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <span className="text-[12px] font-bold uppercase tracking-wide text-[#2563eb]">
                      Step {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="mb-3 text-[18px] font-bold leading-snug text-[#0F172A]">
                    {step.title}
                  </h3>
                  <p className="flex-1 text-[14px] leading-[1.75] text-gray-500">{step.description}</p>
                </article>

                {!isLast && (
                  <div className="flex flex-shrink-0 items-center" aria-hidden>
                    <ArrowRight className="h-5 w-5 text-[#2563eb]/40" strokeWidth={2} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile — stacked cards */}
        <ol className="w-full space-y-5 md:hidden">
          {steps.map((step, index) => {
            const Icon = STEP_ICONS[index] || ClipboardList;

            return (
              <li key={step.title}>
                <article className={PROCESS_CARD}>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#E6F0FF] text-[#2563eb]">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <span className="text-[12px] font-bold uppercase tracking-wide text-[#2563eb]">
                      Step {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mb-2 text-[17px] font-bold text-[#0F172A]">{step.title}</h3>
                  <p className="text-[14px] leading-[1.75] text-gray-500">{step.description}</p>
                </article>
              </li>
            );
          })}
        </ol>

        {/* Onboarding callout */}
        <div className="mt-10 flex md:mt-12">
          <p className="rounded-full bg-[#E6F0FF] px-5 py-2.5 text-left text-[13px] font-medium text-[#0A2640] sm:text-[14px]">
            Average onboarding:{' '}
            <span className="font-bold text-[#2563eb]">48–72 hours</span>
          </p>
        </div>
      </div>
    </section>
  );
}
