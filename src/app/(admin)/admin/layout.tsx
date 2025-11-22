import { Sidebar, SidebarContent, SidebarProvider } from '@/components/ui/sidebar';
import { SheetHeader } from '@/components/ui/sheet';
import { Header } from '@/root';
import { getCurrentUser } from '@/components/auth-modal/actions';
import { AdminHeader } from '@/root/header/components/admin/AdminHeader';
import { HorizontalRoutes } from '@/components/features/horizontal-routes';
import { adminRoutes } from '@/root/header/components/admin/routes';

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SheetHeader>Admin</SheetHeader>
          <div className="p-4">
            <HorizontalRoutes routes={adminRoutes} />
          </div>
        </SidebarContent>
      </Sidebar>

      <div className="flex min-h-screen w-full flex-col">
        <Header>
          <AdminHeader user={user} />
        </Header>
        <main>{children}</main>
      </div>
    </SidebarProvider>
  );
}
