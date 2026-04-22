import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PostHeaderProps {
  slug: string;
  title: string;
  locale: string;
}

export default function PostHeader({ slug, title, locale }: PostHeaderProps) {
  const t = useTranslations("Article");

  const words = title.split(" ");
  const mid = Math.ceil(words.length / 2);
  const line1 = words.slice(0, mid).join(" ");
  const line2 = words.slice(mid).join(" ");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="h-px w-8 bg-white/10" />
        <div className="flex items-center gap-1.5">
          <div className="h-1 w-1 rounded-full bg-royal-500" />
          <div className="h-1 w-1 rounded-full bg-royal-500/50" />
          <div className="h-1 w-1 rounded-full bg-royal-500/25" />
        </div>
        <span className="font-mono text-2xs tracking-[0.12em] text-royal-500 uppercase">
          {t("breadcrumb")}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-4 font-mono text-2xs tracking-[0.1em]">
        <Link
          href={`/${locale}/articles`}
          className="flex items-center gap-1.5 text-neutral-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-3 w-3" />
          /blog
        </Link>
        <span className="flex items-center gap-1.5 text-royal-500">
          <ArrowRight className="h-3 w-3" />
          /{slug}
        </span>
      </div>

      <h1 className="font-sans-decorated text-4xl font-black tracking-tight text-white/92 uppercase sm:text-5xl lg:text-[64px]">
        <span className="block">{line1}</span>
        <span className="block text-royal-500">{line2}</span>
      </h1>
    </div>
  );
}
