/** Shared admin shell layout + button class tokens (safe for server components). */

export const ADMIN_HEADER_HEIGHT = 'h-16';
export const ADMIN_HEADER_PADDING = 'px-4 sm:px-6';
export const ADMIN_HEADER_CLASS = `${ADMIN_HEADER_HEIGHT} shrink-0 flex w-full items-center`;
export const ADMIN_SIDEBAR_BRAND_CLASS = `${ADMIN_HEADER_HEIGHT} shrink-0 flex w-full items-center justify-between border-b border-slate-800 px-3 sm:px-4`;

export const ADMIN_SHELL_EASE = 'ease-[cubic-bezier(0.32,0.72,0,1)]';
export const ADMIN_SHELL_DURATION = 'duration-500';
export const ADMIN_SHELL_TRANSITION = `transition-all ${ADMIN_SHELL_DURATION} ${ADMIN_SHELL_EASE}`;
export const ADMIN_SHELL_SLIDE_TRANSITION = `transition-[transform,width] ${ADMIN_SHELL_DURATION} ${ADMIN_SHELL_EASE}`;
export const ADMIN_SHELL_MARGIN_TRANSITION = `transition-[margin-left] ${ADMIN_SHELL_DURATION} ${ADMIN_SHELL_EASE}`;
export const ADMIN_SHELL_LEFT_TRANSITION = `transition-[left] ${ADMIN_SHELL_DURATION} ${ADMIN_SHELL_EASE}`;
export const ADMIN_SHELL_FADE_TRANSITION = `transition-opacity ${ADMIN_SHELL_DURATION} ${ADMIN_SHELL_EASE}`;

export const ADMIN_BTN =
  'inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-70';

export const ADMIN_ICON_BTN = `${ADMIN_BTN} w-10 shrink-0 border border-slate-200 px-0 text-slate-600 hover:bg-slate-50 hover:text-slate-900`;

export const ADMIN_ICON = 'h-5 w-5 shrink-0';

export const ADMIN_ICON_SM = 'h-4 w-4 shrink-0';

export const ADMIN_BTN_PRIMARY = `${ADMIN_BTN} text-white nexuron-btn-solid`;

export const ADMIN_BTN_SECONDARY = `${ADMIN_BTN} border border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50`;

export const ADMIN_BTN_GHOST_ON_DARK = `${ADMIN_BTN} bg-white/10 text-white backdrop-blur-sm hover:bg-white/15`;
