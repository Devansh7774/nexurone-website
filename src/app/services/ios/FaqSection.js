"use client";

import { useState } from 'react';
import ServiceFaqShell from '@/components/services/ServiceFaqShell';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "How do I get started with the iOS app development process?",
    answer: (
      <div className="space-y-8">
        <p className="text-gray-500 text-[14.5px] leading-relaxed">
          Reach out to us via email or call, and our experts will guide you through every step. We&apos;ll discuss your business idea, define goals, and provide a roadmap with estimated cost and timeline.
        </p>
      </div>
    )
  },
  {
    question: "What are the benefits of having a Native iOS app for business?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>Native iOS apps provide the highest level of performance, security, and user experience. They offer seamless integration with Apple&apos;s ecosystem (like Siri, Apple Pay, iCloud), smooth animations, and adhere strictly to Apple&apos;s Human Interface Guidelines, leading to higher customer engagement and brand loyalty among affluent Apple users.</p>
      </div>
    )
  },
  {
    question: "How do you ensure security in iOS applications?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>Security is paramount in our iOS development process. We utilize Apple&apos;s built-in security features such as Keychain for data storage, App Transport Security (ATS) for secure network connections, Face ID/Touch ID for authentication, and strict data encryption protocols to protect your app and user data from vulnerabilities.</p>
      </div>
    )
  },
  {
    question: "How much does it cost to develop an iOS app?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>The cost of iOS app development depends on factors such as app complexity, feature set, UI/UX design requirements, third-party integrations, and ongoing maintenance needs. After our initial discovery phase, we provide a transparent, detailed cost breakdown tailored to your specific project scope.</p>
      </div>
    )
  },
  {
    question: "Which technologies and coding standards do you use for iOS app development?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>We primarily use Swift and SwiftUI for building robust and modern iOS applications. We strictly adhere to Apple&apos;s Human Interface Guidelines and follow clean architecture patterns (like MVVM or VIPER) to ensure the code is maintainable, scalable, and highly performant.</p>
      </div>
    )
  },
  {
    question: "Is iOS app development easy and quick?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>The timeline depends on the app&apos;s complexity. While modern frameworks like SwiftUI have accelerated the development process, building a high-quality, secure, and feature-rich enterprise app requires careful planning, rigorous QA testing, and adherence to Apple&apos;s strict App Store review guidelines.</p>
      </div>
    )
  },
  {
    question: "Why choose your company for iOS app development?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>Nexuron brings together deep technical expertise in the Apple ecosystem, a user-centric design philosophy, and a proven track record of delivering successful digital products. We don&apos;t just write code; we partner with you to build scalable, secure, and highly engaging iOS solutions that drive measurable business growth.</p>
      </div>
    )
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <ServiceFaqShell
      description="Our iOS app development services solve common challenges like App Store compliance, native performance, secure data handling, and delivering polished user experiences on Apple devices."
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
