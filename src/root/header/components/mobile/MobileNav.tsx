'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  MobileNavMenu,
  MobileNavMenuItem,
  MobileNavMenuButton,
  MobileNavMenuSub,
  MobileNavMenuSubItem,
  MobileNavMenuSubButton,
} from '@/components/ui/mobile-nav-menu';
import { routes } from '../../routes';

export function MobileNav() {
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
      <SheetContent side="left" className="p-0">
        <SheetHeader className="border-b px-6 py-4">
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <div className="p-4">
          <MobileNavMenu>
            {routes.map(route => (
              <MobileNavMenuItem key={route.href}>
                {route.dropdown ? (
                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <MobileNavMenuButton
                        isActive={isActive(route.href, true)}
                        className="w-full outline [&[data-state=open]_svg]:rotate-180"
                      >
                        <span>{route.label}</span>
                        <ChevronDown className="ml-auto size-4 transition-transform" />
                      </MobileNavMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <MobileNavMenuSub>
                        {route.dropdown.map(item => (
                          <MobileNavMenuSubItem key={item.href}>
                            <MobileNavMenuSubButton asChild isActive={isActive(item.href, false)}>
                              <Link href={item.href}>{item.label}</Link>
                            </MobileNavMenuSubButton>
                          </MobileNavMenuSubItem>
                        ))}
                      </MobileNavMenuSub>
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <MobileNavMenuButton asChild isActive={isActive(route.href)}>
                    <Link href={route.href}>
                      <span>{route.label}</span>
                    </Link>
                  </MobileNavMenuButton>
                )}
              </MobileNavMenuItem>
            ))}
          </MobileNavMenu>
        </div>
      </SheetContent>
    </Sheet>
  );
}
