import Image from 'next/image';
import Link from 'next/link';
import HireHeroOverlay from '@/components/hire/shared/HireHeroOverlay';
import HireWhySplit from '@/components/hire/layout/HireWhySplit';
import HireSkillsGrid from '@/components/hire/layout/HireSkillsGrid';
import HireProcessPanel from '@/components/hire/layout/HireProcessPanel';
import HireEngagementCards from '@/components/hire/layout/HireEngagementCards';
import HireTechStack from '@/components/hire/layout/HireTechStack';
import HireInquiryPanel from '@/components/hire/layout/HireInquiryPanel';
import HireFaqAccordion from '@/components/hire/layout/HireFaqAccordion';
import { buildEngagementModels, buildProcessSteps } from '@/lib/hirePageContent';
import { flutterTechnologies } from '@/components/hire/flutter/flutterTechnologies';
import { getHireHeroImage } from '@/lib/serviceHeroImages';
import { hireAuditMetadata } from '@/lib/auditMetadata';

export const metadata = hireAuditMetadata('flutter-developer');


const HERO_IMAGE = getHireHeroImage('flutter-developer');

const whyHireContent = {
  title: 'Why Hire Flutter Developers From Nexuron Technologies?',
  imageAlt: 'Nexuron Flutter development team',
  description:
    'We focus on performance, pixel-perfect UI, and scalable architecture to ensure your mobile app is future ready. Behind every high performing Flutter application is a team that obsesses over the details most developers skip widget optimization, native integrations, offline support, and long term code health.',
  benefits: [
    'Experienced Flutter & Dart Developers',
    'Cross-Platform iOS & Android Expertise',
    'Custom Widget-Based UI Development',
    'State Management with Riverpod & Bloc',
    'Native Device & API Integrations',
    'End-to-End App Store Deployment',
  ],
};

const expertiseContent = {
  expertiseTitle: 'Our Flutter Development Expertise',
  expertise: [
    {
      title: 'Custom Flutter App Development',
      description:
        'Build beautiful, high-performance mobile apps with a single codebase for iOS and Android.',
    },
    {
      title: 'Cross-Platform UI/UX',
      description:
        'Design expressive, responsive interfaces with Flutter widgets and custom animations.',
    },
    {
      title: 'State Management & Architecture',
      description:
        'Implement clean architecture with Riverpod, Bloc, or Provider for scalable apps.',
    },
    {
      title: 'API & Backend Integration',
      description:
        'Connect Flutter apps with REST APIs, GraphQL, Firebase, and cloud services.',
    },
    {
      title: 'Flutter Performance Optimization',
      description:
        'Improve app speed with efficient rendering, lazy loading, and memory management.',
    },
    {
      title: 'App Maintenance & Support',
      description:
        'Ensure long-term stability with version upgrades, bug fixes, and ongoing support.',
    },
  ],
};

const faqs = [
  {
    question: 'How quickly can I hire a Flutter developer?',
    answer:
      'You can onboard a dedicated Flutter developer within 48-72 hours after requirement discussion.',
  },
  {
    question: 'Can Flutter apps be published on both iOS and Android?',
    answer:
      'Yes. Flutter uses a single codebase to build apps for both platforms, reducing development time by 30-40% compared to separate native builds.',
  },
  {
    question: 'Can I interview the developer before hiring?',
    answer:
      'Absolutely. We provide you with a shortlist of pre-vetted candidates, and you can interview them to ensure they are the perfect technical and cultural fit for your team.',
  },
  {
    question: 'Do you provide post-launch support?',
    answer:
      'Yes, we offer comprehensive post-launch support and maintenance packages to keep your app secure, updated, and performing optimally on both app stores.',
  },
];




const PROCESS_STEPS = buildProcessSteps('Flutter');

const ENGAGEMENT_MODELS = buildEngagementModels('Flutter', 'Flutter Developer');

export default function HireFlutterDeveloperPage() {
  return (
    <main>
      <section className="relative overflow-hidden min-h-[560px] md:min-h-[620px]">
        <Image
          src={HERO_IMAGE}
          alt="Hire Flutter developers"
          fill
          priority
          className="object-cover object-center"
        />

        <HireHeroOverlay />

        <div className="relative z-10 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 min-h-[560px] md:min-h-[620px] flex items-center pt-12 pb-12">
          <div className="w-full max-w-xl text-white">
            <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold italic tracking-wide leading-tight">
              Hire Flutter Development Experts
            </h1>
            <p className="mt-5 text-[13px] md:text-[14px] font-normal leading-7 text-gray-100">
              Build high-performance, cross-platform mobile applications with our expert Flutter developers. We specialize in Flutter, Dart, Firebase, and native integrations to accelerate your mobile product growth.
            </p>
            <p className="mt-4 text-[13px] md:text-[14px] font-normal leading-7 text-gray-100">
              Our team ensures native-like performance, stunning UI, and robust architecture to deliver powerful mobile experiences for iOS and Android from a single codebase.
            </p>

            <Link
              href="#hire-inquiry"
              className="inline-flex mt-8 px-8 py-3 rounded-md bg-[#5b9cff] hover:bg-[#4a8bee] text-white text-[15px] font-medium transition-colors"
            >
              Hire Now
            </Link>
          </div>
        </div>
      </section>

      <HireWhySplit
        bg="white"
        title={whyHireContent.title}
        description={whyHireContent.description}
        benefits={whyHireContent.benefits}
        imageAlt={whyHireContent.imageAlt}
      />

      <HireSkillsGrid
        bg="muted" skills={expertiseContent.expertise} />

      <HireTechStack
        bg="white"
        title="Technologies Our Flutter Developers Use"
        technologies={flutterTechnologies}
      />

      <HireProcessPanel
        bg="muted" title="How Hiring a Flutter Developer Works" steps={PROCESS_STEPS} />

      <HireEngagementCards
        bg="white" models={ENGAGEMENT_MODELS} />

      <HireInquiryPanel
        bg="muted" roleTitle="Flutter Developer" serviceName="Flutter Development" />

      <HireFaqAccordion
        bg="white" faqs={faqs} />
    </main>
  );
}
