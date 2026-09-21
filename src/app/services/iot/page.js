import {
  Cpu,
  Home,
  Factory,
  Building2,
  Layers3,
  ShieldCheck,
  Handshake,
  Radio,
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

const HERO_IMAGE = getServiceHeroImage('iot');
const OVERVIEW_IMAGE = getServiceOverviewImage('iot');

const OVERVIEW_ITEMS = [
  {
    icon: Cpu,
    title: 'Device firmware & apps',
    description: 'Embedded software, mobile apps, and device-to-cloud communication.',
  },
  {
    icon: Radio,
    title: 'Sensor integration',
    description: 'Connecting sensors, actuators, and edge devices to your platform.',
  },
  {
    icon: Layers,
    title: 'Cloud architecture',
    description: 'Scalable IoT backends with MQTT, data pipelines, and dashboards.',
  },
  {
    icon: Plug,
    title: 'Protocol & API design',
    description: 'MQTT, CoAP, REST APIs, and third-party platform integrations.',
  },
  {
    icon: Zap,
    title: 'Real-time data processing',
    description: 'Stream processing, alerts, and analytics from connected device data.',
  },
  {
    icon: Rocket,
    title: 'Deployment & support',
    description: 'OTA updates, monitoring, and ongoing IoT system maintenance.',
  },
];

const INDUSTRIES = [
  {
    icon: Home,
    title: 'Smart home & consumer',
    description:
      'Connected home devices, automation systems, and consumer IoT products.',
    examples: ['Device pairing', 'Mobile apps', 'Cloud dashboards'],
  },
  {
    icon: Factory,
    title: 'Industrial IoT',
    description:
      'Factory monitoring, predictive maintenance, and equipment tracking systems.',
    examples: ['Sensor networks', 'Alerts', 'Analytics dashboards'],
  },
  {
    icon: Building2,
    title: 'Smart buildings & cities',
    description:
      'Energy management, environmental monitoring, and facility automation.',
    examples: ['Energy monitoring', 'HVAC control', 'Occupancy tracking'],
  },
  {
    icon: Cpu,
    title: 'Healthcare & wearables',
    description:
      'Health monitoring devices, wearable integrations, and patient data platforms.',
    examples: ['BLE connectivity', 'Data sync', 'HIPAA-ready architecture'],
  },
];

const PROCESS_STEPS = [
  {
    icon: ClipboardList,
    title: 'Discovery & planning',
    description:
      'We map device requirements, connectivity needs, and cloud architecture before building.',
    deliverables: [
      'System architecture',
      'Device & protocol spec',
      'Project timeline',
      'Integration plan',
    ],
  },
  {
    icon: Code2,
    title: 'Build, connect & test',
    description:
      'We develop firmware, apps, and cloud backends with end-to-end testing across the stack.',
    deliverables: [
      'Firmware & app development',
      'Cloud backend setup',
      'Device-to-cloud QA',
      'Pilot deployment for review',
    ],
  },
  {
    icon: Rocket,
    title: 'Deploy & scale',
    description:
      'We launch your IoT system, monitor device health, and support scaling as deployments grow.',
    deliverables: [
      'Production deployment',
      'Device monitoring',
      'OTA update pipeline',
      'Feature enhancements',
    ],
  },
];

const DIFFERENTIATORS = [
  {
    icon: Layers3,
    title: 'Full-stack IoT ownership',
    description:
      'One team handles devices, apps, and cloud — you are not juggling separate hardware and software vendors.',
  },
  {
    icon: ShieldCheck,
    title: 'Reliable connected systems',
    description:
      'We build secure, tested IoT architectures with clear device management and data pipelines.',
  },
  {
    icon: Handshake,
    title: 'Partnership after launch',
    description:
      'We stay involved with monitoring, OTA updates, and new features as your device fleet grows.',
  },
];

export const metadata = serviceAuditMetadata('iot');

export default function IotDevelopmentPage() {
  return (
    <main>
      <PageHero
        image={HERO_IMAGE}
        imageAlt="IoT development illustration with connected smart devices and cloud integration"
        imagePosition="object-right"
        title="IoT Development Company"
        description="Build secure, scalable IoT solutions connecting smart devices, sensors, and cloud platforms — for smart homes, industry, and enterprises."
        hireForm
        align="left"
      />

      <ServiceOverview
        bg="white"
        eyebrow="What we do"
        title="IoT solutions that drive real impact"
        titleHighlight="real impact"
        description="We provide end-to-end IoT development designed to connect devices, process data, and help your connected product grow sustainably."
        imageSrc={OVERVIEW_IMAGE}
        imageAlt="Team collaborating on IoT product strategy and development at a workspace desk"
        items={OVERVIEW_ITEMS}
      />

      <ServiceSolutionsGrid
        bg="muted"
        eyebrow="Industries"
        title="Where we apply IoT development"
        description="We have delivered IoT solutions across consumer, industrial, and enterprise domains — here are the areas we know best."
        solutions={INDUSTRIES}
      />

      <ServiceProcessSection
        bg="white"
        eyebrow="Delivery process"
        title="How we take your IoT product from concept to production"
        description="A transparent, milestone-driven process so you always know what is being built and when."
        steps={PROCESS_STEPS}
      />

      <ServiceDifferentiators
        bg="muted"
        eyebrow="Why Nexuron"
        title="Why clients choose us for IoT"
        description="Beyond the devices — this is what working with our team actually looks like."
        items={DIFFERENTIATORS}
      />

      <ServiceInquirySection
        bg="white"
        serviceName="Internet of Things (IoT)"
        hireSubject="IoT Developer"
      />

      <FaqSection />
    </main>
  );
}
