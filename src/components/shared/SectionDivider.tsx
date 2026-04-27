export default function SectionDivider({
  className = "",
}: {
  className?: string;
}) {
  return <div className={`h-px w-full bg-white/7 ${className}`} />;
}
