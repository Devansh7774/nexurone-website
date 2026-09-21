export default function WixProcess() {
  const processes = [
    {
      title: "Requirement Analysis",
      description: "We gather stakeholder needs, define project goals, analyze constraints, document specifications, and align expectations to ensure successful product outcomes."
    },
    {
      title: "Technical Planning & Architecture",
      description: "We design scalable architecture, select appropriate technologies, define coding standards, and create structured plans ensuring maintainable, high-performance Wix applications."
    },
    {
      title: "UI/UX Design Collaboration",
      description: "We collaborate with designers, review wireframes, ensure accessibility, refine interactions, and translate creative concepts into intuitive, responsive interfaces."
    },
    {
      title: "Agile Development",
      description: "We follow agile methodologies, deliver incremental features, conduct daily standups, adapt to feedback, and maintain transparency throughout development cycles."
    },
    {
      title: "Testing & QA",
      description: "We perform unit testing, integration testing, bug tracking, performance optimization, and continuous quality assurance to deliver reliable applications."
    },
    {
      title: "Deployment & Ongoing Support",
      description: "We manage seamless deployments, monitor application performance, resolve issues proactively, provide updates, and ensure long-term stability and scalability."
    }
  ];

  return (
    <section className="pt-10 pb-8 md:pt-14 md:pb-10 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0f172a] mb-8 md:mb-10">
          Our Wix Development Process
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {processes.map((process, index) => (
            <div 
              key={index}
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
