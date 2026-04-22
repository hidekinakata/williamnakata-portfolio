"use client";

import { useTranslations } from "next-intl";
import { LucideArrowRight } from "lucide-react";
import SectionLabel from "../shared/SectionLabel";
import DecorativeLine from "../shared/DecorativeLine";

const stats = [
  { key: "years", valueKey: "yearsValue", labelKey: "yearsLabel" },
  { key: "projects", valueKey: "projectsValue", labelKey: "projectsLabel" },
  { key: "models", valueKey: "modelsValue", labelKey: "modelsLabel" },
];

export default function AboutSection() {
  const t = useTranslations("About");

  return (
    <section className="w-full px-6 sm:px-8 lg:px-14 xl:px-20 3xl:px-28 4xl:px-40 py-16 lg:py-24 3xl:py-32">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 3xl:gap-32">
        <div className="flex flex-col gap-6 3xl:gap-8 lg:w-[38%] shrink-0">
          <SectionLabel>{t("label")}</SectionLabel>
          <h2 className="font-sans-decorated text-5xl sm:text-6xl lg:text-7xl 3xl:text-8xl leading-tight font-black tracking-tight text-white/92 uppercase">
            {t("heading")}
          </h2>
          <DecorativeLine />
          <p className="font-serif text-sm 3xl:text-base leading-relaxed text-neutral-500 italic max-w-md">
            {t("subtitle")}
          </p>
        </div>

        <div className="flex flex-col gap-7 lg:gap-8 3xl:gap-10 grow">
          <p className="text-sm lg:text-base 3xl:text-lg leading-relaxed text-neutral-400 font-sans">
            {t("paragraph1")}
          </p>
          <p className="text-sm lg:text-base 3xl:text-lg leading-relaxed text-neutral-400 font-sans">
            {t("paragraph2")}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 3xl:gap-10 mt-2">
            {stats.map((stat) => (
              <div key={stat.key} className="flex flex-col gap-1">
                <span className="font-sans-decorated text-3xl lg:text-4xl 3xl:text-5xl leading-none font-black text-royal-500">
                  {t(stat.valueKey)}
                </span>
                <span className="font-mono text-3xs 3xl:text-2xs leading-3 tracking-[0.14em] uppercase font-medium text-neutral-500">
                  {t(stat.labelKey)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2">
            <button className="flex cursor-pointer items-center justify-center gap-2.5 bg-royal-500 px-7 py-3.5 3xl:px-8 3xl:py-4 transition-all hover:bg-royal-500/90">
              <span className="font-sans text-xs font-bold tracking-widest uppercase text-white">
                {t("ctaPrimary")}
              </span>
              <LucideArrowRight className="w-4 h-4 3xl:w-5 3xl:h-5" />
            </button>
            <button className="flex cursor-pointer items-center justify-center gap-2 border border-royal-500/27 px-7 py-3.5 3xl:px-8 3xl:py-4 backdrop-blur-xs transition-colors hover:border-royal-500/50">
              <span className="font-sans text-xs font-medium tracking-widest uppercase text-neutral-400">
                {t("ctaSecondary")}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
