import {
  Building2,
  Layers3,
  ShieldCheck,
  Handshake,
  ClipboardList,
  Code2,
  Rocket,
  Sparkles,
  Workflow,
  Database,
  Bot,
  Target,
} from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import ServiceInquirySection from '@/components/services/ServiceInquirySection';
import ServiceOverview from '@/components/services/ServiceOverview';
import ServiceSolutionsGrid from '@/components/services/ServiceSolutionsGrid';
import ServiceBenefitsGrid from '@/components/services/ServiceBenefitsGrid';
import ServiceCapabilitiesList from '@/components/services/ServiceCapabilitiesList';
import ServiceProcessSection from '@/components/services/ServiceProcessSection';
import ServiceDifferentiators from '@/components/services/ServiceDifferentiators';
import AiDevelopmentFaqSection from '@/components/services/AiDevelopmentFaqSection';
import IndustryCaseStudiesSection from '@/components/industry/IndustryCaseStudiesSection';
import IndustryRelatedSection from '@/components/industry/IndustryRelatedSection';
import IndustryVisualMosaic from '@/components/industry/IndustryVisualMosaic';
import IndustryChallengesSection from '@/components/industry/IndustryChallengesSection';
import IndustryHowTechnologyHelps from '@/components/industry/IndustryHowTechnologyHelps';
import { getIndustry } from '@/lib/industries';
import { getIndustryImages } from '@/lib/industryImages';
import { getServiceHeroImage, getServiceOverviewImage } from '@/lib/serviceHeroImages';

const PROCESS_STEPS = [
  {
    icon: ClipboardList,
    title: 'Industry discovery',
    description:
      'We learn your workflows, compliance needs, and customer journeys before proposing a build plan.',
    deliverables: [
      'Stakeholder workshops',
      'Priority use cases',
      'Integration inventory',
      'Delivery roadmap',
    ],
  },
  {
    icon: Code2,
    title: 'Design & build',
    description:
      'We ship in milestones: UX, core features, integrations, and staging reviews your team can validate.',
    deliverables: [
      'UX & architecture',
      'Feature milestones',
      'System integrations',
      'Staging demos',
    ],
  },
  {
    icon: Rocket,
    title: 'Launch & support',
    description:
      'We go live carefully, train users, and stay available for improvements as operations evolve.',
    deliverables: [
      'Production launch',
      'Team training',
      'Monitoring',
      'Iteration backlog',
    ],
  },
];

const DIFFERENTIATORS = [
  {
    icon: Layers3,
    title: 'Domain-aware delivery',
    description:
      'We shape solutions around how your industry actually operates, not a one-size template.',
  },
  {
    icon: ShieldCheck,
    title: 'Security and reliability',
    description:
      'Access control, auditability, and stable deployments are part of the plan from day one.',
  },
  {
    icon: Handshake,
    title: 'Long-term partnership',
    description:
      'After launch we keep improving with you as regulations, channels, and customers change.',
  },
];

const SOLUTION_ICONS = [Building2, Layers3, ShieldCheck, Rocket, Sparkles, Workflow];
const USE_CASE_ICONS = [Target, Workflow, Bot, Database, Sparkles, Building2];
const OVERVIEW_ICONS = [Building2, Layers3, ShieldCheck, Rocket, Bot, Database];

