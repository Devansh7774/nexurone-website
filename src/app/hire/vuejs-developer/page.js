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
import { vueTechnologies } from '@/components/hire/vue/vueTechnologies';
import { getHireHeroImage } from '@/lib/serviceHeroImages';
import { hireAuditMetadata } from '@/lib/auditMetadata';

export const metadata = hireAuditMetadata('vuejs-developer');


const HERO_IMAGE = getHireHeroImage('vuejs-developer');

const whyHireContent = {
  title: 'Why Hire Vue.js Developers From Nexuron Technologies?',
  imageAlt: 'Nexuron Vue.js development team',
  description:
    'Behind every high performing Vue.js application is a team that obsesses over the details most developers skip change detection, bundle size, accessibility, and long term code health. That\'s the standard we hold ourselves to, on every project, for every client.',
  benefits: [
    'Experienced Vue.js Developers',
    'Strong JavaScript & TypeScript Skills',
    'Component-Based Architecture',
    'State Management with Pinia & Vuex',
    'Responsive UI & Accessibility',
    'End-to-End API Integration',
  ],
};

const expertiseContent = {
  expertiseTitle: 'Our Vue.js Development Expertise',
  expertise: [
    {
      title: 'Custom Vue.js Web Development',
      description:
        'Build dynamic, scalable single-page applications with reusable Vue components and clean architecture.',
    },
    {
      title: 'Nuxt.js & SSR Development',
      description:
        'Develop SEO-friendly, high-performance applications with server-side rendering and static site generation.',
    },
    {
      title: 'State Management with Pinia',
      description:
        'Implement predictable state management for complex, data-driven Vue applications.',
    },
    {
      title: 'API & Backend Integration',
      description:
        'Seamlessly connect Vue frontends with REST, GraphQL APIs, and microservices.',
    },
    {
      title: 'Vue.js Performance Optimization',
      description:
        'Improve load times with lazy loading, code splitting, and efficient reactivity patterns.',
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
    question: 'How quickly can I hire a Vue.js developer?',
    answer:
      'You can onboard a dedicated Vue.js developer within 48-72 hours after requirement discussion.',
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




const PROCESS_STEPS = buildProcessSteps('Vue.js');

const ENGAGEMENT_MODELS = buildEngagementModels('Vue.js', 'Vue.js Developer');

export default function HireVuejsDeveloperPage() {
  return (
    <main>
      <section className="relative overflow-hidden min-h-[560px] md:min-h-[620px]">
        <Image
          src={HERO_IMAGE}
          alt="Hire Vue.js developers"
          fill
          priority
          className="object-cover object-center"
        />

        <HireHeroOverlay />

        <div className="relative z-10 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 min-h-[560px] md:min-h-[620px] flex items-center pt-12 pb-12">
          <div className="w-full max-w-xl text-white">
            <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold italic tracking-wide leading-tight">
              Hire Vue.js Development Experts
            </h1>
            <p className="mt-5 text-[13px] md:text-[14px] font-normal leading-7 text-gray-100">
              Build fast, interactive, and scalable web applications with our expert Vue.js developers. We specialize in Vue 3, Nuxt.js, Pinia, and modern JavaScript tooling to deliver high-performance digital experiences.
            </p>
            <p className="mt-4 text-[13px] md:text-[14px] font-normal leading-7 text-gray-100">
              From component architecture and state management to API integration and long-term maintenance, our team delivers clean, maintainable code aligned to your business goals.
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
        title="Technologies Our Vue.js Developers Use"
        technologies={vueTechnologies}
      />

      <HireProcessPanel
        bg="muted" title="How Hiring a Vue.js Developer Works" steps={PROCESS_STEPS} />

      <HireEngagementCards
        bg="white" models={ENGAGEMENT_MODELS} />

      <HireInquiryPanel
        bg="muted" roleTitle="Vue.js Developer" serviceName="Vue.js Development" />

      <HireFaqAccordion
        bg="white" faqs={faqs} />
    </main>
  );
}
