import HeroContent from "./HeroContent";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden flex  pt-24 flex-col justify-center">
      <div className="relative h-full z-10 flex flex-col justify-center px-6 sm:px-10 lg:px-13 ">
        <HeroContent />
      </div>
    </section>
  );
}
