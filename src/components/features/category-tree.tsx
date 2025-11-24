'use client';

import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface Category {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  children?: Category[];
}

interface CategoryTreeProps {
  categories: Category[];
  onSelect: (slug: string) => void;
}

function CategoryMenuItem({
  category,
  onSelect,
}: {
  category: Category;
  onSelect: (slug: string) => void;
}) {
  const hasChildren = category.children && category.children.length > 0;

  if (hasChildren) {
    return (
      <DropdownMenuSub>
        <DropdownMenuSubTrigger onClick={() => onSelect(category.slug)}>
          {category.name}
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          {category.children!.map(child => (
            <CategoryMenuItem key={child.id} category={child} onSelect={onSelect} />
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    );
  }

  return (
    <DropdownMenuItem onClick={() => onSelect(category.slug)}>{category.name}</DropdownMenuItem>
  );
}

export function CategoryTree({ categories, onSelect }: CategoryTreeProps) {
  const pathname = usePathname();

  const match = pathname.match(/\/products\/([^/]+)/);
  const currentSlug = match ? match[1] : '';

  const currentCategory = categories.find(c => c.slug === currentSlug);

  const buildTree = (items: Category[], parentId: number | null = null): Category[] => {
    return items
      .filter(item => item.parentId === parentId)
      .map(item => ({
        ...item,
        children: buildTree(items, item.id),
      }));
  };

  const tree = buildTree(categories);

  const handleSelect = (slug: string) => {
    onSelect(slug);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-50 justify-between">
          {currentCategory?.name ?? 'Categories'}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {tree.map(category => (
          <CategoryMenuItem key={category.id} category={category} onSelect={handleSelect} />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
