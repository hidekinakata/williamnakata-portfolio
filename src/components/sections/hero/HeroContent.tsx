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

const fadeInRight = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay: 0.35, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
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

  return (
    <div className="flex flex-col gap-8 sm:gap-10 xl:grid xl:grid-cols-[1fr_auto] xl:items-center xl:justify-between xl:gap-10 2xl:gap-14 3xl:gap-20">

      {/* ── LEFT COLUMN ── */}
      <motion.div
        initial="hidden"
        animate="visible"
        className="flex min-w-0 flex-col gap-3 sm:gap-4 3xl:gap-6"
      >
        <motion.div custom={0} variants={fadeInUp} className="flex items-center gap-2">
          <SectionLabel>{t("badge")}</SectionLabel>
          <span className="font-mono text-3xs 3xl:text-xs leading-3 tracking-[0.14em] uppercase text-royal-500/40">
            · 2025
          </span>
        </motion.div>

        <motion.h1 custom={1} variants={fadeInUp} className="flex flex-col leading-none">
          <span className="font-sans-decorated text-[3.25rem] leading-[0.9] font-black tracking-tight text-white/92 uppercase sm:text-6xl lg:text-7xl xl:text-[4.25rem] 2xl:text-[4.8rem] 3xl:text-[5.6rem] 4xl:text-[6rem]">
            WILLIAM
          </span>
          <span className="-mt-1 font-sans-decorated text-[4rem] leading-[0.86] font-black tracking-tight text-royal-500 uppercase sm:text-7xl lg:text-8xl xl:text-[6.55rem] 2xl:text-[7.5rem] 3xl:text-[8.6rem] 4xl:text-[9.25rem]">
            NAKATA
          </span>
        </motion.h1>

        <motion.div custom={2} variants={fadeInUp}>
          <DecorativeLine />
        </motion.div>

        {/* Roles + localização */}
        <motion.div custom={3} variants={fadeInUp} className="flex flex-wrap items-stretch gap-y-3 xl:gap-y-0">
          <div className="flex flex-col gap-1 py-1 pr-5 sm:pr-7 3xl:pr-9">
            <span className="font-mono text-3xs 3xl:text-2xs leading-3 tracking-[0.22em] uppercase text-neutral-500">
              {t("role1Label")}
            </span>
            <span className="font-sans-decorated text-sm sm:text-lg lg:text-xl 3xl:text-2xl font-bold tracking-[0.04em] uppercase text-white">
              {t("role1Title")}
            </span>
          </div>

          <span className="w-px bg-white/18 self-stretch" />

          <div className="flex flex-col gap-1 py-1 px-5 sm:px-7 3xl:px-9">
            <span className="font-mono text-3xs 3xl:text-2xs leading-3 tracking-[0.22em] uppercase text-royal-500/70">
              {t("role2Label")}
            </span>
            <span className="font-sans-decorated text-sm sm:text-lg lg:text-xl 3xl:text-2xl font-bold tracking-[0.04em] uppercase text-royal-400">
              {t("role2Title")}
            </span>
          </div>

          <span className="hidden sm:block w-px bg-white/18 self-stretch" />

          <div className="hidden sm:flex flex-col gap-1 py-1 px-5 sm:px-7 3xl:px-9">
            <span className="font-mono text-3xs 3xl:text-2xs leading-3 tracking-[0.22em] uppercase text-neutral-600">
              {t("baseLabel")}
            </span>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3 3xl:h-3.5 3xl:w-3.5 shrink-0 text-royal-500/70" />
              <span className="font-mono text-xs 3xl:text-sm tracking-[0.06em] text-neutral-400">
                {t("baseLocation")}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.p
          custom={4}
          variants={fadeInUp}
          className="max-w-[90%] font-serif text-sm leading-relaxed text-neutral-400 italic sm:max-w-md sm:text-base xl:max-w-lg 3xl:max-w-xl 3xl:text-lg"
        >
          {t("description")}
        </motion.p>

        {/* CTAs */}
        <motion.div custom={5} variants={fadeInUp} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
          <button className="flex w-full sm:w-auto cursor-pointer items-center justify-center gap-2.5 bg-royal-500 px-6 py-3.5 3xl:px-8 3xl:py-4 transition-all hover:bg-royal-500/85 active:scale-[0.98]">
            <span className="font-sans text-xs font-bold tracking-widest uppercase text-white">
              {t("ctaPrimary")}
            </span>
            <LucideArrowRight className="w-4 h-4 3xl:w-5 3xl:h-5" />
          </button>
          <button className="flex w-full sm:w-auto cursor-pointer items-center justify-center gap-2 border border-white/25 px-6 py-3.5 3xl:px-8 3xl:py-4 transition-colors hover:border-white/45 hover:bg-white/4">
            <span className="font-sans text-xs font-medium tracking-widest uppercase text-neutral-300">
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
        className="w-full justify-self-end shrink-0"
      >
        <motion.div initial="hidden" animate="visible" variants={fadeInUp2}>
          <StackGrid />
        </motion.div>
      </motion.div>
    </div>
  );
}
