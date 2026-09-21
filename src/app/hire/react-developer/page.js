import Image from 'next/image';
import Link from 'next/link';
import HireHeroOverlay from '@/components/hire/shared/HireHeroOverlay';
import HireWhySplit from '@/components/hire/layout/HireWhySplit';
import HireSkillsGrid from '@/components/hire/layout/HireSkillsGrid';
import HireProcessPanel from '@/components/hire/layout/HireProcessPanel';
import HireEngagementCards from '@/components/hire/layout/HireEngagementCards';
import HireTechStack from '@/components/hire/layout/HireTechStack';
import HireInquiryPanel from '@/components/hire/layout/HireInquiryPanel';
import HireFaqAccordion from '@/components/hire/layout/HireFaqAccordion';
import { buildEngagementModels, buildProcessSteps } from '@/lib/hirePageContent';
import { reactTechnologies } from '@/components/hire/react/reactTechnologies';
import { getHireHeroImage } from '@/lib/serviceHeroImages';
import { hireAuditMetadata } from '@/lib/auditMetadata';

export const metadata = hireAuditMetadata('react-developer');


const HERO_IMAGE = getHireHeroImage('react-developer');

const whyHireContent = {
  title: 'Why Hire React Developers From Nexuron Technologies?',
  imageAlt: 'Nexuron React development team',
  description:
    'We focus on performance, scalability, and clean architecture to ensure your application is future ready. Behind every high performing React application is a team that obsesses over the details most developers skip change detection, bundle size, accessibility, and long term code health.',
  benefits: [
    'Experienced React.js Developers',
    'Strong Expertise in JavaScript & TypeScript',
    'Component-Based UI Architecture',
    'State Management with Redux & Context',
    'Responsive UI & Accessibility',
    'End-to-End API Integration',
  ],
};

const expertiseContent = {
  expertiseTitle: 'Our React Development Expertise',
  expertise: [
    {
      title: 'Custom React Web Development',
      description:
        'Build dynamic, scalable single-page applications with reusable components and clean architecture.',
    },
    {
      title: 'Next.js & SSR Development',
      description:
        'Develop SEO-friendly, high-performance applications with server-side rendering and static generation.',
    },
    {
      title: 'State Management with Redux',
      description:
        'Implement predictable state management for complex, data-driven React applications.',
    },
    {
      title: 'API & Backend Integration',
      description:
        'Seamlessly connect React frontends with REST, GraphQL APIs, and microservices.',
    },
    {
      title: 'React Performance Optimization',
      description:
        'Improve load times with code splitting, lazy loading, memoization, and bundle optimization.',
    },
    {
      title: 'Application Maintenance & Support',
      description:
        'Ensure long-term stability with version upgrades, bug fixes, and ongoing support.',
    },
  ],
};

const faqs = [
  {
    question: 'How quickly can I hire a React developer?',
    answer:
      'You can onboard a dedicated React developer within 48-72 hours after requirement discussion.',
  },
  {
    question: 'Do your developers work in my time zone?',
    answer:
      'Yes, our developers are flexible and can overlap with your time zone to ensure seamless communication, daily reporting, and agile collaboration.',
  },
  {
    question: 'Can I interview the developer before hiring?',
    answer:
      'Absolutely. We provide you with a shortlist of pre-vetted candidates, and you can interview them to ensure they are the perfect technical and cultural fit for your team.',
  },
  {
    question: 'Do you provide post-launch support?',
    answer:
      'Yes, we offer comprehensive post-launch support and maintenance packages to keep your application secure, updated, and performing optimally.',
  },
];




const PROCESS_STEPS = buildProcessSteps('React');

const ENGAGEMENT_MODELS = buildEngagementModels('React', 'React Developer');

export default function HireReactDeveloperPage() {
  return (
    <main>
      <section className="relative overflow-hidden min-h-[560px] md:min-h-[620px]">
        <Image
          src={HERO_IMAGE}
          alt="Hire React developers"
          fill
          priority
          className="object-cover object-center"
        />

        <HireHeroOverlay />

        <div className="relative z-10 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 min-h-[560px] md:min-h-[620px] flex items-center pt-12 pb-12">
          <div className="w-full max-w-xl text-white">
            <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold italic tracking-wide leading-tight">
              Hire React Development Experts
            </h1>
            <p className="mt-5 text-[13px] md:text-[14px] font-normal leading-7 text-gray-100">
              Build fast, scalable, and enterprise-grade web applications with our expert React developers. We specialize in React.js, Next.js, Redux, and modern JavaScript frameworks to accelerate your digital growth.
            </p>
            <p className="mt-4 text-[13px] md:text-[14px] font-normal leading-7 text-gray-100">
              Our team ensures high performance, seamless UI interactions, and robust architecture to deliver powerful digital experiences tailored to your business needs.
            </p>

            <Link
              href="#hire-inquiry"
              className="inline-flex mt-8 px-8 py-3 rounded-md bg-[#5b9cff] hover:bg-[#4a8bee] text-white text-[15px] font-medium transition-colors"
            >
              Hire Now
            </Link>
          </div>
        </div>
      </section>

      <HireWhySplit
        bg="white"
        title={whyHireContent.title}
        description={whyHireContent.description}
        benefits={whyHireContent.benefits}
        imageAlt={whyHireContent.imageAlt}
      />

      <HireSkillsGrid
        bg="muted" skills={expertiseContent.expertise} />

      <HireTechStack
        bg="white"
        title="Technologies Our React Developers Use"
        technologies={reactTechnologies}
      />

      <HireProcessPanel
        bg="muted" title="How Hiring a React Developer Works" steps={PROCESS_STEPS} />

      <HireEngagementCards
        bg="white" models={ENGAGEMENT_MODELS} />

      <HireInquiryPanel
        bg="muted" roleTitle="React Developer" serviceName="React Development" />

      <HireFaqAccordion
        bg="white" faqs={faqs} />
    </main>
  );
}
