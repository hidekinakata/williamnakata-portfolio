import { Article } from "@/lib/articles";
import PostHeader from "./PostHeader";
import PostMeta from "./PostMeta";
import ArticleContent from "./ArticleContent";
import Sidebar from "./Sidebar";
import ArticleEnd from "./ArticleEnd";
import { getRelatedArticles } from "@/lib/articles";

interface ArticleDetailPageProps {
  article: Article;
  locale: string;
}

export default function ArticleDetailPage({ article, locale }: ArticleDetailPageProps) {
  const relatedArticles = getRelatedArticles(article.slug, article.relatedSlugs);

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
                />
              </div>
            </div>
          </div>

          <div className="pt-8">
            <ArticleEnd locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}
