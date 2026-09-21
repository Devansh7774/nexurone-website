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
import { devopsTechnologies } from '@/components/hire/devops/devopsTechnologies';
import { getHireHeroImage } from '@/lib/serviceHeroImages';
import { hireAuditMetadata } from '@/lib/auditMetadata';

export const metadata = hireAuditMetadata('devops-developer');


const HERO_IMAGE = getHireHeroImage('devops-developer');

const whyHireContent = {
  title: 'Why Hire DevOps Experts From Nexuron Technologies?',
  imageAlt: 'Nexuron DevOps team',
  description:
    'Behind every high performing infrastructure is a team that obsesses over the details most engineers skip automation, security, uptime, and long term scalability. That\'s the standard we hold ourselves to, on every project, for every client.',
  benefits: [
    'Experienced DevOps Engineers',
    'CI/CD Pipeline Automation',
    'Cloud Infrastructure on AWS & Azure',
    'Container Orchestration with Kubernetes',
    'Infrastructure as Code (IaC)',
    '24/7 Monitoring & Incident Response',
  ],
};

const expertiseContent = {
  expertiseTitle: 'Our DevOps Expertise',
  expertise: [
    {
      title: 'CI/CD Pipeline Development',
      description:
        'Build automated build, test, and deployment pipelines with Jenkins, GitHub Actions, and GitLab CI.',
    },
    {
      title: 'Cloud Infrastructure Management',
      description:
        'Design, deploy, and manage scalable cloud infrastructure on AWS, Azure, and Google Cloud.',
    },
    {
      title: 'Containerization & Orchestration',
      description:
        'Implement Docker containers and Kubernetes clusters for scalable, portable application deployments.',
    },
    {
      title: 'Infrastructure as Code',
      description:
        'Automate infrastructure provisioning with Terraform, Ansible, and CloudFormation.',
    },
    {
      title: 'Monitoring & Logging',
      description:
        'Set up comprehensive monitoring, alerting, and logging with Prometheus, Grafana, and ELK stack.',
    },
    {
      title: 'DevOps Consulting & Support',
      description:
        'Provide ongoing DevOps consulting, security audits, and infrastructure optimization.',
    },
  ],
};

const faqs = [
  {
    question: 'How quickly can I hire a DevOps engineer?',
    answer:
      'You can onboard a dedicated DevOps engineer within 48-72 hours after requirement discussion.',
  },
  {
    question: 'Do your engineers work in my time zone?',
    answer:
      'Yes, our engineers are flexible and can overlap with your time zone to ensure seamless communication, daily reporting, and agile collaboration.',
  },
  {
    question: 'Can I interview the engineer before hiring?',
    answer:
      'Absolutely. We provide you with a shortlist of pre-vetted candidates, and you can interview them to ensure they are the perfect technical and cultural fit for your team.',
  },
  {
    question: 'Do you provide ongoing infrastructure support?',
    answer:
      'Yes, we offer comprehensive ongoing support and maintenance packages to keep your infrastructure secure, optimized, and performing at peak efficiency.',
  },
];




const PROCESS_STEPS = buildProcessSteps('DevOps');

const ENGAGEMENT_MODELS = buildEngagementModels('DevOps', 'DevOps Developer');

export default function HireDevopsDeveloperPage() {
  return (
    <main>
      <section className="relative overflow-hidden min-h-[560px] md:min-h-[620px]">
        <Image
          src={HERO_IMAGE}
          alt="Hire DevOps experts"
          fill
          priority
          className="object-cover object-center"
        />

        <HireHeroOverlay />

        <div className="relative z-10 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 min-h-[560px] md:min-h-[620px] flex items-center pt-12 pb-12">
          <div className="w-full max-w-xl text-white">
            <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold italic tracking-wide leading-tight">
              Hire DevOps Experts
            </h1>
            <p className="mt-5 text-[13px] md:text-[14px] font-normal leading-7 text-gray-100">
              Accelerate your deployment pipeline and optimize infrastructure with our expert DevOps engineers. We specialize in CI/CD automation, cloud infrastructure, container orchestration, and reliable DevOps practices.
            </p>
            <p className="mt-4 text-[13px] md:text-[14px] font-normal leading-7 text-gray-100">
              Our team ensures faster releases, improved reliability, and scalable infrastructure to deliver seamless operations for startups and enterprises alike.
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
        title="Technologies Our DevOps Developers Use"
        technologies={devopsTechnologies}
      />

      <HireProcessPanel
        bg="muted" title="How Hiring a DevOps Developer Works" steps={PROCESS_STEPS} />

      <HireEngagementCards
        bg="white" models={ENGAGEMENT_MODELS} />

      <HireInquiryPanel
        bg="muted" roleTitle="DevOps Developer" serviceName="DevOps Engineering" />

      <HireFaqAccordion
        bg="white" faqs={faqs} />
    </main>
  );
}
