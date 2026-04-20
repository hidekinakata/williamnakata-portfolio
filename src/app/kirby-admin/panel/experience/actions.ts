"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getExperiences() {
  try {
    return await prisma.experience.findMany({
      include: { translations: true },
      orderBy: { startDate: "desc" },
    });
  } catch (error) {
    console.error("Erro ao buscar experiências:", error);
    return [];
  }
}

export async function createExperience(formData: {
  company: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  translations: { language: string; position: string; description: string }[];
}) {
  try {
    await prisma.experience.create({
      data: {
        company: formData.company,
        startDate: new Date(formData.startDate),
        endDate: formData.endDate ? new Date(formData.endDate) : null,
        current: formData.current,
        translations: {
          create: formData.translations,
        },
      },
    });
    revalidatePath("/kirby-admin/panel/experience");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Erro ao criar experiência:", error);
    return { success: false, error: "Falha ao criar experiência" };
  }
}

export async function updateExperience(
  id: string,
  formData: {
    company: string;
    startDate: string;
    endDate: string | null;
    current: boolean;
    translations: { language: string; position: string; description: string }[];
  },
) {
  try {
    await prisma.experience.update({
      where: { id },
      data: {
        company: formData.company,
        startDate: new Date(formData.startDate),
        endDate: formData.endDate ? new Date(formData.endDate) : null,
        current: formData.current,
        translations: {
          upsert: formData.translations.map((t) => ({
            where: { experienceId_language: { experienceId: id, language: t.language } },
            update: { position: t.position, description: t.description },
            create: { language: t.language, position: t.position, description: t.description },
          })),
        },
      },
    });
    revalidatePath("/kirby-admin/panel/experience");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar experiência:", error);
    return { success: false, error: "Falha ao atualizar experiência" };
  }
}

export async function deleteExperience(id: string) {
  try {
    await prisma.experience.delete({ where: { id } });
    revalidatePath("/kirby-admin/panel/experience");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar experiência:", error);
    return { success: false, error: "Falha ao deletar experiência" };
  }
}
