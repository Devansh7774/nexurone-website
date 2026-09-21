"use client";

import Image from "next/image";
import { COMPANY_STATS, COMPANY_STAT_COPY } from "@/lib/companyStats";
import TestimonialsCarousel from "@/components/shared/TestimonialsCarousel";

const TESTIMONIALS_BG =
  "https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/new_unique_home/5-1.jpg";

export default function Testimonials() {
  return (
    <section
      className="relative overflow-hidden bg-[#00102A] bg-cover bg-center py-16 text-white sm:py-20 lg:py-24"
      style={{ backgroundImage: `url('${TESTIMONIALS_BG}')` }}
      aria-labelledby="testimonials-heading"
    >
      <div className="container relative z-10 mx-auto max-w-[1340px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_2fr] lg:gap-12">
          <div className="testimonial-info">
            <div className="mb-4 inline-flex items-center justify-center sm:mb-6">
              <Image
                src="https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/quote.png"
                alt=""
                width={96}
                height={96}
                className="h-20 w-20 object-contain sm:h-24 sm:w-24"
                aria-hidden
              />
            </div>

            <h2
              id="testimonials-heading"
              className="mb-6 text-2xl font-bold leading-snug sm:mb-8 sm:text-3xl md:text-4xl lg:text-[40px] lg:leading-tight"
            >
              {COMPANY_STAT_COPY.clientsAndReviewsHeadline}
            </h2>

            <div className="mb-6 h-px w-full max-w-xs bg-white/30" />

            <div className="review-card inline-block rounded-xl py-4 sm:py-6">
              <p className="mb-3 text-base font-semibold text-white sm:text-lg">
                {COMPANY_STAT_COPY.excellentReviews}
              </p>
              <div className="flex items-center gap-3" role="img" aria-label={`${COMPANY_STATS.rating} out of 5 stars`}>
                <div className="flex text-[#FFB800]" aria-hidden="true">
                  {[...Array(COMPANY_STATS.ratingStars)].map((_, i) => (
                    <svg key={i} className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-lg font-bold text-white">{COMPANY_STATS.rating}</span>
              </div>
            </div>
          </div>

          <TestimonialsCarousel className="testimonial-carousel min-w-0" />
        </div>
      </div>
    </section>
  );
}
