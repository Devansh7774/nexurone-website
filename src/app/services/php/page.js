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

const HERO_IMAGE = getServiceHeroImage('php');
const OVERVIEW_IMAGE = getServiceOverviewImage('php');

const OVERVIEW_ITEMS = [
  {
    icon: Server,
    title: 'Custom PHP applications',
    description: 'Dynamic websites, portals, and business apps built with modern PHP frameworks.',
  },
  {
    icon: Database,
    title: 'Database integration',
    description: 'MySQL, PostgreSQL, and optimized queries for reliable data management.',
  },
  {
    icon: Layers,
    title: 'Modular architecture',
    description: 'Clean, reusable code with Laravel, Symfony, or CodeIgniter as needed.',
  },
  {
    icon: Plug,
    title: 'API & integrations',
    description: 'REST APIs, payment gateways, CRMs, and third-party service connections.',
  },
  {
    icon: Zap,
    title: 'Performance tuning',
    description: 'Caching, query optimization, and server-side performance improvements.',
  },
  {
    icon: Rocket,
    title: 'Deployment & support',
    description: 'Hosting setup, monitoring, updates, and ongoing maintenance.',
  },
];

const INDUSTRIES = [
  {
    icon: LayoutDashboard,
    title: 'Business portals',
    description:
      'Custom dashboards, membership platforms, and internal tools for day-to-day operations.',
    examples: ['User management', 'Reporting', 'Workflows'],
  },
  {
    icon: ShoppingBag,
    title: 'E-commerce platforms',
    description:
      'Online stores, product catalogs, and checkout systems with secure payment processing.',
    examples: ['Product catalog', 'Checkout', 'Order management'],
  },
  {
    icon: Server,
    title: 'API backends',
    description:
      'RESTful services and microservices that power web and mobile frontends.',
    examples: ['API auth', 'Webhooks', 'Documentation'],
  },
  {
    icon: Building2,
    title: 'Legacy modernization',
    description:
      'Upgrading and refactoring existing PHP systems for better performance and maintainability.',
    examples: ['Code refactoring', 'Security upgrades', 'Cloud migration'],
  },
];

const PROCESS_STEPS = [
  {
    icon: ClipboardList,
    title: 'Discovery & planning',
    description:
      'We define business goals, technical needs, and user expectations before development.',
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
      'We build robust PHP applications with clean code and thorough QA at every release.',
    deliverables: [
      'UI & backend implementation',
      'API integrations',
      'Security & performance QA',
      'Staging environment for review',
    ],
  },
  {
    icon: Rocket,
    title: 'Launch & grow',
    description:
      'We deploy to production, monitor stability, and support your application as it scales.',
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
      'One team handles discovery through deployment — you are not juggling separate vendors for each phase.',
  },
  {
    icon: ShieldCheck,
    title: 'Production-ready code',
    description:
      'We write secure, documented PHP code with clean architecture so your product is easy to extend.',
  },
  {
    icon: Handshake,
    title: 'Partnership after launch',
    description:
      'We stay involved post-release with monitoring, updates, and new features as your app evolves.',
  },
];

export const metadata = serviceAuditMetadata('php');

export default function PhpPage() {
  return (
    <main>
      <PageHero
        image={HERO_IMAGE}
        imageAlt="PHP web development illustration with MySQL, secure coding, and custom solutions"
        imagePosition="object-right"
        title="PHP Development Company"
        description="Build secure, scalable web applications with PHP, MySQL, and modern frameworks — tailored for startups and enterprises."
        hireForm
        align="left"
      />

      <ServiceOverview
        bg="white"
        eyebrow="What we do"
        title="PHP solutions that drive real impact"
        titleHighlight="real impact"
        description="We provide end-to-end PHP development designed to solve problems, create value, and help your web product grow sustainably."
        imageSrc={OVERVIEW_IMAGE}
        imageAlt="Team collaborating on PHP web application development at a workspace desk"
        items={OVERVIEW_ITEMS}
      />

      <ServiceSolutionsGrid
        bg="muted"
        eyebrow="Industries"
        title="Where we apply PHP development"
        description="We have delivered PHP applications across business, retail, and enterprise domains — here are the areas we know best."
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
        title="Why clients choose us for PHP"
        description="Beyond the language — this is what working with our team actually looks like."
        items={DIFFERENTIATORS}
      />

      <ServiceInquirySection
        bg="white"
        serviceName="PHP Web Development"
        hireSubject="PHP Developer"
      />

      <FaqSection />
    </main>
  );
}
