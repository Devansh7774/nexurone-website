"use client";

import { useState } from 'react';

export default function HireFAQSection({ faqs }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-10 md:py-14 bg-white">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-center text-[#0f172a] mb-8 md:mb-10">
          Frequently Asked Questions
        </h2>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                  isOpen ? 'border-gray-300 shadow-sm' : 'border-gray-400'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className={`w-full text-left px-6 py-5 flex justify-between items-center transition-colors duration-300 ${
                    isOpen
                      ? 'bg-[#1e293b] text-white'
                      : 'bg-white text-[#0f172a] hover:bg-gray-50'
                  }`}
                >
                  <span className="font-bold text-[16px] md:text-[18px] pr-4">
                    {faq.question}
                  </span>

                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xl font-medium transition-colors duration-300 ${
                      isOpen
                        ? 'bg-white text-[#1e293b]'
                        : 'bg-[#1e293b] text-white'
                    }`}
                  >
                    {isOpen ? '−' : '+'}
                  </div>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen
                      ? 'max-h-[500px] opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-6 bg-white text-gray-500 text-[15px] md:text-[16px] leading-relaxed border-t border-gray-100">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
