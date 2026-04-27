"use client";

import { useTranslations } from "next-intl";
import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";
import SectionDivider from "@/components/shared/SectionDivider";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

type ProjectAccent = {
  card: string;
  number: string;
  iconBox: string;
  title: string;
  badge: string;
  tag: string;
  divider: string;
};

const accents: ProjectAccent[] = [
  {
    card: "bg-royal-500/4 border-t border-t-royal-500/40 border-l-2 border-l-royal-500 border-b border-b-royal-500/13 border-r border-r-royal-500/13",
    number: "text-royal-500/35",
    iconBox: "bg-royal-500/8 border border-royal-500/50",
    title: "text-royal-400",
    badge: "bg-royal-500/5 border border-royal-500/20 text-royal-500/35",
    tag: "border-royal-400/25 text-royal-400",
    divider: "bg-royal-500/15",
  },
  {
    card: "bg-neural-400/4 border-t border-t-neural-400/40 border-l-2 border-l-neural-400/80 border-b border-b-neural-400/13 border-r border-r-neural-400/13",
    number: "text-neural-400/35",
    iconBox: "bg-neural-400/8 border border-neural-400/50",
    title: "text-neural-400/80",
    badge: "bg-neural-400/5 border border-neural-400/20 text-neural-400/35",
    tag: "border-neural-400/25 text-neural-400/80",
    divider: "bg-neural-400/15",
  },
  {
    card: "bg-white/3 border-t border-t-white/25 border-l-2 border-l-white/60 border-b border-b-white/10 border-r border-r-white/10",
    number: "text-white/20",
    iconBox: "bg-white/4 border border-white/25",
    title: "text-white/80",
    badge: "bg-white/3 border border-white/13 text-white/20",
    tag: "border-white/10 text-neutral-600",
    divider: "bg-white/8",
  },
  {
    card: "bg-royal-500/8 border-t border-t-royal-500/50 border-l-2 border-l-royal-500 border-b border-b-royal-500/20 border-r border-r-royal-500/20",
    number: "text-royal-500/35",
    iconBox: "bg-royal-500/8 border border-royal-500/50",
    title: "text-royal-400",
    badge: "bg-royal-500/8 border border-royal-500/28 text-royal-500/35",
    tag: "border-royal-400/25 text-royal-400",
    divider: "bg-royal-500/15",
  },
];

type ProjectData = {
  id: string;
  type: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  github: string;
  tags: string[];
};

type Props = {
  projects: ProjectData[];
};

export default function ProjectsSection({ projects }: Props) {
  const t = useTranslations("Projects");

  return (
    <Section id="projects">
      <SectionDivider className="3xl:mb-32 mb-16 lg:mb-24" />
      <Section.ColumnLayout>
        <Section.LeftColumn>
          <SectionTitle
            label={t("label")}
            title1={t("heading1")}
            title2={t("heading2")}
            subtitle={t("subtitle")}
          />
        </Section.LeftColumn>

        <Section.RightColumn className="z-10 gap-4">
          {projects.map((project, index) => {
            const a = accents[index % accents.length];
            const num = String(index + 1).padStart(2, "0");
            return (
              <div
                key={project.id}
                className={`relative flex flex-col gap-4 px-5 py-5 backdrop-blur-sm sm:flex-row sm:gap-6 sm:px-7 sm:py-6 ${a.card}`}
              >
                <div className="flex shrink-0 flex-row items-center gap-2 sm:flex-col sm:gap-4">
                  <span
                    className={`text-3xs font-mono leading-3 font-medium tracking-[0.22em] uppercase ${a.number}`}
                  >
                    {num}
                  </span>
                  <span
                    className={`flex h-9 w-9 items-center justify-center ${a.iconBox}`}
                  >
                    <span className={`text-sm ${a.title}`}>◆</span>
                  </span>
                </div>

                <span
                  className={`hidden w-px self-stretch sm:block ${a.divider}`}
                />

                <div className="relative flex min-w-0 grow flex-col gap-2.5">
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`font-sans-decorated text-sm leading-5 font-bold tracking-[0.02em] uppercase sm:text-base ${a.title}`}
                    >
                      {project.title}
                    </span>
                    <div className="flex items-center gap-3">
                      {project.github && (
                        <Link
                          href={project.github}
                          target="_blank"
                          className={`transition-all hover:scale-110 active:scale-95 ${a.title} opacity-60 hover:opacity-100`}
                        >
                          <i className="devicon-github-original text-xl"></i>
                        </Link>
                      )}
                      {project.link && (
                        <Link
                          href={project.link}
                          target="_blank"
                          className={`transition-all hover:scale-110 active:scale-95 ${a.title} opacity-60 hover:opacity-100`}
                        >
                          <ExternalLink className="h-5 w-5" />
                        </Link>
                      )}
                    </div>
                  </div>

                  <p className="font-serif text-xs leading-relaxed text-neutral-500 italic">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-3xs inline-block border border-solid px-2 py-0.5 font-mono leading-[2.5] font-medium tracking-[0.14em] uppercase ${a.tag}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </Section.RightColumn>
      </Section.ColumnLayout>
    </Section>
  );
}
