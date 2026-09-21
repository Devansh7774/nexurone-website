import React from 'react';
import Image from 'next/image';
import { COMPANY_STATS } from '@/lib/companyStats';
import TeamMemberEmailButton from '@/components/about/TeamMemberEmailButton';

const TEAM_CARD_BG =
  'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/team/imagebg.webp';

const teamMembers = [
  {
    name: 'Pritesh',
    role: 'CEO & FOUNDER',
    image: 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/nexuron-assets/Gemini_Generated_Image_j8aemyj8aemyj8ae-1-Photoroom-1.png',
    email: 'info@nexurontechnologies.com',
  },
  {
    name: 'Umesh',
    role: 'CTO',
    image: 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/nexuron-assets/umesh-kaka.png',
    email: 'Umesh@nexurontechnologies.com',
  },
  {
    name: 'Devansh',
    role: 'VP of Technology',
    image: 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/Devansh-patel.png',
    email: 'Devansh@nexurontechnologies.com',
  },
  {
    name: 'Het',
    role: 'Full Stack DEVELOPER',
    image: 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/nexuron-assets/WhatsApp-Image-2025-09-19-at-10.36.35_a4108010.jpg',
  },
   {
    name: 'Kandarp',
    role: 'Full Stack Developer',
    image: 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/nexuron-assets/kandarp.png',
  },
  {
    name: 'Yash',
    role: 'Mobile APP Developer',
    image: 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/nexuron-assets/WhatsApp-Image-2025-09-19-at-11.00.12_6c5ec99d.jpg',
  },
  // {
  //   name: 'Jaivik Patel',
  //   role: 'Devops Engineer',
  //   image: 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/nexuron-assets/v4.jpg',
  // },
  {
    name: 'Tirth',
    role: 'Business Development Executive',
    image: 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/team/tirth-nexuron.png',
  },
  {
    name: 'Shubh',
    role: 'TEAM LEAD',
    image: 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/team/subh-nexuron.png',
  },
  {
    name: 'Jaimin',
    role: 'TEAM LEAD',
    image: 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/team/jaimin-nexuron.png',
  },
  {
    name: 'Prasoon',
    role: 'AI / Agentic Engineer',
    image: 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/team/prasoon-nexuron.png',
  },
  {
    name: 'Arsh',
   role: 'Backend Developer',
    image: 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/team/ars-nexuron.png',
  },
  {
    name: 'Prayesh',
    role: 'Frontend Developer',
    image: 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/team/prayesh-nexuron.png',
  },
  {
    name: 'Priyanshu',
    role: 'Python Developer',
    image: 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/team/priyanshu-nexuron.png',
  },
];

export default function AboutTeam() {
  return (
    <section className="py-24 bg-[#F8F9FA] w-full">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <div className="inline-block bg-[#E2EDF8] px-4 py-2 rounded-sm mb-6">
            <span className="text-[#0F172A] font-bold text-[13px] tracking-wider uppercase">TEAM MEMBERS</span>
          </div>
          <h2 className="text-[42px] md:text-[52px] font-bold text-[#0F172A] leading-[1.1] tracking-tight max-w-[600px]">
            Meet the talented team<br/>from our company
          </h2>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="rounded-[16px] p-8 pt-12 pb-10 flex flex-col items-center relative group bg-[#d8e7ef] bg-no-repeat bg-cover bg-center"
              style={{ backgroundImage: `url('${TEAM_CARD_BG}')` }}
            >
              
              {/* Image Container */}
              <div className="relative w-[280px] h-[280px] mb-8 z-10">
                <div className="relative w-full h-full rounded-full bg-[#6B7280] flex items-center justify-center transition-all duration-300 overflow-hidden">
                  {/* Fallback silhouette if image fails/loads */}
                  <div className="absolute inset-0 flex items-end justify-center opacity-50 overflow-hidden rounded-full">
                    <div className="w-[120px] h-[140px] bg-white/20 rounded-t-full"></div>
                    <div className="absolute top-[30px] w-[80px] h-[80px] bg-white/20 rounded-full"></div>
                  </div>

                  {/* Actual Image */}
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {member.email && (
                  <TeamMemberEmailButton email={member.email} name={member.name} />
                )}
              </div>

              {/* Text Content */}
              <div className="text-center z-10 w-full mt-2">
                <h3 className="text-[26px] font-bold text-[#0F172A] mb-2">{member.name}</h3>
                <p className="text-[#2563EB] text-[14px] font-bold tracking-wide uppercase">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-2">
          {[
            { number: COMPANY_STATS.clients, label: 'CLIENTS AROUND THE WORLD' },
            { number: '20+', label: 'PROJECTS DELIVERED\nSUCCESSFULLY' },
            { number: String(teamMembers.length), label: 'TEAM MEMBERS' },
            { number: '5+', label: 'INDUSTRIES SERVED (IT,\nHEALTHCARE, RETAIL, FINANCE,\nEDUCATION)' }
          ].map((stat, idx) => (
            <div 
              key={idx} 
              className="flex flex-col items-center justify-start text-center px-4 pt-12 pb-8 bg-[#FAFAFA] rounded-t-[24px] border border-gray-200 border-b-0"
            >
              <h3 className="text-[56px] font-bold text-[#0F172A] leading-none mb-4">{stat.number}</h3>
              <p className="text-[12px] font-semibold text-gray-500 uppercase tracking-widest whitespace-pre-line leading-[1.8]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
