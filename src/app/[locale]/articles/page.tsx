import { getArticles, getAllTags } from "@/lib/articles";
import ArticlesPage from "@/components/views/ArticlesPage";
import { getTranslations } from "next-intl/server";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [articles, allTags, t] = await Promise.all([
    getArticles(locale),
    getAllTags(locale),
    getTranslations("Blog"),
  ]);

  const blogStrings = {
    label: t("label"),
    heading1: t("heading1"),
    heading2: t("heading2"),
    subtitle: t("subtitle"),
    ctaPrimary: t("ctaPrimary"),
    ctaSecondary: t("ctaSecondary"),
    badge: t("badge"),
    searchPlaceholder: t("searchPlaceholder"),
    filterAll: t("filterAll"),
    empty: t("empty"),
    coordinates: t("coordinates"),
    rotatedLabel: t("rotatedLabel"),
    archiveLabel: t("archiveLabel"),
  };

  return (
    <ArticlesPage
      articles={articles}
      allTags={allTags}
      locale={locale}
      strings={blogStrings}
    />
  );
}
