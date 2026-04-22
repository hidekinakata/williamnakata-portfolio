"use client";

import Link from "next/link";
import { Share2, ArrowLeft } from "lucide-react";

interface ArticleEndStrings {
  backToBlog: string;
  shareArticle: string;
}

interface ArticleEndProps {
  locale: string;
  strings: ArticleEndStrings;
}

export default function ArticleEnd({ locale, strings }: ArticleEndProps) {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex w-full items-center gap-4">
        <div className="h-px flex-1 bg-white/[0.07]" style={{ maxWidth: "320px" }} />
        <div className="h-1 w-1 shrink-0 bg-royal-500" />
        <div className="h-px flex-1 bg-white/[0.07]" style={{ maxWidth: "320px" }} />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href={`/${locale}/articles`}
          className="flex items-center gap-2 bg-royal-500 px-7 py-3 font-sans text-[11px] font-bold tracking-[0.15em] text-white uppercase transition-opacity hover:opacity-90"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {strings.backToBlog}
        </Link>
        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title: document.title, url: window.location.href });
            } else {
              navigator.clipboard.writeText(window.location.href);
            }
          }}
          className="flex cursor-pointer items-center gap-2 border border-royal-500/[0.27] px-7 py-3 font-sans text-[11px] font-medium tracking-[0.15em] text-neutral-400 uppercase transition-colors hover:text-white"
        >
          <Share2 className="h-3.5 w-3.5" />
          {strings.shareArticle}
        </button>
      </div>
    </div>
  );
}
