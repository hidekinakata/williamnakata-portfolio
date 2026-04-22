import { useTranslations } from "next-intl";

interface AuthorCardProps {
  name: string;
  role: string;
}

export default function AuthorCard({ name, role }: AuthorCardProps) {
  const t = useTranslations("Article");

  return (
    <div className="border border-royal-500/[0.13] bg-royal-500/[0.04] p-4">
      <h3 className="mb-3 font-mono text-2xs tracking-[0.12em] text-royal-500 uppercase">
        {t("author")}
      </h3>
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-royal-500/[0.27] bg-royal-500/[0.13]">
          <span className="font-sans-decorated text-xs font-bold text-royal-500">
            WN
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-sans text-xs font-semibold text-white">
            {name}
          </span>
          <span className="font-mono text-[9px] tracking-[0.08em] text-neutral-500">
            {role}
          </span>
        </div>
      </div>
    </div>
  );
}
