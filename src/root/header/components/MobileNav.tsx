'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { routes, blogRoutes, docsRoutes, marketingRoutes, productRoutes } from '../routes';

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
  );
}

