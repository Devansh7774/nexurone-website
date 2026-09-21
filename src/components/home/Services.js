"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Web & App Development",
    description:
      "Scalable websites, e-commerce platforms, and cross platform mobile apps built with MEAN/MERN, Laravel, .NET, Flutter, and React Native. Designed for speed, security, and seamless user experiences.",
    icon: "https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/new_unique_home/16.png",
    tags: ["Web", "Mobile"],
    href: "/services/mean-mern",
  },
  {
    title: "Software, Cloud & Automation",
    description:
      "Custom ERP/CRM systems, enterprise software, and cloud solutions powered by DevOps, AI, and IoT. We help automate workflows, improve security, and scale with confidence.",
    icon: "https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/new_unique_home/17.png",
    tags: ["Software", "Cloud"],
    href: "/services/devops",
  },
  {
    title: "UI/UX & Product Design",
    description:
      "User-centered interface design, wireframes, prototypes, and visual design for web and mobile products. We create intuitive experiences that improve usability, engagement, and conversion.",
    icon: "https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/new_unique_home/18.png",
    tags: ["UI/UX", "Design"],
    href: "/services/ui-ux",
  },
];

export default function Services() {
  const [isVisible, setIsVisible] = useState(false);
  const [headingVisible, setHeadingVisible] = useState(false);

  useEffect(() => {
    const section = document.getElementById("services-style-one");
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHeadingVisible(true);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const headingWords = useMemo(
    () => "Empower your business with our services.".split(" "),
    []
  );

  return (
    <section
      id="services-style-one"
      className="relative overflow-hidden bg-[#D8E7EF] bg-cover py-20 lg:py-28"
      style={{
        backgroundImage:
          "url('https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/new_unique_home/24.png')",
      }}
    >
      <div className="mx-auto max-w-[1340px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 w-full text-center">
          <p className="mb-5 inline-block rounded bg-[#EEF3FF] px-4 py-1.5 text-xl font-medium uppercase text-[#111827]">
            Our Services
          </p>
          <h2 className="mx-auto mt-5 max-w-4xl text-[clamp(1.25rem,4.5vw,2.5rem)] font-semibold leading-snug text-[#111827]">
            {headingWords.map((word, idx) => (
              <span
                key={`${word}-${idx}`}
                className={`mr-[0.28em] inline-block transition-all duration-500 ${
                  headingVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: `${idx * 35}ms` }}
              >
                {word}
              </span>
            ))}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((item, index) => {
            return (
              <article
                key={item.title}
                className={`group flex h-full flex-col rounded-[10px] border-2 border-transparent bg-white px-6 py-10 shadow-[0_15px_60px_-10px_rgba(109,117,143,0.33)] transition-all duration-300 hover:border-[#2667ff] sm:px-8 sm:py-12 lg:px-[45px] lg:py-[60px] ${
                  isVisible
                    ? "translate-x-0 opacity-100"
                    : "translate-x-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div>
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="mb-16 h-20 w-auto"
                  />
                  <h3 className="mb-5 text-2xl font-semibold leading-snug text-[#111827]">
                    <Link href={item.href} className="transition-colors hover:text-[#2667ff]">
                      {item.title}
                    </Link>
                  </h3>
                  <p className="text-base leading-7 text-[#4b5563]">{item.description}</p>
                </div>

                <div className="mt-8 flex items-center justify-between gap-4">
                  <Link
                    href={item.href}
                    className="inline-flex h-[55px] w-[55px] min-w-[55px] -rotate-45 items-center justify-center rounded-full bg-[#111827] text-white transition-all duration-300 group-hover:rotate-0 group-hover:bg-[#0072ff]"
                    aria-label={`View ${item.title} service details`}
                  >
                    <span className="text-2xl leading-none">→</span>
                  </Link>
                  <div className="flex flex-wrap justify-end gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={`${item.title}-${tag}`}
                        className="inline-block rounded-[3px] border border-[#b8cfff] px-[14px] py-[2px] text-sm font-medium text-[#111827]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

