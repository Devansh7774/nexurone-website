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

const HERO_IMAGE = getServiceHeroImage('ios');
const OVERVIEW_IMAGE = getServiceOverviewImage('ios');

const OVERVIEW_ITEMS = [
  {
    icon: Smartphone,
    title: 'Native iOS apps',
    description: 'iPhone, iPad, and Apple Watch apps built with Swift and SwiftUI.',
  },
  {
    icon: Palette,
    title: 'Human Interface Design',
    description: 'Polished UI following Apple HIG for intuitive, native experiences.',
  },
  {
    icon: Layers,
    title: 'Scalable architecture',
    description: 'MVVM, Combine, and modular patterns for maintainable codebases.',
  },
  {
    icon: Plug,
    title: 'Apple ecosystem integration',
    description: 'Apple Pay, HealthKit, push notifications, and in-app purchases.',
  },
  {
    icon: Zap,
    title: 'Performance optimization',
    description: 'Fast rendering, efficient memory use, and smooth animations.',
  },
  {
    icon: Rocket,
    title: 'App Store deployment',
    description: 'Submission, review support, updates, and post-launch care.',
  },
];

const INDUSTRIES = [
  {
    icon: Smartphone,
    title: 'Subscription & lifestyle apps',
    description:
      'Engaging consumer apps with subscriptions, social features, and personalized experiences.',
    examples: ['In-app purchases', 'Push notifications', 'User profiles'],
  },
  {
    icon: CreditCard,
    title: 'Fintech & payments',
    description:
      'Secure wallets, Apple Pay integration, and transaction flows with privacy-first design.',
    examples: ['Apple Pay', 'Biometric auth', 'Encrypted storage'],
  },
  {
    icon: ShoppingBag,
    title: 'Retail & e-commerce',
    description:
      'Product discovery, cart, checkout, and order management for Apple device users.',
    examples: ['Product catalog', 'Checkout', 'Order tracking'],
  },
  {
    icon: Building2,
    title: 'Enterprise & productivity',
    description:
      'Internal tools, workflow apps, and B2B solutions integrated with enterprise systems.',
    examples: ['SSO integration', 'Offline access', 'Role-based access'],
  },
];

const PROCESS_STEPS = [
  {
    icon: ClipboardList,
    title: 'Discovery & planning',
    description:
      'We transform your vision into a clear roadmap with features, user flows, and iOS standards.',
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
      'We build scalable iOS apps with sleek UI and rigorous QA for performance and security.',
    deliverables: [
      'UI implementation',
      'API & Apple service integration',
      'Automated & manual QA',
      'TestFlight builds for review',
    ],
  },
  {
    icon: Rocket,
    title: 'Launch & grow',
    description:
      'We publish to the App Store, monitor stability, and support your app as it evolves.',
    deliverables: [
      'App Store release',
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
      'We write testable, documented Swift code with clean architecture so your product is easy to extend later.',
  },
  {
    icon: Handshake,
    title: 'Partnership after launch',
    description:
      'We stay involved post-release with monitoring, updates, and new features as your app evolves.',
  },
];

export const metadata = serviceAuditMetadata('ios');

export default function IOSPage() {
  return (
    <main>
      <PageHero
        image={HERO_IMAGE}
        imageAlt="iOS app development illustration with Swift, App Store, and Apple ecosystem"
        imagePosition="object-right"
        title="iOS App Development Company"
        description="Build high-performance iOS apps for iPhone, iPad, and Apple Watch with Swift, SwiftUI, and native Apple frameworks."
        hireForm
        align="left"
      />

      <ServiceOverview
        bg="white"
        eyebrow="What we do"
        title="iOS solutions that drive real impact"
        titleHighlight="real impact"
        description="We provide end-to-end iOS development designed to solve problems, create value, and help your mobile product grow sustainably."
        imageSrc={OVERVIEW_IMAGE}
        imageAlt="Team collaborating on iOS app strategy and development at a workspace desk"
        items={OVERVIEW_ITEMS}
      />

      <ServiceSolutionsGrid
        bg="muted"
        eyebrow="Industries"
        title="Where we apply iOS development"
        description="We have delivered iOS apps across consumer and enterprise domains — here are the areas we know best."
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
        title="Why clients choose us for iOS"
        description="Beyond the platform — this is what working with our team actually looks like."
        items={DIFFERENTIATORS}
      />

      <ServiceInquirySection
        bg="white"
        serviceName="iOS App Development"
        hireSubject="iOS Developer"
      />

      <FaqSection />
    </main>
  );
}
