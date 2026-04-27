import { cn } from "@/lib/utils";

export interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  fullHeight?: boolean;
}

export default function Section({
  children,
  className,
  id,
  fullHeight = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full overflow-hidden",
        fullHeight
          ? "flex min-h-svh flex-col justify-center pt-28 pb-12 sm:pt-32 sm:pb-20 lg:pt-28 lg:pb-28 xl:min-h-[108svh] xl:pt-32 xl:pb-32"
          : "3xl:py-32 py-16 lg:py-24",
        className,
      )}
    >
      {children}
    </section>
  );
}

Section.ColumnLayout = function ColumnLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="3xl:max-w-410 3xl:px-20 4xl:max-w-445 4xl:px-24 relative z-10 mx-auto w-full max-w-380 px-6 sm:px-8 lg:px-14 xl:px-16">
      <div
        className={cn(
          "flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-14 2xl:gap-20",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};

Section.LeftColumn = function LeftColumn({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex min-w-0 shrink-0 flex-col gap-6", className)}>
      {children}
    </div>
  );
};

Section.RightColumn = function RightColumn({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex min-w-0 grow flex-col", className)}>
      {children}
    </div>
  );
};
