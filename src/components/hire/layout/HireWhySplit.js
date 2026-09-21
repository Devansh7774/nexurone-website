import Image from 'next/image';
import {
  HIRE_SHELL,
  HIRE_SECTION,
  HIRE_BADGE,
  HIRE_TITLE,
  HIRE_BG,
} from '@/components/hire/layout/hirePageTokens';
import { HIRE_WHY_SECTION_IMAGE } from '@/lib/serviceHeroImages';

const DEFAULT_BENEFITS = [
  'Experienced JavaScript developers with production track records',
  'Modern ES6+, TypeScript, and framework expertise',
  'Full-stack capability — frontend, backend, and APIs',
  'Performance-focused, accessible, and scalable code',
  'Flexible engagement models to match your budget',
  'Timezone overlap and transparent agile communication',
];

export default function HireWhySplit({
  bg = 'white',
  badge = 'Why Nexuron',
  title = 'Why Hire JavaScript Developers From Us?',
  description = 'We connect you with engineers who integrate into your team — not contractors who disappear after delivery. Every developer is vetted for technical depth, communication, and the discipline to write code that lasts.',
  benefits = DEFAULT_BENEFITS,
  imageSrc = HIRE_WHY_SECTION_IMAGE,
  imageAlt = 'Nexuron development team',
}) {
  return (
    <section className={`${HIRE_SECTION} ${HIRE_BG[bg] ?? HIRE_BG.white}`}>
      <div className={HIRE_SHELL}>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image column */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[20px]">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Experience card overlay — matches AboutUs style */}
            <div className="absolute -bottom-8 -right-4 w-[220px] rounded-[6px] bg-gradient-to-br from-[#2968ED] via-[#3346DF] to-[#3918C4] p-5 text-white shadow-xl sm:-right-8">
              <p className="text-3xl font-bold leading-none">48–72h</p>
              <p className="mt-2 text-sm font-semibold leading-snug">Average time to onboard your developer</p>
            </div>
          </div>

          {/* Content column */}
          <div className="order-1 lg:order-2">
            <span className={HIRE_BADGE}>{badge}</span>
            <h2 className={`${HIRE_TITLE} mt-5 text-balance`}>{title}</h2>
            <p className="mt-5 text-[16px] leading-relaxed text-gray-600">{description}</p>

            <ul className="mt-10 space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3.5">
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#E6F0FF]">
                    <svg
                      className="h-3.5 w-3.5 text-[#2563eb]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[15px] font-medium leading-relaxed text-gray-800">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
