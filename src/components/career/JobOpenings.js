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
