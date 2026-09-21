import Image from 'next/image';
import {
  HIRE_SHELL,
  HIRE_SECTION,
  HIRE_BG,
} from '@/components/hire/layout/hirePageTokens';

export default function HireTechStack({
  bg = 'white',
  badge = 'Tech Stack',
  title = 'Technologies Our Developers Work With',
  technologies = [],
}) {
  return (
    <section className={`${HIRE_SECTION} ${HIRE_BG[bg] ?? HIRE_BG.white}`}>
      <div className={HIRE_SHELL}>
        <div className="mb-12 max-w-2xl lg:mb-14">
          <span className="inline-block rounded-md bg-[#E6F0FF] px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-[#0A2640]">
            {badge}
          </span>
          <h2 className="mt-5 max-w-3xl text-balance text-[30px] font-bold leading-[1.2] text-[#020617] md:text-[38px] lg:text-[42px]">
            {title}
          </h2>
        </div>

        <div className="grid w-full grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 lg:gap-y-10">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="flex w-full max-w-[120px] flex-col items-start"
            >
              <div className="flex h-9 w-9 items-center justify-center sm:h-10 sm:w-10">
                {tech.iconUrl ? (
                  <Image
                    src={tech.iconUrl}
                    alt={tech.name}
                    width={36}
                    height={36}
                    className="h-8 w-8 object-contain sm:h-9 sm:w-9"
                  />
                ) : (
                  tech.icon
                )}
              </div>

              <p className="mt-2.5 w-full text-left text-[13px] font-medium leading-snug text-[#374151] sm:text-[14px]">
                {tech.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
