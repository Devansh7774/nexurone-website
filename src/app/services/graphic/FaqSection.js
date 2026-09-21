"use client";

import { useState } from 'react';
import ServiceFaqShell from '@/components/services/ServiceFaqShell';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "Why is graphic design important for my business?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>Great design improves brand recognition, communicates trust, and increases customer engagement.</p>
      </div>
    )
  },
  {
    question: "Do you provide custom brand identity packages?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>Yes, we offer comprehensive brand identity packages that include logo design, color palettes, typography, and brand guidelines to ensure consistency across all your marketing channels.</p>
      </div>
    )
  },
  {
    question: "Can you design for both print and digital?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>Absolutely. Our designers are experienced in creating high-quality assets for both digital platforms (websites, social media, ads) and print materials (brochures, business cards, banners).</p>
      </div>
    )
  },
  {
    question: "Do you offer ongoing design support?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>Yes, we provide continuous design support for businesses that need regular creative assets, such as monthly social media graphics, ad campaigns, or ongoing marketing collateral updates.</p>
      </div>
    )
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <ServiceFaqShell
      description="Our graphic design services help businesses build strong visual identity, marketing collateral, and brand consistency across channels."
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
