'use client';

import AuthModal from '@/components/auth-modal/index';
import { ThemeSwitcher } from '@/root/header/components/theme-switcher';
import { DesktopNav } from '../desktop/desktop-nav';
import { MobileNav } from '../mobile/MobileNav';
import { UserMenu } from '../UserMenu';
import type { User } from '@/types/user.type';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { routes } from '../../routes';
import { Logo } from '../Logo';

export function AdminHeader({ user }: Readonly<{ user: User | null }>) {
  return (
    <>
      <SidebarTrigger />
      <Logo />

      <DesktopNav routes={routes} />

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        {user ? <UserMenu user={user} /> : <AuthModal />}
        <MobileNav routes={routes} title="Navigation" />
        <ThemeSwitcher />
      </div>
    </>
  );
}
