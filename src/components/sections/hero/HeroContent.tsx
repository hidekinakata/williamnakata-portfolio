"use client";

import { LucideArrowRight, MapPin, Sparkles, WorkflowIcon } from "lucide-react";
import { useTranslations } from "next-intl";

const flowSteps = [
  {
    id: "01",
    title: "Python · ML",
    stack: "scikit-learn · torch · pandas",
    tag: "model.fit()",
    tone: {
      card: "bg-violet-500/5 border-t-violet-500/40 border-l-violet-500 border-b-violet-500/15 border-r-violet-500/15",
      index: "text-violet-400/40",
      divider: "bg-violet-500/15",
      iconBox: "bg-violet-500/10 border-violet-500/50",
      title: "text-violet-400",
      stack: "text-violet-400/50",
      badge: "bg-violet-500/5 border-violet-500/20 text-violet-400/40",
      connector: "bg-gradient-to-b from-violet-500/40 to-cyan-400/35",
    },
    icon: <i className="devicon-python-plain text-lg text-violet-400" />,
  },
  {
    id: "02",
    title: "n8n Workflow",
    stack: "inference · embeddings · RAG",
    tag: "webhook →",
    tone: {
      card: "bg-cyan-400/5 border-t-cyan-400/40 border-l-cyan-400/80 border-b-cyan-400/15 border-r-cyan-400/15",
      index: "text-cyan-400/40",
      divider: "bg-cyan-400/15",
      iconBox: "bg-cyan-400/10 border-cyan-400/50",
      title: "text-cyan-400/80",
      stack: "text-cyan-400/50",
      badge: "bg-cyan-400/5 border-cyan-400/20 text-cyan-400/40",
      connector: "bg-gradient-to-b from-cyan-400/35 to-white/15",
    },
    icon: <WorkflowIcon className="h-4.5 w-4.5 shrink-0 text-cyan-400/80" />,
  },
  {
    id: "03",
    title: "LLM APIs",
    stack: "OpenAI · Azure · Third-party",
    tag: "stream()",
    tone: {
      card: "bg-white/5 border-t-white/25 border-l-white/60 border-b-white/10 border-r-white/10",
      index: "text-white/25",
      divider: "bg-white/10",
      iconBox: "bg-white/10 border-white/25",
      title: "text-white/80",
      stack: "text-white/30",
      badge: "bg-white/5 border-white/10 text-white/25",
      connector: "bg-gradient-to-b from-white/15 to-violet-500/40",
    },
    icon: <Sparkles className="h-4.5 w-4.5 shrink-0 text-white/80" />,
  },
  {
    id: "04",
    title: "C# Backend",
    stack: ".NET 8 · REST · EF Core",
    tag: "deploy()",
    tone: {
      card: "bg-violet-500/10 border-t-violet-500/50 border-l-violet-500 border-b-violet-500/20 border-r-violet-500/20",
      index: "text-violet-400/40",
      divider: "bg-violet-500/30",
      iconBox: "bg-violet-500/15 border-violet-500/50",
      title: "text-violet-400",
      stack: "text-violet-400/50",
      badge: "bg-violet-500/10 border-violet-500/30 text-violet-400/40",
      connector: "",
    },
    icon: <i className="devicon-csharp-plain text-lg text-violet-400/80" />,
  },
];

export default function HeroContent() {
  const t = useTranslations("Hero");

  return (
    <div className={"flex flex-col gap-8 lg:flex-row lg:gap-16"}>
      <div className="flex w-fit flex-col gap-4">
        {/* Badge */}
        <div className="flex items-center gap-2">
          <MapPin className="mb-1 h-3 w-3 shrink-0 text-indigo-500" />
          <div className="top-0 right-0 flex items-start justify-center gap-1">
            <span className="font-mono text-xs leading-4 tracking-wider text-nowrap text-neutral-300/70">
              {t("baseLocation")}
            </span>
          </div>
        </div>

        {/* Name */}
        <h1 className="relative flex w-fit flex-col">
          <span className="font-sans-decorated text-3xl leading-none font-black tracking-tighter text-white uppercase sm:text-4xl lg:text-5xl 2xl:text-7xl">
            WILLIAM
          </span>
          <span className="font-sans-decorated -translate-x-1 text-6xl leading-none font-black tracking-tighter text-indigo-600 uppercase sm:text-7xl md:-translate-x-1.5 lg:text-8xl">
            NAKATA
          </span>
        </h1>

        {/* Attributions */}
        <div className="flex items-center gap-4 italic">
          <div className="flex flex-col gap-1 py-1 sm:gap-1.5">
            <span className="font-sans-decorated leading-tight font-medium tracking-wider text-white uppercase sm:leading-8">
              {t("role1Title")}
            </span>
          </div>
          <span>|</span>
          <div className="flex flex-col gap-1 py-1 sm:gap-1.5">
            <span className="font-sans-decorated leading-tight font-medium tracking-wider text-indigo-400 uppercase sm:leading-8">
              {t("role2Title")}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="my-4 max-w-full font-serif text-sm leading-relaxed tracking-wide text-neutral-400 italic sm:max-w-sm sm:text-base md:max-w-md md:text-lg lg:max-w-lg">
          {t("description")}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <button className="flex cursor-pointer items-center justify-center gap-2.5 bg-indigo-400/20 px-6 py-3 backdrop-blur-xs transition-opacity hover:opacity-90 sm:justify-start sm:px-7">
            <span className="font-sans text-xs leading-4 font-semibold tracking-wider text-white uppercase sm:text-xs">
              {t("ctaPrimary")}
            </span>

            <span className="font-sans text-xs leading-3 text-white">
              <LucideArrowRight className="w-4 sm:w-5" />
            </span>
          </button>

          <button className="flex cursor-pointer items-center justify-center gap-2 border border-white/10 px-6 py-3 backdrop-blur-xs transition-colors hover:border-white/25 sm:justify-start sm:px-7">
            <span className="font-sans text-xs leading-4 font-medium tracking-wider text-neutral-400 uppercase sm:text-xs">
              {t("ctaSecondary")}
            </span>
          </button>
        </div>
      </div>
      <div className="m-auto my-auto flex w-full flex-col gap-3 font-mono antialiased sm:w-auto">
        {flowSteps.map((step, index) => (
          <div key={step.id} className="flex flex-col">
            <div
              className={`flex w-full items-center gap-3 border-t border-r border-b border-l-2 px-4 py-4 text-xs/4 [font-synthesis:none] sm:gap-5 sm:px-6 sm:py-5 ${step.tone.card}`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center border sm:h-9.5 sm:w-9.5 ${step.tone.iconBox}`}
              >
                {step.icon}
              </div>
              <div className="flex grow basis-0 flex-col gap-1 sm:gap-1.25">
                <div
                  className={`text-[10px] leading-3.5 font-semibold tracking-[0.12em] uppercase sm:text-[11px] sm:tracking-[0.14em] ${step.tone.title}`}
                >
                  {step.title}
                </div>
                <div
                  className={`text-[7px] leading-2.5 tracking-widest text-nowrap sm:text-[8px] ${step.tone.stack}`}
                >
                  {step.stack}
                </div>
              </div>
              <div
                className={`shrink-0 border px-1.5 py-0.5 sm:px-2 sm:py-0.75 ${step.tone.badge}`}
              >
                <div className="text-[7px] leading-2.5 tracking-[0.12em] sm:text-[8px]">
                  {step.tag}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
