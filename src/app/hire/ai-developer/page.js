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
import { aiMlTechnologies } from '@/components/hire/ai/aiMlTechnologies';
import { getHireHeroImage } from '@/lib/serviceHeroImages';
import { hireAuditMetadata } from '@/lib/auditMetadata';

export const metadata = hireAuditMetadata('ai-developer');



const HERO_IMAGE = getHireHeroImage('ai-developer');

const whyHireContent = {
  title: 'Why Hire AI/ML Experts From Nexuron Technologies?',
  imageAlt: 'Nexuron AI/ML development team',
  description:
    'Behind every high performing AI application is a team that obsesses over the details most developers skip model accuracy, data quality, scalability, and long term maintainability. That\'s the standard we hold ourselves to, on every project, for every client.',
  benefits: [
    'Experienced AI/ML Engineers',
    'LLM & Generative AI Expertise',
    'Custom Machine Learning Models',
    'Computer Vision & NLP Solutions',
    'MLOps & Model Deployment',
    'End-to-End AI Integration Support',
  ],
};

const expertiseContent = {
  expertiseTitle: 'Our AI/ML Development Expertise',
  expertise: [
    {
      title: 'Custom AI Application Development',
      description:
        'Build intelligent applications tailored to your business needs with modern AI and machine learning technologies.',
    },
    {
      title: 'LLM & Generative AI Solutions',
      description:
        'Develop chatbots, content generation tools, and AI assistants powered by OpenAI, LangChain, and custom LLMs.',
    },
    {
      title: 'Machine Learning Model Development',
      description:
        'Design, train, and deploy custom ML models for prediction, classification, and recommendation systems.',
    },
    {
      title: 'Computer Vision & NLP',
      description:
        'Build image recognition, object detection, sentiment analysis, and natural language processing solutions.',
    },
    {
      title: 'MLOps & Model Deployment',
      description:
        'Implement scalable model deployment pipelines with monitoring, versioning, and continuous improvement.',
    },
    {
      title: 'AI Consulting & Support',
      description:
        'Provide AI strategy consulting, model optimization, and ongoing maintenance for production AI systems.',
    },
  ],
};

const faqs = [
  {
    question: 'How quickly can I hire an AI/ML developer?',
    answer:
      'You can onboard a dedicated AI/ML engineer within 48-72 hours after requirement discussion.',
  },
  {
    question: 'Do your developers work in my time zone?',
    answer:
      'Yes, our developers are flexible and can overlap with your time zone to ensure seamless communication, daily reporting, and agile collaboration.',
  },
  {
    question: 'Can I interview the developer before hiring?',
    answer:
      'Absolutely. We provide you with a shortlist of pre-vetted candidates, and you can interview them to ensure they are the perfect technical and cultural fit for your team.',
  },
  {
    question: 'Do you provide post-launch support for AI models?',
    answer:
      'Yes, we offer comprehensive post-launch support including model monitoring, retraining, performance optimization, and ongoing maintenance.',
  },
];




const PROCESS_STEPS = buildProcessSteps('AI/ML');

const ENGAGEMENT_MODELS = buildEngagementModels('AI/ML', 'AI/ML Developer');

export default function HireAiDeveloperPage() {
  return (
    <main>
      <section className="relative overflow-hidden min-h-[560px] md:min-h-[620px]">
        <Image
          src={HERO_IMAGE}
          alt="Hire AI/ML developers"
          fill
          priority
          className="object-cover object-center"
        />

        <HireHeroOverlay />

        <div className="relative z-10 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 min-h-[560px] md:min-h-[620px] flex items-center pt-12 pb-12">
          <div className="w-full max-w-xl text-white">
            <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold italic tracking-wide leading-tight">
              Hire AI/ML Development Experts
            </h1>
            <p className="mt-5 text-[13px] md:text-[14px] font-normal leading-7 text-gray-100">
              Build intelligent applications and data-driven solutions with our expert AI/ML developers. We specialize in machine learning, LLMs, computer vision, NLP, and modern AI frameworks tailored to your business needs.
            </p>
            <p className="mt-4 text-[13px] md:text-[14px] font-normal leading-7 text-gray-100">
              Our team ensures accurate models, scalable deployments, and seamless AI integrations to deliver transformative digital experiences for startups and enterprises alike.
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
        title="Technologies Our AI/ML Developers Use"
        technologies={aiMlTechnologies}
      />

      <HireProcessPanel
        bg="muted" title="How Hiring a AI/ML Developer Works" steps={PROCESS_STEPS} />

      <HireEngagementCards
        bg="white" models={ENGAGEMENT_MODELS} />

      <HireInquiryPanel
        bg="muted" roleTitle="AI/ML Developer" serviceName="AI/ML Development" />

      <HireFaqAccordion
        bg="white" faqs={faqs} />
    </main>
  );
}
