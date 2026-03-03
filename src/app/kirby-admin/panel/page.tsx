"use client";

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

export default function Page() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/kirby-admin/panel">
                  Kirby Admin
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-muted/50 aspect-video rounded-xl flex items-center justify-center p-6 border">
            <div className="text-center">
              <h3 className="text-lg font-medium">Perfil</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Gerencie suas informações pessoais e bio.
              </p>
            </div>
          </div>
          <div className="bg-muted/50 aspect-video rounded-xl flex items-center justify-center p-6 border">
            <div className="text-center">
              <h3 className="text-lg font-medium">Experiências</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Adicione ou edite sua trajetória profissional.
              </p>
            </div>
          </div>
          <div className="bg-muted/50 aspect-video rounded-xl flex items-center justify-center p-6 border">
            <div className="text-center">
              <h3 className="text-lg font-medium">Projetos</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Exiba seus melhores trabalhos e tecnologias.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min p-6 border">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight">
              Bem-vindo ao Painel Kirby
            </h2>
            <p className="text-muted-foreground mt-2">
              Aqui você pode gerenciar todo o conteúdo do seu portfólio. Utilize
              a barra lateral para navegar entre as diferentes seções de edição.
            </p>
            <ul className="mt-6 space-y-4">
              <li className="flex gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Perfil:</span>{" "}
                  Edite seu nome, links sociais e biografia em múltiplos
                  idiomas.
                </p>
              </li>
              <li className="flex gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">
                    Experiência:
                  </span>{" "}
                  Mantenha seu histórico profissional atualizado.
                </p>
              </li>
              <li className="flex gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                  3
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Projetos:</span>{" "}
                  Gerencie os projetos exibidos, tags e links.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
