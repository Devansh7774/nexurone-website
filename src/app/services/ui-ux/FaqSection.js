"use client";

import { useState } from 'react';
import ServiceFaqShell from '@/components/services/ServiceFaqShell';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "Why is UI/UX important for my business?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>Good UI/UX increases user satisfaction, boosts conversions, and strengthens customer loyalty.</p>
      </div>
    )
  },
  {
    question: "Do you create UI/UX for both mobile and web apps?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>Yes, we design intuitive and responsive interfaces for both mobile applications (iOS and Android) and web platforms, ensuring a seamless experience across all devices.</p>
      </div>
    )
  },
  {
    question: "What tools do you use for UI/UX design?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>Our design team utilizes industry-leading tools such as Figma, Adobe XD, Sketch, and InVision to create high-fidelity wireframes, prototypes, and final designs.</p>
      </div>
    )
  },
  {
    question: "Do you provide post-launch support?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>Absolutely. We offer ongoing support and continuous improvements based on user feedback and analytics to keep your product user-friendly and effective.</p>
      </div>
    )
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <ServiceFaqShell
      description="Our UI/UX design services solve challenges like poor usability, inconsistent branding, and low user engagement across digital products."
    >
      {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index} 
                className={`rounded-[10px] overflow-hidden border ${isOpen ? 'border-gray-200 shadow-sm' : 'border-gray-400'}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className={`w-full flex items-center justify-between p-5 lg:px-8 lg:py-6 text-left transition-colors ${
                    isOpen ? 'bg-[#1e2430] text-white' : 'bg-white text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-[16px] lg:text-[17px] font-bold pr-8">
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 w-[30px] h-[30px] rounded-full flex items-center justify-center ${
                    isOpen ? 'bg-white text-[#1e2430]' : 'bg-[#1e2430] text-white'
                  }`}>
                    {isOpen ? <Minus className="w-[18px] h-[18px]" strokeWidth={2.5} /> : <Plus className="w-[18px] h-[18px]" strokeWidth={2.5} />}
                  </div>
                </button>
                
                {isOpen && (
                  <div className="px-5 py-6 lg:px-8 lg:py-8 bg-white">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
    </ServiceFaqShell>
  );
}