export default function IndustryPage({ slug }) {
  const industry = getIndustry(slug);
  if (!industry) return null;

  const visuals = getIndustryImages(slug);
  const heroImage = visuals?.hero ?? getServiceHeroImage('ai-ml');
  const overviewImage = visuals?.overview ?? getServiceOverviewImage('ai-ml');
  const howWeHelpImage = visuals?.overview ?? overviewImage;
  const hasCaseStudies = Boolean(industry.caseStudySlugs?.length);

  const overviewItems = industry.focusAreas.map((item, index) => ({
    ...item,
    icon: OVERVIEW_ICONS[index % OVERVIEW_ICONS.length],
  }));

  const useCases = (industry.useCases?.length ? industry.useCases : []).map((item, index) => ({
    ...item,
    icon: USE_CASE_ICONS[index % USE_CASE_ICONS.length],
  }));

  const solutions = (industry.solutions?.length ? industry.solutions : industry.focusAreas).map(
    (item, index) => ({
      ...item,
      icon: SOLUTION_ICONS[index % SOLUTION_ICONS.length],
      image: visuals?.solutions?.[index],
      imageAlt: `${item.title} in ${industry.name}`,
    })
  );

  return (
    <main>
      <PageHero
        image={heroImage}
        imageAlt={visuals?.heroAlt ?? `${industry.name} technology solutions`}
        imagePosition="object-right"
        title={industry.heroTitle}
        description={industry.heroDescription}
        hireForm
        align="left"
      />

      <ServiceOverview
        bg="white"
        eyebrow="How we help"
        title={industry.overviewTitle}
        titleHighlight={industry.overviewHighlight}
        description={industry.overviewDescription}
        imageSrc={overviewImage}
        imageAlt={visuals?.overviewAlt ?? `Nexuron team delivering ${industry.name} solutions`}
        items={overviewItems}
      />

      <IndustryChallengesSection
        industryName={industry.name}
        challenges={industry.challenges}
        description={industry.challengesDescription}
        bg="muted"
      />

      <IndustryVisualMosaic
        industryName={industry.name}
        visuals={visuals?.mosaic ?? []}
        bg="white"
      />

      {useCases.length ? (
        <ServiceSolutionsGrid
          bg="muted"
          eyebrow="Use cases"
          title={
            industry.useCasesTitle ||
            `Relevant ${industry.name.toLowerCase()} use cases`
          }
          description={
            industry.useCasesDescription ||
            `Specific situations where technology changes outcomes for ${industry.name.toLowerCase()} teams.`
          }
          solutions={useCases}
        />
      ) : null}

      <ServiceSolutionsGrid
        bg="white"
        eyebrow="Solutions"
        title={`Solutions we build for ${industry.name.toLowerCase()} businesses`}
        description={`Product and platform work shaped around ${industry.name.toLowerCase()} workflows, not generic software templates.`}
        solutions={solutions}
      />

      <ServiceBenefitsGrid
        bg="muted"
        eyebrow="Key benefits"
        title={`Benefits for ${industry.name.toLowerCase()} organizations`}
        description={`What ${industry.name.toLowerCase()} teams gain when software fits their real operations, customers, and constraints.`}
        benefits={industry.benefits}
      />

      <IndustryHowTechnologyHelps
        industryName={industry.name}
        title={industry.howWeHelpTitle}
        description={industry.howWeHelpDescription}
        points={industry.howWeHelp}
        imageSrc={howWeHelpImage}
        imageAlt={visuals?.overviewAlt ?? `${industry.name} technology in practice`}
        bg="white"
      />

      {industry.technologies?.length ? (
        <ServiceCapabilitiesList
          bg="muted"
          eyebrow="Capabilities"
          title={`Technology capabilities for ${industry.name.toLowerCase()}`}
          description={`Platforms, integrations, and AI applications we apply when they create measurable value in ${industry.name.toLowerCase()}.`}
          capabilities={industry.technologies}
        />
      ) : null}

      <IndustryCaseStudiesSection
        industryName={industry.name}
        caseStudySlugs={industry.caseStudySlugs}
        bg="white"
      />

      <IndustryRelatedSection
        industryName={industry.name}
        relatedSlugs={industry.relatedSlugs}
        bg={hasCaseStudies ? 'muted' : 'white'}
      />

      <ServiceProcessSection
        bg={hasCaseStudies ? 'white' : 'muted'}
        eyebrow="Delivery process"
        title={`How we deliver for ${industry.name}`}
        description={`A transparent process shaped around ${industry.name.toLowerCase()} discovery, build milestones, and launch readiness.`}
        steps={PROCESS_STEPS}
      />

      <ServiceDifferentiators
        bg={hasCaseStudies ? 'muted' : 'white'}
        eyebrow="Why Nexuron"
        title={`Why ${industry.name} teams work with us`}
        description={`Partnership built around ${industry.name.toLowerCase()} domain reality, secure delivery, and long-term iteration.`}
        items={DIFFERENTIATORS}
      />

      {industry.faqs?.length ? (
        <AiDevelopmentFaqSection
          serviceName={industry.name}
          faqs={industry.faqs}
          description={`Common questions about our ${industry.name.toLowerCase()} work, from scope and integrations to AI and delivery.`}
        />
      ) : null}

      <ServiceInquirySection
        bg="muted"
        serviceName={`${industry.name} Solutions`}
        hireSubject={`${industry.name} Project`}
        eyebrow="Next step"
        title={industry.ctaTitle ?? `Let's discuss your ${industry.name.toLowerCase()} project`}
        description={
          industry.ctaDescription ??
          `Tell us about your ${industry.name.toLowerCase()} goals. We will help you scope a practical build plan.`
        }
      />
    </main>
  );
}
