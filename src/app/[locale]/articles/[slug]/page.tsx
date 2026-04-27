import { notFound } from "next/navigation";
import { getArticleBySlug, getRelatedArticles, getAllArticleSlugs } from "@/lib/articles";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import ArticleDetailPage from "@/components/views/ArticleDetailPage";

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const [article, relatedArticles, t] = await Promise.all([
    getArticleBySlug(slug, locale),
    (async () => {
      const a = await getArticleBySlug(slug, locale);
      return a ? getRelatedArticles(a.slug, a.relatedSlugs, locale) : [];
    })(),
    getTranslations("Article"),
  ]);

  if (!article) {
    notFound();
  }

  const articleStrings = {
    breadcrumb: t("breadcrumb"),
    backToBlog: t("backToBlog"),
    shareArticle: t("shareArticle"),
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

  return (
    <ArticleDetailPage
      article={article}
      locale={locale}
      relatedArticles={relatedArticles}
      strings={articleStrings}
    />
  );
}
