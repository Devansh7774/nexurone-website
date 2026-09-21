"use client";

import ServiceInquirySection from "@/components/services/ServiceInquirySection";

export default function HireInquiryPanel({
  bg = "muted",
  roleTitle = "JavaScript Developer",
  serviceName = "JavaScript Development",
}) {
  return (
    <ServiceInquirySection
      id="hire-inquiry"
      bg={bg}
      eyebrow="Start Hiring"
      title={`Ready to hire a ${roleTitle}?`}
      description={`Tell us what you need for ${serviceName.toLowerCase()}. We'll match you with the right developer and respond with clear next steps.`}
      hireSubject={roleTitle}
      serviceName={serviceName}
      submitLabel="Start hiring"
      messagePlaceholder="Tell us about your hiring needs, tech stack, and timeline*"
      successMessage="Thank you. Our team will contact you within 24 hours."
    />
  );
}
