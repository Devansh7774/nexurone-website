import {
  Server,
  ShoppingBag,
  Building2,
  Cloud,
  Layers3,
  ShieldCheck,
  Handshake,
  Database,
  Layers,
  Plug,
  Zap,
  Rocket,
  ClipboardList,
  Code2,
} from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import FaqSection from './FaqSection';
import ServiceInquirySection from '@/components/services/ServiceInquirySection';
import ServiceOverview from '@/components/services/ServiceOverview';
import ServiceSolutionsGrid from '@/components/services/ServiceSolutionsGrid';
import ServiceProcessSection from '@/components/services/ServiceProcessSection';
import ServiceDifferentiators from '@/components/services/ServiceDifferentiators';
import { serviceAuditMetadata } from '@/lib/auditMetadata';
import { getServiceHeroImage, getServiceOverviewImage } from '@/lib/serviceHeroImages';

const HERO_IMAGE = getServiceHeroImage('dot-net');
const OVERVIEW_IMAGE = getServiceOverviewImage('dot-net');

const OVERVIEW_ITEMS = [
  {
    icon: Server,
    title: 'Enterprise applications',
    description: 'ASP.NET Core apps built with C# for reliability and long-term support.',
  },
  {
    icon: Database,
    title: 'Data layer & ORM',
    description: 'Entity Framework, SQL Server, and optimized data access patterns.',
  },
  {
    icon: Layers,
    title: 'Clean architecture',
    description: 'Modular, testable code with separation of concerns and SOLID principles.',
  },
  {
    icon: Plug,
    title: 'API & integrations',
    description: 'REST APIs, Azure services, and legacy system connectivity.',
  },
  {
    icon: Zap,
    title: 'Performance tuning',
    description: 'Caching, async patterns, and cloud-native optimization.',
  },
  {
    icon: Rocket,
    title: 'Azure deployment',
    description: 'Cloud deployment, CI/CD pipelines, and ongoing maintenance.',
  },
];

const INDUSTRIES = [
  {
    icon: Building2,
    title: 'Enterprise portals',
    description:
      'Internal business tools, workflow systems, and customer-facing portals for large organizations.',
    examples: ['Workflows', 'Reporting', 'SSO integration'],
  },
  {
    icon: Cloud,
    title: 'Cloud-native services',
    description:
      'Microservices, serverless functions, and scalable APIs deployed on Azure.',
    examples: ['Microservices', 'Azure Functions', 'API gateways'],
  },
  {
    icon: Server,
    title: 'API platforms',
    description:
      'API-first architectures that power web, mobile, and third-party integrations.',
    examples: ['REST APIs', 'Auth & security', 'Documentation'],
  },
  {
    icon: ShoppingBag,
    title: 'Business applications',
    description:
      'Line-of-business apps, CRM extensions, and operational tools with complex logic.',
    examples: ['Business logic', 'Integrations', 'Role-based access'],
  },
];

const PROCESS_STEPS = [
  {
    icon: ClipboardList,
    title: 'Discovery & planning',
    description:
      'We align on business goals, compliance needs, and technical requirements before development.',
    deliverables: [
      'Requirements & user flows',
      'Technical architecture',
      'Sprint roadmap & timeline',
      'Integration plan',
    ],
  },
  {
    icon: Code2,
    title: 'Design, build & test',
    description:
      'We build scalable .NET applications with clean architecture and enterprise-grade QA.',
    deliverables: [
      'UI & API implementation',
      'Azure & third-party integrations',
      'Security & performance QA',
      'Staging environment for review',
    ],
  },
  {
    icon: Rocket,
    title: 'Launch & grow',
    description:
      'We deploy to production, monitor stability, and support your application as it scales.',
    deliverables: [
      'Production deployment',
      'Performance monitoring',
      'Security patches & updates',
      'Feature enhancements',
    ],
  },
];

const DIFFERENTIATORS = [
  {
    icon: Layers3,
    title: 'Full-cycle ownership',
    description:
      'One team handles discovery through deployment — you are not juggling separate vendors for each phase.',
  },
  {
    icon: ShieldCheck,
    title: 'Production-ready code',
    description:
      'We write testable, documented C# code with clean architecture so your product is easy to extend.',
  },
  {
    icon: Handshake,
    title: 'Partnership after launch',
    description:
      'We stay involved post-release with monitoring, updates, and new features as your app evolves.',
  },
];

export const metadata = serviceAuditMetadata('dot-net');

export default function DotNetPage() {
  return (
    <main>
      <PageHero
        image={HERO_IMAGE}
        imageAlt=".NET development illustration with ASP.NET Core, C#, and enterprise solutions"
        imagePosition="object-right"
        title=".NET Development Company"
        description="Build secure, scalable enterprise applications with ASP.NET Core, C#, Entity Framework, and Azure — tailored for startups and enterprises."
        hireForm
        align="left"
      />

      <ServiceOverview
        bg="white"
        eyebrow="What we do"
        title=".NET solutions that drive real impact"
        titleHighlight="real impact"
        description="We provide end-to-end .NET development designed to solve problems, create value, and help your enterprise product grow sustainably."
        imageSrc={OVERVIEW_IMAGE}
        imageAlt="Team collaborating on .NET enterprise application development at a workspace desk"
        items={OVERVIEW_ITEMS}
      />

      <ServiceSolutionsGrid
        bg="muted"
        eyebrow="Industries"
        title="Where we apply .NET development"
        description="We have delivered .NET applications across enterprise, cloud, and business domains — here are the areas we know best."
        solutions={INDUSTRIES}
      />

      <ServiceProcessSection
        bg="white"
        eyebrow="Delivery process"
        title="How we take your app from concept to production"
        description="A transparent, milestone-driven process so you always know what is being built and when."
        steps={PROCESS_STEPS}
      />

      <ServiceDifferentiators
        bg="muted"
        eyebrow="Why Nexuron"
        title="Why clients choose us for .NET"
        description="Beyond the framework — this is what working with our team actually looks like."
        items={DIFFERENTIATORS}
      />

      <ServiceInquirySection
        bg="white"
        serviceName="Microsoft .NET Development"
        hireSubject=".NET Developer"
      />

      <FaqSection />
    </main>
  );
}
