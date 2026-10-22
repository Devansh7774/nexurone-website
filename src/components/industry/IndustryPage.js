import {
  Building2,
  Layers3,
  ShieldCheck,
  Handshake,
  ClipboardList,
  Code2,
  Rocket,
  CheckCircle2,
} from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import ServiceInquirySection from '@/components/services/ServiceInquirySection';
import ServiceOverview from '@/components/services/ServiceOverview';
import ServiceProcessSection from '@/components/services/ServiceProcessSection';
import ServiceDifferentiators from '@/components/services/ServiceDifferentiators';
import { getIndustry } from '@/lib/industries';
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
      'We ship in milestones — UX, core features, integrations, and staging reviews your team can validate.',
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
      'We shape solutions around how your industry actually operates — not a one-size template.',
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

export default function IndustryPage({ slug }) {
  const industry = getIndustry(slug);
  if (!industry) return null;

  const heroImage = getServiceHeroImage('ai-ml');
  const overviewImage = getServiceOverviewImage('ai-ml');

  const overviewItems = industry.focusAreas.map((item, index) => ({
    ...item,
    icon: [Building2, Layers3, ShieldCheck, Rocket][index % 4],
  }));

  return (
    <main>
      <PageHero
        image={heroImage}
        imageAlt={`${industry.name} technology solutions`}
        imagePosition="object-right"
        title={industry.heroTitle}
        description={industry.heroDescription}
        hireForm
        align="left"
      />

      <ServiceOverview
        bg="white"
        eyebrow="What we do"
        title={industry.overviewTitle}
        titleHighlight={industry.overviewHighlight}
        description={industry.overviewDescription}
        imageSrc={overviewImage}
        imageAlt={`Nexuron team delivering ${industry.name} solutions`}
        items={overviewItems}
      />

      <section className="bg-[#F5F7FA] py-16 lg:py-24">
        <div className="mx-auto max-w-[1340px] px-4 sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Outcomes
          </p>
          <h2 className="max-w-3xl text-3xl font-bold text-gray-900 lg:text-4xl">
            What teams in {industry.name.toLowerCase()} typically gain
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {industry.outcomes.map((outcome) => (
              <li
                key={outcome}
                className="flex items-start gap-3 rounded-xl bg-white p-5 shadow-sm"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                <span className="text-[15px] leading-relaxed text-gray-700">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ServiceProcessSection
        bg="white"
        eyebrow="Delivery process"
        title={`How we deliver for ${industry.name}`}
        description="A transparent process from discovery through launch and ongoing improvement."
        steps={PROCESS_STEPS}
      />

      <ServiceDifferentiators
        bg="muted"
        eyebrow="Why Nexuron"
        title={`Why ${industry.name} teams work with us`}
        description="Beyond the build — this is what partnership with Nexuron looks like."
        items={DIFFERENTIATORS}
      />

      <ServiceInquirySection
        bg="white"
        serviceName={`${industry.name} Solutions`}
        hireSubject={`${industry.name} Project`}
      />
    </main>
  );
}
