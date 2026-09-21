"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { testimonials } from "@/lib/testimonialsContent";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

export default function TestimonialsCarousel({ className = "" }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const modules = prefersReducedMotion ? [] : [Autoplay];

  return (
    <div className={`w-full min-w-0 overflow-hidden ${className}`}>
      <Swiper
        modules={modules}
        loop={testimonials.length > 2}
        grabCursor
        speed={prefersReducedMotion ? 0 : 700}
        slidesPerView={1}
        slidesPerGroup={1}
        spaceBetween={16}
        autoplay={
          prefersReducedMotion
            ? false
            : {
                delay: 4500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
        }
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 24 },
        }}
        className="!overflow-visible"
        aria-label="Client testimonials"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <article className="flex h-full flex-col overflow-hidden rounded-[16px] bg-gradient-to-r from-[#2563EB] to-[#3730A3] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)]">
              <div
                className="relative flex-1 bg-white p-5 sm:p-8 lg:p-10"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 48px 100%, 0 calc(100% - 48px))" }}
              >
                <blockquote className="relative z-10 text-[15px] font-medium leading-[1.75] text-gray-600 sm:text-[16px]">
                  <p>&ldquo;{testimonial.quote}&rdquo;</p>
                </blockquote>

                <div className="absolute bottom-4 right-6 z-0 h-16 w-16 opacity-10 sm:bottom-6 sm:right-8 sm:h-20 sm:w-20">
                  <Image
                    src="https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/quote.png"
                    alt=""
                    fill
                    className="object-contain"
                    aria-hidden
                  />
                </div>
              </div>

              <footer className="flex items-center gap-3 px-5 py-4 sm:gap-4 sm:px-8 sm:py-6 lg:px-10 lg:py-8">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-[3px] border-blue-400/50 sm:h-[60px] sm:w-[60px]">
                  <Image
                    src={testimonial.authorImage}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="60px"
                    loading="lazy"
                  />
                </div>
                <div className="min-w-0 flex flex-col">
                  <cite className="text-base font-bold not-italic leading-tight text-white sm:text-lg">
                    {testimonial.authorName}
                  </cite>
                  <span className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-blue-200 sm:text-[13px]">
                    {testimonial.authorTitle}
                  </span>
                </div>
              </footer>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
