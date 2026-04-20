"use client";

import { useTranslations } from "next-intl";

const cardData = [
  { titleKey: "s1Title", subtitleKey: "s1Sub", tagsKey: "s1Tags", color: "#4ADE80", path: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" },
  { titleKey: "s6Title", subtitleKey: "s6Sub", tagsKey: "s6Tags", color: "#FBBF24", path: "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 0v20M2 12h20" },
  { titleKey: "s5Title", subtitleKey: "s5Sub", tagsKey: "s5Tags", color: "#2DD4BF", path: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10" },
  { titleKey: "s4Title", subtitleKey: "s4Sub", tagsKey: "s4Tags", color: "#38BDF8", path: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" },
  { titleKey: "s2Title", subtitleKey: "s2Sub", tagsKey: "s2Tags", color: "#A78BFA", path: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" },
  { titleKey: "s3Title", subtitleKey: "s3Sub", tagsKey: "s3Tags", color: "#FB923C", path: "M22 12h-4l-3 9L9 3l-3 9H2" },
  { titleKey: "s7Title", subtitleKey: "s7Sub", tagsKey: "s7Tags", color: "#F87171", path: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" },
  { titleKey: "s8Title", subtitleKey: "s8Sub", tagsKey: "s8Tags", color: "#F472B6", path: "M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" },
];

const summaryColors = ["#4ADE80", "#A78BFA", "#FB923C", "#38BDF8", "#2DD4BF", "#FBBF24", "#F87171"];

export default function StackGrid() {
  const t = useTranslations("Stack");

  return (
    <div className="flex w-full flex-col gap-3 sm:gap-4 3xl:gap-5">
      {/* Header label */}
      <div className="flex items-center gap-2">
        <span className="h-px w-6 bg-royal-500 shrink-0" />
        <span className="h-1 w-1 shrink-0 rotate-45 bg-royal-500" />
        <span className="font-mono text-2xs 3xl:text-xs leading-3 font-medium tracking-[0.18em] uppercase text-royal-500">
          {t("label")}
        </span>
        <span className="h-1 w-1 shrink-0 rotate-45 bg-royal-500" />
        <span className="grow h-px bg-royal-500/27" />
      </div>

      {/* Grid 2 colunas — mobile e desktop */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 3xl:gap-4">
        {cardData.map((card) => {
          const c = card.color;
          return (
            <div
              key={card.titleKey}
              className="flex flex-col gap-2 p-3 sm:p-4 2xl:p-[1.125rem] 3xl:p-5 min-h-[108px] sm:min-h-[132px] 2xl:min-h-[144px] 3xl:min-h-[156px]"
              style={{
                backgroundColor: `${c}08`,
                borderTop: `1px solid ${c}55`,
                borderLeft: `2px solid ${c}`,
                borderBottom: `1px solid ${c}22`,
                borderRight: `1px solid ${c}22`,
              }}
            >
              {/* Title row */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <svg
                  width="13" height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={c}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 sm:w-[15px] sm:h-[15px]"
                >
                  <path d={card.path} />
                </svg>
                <span
                  className="font-mono text-3xs 3xl:text-sm leading-3.5 tracking-[0.12em] uppercase font-semibold"
                  style={{ color: c }}
                >
                  {t(card.titleKey)}
                </span>
              </div>

              {/* Subtitle */}
              <span
                className="font-mono text-3xs 3xl:text-2xs tracking-widest leading-relaxed"
                style={{ color: `${c}73` }}
              >
                {t(card.subtitleKey)}
              </span>

              {/* Tags */}
              <div className="mt-auto flex flex-wrap gap-1">
                {(JSON.parse(t(card.tagsKey)) as string[]).map((tag: string) => (
                  <span
                    key={tag}
                    className="py-0.5 px-1.5 font-mono text-3xs 3xl:text-2xs leading-[2.5]"
                    style={{
                      backgroundColor: `${c}15`,
                      border: `1px solid ${c}30`,
                      color: c,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary footer */}
      <div className="flex items-center gap-2">
        {summaryColors.map((color, i) => (
          <span key={i} className="h-1 w-1 shrink-0" style={{ backgroundColor: color }} />
        ))}
        <span className="w-6 h-px bg-white/13" />
        <span className="font-mono text-3xs 3xl:text-2xs leading-3 tracking-[0.15em] uppercase font-medium text-white/80">
          {t("summary")}
        </span>
      </div>
    </div>
  );
}
