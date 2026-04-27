"use client";

import { useEffect, useState } from "react";
import { ArticleSection as ArticleSectionType } from "@/lib/articles";

interface TableOfContentsProps {
  sections: ArticleSectionType[];
  label: string;
}

export default function TableOfContents({ sections, label }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="border-l-2 border-royal-500 pl-5">
      <h3 className="mb-4 font-mono text-2xs tracking-[0.12em] text-royal-500 uppercase">
        {label}
      </h3>
      <ul className="flex flex-col gap-2.5">
        {sections.map((section) => {
          const isActive = activeId === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-2 transition-colors"
              >
                <div
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${
                    isActive ? "bg-royal-500" : "bg-royal-500/30"
                  }`}
                />
                <span
                  className={`font-sans text-xs transition-colors ${
                    isActive ? "font-semibold text-white" : "text-neutral-500"
                  }`}
                >
                  {section.title}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
