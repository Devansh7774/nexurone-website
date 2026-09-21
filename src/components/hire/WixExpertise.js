export default function WixExpertise() {
  const expertise = [
    {
      title: "Custom Wix Website Development",
      description: "Build fully customized websites aligned with your brand identity."
    },
    {
      title: "Wix Design & Redesign",
      description: "Create or revamp websites with modern, high-converting designs."
    },
    {
      title: "Wix Velo Development",
      description: "Develop custom functionalities using Velo by Wix."
    },
    {
      title: "eCommerce Development on Wix",
      description: "Build secure and scalable online stores using Wix eCommerce."
    },
    {
      title: "Wix SEO Optimization",
      description: "Improve website visibility and ranking on search engines."
    },
    {
      title: "Website Maintenance & Support",
      description: "Ensure smooth performance with ongoing updates and support."
    }
  ];

  const models = [
    {
      title: "Dedicated Wix Developer",
      description: "Your Wix expert. Your timezone. Your roadmap. A full-time Wix developer embedded exclusively in your team aligned to your sprint cycles, codebase standards, and long-term product goals."
    },
    {
      title: "Hourly Hiring",
      description: "Pay only for what you need nothing more. Ideal for audits, feature sprints, or short-term bandwidth gaps. Bring in a senior Wix engineer exactly when the work demands it."
    },
    {
      title: "Fixed Cost Project",
      description: "A guaranteed delivery. Perfect for well-scoped Wix builds where predictability matters. Fixed timeline, fixed budget, zero surprise invoices."
    }
  ];

  return (
    <div className="bg-[#fafafa] py-10 md:py-14">
      {/* Expertise Section */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mb-10 md:mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 md:mb-10">
          Our Wix Development Expertise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {expertise.map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-[0_4px_25px_rgba(0,0,0,0.06)] border-t-[4px] border-[#0066ff] h-full hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-shadow duration-300"
            >
              <h3 className="text-xl md:text-[22px] font-bold text-black mb-4 leading-tight pr-4">
                {item.title}
              </h3>
              <p className="text-gray-500 text-[15px] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Hiring Models Section */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 md:mb-10">
          Flexible Hiring Models
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {models.map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-[0_4px_25px_rgba(0,0,0,0.06)] border-t-[4px] border-[#0066ff] h-full hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-shadow duration-300"
            >
              <h3 className="text-xl md:text-[22px] font-bold text-black mb-4">
                {item.title}
              </h3>
              <p className="text-gray-500 text-[15px] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
