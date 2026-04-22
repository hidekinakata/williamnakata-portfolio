import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

interface PostHeaderProps {
  slug: string;
  title: string;
  locale: string;
}

export default async function PostHeader({ slug, title }: PostHeaderProps) {
  const t = await getTranslations("Article");

  const words = title.split(" ");
  const mid = Math.ceil(words.length / 2);
  const line1 = words.slice(0, mid).join(" ");
  const line2 = words.slice(mid).join(" ");

  return (
    <div className="flex flex-col gap-6 pt-8">
      <div className="flex items-center gap-3">
        <div className="h-px w-6 shrink-0 bg-royal-500" />
        <div className="h-1 w-1 shrink-0 bg-royal-500" />
        <div className="h-1 w-1 shrink-0 bg-royal-500" />
        <span className="font-mono text-2xs tracking-[0.18em] text-royal-500 uppercase">
          {t("breadcrumb")}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-3 font-mono text-2xs tracking-[0.1em]">
        <Link
          href="/articles"
          className="flex items-center gap-1.5 text-neutral-500 transition-colors hover:text-neutral-300"
        >
          <ArrowRight className="h-3 w-3" />
          /blog
        </Link>
        <ArrowRight className="h-3 w-3 text-royal-500" />
        <span className="font-medium text-royal-500">/{slug}</span>
      </div>

      <h1 className="font-sans-decorated text-4xl font-black tracking-tight uppercase sm:text-5xl lg:text-[64px] lg:leading-[0.9]">
        <span className="block text-white/92">{line1}</span>
        <span className="block text-royal-500">{line2}</span>
      </h1>
    </div>
  );
}
