"use client";

import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Send } from "lucide-react";
import ServiceSection from '@/components/services/ServiceSection';
import ServiceSectionHeader from '@/components/services/ServiceSectionHeader';
import ContactInfoItems from '@/components/contact/ContactInfoItems';
import RecaptchaV2 from '@/components/forms/RecaptchaV2';
import { SERVICE_CARD } from "@/components/services/servicePageLayout";

const inputClass =
  "w-full border-b border-slate-200 bg-transparent py-3 text-sm text-slate-700 placeholder-slate-400 transition-colors focus:border-blue-600 focus:outline-none";

export default function ServiceInquirySection({
  serviceName = "",
  hireSubject = "Service Inquiry",
  bg = "muted",
  id = "service-inquiry-form",
  eyebrow = "Get in touch",
  title = "Let's discuss your project",
  description,
  submitLabel = "Inquire now",
  messagePlaceholder = "Tell us about your project*",
  successMessage = "Thank you. Our team will contact you shortly.",
}) {
  const pathname = usePathname();
  const recaptchaRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const serviceSlug = pathname?.startsWith("/services/")
    ? pathname.replace("/services/", "").split("/")[0]
    : pathname?.startsWith("/hire/")
      ? pathname.replace("/hire/", "").split("/")[0]
      : "";

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    if (!form.name.trim()) {
      setStatus({ type: "error", message: "Please enter your name." });
      return;
    }

    if (!form.email.trim()) {
      setStatus({ type: "error", message: "Please enter your work email address." });
      return;
    }

    if (!form.message.trim()) {
      setStatus({ type: "error", message: "Please tell us about your project." });
      return;
    }

    const token = recaptchaToken || recaptchaRef.current?.getValue() || "";
    if (!token) {
      setStatus({ type: "error", message: "Please complete the captcha." });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/public/service-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          message: form.message.trim(),
          serviceSlug,
          hireSubject,
          serviceName,
          recaptchaToken: token,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        recaptchaRef.current?.reset();
        setStatus({ type: "error", message: data.error || "Failed to submit. Please try again." });
        return;
      }

      setForm({ name: "", email: "", phone: "", message: "" });
      recaptchaRef.current?.reset();
      setStatus({
        type: "success",
        message: successMessage,
      });
    } catch {
      recaptchaRef.current?.reset();
      setStatus({ type: "error", message: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ServiceSection id={id} bg={bg} className="scroll-mt-24">
      <div className="grid w-full grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
        <div className="lg:col-span-7">
          <ServiceSectionHeader
            id="service-inquiry-heading"
            eyebrow={eyebrow}
            title={title}
            description={
              description ??
              (serviceName
                ? `Tell us what you need for ${serviceName.toLowerCase()}. We'll review your requirements and respond with clear next steps.`
                : "Tell us what you need. We'll review your requirements and respond with clear next steps.")
            }
            className="mb-8 lg:mb-10"
          />

          <ContactInfoItems className="space-y-5" />
        </div>

        <div className={`${SERVICE_CARD} lg:col-span-5`}>
          <h3 className="mb-6 text-xl font-semibold text-slate-900 lg:mb-8 lg:text-2xl">
            Send us a message
          </h3>

          <form className="space-y-6 lg:space-y-8" onSubmit={handleSubmit}>
            <div>
              <input
                id="service-inquiry-name"
                type="text"
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Your name"
                required
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
              <div>
                <input
                  id="service-inquiry-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="Work email address*"
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <input
                  id="service-inquiry-phone"
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  inputMode="tel"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="Phone number"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <textarea
                id="service-inquiry-message"
                value={form.message}
                onChange={(e) => updateField("message", e.target.value)}
                placeholder={messagePlaceholder}
                rows={4}
                required
                className={`${inputClass} resize-none`}
              />
            </div>

            <RecaptchaV2 ref={recaptchaRef} onChange={setRecaptchaToken} />

            {status.message ? (
              <p
                className={`text-sm font-medium ${
                  status.type === "success" ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {status.message}
              </p>
            ) : null}

            <div className="pt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className="nexuron-btn-solid inline-flex items-center gap-2 rounded-md px-8 py-3.5 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Send size={18} />
                {isSubmitting ? "Submitting..." : submitLabel}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ServiceSection>
  );
}
