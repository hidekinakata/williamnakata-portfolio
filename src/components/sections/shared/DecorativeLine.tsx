export default function DecorativeLine({ width = "max-w-26 lg:max-w-105" }: { width?: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-px w-8 bg-royal-500 shrink-0" />
      <span className="h-1 w-1 shrink-0 rotate-45 bg-royal-500" />
      <span className="h-1 w-1 shrink-0 rotate-45 bg-royal-500/30" />
      <span className={`h-px ${width} bg-gradient-to-r from-royal-500/40 to-transparent`} />
    </div>
  );
}
