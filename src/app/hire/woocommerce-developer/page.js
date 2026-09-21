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
import { woocommerceTechnologies } from '@/components/hire/woocommerce/woocommerceTechnologies';
import { getHireHeroImage } from '@/lib/serviceHeroImages';
import { hireAuditMetadata } from '@/lib/auditMetadata';

export const metadata = hireAuditMetadata('woocommerce-developer');


const HERO_IMAGE = getHireHeroImage('woocommerce-developer');

const whyHireContent = {
  title: 'Why Hire WooCommerce Developers From Nexuron Technologies?',
  imageAlt: 'Nexuron WooCommerce development team',
  description:
    'Behind every high performing WooCommerce store is a team that obsesses over the details most developers skip checkout optimization, payment security, performance, and long term scalability. That\'s the standard we hold ourselves to, on every project, for every client.',
  benefits: [
    'Experienced WooCommerce Developers',
    'Custom Store Design & Development',
    'Payment Gateway & Shipping Integration',
    'Mobile-Responsive & SEO-Friendly Stores',
    'Fast Development & Easy Maintenance',
    'Secure & Scalable eCommerce Solutions',
  ],
};

const expertiseContent = {
  expertiseTitle: 'Our WooCommerce Development Expertise',
  expertise: [
    {
      title: 'Custom WooCommerce Store Development',
      description:
        'Build fully customized online stores aligned with your brand identity and sales goals.',
    },
    {
      title: 'WooCommerce Design & Redesign',
      description:
        'Create or revamp stores with modern, high-converting designs that drive sales.',
    },
    {
      title: 'Custom Plugin Development',
      description:
        'Develop custom WooCommerce plugins and extensions for unique business requirements.',
    },
    {
      title: 'Payment & Shipping Integration',
      description:
        'Integrate secure payment gateways, shipping providers, and tax calculation systems.',
    },
    {
      title: 'WooCommerce SEO Optimization',
      description:
        'Improve store visibility and product rankings on search engines.',
    },
    {
      title: 'Store Maintenance & Support',
      description:
        'Ensure smooth performance with ongoing updates, security patches, and technical support.',
    },
  ],
};

const faqs = [
  {
    question: 'How quickly can I hire a WooCommerce developer?',
    answer:
      'You can onboard a dedicated WooCommerce developer within 48-72 hours after requirement discussion.',
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




const PROCESS_STEPS = buildProcessSteps('WooCommerce');

const ENGAGEMENT_MODELS = buildEngagementModels('WooCommerce', 'WooCommerce Developer');

export default function HireWoocommerceDeveloperPage() {
  return (
    <main>
      <section className="relative overflow-hidden min-h-[560px] md:min-h-[620px]">
        <Image
          src={HERO_IMAGE}
          alt="Hire WooCommerce developers"
          fill
          priority
          className="object-cover object-center"
        />

        <HireHeroOverlay />

        <div className="relative z-10 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 min-h-[560px] md:min-h-[620px] flex items-center pt-12 pb-12">
          <div className="w-full max-w-xl text-white">
            <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold italic tracking-wide leading-tight">
              Hire WooCommerce Development Experts
            </h1>
            <p className="mt-5 text-[13px] md:text-[14px] font-normal leading-7 text-gray-100">
              Build secure, scalable, and high-converting online stores with our expert WooCommerce developers. We specialize in custom store development, payment integrations, and optimized shopping experiences tailored to your business needs.
            </p>
            <p className="mt-4 text-[13px] md:text-[14px] font-normal leading-7 text-gray-100">
              Our team ensures fast development, seamless checkout flows, and robust performance to deliver impactful eCommerce experiences that drive sales.
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
        title="Technologies Our WooCommerce Developers Use"
        technologies={woocommerceTechnologies}
      />

      <HireProcessPanel
        bg="muted" title="How Hiring a WooCommerce Developer Works" steps={PROCESS_STEPS} />

      <HireEngagementCards
        bg="white" models={ENGAGEMENT_MODELS} />

      <HireInquiryPanel
        bg="muted" roleTitle="WooCommerce Developer" serviceName="WooCommerce Development" />

      <HireFaqAccordion
        bg="white" faqs={faqs} />
    </main>
  );
}
