"use client";

import { useState } from 'react';
import ServiceFaqShell from '@/components/services/ServiceFaqShell';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "Why should I use 3D design instead of traditional graphics?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>3D designs offer realism, depth, and interactivity, making them more engaging and impactful than 2D visuals.</p>
      </div>
    )
  },
  {
    question: "Do you design for both digital and physical products?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>Yes, we create 3D models for both digital experiences (like AR/VR, games, and web) and physical products (for prototyping, manufacturing, and marketing).</p>
      </div>
    )
  },
  {
    question: "What industries benefit from 3D design?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>Industries such as real estate, architecture, e-commerce, manufacturing, gaming, healthcare, and education heavily benefit from realistic 3D modeling and visualization.</p>
      </div>
    )
  },
  {
    question: "Do you provide AR/VR integrations with 3D models?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>Absolutely. We optimize our 3D models to be fully compatible with Augmented Reality (AR) and Virtual Reality (VR) platforms, providing immersive experiences for your users.</p>
      </div>
    )
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <ServiceFaqShell
      description="Our 3D design services help teams create realistic visuals, product renders, and immersive experiences for marketing and product development."
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
