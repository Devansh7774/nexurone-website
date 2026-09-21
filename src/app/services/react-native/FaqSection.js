"use client";

import { useState } from 'react';
import ServiceFaqShell from '@/components/services/ServiceFaqShell';
import { Plus, Minus, Check } from 'lucide-react';

const faqs = [
  {
    question: "What are the benefits of React Native based Mobile apps?",
    answer: (
      <div className="space-y-8">
        <p className="text-gray-500 text-[14.5px] leading-relaxed">
          The 5 most talked benefits of using React Native for a mobile app are:
        </p>
        <ul className="space-y-4">
          {[
            <span key="1"><strong className="text-gray-900">Cost Reduction</strong> – One can consult an expert to migrate the whole database of an app to React Native for better efficiency and reduced cost.</span>,
            <span key="2"><strong className="text-gray-900">Native Look and Better UI/UX</strong> – Comprising its own JavaScript it can conveniently provide a Native interface feel. The library that it utilizes is known as React JavaScript which allows the UI to be more focused for users.</span>,
            <span key="3"><strong className="text-gray-900">Code Reusability</strong> – One does not need to create separate and distinctive code for each platform specifically and almost entire code can be used for various platforms.</span>,
            <span key="4"><strong className="text-gray-900">Third-Party Plugins</strong> – Allowing numerous third-party plugin features that eliminate the dependency on specific web-view functionality.</span>,
            <span key="5"><strong className="text-gray-900">Community Support</strong> – The community that is using and has advanced knowledge of React Native is quite big. More than 80,000 developers utilize React Native as they know the benefit provided by the framework. Hence making community support a plus point.</span>
          ].map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-gray-700 text-[14.5px]">
              <Check className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" strokeWidth={3} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    )
  },
  {
    question: "Can React Native be used for both web and mobile apps?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>Yes, through libraries like React Native for Web, you can compile React Native components and APIs into web-compatible code. This allows you to share a significant portion of your codebase across iOS, Android, and web platforms, further reducing development time and maintenance overhead.</p>
      </div>
    )
  },
  {
    question: "What is the cost when it comes to React Native app development?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>The cost of developing a React Native app is generally lower than building two separate native apps for iOS and Android. However, the exact cost depends on factors like the app&apos;s complexity, the number of features, required third-party integrations, and UI/UX design requirements. We provide tailored estimates based on your specific project scope.</p>
      </div>
    )
  },
  {
    question: "What is React Native good for?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>React Native is excellent for businesses that want to launch mobile apps quickly on both iOS and Android without sacrificing performance or user experience. It&apos;s particularly well-suited for e-commerce apps, social media platforms, enterprise dashboards, and MVP (Minimum Viable Product) development where speed-to-market is crucial.</p>
      </div>
    )
  },
  {
    question: "Is React Native used for app development?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>Absolutely. React Native is one of the most popular cross-platform mobile app development frameworks globally. It is used by major tech companies including Meta (Facebook, Instagram), Shopify, Discord, Pinterest, and Salesforce to build robust, scalable, and high-performance mobile applications.</p>
      </div>
    )
  },
  {
    question: "What company offers the best React Native app development services?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>Nexuron is a leading provider of React Native development services. Our expert team combines deep technical knowledge with a strong focus on UI/UX design and business objectives to deliver fast, secure, and scalable cross-platform applications tailored to your unique requirements.</p>
      </div>
    )
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <ServiceFaqShell
      description="Our React Native app development services solve common challenges like fragmented platforms, high costs, and delayed launches."
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
