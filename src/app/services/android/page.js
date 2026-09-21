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

const HERO_IMAGE = getServiceHeroImage('android');
const OVERVIEW_IMAGE = getServiceOverviewImage('android');

const OVERVIEW_ITEMS = [
  {
    icon: Smartphone,
    title: 'Native Android apps',
    description: 'Kotlin and Java apps built for phones, tablets, and varying network conditions.',
  },
  {
    icon: Palette,
    title: 'Material Design UI',
    description: 'Modern interfaces following Google design standards and best practices.',
  },
  {
    icon: Layers,
    title: 'Scalable architecture',
    description: 'MVVM, Clean Architecture, and modular code for long-term maintainability.',
  },
  {
    icon: Plug,
    title: 'API & SDK integration',
    description: 'REST APIs, Google services, payment gateways, and third-party SDKs.',
  },
  {
    icon: Zap,
    title: 'Performance optimization',
    description: 'Speed, stability, and memory tuning for production workloads.',
  },
  {
    icon: Rocket,
    title: 'Play Store deployment',
    description: 'Google Play releases, updates, and ongoing maintenance.',
  },
];

const INDUSTRIES = [
  {
    icon: Smartphone,
    title: 'Consumer apps',
    description:
      'Engaging mobile experiences for entertainment, lifestyle, and on-demand services on Android.',
    examples: ['Push notifications', 'In-app purchases', 'Social features'],
  },
  {
    icon: CreditCard,
    title: 'Fintech & payments',
    description:
      'Secure wallets, payment flows, and transaction management with compliance-ready architecture.',
    examples: ['Biometric auth', 'Payment SDKs', 'Encrypted storage'],
  },
  {
    icon: ShoppingBag,
    title: 'Retail & e-commerce',
    description:
      'Product catalogs, cart, checkout, and order tracking optimized for Android shoppers.',
    examples: ['Product search', 'Checkout', 'Order history'],
  },
  {
    icon: Building2,
    title: 'Enterprise & logistics',
    description:
      'Field operations, warehouse tools, and internal mobility solutions with offline support.',
    examples: ['Offline sync', 'GPS tracking', 'Role-based access'],
  },
];

const PROCESS_STEPS = [
  {
    icon: ClipboardList,
    title: 'Discovery & planning',
    description:
      'We define business goals, target audience, and must-have features before development begins.',
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
      'We build robust Android apps with Material Design UI and rigorous QA at every release.',
    deliverables: [
      'UI implementation',
      'API & SDK integration',
      'Automated & manual QA',
      'Staging builds for review',
    ],
  },
  {
    icon: Rocket,
    title: 'Launch & grow',
    description:
      'We publish to Google Play, monitor stability, and support your app as usage grows.',
    deliverables: [
      'Google Play Store release',
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
      'We write testable, documented Kotlin/Java code with clean architecture so your product is easy to extend later.',
  },
  {
    icon: Handshake,
    title: 'Partnership after launch',
    description:
      'We stay involved post-release with monitoring, updates, and new features as your app evolves.',
  },
];

export const metadata = serviceAuditMetadata('android');

export default function AndroidPage() {
  return (
    <main>
      <PageHero
        image={HERO_IMAGE}
        imageAlt="Android app development illustration with Kotlin, UI/UX, and Google Play deployment"
        imagePosition="object-right"
        title="Android App Development Company"
        description="Build powerful, scalable Android applications with Kotlin, Java, and modern Android frameworks — tailored for startups and enterprises."
        hireForm
        align="left"
      />

      <ServiceOverview
        bg="white"
        eyebrow="What we do"
        title="Android solutions that drive real impact"
        titleHighlight="real impact"
        description="We provide end-to-end Android development designed to solve problems, create value, and help your mobile product grow sustainably."
        imageSrc={OVERVIEW_IMAGE}
        imageAlt="Team collaborating on Android app strategy and development at a workspace desk"
        items={OVERVIEW_ITEMS}
      />

      <ServiceSolutionsGrid
        bg="muted"
        eyebrow="Industries"
        title="Where we apply Android development"
        description="We have delivered Android apps across consumer and enterprise domains — here are the areas we know best."
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
        title="Why clients choose us for Android"
        description="Beyond the platform — this is what working with our team actually looks like."
        items={DIFFERENTIATORS}
      />

      <ServiceInquirySection
        bg="white"
        serviceName="Android App Development"
        hireSubject="Android Developer"
      />

      <FaqSection />
    </main>
  );
}
