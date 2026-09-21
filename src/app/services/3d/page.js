import {
  Box,
  Home,
  ShoppingBag,
  Building2,
  Layers3,
  ShieldCheck,
  Handshake,
  Palette,
  Layers,
  Camera,
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

const HERO_IMAGE = getServiceHeroImage('3d');
const OVERVIEW_IMAGE = getServiceOverviewImage('3d');

const OVERVIEW_ITEMS = [
  {
    icon: Box,
    title: '3D modeling',
    description: 'Detailed product, architectural, and character models for any use case.',
  },
  {
    icon: Camera,
    title: 'Rendering & visualization',
    description: 'Photorealistic renders, lighting, and material work for presentations.',
  },
  {
    icon: Layers,
    title: 'Animation',
    description: 'Product animations, walkthroughs, and motion graphics for marketing.',
  },
  {
    icon: Palette,
    title: 'AR/VR-ready assets',
    description: 'Optimized 3D models for augmented and virtual reality experiences.',
  },
  {
    icon: Zap,
    title: 'Rapid prototyping',
    description: '3D-printable models and visualization for product development.',
  },
  {
    icon: Rocket,
    title: 'Asset delivery',
    description: 'Production-ready files in multiple formats for web, print, and video.',
  },
];

const INDUSTRIES = [
  {
    icon: ShoppingBag,
    title: 'Product visualization',
    description:
      'Photorealistic product renders and animations for e-commerce and marketing.',
    examples: ['Product renders', '360° views', 'Animation'],
  },
  {
    icon: Home,
    title: 'Architecture & interiors',
    description:
      'Architectural walkthroughs, interior visualizations, and spatial planning renders.',
    examples: ['Exterior renders', 'Interior design', 'Walkthroughs'],
  },
  {
    icon: Building2,
    title: 'Industrial & manufacturing',
    description:
      'Equipment models, assembly visualizations, and technical documentation renders.',
    examples: ['CAD conversion', 'Assembly views', 'Technical renders'],
  },
  {
    icon: Box,
    title: 'Gaming & immersive media',
    description:
      'Game-ready assets, AR/VR models, and immersive experience content.',
    examples: ['Game assets', 'AR models', 'VR environments'],
  },
];

const PROCESS_STEPS = [
  {
    icon: ClipboardList,
    title: 'Brief & concept',
    description:
      'We understand your vision, reference materials, and output requirements before modeling.',
    deliverables: [
      'Creative brief',
      'Reference analysis',
      'Project timeline',
      'Output format spec',
    ],
  },
  {
    icon: Code2,
    title: 'Model, render & refine',
    description:
      'We build 3D models, apply materials and lighting, and refine through feedback rounds.',
    deliverables: [
      '3D model drafts',
      'Material & lighting passes',
      'Render previews',
      'Revised final renders',
    ],
  },
  {
    icon: Rocket,
    title: 'Deliver & support',
    description:
      'We deliver production-ready assets and support usage across your marketing channels.',
    deliverables: [
      'Final renders & animations',
      'Source model files',
      'Multi-format exports',
      'Ongoing asset updates',
    ],
  },
];

const DIFFERENTIATORS = [
  {
    icon: Layers3,
    title: 'End-to-end 3D production',
    description:
      'One team handles modeling through final delivery — you are not coordinating separate specialists.',
  },
  {
    icon: ShieldCheck,
    title: 'Production-ready output',
    description:
      'We deliver properly formatted, high-resolution assets ready for web, print, video, and AR/VR.',
  },
  {
    icon: Handshake,
    title: 'Ongoing creative partnership',
    description:
      'We stay available for new renders, model updates, and asset variations as your product evolves.',
  },
];

export const metadata = serviceAuditMetadata('3d');

export default function ThreeDDesignPage() {
  return (
    <main>
      <PageHero
        image={HERO_IMAGE}
        imageAlt="3D design illustration with modeling software, 3D printing, and product visualization"
        imagePosition="object-right"
        title="3D Design Services"
        description="Bring ideas to life with 3D modeling, rendering, animation, and AR/VR-ready visuals — for products, architecture, and immersive experiences."
        hireForm
        align="left"
      />

      <ServiceOverview
        bg="white"
        eyebrow="What we do"
        title="3D design that drives real impact"
        titleHighlight="real impact"
        description="We provide end-to-end 3D design designed to visualize ideas, support product development, and help your brand communicate visually."
        imageSrc={OVERVIEW_IMAGE}
        imageAlt="Team collaborating on 3D modeling and visualization at a workspace desk"
        items={OVERVIEW_ITEMS}
      />

      <ServiceSolutionsGrid
        bg="muted"
        eyebrow="Industries"
        title="Where we apply 3D design"
        description="We have delivered 3D work across product, architecture, and immersive media domains — here are the areas we know best."
        solutions={INDUSTRIES}
      />

      <ServiceProcessSection
        bg="white"
        eyebrow="Delivery process"
        title="How we take your concept from sketch to finished 3D assets"
        description="A transparent, milestone-driven process so you always know what is being created and when."
        steps={PROCESS_STEPS}
      />

      <ServiceDifferentiators
        bg="muted"
        eyebrow="Why Nexuron"
        title="Why clients choose us for 3D design"
        description="Beyond the renders — this is what working with our team actually looks like."
        items={DIFFERENTIATORS}
      />

      <ServiceInquirySection
        bg="white"
        serviceName="3D Design & Visualization"
        hireSubject="3D Designer"
      />

      <FaqSection />
    </main>
  );
}
