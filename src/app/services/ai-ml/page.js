import {
  Brain,
  ShoppingBag,
  Building2,
  Factory,
  Layers3,
  ShieldCheck,
  Handshake,
  BarChart3,
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

const HERO_IMAGE = getServiceHeroImage('ai-ml');
const OVERVIEW_IMAGE = getServiceOverviewImage('ai-ml');

const OVERVIEW_ITEMS = [
  {
    icon: Brain,
    title: 'Custom AI solutions',
    description: 'Predictive models, NLP, computer vision, and intelligent automation.',
  },
  {
    icon: BarChart3,
    title: 'Data analytics',
    description: 'Data pipelines, feature engineering, and actionable insights from your data.',
  },
  {
    icon: Layers,
    title: 'ML model development',
    description: 'Training, validation, and deployment of production-ready models.',
  },
  {
    icon: Plug,
    title: 'System integration',
    description: 'Embedding AI into existing apps, APIs, and business workflows.',
  },
  {
    icon: Zap,
    title: 'Model optimization',
    description: 'Accuracy tuning, inference speed, and cost-efficient deployment.',
  },
  {
    icon: Rocket,
    title: 'MLOps & support',
    description: 'Monitoring, retraining pipelines, and ongoing model maintenance.',
  },
];

const INDUSTRIES = [
  {
    icon: Factory,
    title: 'Manufacturing & operations',
    description:
      'Predictive maintenance, quality inspection, and process optimization with computer vision and analytics.',
    examples: ['Defect detection', 'Demand forecasting', 'Anomaly detection'],
  },
  {
    icon: ShoppingBag,
    title: 'Retail & e-commerce',
    description:
      'Recommendation engines, demand forecasting, and customer behavior analysis.',
    examples: ['Recommendations', 'Inventory forecasting', 'Churn prediction'],
  },
  {
    icon: Building2,
    title: 'Enterprise automation',
    description:
      'Document processing, intelligent workflows, and decision support systems.',
    examples: ['Document OCR', 'Chatbots', 'Workflow automation'],
  },
  {
    icon: Brain,
    title: 'Healthcare & life sciences',
    description:
      'Diagnostic assistance, patient data analysis, and research support tools.',
    examples: ['Image analysis', 'Risk scoring', 'Data classification'],
  },
];

const PROCESS_STEPS = [
  {
    icon: ClipboardList,
    title: 'Discovery & planning',
    description:
      'We assess your data, define use cases, and map a practical AI roadmap with clear success metrics.',
    deliverables: [
      'Use case definition',
      'Data assessment',
      'Model strategy & timeline',
      'Integration plan',
    ],
  },
  {
    icon: Code2,
    title: 'Build, train & validate',
    description:
      'We develop models, validate accuracy, and integrate AI into your existing systems.',
    deliverables: [
      'Model development',
      'Accuracy validation',
      'API integration',
      'Staging environment for review',
    ],
  },
  {
    icon: Rocket,
    title: 'Deploy & optimize',
    description:
      'We deploy models to production, monitor performance, and retrain as data evolves.',
    deliverables: [
      'Production deployment',
      'Performance monitoring',
      'Model retraining pipeline',
      'Feature enhancements',
    ],
  },
];

const DIFFERENTIATORS = [
  {
    icon: Layers3,
    title: 'Practical, not hype-driven',
    description:
      'We focus on AI that solves real business problems — not experiments that never reach production.',
  },
  {
    icon: ShieldCheck,
    title: 'Production-ready models',
    description:
      'We build validated, monitored ML systems with clear accuracy metrics and reliable deployment pipelines.',
  },
  {
    icon: Handshake,
    title: 'Partnership after launch',
    description:
      'We stay involved post-deployment with monitoring, retraining, and improvements as your data grows.',
  },
];

export const metadata = serviceAuditMetadata('ai-ml');

export default function AiMlPage() {
  return (
    <main>
      <PageHero
        image={HERO_IMAGE}
        imageAlt="AI and machine learning illustration with neural networks, data analytics, and automation"
        imagePosition="object-right"
        title="AI & ML Development Services"
        description="Harness AI and machine learning for predictive analytics, NLP, computer vision, and intelligent automation — tailored for startups and enterprises."
        hireForm
        align="left"
      />

      <ServiceOverview
        bg="white"
        eyebrow="What we do"
        title="AI & ML solutions that drive real impact"
        titleHighlight="real impact"
        description="We provide practical AI and machine learning development designed to solve problems, create value, and help your business grow sustainably."
        imageSrc={OVERVIEW_IMAGE}
        imageAlt="Team collaborating on AI and machine learning strategy at a workspace desk"
        items={OVERVIEW_ITEMS}
      />

      <ServiceSolutionsGrid
        bg="muted"
        eyebrow="Industries"
        title="Where we apply AI & ML"
        description="We have delivered AI solutions across manufacturing, retail, and enterprise domains — here are the areas we know best."
        solutions={INDUSTRIES}
      />

      <ServiceProcessSection
        bg="white"
        eyebrow="Delivery process"
        title="How we take your AI project from concept to production"
        description="A transparent, milestone-driven process so you always know what is being built and when."
        steps={PROCESS_STEPS}
      />

      <ServiceDifferentiators
        bg="muted"
        eyebrow="Why Nexuron"
        title="Why clients choose us for AI & ML"
        description="Beyond the algorithms — this is what working with our team actually looks like."
        items={DIFFERENTIATORS}
      />

      <ServiceInquirySection
        bg="white"
        serviceName="AI & Machine Learning"
        hireSubject="AI/ML Developer"
      />

      <FaqSection />
    </main>
  );
}
