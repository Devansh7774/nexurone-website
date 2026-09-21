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
import { shopifyTechnologies } from '@/components/hire/shopify/shopifyTechnologies';
import { getHireHeroImage } from '@/lib/serviceHeroImages';
import { hireAuditMetadata } from '@/lib/auditMetadata';

export const metadata = hireAuditMetadata('shopify-developer');


const HERO_IMAGE = getHireHeroImage('shopify-developer');

const whyHireContent = {
  title: 'Why Hire Shopify Developers From Nexuron Technologies?',
  imageAlt: 'Nexuron Shopify development team',
  description:
    'Behind every high performing Shopify store is a team that obsesses over the details most developers skip conversion optimization, checkout experience, performance, and long term scalability. That\'s the standard we hold ourselves to, on every project, for every client.',
  benefits: [
    'Experienced Shopify Developers',
    'Custom Theme & Store Development',
    'Expertise in Shopify Plus & Liquid',
    'Mobile-Responsive & SEO-Friendly Stores',
    'Fast Development & Easy Maintenance',
    'Secure & Scalable eCommerce Solutions',
  ],
};

const expertiseContent = {
  expertiseTitle: 'Our Shopify Development Expertise',
  expertise: [
    {
      title: 'Custom Shopify Store Development',
      description:
        'Build fully customized Shopify stores aligned with your brand identity and sales goals.',
    },
    {
      title: 'Shopify Theme Design & Development',
      description:
        'Create or customize themes with modern, high-converting designs using Liquid and Shopify 2.0.',
    },
    {
      title: 'Shopify App Development',
      description:
        'Develop custom Shopify apps and extensions to extend your store capabilities.',
    },
    {
      title: 'Shopify Plus & Enterprise Solutions',
      description:
        'Build scalable enterprise stores with Shopify Plus, custom checkout, and advanced integrations.',
    },
    {
      title: 'Shopify SEO & Conversion Optimization',
      description:
        'Improve store visibility, product rankings, and conversion rates on search engines.',
    },
    {
      title: 'Store Maintenance & Support',
      description:
        'Ensure smooth performance with ongoing updates, app management, and technical support.',
    },
  ],
};

const faqs = [
  {
    question: 'How quickly can I hire a Shopify developer?',
    answer:
      'You can onboard a dedicated Shopify developer within 48-72 hours after requirement discussion.',
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
      'Yes, we offer comprehensive post-launch support and maintenance packages to keep your store secure, updated, and performing optimally.',
  },
];




const PROCESS_STEPS = buildProcessSteps('Shopify');

const ENGAGEMENT_MODELS = buildEngagementModels('Shopify', 'Shopify Developer');

export default function HireShopifyDeveloperPage() {
  return (
    <main>
      <section className="relative overflow-hidden min-h-[560px] md:min-h-[620px]">
        <Image
          src={HERO_IMAGE}
          alt="Hire Shopify developers"
          fill
          priority
          className="object-cover object-center"
        />

        <HireHeroOverlay />

        <div className="relative z-10 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 min-h-[560px] md:min-h-[620px] flex items-center pt-12 pb-12">
          <div className="w-full max-w-xl text-white">
            <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold italic tracking-wide leading-tight">
              Hire Shopify Development Experts
            </h1>
            <p className="mt-5 text-[13px] md:text-[14px] font-normal leading-7 text-gray-100">
              Build stunning, high-converting online stores with our expert Shopify developers. We specialize in custom themes, Shopify Plus, app development, and optimized shopping experiences tailored to your business needs.
            </p>
            <p className="mt-4 text-[13px] md:text-[14px] font-normal leading-7 text-gray-100">
              Our team ensures fast development, seamless checkout flows, and robust performance to deliver impactful eCommerce experiences that drive sales and growth.
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
        title="Technologies Our Shopify Developers Use"
        technologies={shopifyTechnologies}
      />

      <HireProcessPanel
        bg="muted" title="How Hiring a Shopify Developer Works" steps={PROCESS_STEPS} />

      <HireEngagementCards
        bg="white" models={ENGAGEMENT_MODELS} />

      <HireInquiryPanel
        bg="muted" roleTitle="Shopify Developer" serviceName="Shopify Development" />

      <HireFaqAccordion
        bg="white" faqs={faqs} />
    </main>
  );
}
