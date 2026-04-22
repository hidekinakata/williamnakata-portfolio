"use server";

import { prisma } from "@/lib/prisma";
import { Language } from "@db/enums";
import { revalidatePath } from "next/cache";
import type { Prisma } from "@db/client";

export async function getArticles() {
  try {
    return await prisma.article.findMany({
      include: {
        translations: true,
        tags: { include: { tag: true } },
      },
      orderBy: { publishedAt: { sort: "desc", nulls: "last" } },
    });
  } catch (error) {
    console.error("Erro ao buscar artigos:", error);
    return [];
  }
}

export async function getArticleById(id: string) {
  try {
    return await prisma.article.findUnique({
      where: { id },
      include: {
        translations: true,
        tags: { include: { tag: true } },
      },
    });
  } catch (error) {
    console.error("Erro ao buscar artigo:", error);
    return null;
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

export type ArticleFormData = {
  slug: string;
  number: string;
  icon: string;
  readTime: string;
  relatedSlugs: string[];
  published: boolean;
  publishedAt: Date | null;
  tagIds: string[];
  translations: {
    language: Language;
    title: string;
    intro: string;
    sections: Prisma.InputJsonValue;
  }[];
};

export async function createArticle(formData: ArticleFormData) {
  try {
    await prisma.article.create({
      data: {
        slug: formData.slug,
        number: formData.number,
        icon: formData.icon,
        readTime: formData.readTime,
        relatedSlugs: formData.relatedSlugs,
        published: formData.published,
        publishedAt: formData.publishedAt,
        tags: {
          create: formData.tagIds.map((tagId) => ({ tagId })),
        },
        translations: {
          create: formData.translations.map((t) => ({
            language: t.language,
            title: t.title,
            intro: t.intro,
            sections: t.sections,
          })),
        },
      },
    });
    revalidatePath("/kirby-admin/panel/articles");
    revalidatePath("/");
    revalidatePath("/articles");
    return { success: true };
  } catch (error) {
    console.error("Erro ao criar artigo:", error);
    return { success: false, error: "Falha ao criar artigo" };
  }
}

export async function updateArticle(id: string, formData: ArticleFormData) {
  try {
    await prisma.article.update({
      where: { id },
      data: {
        slug: formData.slug,
        number: formData.number,
        icon: formData.icon,
        readTime: formData.readTime,
        relatedSlugs: formData.relatedSlugs,
        published: formData.published,
        publishedAt: formData.publishedAt,
        tags: {
          deleteMany: {},
          create: formData.tagIds.map((tagId) => ({ tagId })),
        },
        translations: {
          deleteMany: {},
          create: formData.translations.map((t) => ({
            language: t.language,
            title: t.title,
            intro: t.intro,
            sections: t.sections,
          })),
        },
      },
    });
    revalidatePath("/kirby-admin/panel/articles");
    revalidatePath("/");
    revalidatePath("/articles");
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar artigo:", error);
    return { success: false, error: "Falha ao atualizar artigo" };
  }
}

export async function deleteArticle(id: string) {
  try {
    await prisma.article.delete({ where: { id } });
    revalidatePath("/kirby-admin/panel/articles");
    revalidatePath("/");
    revalidatePath("/articles");
    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar artigo:", error);
    return { success: false, error: "Falha ao deletar artigo" };
  }
}

export async function togglePublish(id: string) {
  try {
    const article = await prisma.article.findUnique({
      where: { id },
      select: { published: true },
    });
    if (!article) throw new Error("Artigo não encontrado");
    await prisma.article.update({
      where: { id },
      data: {
        published: !article.published,
        publishedAt: !article.published ? new Date() : null,
      },
    });
    revalidatePath("/kirby-admin/panel/articles");
    revalidatePath("/");
    revalidatePath("/articles");
    return { success: true };
  } catch (error) {
    console.error("Erro ao alternar publicação:", error);
    return { success: false, error: "Falha ao alternar publicação" };
  }
}
