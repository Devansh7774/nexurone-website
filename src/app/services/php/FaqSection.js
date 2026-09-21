"use client";

import { useState } from 'react';
import ServiceFaqShell from '@/components/services/ServiceFaqShell';
import { Plus, Minus, Check } from 'lucide-react';

const faqs = [
  {
    question: "What are the benefits of using PHP and why do you prefer it?",
    answer: (
      <div className="space-y-8">
        <p className="text-gray-500 text-[14.5px] leading-relaxed">
          PHP is a powerful, open source framework that enables fast, scalable, and cost efficient web development. It supports performance driven applications, even those with complex and intensive UI/UX needs. Its flexibility, scalability, and large developer community make PHP a preferred choice for building sustainable and future ready digital solutions.
        </p>
      </div>
    )
  },
  {
    question: "Are there any data-related concerns I should worry about when hiring PHP developers?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>We prioritize data security by implementing industry-standard encryption, secure coding practices, and regular vulnerability assessments. Our PHP developers ensure that your data is protected against common threats and compliance requirements are met.</p>
      </div>
    )
  },
  {
    question: "Do you follow any unique methodologies to help clients achieve their goals?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>We follow Agile development methodologies, ensuring continuous delivery, transparency, and regular client feedback. This iterative approach allows us to adapt to changing requirements and deliver solutions that perfectly align with your business objectives.</p>
      </div>
    )
  },
  {
    question: "How much does PHP web app development cost?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>The cost varies depending on project complexity, feature requirements, and timeline. We offer flexible pricing models and will provide a detailed, transparent estimate after understanding your specific project needs.</p>
      </div>
    )
  },
  {
    question: "Why should businesses hire PHP developers from Nexuron?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>Our team brings years of expertise in PHP development, utilizing modern frameworks and best practices. We are committed to delivering high-quality, scalable, and secure applications while providing excellent communication and ongoing support throughout the project lifecycle.</p>
      </div>
    )
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <ServiceFaqShell
      description="Our PHP development services solve common challenges like high development costs, security risks, and the need for scalable, future-ready web applications."
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
