"use client";

export default function ServiceInquiryScrollButton() {
  function scrollToInquiryForm() {
    document.getElementById("service-inquiry-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <button
      type="button"
      onClick={scrollToInquiryForm}
      className="nexuron-cta-btn inline-flex w-full items-center justify-center rounded-full px-8 py-3.5 text-[16px] font-medium text-white sm:w-auto"
    >
      <span className="relative z-[1]">Let&apos;s discuss your project</span>
    </button>
  );
}
