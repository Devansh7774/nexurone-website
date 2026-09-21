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
import { zapierTechnologies } from '@/components/hire/zapier/zapierTechnologies';
import { getHireHeroImage } from '@/lib/serviceHeroImages';
import { hireAuditMetadata } from '@/lib/auditMetadata';

export const metadata = hireAuditMetadata('zapier-developer');


const HERO_IMAGE = getHireHeroImage('zapier-developer');

const whyHireContent = {
  title: 'Why Hire Zapier Developers From Nexuron Technologies?',
  imageAlt: 'Nexuron Zapier development team',
  description:
    'Behind every high performing Zapier automation is a team that obsesses over the details most developers skip reliability, error handling, data mapping, and long term maintainability. That\'s the standard we hold ourselves to, on every project, for every client.',
  benefits: [
    'Experienced Zapier Workflow Developers',
    'Custom Zap & Multi-Step Automation',
    'API & Webhook Integration Expertise',
    'CRM, ERP & SaaS App Connections',
    'Code by Zapier & Custom Logic',
    'End-to-End Process Automation',
  ],
};

const expertiseContent = {
  expertiseTitle: 'Our Zapier Development Expertise',
  expertise: [
    {
      title: 'Custom Zap Development',
      description:
        'Build powerful, reliable Zaps and multi-step workflows tailored to your business processes.',
    },
    {
      title: 'API & Webhook Integrations',
      description:
        'Connect applications and services with custom API integrations, webhooks, and Catch Hooks.',
    },
    {
      title: 'CRM & Business Tool Automation',
      description:
        'Automate Salesforce, HubSpot, Slack, Google Workspace, Shopify, and 5,000+ Zapier apps.',
    },
    {
      title: 'Code by Zapier Solutions',
      description:
        'Implement custom JavaScript and Python logic for advanced data transformation and filtering.',
    },
    {
      title: 'Zapier Migration & Optimization',
      description:
        'Migrate workflows from Make, n8n, or manual processes and optimize existing Zaps for performance.',
    },
    {
      title: 'Workflow Maintenance & Support',
      description:
        'Ensure long-term reliability with monitoring, error handling, and ongoing Zap optimization.',
    },
  ],
};

const faqs = [
  {
    question: 'How quickly can I hire a Zapier developer?',
    answer:
      'You can onboard a dedicated Zapier developer within 48-72 hours after requirement discussion.',
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
    question: 'Do you provide post-launch support for Zaps?',
    answer:
      'Yes, we offer comprehensive post-launch support including Zap monitoring, error fixes, optimization, and ongoing maintenance.',
  },
];




const PROCESS_STEPS = buildProcessSteps('Zapier');

const ENGAGEMENT_MODELS = buildEngagementModels('Zapier', 'Zapier Developer');

export default function HireZapierDeveloperPage() {
  return (
    <main>
      <section className="relative overflow-hidden min-h-[560px] md:min-h-[620px]">
        <Image
          src={HERO_IMAGE}
          alt="Hire Zapier developers"
          fill
          priority
          className="object-cover object-center"
        />

        <HireHeroOverlay />

        <div className="relative z-10 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 min-h-[560px] md:min-h-[620px] flex items-center pt-12 pb-12">
          <div className="w-full max-w-xl text-white">
            <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold italic tracking-wide leading-tight">
              Hire Zapier Development Experts
            </h1>
            <p className="mt-5 text-[13px] md:text-[14px] font-normal leading-7 text-gray-100">
              Automate your business processes and connect 5,000+ apps with our expert Zapier developers. We specialize in custom Zaps, API integrations, CRM automation, and workflow optimization tailored to your business needs.
            </p>
            <p className="mt-4 text-[13px] md:text-[14px] font-normal leading-7 text-gray-100">
              Our team ensures reliable automations, seamless integrations, and scalable workflows to save time and boost productivity across your organization.
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
        title="Technologies Our Zapier Developers Use"
        technologies={zapierTechnologies}
      />

      <HireProcessPanel
        bg="muted" title="How Hiring a Zapier Developer Works" steps={PROCESS_STEPS} />

      <HireEngagementCards
        bg="white" models={ENGAGEMENT_MODELS} />

      <HireInquiryPanel
        bg="muted" roleTitle="Zapier Developer" serviceName="Zapier Development" />

      <HireFaqAccordion
        bg="white" faqs={faqs} />
    </main>
  );
}
