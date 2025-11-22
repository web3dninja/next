'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { routes, blogRoutes, docsRoutes, marketingRoutes, productRoutes } from '../routes';

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <NavigationMenu className="hidden md:flex" viewport={false}>
      <NavigationMenuList>
        {/* Simple links */}
        {routes.map(route => (
          <NavigationMenuItem key={route.href}>
            <NavigationMenuLink
              asChild
              className={cn(
                navigationMenuTriggerStyle(),
                pathname === route.href && 'bg-zinc-100 dark:bg-zinc-800',
              )}
            >
              <Link href={route.href} passHref>
                {route.label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}

        {/* Blog dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn(pathname.startsWith('/blog') && 'bg-zinc-100 dark:bg-zinc-800')}
          >
            Blog
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-1 p-2">
              {blogRoutes.map(route => (
                <li key={route.href}>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      'block rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-zinc-100 dark:hover:bg-zinc-800',
                      pathname === route.href && 'bg-zinc-100 dark:bg-zinc-800',
                    )}
                  >
                    <Link href={route.href} passHref>
                      <span className="text-sm font-medium">{route.label}</span>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Docs dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn(pathname.startsWith('/docs') && 'bg-zinc-100 dark:bg-zinc-800')}
          >
            Docs
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-1 p-2">
              {docsRoutes.map(route => (
                <li key={route.href}>
                  <Link href={route.href} passHref>
                    <NavigationMenuLink
                      asChild
                      className={cn(
                        'block rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-zinc-100 dark:hover:bg-zinc-800',
                        pathname === route.href && 'bg-zinc-100 dark:bg-zinc-800',
                      )}
                    >
                      <span className="text-sm font-medium">{route.label}</span>
                    </NavigationMenuLink>
                  </Link>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Products dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn(pathname.startsWith('/products') && 'bg-zinc-100 dark:bg-zinc-800')}
          >
            Products
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-1 p-2">
              {productRoutes.map(route => (
                <li key={route.href}>
                  <NavigationMenuLink
                    className={cn(
                      'block rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-zinc-100 dark:hover:bg-zinc-800',
                      pathname === route.href && 'bg-zinc-100 dark:bg-zinc-800',
                    )}
                  >
                    <Link href={route.href} passHref>
                      <span className="text-sm font-medium">{route.label}</span>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Marketing dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn(
              (pathname === '/pricing' || pathname === '/features') &&
                'bg-zinc-100 dark:bg-zinc-800',
            )}
          >
            Marketing
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-1 p-2">
              {marketingRoutes.map(route => (
                <li key={route.href}>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      'block rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-zinc-100 dark:hover:bg-zinc-800',
                      pathname === route.href && 'bg-zinc-100 dark:bg-zinc-800',
                    )}
                  >
                    <Link href={route.href} passHref>
                      <span className="text-sm font-medium">{route.label}</span>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Dashboard link */}
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={cn(
              navigationMenuTriggerStyle(),
              pathname.startsWith('/dashboard') && 'bg-zinc-100 dark:bg-zinc-800',
            )}
          >
            <Link href="/dashboard" passHref>
              Dashboard
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

