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

const HERO_IMAGE = getServiceHeroImage('laravel');
const OVERVIEW_IMAGE = getServiceOverviewImage('laravel');

const OVERVIEW_ITEMS = [
  {
    icon: Server,
    title: 'Custom web applications',
    description: 'MVP to enterprise Laravel apps with elegant syntax and rapid delivery.',
  },
  {
    icon: Database,
    title: 'Database & ORM',
    description: 'Eloquent models, migrations, and optimized queries for scalable data layers.',
  },
  {
    icon: Layers,
    title: 'MVC architecture',
    description: 'Organized, maintainable code with modular structure and clean patterns.',
  },
  {
    icon: Plug,
    title: 'API development',
    description: 'RESTful APIs with Sanctum auth, queues, and third-party integrations.',
  },
  {
    icon: Zap,
    title: 'Performance tuning',
    description: 'Caching, query optimization, and Horizon for background jobs.',
  },
  {
    icon: Rocket,
    title: 'Deployment & support',
    description: 'Cloud deployment, version upgrades, and ongoing maintenance.',
  },
];

const INDUSTRIES = [
  {
    icon: LayoutDashboard,
    title: 'SaaS products',
    description:
      'Multi-tenant platforms, subscription billing, and admin dashboards built for growth.',
    examples: ['User management', 'Billing', 'Analytics'],
  },
  {
    icon: ShoppingBag,
    title: 'E-commerce backends',
    description:
      'Product catalogs, cart logic, payment processing, and order management systems.',
    examples: ['Product catalog', 'Checkout', 'Inventory'],
  },
  {
    icon: Server,
    title: 'RESTful APIs',
    description:
      'API-first platforms and microservices that power web and mobile applications.',
    examples: ['API auth', 'Webhooks', 'Documentation'],
  },
  {
    icon: Building2,
    title: 'Enterprise platforms',
    description:
      'Internal tools, workflow systems, and business portals with role-based access.',
    examples: ['Workflows', 'Reporting', 'SSO integration'],
  },
];

const PROCESS_STEPS = [
  {
    icon: ClipboardList,
    title: 'Discovery & planning',
    description:
      'We align on goals, user needs, and technical requirements before writing code.',
    deliverables: [
      'Requirements & user flows',
      'Database schema design',
      'Sprint roadmap & timeline',
      'Integration plan',
    ],
  },
  {
    icon: Code2,
    title: 'Design, build & test',
    description:
      'We build secure Laravel applications with clean code and rigorous QA at every sprint.',
    deliverables: [
      'UI & API implementation',
      'Third-party integrations',
      'Automated & manual QA',
      'Staging environment for review',
    ],
  },
  {
    icon: Rocket,
    title: 'Launch & grow',
    description:
      'We deploy to production, monitor stability, and support your app as it scales.',
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
      'We write testable, documented Laravel code with clean architecture so your product is easy to extend.',
  },
  {
    icon: Handshake,
    title: 'Partnership after launch',
    description:
      'We stay involved post-release with monitoring, version upgrades, and new features as your app evolves.',
  },
];

export const metadata = serviceAuditMetadata('laravel');

export default function LaravelPage() {
  return (
    <main>
      <PageHero
        image={HERO_IMAGE}
        imageAlt="Laravel development illustration with Eloquent ORM, Blade templating, and RESTful APIs"
        imagePosition="object-right"
        title="Laravel Development Company"
        description="Build secure, scalable web applications with Laravel, Eloquent ORM, Blade templating, and RESTful APIs — tailored for startups and enterprises."
        hireForm
        align="left"
      />

      <ServiceOverview
        bg="white"
        eyebrow="What we do"
        title="Laravel solutions that drive real impact"
        titleHighlight="real impact"
        description="We provide end-to-end Laravel development designed to solve problems, create value, and help your web product grow sustainably."
        imageSrc={OVERVIEW_IMAGE}
        imageAlt="Team collaborating on Laravel web application development at a workspace desk"
        items={OVERVIEW_ITEMS}
      />

      <ServiceSolutionsGrid
        bg="muted"
        eyebrow="Industries"
        title="Where we apply Laravel"
        description="We have delivered Laravel applications across SaaS, retail, and enterprise domains — here are the areas we know best."
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
        title="Why clients choose us for Laravel"
        description="Beyond the framework — this is what working with our team actually looks like."
        items={DIFFERENTIATORS}
      />

      <ServiceInquirySection
        bg="white"
        serviceName="Laravel PHP Development"
        hireSubject="Laravel Developer"
      />

      <FaqSection />
    </main>
  );
}
