import {
  SERVICE_EYEBROW,
  SERVICE_H2,
  SERVICE_HEADER,
  SERVICE_LEAD,
} from '@/components/services/servicePageLayout';

export default function ServiceSectionHeader({
  id,
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
  wide = false,
}) {
  const isCenter = align === 'center';
  const widthClass = wide ? 'w-full' : SERVICE_HEADER;

  return (
    <header
      className={`mb-12 lg:mb-14 ${widthClass} ${
        isCenter ? 'mx-auto text-center' : ''
      } ${className}`.trim()}
    >
      {eyebrow ? (
        <p className={`${SERVICE_EYEBROW} mb-3`}>{eyebrow}</p>
      ) : null}
      <h2 id={id} className={SERVICE_H2}>
        {title}
      </h2>
      {description ? (
        <p className={`${SERVICE_LEAD} mt-4 max-w-[42rem] ${isCenter ? 'mx-auto' : ''}`}>
          {description}
        </p>
      ) : null}
    </header>
  );
}
