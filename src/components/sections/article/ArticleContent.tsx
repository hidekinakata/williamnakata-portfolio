import { Article } from "@/lib/articles";
import IntroParagraph from "./IntroParagraph";
import ArticleSection from "./ArticleSection";

interface ArticleContentProps {
  article: Article;
}

export default function ArticleContent({ article }: ArticleContentProps) {
  return (
    <div className="flex flex-col gap-12">
      <IntroParagraph intro={article.intro} />

      {article.sections.map((section) => (
        <ArticleSection key={section.id} section={section} />
      ))}
    </div>
  );
}
