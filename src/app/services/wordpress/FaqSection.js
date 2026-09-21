"use client";

import { useState } from 'react';
import ServiceFaqShell from '@/components/services/ServiceFaqShell';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "What does PSD to WordPress development service mean?",
    answer: (
      <div className="space-y-8">
        <p className="text-gray-500 text-[14.5px] leading-relaxed">
          A simple yet effective way to convert our clients&apos; PSD files and utilize it for personalized WordPress website development. The PSD files are converted into themes through integration of other specific plugins to give our clients&apos; website a new brand perception.
        </p>
      </div>
    )
  },
  {
    question: "How much does it cost to Hire WordPress developer?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>The cost to hire a WordPress developer depends on your project requirements, complexity, custom features, and the engagement model you choose. We offer flexible hiring models including dedicated teams and fixed-price projects. Contact us to get a detailed and transparent quote for your specific needs.</p>
      </div>
    )
  },
  {
    question: "How much time does it take to develop a WordPress based website?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>The development timeline varies based on the scope of the project. A simple WordPress website can take a few weeks, while complex enterprise solutions, custom themes, or advanced plugin development might take several months. We work closely with you to establish clear milestones and deliver on time.</p>
      </div>
    )
  },
  {
    question: "Do you have a designing team specifically supporting the WordPress development? Why should you hire Nexuron as my WordPress Development Partner?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>Yes, we have a dedicated in-house design team that works seamlessly with our WordPress developers to create visually stunning and highly functional websites. You should choose Nexuron because we combine deep technical expertise with creative design, ensuring scalable, secure, and user-centric WordPress solutions tailored to your business goals.</p>
      </div>
    )
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <ServiceFaqShell
      description="Our WordPress development services solve common challenges like limited customization, security vulnerabilities, and managing scalability as your website grows."
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
