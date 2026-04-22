import Link from "next/link";
import { useTranslations } from "next-intl";
import { Article } from "@/lib/articles";

interface RelatedArticlesProps {
  articles: Article[];
  locale: string;
}

export default function RelatedArticles({ articles, locale }: RelatedArticlesProps) {
  const t = useTranslations("Article");

  return (
    <div className="border border-royal-500/[0.13] bg-royal-500/[0.04] p-4">
      <h3 className="mb-3 font-mono text-2xs tracking-[0.12em] text-royal-500 uppercase">
        {t("related")}
      </h3>
      <ul className="flex flex-col gap-2.5">
        {articles.map((article, index) => (
          <li key={article.slug}>
            <Link
              href={`/${locale}/articles/${article.slug}`}
              className="group flex items-start gap-2 transition-colors"
            >
              <div
                className={`mt-1.5 h-1.5 w-1.5 rounded-full transition-colors ${
                  index === 0 ? "bg-royal-500" : "bg-royal-500/30"
                }`}
              />
              <span className="font-sans text-xs leading-[1.5] text-neutral-400 transition-colors group-hover:text-white">
                {article.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
