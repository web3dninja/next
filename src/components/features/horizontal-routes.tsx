'use client';

import { Collapsible, CollapsibleTrigger } from '../ui/collapsible';
import {
  HorizontalNavMenu,
  HorizontalNavMenuButton,
  HorizontalNavMenuItem,
} from '../ui/horizontal-nav';
import { ChevronDown } from 'lucide-react';
import { CollapsibleContent } from '../ui/collapsible';
import { HorizontalNavMenuSub } from '../ui/horizontal-nav';
import { HorizontalNavMenuSubItem } from '../ui/horizontal-nav';
import { HorizontalNavMenuSubButton } from '../ui/horizontal-nav';
import { usePathname } from 'next/navigation';
import { RouteWithDropdown } from '@/types/header';
import Link from 'next/link';

export const HorizontalRoutes = ({ routes }: Readonly<{ routes: RouteWithDropdown[] }>) => {
  const pathname = usePathname();

  const isActive = (href: string, dropdown?: boolean) => {
    if (dropdown) {
      return pathname.startsWith(href);
    }
    return pathname === href;
  };
  return (
    <HorizontalNavMenu>
      {routes.map(route => (
        <HorizontalNavMenuItem key={route.href}>
          {route.dropdown ? (
            <Collapsible>
              <CollapsibleTrigger asChild>
                <HorizontalNavMenuButton
                  isActive={isActive(route.href, true)}
                  className="w-full outline [&[data-state=open]_svg]:rotate-180"
                >
                  <span>{route.label}</span>
                  <ChevronDown className="ml-auto size-4 transition-transform" />
                </HorizontalNavMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <HorizontalNavMenuSub>
                  {route.dropdown.map(item => (
                    <HorizontalNavMenuSubItem key={item.href}>
                      <HorizontalNavMenuSubButton asChild isActive={isActive(item.href, false)}>
                        <Link href={item.href}>{item.label}</Link>
                      </HorizontalNavMenuSubButton>
                    </HorizontalNavMenuSubItem>
                  ))}
                </HorizontalNavMenuSub>
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <HorizontalNavMenuButton asChild isActive={isActive(route.href)}>
              <Link href={route.href}>
                <span>{route.label}</span>
              </Link>
            </HorizontalNavMenuButton>
          )}
        </HorizontalNavMenuItem>
      ))}
    </HorizontalNavMenu>
  );
};
