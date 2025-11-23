import { Logo } from '../Logo';
import { DesktopNav } from '../desktop/desktop-nav';
import { MobileNav } from '../mobile/MobileNav';
import { UserMenu } from '../UserMenu';
import { ThemeSwitcher } from '../theme-switcher';
import { routes } from '../../routes';
import type { User } from '@/types/user.type';
import AuthModal from '@/components/auth-modal';
import { getCurrentUserAction } from '@/actions/user';

export async function MainHeader() {
  const user = await getCurrentUserAction();

  return (
    <>
      <Logo />

      <DesktopNav routes={routes} />

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        {user ? <UserMenu user={user} /> : <AuthModal />}
        <MobileNav routes={routes} />
        <ThemeSwitcher />
      </div>
    </>
  );
}
