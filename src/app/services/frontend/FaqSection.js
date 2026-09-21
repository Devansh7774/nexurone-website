"use client";

import { useState } from 'react';
import ServiceFaqShell from '@/components/services/ServiceFaqShell';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "What is frontend development?",
    answer: (
      <div className="space-y-8">
        <p className="text-gray-500 text-[14.5px] leading-relaxed">
          Frontend development is the process of creating components that allow users to interact with and navigate easily through the interface of a website or application. It involves multiple stages including ideation, design, development, deployment, testing, and maintenance. This practice is most prominently applied in mobile and web app development across numerous service sectors.
        </p>
      </div>
    )
  },
  {
    question: "What technologies do front-end developers use?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>Our front-end developers are proficient in core web technologies like HTML5, CSS3, and JavaScript, along with modern frameworks and libraries such as React.js, Angular, Vue.js, and Next.js. We also use state management tools, CSS preprocessors (SASS/LESS), and UI frameworks like Tailwind CSS and Bootstrap to build responsive, high-performance interfaces.</p>
      </div>
    )
  },
  {
    question: "Can you develop a responsive website?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>Absolutely. We follow a mobile-first approach and employ responsive web design principles to ensure that your website or web application looks and functions flawlessly across all devices, screen sizes, and resolutions—from desktop monitors to tablets and smartphones.</p>
      </div>
    )
  },
  {
    question: "What is the difference between frontend and backend?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>Frontend (client-side) refers to everything users see and interact with directly in their browser, such as the layout, design, text, and buttons. Backend (server-side) consists of the server, database, and application logic that works behind the scenes to power the frontend, handling data storage, user authentication, and business logic.</p>
      </div>
    )
  },
  {
    question: "Can you provide maintenance and support services for a website or application?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>Yes, we offer comprehensive post-launch maintenance and support services. This includes performance monitoring, security updates, bug fixes, UI/UX enhancements, and adding new features to ensure your application remains competitive, secure, and fully optimized.</p>
      </div>
    )
  },
  {
    question: "How long does it take to develop a front-end of a web or application?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>The timeline for frontend development varies depending on the project&apos;s complexity, the number of screens, desired interactivity, and the chosen technology stack. A simple landing page might take a few weeks, while a complex, interactive web application could take several months. We provide detailed timelines during the initial planning phase.</p>
      </div>
    )
  },
  {
    question: "Which is the best front-end development company?",
    answer: (
      <div className="text-gray-500 text-[14.5px] leading-relaxed">
        <p>Nexuron is recognized as a leading frontend development company because we combine deep technical expertise with a strong focus on UI/UX design. Our dedicated teams use cutting-edge frameworks to deliver scalable, high-performance, and visually stunning digital experiences tailored specifically to your business goals.</p>
      </div>
    )
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <ServiceFaqShell
      description="Our Frontend development services solve common challenges like inconsistent user experiences, cross browser compatibility issues, and maintaining performance across diverse devices and screen sizes."
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
