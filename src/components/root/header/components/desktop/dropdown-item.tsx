import {
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { RouteWithDropdown } from '@/types/header';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export function DropdownItem(route: RouteWithDropdown) {
  const pathname = usePathname();
  return (
    <>
      <NavigationMenuTrigger
        className={cn(pathname.startsWith(route.href) && 'bg-zinc-100 dark:bg-zinc-800')}
      >
        {route.label}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[200px] gap-1 p-2">
          {route.dropdown?.map(dropdown => (
            <li key={dropdown.href}>
              <NavigationMenuLink
                asChild
                className={cn(
                  'block rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-zinc-100 dark:hover:bg-zinc-800',
                  pathname === dropdown.href && 'bg-zinc-100 dark:bg-zinc-800',
                )}
              >
                <Link href={dropdown.href} passHref>
                  <span className="text-sm font-medium">{dropdown.label}</span>
                </Link>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </>
  );
}
