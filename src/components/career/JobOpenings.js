"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Mail } from "lucide-react";

export default function JobOpenings() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const jobs = [
    {
      title: "Expert Business Development Executive (BDE)",
      experience: "2-5 Years",
      openings: "1",
      location: "Kadi, Gujarat",
      description: (
        <div className="text-[#505a68] text-[15px] leading-relaxed space-y-6">
          <div>
            <h4 className="text-[18px] font-bold text-[#00102A] mb-3">Key Responsibilities</h4>
            <p className="mb-4">
              We&apos;re looking for an experienced and result-oriented{" "}
              <span className="font-bold text-[#00102A]">Business Development Executive (BDE)</span>{" "}
              who can identify new business opportunities, build strong client relationships, and drive
              business growth for Nexuron Technologies.
            </p>
            <p className="mb-4">
              The ideal candidate should have experience in IT sales, lead generation, client
              acquisition, and international business development. You will be responsible for
              connecting with potential clients, understanding their business requirements, and
              converting opportunities into successful projects.
            </p>
            <p>
              This role is ideal for someone who has strong communication, negotiation, and
              client-handling skills and enjoys working in a fast-paced IT services environment.
            </p>
          </div>

          <div>
            <h4 className="text-[18px] font-bold text-[#00102A] mb-3">What You&apos;ll Do</h4>

            <h5 className="font-bold text-[#00102A] mb-2 italic">
              Business Development &amp; Lead Generation
            </h5>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>
                Identify and generate new business opportunities through LinkedIn, Upwork, Clutch,
                email outreach, and other platforms.
              </li>
              <li>
                Research and connect with potential international clients, startups, SMEs, and
                enterprises.
              </li>
              <li>
                Generate qualified leads for custom software development, web and mobile applications,
                SaaS products, and AI solutions.
              </li>
              <li>
                Develop and execute effective sales strategies to achieve business targets.
              </li>
            </ul>

            <h5 className="font-bold text-[#00102A] mb-2 italic">
              Client Acquisition &amp; Relationship Management
            </h5>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>
                Communicate with international clients to understand their business needs and project
                requirements.
              </li>
              <li>
                Prepare proposals, quotations, presentations, and business offers.
              </li>
              <li>
                Manage client meetings, follow-ups, negotiations, and deal closures.
              </li>
              <li>
                Build and maintain long-term relationships with existing and potential clients.
              </li>
            </ul>

            <h5 className="font-bold text-[#00102A] mb-2 italic">Sales &amp; Revenue Growth</h5>
            <ul className="list-disc pl-5 space-y-2">
              <li>Convert qualified leads into successful business opportunities.</li>
              <li>Negotiate pricing, project scope, and contract terms with clients.</li>
              <li>Maintain a healthy sales pipeline and regularly update CRM records.</li>
              <li>
                Track business development activities, conversion rates, and sales performance.
              </li>
              <li>
                Coordinate with technical and project teams to ensure smooth project handovers.
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[18px] font-bold text-[#00102A] mb-3">Skills &amp; Qualifications</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                2-5 years of experience in Business Development, IT Sales, or International Sales.
              </li>
              <li>
                Strong understanding of the IT industry and software development services.
              </li>
              <li>
                Experience in generating leads through LinkedIn, Upwork, email marketing, and other
                B2B platforms.
              </li>
              <li>Excellent verbal and written communication skills in English.</li>
              <li>
                Strong negotiation, presentation, and client relationship management skills.
              </li>
              <li>
                Ability to understand client requirements and identify suitable technical solutions.
              </li>
              <li>
                Experience in handling international clients, especially from the USA, UK, Europe,
                and other global markets.
              </li>
              <li>
                Knowledge of CRM tools, lead management, and sales pipeline management.
              </li>
              <li>
                Self-motivated, target-oriented, and capable of working independently.
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[18px] font-bold text-[#00102A] mb-3">
              Why Join Nexuron Technologies
            </h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Work with a skilled and collaborative team on international projects.</li>
              <li>Opportunity to work with global clients and businesses.</li>
              <li>
                Exposure to modern technologies, SaaS platforms, AI solutions, and enterprise
                applications.
              </li>
              <li>Supportive and growth-oriented working environment.</li>
              <li>Opportunities for career advancement and professional development.</li>
              <li>Performance-based growth opportunities.</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[18px] font-bold text-[#00102A] mb-3">How to Apply</h4>
            <p className="mb-4">
              If you have a passion for sales, business growth, and building international client
              relationships, we&apos;d love to hear from you!
            </p>
            <p className="mb-2">
              Send your updated resume, LinkedIn profile, and details about your business development
              experience to:
            </p>
            <p className="flex items-center gap-2 font-bold text-[#00102A] mt-4">
              <Mail className="w-4 h-4" /> info@nexurontechnologies.com
            </p>
            <p className="mt-3 text-[14px]">
              <span className="font-bold text-[#00102A]">Subject:</span> Application for Expert
              Business Development Executive (BDE)
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Junior React.js Developer",
      experience: "0-2 years",
      openings: "1",
      location: "Kadi, Gujarat",
      description: (
        <div className="text-[#505a68] text-[15px] leading-relaxed space-y-6">
          <div>
            <h4 className="text-[18px] font-bold text-[#00102A] mb-3">Key Responsibilities</h4>
            <p className="mb-4">
              We&apos;re looking for a passionate <span className="font-bold text-[#00102A]">Junior React.js Developer</span> eager to create high-quality, scalable, and user-friendly web applications. You&apos;ll collaborate with designers, backend developers, and project managers to bring ideas to life and deliver impactful digital solutions.
            </p>
            <p>
              This role is ideal for someone who enjoys building interactive UIs, learning new technologies, and contributing to real-world projects in a fast-paced environment.
            </p>
          </div>

          <div>
            <h4 className="text-[18px] font-bold text-[#00102A] mb-3">What You&apos;ll Do</h4>
            
            <h5 className="font-bold text-[#00102A] mb-2 italic">Frontend Development</h5>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Develop responsive and interactive web interfaces using <span className="font-bold text-[#00102A]">React.js, JavaScript (ES6+)</span>, HTML5, and CSS3.</li>
              <li>Work closely with UI/UX teams to ensure design accuracy and usability.</li>
              <li>Implement reusable components and maintain clean, modular code.</li>
            </ul>

            <h5 className="font-bold text-[#00102A] mb-2 italic">Collaboration & Maintenance</h5>
            <ul className="list-disc pl-5 space-y-2">
              <li>Collaborate with backend developers to integrate APIs and data.</li>
              <li>Debug, test, and optimize web applications for performance and scalability.</li>
              <li>Participate in code reviews and contribute to continuous improvements.</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[18px] font-bold text-[#00102A] mb-3">Skills & Qualifications</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>0-2 years of experience with <span className="font-bold text-[#00102A]">React.js</span> or similar front-end frameworks.</li>
              <li>Solid understanding of <span className="font-bold text-[#00102A]">JavaScript fundamentals</span>, DOM manipulation, and <span className="font-bold text-[#00102A]">REST APIs</span>.</li>
              <li>Familiarity with <span className="font-bold text-[#00102A]">Redux, Next.js</span>, or <span className="font-bold text-[#00102A]">TypeScript</span> is a plus.</li>
              <li>Knowledge of <span className="font-bold text-[#00102A]">Git</span>, build tools, and package managers (Webpack, Vite, NPM).</li>
              <li>Strong problem-solving skills and attention to detail.</li>
              <li>Bachelor&apos;s degree in Computer Science or equivalent field preferred.</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[18px] font-bold text-[#00102A] mb-3">Why Join Nexuron Technologies</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Work with a skilled and collaborative team on global projects.</li>
              <li>Exposure to modern SaaS and enterprise applications.</li>
              <li>Flexible working hours and supportive work environment.</li>
              <li>Opportunities for continuous learning and professional growth.</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[18px] font-bold text-[#00102A] mb-3">How to Apply</h4>
            <p className="mb-4">
              If you&apos;re excited to grow your career and contribute to meaningful digital solutions, we&apos;d love to hear from you!
            </p>
            <p className="mb-2">
              Send your <span className="font-bold text-[#00102A]">resume, portfolio/GitHub link</span>, and a short note about your experience to the email address or fill out the form below.
            </p>
            <p className="flex items-center gap-2 font-bold text-[#00102A] mt-4">
              <Mail className="w-4 h-4" /> info@nexurontechnologies.com
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Junior MERN Stack Developer",
      experience: "0-2 years",
      openings: "1",
      location: "Kadi, Gujarat",
      description: (
        <div className="text-[#505a68] text-[15px] leading-relaxed">
          <p>Details for Junior MERN Stack Developer will go here...</p>
        </div>
      )
    }
  ];

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-[28px] md:text-[32px] font-bold text-[#00102A] mb-8">
          Job Opening
        </h2>

        <div className="space-y-4">
          {jobs.map((job, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index} 
                className="border border-gray-200 rounded-sm overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-5 bg-white hover:bg-gray-50 transition-colors text-left"
                >
                  <h3 className="text-[18px] font-bold text-[#00102A]">
                    {job.title}
                  </h3>
                  <div className="text-gray-500">
                    {isOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="p-6 md:p-8 pt-0 bg-white border-t border-gray-100">
                    <div className="flex flex-wrap gap-2 text-[14px] text-[#505a68] mb-8 mt-6">
                      <span className="font-bold text-[#00102A]">Experience:</span> {job.experience} <span className="mx-1 text-gray-300">|</span>
                      <span className="font-bold text-[#00102A]">No. of Openings:</span> {job.openings} <span className="mx-1 text-gray-300">|</span>
                      <span className="font-bold text-[#00102A]">Location:</span> {job.location}
                    </div>
                    
                    {job.description}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
