"use server";

import { prisma } from "@/lib/prisma";
import { Language, ProjectType } from "@db/enums";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";

export async function getProjects() {
  try {
    return await prisma.project.findMany({
      include: {
        translations: true,
        tags: { include: { tag: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
    return [];
  }
}

export async function getTags() {
  try {
    return await prisma.tag.findMany({ orderBy: { name: "asc" } });
  } catch (error) {
    console.error("Erro ao buscar tags:", error);
    return [];
  }
}

export async function upsertTag(name: string) {
  const slug = name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  try {
    const tag = await prisma.tag.upsert({
      where: { slug },
      update: {},
      create: { name, slug },
    });
    return { success: true, tag };
  } catch (error) {
    console.error("Erro ao criar tag:", error);
    return { success: false, error: "Falha ao criar tag" };
  }
}

export async function deleteTag(id: string) {
  try {
    await prisma.tag.delete({ where: { id } });
    revalidatePath("/kirby-admin/panel/projects");
    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar tag:", error);
    return { success: false, error: "Falha ao deletar tag" };
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
  type: ProjectType;
  imageUrl: string;
  link: string;
  github: string;
  tagIds: string[];
  translations: { language: Language; title: string; description: string }[];
}) {
  try {
    await prisma.project.create({
      data: {
        type: formData.type,
        imageUrl: formData.imageUrl || null,
        link: formData.link || null,
        github: formData.github || null,
        tags: {
          create: formData.tagIds.map((tagId) => ({ tagId })),
        },
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
    type: ProjectType;
    imageUrl: string;
    link: string;
    github: string;
    tagIds: string[];
    translations: { language: Language; title: string; description: string }[];
  },
) {
  try {
    await prisma.project.update({
      where: { id },
      data: {
        type: formData.type,
        imageUrl: formData.imageUrl || null,
        link: formData.link || null,
        github: formData.github || null,
        tags: {
          deleteMany: {},
          create: formData.tagIds.map((tagId) => ({ tagId })),
        },
        translations: {
          deleteMany: {},
          create: formData.translations,
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
