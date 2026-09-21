import {
  Smartphone,
  Monitor,
  ShoppingBag,
  Building2,
  Layers3,
  ShieldCheck,
  Handshake,
  Palette,
  Layers,
  Search,
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

const HERO_IMAGE = getServiceHeroImage('ui-ux');
const OVERVIEW_IMAGE = getServiceOverviewImage('ui-ux');

const OVERVIEW_ITEMS = [
  {
    icon: Search,
    title: 'User research',
    description: 'Interviews, usability testing, and data-driven insights into user behavior.',
  },
  {
    icon: Palette,
    title: 'UI design',
    description: 'Visual design systems, component libraries, and pixel-perfect interfaces.',
  },
  {
    icon: Layers,
    title: 'Wireframing & prototyping',
    description: 'Interactive prototypes to validate flows before development begins.',
  },
  {
    icon: Smartphone,
    title: 'Responsive design',
    description: 'Consistent experiences across web, mobile, and tablet breakpoints.',
  },
  {
    icon: Zap,
    title: 'Usability optimization',
    description: 'Conversion-focused layouts, accessibility, and friction reduction.',
  },
  {
    icon: Rocket,
    title: 'Design handoff',
    description: 'Developer-ready specs, assets, and design system documentation.',
  },
];

const INDUSTRIES = [
  {
    icon: Monitor,
    title: 'SaaS & web applications',
    description:
      'Dashboard design, workflow optimization, and intuitive interfaces for complex software.',
    examples: ['Dashboard UX', 'Onboarding flows', 'Design systems'],
  },
  {
    icon: Smartphone,
    title: 'Mobile app design',
    description:
      'Native and cross-platform mobile interfaces with platform-appropriate patterns.',
    examples: ['App flows', 'Gestures', 'Mobile components'],
  },
  {
    icon: ShoppingBag,
    title: 'E-commerce experiences',
    description:
      'Product discovery, checkout optimization, and conversion-focused retail design.',
    examples: ['Product pages', 'Checkout UX', 'Cart design'],
  },
  {
    icon: Building2,
    title: 'Enterprise tools',
    description:
      'Internal tools, B2B portals, and workflow interfaces that simplify complex operations.',
    examples: ['Workflow design', 'Data tables', 'Role-based views'],
  },
];

const PROCESS_STEPS = [
  {
    icon: ClipboardList,
    title: 'Research & discovery',
    description:
      'We study your users, business goals, and competitive landscape before designing.',
    deliverables: [
      'User research findings',
      'Personas & journey maps',
      'Information architecture',
      'Design strategy',
    ],
  },
  {
    icon: Code2,
    title: 'Design & prototype',
    description:
      'We create wireframes, visual designs, and interactive prototypes for validation.',
    deliverables: [
      'Wireframes & mockups',
      'Interactive prototypes',
      'Design system components',
      'Usability testing results',
    ],
  },
  {
    icon: Rocket,
    title: 'Handoff & iterate',
    description:
      'We deliver developer-ready specs and support implementation with design QA.',
    deliverables: [
      'Developer handoff package',
      'Design QA during build',
      'Post-launch usability review',
      'Iteration recommendations',
    ],
  },
];

const DIFFERENTIATORS = [
  {
    icon: Layers3,
    title: 'Research-led design',
    description:
      'We base design decisions on user research and data — not assumptions or personal preference.',
  },
  {
    icon: ShieldCheck,
    title: 'Developer-ready deliverables',
    description:
      'We provide clear specs, component libraries, and design systems that development teams can implement accurately.',
  },
  {
    icon: Handshake,
    title: 'Collaborative partnership',
    description:
      'We work alongside your product and engineering teams through handoff and post-launch iteration.',
  },
];

export const metadata = serviceAuditMetadata('ui-ux');

export default function UiUxPage() {
  return (
    <main>
      <PageHero
        image={HERO_IMAGE}
        imageAlt="UI/UX design illustration with wireframes, prototypes, and mobile interface design"
        imagePosition="object-right"
        title="UI/UX Design Services"
        description="Craft intuitive, conversion-focused interfaces with user research, wireframing, prototyping, and responsive design — for web and mobile."
        hireForm
        align="left"
      />

      <ServiceOverview
        bg="white"
        eyebrow="What we do"
        title="UI/UX design that drives real impact"
        titleHighlight="real impact"
        description="We provide end-to-end UI/UX design designed to solve usability problems, improve conversions, and help your product succeed."
        imageSrc={OVERVIEW_IMAGE}
        imageAlt="Design team collaborating on UI/UX strategy and prototyping at a workspace desk"
        items={OVERVIEW_ITEMS}
      />

      <ServiceSolutionsGrid
        bg="muted"
        eyebrow="Industries"
        title="Where we apply UI/UX design"
        description="We have delivered design work across SaaS, retail, and enterprise domains — here are the areas we know best."
        solutions={INDUSTRIES}
      />

      <ServiceProcessSection
        bg="white"
        eyebrow="Delivery process"
        title="How we take your product from research to polished design"
        description="A transparent, milestone-driven process so you always know what is being designed and when."
        steps={PROCESS_STEPS}
      />

      <ServiceDifferentiators
        bg="muted"
        eyebrow="Why Nexuron"
        title="Why clients choose us for UI/UX"
        description="Beyond the screens — this is what working with our design team actually looks like."
        items={DIFFERENTIATORS}
      />

      <ServiceInquirySection
        bg="white"
        serviceName="UI/UX Design"
        hireSubject="UI/UX Designer"
      />

      <FaqSection />
    </main>
  );
}
