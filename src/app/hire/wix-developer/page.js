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
import { wixTechnologies } from '@/components/hire/wix/wixTechnologies';
import { getHireHeroImage } from '@/lib/serviceHeroImages';
import { hireAuditMetadata } from '@/lib/auditMetadata';
import { buildEngagementModels, buildProcessSteps } from '@/lib/hirePageContent';

export const metadata = hireAuditMetadata('wix-developer');

const HERO_IMAGE = getHireHeroImage('wix-developer');

const WHY_HIRE = {
  title: 'Why Hire Wix Developers From Nexuron Technologies?',
  imageAlt: 'Nexuron Wix development team',
  description:
    "Behind every high performing Wix website is a team that obsesses over the details most developers skip — design quality, performance, SEO, and long-term maintainability. That's the standard we hold ourselves to, on every project, for every client.",
  benefits: [
    'Experienced Wix Developers',
    'Custom Website Design & Development',
    'Expertise in Wix Editor & Wix Studio',
    'Mobile-Responsive & SEO-Friendly Designs',
    'Fast Development & Easy Maintenance',
    'Secure & Scalable Website Solutions',
  ],
};

const SKILLS = [
  {
    title: 'Custom Wix Website Development',
    description: 'Build fully customized websites aligned with your brand identity.',
  },
  {
    title: 'Wix Design & Redesign',
    description: 'Create or revamp websites with modern, high-converting designs.',
  },
  {
    title: 'Wix Velo Development',
    description: 'Develop custom functionalities using Velo by Wix.',
  },
  {
    title: 'eCommerce Development on Wix',
    description: 'Build secure and scalable online stores using Wix eCommerce.',
  },
  {
    title: 'Wix SEO Optimization',
    description: 'Improve website visibility and ranking on search engines.',
  },
  {
    title: 'Website Maintenance & Support',
    description: 'Ensure smooth performance with ongoing updates and support.',
  },
];

const FAQS = [
  {
    question: 'How quickly can I hire a Wix developer?',
    answer:
      'You can onboard a dedicated Wix developer within 48–72 hours after we discuss your requirements, design goals, and timeline.',
  },
  {
    question: 'Do your developers work in my time zone?',
    answer:
      'Yes. Our developers can overlap with your time zone for daily standups, design reviews, and real-time collaboration.',
  },
  {
    question: 'Can I interview the developer before hiring?',
    answer:
      'Absolutely. We provide a shortlist of pre-vetted candidates, and you interview them to confirm technical and cultural fit.',
  },
  {
    question: 'Do you provide post-launch support?',
    answer:
      'Yes. We offer ongoing support and maintenance packages to keep your website secure, updated, and performing optimally.',
  },
];

const PROCESS_STEPS = buildProcessSteps('Wix');
const ENGAGEMENT_MODELS = buildEngagementModels('Wix', 'Wix Developer');

export default function HireWixDeveloperPage() {
  return (
    <main>
      <section className="relative min-h-[560px] overflow-hidden md:min-h-[620px]">
        <Image
          src={HERO_IMAGE}
          alt="Hire Wix developers"
          fill
          priority
          className="object-cover object-center"
        />

        <HireHeroOverlay />

        <div className="relative z-10 mx-auto flex min-h-[560px] max-w-[1340px] items-center px-4 pb-12 pt-12 sm:px-6 md:min-h-[620px] lg:px-8">
          <div className="w-full max-w-xl text-white">
            <h1 className="text-3xl font-bold italic leading-tight tracking-wide md:text-4xl lg:text-[40px]">
              Hire Wix Development Experts
            </h1>
            <p className="mt-5 text-[13px] font-normal leading-7 text-gray-100 md:text-[14px]">
              Build stunning, user-friendly, and fully responsive websites with our expert Wix developers.
              We specialize in creating visually appealing websites, custom functionalities, and optimized
              designs tailored to your business needs.
            </p>
            <p className="mt-4 text-[13px] font-normal leading-7 text-gray-100 md:text-[14px]">
              Our team ensures fast development, modern UI/UX, and seamless performance to deliver
              impactful digital experiences.
            </p>

            <Link
              href="#hire-inquiry"
              className="mt-8 inline-flex rounded-md bg-[#5b9cff] px-8 py-3 text-[15px] font-medium text-white transition-colors hover:bg-[#4a8bee]"
            >
              Hire Now
            </Link>
          </div>
        </div>
      </section>

      <HireWhySplit
        bg="white"
        title={WHY_HIRE.title}
        description={WHY_HIRE.description}
        benefits={WHY_HIRE.benefits}
        imageAlt={WHY_HIRE.imageAlt}
      />

      <HireSkillsGrid
        bg="muted" skills={SKILLS} />

      <HireTechStack
        bg="white"
        title="Technologies Our Wix Developers Use"
        technologies={wixTechnologies}
      />

      <HireProcessPanel
        bg="muted" title="How Hiring a Wix Developer Works" steps={PROCESS_STEPS} />

      <HireEngagementCards
        bg="white" models={ENGAGEMENT_MODELS} />

      <HireInquiryPanel
        bg="muted" roleTitle="Wix Developer" serviceName="Wix Development" />

      <HireFaqAccordion
        bg="white" faqs={FAQS} />
    </main>
  );
}
