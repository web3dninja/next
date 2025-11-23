'use client';
import { Logo } from '../Logo';
import { DesktopNav } from '../desktop/desktop-nav';
import { MobileNav } from '../mobile/MobileNav';
import { UserMenu } from '../UserMenu';
import { ThemeSwitcher } from '../theme-switcher';
import { routes } from '../../routes';
import AuthModal from '@/components/auth-modal';
import { getCurrentUserAction } from '@/actions/user';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';

export function MainHeader() {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUserAction,
  });

  return (
    <>
      <Logo />

      <DesktopNav routes={routes} />

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        {isLoading ? (
          <Skeleton className="size-8 rounded-full" />
        ) : user ? (
          <UserMenu user={user} />
        ) : (
          <AuthModal />
        )}
        <MobileNav routes={routes} />
        <ThemeSwitcher />
      </div>
    </>
  );
}
