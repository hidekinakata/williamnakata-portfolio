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
import { getProfile, updateProfile, uploadCV } from "./actions";
import { FileText, FileUp, Loader2 } from "lucide-react";
import { Language } from "@db/enums";
import type { ProfileModel, ProfileTranslationModel } from "@db/models";

type ProfileWithTranslations = ProfileModel & {
  translations: ProfileTranslationModel[];
};

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [profile, setProfile] = useState<ProfileWithTranslations | null>(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    async function loadProfile() {
      const data = await getProfile();
      if (data) {
        setProfile(data);
      }
      setLoading(false);
    }
    loadProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const result = await updateProfile(profile!);

    if (result.success) {
      setMessage({ type: "success", text: "Perfil atualizado com sucesso!" });
    } else {
      setMessage({ type: "error", text: result.error || "Ocorreu um erro." });
    }

    setSaving(false);
  };

  const handleChange = (field: keyof ProfileModel, value: string) => {
    if (!profile) return;
    setProfile({ ...profile, [field]: value });
  };

  const handleTranslationChange = (
    lang: string,
    field: keyof ProfileTranslationModel,
    value: string,
  ) => {
    if (!profile) return;
    const newTranslations = profile.translations.map((t) =>
      t.language === lang ? { ...t, [field]: value } : t,
    );
    setProfile({ ...profile, translations: newTranslations });
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    lang: string,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(lang);
    setMessage(null);

    const formData = new FormData();
    formData.append("file", file);

    const result = await uploadCV(formData, lang);

    if (result.success && result.url) {
      handleTranslationChange(lang, "cvUrl", result.url);
      setMessage({
        type: "success",
        text: `CV (${lang}) enviado com sucesso!`,
      });
    } else {
      setMessage({ type: "error", text: result.error || "Erro no upload." });
    }

    setUploading(null);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  if (profile === null) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Erro ao carregar o perfil.</p>
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
              <BreadcrumbPage>Perfil</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="mx-auto w-full max-w-4xl p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Editar Perfil</h1>
          <p className="text-muted-foreground">
            Gerencie suas informações pessoais e links sociais.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Informações Gerais</CardTitle>
              <CardDescription>
                Dados básicos que aparecem no seu portfólio.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={profile?.name || ""}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile?.email || ""}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub URL</Label>
                  <Input
                    id="github"
                    value={profile?.github || ""}
                    onChange={(e) => handleChange("github", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn URL</Label>
                  <Input
                    id="linkedin"
                    value={profile?.linkedin || ""}
                    onChange={(e) => handleChange("linkedin", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="Instagram">Instagram URL</Label>
                  <Input
                    id="instagram"
                    value={profile?.instagram || ""}
                    onChange={(e) => handleChange("instagram", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conteúdo por Idioma</CardTitle>
              <CardDescription>
                Gerencie sua biografia e currículo em diferentes idiomas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={Language.pt_BR}>
                <TabsList className="mb-4">
                  <TabsTrigger value={Language.pt_BR}>Português</TabsTrigger>
                  <TabsTrigger value={Language.en}>English</TabsTrigger>
                </TabsList>

                <TabsContent value={Language.pt_BR} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="bio-pt">Biografia (PT)</Label>
                    <Textarea
                      id="bio-pt"
                      rows={6}
                      value={
                        profile?.translations.find(
                          (t) => t.language === Language.pt_BR,
                        )?.bio || ""
                      }
                      onChange={(e) =>
                        handleTranslationChange(
                          Language.pt_BR,
                          "bio",
                          e.target.value,
                        )
                      }
                    />
                  </div>

                  <div className="space-y-4">
                    <Label>Currículo PDF (PT)</Label>
                    <div className="flex flex-col gap-3">
                      {profile?.translations.find(
                        (t) => t.language === Language.pt_BR,
                      )?.cvUrl && (
                        <div className="bg-muted flex items-center gap-2 rounded-md p-2 text-sm">
                          <FileText className="text-primary h-4 w-4" />
                          <span className="flex-1 truncate">
                            {
                              profile.translations.find(
                                (t) => t.language === Language.pt_BR,
                              )?.cvUrl
                            }
                          </span>
                          <Button variant="ghost" size="sm" asChild>
                            <a
                              href={
                                profile.translations.find(
                                  (t) => t.language === Language.pt_BR,
                                )?.cvUrl || "#"
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Ver
                            </a>
                          </Button>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handleFileUpload(e, Language.pt_BR)}
                          className="hidden"
                          id="cv-pt"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full"
                          onClick={() =>
                            document.getElementById("cv-pt")?.click()
                          }
                          disabled={uploading === Language.pt_BR}
                        >
                          {uploading === Language.pt_BR ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <FileUp className="mr-2 h-4 w-4" />
                          )}
                          {profile.translations.find(
                            (t) => t.language === Language.pt_BR,
                          )?.cvUrl
                            ? "Substituir PDF"
                            : "Upload PDF (PT)"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value={Language.en} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="bio-en">Bio (EN)</Label>
                    <Textarea
                      id="bio-en"
                      rows={6}
                      value={
                        profile?.translations.find(
                          (t) => t.language === Language.en,
                        )?.bio || ""
                      }
                      onChange={(e) =>
                        handleTranslationChange(
                          Language.en,
                          "bio",
                          e.target.value,
                        )
                      }
                    />
                  </div>

                  <div className="space-y-4">
                    <Label>Resume PDF (EN)</Label>
                    <div className="flex flex-col gap-3">
                      {profile?.translations.find(
                        (t) => t.language === Language.en,
                      )?.cvUrl && (
                        <div className="bg-muted flex items-center gap-2 rounded-md p-2 text-sm">
                          <FileText className="text-primary h-4 w-4" />
                          <span className="flex-1 truncate">
                            {
                              profile.translations.find(
                                (t) => t.language === Language.en,
                              )?.cvUrl
                            }
                          </span>
                          <Button variant="ghost" size="sm" asChild>
                            <a
                              href={
                                profile.translations.find(
                                  (t) => t.language === Language.en,
                                )?.cvUrl || "#"
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View
                            </a>
                          </Button>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handleFileUpload(e, Language.en)}
                          className="hidden"
                          id="cv-en"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full"
                          onClick={() =>
                            document.getElementById("cv-en")?.click()
                          }
                          disabled={uploading === Language.en}
                        >
                          {uploading === Language.en ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <FileUp className="mr-2 h-4 w-4" />
                          )}
                          {profile.translations.find(
                            (t) => t.language === Language.en,
                          )?.cvUrl
                            ? "Replace PDF"
                            : "Upload PDF (EN)"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {message && (
            <div
              className={`rounded-md p-4 ${
                message.type === "success"
                  ? "border border-green-200 bg-green-100 text-green-900"
                  : "border border-red-200 bg-red-100 text-red-900"
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="flex justify-end">
            <Button type="submit" disabled={saving}>
              {saving ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
