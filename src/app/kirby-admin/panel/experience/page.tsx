"use client";

import { useEffect, useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { Language } from "@db/enums";
import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "./actions";

type Translation = {
  language: Language;
  position: string;
  description: string;
};

type ExperienceForm = {
  id?: string;
  company: string;
  startDate: string;
  endDate: string;
  current: boolean;
  translations: Translation[];
};

const emptyForm = (): ExperienceForm => ({
  company: "",
  startDate: "",
  endDate: "",
  current: false,
  translations: [
    { language: Language.pt_BR, position: "", description: "" },
    { language: Language.en, position: "", description: "" },
  ],
});

type ExperienceRow = Awaited<ReturnType<typeof getExperiences>>[number];

function toForm(exp: ExperienceRow): ExperienceForm {
  return {
    id: exp.id,
    company: exp.company,
    startDate: exp.startDate.toISOString().split("T")[0],
    endDate: exp.endDate ? exp.endDate.toISOString().split("T")[0] : "",
    current: exp.current,
    translations: ([Language.pt_BR, Language.en] as Language[]).map((lang) => {
      const t = exp.translations.find((x) => x.language === lang);
      return {
        language: lang,
        position: t?.position || "",
        description: t?.description || "",
      };
    }),
  };
}

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<ExperienceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<ExperienceForm>(emptyForm());
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const load = async () => {
    setLoading(true);
    setExperiences(await getExperiences());
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const openNew = () => {
    setForm(emptyForm());
    setMessage(null);
    setOpen(true);
  };

  const openEdit = (exp: ExperienceRow) => {
    setForm(toForm(exp));
    setMessage(null);
    setOpen(true);
  };

  const handleTranslationChange = (
    lang: string,
    field: keyof Translation,
    value: string,
  ) => {
    setForm((f) => ({
      ...f,
      translations: f.translations.map((t) =>
        t.language === lang ? { ...t, [field]: value } : t,
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const payload = {
      company: form.company,
      startDate: form.startDate,
      endDate: form.current ? null : form.endDate || null,
      current: form.current,
      translations: form.translations,
    };

    const result = form.id
      ? await updateExperience(form.id, payload)
      : await createExperience(payload);

    if (result.success) {
      setMessage({
        type: "success",
        text: form.id ? "Experiência atualizada!" : "Experiência criada!",
      });
      await load();
      setTimeout(() => setOpen(false), 800);
    } else {
      setMessage({ type: "error", text: result.error || "Ocorreu um erro." });
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta experiência?")) return;
    setDeleting(id);
    await deleteExperience(id);
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
              <BreadcrumbLink href="/kirby-admin/panel">
                Kirby Admin
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Experiências</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="mx-auto w-full max-w-4xl p-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Experiências</h1>
            <p className="text-muted-foreground">
              Gerencie sua trajetória profissional.
            </p>
          </div>
          <Button onClick={openNew}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Experiência
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : experiences.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-muted-foreground mb-4">
                Nenhuma experiência cadastrada.
              </p>
              <Button onClick={openNew}>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Experiência
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {experiences.map((exp) => {
              const ptTrans = exp.translations.find(
                (t) => t.language === Language.pt_BR,
              );
              return (
                <Card key={exp.id}>
                  <CardContent className="flex items-center justify-between py-4">
                    <div>
                      <p className="font-semibold">{exp.company}</p>
                      <p className="text-muted-foreground text-sm">
                        {ptTrans?.position || "—"}
                      </p>
                      <p className="text-muted-foreground mt-0.5 text-xs">
                        {exp.startDate.toLocaleDateString("pt-BR", {
                          month: "short",
                          year: "numeric",
                        })}
                        {" — "}
                        {exp.current
                          ? "Atual"
                          : exp.endDate?.toLocaleDateString("pt-BR", {
                              month: "short",
                              year: "numeric",
                            }) || "—"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => openEdit(exp)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(exp.id)}
                        disabled={deleting === exp.id}
                      >
                        {deleting === exp.id ? (
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
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {form.id ? "Editar Experiência" : "Nova Experiência"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações Gerais</CardTitle>
                <CardDescription>Dados da empresa e período.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Empresa</Label>
                  <Input
                    id="company"
                    value={form.company}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, company: e.target.value }))
                    }
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Data de Início</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={form.startDate}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, startDate: e.target.value }))
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">Data de Término</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={form.endDate}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, endDate: e.target.value }))
                      }
                      disabled={form.current}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="current"
                    checked={form.current}
                    onCheckedChange={(v) =>
                      setForm((f) => ({ ...f, current: !!v }))
                    }
                  />
                  <Label htmlFor="current" className="cursor-pointer">
                    Emprego atual
                  </Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conteúdo por Idioma</CardTitle>
                <CardDescription>
                  Cargo e descrição em cada idioma.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue={Language.pt_BR}>
                  <TabsList className="mb-4">
                    <TabsTrigger value={Language.pt_BR}>Português</TabsTrigger>
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
                          <Label>Cargo</Label>
                          <Input
                            value={t.position}
                            onChange={(e) =>
                              handleTranslationChange(
                                lang,
                                "position",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Descrição</Label>
                          <Textarea
                            rows={4}
                            value={t.description}
                            onChange={(e) =>
                              handleTranslationChange(
                                lang,
                                "description",
                                e.target.value,
                              )
                            }
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
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {form.id ? "Salvar Alterações" : "Criar Experiência"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
