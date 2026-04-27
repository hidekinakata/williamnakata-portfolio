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
import SectionTitle from "@/components/shared/SectionTitle";
import Section from "@/components/shared/Section";

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

export default function ArticlesPage({
  articles,
  allTags,
  locale,
  strings,
}: ArticlesPageProps) {
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
    <Section fullHeight>
      <Section.ColumnLayout>
        {/* ── LEFT COLUMN ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="flex min-w-0 flex-col gap-4 sm:gap-5"
        >
          <SectionTitle
            label={strings.label}
            title1={strings.heading1}
            title2={strings.heading2}
            subtitle={strings.subtitle}
            variants={fadeInUp}
          />

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
                className="border-royal-500/30 focus:border-royal-500/60 w-full rounded-none border bg-transparent py-2.5 pr-3 pl-9 text-sm text-white/90 transition-colors outline-none placeholder:text-neutral-600"
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
                className={`text-2xs cursor-pointer border px-2.5 py-1 font-mono tracking-[0.12em] uppercase transition-colors ${
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
                  className={`text-2xs cursor-pointer border px-2.5 py-1 font-mono tracking-[0.12em] uppercase transition-colors ${
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
                latestArticle &&
                router.push(`/${locale}/articles/${latestArticle.slug}`)
              }
              className="bg-royal-500 hover:bg-royal-500/85 3xl:px-8 3xl:py-4 flex w-full cursor-pointer items-center justify-center gap-2.5 px-6 py-3.5 transition-all active:scale-[0.98] sm:w-auto"
            >
              <span className="font-sans text-xs font-bold tracking-widest text-white uppercase">
                {strings.ctaPrimary}
              </span>
              <ArrowRight className="3xl:h-5 3xl:w-5 h-4 w-4" />
            </button>
            <button
              onClick={() => {
                document
                  .getElementById("articles-list")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="border-royal-500/[0.27] hover:border-royal-500/50 3xl:px-8 3xl:py-4 flex w-full cursor-pointer items-center justify-center gap-2 border px-6 py-3.5 transition-colors hover:bg-white/[0.03] sm:w-auto"
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
                  <div className="border-t-royal-500/40 border-r-royal-500/[0.13] border-b-royal-500/[0.13] border-l-royal-500 bg-royal-500/[0.03] hover:bg-royal-500/[0.06] flex border-l-2 transition-colors">
                    {/* Left column */}
                    <div className="border-royal-500/20 flex flex-col items-center gap-3 border-r px-3 py-5 sm:px-4 sm:py-6">
                      <span className="text-2xs text-royal-500 font-mono leading-3 tracking-[0.14em] uppercase">
                        {article.number}
                      </span>
                      <span className="bg-royal-500/30 h-8 w-px sm:h-10" />
                      <div className="border-royal-500/30 text-royal-500/80 flex h-8 w-8 items-center justify-center border sm:h-9 sm:w-9">
                        {iconMap[article.icon] ?? (
                          <FileText className="h-4 w-4" />
                        )}
                      </div>
                    </div>

                    {/* Right column */}
                    <div className="flex min-w-0 flex-1 flex-col gap-2 px-4 py-4 sm:gap-2.5 sm:px-5 sm:py-5">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <h3 className="font-sans text-[11px] font-bold tracking-[0.14em] text-white/92 uppercase">
                          {article.title}
                        </h3>
                        <span className="text-2xs text-royal-500 shrink-0 font-mono leading-3 tracking-[0.12em]">
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
                            className="border-royal-500/[0.27] text-royal-500 border px-1.5 py-0.5 font-mono text-[9px] tracking-[0.1em] uppercase"
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
      </Section.ColumnLayout>

      {/* Corner TL */}
      <div className="border-royal-500/45 3xl:left-20 absolute top-24 left-8 hidden h-3.5 w-3.5 border-t border-l lg:left-14 lg:block" />
      {/* Corner BR */}
      <div className="border-neural-400/30 3xl:right-20 absolute right-8 bottom-16 hidden h-3.5 w-3.5 border-r border-b lg:right-14 lg:block" />

      {/* Coordinates */}
      <div className="3xl:left-20 absolute top-24 left-8 mt-6 hidden flex-col gap-0.5 lg:left-14 lg:flex">
        <span className="text-3xs text-royal-500/40 3xl:text-2xs font-mono leading-3 tracking-[0.14em] uppercase">
          {strings.coordinates}
        </span>
        <span className="text-3xs text-royal-500/20 3xl:text-2xs font-mono leading-3 tracking-[0.14em] uppercase">
          SYS_BOOT :: v2.4.1
        </span>
      </div>

      {/* Archive label bottom right */}
      <div className="3xl:right-20 absolute right-8 bottom-10 hidden items-center gap-2 lg:right-14 lg:flex">
        <span className="text-2xs font-mono leading-3 tracking-[0.14em] text-neutral-600 uppercase">
          {strings.archiveLabel}
        </span>
        <span className="bg-royal-500/35 block h-px w-10" />
      </div>

      {/* Rotated label */}
      <div className="3xl:right-20 absolute top-1/2 right-8 hidden -translate-y-1/2 lg:right-14 2xl:flex">
        <span className="text-2xs text-royal-500/18 origin-center -rotate-90 font-mono leading-3 tracking-[0.14em] whitespace-nowrap uppercase">
          {strings.rotatedLabel}
        </span>
      </div>
    </Section>
  );
}
