"use client";

import * as React from "react";
import {
  BookOpen,
  Briefcase,
  LayoutDashboard,
  Settings2,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/kirby-admin/panel",
      icon: LayoutDashboard,
    },
    {
      title: "Perfil",
      url: "/kirby-admin/panel/profile",
      icon: User,
    },
    {
      title: "Experiência",
      url: "/kirby-admin/panel/experience",
      icon: Briefcase,
    },
    {
      title: "Projetos",
      url: "/kirby-admin/panel/projects",
      icon: BookOpen,
    },
    {
      title: "Configurações",
      url: "/kirby-admin/panel/settings",
      icon: Settings2,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" variant={"inset"} {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <Image
                  src={"/kirby.png"}
                  alt={"Kirby logo"}
                  width={128}
                  height={128}
                  className={
                    "aspect-square size-8 grayscale-100 hover:grayscale-0"
                  }
                ></Image>
                <div className="grid flex-1 text-left text-sm leading-tight pl-1">
                  <span className="truncate font-medium">William Nakata</span>
                  <span className="truncate text-xs">Kirby ADMIN</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
