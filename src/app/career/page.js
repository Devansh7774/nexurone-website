import InspireGrowth from "@/components/career/InspireGrowth";
import JobOpenings from "@/components/career/JobOpenings";
import CareerForm from "@/components/career/CareerForm";

export const metadata = {
  title: "Career - Nexuron Technologies",
  description: "Join Nexuron Technologies and build a future that inspires growth.",
};

export default function CareerPage() {
  return (
    <div className="bg-white">
      <InspireGrowth />
      <JobOpenings />
      <CareerForm />
    </div>
  );
}
