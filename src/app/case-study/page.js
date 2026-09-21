import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedWorks } from '@/lib/caseStudies';
import { auditPageMetadata } from '@/lib/auditMetadata';

export const metadata = auditPageMetadata('/case-study');

export default function OurWorkPage() {
  const featuredWorks = getFeaturedWorks();

  return (
    <div className="bg-white min-h-screen pt-32 pb-20 lg:pt-40 lg:pb-24">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-[#111827]">
            Case Studies
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {featuredWorks.map((work) => (
            <article key={work.slug} className="relative group">
              <Link href={`/case-study/${work.slug}`} className="flex flex-col h-full rounded-[10px] overflow-hidden bg-white border border-gray-200 transition-all duration-300 hover:shadow-lg">
                <div className="relative w-full aspect-[16/11] md:aspect-[3/2] overflow-hidden bg-gray-100 border-b border-gray-200">
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute bottom-0 left-0 z-10">
                    <span className="inline-block bg-[#2f6bff] text-white text-[12px] md:text-[13px] font-bold uppercase tracking-wide px-5 md:px-6 py-2 md:py-2.5 rounded-tr-[10px] shadow-sm whitespace-nowrap">
                      {work.tag}
                    </span>
                  </div>
                </div>

                <div className="p-6 md:p-8 flex-grow">
                  <h2 className="text-[22px] md:text-[24px] font-bold text-[#111827] leading-[1.4] transition-colors duration-300 group-hover:text-[#2f6bff]">
                    {work.title}
                  </h2>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
