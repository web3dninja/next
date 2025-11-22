'use client';

import Link from 'next/link';
import AuthModal from '@/components/auth-modal/index';
import { ThemeSwitcher } from '@/root/header/components/theme-switcher';
import { DesktopNav } from '../desktop/DesktopNav';
import { MobileNav } from '../mobile/MobileNav';
import { UserMenu } from '../UserMenu';
import { User } from '@/lib/data';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { MenuIcon } from 'lucide-react';
import { routes } from '../../routes';
import { Button } from '@/components/ui/button';

export function AdminHeader({ user }: Readonly<{ user: User | null }>) {
  return (
    <>
      <SidebarTrigger />
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
