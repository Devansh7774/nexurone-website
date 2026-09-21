import {
  HIRE_SHELL,
  HIRE_SECTION,
  HIRE_BADGE,
  HIRE_TITLE,
  HIRE_BG,
} from '@/components/hire/layout/hirePageTokens';

export default function HireSkillsGrid({
  bg = 'muted',
  badge = 'Capabilities',
  title = 'What Our Developers Build',
  subtitle = 'From greenfield products to legacy modernization — depth across the JavaScript ecosystem.',
  skills = [],
}) {
  return (
    <section className={`${HIRE_SECTION} ${HIRE_BG[bg] ?? HIRE_BG.muted}`}>
      <div className={HIRE_SHELL}>
        <div className="mb-12 max-w-2xl">
          <span className={HIRE_BADGE}>{badge}</span>
          <h2 className={`${HIRE_TITLE} mt-5`}>{title}</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-gray-600">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {skills.map((skill, index) => (
            <div
              key={skill.title}
              className="group relative overflow-hidden rounded-[16px] bg-white p-7 shadow-sm transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
            >
              <span className="mb-4 block text-[13px] font-bold tracking-widest text-[#2563eb]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mb-3 text-[19px] font-bold leading-snug text-[#020617]">{skill.title}</h3>
              <p className="text-[14.5px] leading-relaxed text-gray-500">{skill.description}</p>
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#2563eb] to-[#4f46e5] transition-all duration-300 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
