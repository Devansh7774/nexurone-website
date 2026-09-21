import Link from 'next/link';
import { UserCheck, Clock, FileCheck, ArrowRight } from 'lucide-react';
import {
  HIRE_SHELL,
  HIRE_SECTION,
  HIRE_BADGE,
  HIRE_TITLE,
  HIRE_BG,
} from '@/components/hire/layout/hirePageTokens';

const ICONS = { UserCheck, Clock, FileCheck };

function EngagementOption({ model, index }) {
  const Icon = ICONS[model.icon] || UserCheck;
  const points = model.points ?? [];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[16px] border border-gray-100 bg-white p-7 shadow-sm transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] lg:p-8">
      <span className="mb-4 block text-[13px] font-bold tracking-widest text-[#2563eb]">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E6F0FF] text-[#2563eb]">
          <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
        </div>
        {model.label ? (
          <span className="rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
            {model.label}
          </span>
        ) : null}
      </div>

      <h3 className="mb-3 text-[19px] font-bold leading-snug text-[#020617]">{model.title}</h3>
      <p className="text-[14.5px] leading-relaxed text-gray-500">{model.description}</p>

      {points.length > 0 ? (
        <ul className="mt-5 space-y-2.5">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-2.5 text-[14px] leading-snug text-gray-700">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563eb]"
                aria-hidden
              />
              {point}
            </li>
          ))}
        </ul>
      ) : null}

      {model.bestFor ? (
        <div className="mt-auto pt-6">
          <div className="rounded-xl bg-slate-50 px-4 py-3.5">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#2563eb]">
              Best for
            </p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-gray-700">{model.bestFor}</p>
          </div>
        </div>
      ) : null}

      <div
        className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#2563eb] to-[#4f46e5] transition-all duration-300 group-hover:w-full"
        aria-hidden
      />
    </article>
  );
}

export default function HireEngagementCards({
  bg = 'white',
  badge = 'Engagement Models',
  title = 'How You Can Engage Our Developers',
  subtitle = 'Three flexible ways to bring talent into your team — choose the structure that matches your timeline and how you like to work.',
  models = [],
  ctaHref = '#hire-inquiry',
  ctaLabel = 'Discuss your hiring needs',
}) {
  return (
    <section className={`${HIRE_SECTION} ${HIRE_BG[bg] ?? HIRE_BG.white}`}>
      <div className={HIRE_SHELL}>
        <div className="mb-12 max-w-2xl lg:mb-14">
          <span className={HIRE_BADGE}>{badge}</span>
          <h2 className={`${HIRE_TITLE} mt-5 text-balance`}>{title}</h2>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-gray-600">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6 lg:items-stretch">
          {models.map((model, index) => (
            <EngagementOption key={model.title} model={model} index={index} />
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between lg:mt-12">
          <p className="max-w-xl text-[15px] leading-relaxed text-gray-600">
            Not sure which model fits? We will help you choose based on your team size, timeline,
            and project scope.
          </p>
          <Link
            href={ctaHref}
            className="nexuron-btn-solid inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-md px-6 text-sm font-medium text-white"
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
