import Image from "next/image";
import Link from "next/link";
import ServiceInquiryScrollButton from "@/components/ui/ServiceInquiryScrollButton";

export default function PageHero({
  image,
  imageAlt,
  badge,
  title,
  description,
  primaryCta,
  primaryCtaAnimated = false,
  secondaryCta,
  hireForm = false,
  imagePosition = "object-center",
  align = "left",
}) {
  const isCentered = align === "center";
  const isRight = align === "right";

  return (
    <section
      data-no-scroll-reveal
      className="relative flex min-h-[480px] w-full items-center justify-center overflow-hidden sm:min-h-[560px] md:min-h-[620px] lg:min-h-[680px]"
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        className={`object-cover ${isCentered ? "object-center" : imagePosition}`}
        priority
        fetchPriority="high"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1340px"
      />

      {isCentered ? (
        <div className="absolute inset-0 bg-[#0b1220]/42" />
      ) : isRight ? (
        <>
          <div className="absolute inset-y-0 right-0 w-full bg-[linear-gradient(to_left,rgba(11,18,32,0.92)_0%,rgba(15,23,42,0.55)_38%,rgba(15,23,42,0.15)_58%,transparent_75%)]" />
          <div className="absolute bottom-0 right-0 h-40 w-[55%] bg-gradient-to-t from-[#0f172a]/35 to-transparent" />
        </>
      ) : (
        <>
          <div className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(to_right,rgba(11,18,32,0.92)_0%,rgba(15,23,42,0.55)_38%,rgba(15,23,42,0.15)_58%,transparent_75%)]" />
          <div className="absolute bottom-0 left-0 h-40 w-[55%] bg-gradient-to-t from-[#0f172a]/35 to-transparent" />
        </>
      )}

      <div className="relative z-10 mx-auto w-full max-w-[1340px] px-4 sm:px-6 lg:px-8">
        <div
          className={`flex w-full flex-col${
            isCentered
              ? " mx-auto max-w-4xl items-center text-center"
              : isRight
                ? " ml-auto max-w-3xl items-end text-right"
                : " max-w-3xl items-start text-left"
          }`}
        >
          {badge && (
            <span className="hero-enter-animate mb-5 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold tracking-wide text-blue-200 backdrop-blur-sm">
              {badge}
            </span>
          )}

          <h1
            className={`hero-enter-animate hero-enter-delay-1 mb-6 font-bold leading-[1.12] text-white text-balance${
              isCentered
                ? " text-[28px] sm:text-4xl lg:text-[50px]"
                : " text-3xl sm:text-4xl lg:text-[58px]"
            }`}
          >
            {title}
          </h1>

          <p className="hero-enter-animate hero-enter-delay-2 mb-8 max-w-3xl text-pretty text-base leading-relaxed text-gray-100 sm:mb-10 sm:text-lg md:text-xl">
            {description}
          </p>

          {(hireForm || primaryCta || secondaryCta) && (
            <div
              className={`hero-enter-animate hero-enter-delay-3 w-full${
                isCentered ? " flex justify-center" : isRight ? " flex justify-end" : ""
              }`}
            >
              {hireForm ? (
                <ServiceInquiryScrollButton />
              ) : (
                <div
                  className={`flex flex-col gap-4 sm:flex-row${
                    isCentered ? " justify-center" : isRight ? " justify-end" : ""
                  }`}
                >
                  {primaryCta && (
                    <Link
                      href={primaryCta.href}
                      className={`${primaryCtaAnimated ? "nexuron-cta-btn" : "nexuron-btn-primary"} inline-flex min-h-[44px] items-center justify-center rounded-full px-8 py-3.5 text-[16px] font-semibold text-white`}
                    >
                      <span className={primaryCtaAnimated ? "relative z-[1]" : undefined}>
                        {primaryCta.label}
                      </span>
                    </Link>
                  )}
                  {secondaryCta && (
                    <Link
                      href={secondaryCta.href}
                      className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/30 bg-white/10 px-8 py-3.5 text-[16px] font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
                    >
                      {secondaryCta.label}
                    </Link>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
