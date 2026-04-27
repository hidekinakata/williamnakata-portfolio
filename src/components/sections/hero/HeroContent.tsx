"use client";

import { LucideArrowRight, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import SectionLabel from "@/components/shared/SectionLabel";
import DecorativeLine from "@/components/shared/DecorativeLine";
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

const fadeInRight = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.35,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const fadeInUp2 = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.55, duration: 0.5, ease: "easeOut" as const },
  },
};

export default function HeroContent() {
  const t = useTranslations("Hero");
  const currentYear = new Date().getFullYear();

  return (
    <div className="3xl:gap-20 flex flex-col gap-16 sm:gap-20 xl:grid xl:grid-cols-[1fr_auto] xl:items-center xl:justify-between xl:gap-10 2xl:gap-14">
      {/* ── LEFT COLUMN ── */}
      <motion.div
        initial="hidden"
        animate="visible"
        className="3xl:gap-6 flex min-w-0 flex-col gap-6 sm:gap-8"
      >
        <motion.div
          custom={0}
          variants={fadeInUp}
          className="flex items-center gap-2"
        >
          <SectionLabel>{t("badge")}</SectionLabel>
          <span className="text-3xs 3xl:text-xs text-royal-500/80 font-mono leading-3 tracking-[0.14em] uppercase">
            · {currentYear}
          </span>
        </motion.div>

        <motion.h1
          custom={1}
          variants={fadeInUp}
          className="flex flex-col leading-none"
        >
          <span className="font-sans-decorated 3xl:text-[5.6rem] 4xl:text-[6rem] text-[3.25rem] leading-[0.9] font-black tracking-tight text-white/92 uppercase sm:text-6xl lg:text-7xl xl:text-[4.25rem] 2xl:text-[4.8rem]">
            WILLIAM
          </span>
          <span className="font-sans-decorated text-royal-500 3xl:text-[8.6rem] 4xl:text-[9.25rem] -mt-1 text-[4rem] leading-[0.86] font-black tracking-tight uppercase sm:text-7xl lg:text-8xl xl:text-[6.55rem] 2xl:text-[7.5rem]">
            NAKATA
          </span>
        </motion.h1>

        <motion.div custom={2} variants={fadeInUp}>
          <DecorativeLine />
        </motion.div>

        {/* Roles + localização */}
        <motion.div
          custom={3}
          variants={fadeInUp}
          className="flex flex-wrap items-stretch gap-y-3 xl:gap-y-0"
        >
          <div className="3xl:pr-9 flex flex-col gap-1 py-1 pr-5 sm:pr-7">
            <span className="text-3xs 3xl:text-2xs font-mono leading-3 tracking-[0.22em] text-neutral-500 uppercase">
              {t("role1Label")}
            </span>
            <span className="font-sans-decorated 3xl:text-2xl text-sm font-bold tracking-[0.04em] text-white uppercase sm:text-lg lg:text-xl">
              {t("role1Title")}
            </span>
          </div>

          <span className="w-px self-stretch bg-white/18" />

          <div className="3xl:px-9 flex flex-col gap-1 px-5 py-1 sm:px-7">
            <span className="text-3xs 3xl:text-2xs text-royal-500/70 font-mono leading-3 tracking-[0.22em] uppercase">
              {t("role2Label")}
            </span>
            <span className="font-sans-decorated 3xl:text-2xl text-royal-400 text-sm font-bold tracking-[0.04em] uppercase sm:text-lg lg:text-xl">
              {t("role2Title")}
            </span>
          </div>

          <span className="hidden w-px self-stretch bg-white/18 sm:block" />

          <div className="3xl:px-9 hidden flex-col gap-1 px-5 py-1 sm:flex sm:px-7">
            <span className="text-3xs 3xl:text-2xs font-mono leading-3 tracking-[0.22em] text-neutral-600 uppercase">
              {t("baseLabel")}
            </span>
            <div className="flex items-center gap-1.5">
              <MapPin className="3xl:h-3.5 3xl:w-3.5 text-royal-500/70 h-3 w-3 shrink-0" />
              <span className="3xl:text-sm font-mono text-xs tracking-[0.06em] text-neutral-400">
                {t("baseLocation")}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.p
          custom={4}
          variants={fadeInUp}
          className="3xl:max-w-xl 3xl:text-lg max-w-[90%] font-serif text-sm leading-relaxed text-neutral-400 italic sm:max-w-md sm:text-base xl:max-w-lg"
        >
          {t("description")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={5}
          variants={fadeInUp}
          className="flex flex-col items-stretch gap-4 pt-2 sm:flex-row sm:items-center"
        >
          <button className="bg-royal-500 3xl:px-8 3xl:py-4 hover:bg-royal-500/85 flex w-full cursor-pointer items-center justify-center gap-2.5 px-6 py-3.5 transition-all active:scale-[0.98] sm:w-auto">
            <span className="font-sans text-xs font-bold tracking-widest text-white uppercase">
              {t("ctaPrimary")}
            </span>
            <LucideArrowRight className="3xl:w-5 3xl:h-5 h-4 w-4" />
          </button>
          <button className="3xl:px-8 3xl:py-4 flex w-full cursor-pointer items-center justify-center gap-2 border border-white/25 px-6 py-3.5 transition-colors hover:border-white/45 hover:bg-white/4 sm:w-auto">
            <span className="font-sans text-xs font-medium tracking-widest text-neutral-300 uppercase">
              {t("ctaSecondary")}
            </span>
          </button>
        </motion.div>
      </motion.div>

      {/* ── RIGHT COLUMN / STACK GRID ── */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInRight}
        className="w-full shrink-0 justify-self-end"
      >
        <motion.div initial="hidden" animate="visible" variants={fadeInUp2}>
          <StackGrid />
        </motion.div>
      </motion.div>
    </div>
  );
}
