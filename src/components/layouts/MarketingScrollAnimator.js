"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function isHeroSection(el) {
  if (el.hasAttribute("data-no-scroll-reveal")) return true;
  const cls = el.className || "";
  return (
    /\bh-screen\b/.test(cls) ||
    /\bmin-h-\[700px\]\b/.test(cls) ||
    /\bmin-h-\[560px\]\b/.test(cls) ||
    /\bmin-h-\[620px\]\b/.test(cls)
  );
}

function collectTargets(container) {
  const targets = [];

  container.querySelectorAll("section").forEach((section) => {
    if (!isHeroSection(section)) targets.push(section);
  });

  const divCandidates = [
    ...container.querySelectorAll(":scope > div"),
    ...container.querySelectorAll("main > div"),
  ];

  divCandidates.forEach((div) => {
    if (isHeroSection(div) || targets.includes(div)) return;
    if (div.querySelector("section")) return;
    targets.push(div);
  });

  return targets;
}

export default function MarketingScrollAnimator({ children }) {
  const containerRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const targets = collectTargets(container);
    if (!targets.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((el) => {
        el.classList.remove("scroll-reveal");
        el.classList.add("scroll-reveal-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach((el) => {
      el.classList.add("scroll-reveal");
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
      targets.forEach((el) => {
        el.classList.remove("scroll-reveal", "scroll-reveal-visible");
      });
    };
  }, [pathname]);

  return (
    <div ref={containerRef} className="marketing-scroll-root">
      {children}
    </div>
  );
}
