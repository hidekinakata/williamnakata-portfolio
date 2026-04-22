"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowLeft, Share2 } from "lucide-react";

interface ArticleEndProps {
  locale: string;
}

export default function ArticleEnd({ locale }: ArticleEndProps) {
  const t = useTranslations("Article");

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex items-center gap-4">
        <div className="h-px w-[120px] bg-white/[0.07] sm:w-[200px] lg:w-[320px]" />
        <div className="h-1 w-1 rounded-full bg-royal-500" />
        <div className="h-px w-[120px] bg-white/[0.07] sm:w-[200px] lg:w-[320px]" />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href={`/${locale}/articles`}
          className="flex items-center gap-2 bg-royal-500 px-7 py-3 font-sans text-[11px] font-bold tracking-[0.15em] text-white uppercase transition-opacity hover:opacity-90"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {t("backToBlog")}
        </Link>
        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: document.title,
                url: window.location.href,
              });
            } else {
              navigator.clipboard.writeText(window.location.href);
            }
          }}
          className="flex cursor-pointer items-center gap-2 border border-royal-500/[0.27] px-7 py-3 font-sans text-[11px] font-bold tracking-[0.15em] text-neutral-400 uppercase transition-colors hover:text-white"
        >
          <Share2 className="h-3.5 w-3.5" />
          {t("shareArticle")}
        </button>
      </div>
    </div>
  );
}
