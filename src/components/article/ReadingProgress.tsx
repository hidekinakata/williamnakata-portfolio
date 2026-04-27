"use client";

import { useEffect, useState } from "react";

interface ReadingProgressProps {
  sectionsCount: number;
  readTime: string;
  label: string;
  sectionLabel: string;
  ofLabel: string;
  minLeftLabel: string;
}

export default function ReadingProgress({
  sectionsCount,
  readTime,
  label,
  sectionLabel,
  ofLabel,
  minLeftLabel,
}: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(1);

  useEffect(() => {
    const sectionElements = document.querySelectorAll("section[id]");

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(scrollProgress, 100));

      let activeIndex = 0;
      sectionElements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.3) {
          activeIndex = index;
        }
      });
      setCurrentSection(Math.min(activeIndex + 1, sectionsCount));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionsCount]);

  const readTimeValue = parseInt(readTime) || 10;
  const minutesLeft = Math.max(
    1,
    Math.round((readTimeValue * (100 - progress)) / 100)
  );

  return (
    <div className="border border-royal-500/[0.13] bg-royal-500/[0.04] p-4">
      <div className="mb-3 flex items-center gap-2">
        <div className="h-1.5 w-1.5 rounded-full bg-royal-500" />
        <h3 className="font-mono text-2xs tracking-[0.12em] text-royal-500 uppercase">
          {label}
        </h3>
      </div>

      <div className="mb-3 h-1 w-full bg-white/[0.07]">
        <div
          className="h-full bg-royal-500 transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center justify-between font-mono text-2xs">
        <span className="text-royal-500/60">
          {sectionLabel} {currentSection} {ofLabel} {sectionsCount}
        </span>
        <span className="text-royal-500">~{minutesLeft} {minLeftLabel}</span>
      </div>
    </div>
  );
}
