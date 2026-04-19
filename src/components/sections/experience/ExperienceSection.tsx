"use client";

import { useTranslations } from "next-intl";
import SectionLabel from "../shared/SectionLabel";
import DecorativeLine from "../shared/DecorativeLine";
import SectionDivider from "../shared/SectionDivider";

type Role = {
  titleKey: string;
  dateKey: string;
  descKey: string;
  tagsKey: string;
  active?: boolean;
  mid?: boolean;
};

type Company = {
  nameKey: string;
  locationKey: string;
  dateKey: string;
  roles: Role[];
  active?: boolean;
};

const companies: Company[] = [
  {
    nameKey: "c1Name",
    locationKey: "c1Location",
    dateKey: "c1Date",
    active: true,
    roles: [
      { titleKey: "c1r1Title", dateKey: "c1r1Date", descKey: "c1r1Desc", tagsKey: "c1r1Tags", active: true },
      { titleKey: "c1r2Title", dateKey: "c1r2Date", descKey: "c1r2Desc", tagsKey: "c1r2Tags", mid: true },
      { titleKey: "c1r3Title", dateKey: "c1r3Date", descKey: "c1r3Desc", tagsKey: "c1r3Tags" },
    ],
  },
  {
    nameKey: "c2Name",
    locationKey: "c2Location",
    dateKey: "c2Date",
    roles: [
      { titleKey: "c2r1Title", dateKey: "c2r1Date", descKey: "c2r1Desc", tagsKey: "c2r1Tags" },
    ],
  },
];

export default function ExperienceSection() {
  const t = useTranslations("Experience");

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
        </div>

        <div className="flex flex-col gap-0 grow">
          {companies.map((company, ci) => (
            <div
              key={ci}
              className={`flex gap-4 sm:gap-7 backdrop-blur-sm ${ci < companies.length - 1 ? "pb-10 border-b border-white/6" : "pt-2"}`}
            >
              <div className="flex flex-col items-center w-6 shrink-0">
                <span
                  className={`rounded-full size-2.5 shrink-0 border-[1.5px] bg-void ${
                    company.active ? "border-royal-500" : "border-royal-500/40"
                  }`}
                />
                <span
                  className={`w-px grow ${company.active ? "bg-gradient-to-b from-royal-500/40 to-royal-500/5" : "bg-gradient-to-b from-royal-500/20 to-royal-500/3"}`}
                />
              </div>

              <div className="flex flex-col grow min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-6">
                  <div className="flex flex-col">
                    <span
                      className={`font-sans-decorated text-base sm:text-lg tracking-[0.02em] uppercase font-bold ${
                        company.active ? "text-white" : "text-neutral-500"
                      }`}
                    >
                      {t(company.nameKey)}
                    </span>
                    <span className="font-mono text-3xs leading-3 tracking-[0.18em] uppercase text-neutral-700">
                      {t(company.locationKey)}
                    </span>
                  </div>
                  <span className="font-mono text-2xs leading-3 tracking-widest text-neutral-600">
                    {t(company.dateKey)}
                  </span>
                </div>

                {company.roles.map((role, ri) => {
                  const isLast = ri === company.roles.length - 1;
                  const isActive = role.active;
                  const isMid = role.mid;
                  const dotColor = isActive
                    ? "bg-royal-500"
                    : isMid
                      ? "bg-royal-500/50"
                      : "bg-royal-500/35";
                  const titleColor = isActive
                    ? "text-white"
                    : isMid
                      ? "text-neutral-300"
                      : "text-neutral-400";
                  const descColor = isActive
                    ? "text-neutral-500"
                    : isMid
                      ? "text-neutral-600"
                      : "text-neutral-700";
                  const dateColor = isActive ? "text-royal-400" : "text-neutral-600";
                  const tagBorder = isActive
                    ? "border-royal-400/25"
                    : isMid
                      ? "border-white/10"
                      : "border-white/7";
                  const tagText = isActive
                    ? "text-royal-400"
                    : isMid
                      ? "text-neutral-600"
                      : "text-neutral-700";

                  return (
                    <div
                      key={ri}
                      className={`flex flex-col gap-2.5 ${!isLast ? "pb-6 border-b border-white/5" : ""} ${ri > 0 ? "mt-5" : ""}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`rounded-full size-1 shrink-0 ${dotColor}`} />
                          <span className={`font-sans text-sm leading-[1.125rem] tracking-[0.02em] font-bold ${titleColor}`}>
                            {t(role.titleKey)}
                          </span>
                        </div>
                        <span className={`font-mono text-2xs leading-3 tracking-[0.08em] font-medium shrink-0 ${dateColor}`}>
                          {t(role.dateKey)}
                        </span>
                      </div>
                      <p className={`font-serif text-xs leading-relaxed italic max-w-md ${descColor}`}>
                        {t(role.descKey)}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {(JSON.parse(t(role.tagsKey)) as string[]).map((tag: string) => (
                          <span
                            key={tag}
                            className={`inline-block py-0.5 px-2 border border-solid ${tagBorder} font-mono text-3xs leading-[2.5] tracking-[0.14em] uppercase font-medium ${tagText}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
