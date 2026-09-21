import Image from 'next/image';
import YearsExperienceCounter from '@/components/home/YearsExperienceCounter';

export default function AboutUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#E6F0FF] text-[#0A2640] px-4 py-1.5 rounded-md font-semibold text-sm mb-6 inline-block">
          ABOUT US
        </div>

        <div className="flex flex-col lg:flex-row lg:items-stretch gap-10 lg:gap-6">
          {/* Left Content Column */}
          <div className="w-full lg:w-[58%] flex flex-col items-start text-left z-10">
            <h2 className="text-4xl md:text-5xl lg:text-[50px] font-bold text-[#020617] leading-[1.1] mb-6">
              Innovating Technology
              <br className="hidden md:block" />
              Empowering Businesses
            </h2>
            
            <p className="text-gray-600 text-lg md:text-[19px] leading-relaxed mb-12 max-w-2xl">
              We believe in building smarter digital experiences that drive growth and efficiency. From custom web applications to mobile apps and next gen technologies like IoT and AI, our solutions are designed to transform ideas into reality. With a blend of creativity and technical expertise, we make technology work for you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 w-full mt-auto">
              {/* Experience Card */}
              <div className="bg-[#E8EEF5] rounded-[6px] p-5 flex flex-col items-center justify-center w-full sm:w-[240px] flex-shrink-0">
                <div className="bg-[#1A2C38] text-white px-4 py-1.5 rounded-[4px] font-bold text-sm mb-6">
                  OUR EXPERTISE
                </div>
                <YearsExperienceCounter />
                <div className="text-[#1A2C38] font-bold text-sm tracking-widest mt-4 text-center">
                  YEARS OF EXPERIENCE
                </div>
              </div>

              {/* Services List Card */}
              <div className="bg-gradient-to-br from-[#2968ED] via-[#3346DF] to-[#3918C4] rounded-[6px] p-4 flex-1 text-white relative overflow-hidden flex flex-col justify-center shadow-lg min-h-[280px]">
                {/* Abstract wave lines overlay */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-overlay">
                  <div className="absolute top-0 left-0 h-full w-1/2">
                    <div className="relative h-full w-full">
                      <Image 
                        src="https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/nexuron-assets/22.png"
                        alt=""
                        fill
                        className="object-cover object-left-top"
                        sizes="50vw"
                        aria-hidden
                      />
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 h-full w-1/2">
                    <div className="relative h-full w-full">
                      <Image 
                        src="https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/nexuron-assets/22.png"
                        alt=""
                        fill
                        className="object-cover object-right-top"
                        sizes="50vw"
                        aria-hidden
                      />
                    </div>
                  </div>
                </div>
                
                <ul className="space-y-4 relative z-10 text-[15px] lg:text-[17px] font-semibold tracking-wide w-full lg:w-[70%]">
                  <li className="flex items-center gap-3.5 text-white">
                    <div className="w-[24px] h-[24px] rounded-full bg-[#B2D1FF] flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-[#0A2640]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    Full Stack web development
                  </li>
                  <li className="flex items-center gap-3.5 text-white">
                    <div className="w-[24px] h-[24px] rounded-full bg-[#B2D1FF] flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-[#0A2640]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    Cross Platform mobile solutions
                  </li>
                  <li className="flex items-center gap-3.5 text-white">
                    <div className="w-[24px] h-[24px] rounded-full bg-[#B2D1FF] flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-[#0A2640]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    Intelligent tech (AI, IoT, DevOps)
                  </li>
                  <li className="flex items-center gap-3.5 text-white">
                    <div className="w-[24px] h-[24px] rounded-full bg-[#B2D1FF] flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-[#0A2640]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    Creative design & User experience
                  </li>
                  <li className="flex items-center gap-3.5 text-white">
                    <div className="w-[24px] h-[24px] rounded-full bg-[#B2D1FF] flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-[#0A2640]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    Scalable Hosting & Cloud Solutions
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Image Column — spans from heading to bottom of cards */}
          <div className="w-full lg:w-[50%] flex flex-col z-0 lg:-ml-[9%] lg:-translate-x-12 lg:self-stretch pointer-events-none">
            <div className="relative flex-1 w-full min-h-[480px] sm:min-h-[560px] lg:min-h-[660px]">
              <Image 
                src="https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/d7095bd2-e5eb-4fee-9fee-cf332aabed52.png"
                alt="Isometric illustration of cloud infrastructure, mobile solutions, AI, analytics, and DevOps technology services"
                fill
                loading="lazy"
                className="object-contain object-center mix-blend-screen scale-[1.3] lg:scale-[1.58]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}