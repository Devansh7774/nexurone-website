import {
  Smartphone,
  CreditCard,
  ShoppingBag,
  Building2,
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

const HERO_IMAGE = getServiceHeroImage('flutter');
const OVERVIEW_IMAGE = getServiceOverviewImage('flutter');

const OVERVIEW_ITEMS = [
  {
    icon: Smartphone,
    title: 'Custom app development',
    description: 'MVP to full-scale Flutter apps for iOS and Android.',
  },
  {
    icon: Palette,
    title: 'UI/UX implementation',
    description: 'Custom widgets, motion design, and responsive layouts.',
  },
  {
    icon: Layers,
    title: 'Architecture & state',
    description: 'Riverpod, Bloc, or Provider for scalable structure.',
  },
  {
    icon: Plug,
    title: 'API integration',
    description: 'REST, GraphQL, Firebase, auth, and third-party services.',
  },
  {
    icon: Zap,
    title: 'Performance tuning',
    description: 'Rendering, lazy loading, and memory optimization.',
  },
  {
    icon: Rocket,
    title: 'Deployment & support',
    description: 'Store releases, updates, and post-launch maintenance.',
  },
];

const INDUSTRIES = [
  {
    icon: Smartphone,
    title: 'On-demand & marketplace apps',
    description:
      'Real-time booking, tracking, and notification flows for delivery, ride-sharing, and service marketplaces.',
    examples: ['Live tracking', 'Push alerts', 'In-app payments'],
  },
  {
    icon: CreditCard,
    title: 'Fintech & banking',
    description:
      'Secure wallets, payment gateways, and transaction flows with architecture ready for compliance requirements.',
    examples: ['KYC flows', 'Payment SDKs', 'Encrypted storage'],
  },
  {
    icon: ShoppingBag,
    title: 'Retail & e-commerce',
    description:
      'Product discovery, cart, checkout, and order management experiences optimized for mobile shoppers.',
    examples: ['Product catalog', 'Checkout', 'Order history'],
  },
  {
    icon: Building2,
    title: 'Enterprise & field operations',
    description:
      'Internal tools and offline-first apps for teams working across sites, warehouses, or remote locations.',
    examples: ['Offline sync', 'Role-based access', 'Reporting'],
  },
];

const PROCESS_STEPS = [
  {
    icon: ClipboardList,
    title: 'Discovery & planning',
    description:
      'We align on business goals, target users, and technical constraints before writing code.',
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
      'We implement features in agile sprints with design reviews and QA built into every release cycle.',
    deliverables: [
      'UI implementation',
      'API & payment integration',
      'Automated & manual QA',
      'Staging builds for review',
    ],
  },
  {
    icon: Rocket,
    title: 'Launch & grow',
    description:
      'We take your app live, monitor stability, and support iterations as your user base expands.',
    deliverables: [
      'App Store & Play Store release',
      'Crash & performance monitoring',
      'Post-launch bug fixes',
      'Feature enhancements',
    ],
  },
];

const DIFFERENTIATORS = [
  {
    icon: Layers3,
    title: 'Full-cycle ownership',
    description:
      'One team handles discovery through deployment — you are not juggling separate design, dev, and release vendors.',
  },
  {
    icon: ShieldCheck,
    title: 'Production-ready code',
    description:
      'We write testable, documented Flutter code with clean architecture so your product is easy to extend later.',
  },
  {
    icon: Handshake,
    title: 'Partnership after launch',
    description:
      'We stay involved post-release with monitoring, updates, and new features as your app evolves.',
  },
];

export const metadata = serviceAuditMetadata('flutter');

export default function FlutterPage() {
  return (
    <main>
      <PageHero
        image={HERO_IMAGE}
        imageAlt="Flutter app development illustration with Dart, widgets, and cross-platform support"
        // badge="Mobile Development"
        imagePosition="object-right"
        title="Flutter App Development Services"
        description="We design and build cross-platform mobile apps for iOS and Android — one codebase, faster delivery, and a consistent experience your users expect."
        hireForm
        align="left"
      />

      <ServiceOverview
        bg="white"
        eyebrow="What we do"
        title="Flutter solutions that drive real impact"
        titleHighlight="real impact"
        description="We provide end-to-end Flutter development designed to solve problems, create value, and help your mobile product grow sustainably."
        imageSrc={OVERVIEW_IMAGE}
        imageAlt="Team collaborating on mobile app strategy and development at a workspace desk"
        items={OVERVIEW_ITEMS}
      />

      <ServiceSolutionsGrid
        bg="muted"
        eyebrow="Industries"
        title="Where we apply Flutter"
        description="We have delivered Flutter apps across consumer and enterprise domains — here are the areas we know best."
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
        title="Why clients choose us for Flutter"
        description="Beyond the framework — this is what working with our team actually looks like."
        items={DIFFERENTIATORS}
      />

      <ServiceInquirySection
        bg="white"
        serviceName="Flutter App Development"
        hireSubject="Flutter Developer"
      />

      <FaqSection />
    </main>
  );
}
