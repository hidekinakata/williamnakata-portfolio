import HeroContent from "./HeroContent";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden pt-24 pb-24 lg:pt-28 lg:pb-28 xl:min-h-[108svh] xl:pt-32 xl:pb-32 3xl:min-h-[110svh] 3xl:pt-36 3xl:pb-36">
      <div className="relative z-10 mx-auto w-full max-w-[1520px] px-6 sm:px-8 lg:px-14 xl:px-16 3xl:max-w-[1640px] 3xl:px-20 4xl:max-w-[1780px] 4xl:px-24">
        <HeroContent />
      </div>

      {/* Corner TL */}
      <div className="absolute top-24 left-8 lg:left-14 3xl:left-20 hidden lg:block border-t border-l border-royal-500/45 h-3.5 w-3.5" />
      {/* Corner BR */}
      <div className="absolute bottom-16 right-8 lg:right-14 3xl:right-20 hidden lg:block border-b border-r border-neural-400/30 h-3.5 w-3.5" />

      {/* Coordinates */}
      <div className="absolute top-24 left-8 lg:left-14 3xl:left-20 hidden lg:flex flex-col gap-0.5 mt-6">
        <span className="font-mono text-3xs 3xl:text-2xs leading-3 tracking-[0.14em] uppercase text-royal-500/35">
          35.6762° N · 139.6503° E
        </span>
        <span className="font-mono text-3xs 3xl:text-2xs leading-3 tracking-[0.14em] uppercase text-royal-500/20">
          SYS_BOOT :: v2.4.1
        </span>
      </div>

      {/* Available for work */}
      <div className="absolute bottom-24 left-8 lg:left-14 3xl:left-20 hidden lg:flex items-center gap-2 rounded-full bg-royal-500/8 border border-royal-500/28 py-1.5 px-4">
        <span className="h-1.5 w-1.5 rounded-full bg-royal-500" />
        <span className="font-mono text-2xs 3xl:text-xs leading-3 tracking-[0.18em] uppercase text-royal-400">
          Available for work
        </span>
      </div>

      {/* Scroll */}
      <div className="absolute bottom-10 right-8 lg:right-14 3xl:right-20 hidden lg:flex items-center gap-2">
        <span className="font-mono text-2xs leading-3 tracking-[0.14em] uppercase text-neutral-700">
          Scroll
        </span>
        <span className="block w-10 h-px bg-royal-500/40" />
      </div>

      {/* Rotated label */}
      <div className="absolute right-8 lg:right-14 3xl:right-20 top-1/2 -translate-y-1/2 hidden 2xl:flex">
        <span className="font-mono text-2xs leading-3 tracking-[0.14em] uppercase text-royal-500/20 -rotate-90 origin-center whitespace-nowrap">
          Neural · Interface · Design
        </span>
      </div>
    </section>
  );
}
