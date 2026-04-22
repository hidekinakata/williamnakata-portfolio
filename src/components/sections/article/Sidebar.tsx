"use client";

import { ArticleSection as ArticleSectionType } from "@/lib/articles";
import { Article } from "@/lib/articles";
import TableOfContents from "./TableOfContents";
import ReadingProgress from "./ReadingProgress";
import AuthorCard from "./AuthorCard";
import RelatedArticles from "./RelatedArticles";
import { useTranslations } from "next-intl";

interface SidebarProps {
  sections: ArticleSectionType[];
  readTime: string;
  relatedArticles: Article[];
  locale: string;
}

export default function Sidebar({ sections, readTime, relatedArticles, locale }: SidebarProps) {
  const t = useTranslations("Article");

  return (
    <aside className="flex w-full flex-col gap-4 lg:w-[280px]">
      <TableOfContents sections={sections} />
      <ReadingProgress sectionsCount={sections.length} readTime={readTime} />
      <AuthorCard name={t("authorName")} role={t("authorRole")} />
      <RelatedArticles articles={relatedArticles} locale={locale} />
    </aside>
  );
}
