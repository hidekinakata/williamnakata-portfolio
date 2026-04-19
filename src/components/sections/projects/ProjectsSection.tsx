"use client";

import { useTranslations } from "next-intl";
import SectionLabel from "../shared/SectionLabel";
import DecorativeLine from "../shared/DecorativeLine";
import SectionDivider from "../shared/SectionDivider";

type ProjectAccent = {
  card: string;
  number: string;
  iconBox: string;
  title: string;
  badge: string;
  tag: string;
  divider: string;
};

const accents: Record<string, ProjectAccent> = {
  purple: {
    card: "bg-royal-500/4 border-t border-t-royal-500/40 border-l-2 border-l-royal-500 border-b border-b-royal-500/13 border-r border-r-royal-500/13",
    number: "text-royal-500/35",
    iconBox: "bg-royal-500/8 border border-royal-500/50",
    title: "text-royal-400",
    badge: "bg-royal-500/5 border border-royal-500/20 text-royal-500/35",
    tag: "border-royal-400/25 text-royal-400",
    divider: "bg-royal-500/15",
  },
  purpleStrong: {
    card: "bg-royal-500/8 border-t border-t-royal-500/50 border-l-2 border-l-royal-500 border-b border-b-royal-500/20 border-r border-r-royal-500/20",
    number: "text-royal-500/35",
    iconBox: "bg-royal-500/8 border border-royal-500/50",
    title: "text-royal-400",
    badge: "bg-royal-500/8 border border-royal-500/28 text-royal-500/35",
    tag: "border-royal-400/25 text-royal-400",
    divider: "bg-royal-500/15",
  },
  cyan: {
    card: "bg-neural-400/4 border-t border-t-neural-400/40 border-l-2 border-l-neural-400/80 border-b border-b-neural-400/13 border-r border-r-neural-400/13",
    number: "text-neural-400/35",
    iconBox: "bg-neural-400/8 border border-neural-400/50",
    title: "text-neural-400/80",
    badge: "bg-neural-400/5 border border-neural-400/20 text-neural-400/35",
    tag: "border-neural-400/25 text-neural-400/80",
    divider: "bg-neural-400/15",
  },
  white: {
    card: "bg-white/3 border-t border-t-white/25 border-l-2 border-l-white/60 border-b border-b-white/10 border-r border-r-white/10",
    number: "text-white/20",
    iconBox: "bg-white/4 border border-white/25",
    title: "text-white/80",
    badge: "bg-white/3 border border-white/13 text-white/20",
    tag: "border-white/10 text-neutral-600",
    divider: "bg-white/8",
  },
};

type Project = {
  numKey: string;
  titleKey: string;
  subtitleKey: string;
  badgeKey: string;
  descKey: string;
  tagsKey: string;
  accent: string;
};

const projects: Project[] = [
  { numKey: "p1Num", titleKey: "p1Title", subtitleKey: "p1Sub", badgeKey: "p1Badge", descKey: "p1Desc", tagsKey: "p1Tags", accent: "purple" },
  { numKey: "p2Num", titleKey: "p2Title", subtitleKey: "p2Sub", badgeKey: "p2Badge", descKey: "p2Desc", tagsKey: "p2Tags", accent: "cyan" },
  { numKey: "p3Num", titleKey: "p3Title", subtitleKey: "p3Sub", badgeKey: "p3Badge", descKey: "p3Desc", tagsKey: "p3Tags", accent: "white" },
  { numKey: "p4Num", titleKey: "p4Title", subtitleKey: "p4Sub", badgeKey: "p4Badge", descKey: "p4Desc", tagsKey: "p4Tags", accent: "purpleStrong" },
];

const filters = [
  { key: "filterAll", active: true },
  { key: "filterAI", active: false },
  { key: "filterBackend", active: false },
  { key: "filterAutomation", active: false },
];

export default function ProjectsSection() {
  const t = useTranslations("Projects");

  return (
    <section className="w-full px-6 sm:px-8 lg:px-14 xl:px-20 3xl:px-28 4xl:px-40 py-16 lg:py-24 3xl:py-32">
      <SectionDivider className="mb-16 lg:mb-24 3xl:mb-32" />
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 3xl:gap-32">
        <div className="flex flex-col gap-6 3xl:gap-8 lg:w-[35%] shrink-0">
          <SectionLabel>{t("label")}</SectionLabel>
          <h2 className="font-sans-decorated text-4xl sm:text-6xl lg:text-7xl 3xl:text-8xl leading-tight font-black tracking-tight text-white/92 uppercase">
            {t("heading1")}
          </h2>
          <h2 className="font-sans-decorated text-4xl sm:text-6xl lg:text-8xl 3xl:text-9xl leading-none font-black tracking-tight text-royal-500 uppercase -mt-2">
            {t("heading2")}
          </h2>
          <DecorativeLine />
          <p className="font-serif text-sm leading-relaxed text-neutral-500 italic max-w-sm">
            {t("subtitle")}
          </p>

          <div className="flex flex-wrap gap-2 mt-2">
            {filters.map((f) => (
              <button
                key={f.key}
                className={`flex items-center gap-1.5 rounded-full py-1.5 px-3.5 border border-solid font-mono text-3xs leading-3 tracking-[0.16em] uppercase font-medium transition-colors ${
                  f.active
                    ? "bg-royal-500/8 border-royal-500/50 text-royal-400"
                    : "border-white/8 text-neutral-700 hover:border-white/15 hover:text-neutral-500"
                }`}
              >
                {f.active && <span className="h-1.25 w-1.25 rounded-full bg-royal-500" />}
                {t(f.key)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 grow min-w-0 z-10">
          {projects.map((project) => {
            const a = accents[project.accent];
            return (
              <div
                key={project.numKey}
                className={`flex flex-col sm:flex-row backdrop-blur-sm gap-4 sm:gap-6 py-5 sm:py-6 px-5 sm:px-7 ${a.card}`}
              >
                <div className="flex flex-row sm:flex-col items-center gap-2 sm:gap-4 shrink-0">
                  <span className={`font-mono text-3xs leading-3 tracking-[0.22em] uppercase font-medium ${a.number}`}>
                    {t(project.numKey)}
                  </span>
                  <span className={`h-9 w-9 flex items-center justify-center ${a.iconBox}`}>
                    <span className={`text-sm ${a.title}`}>◆</span>
                  </span>
                </div>

                <span className={`hidden sm:block w-px self-stretch ${a.divider}`} />

                <div className="flex flex-col gap-2.5 grow min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <span className={`font-sans-decorated text-sm sm:text-base leading-5 tracking-[0.02em] uppercase font-bold ${a.title}`}>
                      {t(project.titleKey)}
                    </span>
                    <span className="font-mono text-3xs leading-3 tracking-[0.18em] uppercase text-neutral-700">
                      {t(project.subtitleKey)}
                    </span>
                  </div>
                  <span className={`self-start py-0.5 px-2.5 font-mono text-3xs leading-[2.5] tracking-[0.12em] ${a.badge}`}>
                    {t(project.badgeKey)}
                  </span>
                  <p className="font-serif text-xs leading-relaxed italic text-neutral-500">
                    {t(project.descKey)}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {(JSON.parse(t(project.tagsKey)) as string[]).map((tag: string) => (
                      <span
                        key={tag}
                        className={`inline-block py-0.5 px-2 border border-solid font-mono text-3xs leading-[2.5] tracking-[0.14em] uppercase font-medium ${a.tag}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
