import { ThemeSwitcher } from '@/root/header/components/theme-switcher';
import { DesktopNav } from '../desktop/desktop-nav';
import { MobileNav } from '../mobile/MobileNav';
import { UserMenu } from '../UserMenu';
import { RoleEnum } from '@/types/user.type';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { routes } from '../../routes';
import { Logo } from '../Logo';
import { getCurrentUserAction } from '@/actions/user';
import { notFound } from 'next/navigation';
import { AuthModalButton } from '@/components/auth-modal/index';

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
