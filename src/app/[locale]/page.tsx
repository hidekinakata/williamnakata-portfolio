import PageLayout from "@/components/layouts/PageLayout";
import HeroSection from "@/components/sections/hero";
import AboutSection from "@/components/sections/about";
import ExperienceSection from "@/components/sections/experience";
import ProjectsSection from "@/components/sections/projects";

export default function Home() {
  return (
    <PageLayout>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
    </PageLayout>
  );
}