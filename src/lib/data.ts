import { prisma } from "./prisma";
import { Language } from "@db/enums";

export function mapLocale(locale: string): Language {
  return locale === "pt" ? Language.pt_BR : Language.en;
}

export type ExperienceRole = {
  id: string;
  position: string;
  description: string;
  startDate: Date;
  endDate: Date | null;
  current: boolean;
};

export type ExperienceGroup = {
  company: string;
  startDate: Date;
  endDate: Date | null;
  current: boolean;
  roles: ExperienceRole[];
};

export async function getExperiences(
  locale: string,
): Promise<ExperienceGroup[]> {
  const language = mapLocale(locale);

  const experiences = await prisma.experience.findMany({
    include: {
      translations: {
        where: { language },
      },
    },
    orderBy: { startDate: "desc" },
  });

  const groups = new Map<string, ExperienceGroup>();

  for (const exp of experiences) {
    const role: ExperienceRole = {
      id: exp.id,
      position: exp.translations[0]?.position || "",
      description: exp.translations[0]?.description || "",
      startDate: exp.startDate,
      endDate: exp.endDate,
      current: exp.current,
    };

    const existing = groups.get(exp.company);
    if (existing) {
      existing.roles.push(role);
      if (exp.current) existing.current = true;
      if (exp.startDate < existing.startDate)
        existing.startDate = exp.startDate;
      if (!existing.current) {
        if (
          !existing.endDate ||
          (exp.endDate && exp.endDate > existing.endDate)
        ) {
          existing.endDate = exp.endDate;
        }
      }
    } else {
      groups.set(exp.company, {
        company: exp.company,
        startDate: exp.startDate,
        endDate: exp.endDate,
        current: exp.current,
        roles: [role],
      });
    }
  }

  return Array.from(groups.values()).sort((a, b) => {
    if (a.current && !b.current) return -1;
    if (!a.current && b.current) return 1;
    return b.startDate.getTime() - a.startDate.getTime();
  });
}

export async function getProjects(locale: string) {
  const language = mapLocale(locale);
  const projects = await prisma.project.findMany({
    include: {
      translations: { where: { language } },
      tags: { include: { tag: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  return projects.map((proj) => ({
    id: proj.id,
    type: proj.type,
    title: proj.translations[0]?.title || "",
    description: proj.translations[0]?.description || "",
    imageUrl: proj.imageUrl || "",
    link: proj.link || "",
    github: proj.github || "",
    tags: proj.tags.map((pt) => pt.tag.name),
  }));
}
