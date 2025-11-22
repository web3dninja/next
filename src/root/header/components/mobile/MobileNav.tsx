'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { routes } from '../../routes';
import { DropdownItem } from './DropdownItem';

export function MobileNav() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <NavigationMenu viewport={false} className="mt-4 max-w-full [&>div]:w-full">
          <NavigationMenuList className="flex-col items-start gap-2">
            {routes.map(route => (
              <NavigationMenuItem key={route.href} className="w-full">
                {route.dropdown ? (
                  <DropdownItem {...route} />
                ) : (
                  <NavigationMenuLink
                    asChild
                    href={route.href}
                    className={cn(navigationMenuTriggerStyle(), 'w-full items-start justify-start')}
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
      </SheetContent>
    </Sheet>
  );
}
