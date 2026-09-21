import Image from 'next/image';
import { HIRE_WHY_SECTION_IMAGE } from '@/lib/serviceHeroImages';

export default function WhyHireWix() {  const benefits = [
    "Experienced Wix Developers",
    "Custom Website Design & Development",
    "Expertise in Wix Editor & Wix Studio",
    "Mobile-Responsive & SEO-Friendly Designs",
    "Fast Development & Easy Maintenance",
    "Secure & Scalable Website Solutions"
  ];

  return (
    <section className="py-10 md:py-14 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 md:mb-10">
          Why Hire Wix Developers From Nexuron Technologies?
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column - Image and Text */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_4px_25px_rgba(0,0,0,0.08)]">
            <div className="relative w-full h-[350px] md:h-[400px] lg:h-[450px] rounded-xl overflow-hidden mb-6">
              <Image
                src={HIRE_WHY_SECTION_IMAGE}
                alt="Nexuron Team"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-center font-bold text-[15px] leading-relaxed text-black px-4">
              Behind every high performing Wix application is a team
              that obsesses over the details most developers skip
              change detection, bundle size, accessibility, and long term
              code health. That&apos;s the standard we hold ourselves to, on
              every project, for every client.
            </p>
          </div>

          {/* Right Column - Benefits List */}
          <div className="flex flex-col gap-5">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-5 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border-l-[6px] border-[#0066ff] flex items-center gap-3 overflow-hidden"
              >
                <span className="text-black font-bold text-lg">✓</span>
                <span className="text-black font-bold text-[16px] md:text-[18px]">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
