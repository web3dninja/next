'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Folder } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface Category {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  children?: Category[];
}

interface CategoryTreeProps {
  categories: Category[];
}

interface TreeNodeProps {
  category: Category;
  level: number;
  currentSlug: string | null;
}

function TreeNode({ category, level, currentSlug }: TreeNodeProps) {
  const hasChildren = category.children && category.children.length > 0;
  const isSelected = currentSlug === category.slug;

  if (hasChildren) {
    return (
      <AccordionItem value={`category-${category.id}`} className="border-0">
        <div className="flex items-center">
          <Link
            href={`/products/${category.slug}`}
            className={cn(
              'flex flex-1 items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors',
              'hover:bg-zinc-100 dark:hover:bg-zinc-800',
              isSelected && 'bg-zinc-100 font-medium dark:bg-zinc-800',
            )}
            style={{ paddingLeft: `${level * 12 + 8}px` }}
          >
            <Folder className="h-4 w-4 text-zinc-500" />
            <span className="truncate">{category.name}</span>
          </Link>
          <AccordionTrigger className="px-2 py-1.5 hover:no-underline [&>svg]:h-3 [&>svg]:w-3" />
        </div>
        <AccordionContent className="pb-0">
          {category.children!.map(child => (
            <TreeNode
              key={child.id}
              category={child}
              level={level + 1}
              currentSlug={currentSlug}
            />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link
      href={`/products/${category.slug}`}
      className={cn(
        'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors',
        'hover:bg-zinc-100 dark:hover:bg-zinc-800',
        isSelected && 'bg-zinc-100 font-medium dark:bg-zinc-800',
      )}
      style={{ paddingLeft: `${level * 12 + 8}px` }}
    >
      <Folder className="h-4 w-4 text-zinc-500" />
      <span className="truncate">{category.name}</span>
    </Link>
  );
}

export function CategoryTree({ categories }: CategoryTreeProps) {
  const pathname = usePathname();

  // Extract slug from pathname like /products/air-fryers
  const match = pathname.match(/\/products\/([^/]+)/);
  const currentSlug = match ? match[1] : null;
  const isAllProducts = pathname === '/products';

  // Build tree structure from flat list
  const buildTree = (items: Category[], parentId: number | null = null): Category[] => {
    return items
      .filter(item => item.parentId === parentId)
      .map(item => ({
        ...item,
        children: buildTree(items, item.id),
      }));
  };

  const tree = buildTree(categories);

  // Get default expanded values (all parent categories)
  const getDefaultExpanded = (items: Category[]): string[] => {
    const expanded: string[] = [];
    for (const item of items) {
      if (item.children && item.children.length > 0) {
        expanded.push(`category-${item.id}`);
        expanded.push(...getDefaultExpanded(item.children));
      }
    }
    return expanded;
  };

  return (
    <div className="space-y-1">
      <Link
        href="/products"
        className={cn(
          'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors',
          'hover:bg-zinc-100 dark:hover:bg-zinc-800',
          isAllProducts && 'bg-zinc-100 font-medium dark:bg-zinc-800',
        )}
      >
        <Folder className="h-4 w-4 text-zinc-500" />
        <span>All Products</span>
      </Link>

      <Accordion type="multiple" defaultValue={getDefaultExpanded(tree)} className="space-y-1">
        {tree.map(category => (
          <TreeNode
            key={category.id}
            category={category}
            level={0}
            currentSlug={currentSlug}
          />
        ))}
      </Accordion>
    </div>
  );
}
