"use client";

import { useState } from 'react';
import ServiceFaqShell from '@/components/services/ServiceFaqShell';
import { Plus, Minus } from 'lucide-react';

export default function AiDevelopmentFaqSection({ serviceName, faqs }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <ServiceFaqShell
      description={`Common questions about our ${serviceName} services — from scope and timeline to integrations and safety.`}
    >
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={faq.question}
            className={`rounded-[10px] overflow-hidden border ${isOpen ? 'border-gray-200 shadow-sm' : 'border-gray-400'}`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className={`w-full flex items-center justify-between p-5 lg:px-8 lg:py-6 text-left transition-colors ${
                isOpen ? 'bg-[#1e2430] text-white' : 'bg-white text-gray-900 hover:bg-gray-50'
              }`}
            >
              <span className="text-[16px] lg:text-[17px] font-bold pr-8">
                {faq.question}
              </span>
              <div
                className={`flex-shrink-0 w-[30px] h-[30px] rounded-full flex items-center justify-center ${
                  isOpen ? 'bg-white text-[#1e2430]' : 'bg-[#1e2430] text-white'
                }`}
              >
                {isOpen ? (
                  <Minus className="w-[18px] h-[18px]" strokeWidth={2.5} />
                ) : (
                  <Plus className="w-[18px] h-[18px]" strokeWidth={2.5} />
                )}
              </div>
            </button>

            {isOpen && (
              <div className="px-5 py-6 lg:px-8 lg:py-8 bg-white">
                <div className="text-gray-500 text-[14.5px] leading-relaxed">
                  <p>{faq.answer}</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </ServiceFaqShell>
  );
}
