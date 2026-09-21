import ContactUs from "@/components/contact/ContactUs";
import ContactMap from "@/components/contact/ContactMap";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Contact Nexuron Technologies for software development, mobile apps, cloud, and AI solutions. Call +1 (437) 366-6896 or email info@nexurontechnologies.com.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <ContactUs />
      <ContactMap />
    </>
  );
}
