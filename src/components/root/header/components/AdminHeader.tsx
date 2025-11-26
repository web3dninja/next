import { ThemeSwitcher } from './theme-switcher';
import { DesktopNav } from './desktop/desktop-nav';
import { MobileNav } from './mobile/MobileNav';
import { UserMenu } from './UserMenu';
import { RoleEnum } from '@/types/user';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { routes } from '@/configs/site-routes';
import { Logo } from './Logo';
import { getCurrentUserAction } from '@/actions/user';
import { notFound } from 'next/navigation';
import { AuthModalButton } from '@/components/auth-form/index';

export async function AdminHeader() {
  const user = await getCurrentUserAction();

  if (!user || user.role === RoleEnum.USER) {
    notFound();
  }

  return (
    <>
      <SidebarTrigger />
      <Logo />

      <DesktopNav routes={routes} />

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        {user ? <UserMenu user={user} /> : <AuthModalButton />}
        <MobileNav routes={routes} title="Navigation" />
        <ThemeSwitcher />
      </div>
    </>
  );
}
