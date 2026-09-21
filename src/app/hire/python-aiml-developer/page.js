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
import { pythonAimlTechnologies } from '@/components/hire/python/pythonAimlTechnologies';
import { getHireHeroImage } from '@/lib/serviceHeroImages';
import { hireAuditMetadata } from '@/lib/auditMetadata';

export const metadata = hireAuditMetadata('python-aiml-developer');


const HERO_IMAGE = getHireHeroImage('python-aiml-developer');

const whyHireContent = {
  title: 'Why Hire Python Developers For AI/ML & Automation?',
  imageAlt: 'Nexuron Python AI/ML development team',
  description:
    'Behind every high performing AI and automation system is a Python team that obsesses over the details most developers skip data quality, model accuracy, workflow reliability, and long term maintainability. That\'s the standard we hold ourselves to, on every project, for every client.',
  benefits: [
    'Experienced Python AI/ML Engineers',
    'LLM & Generative AI Development',
    'Intelligent Workflow Automation',
    'Data Pipelines & Analytics',
    'Custom ML Model Development',
    'End-to-End AI Integration Support',
  ],
};

const expertiseContent = {
  expertiseTitle: 'Our Python AI/ML & Automation Expertise',
  expertise: [
    {
      title: 'AI & Machine Learning Solutions',
      description:
        'Build intelligent applications with TensorFlow, PyTorch, scikit-learn, and custom ML models.',
    },
    {
      title: 'LLM & Generative AI Apps',
      description:
        'Develop chatbots, AI assistants, and content tools with OpenAI, LangChain, and Hugging Face.',
    },
    {
      title: 'Python Automation Scripts',
      description:
        'Automate repetitive tasks, data processing, reporting, and business workflows with Python.',
    },
    {
      title: 'Data Science & Analytics',
      description:
        'Build data pipelines, ETL processes, dashboards, and predictive analytics with Pandas and NumPy.',
    },
    {
      title: 'AI API & Backend Development',
      description:
        'Deploy AI models as scalable APIs with FastAPI, Flask, and cloud-native architectures.',
    },
    {
      title: 'MLOps & Model Deployment',
      description:
        'Implement model monitoring, versioning, retraining pipelines, and production deployment.',
    },
  ],
};

const faqs = [
  {
    question: 'How quickly can I hire a Python AI/ML developer?',
    answer:
      'You can onboard a dedicated Python AI/ML developer within 48-72 hours after requirement discussion.',
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




const PROCESS_STEPS = buildProcessSteps('Python AI/ML');

const ENGAGEMENT_MODELS = buildEngagementModels('Python AI/ML', 'Python AI/ML Developer');

export default function HirePythonAimlDeveloperPage() {
  return (
    <main>
      <section className="relative overflow-hidden min-h-[560px] md:min-h-[620px]">
        <Image
          src={HERO_IMAGE}
          alt="Hire Python AI/ML developers"
          fill
          priority
          className="object-cover object-center"
        />

        <HireHeroOverlay />

        <div className="relative z-10 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 min-h-[560px] md:min-h-[620px] flex items-center pt-12 pb-12">
          <div className="w-full max-w-xl text-white">
            <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold italic tracking-wide leading-tight">
              Hire Python Development Experts
            </h1>
            <p className="mt-5 text-[13px] md:text-[14px] font-normal leading-7 text-gray-100">
              Power your AI/ML and automation initiatives with our expert Python developers. We specialize in machine learning, LLMs, intelligent workflows, data pipelines, and custom automation solutions tailored to your business needs.
            </p>
            <p className="mt-4 text-[13px] md:text-[14px] font-normal leading-7 text-gray-100">
              Our team ensures accurate models, reliable automations, and seamless AI integrations to deliver transformative solutions for startups and enterprises alike.
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
        title="Technologies Our Python AI/ML Developers Use"
        technologies={pythonAimlTechnologies}
      />

      <HireProcessPanel
        bg="muted" title="How Hiring a Python AI/ML Developer Works" steps={PROCESS_STEPS} />

      <HireEngagementCards
        bg="white" models={ENGAGEMENT_MODELS} />

      <HireInquiryPanel
        bg="muted" roleTitle="Python AI/ML Developer" serviceName="Python AI/ML Development" />

      <HireFaqAccordion
        bg="white" faqs={faqs} />
    </main>
  );
}
