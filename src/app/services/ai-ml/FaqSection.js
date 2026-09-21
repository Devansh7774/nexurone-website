"use client";

import { useState } from 'react';
import ServiceFaqShell from '@/components/services/ServiceFaqShell';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "What problems can AI/ML solve for my business?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>AI/ML can enhance customer experience, detect fraud, optimize supply chains, predict market trends, and automate decision-making.</p>
      </div>
    )
  },
  {
    question: "Which industries benefit most from AI/ML?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>AI/ML is transforming industries across the board, including healthcare (diagnostics), finance (risk assessment), retail (personalized recommendations), manufacturing (predictive maintenance), and logistics (route optimization).</p>
      </div>
    )
  },
  {
    question: "Do you provide custom AI/ML solutions?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>Yes, we build bespoke AI and ML models tailored specifically to your unique business challenges, data availability, and strategic objectives, rather than relying solely on off-the-shelf solutions.</p>
      </div>
    )
  },
  {
    question: "Is ongoing support included?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>Absolutely. AI models require continuous monitoring and retraining as new data becomes available. We provide ongoing support, model optimization, and performance tracking to ensure long-term accuracy and value.</p>
      </div>
    )
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <ServiceFaqShell
      description="Our AI and machine learning services help businesses turn data into actionable insights, automate operations, and build intelligent products."
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
