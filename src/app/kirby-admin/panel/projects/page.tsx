"use client";

import { useEffect, useRef, useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ImageUp, Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  uploadProjectImage,
} from "./actions";

type Translation = {
  language: string;
  title: string;
  description: string;
};

type ProjectForm = {
  id?: string;
  imageUrl: string;
  link: string;
  github: string;
  tags: string[];
  tagInput: string;
  translations: Translation[];
};

const emptyForm = (): ProjectForm => ({
  imageUrl: "",
  link: "",
  github: "",
  tags: [],
  tagInput: "",
  translations: [
    { language: "pt-BR", title: "", description: "" },
    { language: "en", title: "", description: "" },
  ],
});

type ProjectRow = Awaited<ReturnType<typeof getProjects>>[number];

function toForm(proj: ProjectRow): ProjectForm {
  return {
    id: proj.id,
    imageUrl: proj.imageUrl || "",
    link: proj.link || "",
    github: proj.github || "",
    tags: proj.tags,
    tagInput: "",
    translations: ["pt-BR", "en"].map((lang) => {
      const t = proj.translations.find((x) => x.language === lang);
      return { language: lang, title: t?.title || "", description: t?.description || "" };
    }),
  };
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<ProjectForm>(emptyForm());
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    setProjects(await getProjects());
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setForm(emptyForm());
    setMessage(null);
    setOpen(true);
  };

  const openEdit = (proj: ProjectRow) => {
    setForm(toForm(proj));
    setMessage(null);
    setOpen(true);
  };

  const handleTranslationChange = (lang: string, field: keyof Translation, value: string) => {
    setForm((f) => ({
      ...f,
      translations: f.translations.map((t) =>
        t.language === lang ? { ...t, [field]: value } : t,
      ),
    }));
  };

  const addTag = () => {
    const tag = form.tagInput.trim();
    if (!tag || form.tags.includes(tag)) return;
    setForm((f) => ({ ...f, tags: [...f.tags, tag], tagInput: "" }));
  };

  const removeTag = (tag: string) => {
    setForm((f) => ({ ...f, tags: f.tags.filter((t) => t !== tag) }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const result = await uploadProjectImage(fd);
    if (result.success && result.url) {
      setForm((f) => ({ ...f, imageUrl: result.url! }));
    } else {
      setMessage({ type: "error", text: result.error || "Erro no upload." });
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const payload = {
      imageUrl: form.imageUrl,
      link: form.link,
      github: form.github,
      tags: form.tags,
      translations: form.translations,
    };

    const result = form.id
      ? await updateProject(form.id, payload)
      : await createProject(payload);

    if (result.success) {
      setMessage({ type: "success", text: form.id ? "Projeto atualizado!" : "Projeto criado!" });
      await load();
      setTimeout(() => setOpen(false), 800);
    } else {
      setMessage({ type: "error", text: result.error || "Ocorreu um erro." });
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este projeto?")) return;
    setDeleting(id);
    await deleteProject(id);
    await load();
    setDeleting(null);
  };

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/kirby-admin/panel">Kirby Admin</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Projetos</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="mx-auto w-full max-w-4xl p-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Projetos</h1>
            <p className="text-muted-foreground">Gerencie os projetos exibidos no portfólio.</p>
          </div>
          <Button onClick={openNew}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Projeto
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-muted-foreground mb-4">Nenhum projeto cadastrado.</p>
              <Button onClick={openNew}>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Projeto
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {projects.map((proj) => {
              const ptTrans = proj.translations.find((t) => t.language === "pt-BR");
              return (
                <Card key={proj.id}>
                  <CardContent className="flex items-center justify-between py-4">
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold">{ptTrans?.title || "—"}</p>
                      <p className="text-muted-foreground truncate text-sm">{ptTrans?.description || "—"}</p>
                      {proj.tags.length > 0 && (
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {proj.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="ml-4 flex gap-2">
                      <Button variant="outline" size="icon" onClick={() => openEdit(proj)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(proj.id)}
                        disabled={deleting === proj.id}
                      >
                        {deleting === proj.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{form.id ? "Editar Projeto" : "Novo Projeto"}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações Gerais</CardTitle>
                <CardDescription>Links, imagem e tags do projeto.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Imagem</Label>
                  <div className="flex gap-2 items-center">
                    <Input
                      value={form.imageUrl}
                      onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
                      placeholder="https://..."
                    />
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                    >
                      {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImageUp className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="link">Link do Projeto</Label>
                    <Input
                      id="link"
                      value={form.link}
                      onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub URL</Label>
                    <Input
                      id="github"
                      value={form.github}
                      onChange={(e) => setForm((f) => ({ ...f, github: e.target.value }))}
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      value={form.tagInput}
                      onChange={(e) => setForm((f) => ({ ...f, tagInput: e.target.value }))}
                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                      placeholder="React, Node.js..."
                    />
                    <Button type="button" variant="outline" onClick={addTag}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {form.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {form.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1 pr-1">
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="hover:text-destructive ml-1"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conteúdo por Idioma</CardTitle>
                <CardDescription>Título e descrição em cada idioma.</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="pt-BR">
                  <TabsList className="mb-4">
                    <TabsTrigger value="pt-BR">Português</TabsTrigger>
                    <TabsTrigger value="en">English</TabsTrigger>
                  </TabsList>

                  {["pt-BR", "en"].map((lang) => {
                    const t = form.translations.find((x) => x.language === lang)!;
                    return (
                      <TabsContent key={lang} value={lang} className="space-y-4">
                        <div className="space-y-2">
                          <Label>Título</Label>
                          <Input
                            value={t.title}
                            onChange={(e) => handleTranslationChange(lang, "title", e.target.value)}
                            required={lang === "pt-BR"}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Descrição</Label>
                          <Textarea
                            rows={4}
                            value={t.description}
                            onChange={(e) => handleTranslationChange(lang, "description", e.target.value)}
                          />
                        </div>
                      </TabsContent>
                    );
                  })}
                </Tabs>
              </CardContent>
            </Card>

            {message && (
              <div
                className={`rounded-md p-4 text-sm ${
                  message.type === "success"
                    ? "border border-green-200 bg-green-100 text-green-900"
                    : "border border-red-200 bg-red-100 text-red-900"
                }`}
              >
                {message.text}
              </div>
            )}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {form.id ? "Salvar Alterações" : "Criar Projeto"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
