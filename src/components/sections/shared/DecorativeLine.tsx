export default function DecorativeLine({
  width = "max-w-26 lg:max-w-105",
}: {
  width?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="bg-royal-500 h-px w-8 shrink-0" />
      <span className="bg-royal-500 h-1 w-1 shrink-0 rotate-45" />
      <span className="bg-royal-500/30 h-1 w-1 shrink-0 rotate-45" />
      <span
        className={`h-px ${width} from-royal-500/40 bg-gradient-to-r to-transparent`}
      />
    </div>
  );
}
