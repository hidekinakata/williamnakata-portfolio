import { getTranslations } from "next-intl/server";
import HeroContent from "./HeroContent";
import Section from "../shared/Section";

export default async function HeroSection() {
  const t = await getTranslations("Hero");

  return (
    <Section fullHeight className="3xl:min-h-[110svh] 3xl:pt-36 3xl:pb-36">
      <div className="3xl:max-w-[1640px] 3xl:px-20 4xl:max-w-[1780px] 4xl:px-24 relative z-10 mx-auto w-full max-w-[1520px] px-6 sm:px-8 lg:px-14 xl:px-16">
        <HeroContent />
      </div>

      {/* Corner TL */}
      <div className="3xl:left-20 border-royal-500/45 absolute top-24 left-8 hidden h-3.5 w-3.5 border-t border-l lg:left-14 lg:block" />
      {/* Corner BR */}
      <div className="3xl:right-20 border-neural-400/30 absolute right-8 bottom-16 hidden h-3.5 w-3.5 border-r border-b lg:right-14 lg:block" />

      {/* Coordinates */}
      <div className="3xl:left-20 absolute top-24 left-8 mt-6 hidden flex-col gap-0.5 lg:left-14 lg:flex">
        <span className="text-3xs 3xl:text-2xs text-royal-500/40 font-mono leading-3 tracking-[0.14em] uppercase">
          {t("coordinates")}
        </span>
        <span className="text-3xs 3xl:text-2xs text-royal-500/20 font-mono leading-3 tracking-[0.14em] uppercase">
          SYS_BOOT :: v2.4.1
        </span>
      </div>

      {/* Scroll */}
      <div className="3xl:right-20 absolute right-8 bottom-10 hidden items-center gap-2 lg:right-14 lg:flex">
        <span className="text-2xs font-mono leading-3 tracking-[0.14em] text-neutral-600 uppercase">
          Scroll
        </span>
        <span className="bg-royal-500/35 block h-px w-10" />
      </div>

      {/* Rotated label */}
      <div className="3xl:right-20 absolute top-1/2 right-8 hidden -translate-y-1/2 lg:right-14 2xl:flex">
        <span className="text-2xs text-royal-500/18 origin-center -rotate-90 font-mono leading-3 tracking-[0.14em] whitespace-nowrap uppercase">
          Neural · Interface · Design
        </span>
      </div>
    </Section>
  );
}
