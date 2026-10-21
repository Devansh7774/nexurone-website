import {
  Bot,
  MessageSquare,
  Sparkles,
  Database,
  Workflow,
  Wand2,
  Mic,
  Lightbulb,
  Layers3,
  ShieldCheck,
  Handshake,
  ClipboardList,
  Code2,
  Rocket,
  Building2,
  ShoppingBag,
  Factory,
  Headphones,
} from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import ServiceInquirySection from '@/components/services/ServiceInquirySection';
import ServiceOverview from '@/components/services/ServiceOverview';
import ServiceSolutionsGrid from '@/components/services/ServiceSolutionsGrid';
import ServiceProcessSection from '@/components/services/ServiceProcessSection';
import ServiceDifferentiators from '@/components/services/ServiceDifferentiators';
import AiDevelopmentFaqSection from '@/components/services/AiDevelopmentFaqSection';
import { getAiDevelopmentService } from '@/lib/aiDevelopmentServices';
import { getServiceHeroImage, getServiceOverviewImage } from '@/lib/serviceHeroImages';

const SLUG_ICONS = {
  'ai-chatbot': MessageSquare,
  'ai-agent': Bot,
  'llm-integration': Sparkles,
  'rag-knowledge-bots': Database,
  'ai-workflow-automation': Workflow,
  'generative-ai': Wand2,
  'ai-voice-assistants': Mic,
  'ai-consulting': Lightbulb,
};

const SOLUTION_ICONS = [ShoppingBag, Building2, Headphones, Factory];

const PROCESS_STEPS = [
  {
    icon: ClipboardList,
    title: 'Discover and scope',
    description:
      'We clarify goals, data sources, integrations, and success metrics before implementation begins.',
    deliverables: [
      'Use-case definition',
      'Integration map',
      'Success metrics',
      'Delivery plan',
    ],
  },
  {
    icon: Code2,
    title: 'Build and validate',
    description:
      'We implement the solution, connect supported systems, and validate quality with real scenarios.',
    deliverables: [
      'Working MVP',
      'Prompt / retrieval tuning',
      'Staging review',
      'Appropriate safeguards',
    ],
  },
  {
    icon: Rocket,
    title: 'Launch and improve',
    description:
      'We launch, monitor usage and quality, and improve based on real outcomes and feedback.',
    deliverables: [
      'Production launch',
      'Monitoring setup',
      'Iteration backlog',
      'Handoff documentation',
    ],
  },
];

const DIFFERENTIATORS = [
  {
    icon: Layers3,
    title: 'Practical delivery',
    description:
      'Focused on real business needs — chat, CRM, calls, and automations your team can operate.',
  },
  {
    icon: ShieldCheck,
    title: 'Appropriate safeguards',
    description:
      'Permissions, escalation paths, and evaluation designed for the workflow — reducing risk without overclaiming certainty.',
  },
  {
    icon: Handshake,
    title: 'Ongoing improvement',
    description:
      'After launch we can support monitoring, refinements, and new use cases as your needs evolve.',
  },
];
export default function AiDevelopmentServicePage({ slug }) {
  const service = getAiDevelopmentService(slug);
  if (!service) return null;

  const PrimaryIcon = SLUG_ICONS[slug] ?? Sparkles;
  const heroImage = getServiceHeroImage(slug) ?? getServiceHeroImage('ai-ml');
  const overviewImage = getServiceOverviewImage(slug) ?? getServiceOverviewImage('ai-ml');

  const overviewItems = service.overviewItems.map((item, index) => ({
    ...item,
    icon: index === 0 ? PrimaryIcon : [Sparkles, Bot, Workflow, Database, Wand2, Mic][index % 6],
  }));

  const solutions = service.solutions.map((item, index) => ({
    ...item,
    icon: SOLUTION_ICONS[index % SOLUTION_ICONS.length],
  }));

  return (
    <main>
      <PageHero
        image={heroImage}
        imageAlt={`${service.heroTitle} illustration`}
        imagePosition="object-right"
        title={service.heroTitle}
        description={service.heroDescription}
        hireForm
        align="left"
      />

      <ServiceOverview
        bg="white"
        eyebrow="What we do"
        title={service.overviewTitle}
        titleHighlight={service.overviewHighlight}
        description={service.overviewDescription}
        imageSrc={overviewImage}
        imageAlt={`Team working on ${service.shortName}`}
        items={overviewItems}
      />

      <ServiceSolutionsGrid
        bg="muted"
        eyebrow="Where it fits"
        title={`Where ${service.shortName} creates value`}
        description="Common industries and teams we help with this capability."
        solutions={solutions}
      />

      <ServiceProcessSection
        bg="white"
        eyebrow="Delivery process"
        title="How we deliver AI projects"
        description="Discover and scope → Build and validate → Launch and improve."
        steps={PROCESS_STEPS}
      />

      <ServiceDifferentiators
        bg="muted"
        eyebrow="Why Nexuron"
        title={`Why teams work with us on ${service.shortName}`}
        description="Practical delivery focused on real business needs, appropriate safeguards, and ongoing improvement after launch."
        items={DIFFERENTIATORS}
      />

      <ServiceInquirySection
        bg="white"
        serviceName={service.serviceName}
        hireSubject={service.hireSubject}
      />

      <AiDevelopmentFaqSection
        serviceName={service.shortName}
        faqs={service.faqs}
      />
    </main>
  );
}
