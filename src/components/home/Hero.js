import PageHero from "@/components/ui/PageHero";

const HERO_IMAGE =
  "https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/ChatGPT%20Image%20Jun%2024%2C%202026%2C%2012_33_13%20PM.png";

export default function Hero() {
  return (
    <PageHero
      image={HERO_IMAGE}
      imageAlt="Nexuron team building AI-powered software and digital products"
      title={
        <>
          Turn Business Logic Into<br />
          AI-Powered Software
        </>
      }
      description="Nexuron delivers AI-accelerated software engineering for startups and enterprises ready to move faster. Custom web apps, mobile products, cloud infrastructure, and AI integrations, built by a team that treats your growth as the metric that matters."
      primaryCta={{ href: "/contact", label: "Start Your Project" }}
      primaryCtaAnimated
      // secondaryCta={{ href: "/about-us", label: "Learn About Us" }}
    />
  );
}
