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

const HERO_IMAGE = getServiceHeroImage('react-native');
const OVERVIEW_IMAGE = getServiceOverviewImage('react-native');

const OVERVIEW_ITEMS = [
  {
    icon: Smartphone,
    title: 'Cross-platform apps',
    description: 'Single codebase for iOS and Android with native-like performance.',
  },
  {
    icon: Palette,
    title: 'UI/UX implementation',
    description: 'Engaging interfaces with smooth navigation and reusable components.',
  },
  {
    icon: Layers,
    title: 'State & architecture',
    description: 'Redux, Zustand, or Context for scalable app structure.',
  },
  {
    icon: Plug,
    title: 'Native integrations',
    description: 'Third-party SDKs, push notifications, and device APIs.',
  },
  {
    icon: Zap,
    title: 'Performance tuning',
    description: 'Optimized rendering, lazy loading, and memory management.',
  },
  {
    icon: Rocket,
    title: 'Deployment & support',
    description: 'App Store and Play Store releases with post-launch maintenance.',
  },
];

const INDUSTRIES = [
  {
    icon: Smartphone,
    title: 'Marketplace & on-demand apps',
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
    title: 'Enterprise & B2B tools',
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
      'We write testable, documented React Native code with clean architecture so your product is easy to extend later.',
  },
  {
    icon: Handshake,
    title: 'Partnership after launch',
    description:
      'We stay involved post-release with monitoring, updates, and new features as your app evolves.',
  },
];

export const metadata = serviceAuditMetadata('react-native');

export default function ReactNativePage() {
  return (
    <main>
      <PageHero
        image={HERO_IMAGE}
        imageAlt="React Native app development illustration with cross-platform iOS and Android support"
        imagePosition="object-right"
        title="React Native App Development Company"
        description="Build powerful cross-platform mobile apps for iOS and Android with React Native — fast performance, code reusability, and native-like UX."
        hireForm
        align="left"
      />

      <ServiceOverview
        bg="white"
        eyebrow="What we do"
        title="React Native solutions that drive real impact"
        titleHighlight="real impact"
        description="We provide end-to-end React Native development designed to solve problems, create value, and help your mobile product grow sustainably."
        imageSrc={OVERVIEW_IMAGE}
        imageAlt="Team collaborating on mobile app strategy and development at a workspace desk"
        items={OVERVIEW_ITEMS}
      />

      <ServiceSolutionsGrid
        bg="muted"
        eyebrow="Industries"
        title="Where we apply React Native"
        description="We have delivered React Native apps across consumer and enterprise domains — here are the areas we know best."
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
        title="Why clients choose us for React Native"
        description="Beyond the framework — this is what working with our team actually looks like."
        items={DIFFERENTIATORS}
      />

      <ServiceInquirySection
        bg="white"
        serviceName="React Native App Development"
        hireSubject="React Native Developer"
      />

      <FaqSection />
    </main>
  );
}
