import dynamic from "next/dynamic";
import Hero from "@/components/home/Hero";
import AboutUs from "@/components/home/AboutUs";
import Features from "@/components/home/Features";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import { auditPageMetadata } from "@/lib/auditMetadata";

const Services = dynamic(() => import("@/components/home/Services"));
const ExpertiseCommitment = dynamic(() => import("@/components/home/ExpertiseCommitment"));
const CaseStudies = dynamic(() => import("@/components/home/CaseStudies"));
const Testimonials = dynamic(() => import("@/components/home/Testimonials"));
const BlogInsights = dynamic(() => import("@/components/home/BlogInsights"));

export const metadata = auditPageMetadata("/");

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Nexuron Technologies",
  image: "https://nexurontechnologies.com/logo-dark-t-e1756917561911.png",
  "@id": "",
  url: "https://nexurontechnologies.com",
  telephone: "+91-75-67576896",
  priceRange: "$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "F-70-71, Hanumant Plaza, nr. Vadvala Hanumandada Temple, Balapir",
    addressLocality: "Kadi",
    postalCode: "384440",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.facebook.com/nexuron.tech",
    "https://www.instagram.com/nexuron.technologies/",
    "https://ca.linkedin.com/company/nexuron-technologies",
    "https://nexurontechnologies.com",
  ],
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <Hero />
      <AboutUs />
      <Features />
      <WhyChooseUs />
      <Services />
      <ExpertiseCommitment />
      <CaseStudies />
      <Testimonials />
      <BlogInsights />
    </div>
  );
}
