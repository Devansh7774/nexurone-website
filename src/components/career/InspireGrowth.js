import Image from "next/image";

export default function InspireGrowth() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          {/* Left Side - Image */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            <Image
              src="/career-illustration.jpg"
              alt="Build a Future That Inspires Growth"
              width={800}
              height={600}
              className="w-full max-w-[600px] h-auto object-contain"
              priority
            />
          </div>

          {/* Right Side - Content */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-[32px] md:text-[40px] lg:text-[46px] font-bold text-[#00102A] leading-[1.2] mb-8">
              Build a Future That<br className="hidden md:block" />
              Inspires Growth
            </h2>

            <div className="space-y-6 text-[#505a68] text-[16px] leading-[1.8]">
              <p>
                At <span className="font-bold text-[#00102A]">Nexuron Technologies</span>, we believe great teams build great
                innovations. We&apos;re not just offering jobs, we&apos;re creating opportunities
                for passionate individuals to grow, learn, and make an impact in the
                digital world.
              </p>

              <p>
                Our work culture is built on <span className="font-bold text-[#00102A]">collaboration, creativity, and continuous
                learning</span>. Whether you&apos;re a developer, designer, or strategist, we
                empower every team member to explore their potential and bring
                bold ideas to life.
              </p>

              <p>
                Join a company where <span className="font-bold text-[#00102A]">technology meets purpose</span>. With projects
                spanning SaaS, web, mobile, and cloud solutions, you&apos;ll work with
                modern tools, skilled mentors, and clients who challenge you to think
                bigger every day.
              </p>

              <p>
                Together, we&apos;re shaping the future one innovation at a time.
              </p>
            </div>
            
            {/* Bottom border line matching the screenshot (only under the text) */}
            <div className="mt-10 h-px w-full bg-gray-200"></div>
          </div>

        </div>
      </div>
    </section>
  );
}
