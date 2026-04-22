interface AuthorCardProps {
  name: string;
  role: string;
  label: string;
}

export default function AuthorCard({ name, role, label }: AuthorCardProps) {
  return (
    <div className="border border-royal-500/[0.13] bg-royal-500/[0.04] p-4">
      <h3 className="mb-3 font-mono text-2xs tracking-[0.12em] text-royal-500 uppercase">
        {label}
      </h3>
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-royal-500/[0.27] bg-royal-500/[0.13]">
          <span className="font-sans-decorated text-xs font-black text-royal-500">
            WN
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="font-sans text-xs font-semibold text-white/92">
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
