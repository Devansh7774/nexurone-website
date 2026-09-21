import React from 'react';
import { COMPANY_STATS } from '@/lib/companyStats';

const ProgressCircle = ({ percentage, colorClass, gradientId, text }) => {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-[110px] h-[110px] flex items-center justify-center bg-white rounded-full shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
      <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        {gradientId && (
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        )}
        <circle
          className="text-gray-100"
          strokeWidth="3"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />
        <circle
          className={colorClass}
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke={gradientId ? `url(#${gradientId})` : "currentColor"}
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />
      </svg>
      <span className="text-[22px] font-bold text-[#0F172A]">{text}</span>
    </div>
  );
};

export default function AboutExperience() {
  return (
    <section className="w-full bg-[#1e293b]">
      {/* Top Row — exact 50/50 background split */}
      <div className="flex w-full flex-col lg:flex-row">
        {/* Top Left (Dark) — 5+ Years */}
        <div className="flex w-full flex-col items-center justify-center bg-[#1e293b] px-8 py-20 lg:w-1/2">
          <div className="text-center">
            <div className="flex items-start justify-center">
              <h2 className="text-[100px] lg:text-[140px] font-bold text-[#3B82F6] leading-none tracking-tighter">
                {COMPANY_STATS.yearsExperienceValue}
              </h2>
              <span className="text-[48px] lg:text-[64px] font-bold text-[#3B82F6] leading-none mt-4">+</span>
            </div>
            <p className="text-[24px] lg:text-[28px] font-bold text-white mt-2">Years of Experience</p>
          </div>
        </div>
        
        {/* Top Right (Light Gray) — 90% & satisfaction stats */}
        <div className="flex w-full flex-col items-center justify-center gap-12 bg-[#f8fafc] px-8 py-20 sm:flex-row sm:gap-24 lg:w-1/2">
          {/* Stat 1 */}
          <div className="flex flex-col items-center">
            <ProgressCircle percentage={90} colorClass="text-[#3B82F6]" text="90%" />
            <p className="mt-6 text-center font-bold text-[#0F172A] text-[15px] leading-[1.4]">
              Expertise in Full Stack<br/>Development
            </p>
          </div>
          {/* Stat 2 */}
          <div className="flex flex-col items-center">
            <ProgressCircle percentage={COMPANY_STATS.clientSatisfactionValue} colorClass="text-transparent" gradientId="purple-gradient" text={COMPANY_STATS.clientSatisfaction} />
            <p className="mt-6 text-center font-bold text-[#0F172A] text-[15px] leading-[1.4]">
              Client<br/>Satisfaction
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex w-full flex-col bg-[#1e293b] lg:flex-row">
        {/* Bottom Left (Dark Spacer) - L-shape dark background */}
        <div className="hidden bg-[#1e293b] lg:block lg:w-[6%] xl:w-[7%]" />

        {/* Bottom Right (White Content Box) */}
        <div className="w-full rounded-t-md bg-white lg:w-[94%] lg:rounded-tr-none lg:rounded-tl-lg xl:w-[93%]">
          <div className="mx-auto flex max-w-[1340px] flex-col gap-12 px-6 py-20 sm:px-8 lg:flex-row lg:gap-16 lg:px-16 lg:py-24">

            {/* Left Title */}
            <div className="flex w-full flex-col lg:w-[30%]">
              <h2 className="text-[36px] lg:text-[42px] font-bold text-[#0F172A] leading-[1.2] tracking-tight">
                Building great<br/>future Together,<br/>Be with us
              </h2>
            </div>
            
            {/* Right Timeline */}
            <div className="relative w-full lg:w-[70%]">
              {/* Dashed line for desktop */}
              <div className="hidden md:block absolute top-[20px] left-[40px] right-[40px] h-[1px] border-t-[1.5px] border-dashed border-gray-300 z-0"></div>
              
              <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-6 relative z-10">
                {/* Step 1 */}
                <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="w-10 h-10 rounded-full bg-[#f0f5ff] text-[#0F172A] flex items-center justify-center font-bold text-[14px] mb-6 z-10 shadow-sm">01</div>
                  <h3 className="text-[18px] font-bold text-[#0F172A] mb-3 leading-tight">Information<br/>Collection</h3>
                  <p className="text-gray-500 text-[14px] leading-[1.8]">
                    We begin by understanding your business goals, user needs, and technical requirements. This step helps us gather insights that form the foundation for a clear and effective project roadmap.
                  </p>
                </div>
                
                {/* Step 2 */}
                <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="w-10 h-10 rounded-full bg-[#f0f5ff] text-[#0F172A] flex items-center justify-center font-bold text-[14px] mb-6 z-10 shadow-sm">02</div>
                  <h3 className="text-[18px] font-bold text-[#0F172A] mb-3 leading-tight">Projection Report<br/>Analysis</h3>
                  <p className="text-gray-500 text-[14px] leading-[1.8]">
                    Our experts analyze the collected data to identify opportunities, risks, and the best possible solutions. We prepare a detailed project plan that outlines milestones, timelines, and success criteria.
                  </p>
                </div>
                
                {/* Step 3 */}
                <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="w-10 h-10 rounded-full bg-[#f0f5ff] text-[#0F172A] flex items-center justify-center font-bold text-[14px] mb-6 z-10 shadow-sm">03</div>
                  <h3 className="text-[18px] font-bold text-[#0F172A] mb-3 leading-tight">Consultation<br/>Solution</h3>
                  <p className="text-gray-500 text-[14px] leading-[1.8]">
                    We provide tailored consultation backed by technical expertise, offering strategies and solutions that align with your vision. Our goal is to ensure your project is scalable, future ready, and built for success.
                  </p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
