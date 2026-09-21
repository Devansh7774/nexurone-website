import {
  Cloud,
  Server,
  Building2,
  Shield,
  Layers3,
  ShieldCheck,
  Handshake,
  GitBranch,
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

const HERO_IMAGE = getServiceHeroImage('devops');
const OVERVIEW_IMAGE = getServiceOverviewImage('devops');

const OVERVIEW_ITEMS = [
  {
    icon: GitBranch,
    title: 'CI/CD pipelines',
    description: 'Automated build, test, and deployment workflows for faster releases.',
  },
  {
    icon: Cloud,
    title: 'Cloud infrastructure',
    description: 'AWS, Azure, and GCP setup with infrastructure as code.',
  },
  {
    icon: Layers,
    title: 'Container orchestration',
    description: 'Docker, Kubernetes, and scalable microservice deployments.',
  },
  {
    icon: Plug,
    title: 'Monitoring & alerting',
    description: '24/7 observability, log aggregation, and incident response.',
  },
  {
    icon: Zap,
    title: 'Performance optimization',
    description: 'Infrastructure tuning, auto-scaling, and cost optimization.',
  },
  {
    icon: Rocket,
    title: 'Security & compliance',
    description: 'Hardening, secrets management, and compliance-ready configurations.',
  },
];

const INDUSTRIES = [
  {
    icon: Server,
    title: 'SaaS platforms',
    description:
      'Reliable CI/CD, auto-scaling, and monitoring for high-availability SaaS products.',
    examples: ['CI/CD pipelines', 'Auto-scaling', 'Uptime monitoring'],
  },
  {
    icon: Cloud,
    title: 'Cloud migration',
    description:
      'Moving on-premise systems to AWS, Azure, or GCP with minimal downtime.',
    examples: ['Migration planning', 'IaC setup', 'Cutover support'],
  },
  {
    icon: Building2,
    title: 'Enterprise infrastructure',
    description:
      'Multi-environment setups, disaster recovery, and compliance-ready cloud architecture.',
    examples: ['Multi-env setup', 'DR planning', 'Compliance configs'],
  },
  {
    icon: Shield,
    title: 'Security & reliability',
    description:
      'Infrastructure hardening, secrets management, and incident response automation.',
    examples: ['Security audits', 'Secrets vault', 'Alert automation'],
  },
];

const PROCESS_STEPS = [
  {
    icon: ClipboardList,
    title: 'Assessment & planning',
    description:
      'We audit your current infrastructure, identify bottlenecks, and define a DevOps roadmap.',
    deliverables: [
      'Infrastructure audit',
      'CI/CD strategy',
      'Implementation timeline',
      'Tooling recommendations',
    ],
  },
  {
    icon: Code2,
    title: 'Build & automate',
    description:
      'We implement pipelines, infrastructure as code, and monitoring with staged rollouts.',
    deliverables: [
      'CI/CD pipeline setup',
      'IaC configuration',
      'Monitoring & alerting',
      'Staging environment validation',
    ],
  },
  {
    icon: Rocket,
    title: 'Deploy & optimize',
    description:
      'We go live, monitor stability, and continuously optimize for performance and cost.',
    deliverables: [
      'Production deployment',
      '24/7 monitoring setup',
      'Incident response playbooks',
      'Ongoing optimization',
    ],
  },
];

const DIFFERENTIATORS = [
  {
    icon: Layers3,
    title: 'End-to-end DevOps ownership',
    description:
      'One team handles assessment through production — you are not juggling separate infra and release vendors.',
  },
  {
    icon: ShieldCheck,
    title: 'Reliable, repeatable deployments',
    description:
      'We build automated pipelines and infrastructure as code so releases are predictable and rollback-safe.',
  },
  {
    icon: Handshake,
    title: 'Partnership after launch',
    description:
      'We stay involved with monitoring, incident response, and infrastructure improvements as your product scales.',
  },
];

export const metadata = serviceAuditMetadata('devops');

export default function DevOpsPage() {
  return (
    <main>
      <PageHero
        image={HERO_IMAGE}
        imageAlt="DevOps services illustration with CI/CD, cloud infrastructure, and automation"
        imagePosition="object-right"
        title="DevOps Services"
        description="Accelerate software delivery with CI/CD pipelines, infrastructure as code, cloud automation, and 24/7 monitoring — tailored for startups and enterprises."
        hireForm
        align="left"
      />

      <ServiceOverview
        bg="white"
        eyebrow="What we do"
        title="DevOps solutions that drive real impact"
        titleHighlight="real impact"
        description="We provide end-to-end DevOps services designed to accelerate delivery, improve reliability, and help your infrastructure scale sustainably."
        imageSrc={OVERVIEW_IMAGE}
        imageAlt="Team collaborating on DevOps and cloud infrastructure strategy at a workspace desk"
        items={OVERVIEW_ITEMS}
      />

      <ServiceSolutionsGrid
        bg="muted"
        eyebrow="Industries"
        title="Where we apply DevOps"
        description="We have delivered DevOps solutions across SaaS, enterprise, and cloud migration projects — here are the areas we know best."
        solutions={INDUSTRIES}
      />

      <ServiceProcessSection
        bg="white"
        eyebrow="Delivery process"
        title="How we transform your delivery pipeline"
        description="A transparent, milestone-driven process so you always know what is being built and when."
        steps={PROCESS_STEPS}
      />

      <ServiceDifferentiators
        bg="muted"
        eyebrow="Why Nexuron"
        title="Why clients choose us for DevOps"
        description="Beyond the tooling — this is what working with our team actually looks like."
        items={DIFFERENTIATORS}
      />

      <ServiceInquirySection
        bg="white"
        serviceName="DevOps & Cloud Engineering"
        hireSubject="DevOps Engineer"
      />

      <FaqSection />
    </main>
  );
}
