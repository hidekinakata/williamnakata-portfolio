export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-8 bg-royal-500 shrink-0" />
      <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-royal-500" />
      <span className="font-mono text-2xs 3xl:text-xs leading-3 font-medium tracking-[0.18em] uppercase text-royal-500">
        {children}
      </span>
    </div>
  );
}
