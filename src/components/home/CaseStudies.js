"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getHomeCarouselItems } from "@/lib/caseStudies";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

const projectItems = getHomeCarouselItems();

export default function CaseStudies() {
  const [swiperRef, setSwiperRef] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const prefersReducedMotion = usePrefersReducedMotion();
  const totalSlides = projectItems.length;
  const modules = prefersReducedMotion ? [] : [Autoplay];

  return (
    <section className="overflow-hidden bg-[#f8f9fa] py-16 sm:py-20 lg:py-28" aria-labelledby="case-studies-heading">
      <div className="mx-auto mb-10 max-w-[1340px] px-4 sm:mb-12 sm:px-6 lg:mb-16 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center md:gap-8">
          <h2
            id="case-studies-heading"
            className="max-w-[650px] text-3xl font-bold leading-[1.2] tracking-tight text-[#111827] sm:text-4xl md:text-5xl lg:text-[52px]"
          >
            Come have a look at some of our finest work
          </h2>

          <div className="flex items-center gap-4 sm:gap-5">
            <button
              type="button"
              onClick={() => swiperRef?.slidePrev()}
              className="nexuron-btn-solid flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full shadow-lg sm:h-[50px] sm:w-[50px]"
              aria-label="Previous project"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div className="text-xl font-bold text-[#111827] min-w-[3.5rem] text-center">
              {currentSlide} / {totalSlides}
            </div>
            <button
              type="button"
              onClick={() => swiperRef?.slideNext()}
              className="nexuron-btn-solid flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full shadow-lg sm:h-[50px] sm:w-[50px]"
              aria-label="Next project"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="w-full">
        <Swiper
          modules={modules}
          loop={totalSlides > 3}
          grabCursor
          speed={prefersReducedMotion ? 0 : 800}
          centeredSlides
          slidesPerView={1.05}
          spaceBetween={16}
          autoplay={
            prefersReducedMotion
              ? false
              : { delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }
          }
          onSwiper={setSwiperRef}
          onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex + 1)}
          breakpoints={{
            640: { slidesPerView: 1.3, spaceBetween: 30 },
            1024: { slidesPerView: 1.6, spaceBetween: 40 },
            1280: { slidesPerView: 1.8, spaceBetween: 50 },
            1536: { slidesPerView: 2.1, spaceBetween: 60 },
          }}
          className="!overflow-visible"
        >
          {projectItems.map((item) => (
            <SwiperSlide key={item.slug}>
              {({ isActive }) => (
                <div
                  className={`group relative w-full aspect-[4/3] md:aspect-[16/10] xl:aspect-[1.8/1] max-h-[550px] rounded-2xl overflow-hidden transition-all duration-700 ease-out border ${
                    isActive
                      ? "border-[#e5e7eb] shadow-[0_8px_30px_rgb(0,0,0,0.06)] bg-white scale-100 opacity-100 z-10 p-3 sm:p-4"
                      : "border-transparent bg-transparent scale-[0.92] opacity-50 z-0 p-0"
                  }`}
                >
                  <div className={`relative w-full min-h-[220px] h-full rounded-xl overflow-hidden ${isActive ? "bg-gray-100" : "bg-gray-100"}`}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      loading="lazy"
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 70vw, 50vw"
                    />

                    <div
                      className={`absolute -left-[2px] -bottom-[2px] z-20 w-[95%] sm:w-[85%] md:w-[65%] lg:w-[55%] bg-white rounded-tr-2xl transition-all duration-700 delay-100 ${
                        isActive
                          ? "translate-y-0 opacity-100 p-6 pb-2 sm:p-8 sm:pb-4"
                          : "translate-y-12 opacity-0 p-6"
                      }`}
                    >
                      <div
                        className="absolute left-[2px] top-[-16px] h-4 w-4 z-30 transition-opacity duration-700 delay-100"
                        style={{
                          background: "radial-gradient(circle at top right, rgba(255,255,255,0) 15.5px, white 16px)",
                          opacity: isActive ? 1 : 0,
                        }}
                      />
                      <div
                        className="absolute bottom-[2px] right-[-16px] h-4 w-4 z-30 transition-opacity duration-700 delay-100"
                        style={{
                          background: "radial-gradient(circle at top right, rgba(255,255,255,0) 15.5px, white 16px)",
                          opacity: isActive ? 1 : 0,
                        }}
                      />

                      <h3 className="mb-2 text-[16px] sm:text-[18px] font-bold text-[#111827] leading-snug tracking-tight line-clamp-2">
                        {item.title}
                      </h3>
                      <span className="mb-3 block text-[11px] sm:text-[12px] font-medium uppercase tracking-wide text-[#2667ff]">
                        {item.tags}
                      </span>
                      <p className="mb-5 text-[12px] sm:text-[13px] leading-snug text-[#4b5563] line-clamp-2">
                        {item.description}
                      </p>

                      <Link
                        href={item.href}
                        className="nexuron-btn-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-[13px] sm:text-[14px] font-medium"
                      >
                        Explore 
                      </Link>
                    </div>

                    {!isActive && (
                      <div className="absolute inset-0 bg-[#000033] opacity-40 transition-opacity duration-700 z-10" />
                    )}
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
