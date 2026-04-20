import PageLayout from "@/components/layouts/PageLayout";
import HeroSection from "@/components/sections/hero";
import AboutSection from "@/components/sections/about";
import ExperienceSection from "@/components/sections/experience";
import ProjectsSection from "@/components/sections/projects";
import { getExperiences, getProjects } from "@/lib/data";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [experiences, projects] = await Promise.all([
    getExperiences(locale),
    getProjects(locale),
  ]);

  return (
    <PageLayout>
      <HeroSection />
      <AboutSection />
      <ExperienceSection experiences={experiences} />
      <ProjectsSection projects={projects} />
    </PageLayout>
  );
}
