"use client";

import { LucideArrowRight, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import SectionLabel from "../shared/SectionLabel";
import DecorativeLine from "../shared/DecorativeLine";
import StackGrid from "./StackGrid";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function HeroContent() {
  const t = useTranslations("Hero");

  return (
    <div className="flex flex-col gap-12 xl:grid xl:grid-cols-[minmax(580px,700px)_minmax(460px,540px)] xl:items-start xl:justify-between xl:gap-14 2xl:grid-cols-[minmax(640px,760px)_minmax(500px,580px)] 2xl:gap-16 3xl:grid-cols-[minmax(700px,820px)_minmax(540px,620px)] 3xl:gap-20 4xl:grid-cols-[minmax(760px,880px)_minmax(580px,660px)]">
      <motion.div
        initial="hidden"
        animate="visible"
        className="flex min-w-0 flex-col gap-4 xl:max-w-[760px] 2xl:max-w-[820px] 3xl:max-w-[900px] 3xl:gap-6"
      >
        <motion.div custom={0} variants={fadeInUp} className="flex items-center gap-2">
          <SectionLabel>{t("badge")}</SectionLabel>
          <span className="font-mono text-3xs 3xl:text-xs leading-3 tracking-[0.14em] uppercase text-royal-500/40">
            · 2025
          </span>
        </motion.div>

        <motion.h1 custom={1} variants={fadeInUp} className="flex flex-col leading-none">
          <span className="font-sans-decorated text-5xl leading-[0.9] font-black tracking-tight text-white/92 uppercase sm:text-6xl lg:text-7xl xl:text-[4.25rem] 2xl:text-[4.8rem] 3xl:text-[5.6rem] 4xl:text-[6rem]">
            WILLIAM
          </span>
          <span className="-mt-1 font-sans-decorated text-6xl leading-[0.86] font-black tracking-tight text-royal-500 uppercase sm:text-7xl lg:text-8xl xl:text-[6.55rem] 2xl:text-[7.5rem] 3xl:text-[8.6rem] 4xl:text-[9.25rem]">
            NAKATA
          </span>
        </motion.h1>

        <motion.div custom={2} variants={fadeInUp}>
          <DecorativeLine />
        </motion.div>

        <motion.div custom={3} variants={fadeInUp} className="flex flex-wrap items-stretch gap-y-4 xl:gap-y-0">
          <div className="flex flex-col gap-0.5 py-1 pr-4 sm:pr-6 3xl:pr-8">
            <span className="font-mono text-3xs 3xl:text-2xs leading-3 tracking-[0.22em] uppercase text-royal-500">
              {t("role1Label")}
            </span>
            <span className="font-sans-decorated text-base sm:text-lg lg:text-xl 3xl:text-2xl font-bold tracking-[0.04em] uppercase text-white">
              {t("role1Title")}
            </span>
          </div>
          <span className="w-px bg-white/10 self-stretch" />
          <div className="flex flex-col gap-0.5 py-1 px-4 sm:px-6 3xl:px-8">
            <span className="font-mono text-3xs 3xl:text-2xs leading-3 tracking-[0.22em] uppercase text-royal-400">
              {t("role2Label")}
            </span>
            <span className="font-sans-decorated text-base sm:text-lg lg:text-xl 3xl:text-2xl font-bold tracking-[0.04em] uppercase text-royal-400">
              {t("role2Title")}
            </span>
          </div>
          <span className="hidden sm:block w-px bg-white/10 self-stretch" />
          <div className="hidden sm:flex flex-col gap-0.5 py-1 px-4 sm:px-6 3xl:px-8">
            <span className="font-mono text-3xs 3xl:text-2xs leading-3 tracking-[0.22em] uppercase text-neutral-700">
              {t("baseLabel")}
            </span>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3 3xl:h-3.5 3xl:w-3.5 shrink-0 text-royal-500" />
              <span className="font-mono text-xs 3xl:text-sm tracking-[0.06em] text-neutral-500">
                {t("baseLocation")}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.p custom={4} variants={fadeInUp} className="max-w-sm font-serif text-sm leading-relaxed text-neutral-500 italic sm:max-w-md sm:text-base xl:max-w-lg 3xl:max-w-xl 3xl:text-lg">
          {t("description")}
        </motion.p>

        <motion.div custom={5} variants={fadeInUp} className="flex flex-wrap items-center gap-4 pt-1">
          <button className="flex cursor-pointer items-center gap-2.5 bg-royal-500 px-6 py-3.5 3xl:px-8 3xl:py-4 transition-all hover:bg-royal-500/90">
            <span className="font-sans text-xs font-bold tracking-widest uppercase text-white">
              {t("ctaPrimary")}
            </span>
            <LucideArrowRight className="w-4 h-4 3xl:w-5 3xl:h-5" />
          </button>
          <button className="flex cursor-pointer items-center gap-2 border border-white/15 px-6 py-3.5 3xl:px-8 3xl:py-4 transition-colors hover:border-white/25">
            <span className="font-sans text-xs font-medium tracking-widest uppercase text-neutral-400">
              {t("ctaSecondary")}
            </span>
          </button>
        </motion.div>
      </motion.div>

      <div className="w-full justify-self-end xl:max-w-[540px] 2xl:max-w-[580px] 3xl:max-w-[620px] 4xl:max-w-[660px]">
        <StackGrid />
      </div>
    </div>
  );
}
