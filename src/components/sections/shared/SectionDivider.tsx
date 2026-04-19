export default function SectionDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full h-px bg-white/7 ${className}`} />
  );
}
