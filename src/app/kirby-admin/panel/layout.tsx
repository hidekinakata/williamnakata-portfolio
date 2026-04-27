import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/AppSidebar";

const PanelLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={"font-mono"}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default PanelLayout;
