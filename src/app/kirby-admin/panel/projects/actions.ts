"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";

export async function getProjects() {
  try {
    return await prisma.project.findMany({
      include: { translations: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
    return [];
  }
}

export async function uploadProjectImage(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) throw new Error("Arquivo não encontrado");

    const supabase = await createAdminClient();
    const fileExt = file.name.split(".").pop();
    const fileName = `project-${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage
      .from("projects")
      .upload(fileName, file);

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from("projects").getPublicUrl(fileName);

    return { success: true, url: publicUrl };
  } catch (error) {
    console.error("Erro no upload da imagem:", error);
    return { success: false, error: "Falha no upload da imagem" };
  }
}

export async function createProject(formData: {
  imageUrl: string;
  link: string;
  github: string;
  tags: string[];
  translations: { language: string; title: string; description: string }[];
}) {
  try {
    await prisma.project.create({
      data: {
        imageUrl: formData.imageUrl || null,
        link: formData.link || null,
        github: formData.github || null,
        tags: formData.tags,
        translations: { create: formData.translations },
      },
    });
    revalidatePath("/kirby-admin/panel/projects");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Erro ao criar projeto:", error);
    return { success: false, error: "Falha ao criar projeto" };
  }
}

export async function updateProject(
  id: string,
  formData: {
    imageUrl: string;
    link: string;
    github: string;
    tags: string[];
    translations: { language: string; title: string; description: string }[];
  },
) {
  try {
    await prisma.project.update({
      where: { id },
      data: {
        imageUrl: formData.imageUrl || null,
        link: formData.link || null,
        github: formData.github || null,
        tags: formData.tags,
        translations: {
          upsert: formData.translations.map((t) => ({
            where: { projectId_language: { projectId: id, language: t.language } },
            update: { title: t.title, description: t.description },
            create: { language: t.language, title: t.title, description: t.description },
          })),
        },
      },
    });
    revalidatePath("/kirby-admin/panel/projects");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar projeto:", error);
    return { success: false, error: "Falha ao atualizar projeto" };
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({ where: { id } });
    revalidatePath("/kirby-admin/panel/projects");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar projeto:", error);
    return { success: false, error: "Falha ao deletar projeto" };
  }
}
