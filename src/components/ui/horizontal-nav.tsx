'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

function HorizontalNavMenu({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="horizontal-nav-menu"
      data-horizontal-nav="menu"
      className={cn('flex w-full min-w-0 flex-col gap-1', className)}
      {...props}
    />
  );
}

function HorizontalNavMenuItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="horizontal-nav-menu-item"
      data-horizontal-nav="menu-item"
      className={cn('group/menu-item relative', className)}
      {...props}
    />
  );
}

const HorizontalNavMenuButtonVariants = cva(
  'peer/menu-button ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:font-medium [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        outline:
          'bg-background hover:bg-sidebar-accent hover:text-sidebar-accent-foreground shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]',
      },
      size: {
        default: 'h-8 text-sm',
        sm: 'h-7 text-xs',
        lg: 'h-12 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function HorizontalNavMenuButton({
  asChild = false,
  isActive = false,
  variant = 'default',
  size = 'default',
  className,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean;
  isActive?: boolean;
} & VariantProps<typeof HorizontalNavMenuButtonVariants>) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="horizontal-nav-menu-button"
      data-horizontal-nav="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(HorizontalNavMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

function HorizontalNavMenuSub({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="horizontal-nav-menu-sub"
      data-horizontal-nav="menu-sub"
      className={cn(
        'border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5',
        className,
      )}
      {...props}
    />
  );
}

function HorizontalNavMenuSubItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="horizontal-nav-menu-sub-item"
      data-horizontal-nav="menu-sub-item"
      className={cn('group/menu-sub-item relative', className)}
      {...props}
    />
  );
}

function HorizontalNavMenuSubButton({
  asChild = false,
  size = 'md',
  isActive = false,
  className,
  ...props
}: React.ComponentProps<'a'> & {
  asChild?: boolean;
  size?: 'sm' | 'md';
  isActive?: boolean;
}) {
  const Comp = asChild ? Slot : 'a';

  return (
    <Comp
      data-slot="horizontal-nav-menu-sub-button"
      data-horizontal-nav="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        'text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
        'data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground',
        size === 'sm' && 'text-xs',
        size === 'md' && 'text-sm',
        className,
      )}
      {...props}
    />
  );
}

export {
  HorizontalNavMenu,
  HorizontalNavMenuItem,
  HorizontalNavMenuButton,
  HorizontalNavMenuSub,
  HorizontalNavMenuSubItem,
  HorizontalNavMenuSubButton,
};
