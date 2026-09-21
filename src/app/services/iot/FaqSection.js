"use client";

import { useState } from 'react';
import ServiceFaqShell from '@/components/services/ServiceFaqShell';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "Can IOT help my business reduce costs?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>Yes. IOT enables predictive maintenance, reduces downtime, and automates processes, which leads to significant cost savings.</p>
      </div>
    )
  },
  {
    question: "How secure are IOT systems?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>We build our IOT solutions with enterprise-grade security protocols, end-to-end encryption, and robust access controls to protect sensitive data and devices against vulnerabilities.</p>
      </div>
    )
  },
  {
    question: "Which industries benefit the most from IOT?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>IOT benefits a wide range of industries including healthcare (remote monitoring), manufacturing (predictive maintenance), logistics (fleet tracking), retail (inventory management), and smart cities.</p>
      </div>
    )
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <ServiceFaqShell
      description="Our IoT development services solve challenges like device connectivity, real-time data processing, security, and scaling connected product ecosystems."
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
