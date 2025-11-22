'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeSwitcher } from '@/components/theme-switcher';
import AuthModal from '@/components/auth-modal/index';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const routes = [
  { href: '/', label: 'Home' },
  { href: '/admin/users', label: 'Users' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const blogRoutes = [
  { href: '/blog', label: 'All Posts' },
  { href: '/blog/1', label: 'Intro to Next.js' },
  { href: '/blog/2', label: 'Server Components' },
  { href: '/blog/3', label: 'App Router' },
];

const docsRoutes = [
  { href: '/docs', label: 'Documentation' },
  { href: '/docs/intro', label: 'Introduction' },
  { href: '/docs/guides/routing', label: 'Routing' },
];

const marketingRoutes = [
  { href: '/pricing', label: 'Pricing' },
  { href: '/features', label: 'Features' },
];

const productRoutes = [
  { href: '/products/electronics', label: 'Electronics' },
  { href: '/products/electronics/phones', label: 'Phones' },
  { href: '/products/clothing', label: 'Clothing' },
];

interface HeaderProps {
  user?: {
    id: number;
    username: string;
    email: string;
    role: string;
  } | null;
}

export function Header({ user }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-zinc-800 dark:bg-black/95 dark:supports-[backdrop-filter]:bg-black/60">
      <div className="container mx-auto flex h-14 items-center px-4">
        {/* Logo */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-black dark:text-white">Next.js Demo</span>
        </Link>

        {/* Desktop Navigation */}
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

        {/* Spacer to push theme switcher and mobile menu to the right */}
        <div className="flex-1" />

        {/* Auth Modal */}
        <AuthModal user={user} />

        {/* Theme Switcher */}
        <ThemeSwitcher />

        {/* Mobile Navigation */}
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
            <nav className="mt-4 flex flex-col gap-4">
              {/* Main routes */}
              {routes.map(route => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-black dark:hover:text-white',
                    pathname === route.href ? 'text-black dark:text-white' : 'text-zinc-500',
                  )}
                >
                  {route.label}
                </Link>
              ))}

              <div className="h-px bg-zinc-200 dark:bg-zinc-800" />

              {/* Blog */}
              <span className="text-xs font-semibold text-zinc-400 uppercase">Blog</span>
              {blogRoutes.map(route => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    'pl-2 text-sm font-medium transition-colors hover:text-black dark:hover:text-white',
                    pathname === route.href ? 'text-black dark:text-white' : 'text-zinc-500',
                  )}
                >
                  {route.label}
                </Link>
              ))}

              <div className="h-px bg-zinc-200 dark:bg-zinc-800" />

              {/* Docs */}
              <span className="text-xs font-semibold text-zinc-400 uppercase">Docs</span>
              {docsRoutes.map(route => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    'pl-2 text-sm font-medium transition-colors hover:text-black dark:hover:text-white',
                    pathname === route.href ? 'text-black dark:text-white' : 'text-zinc-500',
                  )}
                >
                  {route.label}
                </Link>
              ))}

              <div className="h-px bg-zinc-200 dark:bg-zinc-800" />

              {/* Products */}
              <span className="text-xs font-semibold text-zinc-400 uppercase">Products</span>
              {productRoutes.map(route => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    'pl-2 text-sm font-medium transition-colors hover:text-black dark:hover:text-white',
                    pathname === route.href ? 'text-black dark:text-white' : 'text-zinc-500',
                  )}
                >
                  {route.label}
                </Link>
              ))}

              <div className="h-px bg-zinc-200 dark:bg-zinc-800" />

              {/* Marketing */}
              <span className="text-xs font-semibold text-zinc-400 uppercase">Marketing</span>
              {marketingRoutes.map(route => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    'pl-2 text-sm font-medium transition-colors hover:text-black dark:hover:text-white',
                    pathname === route.href ? 'text-black dark:text-white' : 'text-zinc-500',
                  )}
                >
                  {route.label}
                </Link>
              ))}

              <div className="h-px bg-zinc-200 dark:bg-zinc-800" />

              {/* Dashboard */}
              <Link
                href="/dashboard"
                className={cn(
                  'text-sm font-medium transition-colors hover:text-black dark:hover:text-white',
                  pathname.startsWith('/dashboard')
                    ? 'text-black dark:text-white'
                    : 'text-zinc-500',
                )}
              >
                Dashboard
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
