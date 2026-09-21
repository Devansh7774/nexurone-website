export default function ProcessSection({ title, processes }) {
  return (
    <section className="pt-10 pb-8 md:pt-14 md:pb-10 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0f172a] mb-8 md:mb-10">
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {processes.map((process) => (
            <div
              key={process.title}
              className="bg-white rounded-2xl p-8 shadow-[0_4px_25px_rgba(0,0,0,0.06)] border-t-[4px] border-[#0066ff] h-full hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-shadow duration-300"
            >
              <h3 className="text-xl md:text-[22px] font-bold text-black mb-4 leading-tight">
                {process.title}
              </h3>
              <p className="text-gray-500 text-[15px] leading-relaxed">
                {process.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
