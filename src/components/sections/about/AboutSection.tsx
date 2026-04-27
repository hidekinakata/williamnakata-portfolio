"use client";

import { useTranslations } from "next-intl";
import { LucideArrowRight } from "lucide-react";
import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";

const stats = [
  { key: "years", valueKey: "yearsValue", labelKey: "yearsLabel" },
  { key: "projects", valueKey: "projectsValue", labelKey: "projectsLabel" },
  { key: "models", valueKey: "modelsValue", labelKey: "modelsLabel" },
];

export default function AboutSection() {
  const t = useTranslations("About");

  return (
    <Section id="about">
      <Section.ColumnLayout>
        <Section.LeftColumn className="">
          <SectionTitle
            label={t("label")}
            title1={t("heading")}
            subtitle={t("subtitle")}
          />
        </Section.LeftColumn>

        <Section.RightColumn className="gap-7 lg:gap-8">
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
        </Section.RightColumn>
      </Section.ColumnLayout>
    </Section>
  );
}
