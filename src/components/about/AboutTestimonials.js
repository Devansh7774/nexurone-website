import Image from "next/image";
import { COMPANY_STATS, COMPANY_STAT_COPY } from "@/lib/companyStats";
import TestimonialsCarousel from "@/components/shared/TestimonialsCarousel";

export default function AboutTestimonials() {
  return (
    <>
      <section
        className="relative h-[500px] w-full bg-cover bg-center bg-no-repeat md:h-[600px] lg:h-[700px]"
        style={{
          backgroundImage: `url('https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/nexuron-assets/20.jpg')`,
        }}
      >
        <div className="mx-auto flex h-full max-w-[1340px] items-end px-4 sm:px-6 lg:px-8">
          <div className="relative flex h-[280px] w-full max-w-[350px] flex-col items-center justify-center rounded-t-[24px] bg-[#162032] p-6 sm:h-[320px] sm:max-w-[450px] sm:p-8 md:max-w-[500px]">
            <div className="relative flex h-full w-full flex-col items-center justify-center">
              <div className="absolute inset-0 z-0">
                <Image
                  src="https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/nexuron-assets/badge.png"
                  alt=""
                  fill
                  className="object-contain"
                  aria-hidden
                />
              </div>
              <div className="z-10 mt-4 flex flex-col items-center text-center">
                <h3 className="mb-2 text-[28px] font-bold text-white sm:text-[36px]">Trusted By</h3>
                <p className="mb-3 text-[16px] leading-tight text-gray-300 sm:text-[18px]">
                  {COMPANY_STATS.clients} Clients
                  <br />
                  Worldwide
                </p>
                <div className="flex items-center gap-1 text-[12px] text-white">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative w-full overflow-hidden bg-[#FAFAFA] bg-cover bg-center bg-no-repeat py-20 lg:py-32"
        style={{
          backgroundImage: `url('https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/nexuron-assets/3.jpg')`,
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-[#FDF4FF]/40 to-[#F4F0FF]/60" />

        <div className="relative z-10 mx-auto flex max-w-[1340px] flex-col items-center gap-12 px-4 sm:px-6 lg:flex-row lg:gap-24 lg:px-8">
          <div className="flex w-full flex-col lg:w-[40%]">
            <div className="relative mb-8 h-[80px] w-[80px]">
              <Image
                src="https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/nexuron-assets/quote.png"
                alt=""
                fill
                className="object-contain"
                aria-hidden
              />
            </div>

            <h2 className="mb-6 text-[28px] font-bold leading-[1.2] tracking-tight text-[#0F172A] sm:mb-8 sm:text-[36px] lg:text-[48px]">
              {COMPANY_STAT_COPY.clientsAndReviewsHeadline}
            </h2>

            <div className="mt-2 border-t border-gray-200 pt-8">
              <p className="mb-3 text-[18px] font-bold text-[#0F172A]">
                {COMPANY_STAT_COPY.excellentReviews}
              </p>
              <div className="flex items-center gap-3">
                <div className="flex text-[#FFB800]">
                  {[...Array(COMPANY_STATS.ratingStars)].map((_, i) => (
                    <svg key={i} className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-lg font-bold text-[#0F172A]">{COMPANY_STATS.rating}</span>
              </div>
            </div>
          </div>

          <TestimonialsCarousel className="w-full lg:w-[60%]" />
        </div>
      </section>
    </>
  );
}
