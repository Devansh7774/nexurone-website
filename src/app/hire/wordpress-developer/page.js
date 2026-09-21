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
import { wordpressTechnologies } from '@/components/hire/wordpress/wordpressTechnologies';
import { getHireHeroImage } from '@/lib/serviceHeroImages';
import { hireAuditMetadata } from '@/lib/auditMetadata';

export const metadata = hireAuditMetadata('wordpress-developer');


const HERO_IMAGE = getHireHeroImage('wordpress-developer');

const whyHireContent = {
  title: 'Why Hire WordPress Developers From Nexuron Technologies?',
  imageAlt: 'Nexuron WordPress development team',
  description:
    'Behind every high performing WordPress website is a team that obsesses over the details most developers skip performance, security, SEO, accessibility, and long term maintainability. That\'s the standard we hold ourselves to, on every project, for every client.',
  benefits: [
    'Experienced WordPress Developers',
    'Custom Theme & Plugin Development',
    'Expertise in Elementor & Gutenberg',
    'Mobile-Responsive & SEO-Friendly Designs',
    'Fast Development & Easy Maintenance',
    'Secure & Scalable Website Solutions',
  ],
};

const expertiseContent = {
  expertiseTitle: 'Our WordPress Development Expertise',
  expertise: [
    {
      title: 'Custom WordPress Website Development',
      description:
        'Build fully customized WordPress websites aligned with your brand identity and business goals.',
    },
    {
      title: 'WordPress Design & Redesign',
      description:
        'Create or revamp websites with modern, high-converting designs using Elementor and Gutenberg.',
    },
    {
      title: 'Custom Plugin Development',
      description:
        'Develop custom WordPress plugins and functionalities to extend your website capabilities.',
    },
    {
      title: 'WooCommerce Development',
      description:
        'Build secure and scalable online stores with WooCommerce integration and payment gateways.',
    },
    {
      title: 'WordPress SEO Optimization',
      description:
        'Improve website visibility and ranking on search engines with technical and on-page SEO.',
    },
    {
      title: 'Website Maintenance & Support',
      description:
        'Ensure smooth performance with ongoing updates, security patches, and technical support.',
    },
  ],
};

const faqs = [
  {
    question: 'How quickly can I hire a WordPress developer?',
    answer:
      'You can onboard a dedicated WordPress developer within 48-72 hours after requirement discussion.',
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
      'Yes, we offer comprehensive post-launch support and maintenance packages to keep your website secure, updated, and performing optimally.',
  },
];




const PROCESS_STEPS = buildProcessSteps('WordPress');

const ENGAGEMENT_MODELS = buildEngagementModels('WordPress', 'WordPress Developer');

export default function HireWordpressDeveloperPage() {
  return (
    <main>
      <section className="relative overflow-hidden min-h-[560px] md:min-h-[620px]">
        <Image
          src={HERO_IMAGE}
          alt="Hire WordPress developers"
          fill
          priority
          className="object-cover object-center"
        />

        <HireHeroOverlay />

        <div className="relative z-10 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 min-h-[560px] md:min-h-[620px] flex items-center pt-12 pb-12">
          <div className="w-full max-w-xl text-white">
            <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold italic tracking-wide leading-tight">
              Hire WordPress Development Experts
            </h1>
            <p className="mt-5 text-[13px] md:text-[14px] font-normal leading-7 text-gray-100">
              Build stunning, user-friendly, and fully responsive websites with our expert WordPress developers. We specialize in custom themes, plugins, Elementor, and optimized designs tailored to your business needs.
            </p>
            <p className="mt-4 text-[13px] md:text-[14px] font-normal leading-7 text-gray-100">
              Our team ensures fast development, modern UI/UX, SEO best practices, and seamless performance to deliver impactful digital experiences.
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
        title="Technologies Our WordPress Developers Use"
        technologies={wordpressTechnologies}
      />

      <HireProcessPanel
        bg="muted" title="How Hiring a WordPress Developer Works" steps={PROCESS_STEPS} />

      <HireEngagementCards
        bg="white" models={ENGAGEMENT_MODELS} />

      <HireInquiryPanel
        bg="muted" roleTitle="WordPress Developer" serviceName="WordPress Development" />

      <HireFaqAccordion
        bg="white" faqs={faqs} />
    </main>
  );
}
