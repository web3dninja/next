'use client';

import AuthModal from '@/components/auth-modal/index';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Logo } from './components/Logo';
import { DesktopNav } from './components/DesktopNav';
import { MobileNav } from './components/MobileNav';

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

        {/* Desktop Navigation */}
        <DesktopNav />

        {/* Spacer to push theme switcher and mobile menu to the right */}
        <div className="flex-1" />

        {/* Auth Modal */}
        <AuthModal user={user} />

        {/* Theme Switcher */}
        <ThemeSwitcher />

        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    </header>
  );
}

