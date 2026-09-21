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
import { reactNativeTechnologies } from '@/components/hire/react-native/reactNativeTechnologies';
import { getHireHeroImage } from '@/lib/serviceHeroImages';
import { hireAuditMetadata } from '@/lib/auditMetadata';

export const metadata = hireAuditMetadata('react-native-developer');


const HERO_IMAGE = getHireHeroImage('react-native-developer');

const whyHireContent = {
  title: 'Why Hire React Native Developers From Nexuron Technologies?',
  imageAlt: 'Nexuron React Native development team',
  description:
    'We focus on performance, reusable components, and scalable architecture to ensure your mobile app is future ready. Behind every high performing React Native application is a team that obsesses over the details most developers skip bridge optimization, native module integration, offline support, and long term code health.',
  benefits: [
    'Experienced React Native & JavaScript Developers',
    'Cross-Platform iOS & Android Expertise',
    'Reusable Component-Based UI Development',
    'State Management with Redux & Context API',
    'Native Module & API Integrations',
    'End-to-End App Store Deployment',
  ],
};

const expertiseContent = {
  expertiseTitle: 'Our React Native Development Expertise',
  expertise: [
    {
      title: 'Custom React Native App Development',
      description:
        'Build fast, scalable mobile apps with a single JavaScript codebase for iOS and Android.',
    },
    {
      title: 'Cross-Platform UI/UX',
      description:
        'Design intuitive, responsive interfaces with reusable React components and native animations.',
    },
    {
      title: 'State Management & Architecture',
      description:
        'Implement clean architecture with Redux, Context API, or Zustand for scalable mobile apps.',
    },
    {
      title: 'API & Backend Integration',
      description:
        'Connect React Native apps with REST APIs, GraphQL, Firebase, and third-party services.',
    },
    {
      title: 'React Native Performance Optimization',
      description:
        'Improve app speed with efficient rendering, lazy loading, and native module optimization.',
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
    question: 'How quickly can I hire a React Native developer?',
    answer:
      'You can onboard a dedicated React Native developer within 48-72 hours after requirement discussion.',
  },
  {
    question: 'Can React Native apps run on both iOS and Android?',
    answer:
      'Yes. React Native uses a single JavaScript codebase to build apps for both platforms, significantly reducing development time and cost compared to separate native builds.',
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




const PROCESS_STEPS = buildProcessSteps('React Native');

const ENGAGEMENT_MODELS = buildEngagementModels('React Native', 'React Native Developer');

export default function HireReactNativeDeveloperPage() {
  return (
    <main>
      <section className="relative overflow-hidden min-h-[560px] md:min-h-[620px]">
        <Image
          src={HERO_IMAGE}
          alt="Hire React Native developers"
          fill
          priority
          className="object-cover object-center"
        />

        <HireHeroOverlay />

        <div className="relative z-10 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 min-h-[560px] md:min-h-[620px] flex items-center pt-12 pb-12">
          <div className="w-full max-w-xl text-white">
            <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold italic tracking-wide leading-tight">
              Hire React Native Development Experts
            </h1>
            <p className="mt-5 text-[13px] md:text-[14px] font-normal leading-7 text-gray-100">
              Build powerful, cross-platform mobile applications with our expert React Native developers. We specialize in React Native, JavaScript, TypeScript, Redux, and native integrations to accelerate your mobile product growth.
            </p>
            <p className="mt-4 text-[13px] md:text-[14px] font-normal leading-7 text-gray-100">
              Our team ensures native-like performance, seamless UI, and robust architecture to deliver engaging mobile experiences for iOS and Android from a single codebase.
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
        title="Technologies Our React Native Developers Use"
        technologies={reactNativeTechnologies}
      />

      <HireProcessPanel
        bg="muted" title="How Hiring a React Native Developer Works" steps={PROCESS_STEPS} />

      <HireEngagementCards
        bg="white" models={ENGAGEMENT_MODELS} />

      <HireInquiryPanel
        bg="muted" roleTitle="React Native Developer" serviceName="React Native Development" />

      <HireFaqAccordion
        bg="white" faqs={faqs} />
    </main>
  );
}
