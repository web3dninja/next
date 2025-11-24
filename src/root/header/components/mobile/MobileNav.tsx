'use client';

import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { type RouteWithDropdown } from '@/types/header.type';
import { HorizontalRoutes } from '@/components/features/horizontal-routes';

interface MobileNavProps {
  routes: RouteWithDropdown[];
  title?: string;
}

export function MobileNav({ routes, title = 'Navigation' }: MobileNavProps) {
  const pathname = usePathname();

  const isActive = (href: string, dropdown?: boolean) => {
    if (dropdown) {
      return pathname.startsWith(href);
    }
    return pathname === href;
  };

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
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <div className="p-4">
          <HorizontalRoutes routes={routes} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
