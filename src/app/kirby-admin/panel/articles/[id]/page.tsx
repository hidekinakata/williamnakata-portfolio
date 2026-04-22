"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ChevronUp,
  GripVertical,
  Loader2,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { Language } from "@db/enums";
import {
  getArticleById,
  getTags,
  upsertTag,
  createArticle,
  updateArticle,
} from "../actions";
import type { ArticleFormData } from "../actions";

type ContentBlock =
  | { id: string; type: "paragraph"; text: string }
  | {
      id: string;
      type: "code";
      filename: string;
      language: string;
      code: string;
    }
  | { id: string; type: "quote"; text: string; author: string; year: string }
  | { id: string; type: "numberedList"; items: { number: string; text: string }[] };

type Section = {
  id: string;
  number: string;
  title: string;
  blocks: ContentBlock[];
};

type TranslationForm = {
  language: Language;
  title: string;
  intro: string;
  sections: Section[];
};

type TagOption = { id: string; name: string; slug: string };

type ArticleForm = {
  slug: string;
  number: string;
  icon: string;
  readTime: string;
  relatedSlugs: string;
  published: boolean;
  publishedAt: string;
  tagIds: string[];
  tagSearch: string;
  translations: TranslationForm[];
};

const ICON_OPTIONS = [
  { value: "brain", label: "Brain" },
  { value: "code-2", label: "Code" },
  { value: "palette", label: "Palette" },
  { value: "server", label: "Server" },
  { value: "file-text", label: "File Text" },
];

const BLOCK_TYPES = [
  { value: "paragraph", label: "Parágrafo" },
  { value: "code", label: "Código" },
  { value: "quote", label: "Citação" },
  { value: "numberedList", label: "Lista Numerada" },
] as const;

function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function createEmptyBlock(type: ContentBlock["type"] = "paragraph"): ContentBlock {
  const id = generateId();
  switch (type) {
    case "paragraph":
      return { id, type: "paragraph", text: "" };
    case "code":
      return { id, type: "code", filename: "", language: "", code: "" };
    case "quote":
      return { id, type: "quote", text: "", author: "", year: "" };
    case "numberedList":
      return { id, type: "numberedList", items: [{ number: "1", text: "" }] };
  }
}

function createEmptySection(index: number): Section {
  return {
    id: generateId(),
    number: String(index + 1).padStart(2, "0"),
    title: "",
    blocks: [createEmptyBlock("paragraph")],
  };
}

const emptyForm = (): ArticleForm => ({
  slug: "",
  number: "",
  icon: "file-text",
  readTime: "",
  relatedSlugs: "",
  published: false,
  publishedAt: "",
  tagIds: [],
  tagSearch: "",
  translations: [
    {
      language: Language.pt_BR,
      title: "",
      intro: "",
      sections: [createEmptySection(0)],
    },
    {
      language: Language.en,
      title: "",
      intro: "",
      sections: [createEmptySection(0)],
    },
  ],
});

type ArticleData = NonNullable<Awaited<ReturnType<typeof getArticleById>>>;

