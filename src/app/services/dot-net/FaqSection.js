"use client";

import { useState } from 'react';
import ServiceFaqShell from '@/components/services/ServiceFaqShell';
import { Plus, Minus, Check } from 'lucide-react';

const faqs = [
  {
    question: "What is the .NET framework?",
    answer: (
      <div className="space-y-8">
        <p className="text-gray-500 text-[14.5px] leading-relaxed">
          The .NET framework is one of the most comprehensive development platforms, offering extensive libraries, tools, and functionalities to build robust web applications and services. It supports multiple languages like C#, VB, Cobol, and Perl, making development faster, scalable, and more efficient. At Nexuron, we leverage the full potential of .NET to deliver maximum value for our clients.
        </p>
        <ul className="space-y-4">
          {[
            "Cross-platform support with .NET Core and .NET 8",
            "Enterprise-grade security and performance",
            "Rich libraries for web, desktop, and cloud applications",
            "Long-term Microsoft support and an active developer community"
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
    question: "What are the important components of .NET?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>The core components of .NET include the Common Language Runtime (CLR), the Framework Class Library (FCL), ASP.NET for web applications, ADO.NET for data access, and Windows Presentation Foundation (WPF) for desktop applications. These components work together to provide a robust environment for building diverse applications.</p>
      </div>
    )
  },
  {
    question: "How much does it cost to hire a .NET developer for web app development?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>The cost varies based on project scope, complexity, and specific expertise required. We offer flexible engagement models to suit different budgets. Contact us for a detailed estimation based on your project needs.</p>
      </div>
    )
  },
  {
    question: "How much time does it take for .NET web app development?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>Development time depends entirely on the features, complexity, and integrations required. A basic application might take a few weeks, while complex enterprise solutions can take several months. We provide clear timelines during the initial planning phase.</p>
      </div>
    )
  },
  {
    question: "How do you ensure security while applying .NET web development methodologies?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>We implement built-in .NET security features like identity management, role-based access control, data encryption, and secure communication protocols. Our team also follows best practices to prevent common vulnerabilities like SQL injection and cross-site scripting (XSS).</p>
      </div>
    )
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <ServiceFaqShell
      description="Our .NET development services solve common challenges like complex integrations, scalability bottlenecks, and long-term application maintenance."
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
