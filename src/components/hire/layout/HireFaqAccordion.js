"use client";

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import {
  HIRE_SHELL,
  HIRE_SECTION,
  HIRE_BADGE,
  HIRE_TITLE,
  HIRE_BG,
} from '@/components/hire/layout/hirePageTokens';

export default function HireFaqAccordion({
  bg = 'white',
  badge = 'FAQ',
  title = 'Frequently Asked Questions',
  description = 'Everything you need to know before hiring a developer through Nexuron.',
  faqs = [],
}) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className={`${HIRE_SECTION} ${HIRE_BG[bg] ?? HIRE_BG.white}`}>
      <div className={HIRE_SHELL}>
        <div className="mb-10 max-w-2xl">
          <span className={HIRE_BADGE}>{badge}</span>
          <h2 className={`${HIRE_TITLE} mt-5 text-balance`}>{title}</h2>
          {description && (
            <p className="mt-4 text-[15px] leading-relaxed text-gray-500">{description}</p>
          )}
        </div>

        <div className="w-full space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-[12px] border transition-colors ${
                  isOpen ? 'border-[#2563eb]/30 bg-[#f8faff]' : 'border-gray-200 bg-white'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="pr-6 text-[16px] font-semibold text-gray-900">{faq.question}</span>
                  <div
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-colors ${
                      isOpen ? 'bg-[#2563eb] text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="h-4 w-4" strokeWidth={2.5} />
                    ) : (
                      <Plus className="h-4 w-4" strokeWidth={2.5} />
                    )}
                  </div>
                </button>
                {isOpen && (
                  <div className="border-t border-[#2563eb]/10 px-6 pb-5 pt-1">
                    <p className="text-[14.5px] leading-relaxed text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
