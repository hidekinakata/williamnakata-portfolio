"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import SectionLabel from "../shared/SectionLabel";
import DecorativeLine from "../shared/DecorativeLine";
import SectionDivider from "../shared/SectionDivider";

type ExperienceRole = {
  id: string;
  position: string;
  description: string;
  startDate: string | Date;
  endDate: string | Date | null;
  current: boolean;
};

type ExperienceGroup = {
  company: string;
  startDate: string | Date;
  endDate: string | Date | null;
  current: boolean;
  roles: ExperienceRole[];
};

type Props = {
  experiences: ExperienceGroup[];
};

function formatDate(date: string | Date, locale: string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale === "pt" ? "pt-BR" : "en-US", {
    month: "short",
    year: "numeric",
  }).format(d);
}

export default function ExperienceSection({ experiences }: Props) {
  const t = useTranslations("Experience");
  const locale = useLocale();
  const [selected, setSelected] = useState<{ role: ExperienceRole; company: string } | null>(null);

  const formatRange = (
    start: string | Date,
    end: string | Date | null,
    current: boolean,
  ) => {
    const startStr = formatDate(start, locale);
    const endStr = current ? t("current") : end ? formatDate(end, locale) : "";
    return `${startStr} - ${endStr}`;
  };

  return (
    <section className="w-full px-6 sm:px-8 lg:px-14 xl:px-20 3xl:px-28 4xl:px-40 py-16 lg:py-24 3xl:py-32">
      <SectionDivider className="mb-16 lg:mb-24 3xl:mb-32" />
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 3xl:gap-32">
        <div className="flex flex-col gap-6 3xl:gap-8 lg:w-[35%] shrink-0 min-w-0">
          <SectionLabel>{t("label")}</SectionLabel>
          <h2 className="font-sans-decorated text-5xl sm:text-6xl lg:text-4xl xl:text-5xl 2xl:text-6xl 3xl:text-8xl leading-tight font-black tracking-tight text-white/92 uppercase">
            {t("heading1")}
          </h2>
          <h2 className="font-sans-decorated text-5xl sm:text-7xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-9xl leading-none font-black tracking-tight text-royal-500 uppercase -mt-2">
            {t("heading2")}
          </h2>
          <DecorativeLine />
          <p className="font-sans text-sm leading-relaxed text-neutral-500 italic max-w-sm">
            {t("subtitle")}
          </p>
        </div>

        <div className="flex flex-col gap-0 grow min-w-0 overflow-hidden">
          {experiences.map((group, ci) => (
            <div
              key={`${group.company}-${ci}`}
              className={`flex gap-4 sm:gap-7 backdrop-blur-sm ${ci < experiences.length - 1 ? "pb-10 border-b border-white/6" : "pt-2"} ${ci > 0 ? "pt-10" : ""}`}
            >
              <div className="flex flex-col items-center w-6 shrink-0">
                <span
                  className={`rounded-full size-2.5 shrink-0 border-[1.5px] bg-void ${
                    group.current ? "border-royal-500" : "border-royal-500/40"
                  }`}
                />
                <span
                  className={`w-px grow ${group.current ? "bg-gradient-to-b from-royal-500/40 to-royal-500/5" : "bg-gradient-to-b from-royal-500/20 to-royal-500/3"}`}
                />
              </div>

              <div className="flex flex-col grow min-w-0 overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-6">
                  <div className="flex flex-col">
                    <span
                      className={`font-sans-decorated text-base sm:text-lg tracking-[0.02em] uppercase font-bold ${
                        group.current ? "text-white" : "text-neutral-400"
                      }`}
                    >
                      {group.company}
                    </span>
                    <span className="font-mono text-3xs leading-3 tracking-[0.18em] uppercase text-neutral-700 mt-1">
                      {group.roles.length === 1
                        ? "1 " + t("roleSingular")
                        : group.roles.length + " " + t("rolePlural")}
                    </span>
                  </div>
                  <span className="font-mono text-2xs leading-3 tracking-widest text-neutral-600">
                    {formatRange(group.startDate, group.endDate, group.current)}
                  </span>
                </div>

                <div className="flex flex-col">
                  {group.roles.map((role, ri) => {
                    const isLast = ri === group.roles.length - 1;
                    const isActive = role.current;
                    const dotColor = isActive ? "bg-royal-500" : "bg-royal-500/35";
                    const titleColor = isActive ? "text-royal-400" : "text-neutral-200";
                    const dateColor = isActive ? "text-royal-400" : "text-neutral-600";

                    return (
                      <div
                        key={role.id}
                        className={`flex flex-col gap-2.5 ${!isLast ? "pb-6 border-b border-white/5" : ""} ${ri > 0 ? "mt-5" : ""}`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className={`rounded-full size-1.5 shrink-0 ${dotColor}`} />
                            <span
                              className={`font-sans-decorated text-sm sm:text-base leading-5 tracking-[0.02em] uppercase font-bold truncate ${titleColor}`}
                            >
                              {role.position}
                            </span>
                          </div>
                          <span
                            className={`font-mono text-2xs leading-3 tracking-[0.08em] font-medium shrink-0 ${dateColor}`}
                          >
                            {formatRange(role.startDate, role.endDate, role.current)}
                          </span>
                        </div>

                        <div className="flex items-baseline gap-3 pl-4 overflow-hidden">
                          <p className="font-sans text-xs leading-relaxed italic text-neutral-500 truncate min-w-0 flex-1">
                            {role.description}
                          </p>
                          {role.description && (
                            <button
                              onClick={() => setSelected({ role, company: group.company })}
                              className="shrink-0 font-mono text-3xs leading-3 tracking-[0.14em] uppercase font-medium text-royal-400 hover:text-royal-300 transition-colors cursor-pointer whitespace-nowrap"
                            >
                              {t("seeMore")}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <DialogPrimitive.Root open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <AnimatePresence>
          {!!selected && (
            <DialogPrimitive.Portal forceMount>
              <DialogPrimitive.Overlay asChild forceMount>
                <motion.div
                  className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                />
              </DialogPrimitive.Overlay>

              <DialogPrimitive.Content asChild forceMount>
                <motion.div
                  className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl max-h-[85vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2 border border-white/10 bg-[#07060f] p-8 shadow-2xl text-white focus:outline-none"
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 12 }}
                  transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex flex-col gap-1 mb-6 pr-8">
                    <span className="font-mono text-3xs leading-3 tracking-[0.18em] uppercase text-neutral-500">
                      {selected.company}
                    </span>
                    <DialogPrimitive.Title className="font-sans-decorated text-xl sm:text-2xl tracking-[0.02em] uppercase font-bold text-royal-400 mt-1">
                      {selected.role.position}
                    </DialogPrimitive.Title>
                    <span className="font-mono text-2xs leading-3 tracking-[0.12em] text-neutral-500 mt-2">
                      {formatRange(selected.role.startDate, selected.role.endDate, selected.role.current)}
                    </span>
                  </div>

                  <div className="w-full h-px bg-white/8 mb-6" />

                  <p className="font-sans text-sm leading-relaxed text-neutral-300 whitespace-pre-wrap">
                    {selected.role.description}
                  </p>

                  <DialogPrimitive.Close className="absolute top-5 right-5 text-neutral-500 hover:text-white transition-colors cursor-pointer">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Fechar</span>
                  </DialogPrimitive.Close>
                </motion.div>
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          )}
        </AnimatePresence>
      </DialogPrimitive.Root>
    </section>
  );
}
