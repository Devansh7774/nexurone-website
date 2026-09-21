import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, Shield, Users } from 'lucide-react';
import {
  HIRE_SHELL,
  HIRE_BADGE_DARK,
  HIRE_TITLE_LIGHT,
} from '@/components/hire/layout/hirePageTokens';

const QUICK_STATS = [
  { icon: Clock, label: '48–72 hr onboarding' },
  { icon: Users, label: 'Pre-vetted developers' },
  { icon: Shield, label: 'Interview before hire' },
];

export default function HireHero({
  badge = 'Hire Developers',
  title,
  description,
  image,
  imageAlt,
  primaryHref = '/contact',
  primaryLabel = 'Hire a Developer',
  secondaryHref = '#hire-inquiry',
  secondaryLabel = 'Get a Free Quote',
}) {
  return (
    <section className="relative overflow-hidden bg-[#152033]">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 70% 40%, rgba(37,99,235,0.35) 0%, transparent 70%)',
        }}
      />

      <div className={`${HIRE_SHELL} relative z-10`}>
        <div className="grid items-center gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
          {/* Left — copy */}
          <div>
            <span className={HIRE_BADGE_DARK}>{badge}</span>
            <h1 className={`${HIRE_TITLE_LIGHT} mt-6 text-balance`}>{title}</h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-gray-300">{description}</p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href={primaryHref}
                className="nexuron-cta-btn inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-8 py-3.5 text-[16px] font-semibold text-white"
              >
                <span className="relative z-[1]">{primaryLabel}</span>
                <ArrowRight className="relative z-[1] h-5 w-5" strokeWidth={2} />
              </Link>
              <Link
                href={secondaryHref}
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/25 px-8 py-3.5 text-[15px] font-medium text-white transition-colors hover:border-white/50 hover:bg-white/5"
              >
                {secondaryLabel}
              </Link>
            </div>

            <ul className="mt-12 flex flex-col gap-4 sm:flex-row sm:gap-8">
              {QUICK_STATS.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2.5 text-sm text-gray-400">
                  <Icon className="h-4 w-4 flex-shrink-0 text-[#60a5fa]" strokeWidth={2} />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — visual */}
          <div className="relative mx-auto w-full max-w-[520px] lg:max-w-none">
            <div className="relative aspect-square overflow-hidden rounded-[24px] bg-[#1e293b] lg:aspect-[4/5]">
              <Image
                src={image}
                alt={imageAlt}
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 90vw, 520px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#152033]/80 via-transparent to-transparent" />
            </div>

            {/* Floating developer card */}
            <div className="absolute -bottom-6 -left-4 w-[calc(100%-2rem)] max-w-[320px] rounded-[16px] border border-white/10 bg-[#1e293b]/95 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-md sm:-left-6">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full nexuron-brand-gradient text-sm font-bold text-white">
                  JS
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Senior JavaScript Developer</p>
                  <p className="text-xs text-gray-400">Available for dedicated hire</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {['React', 'Node.js', 'TypeScript', 'APIs'].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md bg-white/10 px-2.5 py-1 text-[11px] font-medium text-gray-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
