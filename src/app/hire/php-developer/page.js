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
import { phpTechnologies } from '@/components/hire/php/phpTechnologies';
import { getHireHeroImage } from '@/lib/serviceHeroImages';
import { hireAuditMetadata } from '@/lib/auditMetadata';

export const metadata = hireAuditMetadata('php-developer');


const HERO_IMAGE = getHireHeroImage('php-developer');

const whyHireContent = {
  title: 'Why Hire PHP Developers From Nexuron Technologies?',
  imageAlt: 'Nexuron PHP development team',
  description:
    'Behind every high performing PHP application is a team that obsesses over the details most developers skip architecture, security, performance, and long term code health. That\'s the standard we hold ourselves to, on every project, for every client.',
  benefits: [
    'Experienced PHP Developers',
    'Laravel & WordPress Expertise',
    'Custom Web Application Development',
    'RESTful API & Backend Development',
    'Secure & Scalable Solutions',
    'End-to-End Integration Support',
  ],
};

const expertiseContent = {
  expertiseTitle: 'Our PHP Development Expertise',
  expertise: [
    {
      title: 'Custom PHP Web Development',
      description:
        'Build robust, scalable web applications tailored to your business requirements using modern PHP best practices.',
    },
    {
      title: 'Laravel Framework Development',
      description:
        'Develop enterprise-grade applications with Laravel, including APIs, admin panels, and business platforms.',
    },
    {
      title: 'WordPress & CMS Development',
      description:
        'Create custom WordPress themes, plugins, and content management solutions for your business.',
    },
    {
      title: 'PHP API Development',
      description:
        'Build secure RESTful APIs and backend services for web and mobile applications.',
    },
    {
      title: 'PHP Performance Optimization',
      description:
        'Improve application speed, database queries, caching, and overall system efficiency.',
    },
    {
      title: 'Application Maintenance & Support',
      description:
        'Ensure long-term stability with version upgrades, security patches, and ongoing technical support.',
    },
  ],
};

const faqs = [
  {
    question: 'How quickly can I hire a PHP developer?',
    answer:
      'You can onboard a dedicated PHP developer within 48-72 hours after requirement discussion.',
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




const PROCESS_STEPS = buildProcessSteps('PHP');

const ENGAGEMENT_MODELS = buildEngagementModels('PHP', 'PHP Developer');

export default function HirePhpDeveloperPage() {
  return (
    <main>
      <section className="relative overflow-hidden min-h-[560px] md:min-h-[620px]">
        <Image
          src={HERO_IMAGE}
          alt="Hire PHP developers"
          fill
          priority
          className="object-cover object-center"
        />

        <HireHeroOverlay />

        <div className="relative z-10 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 min-h-[560px] md:min-h-[620px] flex items-center pt-12 pb-12">
          <div className="w-full max-w-xl text-white">
            <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold italic tracking-wide leading-tight">
              Hire PHP Development Experts
            </h1>
            <p className="mt-5 text-[13px] md:text-[14px] font-normal leading-7 text-gray-100">
              Build scalable, secure, and high-performance web applications with our expert PHP developers. We specialize in Laravel, WordPress, custom PHP development, and modern backend solutions tailored to your business needs.
            </p>
            <p className="mt-4 text-[13px] md:text-[14px] font-normal leading-7 text-gray-100">
              Our team ensures clean architecture, robust backend systems, and seamless integrations to deliver powerful digital solutions for startups and enterprises alike.
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
        title="Technologies Our PHP Developers Use"
        technologies={phpTechnologies}
      />

      <HireProcessPanel
        bg="muted" title="How Hiring a PHP Developer Works" steps={PROCESS_STEPS} />

      <HireEngagementCards
        bg="white" models={ENGAGEMENT_MODELS} />

      <HireInquiryPanel
        bg="muted" roleTitle="PHP Developer" serviceName="PHP Development" />

      <HireFaqAccordion
        bg="white" faqs={faqs} />
    </main>
  );
}
