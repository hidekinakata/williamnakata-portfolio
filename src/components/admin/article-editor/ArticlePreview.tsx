"use client";

import type { AdminSection, AdminContentBlock } from "./types";

interface ArticlePreviewProps {
  sections: AdminSection[];
  title?: string;
  intro?: string;
}

function PreviewBlock({ block }: { block: AdminContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-sm leading-relaxed text-neutral-700">
          {block.text}
        </p>
      );
    case "code":
      return (
        <div className="overflow-hidden rounded-lg bg-neutral-900 text-neutral-100">
          <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-2 text-xs text-neutral-400">
            <span>{block.filename || "—"}</span>
            <span className="uppercase">{block.language || "text"}</span>
          </div>
          <pre className="overflow-x-auto p-4 text-xs">
            <code>{block.code}</code>
          </pre>
        </div>
      );
    case "quote":
      return (
        <blockquote className="border-l-4 border-purple-500 pl-4 italic text-neutral-700">
          <p className="text-sm leading-relaxed">{block.text}</p>
          <footer className="mt-2 text-xs text-neutral-500">
            — {block.author}
            {block.year ? `, ${block.year}` : ""}
          </footer>
        </blockquote>
      );
    case "numberedList":
      return (
        <div className="border-l-4 border-purple-200 bg-purple-50/50 p-4">
          <ol className="space-y-2">
            {block.items.map((item, idx) => (
              <li key={idx} className="flex gap-2 text-sm">
                <span className="w-6 shrink-0 font-medium text-purple-700">
                  {item.number}.
                </span>
                <span className="text-neutral-700">{item.text}</span>
              </li>
            ))}
          </ol>
        </div>
      );
    default:
      return null;
  }
}

function PreviewSection({ section, depth = 0 }: { section: AdminSection; depth?: number }) {
  const isSub = depth > 0;
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span
          className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold text-white ${isSub ? "bg-purple-400" : "bg-purple-600"}`}
        >
          {section.number}
        </span>
        <h2
          className={`font-semibold text-neutral-900 ${isSub ? "text-base" : "text-lg"}`}
        >
          {section.title}
        </h2>
      </div>
      <div className={`space-y-3 ${isSub ? "pl-6" : "pl-8"}`}>
        {section.blocks.map((block) => (
          <PreviewBlock key={block.id} block={block} />
        ))}
        {section.subsections?.map((sub) => (
          <PreviewSection key={sub.id} section={sub} depth={depth + 1} />
        ))}
      </div>
    </div>
  );
}

export default function ArticlePreview({ sections, title, intro }: ArticlePreviewProps) {
  return (
    <div className="space-y-6">
      {title && (
        <h1 className="text-2xl font-bold text-neutral-900">{title}</h1>
      )}
      {intro && (
        <p className="italic text-neutral-600">{intro}</p>
      )}
      {sections.map((section) => (
        <PreviewSection key={section.id} section={section} />
      ))}
    </div>
  );
}
