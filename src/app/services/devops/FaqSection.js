"use client";

import { useState } from 'react';
import ServiceFaqShell from '@/components/services/ServiceFaqShell';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "How can DevOps benefit my business?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>DevOps accelerates delivery cycles, reduces downtime, improves product quality, and lowers operational costs.</p>
      </div>
    )
  },
  {
    question: "Do you support cloud migration as part of DevOps?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>Yes, we provide comprehensive cloud migration services, moving your legacy infrastructure to modern cloud platforms like AWS, Azure, or GCP while implementing DevOps best practices.</p>
      </div>
    )
  },
  {
    question: "Is DevOps only for large enterprises?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>No, DevOps is highly beneficial for businesses of all sizes. For startups and SMEs, it helps establish scalable, efficient, and automated processes early on, accelerating time-to-market.</p>
      </div>
    )
  },
  {
    question: "Do you provide 24/7 support?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>Yes, we offer round-the-clock monitoring and support to ensure your infrastructure, deployment pipelines, and applications are always running smoothly with minimal downtime.</p>
      </div>
    )
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <ServiceFaqShell
      description="Our DevOps services help teams reduce deployment risk, improve reliability, and deliver software faster across cloud and on-prem environments."
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
