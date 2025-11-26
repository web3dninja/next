import { Sidebar, SidebarContent, SidebarProvider } from '@/components/ui/sidebar';
import { SheetHeader } from '@/components/ui/sheet';
import { Header } from '@/components/root';
import { AdminHeader } from '@/components/root/header/components/AdminHeader';
import { HorizontalRoutes } from '@/components/features/horizontal-routes';
import { routes } from '@/configs/admin-routes';

export default function AdminLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SheetHeader>Admin</SheetHeader>
          <div className="p-4">
            <HorizontalRoutes routes={routes} />
          </div>
        </SidebarContent>
      </Sidebar>

      <div className="flex min-h-screen w-full flex-col">
        <Header>
          <AdminHeader />
        </Header>
        <main>{children}</main>
      </div>
      {modal}
    </SidebarProvider>
  );
}
