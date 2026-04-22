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
  const [selected, setSelected] = useState<{
    role: ExperienceRole;
    company: string;
  } | null>(null);

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
    <section className="3xl:px-28 4xl:px-40 3xl:py-32 w-full px-6 py-16 sm:px-8 lg:px-14 lg:py-24 xl:px-20">
      <SectionDivider className="3xl:mb-32 mb-16 lg:mb-24" />
      <div className="3xl:gap-32 flex flex-col gap-10 lg:flex-row lg:gap-20">
        <div className="3xl:gap-8 flex min-w-0 shrink-0 flex-col gap-6 lg:w-[35%]">
          <SectionLabel>{t("label")}</SectionLabel>
          <h2 className="font-sans-decorated 3xl:text-8xl text-5xl leading-tight font-black tracking-tight text-white/92 uppercase sm:text-6xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
            {t("heading1")}
          </h2>
          <h2 className="font-sans-decorated 3xl:text-9xl text-royal-500 -mt-2 text-5xl leading-none font-black tracking-tight uppercase sm:text-7xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
            {t("heading2")}
          </h2>
          <DecorativeLine />
          <p className="max-w-sm font-sans text-sm leading-relaxed text-neutral-500 italic">
            {t("subtitle")}
          </p>
        </div>

        <div className="flex min-w-0 grow flex-col gap-0 overflow-hidden">
          {experiences.map((group, ci) => (
            <div
              key={`${group.company}-${ci}`}
              className={`flex gap-4 backdrop-blur-sm sm:gap-7 ${ci < experiences.length - 1 ? "border-b border-white/6 pb-10" : "pt-2"} ${ci > 0 ? "pt-10" : ""}`}
            >
              <div className="flex w-6 shrink-0 flex-col items-center">
                <span
                  className={`bg-void size-2.5 shrink-0 rounded-full border-[1.5px] ${
                    group.current ? "border-royal-500" : "border-royal-500/40"
                  }`}
                />
                <span
                  className={`w-px grow ${group.current ? "from-royal-500/40 to-royal-500/5 bg-gradient-to-b" : "from-royal-500/20 to-royal-500/3 bg-gradient-to-b"}`}
                />
              </div>

              <div className="flex min-w-0 grow flex-col overflow-hidden">
                <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex flex-col">
                    <span
                      className={`font-sans-decorated text-base font-bold tracking-[0.02em] uppercase sm:text-lg ${
                        group.current ? "text-white" : "text-neutral-400"
                      }`}
                    >
                      {group.company}
                    </span>
                    <span className="text-3xs mt-1 font-mono leading-3 tracking-[0.18em] text-neutral-700 uppercase">
                      {group.roles.length === 1
                        ? "1 " + t("roleSingular")
                        : group.roles.length + " " + t("rolePlural")}
                    </span>
                  </div>
                  <span className="text-2xs font-mono leading-3 tracking-widest text-neutral-600">
                    {formatRange(group.startDate, group.endDate, group.current)}
                  </span>
                </div>

                <div className="flex flex-col">
                  {group.roles.map((role, ri) => {
                    const isLast = ri === group.roles.length - 1;
                    const isActive = role.current;
                    const dotColor = isActive
                      ? "bg-royal-500"
                      : "bg-royal-500/35";
                    const titleColor = isActive
                      ? "text-royal-400"
                      : "text-neutral-200";
                    const dateColor = isActive
                      ? "text-royal-400"
                      : "text-neutral-600";

                    return (
                      <div
                        key={role.id}
                        className={`flex flex-col gap-2.5 ${!isLast ? "border-b border-white/5 pb-6" : ""} ${ri > 0 ? "mt-5" : ""}`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex min-w-0 items-center gap-2.5">
                            <span
                              className={`size-1.5 shrink-0 rounded-full ${dotColor}`}
                            />
                            <span
                              className={`font-sans-decorated truncate text-sm leading-5 font-bold tracking-[0.02em] uppercase sm:text-base ${titleColor}`}
                            >
                              {role.position}
                            </span>
                          </div>
                          <span
                            className={`text-2xs shrink-0 font-mono leading-3 font-medium tracking-[0.08em] ${dateColor}`}
                          >
                            {formatRange(
                              role.startDate,
                              role.endDate,
                              role.current,
                            )}
                          </span>
                        </div>

                        <div className="flex items-baseline gap-3 overflow-hidden pl-4">
                          <p className="min-w-0 flex-1 truncate font-sans text-xs leading-relaxed text-neutral-500 italic">
                            {role.description}
                          </p>
                          {role.description && (
                            <button
                              onClick={() =>
                                setSelected({ role, company: group.company })
                              }
                              className="text-3xs text-royal-400 hover:text-royal-300 shrink-0 cursor-pointer font-mono leading-3 font-medium tracking-[0.14em] whitespace-nowrap uppercase transition-colors"
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

      <DialogPrimitive.Root
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      >
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
                  className="fixed top-1/2 left-1/2 z-50 max-h-[85vh] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto border border-white/10 bg-[#07060f] p-8 text-white shadow-2xl focus:outline-none"
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 12 }}
                  transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="mb-6 flex flex-col gap-1 pr-8">
                    <span className="text-3xs font-mono leading-3 tracking-[0.18em] text-neutral-500 uppercase">
                      {selected.company}
                    </span>
                    <DialogPrimitive.Title className="font-sans-decorated text-royal-400 mt-1 text-xl font-bold tracking-[0.02em] uppercase sm:text-2xl">
                      {selected.role.position}
                    </DialogPrimitive.Title>
                    <span className="text-2xs mt-2 font-mono leading-3 tracking-[0.12em] text-neutral-500">
                      {formatRange(
                        selected.role.startDate,
                        selected.role.endDate,
                        selected.role.current,
                      )}
                    </span>
                  </div>

                  <div className="mb-6 h-px w-full bg-white/8" />

                  <p className="font-sans text-sm leading-relaxed whitespace-pre-wrap text-neutral-300">
                    {selected.role.description}
                  </p>

                  <DialogPrimitive.Close className="absolute top-5 right-5 cursor-pointer text-neutral-500 transition-colors hover:text-white">
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
