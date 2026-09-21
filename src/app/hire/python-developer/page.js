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
import { pythonTechnologies } from '@/components/hire/python/pythonTechnologies';
import { getHireHeroImage } from '@/lib/serviceHeroImages';
import { hireAuditMetadata } from '@/lib/auditMetadata';

export const metadata = hireAuditMetadata('python-developer');


const HERO_IMAGE = getHireHeroImage('python-developer');

const whyHireContent = {
  title: 'Why Hire Python Developers From Nexuron Technologies?',
  imageAlt: 'Nexuron Python development team',
  description:
    'Behind every high performing Python application is a team that obsesses over the details most developers skip architecture, scalability, security, and long term code health. That\'s the standard we hold ourselves to, on every project, for every client.',
  benefits: [
    'Experienced Python Developers',
    'Django, Flask & FastAPI Expertise',
    'Web Application & API Development',
    'Data Science & AI/ML Solutions',
    'Secure & Scalable Backend Systems',
    'End-to-End Integration Support',
  ],
};

const expertiseContent = {
  expertiseTitle: 'Our Python Development Expertise',
  expertise: [
    {
      title: 'Custom Python Web Development',
      description:
        'Build robust, scalable web applications with Django, Flask, and FastAPI tailored to your business needs.',
    },
    {
      title: 'Python API Development',
      description:
        'Develop secure RESTful APIs and microservices for web and mobile applications.',
    },
    {
      title: 'Data Science & Analytics',
      description:
        'Build data pipelines, analytics dashboards, and business intelligence solutions with Python.',
    },
    {
      title: 'AI & Machine Learning',
      description:
        'Develop intelligent applications with TensorFlow, scikit-learn, and modern ML frameworks.',
    },
    {
      title: 'Python Performance Optimization',
      description:
        'Improve application speed, memory usage, and overall system efficiency.',
    },
    {
      title: 'Application Maintenance & Support',
      description:
        'Ensure long-term stability with version upgrades, bug fixes, and ongoing technical support.',
    },
  ],
};

const faqs = [
  {
    question: 'How quickly can I hire a Python developer?',
    answer:
      'You can onboard a dedicated Python developer within 48-72 hours after requirement discussion.',
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
    question: 'Do you provide post-launch support?',
    answer:
      'Yes, we offer comprehensive post-launch support and maintenance packages to keep your application secure, updated, and performing optimally.',
  },
];




const PROCESS_STEPS = buildProcessSteps('Python');

const ENGAGEMENT_MODELS = buildEngagementModels('Python', 'Python Developer');

export default function HirePythonDeveloperPage() {
  return (
    <main>
      <section className="relative overflow-hidden min-h-[560px] md:min-h-[620px]">
        <Image
          src={HERO_IMAGE}
          alt="Hire Python developers"
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
              Build scalable web applications, APIs, and intelligent systems with our expert Python developers. We specialize in Django, Flask, FastAPI, data science, and AI/ML solutions tailored to your business needs.
            </p>
            <p className="mt-4 text-[13px] md:text-[14px] font-normal leading-7 text-gray-100">
              Our team ensures clean architecture, robust backend systems, and seamless integrations to deliver powerful digital solutions for startups and enterprises alike.
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
        title="Technologies Our Python Developers Use"
        technologies={pythonTechnologies}
      />

      <HireProcessPanel
        bg="muted" title="How Hiring a Python Developer Works" steps={PROCESS_STEPS} />

      <HireEngagementCards
        bg="white" models={ENGAGEMENT_MODELS} />

      <HireInquiryPanel
        bg="muted" roleTitle="Python Developer" serviceName="Python Development" />

      <HireFaqAccordion
        bg="white" faqs={faqs} />
    </main>
  );
}
