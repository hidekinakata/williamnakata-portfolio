import { notFound } from "next/navigation";
import { getArticleBySlug, articles } from "@/lib/articles";
import { routing } from "@/i18n/routing";
import ArticleDetailPage from "@/components/sections/article/ArticleDetailPage";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    articles.map((article) => ({
      locale,
      slug: article.slug,
    })),
  );
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return <ArticleDetailPage article={article} locale={locale} />;
}
