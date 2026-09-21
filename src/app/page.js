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

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full">
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
