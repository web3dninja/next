'use client';

import { useMemo } from 'react';
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
import type { CategoryWithCount } from '@/types/category';
import { buildCategoryTree, getCategoryTreeProductsCount } from '@/helpers/category';
import { Badge } from '../ui/badge';

interface CategoryTreeProps {
  categories: CategoryWithCount[];
  onSelect: (slug: string) => void;
  currentSlug?: string;
}

function CategoryMenuItem({
  category,
  onSelect,
}: {
  category: CategoryWithCount;
  onSelect: (slug: string) => void;
}) {
  if (category.children && category.children.length > 0) {
    return (
      <DropdownMenuSub>
        <DropdownMenuSubTrigger onClick={() => onSelect(category.slug)}>
          {category.name} <Badge variant="outline">{getCategoryTreeProductsCount(category)}</Badge>
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          {category.children.map(child => (
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

export function CategoryTree({ categories, currentSlug, onSelect }: CategoryTreeProps) {
  const tree = useMemo(() => buildCategoryTree(categories), [categories]);
  const currentCategory = useMemo(
    () => categories.find(category => (currentSlug ? category.slug === currentSlug : false)),
    [categories, currentSlug],
  );

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
