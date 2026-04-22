import { ArticleSection as ArticleSectionType, Article } from "@/lib/articles";
import TableOfContents from "./TableOfContents";
import ReadingProgress from "./ReadingProgress";
import AuthorCard from "./AuthorCard";
import RelatedArticles from "./RelatedArticles";

interface SidebarStrings {
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

interface SidebarProps {
  sections: ArticleSectionType[];
  readTime: string;
  relatedArticles: Article[];
  locale: string;
  strings: SidebarStrings;
}

export default function Sidebar({ sections, readTime, relatedArticles, locale, strings }: SidebarProps) {
  return (
    <aside className="flex w-full flex-col gap-4 lg:w-[280px]">
      <TableOfContents sections={sections} label={strings.tableOfContents} />
      <ReadingProgress
        sectionsCount={sections.length}
        readTime={readTime}
        label={strings.readingProgress}
        sectionLabel={strings.section}
        ofLabel={strings.of}
        minLeftLabel={strings.minLeft}
      />
      <AuthorCard
        name={strings.authorName}
        role={strings.authorRole}
        label={strings.author}
      />
      <RelatedArticles
        articles={relatedArticles}
        locale={locale}
        label={strings.related}
      />
    </aside>
  );
}
