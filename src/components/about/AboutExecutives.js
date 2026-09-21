import Image from 'next/image';
import { COMPANY_STATS } from '@/lib/companyStats';

export default function AboutExecutives() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Image Column */}
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <div className="relative w-full max-w-[650px] aspect-[4/3] lg:aspect-square">
              <Image 
                src="https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/nexuron-assets/4799410-scaled.jpg"
                alt="Technology Illustration"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* Right Content Column */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
            <h1 className="text-4xl md:text-5xl lg:text-[46px] font-bold text-[#020617] leading-[1.2] mb-8">
              Meet the executives driving our success.
            </h1>
            
            <div className="space-y-6 text-gray-600 text-[17px] leading-[1.8] mb-10 w-full max-w-[600px]">
              <p>
                At <strong className="text-[#020617] font-semibold">Nexuron</strong>, we are more than just a technology company, we are your growth partner. With expertise across web, mobile, cloud, and next gen technologies, we empower businesses to innovate, scale, and thrive in the digital age.
              </p>
              <p>
                Our leadership team brings years of experience, combining technical excellence with strategic vision. From startups to enterprises, we have successfully delivered solutions that are secure, scalable, and built for long term growth.
              </p>
              <p>
                Driven by innovation and collaboration, we continue to push boundaries, helping clients transform their ideas into impactful digital solutions.
              </p>
            </div>
            
            {/* Divider */}
            <div className="w-full max-w-[600px] h-[1px] bg-gray-200 mb-8"></div>
            
            {/* Stats Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-10 sm:gap-16 w-full">
              
              {/* Stat 1: Global Clients Served */}
              <div className="flex items-center gap-4">
                <div className="relative w-[50px] h-[50px] flex-shrink-0">
                  <Image 
                    src="https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/4.png"
                    alt="Trophy icon"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col text-[#020617] font-bold text-[16px] leading-tight">
                  <span>{COMPANY_STATS.clients} Global Clients</span>
                  <span>Served</span>
                </div>
              </div>

              {/* Stat 2: 3.8 X Client ROI Growth */}
              <div className="flex items-center gap-4">
                <span className="text-[#3B82F6] text-[46px] font-bold leading-none tracking-tight">
                  3.8 X
                </span>
                <div className="flex flex-col text-[#020617] font-bold text-[16px] leading-tight">
                  <span>Client ROI</span>
                  <span>Growth</span>
                </div>
              </div>

            </div>
            
          </div>
          
        </div>
      </div>
    </section>
  );
}
