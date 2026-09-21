"use client";

import { useEffect, useRef, useState } from "react";
import { COMPANY_STATS } from "@/lib/companyStats";

const counterItems = [
  { value: COMPANY_STATS.clientSatisfactionValue, suffix: "%", label: "Client Satisfaction" },
  { value: COMPANY_STATS.clientsValue, suffix: "+", label: "Happy Clients" },
];

const listItems = [
  "Organizational structure model",
  "Satisfaction guarantee",
  "Ontime delivery",
];

const progressItems = [
  { title: "Client Satisfaction", value: COMPANY_STATS.clientSatisfactionValue },
  { title: "IT Management", value: 90 },
];

export default function ExpertiseCommitment() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [counters, setCounters] = useState(counterItems.map(() => 0));
  const [progressValues, setProgressValues] = useState(progressItems.map(() => 0));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.25 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;

    const counterTimer = setInterval(() => {
      setCounters((prev) =>
        prev.map((v, i) => {
          const target = counterItems[i].value;
          const next = v + Math.max(1, Math.ceil(target / 40));
          return next >= target ? target : next;
        })
      );
    }, 35);

    const progressTimer = setInterval(() => {
      setProgressValues((prev) =>
        prev.map((v, i) => {
          const target = progressItems[i].value;
          const next = v + 2;
          return next >= target ? target : next;
        })
      );
    }, 22);

    return () => {
      clearInterval(counterTimer);
      clearInterval(progressTimer);
    };
  }, [visible]);

  return (
    <section ref={sectionRef} className=" py-20 lg:py-28">
      <div className="mx-auto max-w-[1340px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div
            className={`rounded-[10px] bg-[#1f3e77] bg-cover bg-center p-10 text-white transition-all duration-700 ${
              visible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
            }`}
            style={{
              backgroundImage:
                "url('https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/new_unique_home/1_1.jpg')",
            }}
          >
            {counterItems.map((item, idx) => (
              <div
                key={item.label}
                className={`${idx === 0 ? "" : "mt-8 border-t border-white/30 pt-8"}`}
              >
                <div className="mb-3 flex items-end text-[64px] font-semibold leading-none">
                  <span>{counters[idx]}</span>
                  <span className="ml-1 text-4xl">{item.suffix}</span>
                </div>
                <span className="block text-lg font-semibold">{item.label}</span>
              </div>
            ))}
          </div>

          <div
            className={`transition-all duration-700 ${
              visible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
            }`}
          >
            <p className="mb-5 inline-block rounded bg-[#d8e7ef] px-4 py-2 text-xl font-medium text-[#111827]">
              Our expertise
            </p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight text-[#111827] md:text-5xl">
              Our commitment <br /> is client satisfaction
            </h2>

            <div className="mt-10 grid gap-10 md:grid-cols-[1fr_1.3fr]">
              <ul className="list-none p-0">
                {listItems.map((item, idx) => (
                  <li
                    key={item}
                    className={`relative mt-4 pl-7 text-lg font-semibold text-[#111827] ${idx === 0 ? "mt-0" : ""}`}
                  >
                    <span className="absolute left-0 top-[7px] h-4 w-4 rounded-full bg-[#2667ff]" />
                    {item}
                  </li>
                ))}
              </ul>

              <div>
                {progressItems.map((item, idx) => (
                  <div key={item.title} className={`${idx === 0 ? "" : "mt-8"}`}>
                    <h3 className="mb-3 text-lg font-semibold text-[#111827]">{item.title}</h3>
                    <div className="h-[5px] overflow-visible rounded-full bg-[#d7deea]">
                      <div
                        className="relative h-[5px] rounded-full bg-[#2667ff] transition-all duration-500"
                        style={{ width: `${progressValues[idx]}%` }}
                      >
                        <span className="absolute -right-4 -top-10 bg-[#111827] px-2 py-0.5 text-sm font-semibold text-white">
                          {progressValues[idx]}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

