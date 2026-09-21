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
import { javascriptTechnologies } from '@/components/hire/javascript/javascriptTechnologies';
import { getHireHeroImage } from '@/lib/serviceHeroImages';
import { hireAuditMetadata } from '@/lib/auditMetadata';
import { buildEngagementModels } from '@/lib/hirePageContent';

export const metadata = hireAuditMetadata('javascript-developer');

const HERO_IMAGE = getHireHeroImage('javascript-developer');

const PROCESS_STEPS = [
  {
    title: 'Share Your Requirements',
    description:
      'Tell us about your project, tech stack, team structure, and timeline. We align on the skills and seniority level you need before shortlisting candidates.',
  },
  {
    title: 'Interview & Select Your Developer',
    description:
      'Review pre-vetted JavaScript developers, run interviews at your pace, and choose the engineer who fits your codebase standards and team culture.',
  },
  {
    title: 'Onboard & Start Building',
    description:
      'Your developer integrates into your workflow within 48–72 hours — joining your sprints, tools, and communication channels from day one.',
  },
];

const SKILLS = [
  {
    title: 'Custom Web Application Development',
    description:
      'Dynamic, scalable applications built around your business logic, user flows, and growth roadmap.',
  },
  {
    title: 'Frontend Framework Development',
    description:
      'Interactive UIs with React, Vue, Angular, and modern component libraries.',
  },
  {
    title: 'Node.js & API Development',
    description:
      'Robust server-side applications, RESTful APIs, GraphQL endpoints, and real-time systems.',
  },
  {
    title: 'Legacy Modernization',
    description:
      'Migrate outdated JavaScript codebases to modern frameworks and maintainable architecture.',
  },
  {
    title: 'Performance Optimization',
    description:
      'Profiling, code splitting, caching, and Core Web Vitals improvements for faster applications.',
  },
  {
    title: 'Maintenance & Support',
    description:
      'Version upgrades, bug fixes, monitoring, and ongoing technical support after launch.',
  },
];

const ENGAGEMENT_MODELS = buildEngagementModels('JavaScript', 'JavaScript Developer');

const FAQS = [
  {
    question: 'How quickly can I hire a JavaScript developer?',
    answer:
      'You can onboard a dedicated JavaScript developer within 48–72 hours after we discuss your requirements, tech stack, and team preferences.',
  },
  {
    question: 'Do your developers work in my time zone?',
    answer:
      'Yes. Our developers can overlap with your time zone for daily standups, sprint reviews, and real-time collaboration.',
  },
  {
    question: 'Can I interview the developer before hiring?',
    answer:
      'Absolutely. We provide a shortlist of pre-vetted candidates, and you interview them to confirm technical and cultural fit.',
  },
  {
    question: 'What JavaScript frameworks do your developers specialize in?',
    answer:
      'Our team works across React, Vue, Angular, Node.js, Express, TypeScript, and modern tooling. We match developers to your existing stack.',
  },
  {
    question: 'Do you provide post-launch support?',
    answer:
      'Yes. We offer ongoing support and maintenance packages to keep your application secure, updated, and performing optimally.',
  },
];

export default function HireJavascriptDeveloperPage() {
  return (
    <main>
      <section className="relative min-h-[560px] overflow-hidden md:min-h-[620px]">
        <Image
          src={HERO_IMAGE}
          alt="Hire JavaScript developers"
          fill
          priority
          className="object-cover object-center"
        />

        <HireHeroOverlay />

        <div className="relative z-10 mx-auto flex min-h-[560px] max-w-[1340px] items-center px-4 pb-12 pt-12 sm:px-6 md:min-h-[620px] lg:px-8">
          <div className="w-full max-w-xl text-white">
            <h1 className="text-3xl font-bold italic leading-tight tracking-wide md:text-4xl lg:text-[40px]">
              Hire JavaScript Development Experts
            </h1>
            <p className="mt-5 text-[13px] font-normal leading-7 text-gray-100 md:text-[14px]">
              Build fast, dynamic, and scalable web applications with our expert JavaScript developers.
              We specialize in modern frameworks, clean architecture, and optimized performance tailored
              to your business needs.
            </p>
            <p className="mt-4 text-[13px] font-normal leading-7 text-gray-100 md:text-[14px]">
              Our team ensures high performance, seamless UI interactions, and robust backend connectivity
              to deliver powerful digital solutions.
            </p>

            <Link
              href="#hire-inquiry"
              className="mt-8 inline-flex rounded-md bg-[#5b9cff] px-8 py-3 text-[15px] font-medium text-white transition-colors hover:bg-[#4a8bee]"
            >
              Hire Now
            </Link>
          </div>
        </div>
      </section>

      <HireWhySplit
        bg="white" />

      <HireSkillsGrid
        bg="muted" skills={SKILLS} />

      <HireTechStack
        bg="white" technologies={javascriptTechnologies} />

      <HireProcessPanel
        bg="muted" title="How Hiring a JavaScript Developer Works" steps={PROCESS_STEPS} />

      <HireEngagementCards
        bg="white" models={ENGAGEMENT_MODELS} />

      <HireInquiryPanel
        bg="muted" roleTitle="JavaScript Developer" serviceName="JavaScript Development" />

      <HireFaqAccordion
        bg="white" faqs={FAQS} />
    </main>
  );
}
