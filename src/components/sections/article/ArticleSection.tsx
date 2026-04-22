import { ContentBlock, ArticleSection as ArticleSectionType } from "@/lib/articles";
import CodeBlock from "./CodeBlock";
import PullQuote from "./PullQuote";
import NumberedList from "./NumberedList";

function BlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="font-sans text-sm leading-[1.8] text-neutral-400">
          {block.text}
        </p>
      );
    case "code":
      return (
        <CodeBlock
          filename={block.filename}
          language={block.language}
          code={block.code}
        />
      );
    case "quote":
      return (
        <PullQuote text={block.text} author={block.author} year={block.year} />
      );
    case "numberedList":
      return <NumberedList items={block.items} />;
    default:
      return null;
  }
}

interface ArticleSectionProps {
  section: ArticleSectionType;
}

export default function ArticleSection({ section }: ArticleSectionProps) {
  return (
    <section id={section.id} className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <span className="font-mono text-sm text-royal-500">
          {section.number}
        </span>
        <div className="h-6 w-px bg-white/10" />
        <h2 className="font-sans-decorated text-xl font-bold tracking-tight text-white/92 sm:text-2xl lg:text-[28px]">
          {section.title}
        </h2>
      </div>

      <div className="flex flex-col gap-6">
        {section.blocks.map((block, index) => (
          <BlockRenderer key={`${section.id}-block-${index}`} block={block} />
        ))}
      </div>
    </section>
  );
}
