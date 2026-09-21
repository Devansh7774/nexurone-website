import Image from 'next/image';
import Link from 'next/link';
import TrustedBrandsSlider from '@/components/home/TrustedBrandsSlider';

export default function WhyChooseUs() {
  return (
    <section className="bg-[#152033] text-white overflow-hidden relative">
      {/* Top Left Shape */}
      <div className="absolute top-0 left-0 -translate-x-10 md:-translate-x-16 lg:-translate-x-24 z-0 pointer-events-none">
        <Image
          src="https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/nexuron-assets/25.png"
          alt=""
          width={400}
          height={400}
          className="h-auto w-48 md:w-64 lg:w-[400px]"
          aria-hidden
        />
      </div>

      <div className="max-w-[1340px] pt-20 pb-0 lg:pt-28 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Trusted Partners — tag, heading, full-width slider */}
        <div className="mb-16 lg:mb-24 text-center" aria-labelledby="trusted-partners-heading">
          <div className="mb-5 inline-block rounded-md bg-[#E6F0FF] px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-[#0A2640]">
            Trusted Partners
          </div>
          <h2
            id="trusted-partners-heading"
            className="mb-8 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl"
          >
            Trusted brands work with us
          </h2>
          <TrustedBrandsSlider className="w-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-stretch">
          
          {/* Left Column - Image & Badge */}
          <div className="relative flex flex-col justify-end lg:min-h-full">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-600 rounded-full blur-[80px]"></div>
            
            <div className="relative mx-auto w-full max-w-[560px] min-h-[480px] sm:min-h-[540px] lg:max-w-none lg:mx-0 lg:min-h-[620px] xl:min-h-[680px]">
              <Image 
                src="https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/7.png" 
                alt="Business professional representing Nexuron technology solutions" 
                fill 
                className="object-contain object-bottom"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Hexagon Badge */}
            <div className="absolute right-0 top-[60%] lg:top-1/2 transform translate-x-4 lg:translate-x-12 -translate-y-1/2 w-48 h-56 md:w-56 md:h-64 z-20">
              {/* Drop shadow wrapper for polygon */}
              <div className="w-full h-full relative" style={{ filter: 'drop-shadow(0 0 20px rgba(37, 99, 235, 0.5))' }}>
                <div 
                  className="w-full h-full bg-[#2563eb] flex items-center justify-center relative"
                  style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                >
                  {/* Inner Hexagon Border */}
                  <div 
                    className="absolute w-[85%] h-[85%] bg-white/30 flex items-center justify-center"
                    style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                  >
                    <div 
                      className="w-[calc(100%-2px)] h-[calc(100%-2px)] bg-[#2563eb]"
                      style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                    ></div>
                  </div>

                  {/* Inner dots for hexagon borders */}
                  <div className="absolute w-[85%] h-[85%]">
                    <div className="absolute top-0 left-1/2 w-2 h-2 border border-white rounded-full -translate-x-1/2 -translate-y-1/2 bg-[#2563eb]"></div>
                    <div className="absolute bottom-0 left-1/2 w-2 h-2 border border-white rounded-full -translate-x-1/2 translate-y-1/2 bg-[#2563eb]"></div>
                    <div className="absolute top-[25%] left-0 w-2 h-2 border border-white rounded-full -translate-x-1/2 -translate-y-1/2 bg-[#2563eb]"></div>
                    <div className="absolute top-[25%] right-0 w-2 h-2 border border-white rounded-full translate-x-1/2 -translate-y-1/2 bg-[#2563eb]"></div>
                    <div className="absolute bottom-[25%] left-0 w-2 h-2 border border-white rounded-full -translate-x-1/2 translate-y-1/2 bg-[#2563eb]"></div>
                    <div className="absolute bottom-[25%] right-0 w-2 h-2 border border-white rounded-full translate-x-1/2 translate-y-1/2 bg-[#2563eb]"></div>
                  </div>

                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="w-[65%] h-[65%]  absolute">
                      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                        <path id="circlePath" d="M 50, 10 a 40,40 0 1,1 0,80 a 40,40 0 1,1 0,-80" fill="transparent" />
                        <text fill="white" className="text-[11px]  tracking-[0.12em] ">
                          <textPath href="#circlePath" startOffset="0%">
                            Certified Company • Business Solution • 
                          </textPath>
                        </text>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Center Arrow */}
                  <div className="absolute flex items-center justify-center">
                    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinejoin="round">
                      <path d="M11 6 L18 6 L18 13 L15.5 13 L15.5 10.3 L8.3 17.5 L6.5 15.7 L13.7 8.5 L11 8.5 Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8 pb-20 lg:pb-28">
            <div>
              <div className="bg-[#f0f4f8] text-[#0f172a] px-3 py-1.5 rounded font-bold text-sm tracking-wide mb-6 inline-block uppercase">
                Why Choose Us
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-[54px] font-bold leading-[1.15] mb-6 text-white">
                Driving Growth Through Technology
              </h2>
              <p className="text-gray-300 text-[17px] leading-relaxed">
                We deliver secure, scalable, and innovative IT solutions that help businesses succeed in the digital era. From web and apps to cloud and AI, we combine technology with expertise to create measurable impact.
              </p>
            </div>

            {/* Features block */}
            <div className="relative pt-6">
               {/* Custom S-curve divider line */}
               <div className="absolute left-0 top-0 bottom-0 w-full pointer-events-none opacity-30 hidden md:block">
                 <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" className="absolute inset-0">
                   <path 
                     d="M 0,0 L 45,0 Q 50,0 50,10 L 50,90 Q 50,100 55,100 L 100,100" 
                     fill="none" 
                     stroke="white" 
                     strokeWidth="0.5" 
                     vectorEffect="non-scaling-stroke"
                   />
                 </svg>
               </div>

               <div className=" md:p-4 grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                 {/* Feature 1 */}
                 <div className="md:pr-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#152033" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <h3 className="text-xl font-bold text-white">Smart IT Solutions</h3>
                    </div>
                    <p className="text-gray-300 text-[15px] leading-relaxed">
                      End to end services covering web,<br/>mobile apps, custom software,<br/>cloud, AI, and automation tailored<br/>to your business goals.
                    </p>
                 </div>

                 {/* Feature 2 */}
                 <div className="md:pl-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#152033" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <h3 className="text-xl font-bold text-white">Reliable Support</h3>
                    </div>
                    <p className="text-gray-300 text-[15px] leading-relaxed">
                      Dedicated experts and 24/7<br/>support ensuring smooth<br/>operations, quick response times,<br/>and long term reliability.
                    </p>
                 </div>
               </div>
            </div>

            <div className="pt-4">
              <Link
                href="/about-us"
                className="nexuron-cta-btn inline-block rounded-full px-8 py-3.5 text-lg font-semibold text-white"
              >
                <span className="relative z-[1]">About Nexuron Technologies</span>
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* Section divider */}
      <div className="relative z-10 mx-auto max-w-[1340px] px-4 sm:px-6 lg:px-8">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/25 to-transparent" aria-hidden />
      </div>
    </section>
  );
}