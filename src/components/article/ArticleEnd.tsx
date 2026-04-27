"use client";

import { Link } from "@/i18n/navigation";
import { Share2, ArrowLeft } from "lucide-react";

interface ArticleEndStrings {
  backToBlog: string;
  shareArticle: string;
}

interface ArticleEndProps {
  strings: ArticleEndStrings;
}

export default function ArticleEnd({ strings }: ArticleEndProps) {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex w-full items-center gap-4">
        <div
          className="h-px flex-1 bg-white/[0.07]"
          style={{ maxWidth: "320px" }}
        />
        <div className="bg-royal-500 h-1 w-1 shrink-0" />
        <div
          className="h-px flex-1 bg-white/[0.07]"
          style={{ maxWidth: "320px" }}
        />
      </div>

      <div className="relative z-20 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/articles"
          className="bg-royal-500 relative flex items-center gap-2 px-7 py-3 font-sans text-[11px] font-bold tracking-[0.15em] text-white uppercase transition-all hover:opacity-90 active:scale-95"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {strings.backToBlog}
        </Link>
        <button
          type="button"
          onClick={async () => {
            if (typeof navigator !== "undefined" && navigator.share) {
              try {
                const shareData: ShareData = {
                  title: document.title,
                  text: document.title,
                  url: window.location.href,
                };

                await navigator.share(shareData);
              } catch (error) {
                if ((error as Error).name !== "AbortError") {
                  console.error("Error sharing:", error);
                }
              }
            } else {
              try {
                if (typeof navigator !== "undefined" && navigator.clipboard) {
                  await navigator.clipboard.writeText(window.location.href);
                  alert("Link copiado!");
                } else {
                  // Fallback for non-secure contexts
                  const textArea = document.createElement("textarea");
                  textArea.value = window.location.href;
                  document.body.appendChild(textArea);
                  textArea.select();
                  document.execCommand("copy");
                  document.body.removeChild(textArea);
                  alert("Link copiado!");
                }
              } catch (error) {
                console.error("Error copying to clipboard:", error);
              }
            }
          }}
          className="border-royal-500/[0.27] relative z-30 flex cursor-pointer items-center gap-2 border px-7 py-3 font-sans text-[11px] font-medium tracking-[0.15em] text-neutral-400 uppercase transition-all hover:text-white active:scale-95 active:text-white"
        >
          <Share2 className="h-3.5 w-3.5" />
          {strings.shareArticle}
        </button>
      </div>
    </div>
  );
}
