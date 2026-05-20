import { Outlet } from "react-router-dom";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { TopBar } from "./TopBar";

const SIDEBAR_STYLE = {
  "--sidebar-width": "15rem",
  "--sidebar-width-icon": "3.5rem",
} as React.CSSProperties;

export function AppLayout() {
  return (
    <SidebarProvider style={SIDEBAR_STYLE}>
      <AppSidebar />
      <SidebarInset className="bg-muted/30">
        <TopBar />
        <main className="flex-1">
          <div className="w-full p-4 md:p-6">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
