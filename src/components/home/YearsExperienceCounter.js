"use client";

import { useEffect, useRef, useState } from "react";
import { COMPANY_STATS } from "@/lib/companyStats";

export default function YearsExperienceCounter() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);
  const target = COMPANY_STATS.yearsExperienceValue;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || count >= target) return;

    const timer = setInterval(() => {
      setCount((prev) => Math.min(prev + 1, target));
    }, 140);

    return () => clearInterval(timer);
  }, [visible, count, target]);

  return (
    <div
      ref={ref}
      className={`flex items-start transition-all duration-700 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
    >
      <span className="text-9xl font-bold leading-none tracking-tight text-[#3B82F6] tabular-nums">
        {count}
      </span>
      <span
        className={`text-5xl font-bold leading-none text-[#3B82F6] transition-all duration-500 ${
          count >= target ? "scale-100 opacity-100" : "scale-75 opacity-40"
        }`}
      >
        +
      </span>
    </div>
  );
}
