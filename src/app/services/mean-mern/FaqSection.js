"use client";

import { useState } from 'react';
import ServiceFaqShell from '@/components/services/ServiceFaqShell';
import { Plus, Minus, Check } from 'lucide-react';

const faqs = [
  {
    question: "What are the advantages of using MEAN and MERN stack for web development?",
    answer: (
      <div className="space-y-8">
        <p className="text-gray-500 text-[14.5px] leading-relaxed">
          MEAN and MERN stacks offer high scalability, seamless database management, and the convenience of a full JavaScript-based framework. They support code reuse across the stack and are cost-effective due to their open-source nature.
        </p>
        <ul className="space-y-4">
          {[
            "Full-stack JavaScript development across frontend and backend",
            "Faster delivery with reusable components and rich ecosystems",
            "Scalable architecture with MongoDB and Node.js",
            "Lower licensing costs with open-source technologies",
          ].map((item, idx) => (
            <li key={idx} className="flex items-center gap-3 text-gray-700 text-[14.5px] font-bold">
              <Check className="w-5 h-5 text-gray-900" strokeWidth={3} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    )
  },
  {
    question: "What are the components of the MEAN/MERN stack?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>MEAN stack consists of MongoDB, Express.js, Angular, and Node.js. MERN stack replaces Angular with React. Both use MongoDB for the database, Express.js and Node.js for the backend, and Angular or React for the frontend.</p>
      </div>
    )
  },
  {
    question: "What is the cost of developing a web application using MEAN/MERN stack?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>The cost depends on project complexity, features required, timeline, and team size. We provide a detailed estimate after understanding your scope, integrations, and long-term goals.</p>
      </div>
    )
  },
  {
    question: "How can I hire a MEAN/MERN development team for my project?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>Share your project requirements with our team. We offer flexible engagement models including dedicated developers, fixed-price projects, and time-and-material arrangements based on your needs.</p>
      </div>
    )
  },
  {
    question: "Is it possible to migrate an existing web application to MEAN/MERN stack?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>Yes. We migrate legacy applications to the MEAN/MERN stack with careful planning to protect data, improve performance, and support future scalability.</p>
      </div>
    )
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <ServiceFaqShell
      description="Our MEAN/MERN development services solve common challenges like fragmented platforms, high costs, and delayed launches."
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
