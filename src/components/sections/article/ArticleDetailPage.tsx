import { Article, getRelatedArticles } from "@/lib/articles";
import { getTranslations } from "next-intl/server";
import PostHeader from "./PostHeader";
import PostMeta from "./PostMeta";
import ArticleContent from "./ArticleContent";
import Sidebar from "./Sidebar";
import ArticleEnd from "./ArticleEnd";

interface ArticleDetailPageProps {
  article: Article;
  locale: string;
}

export default async function ArticleDetailPage({ article, locale }: ArticleDetailPageProps) {
  const t = await getTranslations("Article");
  const relatedArticles = getRelatedArticles(article.slug, article.relatedSlugs);

  const sidebarStrings = {
    tableOfContents: t("tableOfContents"),
    readingProgress: t("readingProgress"),
    section: t("section"),
    of: t("of"),
    minLeft: t("minLeft"),
    author: t("author"),
    authorName: t("authorName"),
    authorRole: t("authorRole"),
    related: t("related"),
  };

  const articleEndStrings = {
    backToBlog: t("backToBlog"),
    shareArticle: t("shareArticle"),
  };

  return (
    <section className="relative flex min-h-svh w-full flex-col items-center overflow-hidden pt-20 pb-16">
      <div className="relative z-10 mx-auto w-full max-w-[1520px] px-6 sm:px-8 lg:px-14 xl:px-16 3xl:max-w-[1640px] 3xl:px-20 4xl:max-w-[1780px] 4xl:px-24">
        <div className="flex flex-col gap-8">
          <PostHeader slug={article.slug} title={article.title} locale={locale} />

          <PostMeta date={article.date} readTime={article.readTime} tags={article.tags} />

          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            <div className="flex-1 min-w-0">
              <ArticleContent article={article} />
            </div>

            <div className="hidden lg:block">
              <div className="sticky top-24">
                <Sidebar
                  sections={article.sections}
                  readTime={article.readTime}
                  relatedArticles={relatedArticles}
                  locale={locale}
                  strings={sidebarStrings}
                />
              </div>
            </div>
          </div>

          <div className="pt-8">
            <ArticleEnd locale={locale} strings={articleEndStrings} />
          </div>
        </div>
      </div>
    </section>
  );
}
