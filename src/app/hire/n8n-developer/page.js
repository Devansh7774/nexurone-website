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
import { n8nTechnologies } from '@/components/hire/n8n/n8nTechnologies';
import { getHireHeroImage } from '@/lib/serviceHeroImages';
import { hireAuditMetadata } from '@/lib/auditMetadata';

export const metadata = hireAuditMetadata('n8n-developer');


const HERO_IMAGE = getHireHeroImage('n8n-developer');

const whyHireContent = {
  title: 'Why Hire n8n Developers From Nexuron Technologies?',
  imageAlt: 'Nexuron n8n development team',
  description:
    'Behind every high performing automation is a team that obsesses over the details most developers skip reliability, error handling, scalability, and long term maintainability. That\'s the standard we hold ourselves to, on every project, for every client.',
  benefits: [
    'Experienced n8n Workflow Developers',
    'Custom Automation & Integration',
    'API & Webhook Expertise',
    'CRM, ERP & SaaS Integrations',
    'Self-Hosted & Cloud n8n Setup',
    'End-to-End Process Automation',
  ],
};

const expertiseContent = {
  expertiseTitle: 'Our n8n Development Expertise',
  expertise: [
    {
      title: 'Custom n8n Workflow Development',
      description:
        'Build powerful, reliable workflow automations tailored to your business processes and integrations.',
    },
    {
      title: 'API & Webhook Integrations',
      description:
        'Connect applications, services, and databases with custom API integrations and webhook handlers.',
    },
    {
      title: 'CRM & Business Tool Automation',
      description:
        'Automate Salesforce, HubSpot, Slack, Google Workspace, and other business tools with n8n workflows.',
    },
    {
      title: 'Self-Hosted n8n Deployment',
      description:
        'Deploy and manage self-hosted n8n instances with Docker, security, and high availability.',
    },
    {
      title: 'Custom n8n Nodes & Extensions',
      description:
        'Develop custom n8n nodes and JavaScript code for unique integration requirements.',
    },
    {
      title: 'Workflow Maintenance & Support',
      description:
        'Ensure long-term reliability with monitoring, error handling, and ongoing workflow optimization.',
    },
  ],
};

const faqs = [
  {
    question: 'How quickly can I hire an n8n developer?',
    answer:
      'You can onboard a dedicated n8n developer within 48-72 hours after requirement discussion.',
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
    question: 'Do you provide post-launch support for workflows?',
    answer:
      'Yes, we offer comprehensive post-launch support including workflow monitoring, error fixes, optimization, and ongoing maintenance.',
  },
];




const PROCESS_STEPS = buildProcessSteps('n8n');

const ENGAGEMENT_MODELS = buildEngagementModels('n8n', 'n8n Developer');

export default function HireN8nDeveloperPage() {
  return (
    <main>
      <section className="relative overflow-hidden min-h-[560px] md:min-h-[620px]">
        <Image
          src={HERO_IMAGE}
          alt="Hire n8n developers"
          fill
          priority
          className="object-cover object-center"
        />

        <HireHeroOverlay />

        <div className="relative z-10 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 min-h-[560px] md:min-h-[620px] flex items-center pt-12 pb-12">
          <div className="w-full max-w-xl text-white">
            <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold italic tracking-wide leading-tight">
              Hire n8n Development Experts
            </h1>
            <p className="mt-5 text-[13px] md:text-[14px] font-normal leading-7 text-gray-100">
              Automate your business processes and connect your tools with our expert n8n developers. We specialize in workflow automation, API integrations, CRM connections, and custom n8n solutions tailored to your business needs.
            </p>
            <p className="mt-4 text-[13px] md:text-[14px] font-normal leading-7 text-gray-100">
              Our team ensures reliable workflows, seamless integrations, and scalable automations to save time and boost productivity across your organization.
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
        title="Technologies Our n8n Developers Use"
        technologies={n8nTechnologies}
      />

      <HireProcessPanel
        bg="muted" title="How Hiring a n8n Developer Works" steps={PROCESS_STEPS} />

      <HireEngagementCards
        bg="white" models={ENGAGEMENT_MODELS} />

      <HireInquiryPanel
        bg="muted" roleTitle="n8n Developer" serviceName="n8n Development" />

      <HireFaqAccordion
        bg="white" faqs={faqs} />
    </main>
  );
}
