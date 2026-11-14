import Image from 'next/image';
import ServiceSection from '@/components/services/ServiceSection';
import ServiceSectionHeader from '@/components/services/ServiceSectionHeader';

export default function IndustryVisualMosaic({
  industryName,
  visuals = [],
  bg = 'muted',
}) {
  if (!visuals.length) return null;

  const headingId = 'industry-visual-mosaic-heading';

  return (
    <ServiceSection bg={bg} ariaLabelledBy={headingId}>
      <ServiceSectionHeader
        id={headingId}
        eyebrow="In the field"
        title={`Where ${industryName.toLowerCase()} technology shows up`}
        description="Scenes from the environments, teams, and workflows these products are built to support."
        wide
      />

      <div
        className={`grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6 ${
          visuals.length > 4 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
        }`}
      >
        {visuals.map((item) => (
          <figure key={item.label} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
              <Image
                src={item.src}
                alt={item.alt || item.label}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <figcaption className="px-4 py-3 text-sm font-semibold text-slate-800">
              {item.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </ServiceSection>
  );
}
