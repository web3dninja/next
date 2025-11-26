import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { RouteWithDropdown } from '@/types/header';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function HorizontalNav({ routes }: Readonly<{ routes: RouteWithDropdown[] }>) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {routes.map(route => (
          <NavigationMenuItem key={route.href}>
            <NavigationMenuLink asChild active={isActive(route.href)}>
              <Link href={route.href}>{route.label}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
