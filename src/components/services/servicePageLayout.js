/** Design system tokens for /services/* pages — aligned with site max-width 1340px. */

export const SERVICE_PAGE = '';

/** Primary page container — matches PageHero, Header, Footer */
export const SERVICE_SHELL = 'mx-auto w-full max-w-[1340px] px-4 sm:px-6 lg:px-8';

/** Optimal line length for body copy (~65 characters) */
export const SERVICE_PROSE = 'max-w-[42rem]';

/** Section intro headings — readable width without constraining grids */
export const SERVICE_HEADER = 'max-w-[48rem]';

/** FAQ and narrow content blocks */
export const SERVICE_NARROW = 'mx-auto w-full max-w-[52rem]';

/** @deprecated use SERVICE_SHELL — grids should span full shell width */
export const SERVICE_WIDE = 'w-full';

export const SERVICE_CONTENT = SERVICE_PROSE;

export const SERVICE_TEXT = SERVICE_NARROW;

export const SERVICE_SECTION = 'py-20 lg:py-24';

export const SERVICE_EYEBROW =
  'text-xs font-semibold uppercase tracking-[0.12em] text-[#0072ff]';

export const SERVICE_H2 =
  'text-3xl font-bold tracking-tight text-slate-900 text-balance md:text-4xl lg:text-[2.75rem]';

export const SERVICE_LEAD =
  'text-lg leading-relaxed text-slate-600 md:text-xl md:leading-relaxed';

export const SERVICE_BODY =
  'text-base leading-7 text-slate-600';

export const SERVICE_CARD_TITLE =
  'text-lg font-semibold text-slate-900';

export const SERVICE_CARD =
  'rounded-xl border border-slate-200 bg-white p-6 lg:p-8';

export const SERVICE_CARD_GRID =
  'grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8';

export const SERVICE_BENEFIT_GRID =
  'grid w-full grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2';

/** @deprecated */
export const SERVICE_HEADING = SERVICE_H2;

/** @deprecated */
export const SERVICE_BADGE = SERVICE_EYEBROW;

/** @deprecated */
export const SERVICE_TITLE = SERVICE_H2;

/** @deprecated */
export const SERVICE_INTRO = SERVICE_LEAD;

export const SERVICE_PROCESS_WRAP = 'w-full';

export const SERVICE_PROCESS_STEP_CONNECTOR =
  'pointer-events-none absolute top-6 left-1/2 z-0 hidden h-px w-[calc(100%+1.5rem)] bg-slate-200 md:block md:w-[calc(100%+2rem)]';

export const SERVICE_FEATURES_GRID =
  'grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8';
