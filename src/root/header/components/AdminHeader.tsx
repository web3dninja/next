'use client';

import Link from 'next/link';
import AuthModal from '@/components/auth-modal/index';
import { ThemeSwitcher } from '@/root/header/components/theme-switcher';
import { Logo } from './Logo';
import { DesktopNav } from './desktop/DesktopNav';
import { MobileNav } from './mobile/MobileNav';
import { UserMenu } from './UserMenu';
import { adminRoutes } from '../routes-admin';

interface AdminHeaderProps {
  user?: {
    id: number;
    username: string;
    email: string;
    role: string;
  } | null;
}

export function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="header">
      <div className="container mx-auto flex h-14 items-center px-4">
        {/* Logo */}
        <Logo />

        {/* Back to Home link */}
        <Link
          href="/"
          className="mr-4 text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
        >
          ← Home
        </Link>

        {/* Admin Desktop Navigation */}
        <DesktopNav routes={adminRoutes} />

        <div className="flex-1" />

        <div className="flex items-center gap-2">
          {user ? <UserMenu user={user} /> : <AuthModal user={user} />}
          <MobileNav routes={adminRoutes} title="Admin Navigation" />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
