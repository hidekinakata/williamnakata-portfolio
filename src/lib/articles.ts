import { prisma } from "./prisma";
import { mapLocale } from "./data";

export type ContentBlock =
  | { id?: string; type: "paragraph"; text: string }
  | { id?: string; type: "code"; filename: string; language: string; code: string }
  | { id?: string; type: "quote"; text: string; author: string; year: string }
  | { id?: string; type: "numberedList"; items: { number: string; text: string }[] };

export type ArticleSection = {
  id: string;
  number: string;
  title: string;
  blocks: ContentBlock[];
};

export type Article = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  icon: string;
  number: string;
  readTime: string;
  intro: string;
  sections: ArticleSection[];
  relatedSlugs: string[];
};

function formatDate(date: Date | null): string {
  if (!date) return "";
  return date.toISOString().slice(0, 10).replace(/-/g, ".");
}

function parseSections(raw: unknown): ArticleSection[] {
  if (!Array.isArray(raw)) return [];
  return raw as ArticleSection[];
}

export async function getArticles(locale: string): Promise<Article[]> {
  const language = mapLocale(locale);

  const rows = await prisma.article.findMany({
    where: { published: true },
    include: {
      translations: { where: { language } },
      tags: { include: { tag: true } },
    },
    orderBy: { publishedAt: "desc" },
  });

  return rows.map((row) => {
    const t = row.translations[0];
    return {
      slug: row.slug,
      number: row.number,
      icon: row.icon,
      readTime: row.readTime,
      relatedSlugs: row.relatedSlugs,
      date: formatDate(row.publishedAt),
      tags: row.tags.map((at) => at.tag.name),
      title: t?.title ?? "",
      description: parseSections(t?.sections)[0]?.blocks.find((b) => b.type === "paragraph")
        ? (parseSections(t?.sections)[0].blocks.find((b) => b.type === "paragraph") as { type: "paragraph"; text: string }).text.slice(0, 120) + "…"
        : "",
      intro: t?.intro ?? "",
      sections: parseSections(t?.sections),
    };
  });
}

export async function getArticleBySlug(
  slug: string,
  locale: string,
): Promise<Article | null> {
  const language = mapLocale(locale);

  const row = await prisma.article.findUnique({
    where: { slug },
    include: {
      translations: { where: { language } },
      tags: { include: { tag: true } },
    },
  });

  if (!row) return null;

  const t = row.translations[0];
  const sections = parseSections(t?.sections);

  return {
    slug: row.slug,
    number: row.number,
    icon: row.icon,
    readTime: row.readTime,
    relatedSlugs: row.relatedSlugs,
    date: formatDate(row.publishedAt),
    tags: row.tags.map((at) => at.tag.name),
    title: t?.title ?? "",
    description: sections[0]?.blocks.find((b) => b.type === "paragraph")
      ? (sections[0].blocks.find((b) => b.type === "paragraph") as { type: "paragraph"; text: string }).text.slice(0, 120) + "…"
      : "",
    intro: t?.intro ?? "",
    sections,
  };
}

export async function getRelatedArticles(
  currentSlug: string,
  relatedSlugs: string[],
  locale: string,
): Promise<Article[]> {
  if (!relatedSlugs.length) return [];
  const language = mapLocale(locale);

  const rows = await prisma.article.findMany({
    where: { slug: { in: relatedSlugs }, published: true },
    include: {
      translations: { where: { language } },
      tags: { include: { tag: true } },
    },
  });

  return rows
    .filter((r) => r.slug !== currentSlug)
    .map((row) => {
      const t = row.translations[0];
      const sections = parseSections(t?.sections);
      return {
        slug: row.slug,
        number: row.number,
        icon: row.icon,
        readTime: row.readTime,
        relatedSlugs: row.relatedSlugs,
        date: formatDate(row.publishedAt),
        tags: row.tags.map((at) => at.tag.name),
        title: t?.title ?? "",
        description: sections[0]?.blocks.find((b) => b.type === "paragraph")
          ? (sections[0].blocks.find((b) => b.type === "paragraph") as { type: "paragraph"; text: string }).text.slice(0, 120) + "…"
          : "",
        intro: t?.intro ?? "",
        sections,
      };
    });
}

export async function getAllArticleSlugs(): Promise<string[]> {
  const rows = await prisma.article.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return rows.map((r) => r.slug);
}

export async function getAllTags(locale: string): Promise<string[]> {
  const language = mapLocale(locale);

  const rows = await prisma.articleTag.findMany({
    where: { article: { published: true } },
    include: { tag: true, article: { include: { translations: { where: { language } } } } },
    distinct: ["tagId"],
  });

  return [...new Set(rows.map((r) => r.tag.name))].sort();
}
