import {
  Globe,
  ShoppingBag,
  Building2,
  Newspaper,
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

const HERO_IMAGE = getServiceHeroImage('wordpress');
const OVERVIEW_IMAGE = getServiceOverviewImage('wordpress');

const OVERVIEW_ITEMS = [
  {
    icon: Globe,
    title: 'Custom WordPress sites',
    description: 'Themes, plugins, and tailored solutions beyond off-the-shelf templates.',
  },
  {
    icon: Palette,
    title: 'Design & branding',
    description: 'Responsive layouts that match your brand and convert visitors.',
  },
  {
    icon: Layers,
    title: 'Plugin development',
    description: 'Custom functionality and integrations built for your business needs.',
  },
  {
    icon: Plug,
    title: 'Third-party integrations',
    description: 'CRM, payment gateways, email marketing, and analytics connections.',
  },
  {
    icon: Zap,
    title: 'Performance & SEO',
    description: 'Speed optimization, caching, and search-engine-friendly structure.',
  },
  {
    icon: Rocket,
    title: 'Maintenance & support',
    description: 'Updates, security patches, backups, and ongoing site care.',
  },
];

const INDUSTRIES = [
  {
    icon: Newspaper,
    title: 'Content & publishing',
    description:
      'Blogs, news sites, and content platforms with easy editorial workflows.',
    examples: ['Custom post types', 'Editorial tools', 'Media management'],
  },
  {
    icon: ShoppingBag,
    title: 'WooCommerce stores',
    description:
      'Online shops with product catalogs, checkout, and payment processing.',
    examples: ['Product catalog', 'Checkout', 'Inventory sync'],
  },
  {
    icon: Globe,
    title: 'Corporate websites',
    description:
      'Professional company sites with lead capture, portfolios, and service pages.',
    examples: ['Landing pages', 'Contact forms', 'SEO optimization'],
  },
  {
    icon: Building2,
    title: 'Enterprise WordPress',
    description:
      'Multi-site networks, membership platforms, and scalable content systems.',
    examples: ['Multi-site', 'Membership', 'Role-based access'],
  },
];

const PROCESS_STEPS = [
  {
    icon: ClipboardList,
    title: 'Discovery & planning',
    description:
      'We define site goals, content structure, and technical requirements before building.',
    deliverables: [
      'Site map & content plan',
      'Theme & plugin strategy',
      'Project timeline',
      'Integration requirements',
    ],
  },
  {
    icon: Code2,
    title: 'Design, build & test',
    description:
      'We create custom themes, configure plugins, and test across devices and browsers.',
    deliverables: [
      'Custom theme development',
      'Plugin configuration',
      'Cross-browser QA',
      'Staging site for review',
    ],
  },
  {
    icon: Rocket,
    title: 'Launch & grow',
    description:
      'We go live, monitor performance, and support your site as content and traffic grow.',
    deliverables: [
      'Production launch',
      'Performance monitoring',
      'Security updates',
      'Content & feature additions',
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
    title: 'Secure, maintainable sites',
    description:
      'We build WordPress sites with clean code, security best practices, and easy content management.',
  },
  {
    icon: Handshake,
    title: 'Partnership after launch',
    description:
      'We stay involved post-launch with updates, security patches, and new features as your site evolves.',
  },
];

export const metadata = serviceAuditMetadata('wordpress');

export default function WordPressPage() {
  return (
    <main>
      <PageHero
        image={HERO_IMAGE}
        imageAlt="WordPress development illustration with themes, plugins, SEO, and customization"
        imagePosition="object-right"
        title="WordPress Development Company"
        description="Build scalable, SEO-friendly WordPress websites with custom themes, plugins, and enterprise solutions — tailored for startups and enterprises."
        hireForm
        align="left"
      />

      <ServiceOverview
        bg="white"
        eyebrow="What we do"
        title="WordPress solutions that drive real impact"
        titleHighlight="real impact"
        description="We provide end-to-end WordPress development designed to solve problems, create value, and help your online presence grow sustainably."
        imageSrc={OVERVIEW_IMAGE}
        imageAlt="Team collaborating on WordPress website development at a workspace desk"
        items={OVERVIEW_ITEMS}
      />

      <ServiceSolutionsGrid
        bg="muted"
        eyebrow="Industries"
        title="Where we apply WordPress"
        description="We have delivered WordPress sites across content, retail, and enterprise domains — here are the areas we know best."
        solutions={INDUSTRIES}
      />

      <ServiceProcessSection
        bg="white"
        eyebrow="Delivery process"
        title="How we take your site from concept to launch"
        description="A transparent, milestone-driven process so you always know what is being built and when."
        steps={PROCESS_STEPS}
      />

      <ServiceDifferentiators
        bg="muted"
        eyebrow="Why Nexuron"
        title="Why clients choose us for WordPress"
        description="Beyond the CMS — this is what working with our team actually looks like."
        items={DIFFERENTIATORS}
      />

      <ServiceInquirySection
        bg="white"
        serviceName="WordPress Development"
        hireSubject="WordPress Developer"
      />

      <FaqSection />
    </main>
  );
}
