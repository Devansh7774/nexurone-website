import {
  Palette,
  ShoppingBag,
  Building2,
  Megaphone,
  Layers3,
  ShieldCheck,
  Handshake,
  PenTool,
  Layers,
  Image,
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

const HERO_IMAGE = getServiceHeroImage('graphic');
const OVERVIEW_IMAGE = getServiceOverviewImage('graphic');

const OVERVIEW_ITEMS = [
  {
    icon: PenTool,
    title: 'Brand identity',
    description: 'Logos, color palettes, typography, and brand guidelines.',
  },
  {
    icon: Image,
    title: 'Marketing collateral',
    description: 'Brochures, banners, social media graphics, and print materials.',
  },
  {
    icon: Layers,
    title: 'Digital creatives',
    description: 'Web graphics, ad creatives, email templates, and presentation decks.',
  },
  {
    icon: Palette,
    title: 'Visual storytelling',
    description: 'Illustrations, infographics, and visuals that communicate your message.',
  },
  {
    icon: Zap,
    title: 'Multi-channel consistency',
    description: 'Cohesive brand presence across digital and print touchpoints.',
  },
  {
    icon: Rocket,
    title: 'Asset management',
    description: 'Organized design files, templates, and brand asset libraries.',
  },
];

const INDUSTRIES = [
  {
    icon: Building2,
    title: 'Corporate branding',
    description:
      'Complete brand identity systems for startups and established businesses.',
    examples: ['Logo design', 'Brand guidelines', 'Stationery'],
  },
  {
    icon: Megaphone,
    title: 'Marketing & advertising',
    description:
      'Campaign visuals, ad creatives, and promotional materials for digital and print.',
    examples: ['Ad banners', 'Social graphics', 'Campaign kits'],
  },
  {
    icon: ShoppingBag,
    title: 'Retail & product packaging',
    description:
      'Product labels, packaging design, and point-of-sale materials.',
    examples: ['Packaging', 'Product labels', 'POS materials'],
  },
  {
    icon: Palette,
    title: 'Digital & social media',
    description:
      'Consistent visual content for websites, social channels, and email marketing.',
    examples: ['Social templates', 'Email graphics', 'Web banners'],
  },
];

const PROCESS_STEPS = [
  {
    icon: ClipboardList,
    title: 'Brief & discovery',
    description:
      'We understand your brand, audience, and goals before starting any creative work.',
    deliverables: [
      'Creative brief',
      'Mood boards & direction',
      'Project timeline',
      'Deliverable list',
    ],
  },
  {
    icon: Code2,
    title: 'Design & refine',
    description:
      'We create concepts, gather feedback, and refine designs through collaborative rounds.',
    deliverables: [
      'Initial concepts',
      'Revised designs',
      'Final artwork',
      'Source files',
    ],
  },
  {
    icon: Rocket,
    title: 'Deliver & support',
    description:
      'We deliver production-ready assets and support rollout across your channels.',
    deliverables: [
      'Print & digital assets',
      'Brand guidelines',
      'Template library',
      'Ongoing design support',
    ],
  },
];

const DIFFERENTIATORS = [
  {
    icon: Layers3,
    title: 'Strategic visual design',
    description:
      'We design with your business goals in mind — not just aesthetics, but communication that converts.',
  },
  {
    icon: ShieldCheck,
    title: 'Production-ready assets',
    description:
      'We deliver properly formatted, organized files ready for print, web, and marketing teams.',
  },
  {
    icon: Handshake,
    title: 'Ongoing creative partnership',
    description:
      'We stay available for campaign updates, new assets, and brand evolution as your business grows.',
  },
];

export const metadata = serviceAuditMetadata('graphic');

export default function GraphicDesignPage() {
  return (
    <main>
      <PageHero
        image={HERO_IMAGE}
        imageAlt="Graphic design illustration with branding, logos, color palettes, and creative tools"
        imagePosition="object-right"
        title="Graphic Design Services"
        description="Craft visually stunning brand identities, marketing collateral, and digital creatives that inspire, engage, and communicate your story."
        hireForm
        align="left"
      />

      <ServiceOverview
        bg="white"
        eyebrow="What we do"
        title="Graphic design that drives real impact"
        titleHighlight="real impact"
        description="We provide end-to-end graphic design designed to strengthen your brand, engage your audience, and help your business stand out."
        imageSrc={OVERVIEW_IMAGE}
        imageAlt="Design team collaborating on brand identity and graphic design at a workspace desk"
        items={OVERVIEW_ITEMS}
      />

      <ServiceSolutionsGrid
        bg="muted"
        eyebrow="Industries"
        title="Where we apply graphic design"
        description="We have delivered design work across corporate, retail, and marketing domains — here are the areas we know best."
        solutions={INDUSTRIES}
      />

      <ServiceProcessSection
        bg="white"
        eyebrow="Delivery process"
        title="How we take your brand from concept to finished assets"
        description="A transparent, milestone-driven process so you always know what is being designed and when."
        steps={PROCESS_STEPS}
      />

      <ServiceDifferentiators
        bg="muted"
        eyebrow="Why Nexuron"
        title="Why clients choose us for graphic design"
        description="Beyond the visuals — this is what working with our design team actually looks like."
        items={DIFFERENTIATORS}
      />

      <ServiceInquirySection
        bg="white"
        serviceName="Graphic Design"
        hireSubject="Graphic Designer"
      />

      <FaqSection />
    </main>
  );
}
