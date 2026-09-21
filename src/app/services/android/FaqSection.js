"use client";

import { useState } from 'react';
import ServiceFaqShell from '@/components/services/ServiceFaqShell';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "What are the benefits of Native Android Apps?",
    answer: (
      <div className="space-y-8">
        <p className="text-gray-500 text-[14.5px] leading-relaxed">
          Using the most prevalent Android platform offering high customization and flexibility features to users, businesses can introduce themselves with the best makeover. The services or products can be presented well on a secure platform that can serve millions of users globally without any capping.
        </p>
      </div>
    )
  },
  {
    question: "Which is the best framework for Android app development?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>The &quot;best&quot; framework depends on your specific project requirements. For pure native performance, Kotlin and Java using the Android SDK are standard. For cross-platform efficiency, frameworks like Flutter and React Native are highly popular. At Nexuron, our experts analyze your goals to recommend the ideal technology stack.</p>
      </div>
    )
  },
  {
    question: "How do Nexuron ensure data security when during and after the Android app development process?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>We implement strict security protocols including data encryption (both at rest and in transit), secure authentication mechanisms, code obfuscation, and regular vulnerability assessments. We follow OWASP Mobile Top 10 guidelines to safeguard your app against potential threats throughout its lifecycle.</p>
      </div>
    )
  },
  {
    question: "How to make a profitable Android app?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>A profitable app starts with solving a real user problem. Combine that with a seamless UI/UX, robust performance, and a clear monetization strategy (such as in-app purchases, subscriptions, freemium models, or ads). Continuous updates based on user feedback and market trends are also crucial for long-term profitability.</p>
      </div>
    )
  },
  {
    question: "Why should I hire a dedicated development team from Nexuron?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>Hiring a dedicated team from Nexuron gives you access to top-tier talent without the overhead of in-house recruitment. You get complete transparency, direct communication, scalable resources, and a team solely focused on delivering your vision with the highest quality standards and within agreed timelines.</p>
      </div>
    )
  },
  {
    question: "What is the flexible engagement model available at Nexuron?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>We offer multiple engagement models tailored to your needs: Fixed Price (best for well-defined scopes), Time and Material (ideal for evolving projects), and Dedicated Team (perfect for long-term, scalable development). We work with you to choose the model that best fits your budget and project dynamics.</p>
      </div>
    )
  },
  {
    question: "What is the cost of developing an Android app?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>The cost varies significantly based on complexity, feature set, API integrations, and UI/UX requirements. A simple app will cost less than a feature-rich enterprise solution. We provide a detailed, transparent breakdown of costs after our initial discovery and requirement analysis phase.</p>
      </div>
    )
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <ServiceFaqShell
      description="Our Android app development services solve common challenges like platform compatibility, performance optimization, security, and building apps that scale with your business."
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