function toForm(article: ArticleData): ArticleForm {
  const toSections = (raw: unknown): Section[] => {
    if (!Array.isArray(raw)) return [createEmptySection(0)];
    return raw.map((s: Record<string, unknown>, i: number) => ({
      id: (s.id as string) || generateId(),
      number: (s.number as string) || String(i + 1).padStart(2, "0"),
      title: (s.title as string) || "",
      blocks: Array.isArray(s.blocks)
        ? (s.blocks as Record<string, unknown>[]).map((b: Record<string, unknown>) => {
            if (b.type === "numberedList") {
              return {
                id: (b.id as string) || generateId(),
                type: "numberedList" as const,
                items: Array.isArray(b.items)
                  ? (b.items as Record<string, unknown>[]).map((item: Record<string, unknown>) => ({
                      number: String(item.number || ""),
                      text: (item.text as string) || "",
                    }))
                  : [{ number: "1", text: "" }],
              };
            }
            return { ...b, id: (b.id as string) || generateId() } as ContentBlock;
          })
        : [createEmptyBlock("paragraph")],
    }));
  };

  return {
    slug: article.slug,
    number: article.number,
    icon: article.icon,
    readTime: article.readTime,
    relatedSlugs: article.relatedSlugs.join(", "),
    published: article.published,
    publishedAt: article.publishedAt
      ? new Date(article.publishedAt).toISOString().split("T")[0]
      : "",
    tagIds: article.tags.map((at) => at.tagId),
    tagSearch: "",
    translations: ([Language.pt_BR, Language.en] as Language[]).map((lang) => {
      const t = article.translations.find((x) => x.language === lang);
      return {
        language: lang,
        title: t?.title || "",
        intro: t?.intro || "",
        sections: t ? toSections(t.sections) : [createEmptySection(0)],
      };
    }),
  };
}

