import Image from 'next/image';

export default function TechnologiesSection({ title, technologies }) {
  return (
    <section className="pt-10 pb-6 md:pt-14 md:pb-8 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0f172a] mb-8 md:mb-10">
          {title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="bg-white rounded-2xl p-8 flex flex-col items-center justify-center shadow-[0_4px_25px_rgba(0,0,0,0.06)] border-t-[4px] border-[#0066ff] hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-shadow duration-300 min-h-[220px]"
            >
              <div className="mb-6 flex items-center justify-center h-14">
                {tech.iconUrl ? (
                  <Image
                    src={tech.iconUrl}
                    alt={tech.name}
                    width={56}
                    height={56}
                    className="h-14 w-14 object-contain"
                  />
                ) : (
                  tech.icon
                )}
              </div>
              <h3 className="text-[#60a5fa] font-bold text-[18px] md:text-[20px] text-center">
                {tech.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
