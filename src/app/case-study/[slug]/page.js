import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getCaseStudy } from '@/lib/caseStudies';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) {
    return { title: 'Case Study Not Found' };
  }
  const description =
    caseStudy.intro[0].length > 160
      ? `${caseStudy.intro[0].slice(0, 157)}...`
      : caseStudy.intro[0];

  return pageMetadata({
    title: caseStudy.title,
    description,
    path: `/case-study/${slug}`,
    openGraph: {
      images: caseStudy.heroImage
        ? [{ url: caseStudy.heroImage, alt: caseStudy.title }]
        : undefined,
    },
  });
}

function ProjectInfoSidebar({ projectInfo }) {
  const rows = [
    { label: 'Client', value: projectInfo.client },
    projectInfo.industry ? { label: 'Industry', value: projectInfo.industry } : null,
    { label: 'Date', value: projectInfo.date },
    projectInfo.platform
      ? {
          label: 'Platform',
          value: projectInfo.platform,
          href: projectInfo.platform.startsWith('http') ? projectInfo.platform : `https://${projectInfo.platform}`,
        }
      : null,
    projectInfo.address ? { label: 'Address', value: projectInfo.address } : null,
  ].filter(Boolean);

  return (
    <div className="space-y-6">
      {rows.map((row) => (
        <div key={row.label}>
          <h4 className="text-[16px] font-bold text-[#111827] mb-1">{row.label}</h4>
          {row.href ? (
            <a
              href={row.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2667ff] text-[15px] hover:underline break-all"
            >
              {row.value.replace(/^https?:\/\//, '')}
            </a>
          ) : (
            <p className="text-gray-500 text-[15px] leading-relaxed">{row.value}</p>
          )}
        </div>
      ))}
    </div>
  );
}

function CheckList({ items }) {
  return (
    <div className="space-y-5">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-start gap-4">
          <span className="text-[#111827] font-bold text-[18px] mt-0.5">✓</span>
          <p className="text-gray-500 text-[16px] leading-[1.8]">
            <span className="font-bold text-[#111827]">{item.title}</span>
            {' – '}
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  );
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen pt-32 pb-0 lg:pt-40">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 mb-20 lg:mb-32">
        {caseStudy.heroOnly ? (
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] max-h-[620px] overflow-hidden rounded-2xl mb-16 lg:mb-24 bg-gray-100 border border-gray-200">
            <Image
              src={caseStudy.heroImage}
              alt={caseStudy.title}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 lg:mb-24">
            <div className="relative w-full aspect-[4/3] md:aspect-auto md:h-[500px] overflow-hidden rounded-2xl bg-gray-100">
              <Image
                src={caseStudy.heroImage}
                alt={caseStudy.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="relative w-full aspect-[4/3] md:aspect-auto md:h-[500px] overflow-hidden rounded-2xl bg-gray-100">
              <Image
                src={caseStudy.secondaryImage}
                alt={caseStudy.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-8 lg:pr-[60px]">
            <span className="inline-block rounded bg-[#e8f0fe] uppercase px-4 py-1.5 text-[13px] font-bold text-[#2667ff] mb-5">
              {caseStudy.tag}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-[42px] font-bold text-[#111827] leading-[1.2] mb-8 tracking-tight">
              {caseStudy.title}
            </h1>

            <div className="text-gray-500 text-[16px] leading-[1.8] space-y-6">
              {caseStudy.intro.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 lg:border-l lg:border-gray-200 lg:pl-[60px]">
            <h3 className="text-[22px] font-bold text-[#111827] mb-8">Project Info</h3>
            <ProjectInfoSidebar projectInfo={caseStudy.projectInfo} />
          </div>
        </div>
      </div>

      <div className="bg-[#f8f9fa] py-20 lg:py-28">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-20 lg:mb-24">
            <div className="lg:col-span-4">
              <h2 className="text-3xl lg:text-[32px] font-bold text-[#111827]">Background</h2>
            </div>
            <div className="lg:col-span-8">
              <div className="text-gray-500 text-[16px] leading-[1.8] space-y-6">
                {caseStudy.background.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-20 lg:mb-24">
            <div className="lg:col-span-4">
              <h2 className="text-3xl lg:text-[32px] font-bold text-[#111827]">The Challenges</h2>
            </div>
            <div className="lg:col-span-8">
              <CheckList items={caseStudy.challenges} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-20 lg:mb-24">
            <div className="lg:col-span-4">
              <h2 className="text-3xl lg:text-[32px] font-bold text-[#111827]">Solution</h2>
            </div>
            <div className="lg:col-span-8">
              <div className="text-gray-500 text-[16px] leading-[1.8] space-y-6 mb-10">
                {caseStudy.solutionIntro.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
              <CheckList items={caseStudy.solutions} />
            </div>
          </div>

          {caseStudy.architecture && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-20 lg:mb-24">
              <div className="lg:col-span-4">
                <h2 className="text-3xl lg:text-[32px] font-bold text-[#111827]">Architecture</h2>
              </div>
              <div className="lg:col-span-8">
                <div className="rounded-2xl border border-gray-200 bg-[#0b1220] p-6 text-[14px] leading-relaxed text-slate-300">
                  {caseStudy.architecture}
                </div>
              </div>
            </div>
          )}

          {caseStudy.keyTakeaway && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
              <div className="lg:col-span-4">
                <h2 className="text-3xl lg:text-[32px] font-bold text-[#111827]">Key Takeaway</h2>
              </div>
              <div className="lg:col-span-8">
                <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-[#e8f0fe] to-white p-8">
                  <p className="text-[#111827] text-[17px] leading-[1.8] font-medium">
                    {caseStudy.keyTakeaway}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
