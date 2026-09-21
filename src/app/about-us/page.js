import AboutExecutives from "@/components/about/AboutExecutives";
import AboutExperience from "@/components/about/AboutExperience";
import AboutTeam from "@/components/about/AboutTeam";
import AboutTestimonials from "@/components/about/AboutTestimonials";
import { auditPageMetadata } from "@/lib/auditMetadata";

export const metadata = auditPageMetadata("/about-us");

export default function AboutUsPage() {
  return (
    <div className="bg-white">
      <AboutExecutives />
      <AboutExperience />
      <AboutTeam />
      <AboutTestimonials />
    </div>
  );
}
