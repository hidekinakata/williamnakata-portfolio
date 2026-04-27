export default function SectionLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="bg-royal-500 h-px w-8 shrink-0" />
      <span className="bg-royal-500 h-1.5 w-1.5 shrink-0 rotate-45" />
      <span className="text-2xs 3xl:text-xs text-royal-500 font-mono leading-3 font-medium tracking-[0.18em] uppercase">
        {children}
      </span>
    </div>
  );
}
