import { Article } from "@/lib/articles";
import PostHeader from "@/components/article/PostHeader";
import PostMeta from "@/components/article/PostMeta";
import ArticleContent from "@/components/article/ArticleContent";
import Sidebar from "@/components/article/Sidebar";
import ArticleEnd from "@/components/article/ArticleEnd";

interface ArticleDetailStrings {
  breadcrumb: string;
  backToBlog: string;
  shareArticle: string;
  tableOfContents: string;
  readingProgress: string;
  section: string;
  of: string;
  minLeft: string;
  author: string;
  authorName: string;
  authorRole: string;
  related: string;
}

interface ArticleDetailPageProps {
  article: Article;
  locale: string;
  relatedArticles: Article[];
  strings: ArticleDetailStrings;
}

export default function ArticleDetailPage({ article, locale, relatedArticles, strings }: ArticleDetailPageProps) {
  const sidebarStrings = {
    tableOfContents: strings.tableOfContents,
    readingProgress: strings.readingProgress,
    section: strings.section,
    of: strings.of,
    minLeft: strings.minLeft,
    author: strings.author,
    authorName: strings.authorName,
    authorRole: strings.authorRole,
    related: strings.related,
  };

  const endStrings = {
    backToBlog: strings.backToBlog,
    shareArticle: strings.shareArticle,
  };

  return (
    <section className="relative flex min-h-svh w-full flex-col items-center overflow-hidden pt-20 pb-16">
      <div className="relative z-10 mx-auto w-full max-w-[1520px] px-6 sm:px-8 lg:px-14 xl:px-16 3xl:max-w-[1640px] 3xl:px-20 4xl:max-w-[1780px] 4xl:px-24">
        <div className="flex flex-col gap-8">
          <PostHeader slug={article.slug} title={article.title} locale={locale} breadcrumb={strings.breadcrumb} />

          <PostMeta date={article.date} readTime={article.readTime} tags={article.tags} />

          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            <div className="min-w-0 flex-1">
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
            <ArticleEnd strings={endStrings} />
          </div>
        </div>
      </div>
    </section>
  );
}
