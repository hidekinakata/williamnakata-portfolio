import SectionLabel from "./SectionLabel";
import DecorativeLine from "./DecorativeLine";

export interface SectionTextHeaderProps {
  label: string;
  title1: string;
  title2?: string;
  subtitle: string;
  className?: string;
}

export default function SectionTextHeader({
  label,
  title1,
  title2,
  subtitle,
  className,
}: SectionTextHeaderProps) {
  return (
    <div className={className}>
      <SectionLabel>{label}</SectionLabel>
      <h2 className="font-sans-decorated 3xl:text-8xl text-5xl leading-tight font-black tracking-tight text-white/92 uppercase sm:text-6xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
        {title1}
      </h2>
      {title2 && (
        <h2 className="font-sans-decorated 3xl:text-9xl text-royal-500 -mt-2 text-5xl leading-none font-black tracking-tight uppercase sm:text-7xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
          {title2}
        </h2>
      )}
      <DecorativeLine />
      <p className="max-w-sm font-serif text-sm leading-relaxed text-neutral-500 italic">
        {subtitle}
      </p>
    </div>
  );
}
