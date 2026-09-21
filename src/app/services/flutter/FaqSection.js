"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ServiceFaqShell from '@/components/services/ServiceFaqShell';
import { SERVICE_BODY } from '@/components/services/servicePageLayout';

const faqs = [
  {
    question: 'What types of Flutter projects do you take on?',
    answer:
      'We build MVPs, full product releases, and enterprise apps — including on-demand platforms, fintech products, e-commerce apps, and internal field tools. We also support existing Flutter codebases that need new features or performance improvements.',
  },
  {
    question: 'Can you work with our existing design or backend?',
    answer:
      'Yes. We can implement from your Figma designs, integrate with your existing REST or GraphQL APIs, and connect to Firebase, AWS, or other cloud services your team already uses.',
  },
  {
    question: 'How long does a typical Flutter project take?',
    answer:
      'An MVP usually takes 2–4 months. More complex apps with multiple integrations, offline support, or custom backend work typically run 4–6 months. We provide a detailed timeline after the discovery phase.',
  },
  {
    question: 'Do you handle App Store and Google Play submission?',
    answer:
      'Yes. We manage store listings, build signing, submission, and post-launch monitoring. We also offer ongoing maintenance packages for updates, bug fixes, and new feature development.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <ServiceFaqShell bg="muted" description="Common questions about our Flutter development service.">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        const panelId = `flutter-faq-panel-${index}`;
        const buttonId = `flutter-faq-button-${index}`;

        return (
          <div
            key={faq.question}
            className="overflow-hidden rounded-xl border border-slate-200 bg-white"
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-slate-50 lg:px-6 lg:py-5"
              >
                <span className="text-base font-semibold text-slate-900">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 flex-shrink-0 text-slate-500 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden
                />
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="border-t border-slate-100 px-5 py-4 lg:px-6 lg:py-5"
            >
              <p className={SERVICE_BODY}>{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </ServiceFaqShell>
  );
}
