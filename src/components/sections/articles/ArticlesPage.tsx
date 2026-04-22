"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Brain,
  Code2,
  Palette,
  Server,
  ArrowRight,
  Search,
  X,
  FileText,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { type Article } from "@/lib/articles";
import SectionLabel from "@/components/sections/shared/SectionLabel";
import DecorativeLine from "@/components/sections/shared/DecorativeLine";

const iconMap: Record<string, React.ReactNode> = {
  brain: <Brain className="h-4 w-4" />,
  "code-2": <Code2 className="h-4 w-4" />,
  palette: <Palette className="h-4 w-4" />,
  server: <Server className="h-4 w-4" />,
};

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

interface BlogStrings {
  label: string;
  heading1: string;
  heading2: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  badge: string;
  searchPlaceholder: string;
  filterAll: string;
  empty: string;
  coordinates: string;
  rotatedLabel: string;
  archiveLabel: string;
}

interface ArticlesPageProps {
  articles: Article[];
  allTags: string[];
  locale: string;
  strings: BlogStrings;
}

export default function ArticlesPage({ articles, allTags, locale, strings }: ArticlesPageProps) {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchesSearch =
        !search.trim() ||
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.description.toLowerCase().includes(search.toLowerCase()) ||
        a.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
      const matchesTag = !activeTag || a.tags.includes(activeTag);
      return matchesSearch && matchesTag;
    });
  }, [search, activeTag, articles]);

  const latestArticle = articles[0];

  return (
    <section className="relative flex min-h-svh w-full flex-col justify-center overflow-hidden pt-20 pb-10 sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-28 xl:min-h-[108svh] xl:pt-32 xl:pb-32">
      <div className="relative z-10 mx-auto w-full max-w-[1520px] px-6 sm:px-8 lg:px-14 xl:px-16 3xl:max-w-[1640px] 3xl:px-20 4xl:max-w-[1780px] 4xl:px-24">
        <div className="flex flex-col gap-10 xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] xl:gap-14 2xl:gap-20">
          {/* ── LEFT COLUMN ── */}
          <motion.div
            initial="hidden"
            animate="visible"
            className="flex min-w-0 flex-col gap-4 sm:gap-5"
          >
            <motion.div custom={0} variants={fadeInUp}>
              <SectionLabel>{strings.label}</SectionLabel>
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeInUp}
              className="flex flex-col leading-none"
            >
              <span className="font-sans-decorated text-[3.25rem] leading-[0.9] font-black tracking-tight text-white/92 uppercase break-words sm:text-6xl lg:text-7xl xl:text-[4.25rem] 2xl:text-[5rem] 3xl:text-[5.6rem] 4xl:text-[6rem]">
                {strings.heading1}
              </span>
              <span className="font-sans-decorated text-royal-500 -mt-1 text-[4rem] leading-[0.86] font-black tracking-tight uppercase break-words sm:text-7xl lg:text-8xl xl:text-[6.55rem] 2xl:text-[7.5rem] 3xl:text-[8.6rem] 4xl:text-[9.25rem]">
                {strings.heading2}
              </span>
            </motion.h1>

            <motion.div custom={2} variants={fadeInUp}>
              <DecorativeLine width="max-w-26 lg:max-w-80" />
            </motion.div>

            <motion.p
              custom={3}
              variants={fadeInUp}
              className="font-serif max-w-md text-sm leading-relaxed text-neutral-400 italic sm:text-base xl:max-w-lg 3xl:max-w-xl 3xl:text-lg"
            >
              {strings.subtitle}
            </motion.p>

            {/* Search */}
            <motion.div
              custom={4}
              variants={fadeInUp}
              className="flex flex-col gap-3"
            >
              <div className="relative">
                <Search className="text-royal-500/60 absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={strings.searchPlaceholder}
                  className="w-full rounded-none border border-royal-500/30 bg-transparent py-2.5 pr-3 pl-9 text-sm text-white/90 outline-none transition-colors placeholder:text-neutral-600 focus:border-royal-500/60"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500 transition-colors hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveTag(null)}
                  className={`font-mono text-2xs cursor-pointer border px-2.5 py-1 tracking-[0.12em] uppercase transition-colors ${
                    !activeTag
                      ? "border-royal-500/60 bg-royal-500/15 text-royal-400"
                      : "border-royal-500/20 text-royal-500/70 hover:border-royal-500/40 hover:text-royal-400"
                  }`}
                >
                  {strings.filterAll}
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                    className={`font-mono text-2xs cursor-pointer border px-2.5 py-1 tracking-[0.12em] uppercase transition-colors ${
                      activeTag === tag
                        ? "border-royal-500/60 bg-royal-500/15 text-royal-400"
                        : "border-royal-500/20 text-royal-500/70 hover:border-royal-500/40 hover:text-royal-400"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              custom={5}
              variants={fadeInUp}
              className="flex flex-col items-stretch gap-3 pt-1 sm:flex-row sm:items-center"
            >
              <button
                onClick={() =>
                  latestArticle && router.push(`/${locale}/articles/${latestArticle.slug}`)
                }
                className="bg-royal-500 flex w-full cursor-pointer items-center justify-center gap-2.5 px-6 py-3.5 transition-all hover:bg-royal-500/85 active:scale-[0.98] sm:w-auto 3xl:px-8 3xl:py-4"
              >
                <span className="font-sans text-xs font-bold tracking-widest text-white uppercase">
                  {strings.ctaPrimary}
                </span>
                <ArrowRight className="h-4 w-4 3xl:h-5 3xl:w-5" />
              </button>
              <button
                onClick={() => {
                  document
                    .getElementById("articles-list")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex w-full cursor-pointer items-center justify-center gap-2 border border-royal-500/[0.27] px-6 py-3.5 transition-colors hover:border-royal-500/50 hover:bg-white/[0.03] sm:w-auto 3xl:px-8 3xl:py-4"
              >
                <span className="font-sans text-xs font-medium tracking-widest text-neutral-300 uppercase">
                  {strings.ctaSecondary}
                </span>
              </button>
            </motion.div>

            {/* Badge */}
            <motion.div
              custom={6}
              variants={fadeInUp}
              className="flex items-center gap-2"
            >
              <span className="bg-royal-500 h-2 w-2 shrink-0 rounded-full" />
              <span className="text-2xs font-mono tracking-[0.12em] text-neutral-400 uppercase">
                {articles.length} {strings.badge}
              </span>
            </motion.div>
          </motion.div>

          {/* ── RIGHT COLUMN / ARTICLES ── */}
          <motion.div
            id="articles-list"
            initial="hidden"
            animate="visible"
            className="flex min-w-0 flex-col gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  className="flex flex-col items-center gap-3 py-16"
                >
                  <FileText className="text-royal-500/40 h-8 w-8" />
                  <span className="font-mono text-sm tracking-widest text-neutral-500 uppercase">
                    {strings.empty}
                  </span>
                </motion.div>
              ) : (
                filtered.map((article, idx) => (
                  <motion.article
                    key={article.slug}
                    custom={idx}
                    variants={fadeInUp}
                    layout
                    initial="hidden"
                    animate="visible"
                    className="group cursor-pointer"
                    onClick={() =>
                      router.push(`/${locale}/articles/${article.slug}`)
                    }
                  >
                    <div className="flex border-l-2 border-t-royal-500/40 border-r-royal-500/[0.13] border-b-royal-500/[0.13] border-l-royal-500 bg-royal-500/[0.03] transition-colors hover:bg-royal-500/[0.06]">
                      {/* Left column */}
                      <div className="flex flex-col items-center gap-3 border-r border-royal-500/20 px-3 py-5 sm:px-4 sm:py-6">
                        <span className="text-2xs font-mono leading-3 tracking-[0.14em] text-royal-500 uppercase">
                          {article.number}
                        </span>
                        <span className="bg-royal-500/30 h-8 w-px sm:h-10" />
                        <div className="flex h-8 w-8 items-center justify-center border border-royal-500/30 text-royal-500/80 sm:h-9 sm:w-9">
                          {iconMap[article.icon] ?? <FileText className="h-4 w-4" />}
                        </div>
                      </div>

                      {/* Right column */}
                      <div className="flex min-w-0 flex-1 flex-col gap-2 px-4 py-4 sm:gap-2.5 sm:px-5 sm:py-5">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <h3 className="font-sans text-[11px] font-bold tracking-[0.14em] text-white/92 uppercase">
                            {article.title}
                          </h3>
                          <span className="text-2xs font-mono leading-3 tracking-[0.12em] text-royal-500 shrink-0">
                            {article.date}
                          </span>
                        </div>

                        <p className="font-serif text-xs leading-relaxed text-neutral-500 italic sm:text-[13px]">
                          {article.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                          {article.tags.map((tag) => (
                            <span
                              key={tag}
                              className="font-mono text-[9px] border border-royal-500/[0.27] px-1.5 py-0.5 tracking-[0.1em] text-royal-500 uppercase"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Corner TL */}
      <div className="border-royal-500/45 absolute top-24 left-8 hidden h-3.5 w-3.5 border-t border-l lg:left-14 lg:block 3xl:left-20" />
      {/* Corner BR */}
      <div className="border-neural-400/30 absolute right-8 bottom-16 hidden h-3.5 w-3.5 border-r border-b lg:right-14 lg:block 3xl:right-20" />

      {/* Coordinates */}
      <div className="absolute top-24 left-8 mt-6 hidden flex-col gap-0.5 lg:left-14 lg:flex 3xl:left-20">
        <span className="text-3xs text-royal-500/40 font-mono leading-3 tracking-[0.14em] uppercase 3xl:text-2xs">
          {strings.coordinates}
        </span>
        <span className="text-3xs text-royal-500/20 font-mono leading-3 tracking-[0.14em] uppercase 3xl:text-2xs">
          SYS_BOOT :: v2.4.1
        </span>
      </div>

      {/* Archive label bottom right */}
      <div className="absolute right-8 bottom-10 hidden items-center gap-2 lg:right-14 lg:flex 3xl:right-20">
        <span className="text-2xs font-mono leading-3 tracking-[0.14em] text-neutral-600 uppercase">
          {strings.archiveLabel}
        </span>
        <span className="bg-royal-500/35 block h-px w-10" />
      </div>

      {/* Rotated label */}
      <div className="absolute top-1/2 right-8 hidden -translate-y-1/2 lg:right-14 2xl:flex 3xl:right-20">
        <span className="text-2xs text-royal-500/18 origin-center -rotate-90 font-mono leading-3 tracking-[0.14em] whitespace-nowrap uppercase">
          {strings.rotatedLabel}
        </span>
      </div>
    </section>
  );
}
