'use client';

import AuthModal from '@/components/auth-modal/index';
import { ThemeSwitcher } from '@/root/header/components/theme-switcher';
import { Logo } from './components/Logo';
import { DesktopNav } from './components/desktop/DesktopNav';
import { MobileNav } from './components/mobile/MobileNav';
import { UserMenu } from './components/UserMenu';
import { routes } from './routes';

interface HeaderProps {
  user?: {
    id: number;
    username: string;
    email: string;
    role: string;
  } | null;
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-zinc-800 dark:bg-black/95 dark:supports-[backdrop-filter]:bg-black/60">
      <div className="container mx-auto flex h-14 items-center px-4">
        {/* Logo */}
        <Logo />

        <DesktopNav routes={routes} />

        <div className="flex-1" />

        <div className="flex items-center gap-2">
          {user ? <UserMenu user={user} /> : <AuthModal user={user} />}
          <MobileNav routes={routes} />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
