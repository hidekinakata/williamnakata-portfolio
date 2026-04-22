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
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Eye, EyeOff, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { Language } from "@db/enums";
import {
  getArticles,
  deleteArticle,
  togglePublish,
} from "./actions";

type ArticleRow = Awaited<ReturnType<typeof getArticles>>[number];

export default function ArticlesPage() {
  const [articles, setArticles] = useState<ArticleRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toggling, setToggling] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const data = await getArticles();
    setArticles(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este artigo?")) return;
    setDeleting(id);
    await deleteArticle(id);
    await load();
    setDeleting(null);
  };

  const handleToggle = async (id: string) => {
    setToggling(id);
    await togglePublish(id);
    await load();
    setToggling(null);
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
              <BreadcrumbPage>Artigos</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="mx-auto w-full max-w-4xl p-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Artigos</h1>
            <p className="text-muted-foreground">
              Gerencie os artigos do blog.
            </p>
          </div>
          <Button asChild>
            <Link href="/kirby-admin/panel/articles/new">
              <Plus className="mr-2 h-4 w-4" />
              Novo Artigo
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : articles.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-muted-foreground mb-4">
                Nenhum artigo cadastrado.
              </p>
              <Button asChild>
                <Link href="/kirby-admin/panel/articles/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Artigo
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {articles.map((article) => {
              const ptTrans = article.translations.find(
                (t) => t.language === Language.pt_BR,
              );
              return (
                <Card key={article.id}>
                  <CardContent className="flex items-center justify-between py-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">
                          {ptTrans?.title || "—"}
                        </p>
                        <Badge
                          variant={article.published ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {article.published ? "Publicado" : "Rascunho"}
                        </Badge>
                      </div>
                      <div className="text-muted-foreground flex items-center gap-3 text-sm">
                        {article.publishedAt && (
                          <span>
                            {new Date(article.publishedAt).toLocaleDateString(
                              "pt-BR",
                            )}
                          </span>
                        )}
                        <span>{article.readTime}</span>
                      </div>
                      {article.tags.length > 0 && (
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {article.tags.map((at) => (
                            <Badge
                              key={at.tagId}
                              variant="secondary"
                              className="text-xs"
                            >
                              {at.tag.name}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="ml-4 flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleToggle(article.id)}
                        disabled={toggling === article.id}
                        title={
                          article.published
                            ? "Despublicar"
                            : "Publicar"
                        }
                      >
                        {toggling === article.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : article.published ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <Link href={`/kirby-admin/panel/articles/${article.id}`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(article.id)}
                        disabled={deleting === article.id}
                      >
                        {deleting === article.id ? (
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
    </>
  );
}
