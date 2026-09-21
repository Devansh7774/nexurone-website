import { SERVICE_SECTION, SERVICE_SHELL } from '@/components/services/servicePageLayout';

const BG = {
  white: 'bg-white',
  muted: 'bg-slate-50',
};

export default function ServiceSection({
  id,
  bg = 'white',
  children,
  className = '',
  ariaLabelledBy,
}) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={`${SERVICE_SECTION} ${BG[bg] ?? BG.white} ${className}`.trim()}
    >
      <div className={SERVICE_SHELL}>{children}</div>
    </section>
  );
}
