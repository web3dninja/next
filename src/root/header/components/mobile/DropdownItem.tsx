import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { RouteWithDropdown } from '../../routes';

export function DropdownItem(route: RouteWithDropdown) {
  const pathname = usePathname();
  return (
    <>
      <NavigationMenuTrigger
        className={cn(
          'w-full justify-between',
          pathname.startsWith(route.href) && 'bg-zinc-100 dark:bg-zinc-800',
        )}
      >
        {route.label}
      </NavigationMenuTrigger>
      <NavigationMenuContent className="w-full">
        <ul className="grid w-full gap-1 p-2">
          {route.dropdown?.map(item => (
            <li key={item.href}>
              <NavigationMenuLink
                asChild
                className={cn(
                  'block rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-zinc-100 dark:hover:bg-zinc-800',
                  pathname === item.href && 'bg-zinc-100 dark:bg-zinc-800',
                )}
              >
                <Link href={item.href} passHref>
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </>
  );
}