function BlockEditor({
  block,
  onChange,
  onRemove,
}: {
  block: ContentBlock;
  onChange: (block: ContentBlock) => void;
  onRemove: () => void;
}) {
  return (
    <div className="border-input rounded-md border p-3">
      <div className="mb-2 flex items-center justify-between">
        <Select
          value={block.type}
          onValueChange={(v) => {
            onChange(createEmptyBlock(v as ContentBlock["type"]));
          }}
        >
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {BLOCK_TYPES.map((bt) => (
              <SelectItem key={bt.value} value={bt.value}>
                {bt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onRemove}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {block.type === "paragraph" && (
        <Textarea
          rows={3}
          value={block.text}
          onChange={(e) => onChange({ ...block, text: e.target.value })}
          placeholder="Texto do parágrafo..."
        />
      )}

      {block.type === "code" && (
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs">Arquivo</Label>
              <Input
                value={block.filename}
                onChange={(e) => onChange({ ...block, filename: e.target.value })}
                placeholder="ex: index.tsx"
              />
            </div>
            <div>
              <Label className="text-xs">Linguagem</Label>
              <Input
                value={block.language}
                onChange={(e) => onChange({ ...block, language: e.target.value })}
                placeholder="ex: typescript"
              />
            </div>
          </div>
          <Textarea
            rows={6}
            value={block.code}
            onChange={(e) => onChange({ ...block, code: e.target.value })}
            placeholder="Código..."
            className="font-mono text-sm"
          />
        </div>
      )}

      {block.type === "quote" && (
        <div className="space-y-2">
          <Textarea
            rows={2}
            value={block.text}
            onChange={(e) => onChange({ ...block, text: e.target.value })}
            placeholder="Texto da citação..."
          />
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs">Autor</Label>
              <Input
                value={block.author}
                onChange={(e) => onChange({ ...block, author: e.target.value })}
                placeholder="Nome do autor"
              />
            </div>
            <div>
              <Label className="text-xs">Ano</Label>
              <Input
                value={block.year}
                onChange={(e) => onChange({ ...block, year: e.target.value })}
                placeholder="ex: 2024"
              />
            </div>
          </div>
        </div>
      )}

      {block.type === "numberedList" && (
        <div className="space-y-2">
          {block.items.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <Input
                className="w-16 shrink-0"
                value={item.number}
                onChange={(e) => {
                  const items = [...block.items];
                  items[idx] = { ...items[idx], number: e.target.value };
                  onChange({ ...block, items });
                }}
                placeholder="01"
              />
              <Textarea
                rows={2}
                className="flex-1"
                value={item.text}
                onChange={(e) => {
                  const items = [...block.items];
                  items[idx] = { ...items[idx], text: e.target.value };
                  onChange({ ...block, items });
                }}
                placeholder="Texto do item..."
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="mt-1 h-8 w-8 shrink-0"
                onClick={() => {
                  const items = block.items.filter((_, i) => i !== idx);
                  onChange({
                    ...block,
                    items: items.length ? items : [{ number: "1", text: "" }],
                  });
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              onChange({
                ...block,
                items: [
                  ...block.items,
                  { number: String(block.items.length + 1), text: "" },
                ],
              })
            }
          >
            <Plus className="mr-1 h-3 w-3" />
            Item
          </Button>
        </div>
      )}
    </div>
  );
}

function SectionEditor({
  section,
  index,
  total,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  section: Section;
  index: number;
  total: number;
  onChange: (section: Section) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <Card>
      <CardHeader className="cursor-pointer py-3" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GripVertical className="text-muted-foreground h-4 w-4" />
            <span className="text-sm font-medium">
              Seção {section.number}
            </span>
            {section.title && (
              <span className="text-muted-foreground truncate text-sm">
                — {section.title}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              disabled={index === 0}
              onClick={(e) => {
                e.stopPropagation();
                onMoveUp();
              }}
            >
              <ArrowUp className="h-3 w-3" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              disabled={index === total - 1}
              onClick={(e) => {
                e.stopPropagation();
                onMoveDown();
              }}
            >
              <ArrowDown className="h-3 w-3" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
            {expanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </div>
        </div>
      </CardHeader>
      {expanded && (
        <CardContent className="space-y-4 pt-0">
          <div className="grid grid-cols-[80px_1fr] gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Número</Label>
              <Input
                value={section.number}
                onChange={(e) => onChange({ ...section, number: e.target.value })}
                placeholder="01"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Título da Seção</Label>
              <Input
                value={section.title}
                onChange={(e) => {
                  const title = e.target.value;
                  onChange({
                    ...section,
                    title,
                    id: title ? slugify(title) : generateId(),
                  });
                }}
                placeholder="Título da seção"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs">ID</Label>
            <Input
              value={section.id}
              onChange={(e) => onChange({ ...section, id: e.target.value })}
              placeholder="identificador-da-secao"
              className="font-mono text-sm"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs">Blocos de Conteúdo</Label>
            </div>
            {section.blocks.map((block, blockIdx) => (
              <BlockEditor
                key={block.id}
                block={block}
                onChange={(b) => {
                  const blocks = [...section.blocks];
                  blocks[blockIdx] = b;
                  onChange({ ...section, blocks });
                }}
                onRemove={() => {
                  const blocks = section.blocks.filter(
                    (_, i) => i !== blockIdx,
                  );
                  onChange({
                    ...section,
                    blocks: blocks.length ? blocks : [createEmptyBlock("paragraph")],
                  });
                }}
              />
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                onChange({
                  ...section,
                  blocks: [...section.blocks, createEmptyBlock("paragraph")],
                })
              }
            >
              <Plus className="mr-1 h-3 w-3" />
              Adicionar Bloco
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

export default function ArticleEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [id, setId] = useState<string>("");
  const [form, setForm] = useState<ArticleForm>(emptyForm());
  const [allTags, setAllTags] = useState<TagOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    params.then((p) => {
      setId(p.id);
      if (p.id === "new") {
        setLoading(false);
        return;
      }
      getArticleById(p.id).then((article) => {
        if (article) {
          setForm(toForm(article));
        }
        setLoading(false);
      });
    });
  }, [params]);

  useEffect(() => {
    getTags().then(setAllTags);
  }, []);

  const isNew = id === "new";

  const filteredTags = allTags.filter(
    (t) =>
      t.name.toLowerCase().includes(form.tagSearch.toLowerCase()) &&
      !form.tagIds.includes(t.id),
  );

  const exactMatch = allTags.find(
    (t) => t.name.toLowerCase() === form.tagSearch.toLowerCase(),
  );

  const handleAddTag = (tagId: string) => {
    setForm((f) => ({ ...f, tagIds: [...f.tagIds, tagId], tagSearch: "" }));
  };

  const handleCreateAndAddTag = async () => {
    const name = form.tagSearch.trim();
    if (!name) return;
    const result = await upsertTag(name);
    if (result.success && result.tag) {
      setAllTags((prev) => {
        const exists = prev.find((t) => t.id === result.tag!.id);
        if (exists) return prev;
        return [...prev, result.tag!].sort((a, b) =>
          a.name.localeCompare(b.name),
        );
      });
      setForm((f) => ({
        ...f,
        tagIds: [...f.tagIds, result.tag!.id],
        tagSearch: "",
      }));
    }
  };

  const removeTag = (tagId: string) => {
    setForm((f) => ({ ...f, tagIds: f.tagIds.filter((id) => id !== tagId) }));
  };

  const handleTranslationChange = (
    lang: Language,
    field: "title" | "intro",
    value: string,
  ) => {
    setForm((f) => ({
      ...f,
      translations: f.translations.map((t) =>
        t.language === lang ? { ...t, [field]: value } : t,
      ),
    }));
  };

  const handleSectionChange = (
    lang: Language,
    sectionIdx: number,
    section: Section,
  ) => {
    setForm((f) => ({
      ...f,
      translations: f.translations.map((t) =>
        t.language === lang
          ? {
              ...t,
              sections: t.sections.map((s, i) =>
                i === sectionIdx ? section : s,
              ),
            }
          : t,
      ),
    }));
  };

  const handleAddSection = (lang: Language) => {
    setForm((f) => ({
      ...f,
      translations: f.translations.map((t) =>
        t.language === lang
          ? {
              ...t,
              sections: [...t.sections, createEmptySection(t.sections.length)],
            }
          : t,
      ),
    }));
  };

  const handleRemoveSection = (lang: Language, sectionIdx: number) => {
    setForm((f) => ({
      ...f,
      translations: f.translations.map((t) =>
        t.language === lang
          ? {
              ...t,
              sections: t.sections.filter((_, i) => i !== sectionIdx),
            }
          : t,
      ),
    }));
  };

  const handleMoveSectionUp = (lang: Language, sectionIdx: number) => {
    if (sectionIdx === 0) return;
    setForm((f) => ({
      ...f,
      translations: f.translations.map((t) => {
        if (t.language !== lang) return t;
        const sections = [...t.sections];
        [sections[sectionIdx - 1], sections[sectionIdx]] = [
          sections[sectionIdx],
          sections[sectionIdx - 1],
        ];
        return { ...t, sections };
      }),
    }));
  };

  const handleMoveSectionDown = (lang: Language, sectionIdx: number) => {
    setForm((f) => ({
      ...f,
      translations: f.translations.map((t) => {
        if (t.language !== lang) return t;
        if (sectionIdx >= t.sections.length - 1) return t;
        const sections = [...t.sections];
        [sections[sectionIdx], sections[sectionIdx + 1]] = [
          sections[sectionIdx + 1],
          sections[sectionIdx],
        ];
        return { ...t, sections };
      }),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const payload: ArticleFormData = {
      slug: form.slug,
      number: form.number,
      icon: form.icon,
      readTime: form.readTime,
      relatedSlugs: form.relatedSlugs
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      published: form.published,
      publishedAt: form.publishedAt ? new Date(form.publishedAt) : null,
      tagIds: form.tagIds,
      translations: form.translations.map((t) => ({
        language: t.language,
        title: t.title,
        intro: t.intro,
        sections: t.sections,
      })),
    };

    const result = isNew
      ? await createArticle(payload)
      : await updateArticle(id, payload);

    if (result.success) {
      setMessage({
        type: "success",
        text: isNew ? "Artigo criado!" : "Artigo atualizado!",
      });
      if (isNew) {
        setForm(emptyForm());
      }
    } else {
      setMessage({
        type: "error",
        text: result.error || "Ocorreu um erro.",
      });
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/kirby-admin/panel">
                Kirby Admin
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/kirby-admin/panel/articles">
                Artigos
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {isNew ? "Novo Artigo" : "Editar Artigo"}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <form onSubmit={handleSubmit}>
        <div className="flex gap-6 p-6">
          <div className="flex-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações Gerais</CardTitle>
                <CardDescription>
                  Dados básicos do artigo.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Slug</Label>
                    <Input
                      value={form.slug}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, slug: e.target.value }))
                      }
                      placeholder="meu-artigo"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Número</Label>
                    <Input
                      value={form.number}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, number: e.target.value }))
                      }
                      placeholder="01"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Ícone</Label>
                    <Select
                      value={form.icon}
                      onValueChange={(v) =>
                        setForm((f) => ({ ...f, icon: v }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ICON_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Tempo de Leitura</Label>
                    <Input
                      value={form.readTime}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, readTime: e.target.value }))
                      }
                      placeholder="5 min"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Data de Publicação</Label>
                    <Input
                      type="date"
                      value={form.publishedAt}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, publishedAt: e.target.value }))
                      }
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-6">
                    <Checkbox
                      checked={form.published}
                      onCheckedChange={(checked) =>
                        setForm((f) => ({ ...f, published: !!checked }))
                      }
                      id="published"
                    />
                    <Label htmlFor="published" className="cursor-pointer">
                      Publicado
                    </Label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Artigos Relacionados (slugs)</Label>
                  <Input
                    value={form.relatedSlugs}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, relatedSlugs: e.target.value }))
                    }
                    placeholder="slug-1, slug-2, slug-3"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    value={form.tagSearch}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, tagSearch: e.target.value }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (exactMatch) {
                          handleAddTag(exactMatch.id);
                        } else if (form.tagSearch.trim()) {
                          handleCreateAndAddTag();
                        }
                      }
                    }}
                    placeholder="Buscar ou criar tag..."
                  />
                </div>

                {form.tagSearch.trim() && (
                  <div className="max-h-40 overflow-y-auto rounded-md border">
                    {filteredTags.map((tag) => (
                      <button
                        key={tag.id}
                        type="button"
                        onClick={() => handleAddTag(tag.id)}
                        className="hover:bg-accent w-full px-3 py-2 text-left text-sm"
                      >
                        {tag.name}
                      </button>
                    ))}
                    {!exactMatch && (
                      <button
                        type="button"
                        onClick={handleCreateAndAddTag}
                        className="text-muted-foreground hover:bg-accent flex w-full items-center gap-2 px-3 py-2 text-left text-sm"
                      >
                        <Plus className="h-3 w-3" />
                        Criar &quot;{form.tagSearch.trim()}&quot;
                      </button>
                    )}
                  </div>
                )}

                {form.tagIds.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {form.tagIds.map((tagId) => {
                      const tag = allTags.find((t) => t.id === tagId);
                      return tag ? (
                        <Badge
                          key={tagId}
                          variant="secondary"
                          className="flex items-center gap-1 pr-1"
                        >
                          {tag.name}
                          <button
                            type="button"
                            onClick={() => removeTag(tagId)}
                            className="hover:text-destructive ml-1"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ) : null;
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conteúdo por Idioma</CardTitle>
                <CardDescription>
                  Título, introdução e seções em cada idioma.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue={Language.pt_BR}>
                  <TabsList className="mb-4">
                    <TabsTrigger value={Language.pt_BR}>
                      Português
                    </TabsTrigger>
                    <TabsTrigger value={Language.en}>English</TabsTrigger>
                  </TabsList>

                  {([Language.pt_BR, Language.en] as Language[]).map((lang) => {
                    const t = form.translations.find(
                      (x) => x.language === lang,
                    )!;
                    return (
                      <TabsContent
                        key={lang}
                        value={lang}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <Label>Título</Label>
                          <Input
                            value={t.title}
                            onChange={(e) =>
                              handleTranslationChange(
                                lang,
                                "title",
                                e.target.value,
                              )
                            }
                            required={lang === Language.pt_BR}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Introdução</Label>
                          <Textarea
                            rows={5}
                            value={t.intro}
                            onChange={(e) =>
                              handleTranslationChange(
                                lang,
                                "intro",
                                e.target.value,
                              )
                            }
                          />
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium">
                              Seções
                            </Label>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => handleAddSection(lang)}
                            >
                              <Plus className="mr-1 h-3 w-3" />
                              Seção
                            </Button>
                          </div>
                          {t.sections.map((section, secIdx) => (
                            <SectionEditor
                              key={section.id}
                              section={section}
                              index={secIdx}
                              total={t.sections.length}
                              onChange={(s) =>
                                handleSectionChange(lang, secIdx, s)
                              }
                              onRemove={() =>
                                handleRemoveSection(lang, secIdx)
                              }
                              onMoveUp={() =>
                                handleMoveSectionUp(lang, secIdx)
                              }
                              onMoveDown={() =>
                                handleMoveSectionDown(lang, secIdx)
                              }
                            />
                          ))}
                        </div>
                      </TabsContent>
                    );
                  })}
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="sticky top-20 w-72 shrink-0 space-y-4 self-start">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Pré-visualização</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Slug: </span>
                  <span className="font-mono">{form.slug || "—"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Número: </span>
                  <span>{form.number || "—"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Ícone: </span>
                  <span>{form.icon}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Leitura: </span>
                  <span>{form.readTime || "—"}</span>
                </div>
                <Separator />
                <div>
                  <span className="text-muted-foreground">Status: </span>
                  <Badge
                    variant={form.published ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {form.published ? "Publicado" : "Rascunho"}
                  </Badge>
                </div>
                {form.publishedAt && (
                  <div>
                    <span className="text-muted-foreground">Data: </span>
                    <span>
                      {new Date(form.publishedAt + "T12:00:00").toLocaleDateString(
                        "pt-BR",
                      )}
                    </span>
                  </div>
                )}
                {form.tagIds.length > 0 && (
                  <div>
                    <span className="text-muted-foreground">Tags: </span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {form.tagIds.map((tagId) => {
                        const tag = allTags.find((t) => t.id === tagId);
                        return tag ? (
                          <Badge key={tagId} variant="secondary" className="text-xs">
                            {tag.name}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
                {form.relatedSlugs && (
                  <div>
                    <span className="text-muted-foreground">Relacionados: </span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {form.relatedSlugs
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean)
                        .map((slug, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="text-xs font-mono"
                          >
                            {slug}
                          </Badge>
                        ))}
                    </div>
                  </div>
                )}
                <Separator />
                {form.translations.map((t) => (
                  <div key={t.language}>
                    <span className="text-muted-foreground">
                      {t.language === Language.pt_BR ? "PT" : "EN"}:{" "}
                    </span>
                    <span className="font-medium">
                      {t.title || "Sem título"}
                    </span>
                    <span className="text-muted-foreground ml-2 text-xs">
                      {t.sections.length} seção(ões)
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {message && (
              <div
                className={`rounded-md p-3 text-sm ${
                  message.type === "success"
                    ? "border border-green-200 bg-green-100 text-green-900"
                    : "border border-red-200 bg-red-100 text-red-900"
                }`}
              >
                {message.text}
              </div>
            )}

            <div className="flex gap-2">
              <Button type="submit" className="flex-1" disabled={saving}>
                {saving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {isNew ? "Criar Artigo" : "Salvar Alterações"}
              </Button>
              {!form.published && !isNew && (
                <Button
                  type="submit"
                  variant="default"
                  disabled={saving}
                  onClick={() =>
                    setForm((f) => ({ ...f, published: true }))
                  }
                >
                  Publicar
                </Button>
              )}
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              asChild
            >
              <Link href="/kirby-admin/panel/articles">Voltar aos Artigos</Link>
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
