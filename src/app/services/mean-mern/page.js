import {
  Server,
  ShoppingBag,
  Building2,
  LayoutDashboard,
  Layers3,
  ShieldCheck,
  Handshake,
  Database,
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

const HERO_IMAGE = getServiceHeroImage('mean-mern');
const OVERVIEW_IMAGE = getServiceOverviewImage('mean-mern');

const OVERVIEW_ITEMS = [
  {
    icon: Server,
    title: 'Full-stack JavaScript',
    description: 'End-to-end apps with MongoDB, Express, React/Angular, and Node.js.',
  },
  {
    icon: Database,
    title: 'MongoDB data layer',
    description: 'Schema design, indexing, and aggregation for scalable document storage.',
  },
  {
    icon: Layers,
    title: 'Reusable architecture',
    description: 'Modular components and API structure for maintainable full-stack code.',
  },
  {
    icon: Plug,
    title: 'API & real-time features',
    description: 'REST APIs, WebSockets, and third-party service integrations.',
  },
  {
    icon: Zap,
    title: 'Performance tuning',
    description: 'Frontend optimization, API caching, and database query improvements.',
  },
  {
    icon: Rocket,
    title: 'Deployment & support',
    description: 'Production releases, monitoring, and ongoing full-stack maintenance.',
  },
];

const INDUSTRIES = [
  {
    icon: LayoutDashboard,
    title: 'Real-time dashboards',
    description:
      'Live data views, analytics panels, and admin tools with real-time updates.',
    examples: ['Live charts', 'Notifications', 'Role-based views'],
  },
  {
    icon: Server,
    title: 'Customer portals',
    description:
      'Self-service platforms, account management, and B2B customer experiences.',
    examples: ['User accounts', 'Document upload', 'Workflows'],
  },
  {
    icon: ShoppingBag,
    title: 'Booking & marketplace systems',
    description:
      'Reservation flows, listing management, and transaction processing.',
    examples: ['Booking engine', 'Payments', 'Search & filters'],
  },
  {
    icon: Building2,
    title: 'API-first platforms',
    description:
      'Backend services and microservices that power web and mobile frontends.',
    examples: ['REST APIs', 'Auth', 'Webhooks'],
  },
];

const PROCESS_STEPS = [
  {
    icon: ClipboardList,
    title: 'Discovery & planning',
    description:
      'We align on product goals, user flows, and stack decisions before development begins.',
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
      'We build MongoDB, Express, and React/Angular layers with automated testing at each sprint.',
    deliverables: [
      'Frontend & API implementation',
      'Database schema & integrations',
      'Automated & manual QA',
      'Staging builds for review',
    ],
  },
  {
    icon: Rocket,
    title: 'Launch & grow',
    description:
      'We deploy to production, monitor stability, and support your product as it scales.',
    deliverables: [
      'Production deployment',
      'Performance monitoring',
      'Security patches & updates',
      'Feature enhancements',
    ],
  },
];

const DIFFERENTIATORS = [
  {
    icon: Layers3,
    title: 'Full-cycle ownership',
    description:
      'One team handles discovery through deployment — you are not juggling separate frontend and backend vendors.',
  },
  {
    icon: ShieldCheck,
    title: 'Production-ready code',
    description:
      'We write testable, documented JavaScript across the stack so your product is easy to extend.',
  },
  {
    icon: Handshake,
    title: 'Partnership after launch',
    description:
      'We stay involved post-release with monitoring, updates, and new features as your product evolves.',
  },
];

export const metadata = serviceAuditMetadata('mean-mern');

export default function MeanMernPage() {
  return (
    <main>
      <PageHero
        image={HERO_IMAGE}
        imageAlt="MEAN and MERN stack development illustration"
        imagePosition="object-right"
        title="MEAN & MERN App Development Company"
        description="Build fast, scalable web and mobile applications with MongoDB, Express, React or Angular, and Node.js — tailored for startups and enterprises."
        hireForm
        align="left"
      />

      <ServiceOverview
        bg="white"
        eyebrow="What we do"
        title="MEAN & MERN solutions that drive real impact"
        titleHighlight="real impact"
        description="We provide end-to-end full-stack JavaScript development designed to solve problems, create value, and help your product grow sustainably."
        imageSrc={OVERVIEW_IMAGE}
        imageAlt="Team collaborating on full-stack JavaScript development at a workspace desk"
        items={OVERVIEW_ITEMS}
      />

      <ServiceSolutionsGrid
        bg="muted"
        eyebrow="Industries"
        title="Where we apply MEAN & MERN"
        description="We have delivered full-stack JavaScript applications across SaaS, retail, and enterprise domains — here are the areas we know best."
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
        title="Why clients choose us for MEAN & MERN"
        description="Beyond the stack — this is what working with our team actually looks like."
        items={DIFFERENTIATORS}
      />

      <ServiceInquirySection
        bg="white"
        serviceName="Full-Stack JavaScript Development"
        hireSubject="MEAN/MERN Developer"
      />

      <FaqSection />
    </main>
  );
}
