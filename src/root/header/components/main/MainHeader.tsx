import { Logo } from '../Logo';
import { DesktopNav } from '../desktop/desktop-nav';
import { MobileNav } from '../mobile/MobileNav';
import { UserMenu } from '../UserMenu';
import { ThemeSwitcher } from '../theme-switcher';
import { routes } from '../../routes';
import { User } from '@/lib/data';
import AuthModal from '@/components/auth-modal';

export function MainHeader({ user }: Readonly<{ user: User | null }>) {
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
