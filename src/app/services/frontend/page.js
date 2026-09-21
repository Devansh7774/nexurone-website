import {
  Monitor,
  ShoppingBag,
  Building2,
  LayoutDashboard,
  Layers3,
  ShieldCheck,
  Handshake,
  Palette,
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

const HERO_IMAGE = getServiceHeroImage('frontend');
const OVERVIEW_IMAGE = getServiceOverviewImage('frontend');

const OVERVIEW_ITEMS = [
  {
    icon: Monitor,
    title: 'Responsive web apps',
    description: 'React, Angular, and Vue.js interfaces that work across browsers and devices.',
  },
  {
    icon: Palette,
    title: 'UI/UX implementation',
    description: 'Pixel-perfect, accessible interfaces with modern design patterns.',
  },
  {
    icon: Layers,
    title: 'Component architecture',
    description: 'Reusable components and state management for scalable frontends.',
  },
  {
    icon: Plug,
    title: 'API integration',
    description: 'REST, GraphQL, and real-time data connections with backend services.',
  },
  {
    icon: Zap,
    title: 'Performance tuning',
    description: 'Loading speed, code splitting, and rendering optimization.',
  },
  {
    icon: Rocket,
    title: 'Deployment & support',
    description: 'Production releases, monitoring, and ongoing frontend maintenance.',
  },
];

const INDUSTRIES = [
  {
    icon: LayoutDashboard,
    title: 'SaaS dashboards',
    description:
      'Data-rich admin panels, analytics views, and workflow tools with intuitive navigation.',
    examples: ['Data tables', 'Charts', 'Role-based views'],
  },
  {
    icon: Monitor,
    title: 'Marketing websites',
    description:
      'Fast, SEO-friendly landing pages and corporate sites that convert visitors into leads.',
    examples: ['Landing pages', 'CMS integration', 'SEO optimization'],
  },
  {
    icon: ShoppingBag,
    title: 'E-commerce storefronts',
    description:
      'Product catalogs, cart, checkout, and account management for online retailers.',
    examples: ['Product pages', 'Checkout', 'Order tracking'],
  },
  {
    icon: Building2,
    title: 'Enterprise portals',
    description:
      'Internal tools, customer portals, and B2B platforms integrated with business systems.',
    examples: ['SSO integration', 'Workflows', 'Reporting'],
  },
];

const PROCESS_STEPS = [
  {
    icon: ClipboardList,
    title: 'Discovery & planning',
    description:
      'We define project goals, audience needs, and design expectations before development.',
    deliverables: [
      'Requirements & user flows',
      'Component architecture',
      'Sprint roadmap & timeline',
      'API integration plan',
    ],
  },
  {
    icon: Code2,
    title: 'Design, build & test',
    description:
      'We build responsive interfaces with reusable components and cross-browser QA.',
    deliverables: [
      'UI implementation',
      'API integration',
      'Accessibility & performance QA',
      'Staging builds for review',
    ],
  },
  {
    icon: Rocket,
    title: 'Launch & grow',
    description:
      'We deploy your frontend, monitor performance, and support ongoing improvements.',
    deliverables: [
      'Production deployment',
      'Performance monitoring',
      'Bug fixes & updates',
      'Feature enhancements',
    ],
  },
];

const DIFFERENTIATORS = [
  {
    icon: Layers3,
    title: 'Full-cycle ownership',
    description:
      'One team handles design through deployment — you are not juggling separate vendors for each phase.',
  },
  {
    icon: ShieldCheck,
    title: 'Production-ready code',
    description:
      'We write clean, testable frontend code with solid component structure so your product is easy to extend.',
  },
  {
    icon: Handshake,
    title: 'Partnership after launch',
    description:
      'We stay involved post-release with updates, performance tuning, and new features as your product grows.',
  },
];

export const metadata = serviceAuditMetadata('frontend');

export default function FrontendPage() {
  return (
    <main>
      <PageHero
        image={HERO_IMAGE}
        imageAlt="Frontend development illustration with React, TypeScript, responsive design, and clean code"
        imagePosition="object-right"
        title="Frontend Development Company"
        description="Build fast, responsive, pixel-perfect interfaces with React, Angular, Vue.js, and TypeScript — tailored for startups and enterprises."
        hireForm
        align="left"
      />

      <ServiceOverview
        bg="white"
        eyebrow="What we do"
        title="Frontend solutions that drive real impact"
        titleHighlight="real impact"
        description="We provide end-to-end frontend development designed to solve problems, create value, and help your web product grow sustainably."
        imageSrc={OVERVIEW_IMAGE}
        imageAlt="Team collaborating on frontend development and UI strategy at a workspace desk"
        items={OVERVIEW_ITEMS}
      />

      <ServiceSolutionsGrid
        bg="muted"
        eyebrow="Industries"
        title="Where we apply frontend development"
        description="We have delivered frontend solutions across SaaS, retail, and enterprise domains — here are the areas we know best."
        solutions={INDUSTRIES}
      />

      <ServiceProcessSection
        bg="white"
        eyebrow="Delivery process"
        title="How we take your product from concept to production"
        description="A transparent, milestone-driven process so you always know what is being built and when."
        steps={PROCESS_STEPS}
      />

      <ServiceDifferentiators
        bg="muted"
        eyebrow="Why Nexuron"
        title="Why clients choose us for frontend"
        description="Beyond the frameworks — this is what working with our team actually looks like."
        items={DIFFERENTIATORS}
      />

      <ServiceInquirySection
        bg="white"
        serviceName="Frontend Web Development"
        hireSubject="Frontend Developer"
      />

      <FaqSection />
    </main>
  );
}
