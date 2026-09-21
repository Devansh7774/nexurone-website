"use client";

import { useState } from 'react';
import ServiceFaqShell from '@/components/services/ServiceFaqShell';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "What are the benefits of using Laravel and why do you prefer it?",
    answer: (
      <div className="space-y-8">
        <p className="text-gray-500 text-[14.5px] leading-relaxed">
          Laravel is a powerful PHP framework known for elegant syntax, MVC architecture, and built-in tools that accelerate development. It supports secure, scalable applications with features like Eloquent ORM, authentication, queues, and API resources. Its active ecosystem, modular structure, and developer-friendly conventions make Laravel ideal for building maintainable, future-ready web solutions.
        </p>
      </div>
    )
  },
  {
    question: "Are there any data-related concerns I should worry about when hiring Laravel developers?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>We prioritize data security by leveraging Laravel&apos;s built-in protections such as CSRF prevention, encryption, secure authentication, and validated database queries. Our developers follow secure coding practices, role-based access controls, and regular vulnerability assessments to keep your business data safe and compliant.</p>
      </div>
    )
  },
  {
    question: "Do you follow any unique methodologies to help clients achieve their goals?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>We follow Agile development methodologies with iterative sprints, continuous delivery, and regular client feedback. This approach helps us adapt to evolving requirements, reduce risk, and deliver Laravel solutions that align closely with your business objectives and timelines.</p>
      </div>
    )
  },
  {
    question: "How much does Laravel web app development cost?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>The cost depends on project scope, feature complexity, integrations, and timeline. We offer flexible engagement models and provide a detailed, transparent estimate after understanding your requirements, technical needs, and long-term goals.</p>
      </div>
    )
  },
  {
    question: "Why should businesses hire Laravel developers from Nexuron?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>Our team brings deep Laravel expertise across custom web apps, APIs, e-commerce platforms, and enterprise portals. We combine clean architecture, performance optimization, and proactive support to deliver scalable, secure applications with clear communication throughout the project lifecycle.</p>
      </div>
    )
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <ServiceFaqShell
      description="Our Laravel development services solve common challenges like rapid development needs, security concerns, and seamless integration with modern and legacy systems."
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
