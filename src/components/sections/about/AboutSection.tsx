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
    <section className="3xl:px-28 4xl:px-40 3xl:py-32 w-full px-6 py-16 sm:px-8 lg:px-14 lg:py-24 xl:px-20">
      <div className="3xl:gap-32 flex flex-col gap-10 lg:flex-row lg:gap-20">
        <div className="3xl:gap-8 flex shrink-0 flex-col gap-6 lg:w-[38%]">
          <SectionLabel>{t("label")}</SectionLabel>
          <h2 className="font-sans-decorated 3xl:text-8xl text-5xl leading-tight font-black tracking-tight text-white/92 uppercase sm:text-6xl lg:text-7xl">
            {t("heading")}
          </h2>
          <DecorativeLine />
          <p className="3xl:text-base max-w-md font-serif text-sm leading-relaxed text-neutral-500 italic">
            {t("subtitle")}
          </p>
        </div>

        <div className="3xl:gap-10 flex grow flex-col gap-7 lg:gap-8">
          <p className="3xl:text-lg font-sans text-sm leading-relaxed text-neutral-400 lg:text-base">
            {t("paragraph1")}
          </p>
          <p className="3xl:text-lg font-sans text-sm leading-relaxed text-neutral-400 lg:text-base">
            {t("paragraph2")}
          </p>

          <div className="3xl:gap-10 mt-2 grid grid-cols-2 gap-6 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.key} className="flex flex-col gap-1">
                <span className="font-sans-decorated 3xl:text-5xl text-royal-500 text-3xl leading-none font-black lg:text-4xl">
                  {t(stat.valueKey)}
                </span>
                <span className="text-3xs 3xl:text-2xs font-mono leading-3 font-medium tracking-[0.14em] text-neutral-500 uppercase">
                  {t(stat.labelKey)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-2 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <button className="bg-royal-500 3xl:px-8 3xl:py-4 hover:bg-royal-500/90 flex cursor-pointer items-center justify-center gap-2.5 px-7 py-3.5 transition-all">
              <span className="font-sans text-xs font-bold tracking-widest text-white uppercase">
                {t("ctaPrimary")}
              </span>
              <LucideArrowRight className="3xl:w-5 3xl:h-5 h-4 w-4" />
            </button>
            <button className="border-royal-500/27 3xl:px-8 3xl:py-4 hover:border-royal-500/50 flex cursor-pointer items-center justify-center gap-2 border px-7 py-3.5 backdrop-blur-xs transition-colors">
              <span className="font-sans text-xs font-medium tracking-widest text-neutral-400 uppercase">
                {t("ctaSecondary")}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
