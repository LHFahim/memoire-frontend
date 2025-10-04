// app/(app)/layout.tsx
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getAuthUser } from "@/lib/auth.lib";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authUser = await getAuthUser();
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" authUser={authUser} />
      <SidebarInset>
        <SiteHeader />
        <div className="flex min-h-screen flex-1 flex-col">
          {/* every page under (app) renders here */}
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
