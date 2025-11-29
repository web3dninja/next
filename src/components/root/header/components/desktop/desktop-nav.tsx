'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { DropdownItem } from './dropdown-item';
import { RouteWithDropdown } from '@/types/header';

export function DesktopNav({ routes }: Readonly<{ routes: RouteWithDropdown[] }>) {
  const pathname = usePathname();

  return (
    <NavigationMenu viewport={false} className="hidden md:flex">
      <NavigationMenuList>
        {routes.map(route => (
          <NavigationMenuItem key={route.href}>
            {route.dropdown ? (
              <DropdownItem {...route} />
            ) : (
              <NavigationMenuLink
                asChild
                className={cn(pathname === route.href && 'bg-zinc-100 dark:bg-zinc-800')}
              >
                <Link href={route.href} passHref>
                  {route.label}
                </Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
